import test from 'node:test';
import assert from 'node:assert/strict';
import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { HairStack } from '../lib/hair-stack.js';
test('creates private static hosting and a health API in production', () => {
  const app = new cdk.App();
  const stack = new HairStack(app, 'Test', {
    googleSiteVerification: 'test-verification-token',
  });
  const template = Template.fromStack(stack);
  template.resourceCountIs('AWS::S3::Bucket', 1);
  template.resourceCountIs('AWS::CloudFront::Distribution', 1);
  template.resourceCountIs('AWS::CloudFront::CachePolicy', 0);
  template.hasResourceProperties('AWS::CloudFront::Distribution', {
    DistributionConfig: Match.objectLike({
      DefaultCacheBehavior: Match.objectLike({
        CachePolicyId: '4135ea2d-6df8-44a3-9df3-4b5a84be39ad',
      }),
      CacheBehaviors: Match.arrayWith([
        Match.objectLike({
          PathPattern: '*.js',
          CachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6',
          FunctionAssociations: Match.arrayWith([
            Match.objectLike({ EventType: 'viewer-request' }),
          ]),
        }),
        Match.objectLike({
          PathPattern: '*.css',
          CachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6',
          FunctionAssociations: Match.arrayWith([
            Match.objectLike({ EventType: 'viewer-request' }),
          ]),
        }),
      ]),
    }),
  });
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  assert.ok(template.toJSON());
});

test('adds the production domain and required WAF protection', () => {
  const app = new cdk.App();
  const stack = new HairStack(app, 'Test', {
    googleSiteVerification: 'test-verification-token',
  });
  const template = Template.fromStack(stack);
  template.resourceCountIs('AWS::Route53::HostedZone', 1);
  assert.equal(Object.keys(template.toJSON().Parameters ?? {}).length, 1);
  template.hasResourceProperties('AWS::CertificateManager::Certificate', {
    DomainName: 'www.combreport.com',
    SubjectAlternativeNames: ['combreport.com'],
  });
  template.hasResourceProperties('AWS::CloudFront::Distribution', {
    DistributionConfig: {
      Aliases: ['www.combreport.com', 'combreport.com'],
      WebACLId: {
        'Fn::GetAtt': [Match.stringLikeRegexp('^ProductionWebAcl'), 'Arn'],
      },
      CustomErrorResponses: [
        {
          ErrorCachingMinTTL: 0,
          ErrorCode: 403,
          ResponseCode: 404,
          ResponsePagePath: '/404/index.html',
        },
        {
          ErrorCachingMinTTL: 0,
          ErrorCode: 404,
          ResponseCode: 404,
          ResponsePagePath: '/404/index.html',
        },
      ],
    },
  });
  template.hasResourceProperties('AWS::WAFv2::WebACL', {
    Name: 'hair-prod-cloudfront',
    Scope: 'CLOUDFRONT',
  });
  const productionFunction = Object.values(
    template.findResources('AWS::CloudFront::Function'),
  )[0] as { Properties: { FunctionCode: string } };
  assert.doesNotMatch(
    productionFunction.Properties.FunctionCode,
    /expectedAuthorization/,
  );
  template.resourceCountIs('AWS::Route53::RecordSet', 5);
  template.hasResourceProperties('AWS::Route53::RecordSet', {
    Type: 'TXT',
    ResourceRecords: ['"google-site-verification=test-verification-token"'],
  });
});
