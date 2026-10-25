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

export interface HairDryerResult {
  readonly heading: string;
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
  return {
    heading: guidance.heading,
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
