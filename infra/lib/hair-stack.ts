import * as cdk from 'aws-cdk-lib';
import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
export interface HairStackProps extends StackProps {
  environment: 'dev' | 'prod';
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
    const routeRewrite = new cloudfront.Function(
      this,
      'PrerenderRouteRewrite',
      {
        code: cloudfront.FunctionCode.fromInline(`function handler(event) {
  var request = event.request;
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
      defaultRootObject: 'index.html',
    });
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
  }
}
