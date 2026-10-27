/** Main article copy only: exclude metadata, FAQ, navigation and source tails. */
export function guideBodyStats(html: string) {
  const main = html.split(
    /<h2\b[^>]*>\s*(?:FAQ|Evidence scope|Sources|Related guides)\s*<\/h2>/i,
  )[0];
  const text = main
    .replace(/<!--[^]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:#\d+|#x[\da-f]+|\w+);/gi, ' ');
  return {
    words: (text.match(/[\p{L}\p{N}'’-]+/gu) ?? []).length,
    headings: [...main.matchAll(/<h2\b[^>]*>([^]*?)<\/h2>/gi)].map((match) =>
      match[1].replace(/<[^>]+>/g, '').trim(),
    ),
  };
}
export function guideBodyErrors(html: string): string[] {
  const stats = guideBodyStats(html);
  const errors: string[] = [];
  if (stats.words < 500)
    errors.push(`body is too short (${stats.words}; minimum 500).`);
  if (stats.headings.length < 3)
    errors.push('needs at least 3 main H2 sections.');
  if (
    stats.headings.filter((heading) => heading === 'Quick answer').length !== 1
  )
    errors.push('needs exactly one Quick answer.');
  if (/<h1\b/i.test(html)) errors.push('body must not contain H1.');
  return errors;
}

export function renderedGuideBody(html: string): {
  intro: string;
  body: string;
} {
  const intro =
    html.match(/<div[^>]*class="lede task-intro"[^>]*>([^]*?)<\/div>/)?.[1] ??
    '';
  const body = [
    ...html.matchAll(
      /<section[^>]*class="article-body"[^>]*>([^]*?)<\/section>/g,
    ),
  ]
    .map((m) => m[1])
    .filter((s) => !/id="source-checks-heading"/.test(s))
    .join('');
  return { intro, body };
}

/** Inspect the actual prerendered article; a homepage/not-found shell cannot pass. */
export function renderedGuideErrors(
  html: string,
  expected: {
    heading: string;
    body: string;
    faqs: readonly { question: string; answer: string }[];
    sourceUrls: readonly string[];
    relatedPaths: readonly string[];
  },
): string[] {
  const errors: string[] = [];
  const article =
    html.match(
      /<article\b[^>]*class="[^"]*article-page[^]*?<\/article>/,
    )?.[0] ?? '';
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  if (
    article.match(/<h1\b[^>]*>([^]*?)<\/h1>/)?.[1].trim() !==
    escape(expected.heading)
  )
    errors.push('missing expected article identity.');
  const { intro, body } = renderedGuideBody(article);
  errors.push(...guideBodyErrors(intro + body));
  // Compare body text, not just metadata or a coincidentally matching H1.
  const normal = (s: string) =>
    s
      .replace(/<[^>]+>/g, ' ')
      .replace(/&(?:amp|#38);/g, '&')
      .replace(/&#(?:39|x27);/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  if (normal(intro + body) !== normal(expected.body))
    errors.push('rendered main copy does not match the authored body.');
  const faq = article.indexOf('class="article-faq"');
  const evidence = article.indexOf('id="evidence-scope-title"');
  const sources = article.indexOf('id="source-checks-heading"');
  const related = article.indexOf('id="next-steps-heading"');
  if (!(faq > 0 && faq < evidence && evidence < sources && sources < related))
    errors.push('missing or unordered FAQ/evidence/source/related tail.');
  for (const item of expected.faqs)
    if (
      !normal(article.slice(faq, evidence)).includes(
        normal(escape(item.question)),
      ) ||
      !normal(article.slice(faq, evidence)).includes(
        normal(escape(item.answer)),
      )
    )
      errors.push(`missing FAQ '${item.question}'.`);
  for (const url of expected.sourceUrls)
    if (!article.slice(sources, related).includes(`href="${url}"`))
      errors.push(`missing source '${url}'.`);
  for (const path of expected.relatedPaths)
    if (!article.slice(related).includes(`href="${path}"`))
      errors.push(`missing related destination '${path}'.`);
  return errors;
}
