import * as cdk from 'aws-cdk-lib';
import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import { Construct } from 'constructs';

const productionApexDomain = 'combreport.com';
const productionCanonicalDomain = `www.${productionApexDomain}`;
const cloudFrontIpRateLimit = 3_000;
const cloudFrontIpRateLimitWindowSeconds = 300;
export interface HairStackProps extends StackProps {
  environment: 'dev' | 'prod';
  googleSiteVerification?: string;
}
export class HairStack extends Stack {
  constructor(scope: Construct, id: string, props: HairStackProps) {
    super(scope, id, props);
    const production = props.environment === 'prod';
    this.tags.setTag('Project', 'hair');
    this.tags.setTag('Environment', props.environment);
    const site = new s3.Bucket(this, 'SiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: production ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      autoDeleteObjects: !production,
    });
    const hostedZone = production
      ? new route53.PublicHostedZone(this, 'ProductionHostedZone', {
          zoneName: productionApexDomain,
        })
      : undefined;
    const certificate = hostedZone
      ? new acm.Certificate(this, 'ProductionCertificate', {
          domainName: productionCanonicalDomain,
          subjectAlternativeNames: [productionApexDomain],
          validation: acm.CertificateValidation.fromDns(hostedZone),
        })
      : undefined;
    const productionWebAcl = production
      ? new wafv2.CfnWebACL(this, 'ProductionWebAcl', {
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
        })
      : undefined;
    productionWebAcl?.applyRemovalPolicy(RemovalPolicy.RETAIN);
    const routeRewrite = new cloudfront.Function(
      this,
      'PrerenderRouteRewrite',
      {
        code: cloudfront.FunctionCode.fromInline(`function handler(event) {
  var request = event.request;
  if (request.headers.host.value === '${productionApexDomain}') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: {
          value: 'https://${productionCanonicalDomain}' + request.uri
        }
      }
    };
  }
  if (request.uri.endsWith('/')) request.uri += 'index.html';
  else if (!request.uri.includes('.')) request.uri += '/index.html';
  return request;
}`),
      },
    );
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
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
      },
      certificate,
      domainNames: certificate
        ? [productionCanonicalDomain, productionApexDomain]
        : undefined,
      webAclId: productionWebAcl?.attrArn,
      defaultRootObject: 'index.html',
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
    // `npm run build --workspace=api` creates api/dist before CDK deployment.
    const health = new lambda.Function(this, 'HealthFunction', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'dist/health.handler',
      code: lambda.Code.fromAsset('../api'),
      timeout: Duration.seconds(10),
    });
    const api = new apigateway.LambdaRestApi(this, 'Api', {
      handler: health,
      proxy: false,
    });
    api.root
      .addResource('health')
      .addMethod('GET', new apigateway.LambdaIntegration(health));
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
}
