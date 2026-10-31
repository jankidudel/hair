import { ArticleSlug } from './article-slug';

export const modelComparisonDescriptions: Readonly<
  Partial<Record<string, string>>
> = {
  [ArticleSlug.GhdSpeedVsHelios]:
    'Compare documented controls, nozzle setup and the reason to replace a working dryer.',
  [ArticleSlug.GhdGlidePlusVsGlidePlusMax]:
    'Compare two current paddle formats by dry-stage access and section control.',
  [ArticleSlug.DysonSupersonicNuralVsSupersonicR]:
    'Compare two exact UK consumer boxes and their attachment jobs.',
  [ArticleSlug.DysonAirstraitVsGhdDuetStyle]:
    "Separate airflow straightening from the combined tool's wet and dry-only modes.",
  [ArticleSlug.DysonAirwrapIdVsCoAnda2x]:
    'Check connected features, attachment fit and which jobs justify a new kit.',
  [ArticleSlug.T3AirebrushVsAirebrushRound]:
    'Compare exact US oval and round heads, shared controls and the access question that would justify another brush.',
  [ArticleSlug.T3SinglepassCurlXVsGhdSoftCurl]:
    'Compare the US 1.25-inch T3 SinglePass Curl X and original ghd Soft Curl by controls, published barrel evidence and ownership checks, without a performance ranking.',
  [ArticleSlug.GhdAirVsHelios]:
    'Compare the UK nozzle, control and ownership details.',
  [ArticleSlug.ParluxAlyonVsDigitalyon]:
    'Separate model specifications from the selected attachment pack.',
  [ArticleSlug.CloudNineOriginalIronVsWideIron]:
    'Compare the current plate formats and shared controls.',
  [ArticleSlug.GhdSoftCurlTongVsCreativeCurlWand]:
    'Choose between the original Curve clamp and tapered-wand formats.',
  [ArticleSlug.TangleTeezerUltimateDetanglerVsFineFragile]:
    'Keep the handled versions separate from palm-held Original and other variants.',
};

interface ComparisonGroup {
  readonly heading: string;
  readonly intro: string;
  readonly cards: readonly { readonly label: string; readonly slug: string }[];
}

export const modelComparisonGroups: Readonly<
  Partial<Record<string, ComparisonGroup>>
> = {
  'hair-dryers': {
    heading: 'Compare the exact dryer and attachment offer',
    intro:
      'Use published controls, motor descriptions and box contents to compare the models you are considering. A higher input figure is not a timed result for your routine.',
    cards: [
      { label: 'ghd Speed vs Helios', slug: ArticleSlug.GhdSpeedVsHelios },
      {
        label: 'Dyson Nural vs Supersonic r',
        slug: ArticleSlug.DysonSupersonicNuralVsSupersonicR,
      },
      { label: 'ghd Air or Helios?', slug: ArticleSlug.GhdAirVsHelios },
      {
        label: 'Parlux Alyon or Digitalyon?',
        slug: ArticleSlug.ParluxAlyonVsDigitalyon,
      },
    ],
  },
  'hot-air-brushes': {
    heading: 'Compare exact hot-air brush models',
    intro: 'Keep model, market and head-format evidence together.',
    cards: [
      {
        label: 'ghd Glide+ vs Glide+ Max',
        slug: ArticleSlug.GhdGlidePlusVsGlidePlusMax,
      },
      {
        label: 'Airwrap i.d. vs Co-anda2x',
        slug: ArticleSlug.DysonAirwrapIdVsCoAnda2x,
      },
      {
        label: 'T3 AireBrush vs AireBrush Round',
        slug: ArticleSlug.T3AirebrushVsAirebrushRound,
      },
    ],
  },
  'direct-heat': {
    heading: 'Compare width, barrel and holding action',
    intro:
      'Start with the section you need to reach and the movement you want to use. Then check the exact named model rather than a similar-looking variant.',
    cards: [
      {
        label: 'Dyson Airstrait vs ghd Duet Style',
        slug: ArticleSlug.DysonAirstraitVsGhdDuetStyle,
      },
      {
        label: 'T3 SinglePass Curl X vs ghd Soft Curl',
        slug: ArticleSlug.T3SinglepassCurlXVsGhdSoftCurl,
      },
      {
        label: 'CLOUD NINE Original or Wide Iron?',
        slug: ArticleSlug.CloudNineOriginalIronVsWideIron,
      },
      {
        label: 'ghd Soft Curl Tong or Creative Curl Wand?',
        slug: ArticleSlug.GhdSoftCurlTongVsCreativeCurlWand,
      },
    ],
  },
  'brushes-and-combs': {
    heading: 'Compare tooth feel within one brush range',
    intro:
      'A softer-tooth option is a specific design difference to assess, not a reason to replace a brush that already prepares your sections comfortably.',
    cards: [
      {
        label: 'Ultimate Detangler or Fine & Fragile?',
        slug: ArticleSlug.TangleTeezerUltimateDetanglerVsFineFragile,
      },
    ],
  },
};
