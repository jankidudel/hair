import { articles } from '../../frontend/src/app/content.generated.ts';

const failures: string[] = [];
const warnings: string[] = [];
const canonicals = new Set<string>();
const titles = new Set<string>();
for (const article of articles) {
  const canonical = `/guides/${article.slug}`;
  if (canonicals.has(canonical))
    failures.push(`Duplicate canonical: ${canonical}`);
  canonicals.add(canonical);
  if (!article.title || !article.description || !article.heading)
    failures.push(`${canonical}: title, description, and H1 are required.`);
  if (titles.has(article.title))
    warnings.push(`${canonical}: duplicate title '${article.title}'.`);
  titles.add(article.title);
  if (!article.authorId || !article.contentMethod || !article.primaryIntent)
    failures.push(
      `${canonical}: author, method, and primary intent are required.`,
    );
  if (
    article.contentMethod === 'hands-on-tested' ||
    article.contentMethod === 'expert-reviewed'
  )
    failures.push(`${canonical}: unsupported evidence-labelled method.`);
  if (/\b(?:prioritise|travelling|microfibre)\b/i.test(article.html))
    warnings.push(
      `${canonical}: likely UK spelling; review for US editorial consistency.`,
    );
}
if (failures.length) {
  console.error(
    `SEO validation failed:\n${failures.map((item) => `- ${item}`).join('\n')}`,
  );
  process.exit(1);
}
for (const warning of warnings) console.warn(`SEO warning: ${warning}`);
console.log(`SEO validation passed (${articles.length} editorial pages).`);
