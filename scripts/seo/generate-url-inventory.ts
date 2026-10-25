import { runBuiltRouteAudit } from './audit-built-routes.ts';
// Inventory now reports measured built metadata and explicit policy, not guessed titles or inclusion.
await runBuiltRouteAudit('reports/seo-url-inventory.json');
