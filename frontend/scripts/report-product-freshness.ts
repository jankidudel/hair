import { productProfiles } from '../src/app/product-comparisons';
import { articleRegistry } from '../src/app/article-registry';

const thresholdDays = Number(process.env['PRODUCT_FRESHNESS_DAYS'] ?? 120);
const today = new Date('2026-09-20T00:00:00Z');
const ageInDays = (date: string) =>
  Math.floor(
    (today.getTime() - new Date(`${date}T00:00:00Z`).getTime()) / 86_400_000,
  );
const stale = productProfiles.filter(
  (item) => !item.verifiedAt || ageInDays(item.verifiedAt) > thresholdDays,
);
const missingSources = productProfiles.filter(
  (item) =>
    !item.officialProductUrl ||
    item.verifiedFacts.some((fact) => !fact.sourceUrl),
);
const disabledGuides = productProfiles.flatMap((item) =>
  item.relatedGuideSlugs
    .filter(
      (slug) =>
        !articleRegistry.some(
          (article) => article.slug === slug && article.enabled,
        ),
    )
    .map((slug) => `${item.slug} -> ${slug}`),
);

console.log(`Product freshness report (threshold: ${thresholdDays} days)`);
console.log(`Records: ${productProfiles.length}`);
console.log(
  `Missing verification date: ${productProfiles.filter((item) => !item.verifiedAt).length}`,
);
console.log(
  `Older than threshold: ${stale.length}${stale.length ? ` (${stale.map((item) => item.slug).join(', ')})` : ''}`,
);
console.log(
  `Missing official/fact source: ${missingSources.length}${missingSources.length ? ` (${missingSources.map((item) => item.slug).join(', ')})` : ''}`,
);
console.log(
  `Products linked to disabled/missing guides: ${disabledGuides.length}${disabledGuides.length ? ` (${disabledGuides.join(', ')})` : ''}`,
);
console.log(
  `Limited-evidence records: ${
    productProfiles
      .filter((item) => item.evidenceStatus === 'limited-specification')
      .map((item) => item.slug)
      .join(', ') || 'none'
  }`,
);
if (stale.length || missingSources.length || disabledGuides.length)
  process.exitCode = 1;
