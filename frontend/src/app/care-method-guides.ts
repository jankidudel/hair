import { ArticleSlug } from './article-slug';
import type { GuideEvidence, GuideSource } from './guide-evidence';

const sources: Readonly<Record<string, GuideSource>> = {
  S1: {
    label: 'AAD ordinary washing guidance',
    model: 'AAD ordinary washing guidance',
    market: 'General English',
    url: 'https://www.aad.org/public/everyday-care/hair-scalp-care/hair/healthy-hair-tips',
    checkedDate: '27 October 2026',
    scope:
      'Washing based on visible dirt and oil only; no universal interval or personal schedule supplied.',
  },
  S2: {
    label: 'ghd Bodyguard All Hair Types',
    model: 'ghd Bodyguard All Hair Types',
    market: 'UK',
    url: 'https://www.ghdhair.com/heat-protect-products/ghd-heat-protect-spray-p-236',
    checkedDate: '27 October 2026',
    scope:
      'Exact formula identity; promotional benefits are not independent findings.',
  },
  S3: {
    label: 'ghd heat-protection spray directions',
    model: 'ghd heat-protection spray directions',
    market: 'UK',
    url: 'https://www.ghdhair.com/heat-protect-products-c',
    checkedDate: '27 October 2026',
    scope:
      'Named family damp/dry application and product-drying handoff; verify the exact pack.',
  },
  S4: {
    label: 'Moroccanoil All in One Leave-in Conditioner',
    model: 'Moroccanoil All in One Leave-in Conditioner',
    market: 'UK',
    url: 'https://uk.moroccanoil.com/products/leave-in-conditioner',
    checkedDate: '27 October 2026',
    scope:
      'Clean towel-dried application and distribution before the chosen styling routine.',
  },
  S5: {
    label: 'OUAI Leave in Conditioner North Bondi',
    model: 'OUAI Leave in Conditioner North Bondi',
    market: 'US',
    url: 'https://theouai.com/products/leave-in-conditioner-north-bondi',
    checkedDate: '27 October 2026',
    scope:
      'Named wet placement and separate dry-use description; no variant equivalence assumed.',
  },
  S6: {
    label: 'Mason Pearson pocket-family care',
    model: 'Mason Pearson pocket-family care',
    market: 'UK',
    url: 'https://masonpearson.com/pocket-hairbrushes/',
    checkedDate: '27 October 2026',
    scope:
      'Loose-hair removal, permitted bristle/pad washing and bristles-down drying; no universal immersion rule.',
  },
  S7: {
    label: 'Mason Pearson Pocket Boar Bristle B4',
    model: 'Mason Pearson Pocket Boar Bristle B4',
    market: 'UK',
    url: 'https://masonpearson.com/product/pocket-boar-bristle-hairbrush-b4/',
    checkedDate: '27 October 2026',
    scope:
      'Boar tufts, natural-rubber cushion and cellulose-acetate handle/base only.',
  },
  S8: {
    label: 'Mason Pearson brush families',
    model: 'Mason Pearson brush families',
    market: 'UK',
    url: 'https://masonpearson.com/choose-a-brush/',
    checkedDate: '27 October 2026',
    scope:
      'Pure boar, mixed boar/nylon and nylon distinctions; positioning is not an independent comparison.',
  },
  S9: {
    label: 'OUAI Fine Hair Conditioner rinse directions',
    model: 'OUAI Fine Hair Conditioner rinse directions',
    market: 'US',
    url: 'https://theouai.com/products/fine-hair-conditioner',
    checkedDate: '27 October 2026',
    scope:
      'One formula includes a cold final rinse; no universal shine or cuticle outcome established.',
  },
  S10: {
    label: 'Kent construction-specific product aftercare',
    model: 'Kent construction-specific product aftercare',
    market: 'UK',
    url: 'https://kentbrushes.com/pages/product-after-care',
    checkedDate: '27 October 2026',
    scope:
      'The listed bristle/wood-backed group keeps water away from wood, avoids submersion and dries naturally.',
  },
};

export const careMethodEvidence: Readonly<
  Partial<Record<ArticleSlug, GuideEvidence>>
> = {
  [ArticleSlug.ColdWaterForHair]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'This guide distinguishes product directions, preference and evidence limits. It contains no controlled warm-versus-cold rinse test or universal temperature recommendation.',
    sourceIntro:
      'These records document the named instructions or construction examples. They do not establish an independent result for this guide.',
    sources: [sources.S9],
  },
  [ArticleSlug.HowOftenShouldYouWashYourHair]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'The washing principle is linked to general AAD guidance on oil and dirt. The observation table is editorial routine organisation for appearance and ordinary grooming; no universal frequency is assigned.',
    sourceIntro:
      'These records document the named instructions or construction examples. They do not establish an independent result for this guide.',
    sources: [sources.S1],
  },
  [ArticleSlug.BestHairBrushForShortHair]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'This editorial selection guide organises manual-tool access and task checks. It provides no timed drying comparison, measured comfort ranking or universal short-hair size.',
    sourceIntro:
      'These records document the named instructions or construction examples. They do not establish an independent result for this guide.',
    sources: [sources.S7],
  },
  [ArticleSlug.BestLeaveInConditionersDryHair]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'This selection framework uses exact manufacturer directions as examples. It does not rank formulas by measured conditioning, protection or feel.',
    sourceIntro:
      'These records document the named instructions or construction examples. They do not establish an independent result for this guide.',
    sources: [sources.S4, sources.S5],
  },
  [ArticleSlug.HairBrushVsComb]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'This is an editorial map of contact patterns and routine roles. It does not measure detangling, comfort, speed or damage and does not prescribe wet handling for every hair type.',
    sourceIntro:
      'These records document the named instructions or construction examples. They do not establish an independent result for this guide.',
    sources: [sources.S7, sources.S8],
  },
  [ArticleSlug.BoarBristleBrushGuide]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Named manufacturer records establish construction and published positioning. No independent smoothing, oil-distribution, heat-tolerance or comfort result is claimed.',
    sourceIntro:
      'These records document the named instructions or construction examples. They do not establish an independent result for this guide.',
    sources: [sources.S7, sources.S8],
  },
  [ArticleSlug.BestHeatProtectants]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'This is a selection framework with a named manufacturer direction example. It provides no independent thermal-protection test, formula ranking or personal heat setting.',
    sourceIntro:
      'These records document the named instructions or construction examples. They do not establish an independent result for this guide.',
    sources: [sources.S2, sources.S3],
  },
  [ArticleSlug.HowToApplyHeatProtectant]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'The sequence is editorial application organisation with a named ghd readiness example. It does not establish protection strength, a shared dose, a personal setting or a universal reapplication interval.',
    sourceIntro:
      'These records document the named instructions or construction examples. They do not establish an independent result for this guide.',
    sources: [sources.S2, sources.S3],
  },
  [ArticleSlug.HowToApplyLeaveInConditioner]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Named manufacturer directions illustrate application differences. The organisation and review prompts are editorial; no formula ranking or dose conversion is supplied.',
    sourceIntro:
      'These records document the named instructions or construction examples. They do not establish an independent result for this guide.',
    sources: [sources.S4, sources.S5],
  },
  [ArticleSlug.HowToCleanABoarBristleHairbrush]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Named manufacturer care scopes are kept distinct. This is ordinary manual-brush care, not a disinfection method, a universal soak recipe or a repair procedure.',
    sourceIntro:
      'These records document the named instructions or construction examples. They do not establish an independent result for this guide.',
    sources: [sources.S6, sources.S7, sources.S10],
  },
};
export const careMethodRelated: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.ColdWaterForHair]: [
    ArticleSlug.HowOftenShouldYouWashYourHair,
    ArticleSlug.BestLeaveInConditionersDryHair,
    ArticleSlug.HowToUseAMicrofibreHairTowel,
  ],
  [ArticleSlug.HowOftenShouldYouWashYourHair]: [
    ArticleSlug.ColdWaterForHair,
    ArticleSlug.BestLeaveInConditionersDryHair,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.BestHairBrushForShortHair]: [
    ArticleSlug.HairBrushVsComb,
    ArticleSlug.BoarBristleBrushGuide,
    ArticleSlug.RoundBrushSizeGuide,
  ],
  [ArticleSlug.BestLeaveInConditionersDryHair]: [
    ArticleSlug.HowToApplyLeaveInConditioner,
    ArticleSlug.CurlCreamVsLeaveInConditioner,
    ArticleSlug.BestHeatProtectants,
  ],
  [ArticleSlug.HairBrushVsComb]: [
    ArticleSlug.WideToothCombVsDetanglingBrush,
    ArticleSlug.CurlDefiningBrushVsDetanglingBrush,
    ArticleSlug.BestHairBrushForShortHair,
  ],
  [ArticleSlug.BoarBristleBrushGuide]: [
    ArticleSlug.HowToCleanABoarBristleHairbrush,
    ArticleSlug.BoarBristleVsNylonBrush,
    ArticleSlug.HairBrushVsComb,
  ],
  [ArticleSlug.BestHeatProtectants]: [
    ArticleSlug.HowToApplyHeatProtectant,
    ArticleSlug.HeatProtectantSprayVsCream,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.HowToApplyHeatProtectant]: [
    ArticleSlug.BestHeatProtectants,
    ArticleSlug.HeatProtectantSprayVsCream,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.HowToApplyLeaveInConditioner]: [
    ArticleSlug.BestLeaveInConditionersDryHair,
    ArticleSlug.CurlCreamVsLeaveInConditioner,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.HowToCleanABoarBristleHairbrush]: [
    ArticleSlug.BoarBristleBrushGuide,
    ArticleSlug.HowToCleanAHairBrush,
    ArticleSlug.WhenToReplaceHairbrushOrComb,
  ],
};
export const careMethodSlugs = Object.keys(careMethodEvidence) as ArticleSlug[];
