export type DryerLength = 'short' | 'medium' | 'long';
export type DryerSectionAmount = 'lower' | 'medium' | 'higher';
export type DryerGoal = 'quick' | 'smooth' | 'diffuser' | 'travel';
export type DryerPriority = 'lightweight' | 'airflow' | 'price' | 'attachments';
export type DiffuserNeed = 'yes' | 'no' | 'not-sure';

export interface HairDryerAnswers {
  length: DryerLength;
  sectionAmount: DryerSectionAmount;
  goal: DryerGoal;
  priority: DryerPriority;
  diffuser: DiffuserNeed;
}

export interface HairDryerGuideLink {
  readonly slug: string;
  readonly label: string;
}

export interface HairDryerFeature {
  readonly name: string;
  readonly why: string;
}

export interface HairDryerComparison {
  readonly slug: string;
  readonly label: string;
  /** Market and exact generation the linked comparison covers. */
  readonly scope: string;
}

export interface HairDryerResult {
  readonly heading: string;
  readonly features: readonly HairDryerFeature[];
  readonly comparisons: readonly HairDryerComparison[];
  readonly nextCheck: string;
  readonly explanation: string;
  readonly priority: string;
  readonly diffuserNote?: 'yes' | 'not-sure';
  readonly smallerSection: boolean;
  readonly links: readonly HairDryerGuideLink[];
}

export const dryerGoalGuidance = {
  quick: {
    heading: 'Compare usable controls',
    explanation:
      'Check heat and airflow controls you can operate in your usual grip. A wattage or motor label does not establish the drying time for your routine.',
    slug: 'hair-dryer-heat-and-speed-settings-guide',
    label: 'Hair dryer heat and speed settings guide',
  },
  smooth: {
    heading: 'Check the concentrator setup',
    explanation:
      'Confirm the exact nozzle, compatible connection and clear working space around your brush. Follow both the dryer and brush instructions.',
    slug: 'how-to-use-hair-dryer-concentrator-nozzle',
    label: 'How to use a hair dryer concentrator nozzle',
  },
  diffuser: {
    heading: 'Verify the diffuser first',
    explanation:
      'Confirm the dryer model, attachment connection and selected box contents before comparing additional features.',
    slug: 'hair-dryer-diffuser-compatibility',
    label: 'Hair dryer diffuser compatibility',
  },
  travel: {
    heading: 'Check the actual appliance rating',
    explanation:
      'Confirm operating input, plug and the manufacturer’s travel restrictions. A compact or folding body does not establish electrical compatibility.',
    slug: 'plug-adapter-vs-voltage-converter-hair-tools',
    label: 'Plug adapter versus voltage converter for hair tools',
  },
} as const;
/** Three features, matched comparisons and one next check per routine. */
export const dryerGoalComparisons: Readonly<
  Record<
    DryerGoal,
    {
      readonly features: readonly HairDryerFeature[];
      readonly comparisons: readonly HairDryerComparison[];
      readonly nextCheck: string;
    }
  >
> = {
  quick: {
    features: [
      {
        name: 'Separate heat and airflow controls',
        why: 'You can keep airflow up while lowering heat, instead of one combined setting.',
      },
      {
        name: 'A cool shot you can reach',
        why: 'It lets a section settle without changing your main settings.',
      },
      {
        name: 'Weight and grip',
        why: 'An everyday dryer is held often; balance matters more than a small specification gap.',
      },
    ],
    comparisons: [
      {
        slug: 'ghd-air-vs-helios',
        label: 'ghd Air vs Helios',
        scope: 'UK models',
      },
      {
        slug: 't3-aireluxe-vs-featherweight-stylemax',
        label: 'T3 AireLuxe vs Featherweight StyleMax',
        scope: 'US 76812 and 77832',
      },
    ],
    nextCheck:
      'Hold an unpowered display model, or check the manual images, to see whether the buttons sit under your thumb in your usual grip.',
  },
  smooth: {
    features: [
      {
        name: 'A supplied, compatible concentrator',
        why: 'Brush-led smoothing depends on directed air along one section.',
      },
      {
        name: 'Separate heat and airflow controls',
        why: 'You can adjust one while holding the brush with the other hand.',
      },
      {
        name: 'Clear working space at the nozzle',
        why: 'A long or bulky nozzle can crowd the brush near the root.',
      },
    ],
    comparisons: [
      {
        slug: 'parlux-alyon-vs-digitalyon',
        label: 'Parlux Alyon vs Digitalyon',
        scope: 'International catalogue, selected packs',
      },
      {
        slug: 'ghd-air-vs-helios',
        label: 'ghd Air vs Helios',
        scope: 'UK models',
      },
    ],
    nextCheck:
      'Confirm the exact nozzle is in the box you are buying, not only shown in a product photo.',
  },
  diffuser: {
    features: [
      {
        name: 'An exact compatible diffuser',
        why: 'Fit is model-specific; a similar-looking part may not attach.',
      },
      {
        name: 'Box inclusion',
        why: 'Some boxes include a diffuser and others in the same family do not.',
      },
      {
        name: 'Lower airflow settings',
        why: 'Diffusing usually uses moderate airflow rather than the maximum.',
      },
    ],
    comparisons: [
      {
        slug: 'parlux-diffuser-compatibility',
        label: 'Parlux diffuser compatibility',
        scope: 'International catalogue, by dryer model',
      },
      {
        slug: 'dyson-supersonic-nural-vs-supersonic-r',
        label: 'Dyson Supersonic Nural vs Supersonic r',
        scope: 'Selected UK boxes',
      },
    ],
    nextCheck:
      'Find the diffuser on the maker’s list for your exact dryer body before ordering either one.',
  },
  travel: {
    features: [
      {
        name: 'Automatic voltage or a manual selector',
        why: 'Each works differently; the manual says which your dryer has.',
      },
      {
        name: 'Plug and adapter rating',
        why: 'An adapter changes the plug shape, not the voltage, and has its own power limit.',
      },
      {
        name: 'Packed size and case',
        why: 'A folding handle or case changes what fits in your bag.',
      },
    ],
    comparisons: [
      {
        slug: 'dyson-supersonic-travel-vs-ghd-flight-plus',
        label: 'Dyson Supersonic Travel vs ghd Flight+',
        scope: 'HD19 and Flight+, UK and US listings',
      },
      {
        slug: 'best-travel-hair-dryers',
        label: 'Travel hair dryers',
        scope: 'Named US and UK models',
      },
    ],
    nextCheck:
      'Read the rating label and manual for your destination’s supply before packing; not every model suits every country.',
  },
};
const priorities: Record<DryerPriority, string> = {
  lightweight:
    'Compare weights with the same definition, then consider grip and cable route.',
  airflow:
    'Look for the airflow choices you expect to use; no measured airflow ranking is supplied here.',
  price:
    'Compare the complete current offer, including any necessary attachment, rather than an unmaintained price tier.',
  attachments:
    'Check the accessories supported by the exact model and generation, not only the brand.',
};
export function recommendHairDryer(answers: HairDryerAnswers): HairDryerResult {
  const guidance = dryerGoalGuidance[answers.goal];
  const comparison = dryerGoalComparisons[answers.goal];
  return {
    heading: guidance.heading,
    features: comparison.features,
    comparisons: comparison.comparisons,
    nextCheck: comparison.nextCheck,
    explanation: guidance.explanation,
    priority: priorities[answers.priority],
    diffuserNote:
      answers.diffuser === 'not-sure'
        ? 'not-sure'
        : answers.diffuser === 'yes' && answers.goal !== 'diffuser'
          ? 'yes'
          : undefined,
    smallerSection: answers.sectionAmount === 'higher',
    links: [{ slug: guidance.slug, label: guidance.label }],
  };
}
