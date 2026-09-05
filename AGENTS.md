# Hair editorial rules

This is a hair appearance, grooming, styling, tools, and product-comparison site—not a health site.

Never create or publish medical or health content, including diagnosis, treatment, supplements, disease, hair-loss treatments, hormonal content, prescriptions, or medical claims. Keep advice focused on cosmetic appearance and ordinary grooming. New or edited HTML sources under `frontend/content/` must pass `npm run content:check`; flagged language requires editorial review and revision before it is published.

Articles use the `.html` extension with required front matter and a safe HTML body. Use the shared Angular article page—never add an Angular component per article. Interactive experiences and bespoke landing pages are Angular components, not custom HTML blocks.

## Dependency versions

Use exact package versions in every `package.json`: for example, `"rehype-parse": "9.0.1"`, never `"^9.0.1"`, `"~9.0.1"`, or another range. Keep the lockfile in sync whenever a dependency changes.
