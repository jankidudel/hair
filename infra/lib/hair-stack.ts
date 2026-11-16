import * as cdk from 'aws-cdk-lib';
import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import { Construct } from 'constructs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const productionApexDomain = 'combreport.com';
const productionCanonicalDomain = `www.${productionApexDomain}`;
const cloudFrontIpRateLimit = 3_000;
const cloudFrontIpRateLimitWindowSeconds = 300;
const contactEndpoint = '/api/contact';
const contactMailbox = 'hello@inspectmesh.com';
const infrastructureDirectory = dirname(fileURLToPath(import.meta.url));
const prerenderRouteRewritePath = join(
  infrastructureDirectory,
  '../functions/prerender-route-rewrite.ts',
);

export interface HairStackProps extends StackProps {
  googleSiteVerification?: string;
}
export class HairStack extends Stack {
  constructor(scope: Construct, id: string, props: HairStackProps) {
    super(scope, id, props);
    this.tags.setTag('Project', 'hair');
    this.tags.setTag('Environment', 'prod');
    const site = new s3.Bucket(this, 'SiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.RETAIN,
    });
    const hostedZone = new route53.PublicHostedZone(
      this,
      'ProductionHostedZone',
      {
        zoneName: productionApexDomain,
      },
    );
    const certificate = new acm.Certificate(this, 'ProductionCertificate', {
      domainName: productionCanonicalDomain,
      subjectAlternativeNames: [productionApexDomain],
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });
    // `npm run build --workspace=api` creates api/dist before CDK deployment.
    const health = new lambda.Function(this, 'HealthFunction', {
      runtime: lambda.Runtime.NODEJS_26_X,
      handler: 'dist/health.handler',
      code: lambda.Code.fromAsset('../api'),
      timeout: Duration.seconds(10),
    });
    const api = new apigateway.LambdaRestApi(this, 'Api', {
      handler: health,
      proxy: false,
      deployOptions: {
        methodOptions: {
          '/api/contact/POST': {
            throttlingRateLimit: 1,
            throttlingBurstLimit: 3,
          },
        },
      },
    });
    api.root
      .addResource('health')
      .addMethod('GET', new apigateway.LambdaIntegration(health));
    const contactBehavior = this.addContactApi(api);
    const productionWebAcl = new wafv2.CfnWebACL(this, 'ProductionWebAcl', {
      name: 'hair-prod-cloudfront',
      scope: 'CLOUDFRONT',
      defaultAction: { allow: {} },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'hairProdCloudFrontWebAcl',
        sampledRequestsEnabled: true,
      },
      rules: [
        {
          name: 'RateLimitByIp',
          priority: 0,
          action: { block: {} },
          statement: {
            rateBasedStatement: {
              aggregateKeyType: 'IP',
              limit: cloudFrontIpRateLimit,
              evaluationWindowSec: cloudFrontIpRateLimitWindowSeconds,
            },
          },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'hairProdCloudFrontRateLimitByIp',
            sampledRequestsEnabled: true,
          },
        },
      ],
    });
    productionWebAcl.applyRemovalPolicy(RemovalPolicy.RETAIN);
    const routeRewriteCode = readFileSync(prerenderRouteRewritePath, 'utf8');
    const routeRewrite = new cloudfront.Function(
      this,
      'PrerenderRouteRewrite',
      {
        code: cloudfront.FunctionCode.fromInline(routeRewriteCode),
      },
    );
    const cacheableStaticAssetBehavior = {
      origin: origins.S3BucketOrigin.withOriginAccessControl(site),
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      compress: true,
      cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      functionAssociations: [
        {
          eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          function: routeRewrite,
        },
      ],
    };
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(site),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        compress: true,
        // Keep route documents and stable public files revalidating. This is a
        // managed policy, so it remains compatible with CloudFront Free plans.
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        functionAssociations: [
          {
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
            function: routeRewrite,
          },
        ],
      },
      additionalBehaviors: {
        [contactEndpoint]: {
          ...contactBehavior,
          functionAssociations: [
            {
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
              function: routeRewrite,
            },
          ],
        },
        '*.js': cacheableStaticAssetBehavior,
        '*.css': cacheableStaticAssetBehavior,
      },
      certificate,
      domainNames: [productionCanonicalDomain, productionApexDomain],
      webAclId: productionWebAcl.attrArn,
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 404,
          responsePagePath: '/404/index.html',
          ttl: Duration.seconds(0),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404/index.html',
          ttl: Duration.seconds(0),
        },
      ],
    });
    if (hostedZone) {
      const target = route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(distribution),
      );
      new route53.ARecord(this, 'ProductionApexAliasRecord', {
        zone: hostedZone,
        target,
      });
      new route53.AaaaRecord(this, 'ProductionApexAliasIpv6Record', {
        zone: hostedZone,
        target,
      });
      new route53.ARecord(this, 'ProductionCanonicalAliasRecord', {
        zone: hostedZone,
        recordName: 'www',
        target,
      });
      new route53.AaaaRecord(this, 'ProductionCanonicalAliasIpv6Record', {
        zone: hostedZone,
        recordName: 'www',
        target,
      });
      if (props.googleSiteVerification) {
        new route53.TxtRecord(this, 'GoogleSiteVerificationRecord', {
          zone: hostedZone,
          values: [`google-site-verification=${props.googleSiteVerification}`],
        });
      }
    }
    new cdk.CfnOutput(this, 'SiteBucketName', { value: site.bucketName });
    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
    });
    new cdk.CfnOutput(this, 'HealthUrl', { value: `${api.url}health` });
    if (hostedZone) {
      new cdk.CfnOutput(this, 'ProductionHostedZoneId', {
        value: hostedZone.hostedZoneId,
      });
      new cdk.CfnOutput(this, 'ProductionHostedZoneNameServers', {
        value: cdk.Fn.join(', ', hostedZone.hostedZoneNameServers!),
      });
    }
  }

  private addContactApi(api: apigateway.RestApi): cloudfront.BehaviorOptions {
    const turnstileSecret = new cdk.CfnParameter(this, 'TurnstileSecret', {
      type: 'String',
      noEcho: true,
      minLength: 1,
      description:
        'Cloudflare Turnstile secret for the Comb Report contact form',
    });
    const contact = new lambda.Function(this, 'ContactFunction', {
      runtime: lambda.Runtime.NODEJS_26_X,
      handler: 'dist/contact.handler',
      code: lambda.Code.fromAsset('../api'),
      timeout: Duration.seconds(8),
      environment: {
        CONTACT_SES_FROM: contactMailbox,
        CONTACT_SES_TO: contactMailbox,
        TURNSTILE_SECRET: turnstileSecret.valueAsString,
      },
      logGroup: new logs.LogGroup(this, 'ContactFunctionLogs', {
        retention: logs.RetentionDays.ONE_WEEK,
        removalPolicy: RemovalPolicy.DESTROY,
      }),
    });
    contact.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['ses:SendEmail'],
        resources: [contactMailbox.split('@')[1], contactMailbox].map(
          (identity) =>
            this.formatArn({
              service: 'ses',
              resource: 'identity',
              resourceName: identity,
            }),
        ),
        conditions: {
          StringEquals: { 'ses:FromAddress': contactMailbox },
          'ForAllValues:StringEquals': {
            'ses:Recipients': [contactMailbox],
          },
        },
      }),
    );

    api.root
      .addResource('api')
      .addResource('contact')
      .addMethod('POST', new apigateway.LambdaIntegration(contact));

    return {
      origin: new origins.HttpOrigin(
        `${api.restApiId}.execute-api.${this.region}.${this.urlSuffix}`,
        {
          originPath: `/${api.deploymentStage.stageName}`,
          protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
          connectionAttempts: 1,
        },
      ),
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
      allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
      cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
      originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_CUSTOM_ORIGIN,
    };
  }
}
