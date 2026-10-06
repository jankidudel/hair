import 'source-map-support/register.js';
import * as cdk from 'aws-cdk-lib';
import { HairStack } from '../lib/hair-stack.js';
const app = new cdk.App();
const googleSiteVerification = process.env['GOOGLE_SITE_VERIFICATION']?.trim();
if (!googleSiteVerification) {
  throw new Error(
    'GOOGLE_SITE_VERIFICATION is required for production. Add it as a variable in the prod GitHub Environment.',
  );
}
new HairStack(app, 'Hair-prod', {
  googleSiteVerification,
  env: {
    account: process.env['CDK_DEFAULT_ACCOUNT'],
    region: process.env['CDK_DEFAULT_REGION'] ?? 'us-east-1',
  },
});
