import 'source-map-support/register.js';
import * as cdk from 'aws-cdk-lib';
import { HairStack } from '../lib/hair-stack.js';
const app = new cdk.App();
const stage = process.env['STAGE'] ?? 'dev';
const googleSiteVerification = process.env['GOOGLE_SITE_VERIFICATION']?.trim();
if (stage === 'prod' && !googleSiteVerification) {
  throw new Error(
    'GOOGLE_SITE_VERIFICATION is required for production. Add it as a variable in the prod GitHub Environment.',
  );
}
for (const environment of ['dev', 'prod'] as const)
  new HairStack(app, `Hair-${environment}`, {
    environment,
    googleSiteVerification:
      environment === 'prod' ? googleSiteVerification : undefined,
    env: {
      account: process.env['CDK_DEFAULT_ACCOUNT'],
      region: process.env['CDK_DEFAULT_REGION'] ?? 'us-east-1',
    },
  });
