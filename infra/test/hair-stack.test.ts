import test from 'node:test';
import assert from 'node:assert/strict';
import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { HairStack } from '../lib/hair-stack.js';
test('creates private static hosting and a health API', () => {
  const app = new cdk.App();
  const stack = new HairStack(app, 'Test', { environment: 'dev' });
  const template = Template.fromStack(stack);
  template.resourceCountIs('AWS::S3::Bucket', 1);
  template.resourceCountIs('AWS::CloudFront::Distribution', 1);
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  assert.ok(template.toJSON());
});

test('adds the production domain and required WAF protection', () => {
  const app = new cdk.App();
  const stack = new HairStack(app, 'Test', {
    environment: 'prod',
    googleSiteVerification: 'test-verification-token',
  });
  const template = Template.fromStack(stack);
  template.resourceCountIs('AWS::Route53::HostedZone', 1);
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
  template.resourceCountIs('AWS::Route53::RecordSet', 5);
  template.hasResourceProperties('AWS::Route53::RecordSet', {
    Type: 'TXT',
    ResourceRecords: ['"google-site-verification=test-verification-token"'],
  });
});
