export type DryerLength = 'short' | 'medium' | 'long';
export type DryerDensity = 'fine' | 'medium' | 'thick';
export type DryerGoal = 'quick' | 'smooth' | 'diffuser' | 'travel';
export type DryerPriority = 'lightweight' | 'airflow' | 'price' | 'attachments';
export type DiffuserNeed = 'yes' | 'no' | 'not-sure';

export interface HairDryerAnswers {
  length: DryerLength;
  density: DryerDensity;
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
  readonly features: readonly string[];
  readonly caution: string;
  readonly links: readonly HairDryerGuideLink[];
}

const guides = {
  fine: { slug: 'best-hair-dryers-fine-hair', label: 'Dryers for fine hair' },
  thick: {
    slug: 'best-hair-dryers-thick-hair',
    label: 'Dryers for thick hair',
  },
  curly: {
    slug: 'best-hair-dryers-curly-hair',
    label: 'Dryers for curly hair',
  },
  travel: { slug: 'best-travel-hair-dryers', label: 'Travel hair dryers' },
  attachments: {
    slug: 'hair-dryer-diffuser-vs-concentrator',
    label: 'Diffuser vs concentrator',
  },
  ionic: {
    slug: 'ionic-vs-ceramic-hair-dryer',
    label: 'Ionic vs ceramic hair dryers',
  },
} as const;

const hairDescription = (answers: HairDryerAnswers): string =>
  `${answers.length}, ${answers.density} hair`;

export function recommendHairDryer(answers: HairDryerAnswers): HairDryerResult {
  // Goal is intentionally evaluated first, followed by diffuser need, then hair
  // and finally the stated preference when the choices pull in different directions.
  if (answers.goal === 'travel')
    return {
      heading: 'Look for a lightweight, compact dryer that stores easily',
      explanation: `For ${hairDescription(answers)}, a travel-first choice should earn its space before it tries to copy every feature of a full-size dryer. Prioritise a foldable or compact body and check the cable and storage details that will matter on the trips you actually take.`,
      features: [
        'Foldable/compact design',
        'Weight',
        'Cable length',
        'Heat/speed controls',
      ],
      caution:
        'Compact models may have fewer attachment options, so only make room for the ones you will use.',
      links: [guides.travel, guides.attachments],
    };

  if (answers.goal === 'diffuser')
    return {
      heading:
        'Look for a dryer with a compatible diffuser and usable controls',
      explanation: `Your diffuser use takes priority over the other choices. For ${hairDescription(answers)}, check that the diffuser is made for the exact dryer and that the heat and airflow settings feel manageable for your routine. ${answers.priority === 'lightweight' ? 'A lighter body is still worth comparing once compatibility is confirmed.' : 'The attachment fit matters more than a generic diffuser-shaped extra.'}`,
      features: [
        'Diffuser',
        'Attachment compatibility',
        'Heat/speed controls',
        'Weight',
      ],
      caution:
        'Compatibility matters more than a generic diffuser-shaped attachment.',
      links: [guides.curly, guides.attachments],
    };

  if (answers.goal === 'smooth')
    return {
      heading: 'Look for a concentrator nozzle with controllable settings',
      explanation: `For a smooth blowout, directional airflow and easy adjustment matter more than a headline specification. With ${hairDescription(answers)}, choose a dryer you can hold comfortably while working through sections, then use the cool-shot when you want to finish the shape.`,
      features: [
        'Concentrator nozzle',
        'Heat/speed controls',
        'Cool-shot button',
        answers.priority === 'lightweight' ? 'Weight' : 'Airflow/motor',
      ],
      caution:
        'A diffuser is not essential for this goal if you do not expect to use one.',
      links: [
        answers.density === 'fine' ? guides.fine : guides.ionic,
        guides.attachments,
      ],
    };

  if (answers.diffuser === 'yes')
    return {
      heading: 'Look for a compatible diffuser alongside everyday controls',
      explanation: `Quick everyday drying remains your main goal, but a diffuser should be part of the comparison if you know you will use one. For ${hairDescription(answers)}, confirm the attachment fit first, then compare airflow, settings and weight.`,
      features: [
        'Diffuser',
        'Attachment compatibility',
        'Airflow/motor',
        'Heat/speed controls',
      ],
      caution:
        'Compatibility matters more than a generic diffuser-shaped attachment.',
      links: [guides.curly, guides.attachments],
    };

  if (answers.density === 'fine')
    return {
      heading:
        'Look for controllable airflow in a dryer that feels light to hold',
      explanation: `For fine hair and quickest everyday drying, usable lower settings are more valuable than always reaching for maximum heat. A lightweight dryer with a concentrator gives you a practical balance of speed and control for your usual routine.`,
      features: [
        'Heat/speed controls',
        'Weight',
        'Airflow/motor',
        'Concentrator nozzle',
      ],
      caution: 'Do not equate maximum heat with a better result.',
      links: [guides.fine, guides.ionic],
    };

  if (answers.density === 'thick' || answers.length === 'long')
    return {
      heading:
        'Look for consistent airflow with controls you can use comfortably',
      explanation: `For ${hairDescription(answers)} and quickest everyday drying, steady airflow and several settings make the practical difference. Your ${answers.priority === 'lightweight' ? 'weight preference remains important, so compare balance as well as airflow.' : 'routine will be easier to manage when the dryer stays comfortable through longer sessions.'}`,
      features: [
        'Airflow/motor',
        'Heat/speed controls',
        'Weight',
        'Cable length',
      ],
      caution:
        'Divide into sections; a dryer alone cannot make oversized sections dry evenly.',
      links: [guides.thick, guides.attachments],
    };

  if (answers.priority === 'price')
    return {
      heading: 'Look for the essential controls before a long feature list',
      explanation: `For everyday drying, start with usable heat and speed settings, comfortable handling and the attachment that matches your usual finish. That keeps the comparison focused on features you will actually reach for rather than a higher price alone.`,
      features: [
        'Heat/speed controls',
        'Weight',
        'Concentrator nozzle',
        'Cable length',
      ],
      caution:
        'Do not pay for feature lists that do not match the intended routine.',
      links: [guides.ionic, guides.attachments],
    };

  return {
    heading: 'Look for controllable airflow in a comfortable everyday dryer',
    explanation: `For ${hairDescription(answers)} and quick everyday drying, choose a dryer with enough airflow to keep your routine moving and settings you can adjust easily. ${answers.priority === 'attachments' ? 'Compare the attachment set only after the core controls fit your routine.' : 'A balanced handle can matter as much as a bigger motor when you use it regularly.'}`,
    features: [
      'Airflow/motor',
      'Heat/speed controls',
      'Weight',
      answers.priority === 'attachments'
        ? 'Attachment compatibility'
        : 'Cool-shot button',
    ],
    caution:
      'Very high power is less helpful if the dryer is uncomfortable to hold.',
    links: [guides.ionic, guides.attachments],
  };
}
