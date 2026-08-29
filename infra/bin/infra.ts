import 'source-map-support/register.js';
import * as cdk from 'aws-cdk-lib';
import { HairStack } from '../lib/hair-stack.js';
const app = new cdk.App();
for (const environment of ['dev', 'prod'] as const)
  new HairStack(app, `Hair-${environment}`, {
    environment,
    env: {
      account: process.env['CDK_DEFAULT_ACCOUNT'],
      region: process.env['CDK_DEFAULT_REGION'],
    },
  });
