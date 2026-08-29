import test from 'node:test';
import assert from 'node:assert/strict';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
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
