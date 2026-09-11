export type DryerUseLocation = 'home' | 'occasional-travel' | 'frequent-travel';
export type DryerWattage = 'under-1400' | '1400-1800' | 'over-1800' | 'unknown';
export type DryerVoltage = 'single' | 'dual' | 'unknown';
export type DryerPriority =
  'light-compact' | 'home-drying' | 'faster-drying' | 'travel-flexibility';

export interface HairDryerSpecsAnswers {
  readonly location: DryerUseLocation;
  readonly wattage: DryerWattage;
  readonly voltage: DryerVoltage;
  readonly priority: DryerPriority;
}

export interface HairDryerSpecsLink {
  readonly path: string;
  readonly label: string;
}

export interface HairDryerSpecsResult {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly links: readonly HairDryerSpecsLink[];
}

const wattageContext =
  'Wattage describes electrical power draw; it is not a direct score for airflow or drying speed.';

const travelVoltageCheck =
  'Check the voltage range printed on the dryer and its instructions before packing it. A plug adapter changes the plug shape, not the supply voltage.';

const travelGuide = {
  path: '/guides/best-travel-hair-dryers',
  label: 'Read the travel hair dryer guide',
};
const chooserGuide = {
  path: '/guides/how-to-choose-hair-dryer',
  label: 'Use the Hair Dryer Finder',
};
const products = {
  path: '/products',
  label: 'Browse product comparisons',
};

export function decodeHairDryerSpecs(
  answers: HairDryerSpecsAnswers,
): HairDryerSpecsResult {
  if (answers.location !== 'home') {
    const travellingOften = answers.location === 'frequent-travel';
    if (answers.voltage !== 'dual') {
      return {
        heading: 'Make voltage compatibility your first travel check',
        paragraphs: [
          wattageContext,
          travelVoltageCheck,
          travellingOften
            ? 'Because you travel often, choose clear compatibility information before comparing compactness, wattage or attachments.'
            : 'For an occasional trip, confirm compatibility before deciding whether this dryer is worth packing.',
        ],
        links: [travelGuide],
      };
    }

    return {
      heading: 'Your dual-voltage marking can support flexible travel',
      paragraphs: [
        wattageContext,
        'A dual- or multi-voltage dryer can be more flexible for travel only when its printed voltage range is compatible with your destination. Follow any switch or selector instructions supplied with that dryer.',
        answers.priority === 'travel-flexibility'
          ? 'Prioritise compact size, compatible voltage marking and plug planning. Add a concentrator or diffuser only when you will use it.'
          : 'Once compatibility is confirmed, compare the size, weight and controls that will make it useful away from home.',
      ],
      links: [travelGuide, chooserGuide],
    };
  }

  if (answers.wattage === 'under-1400') {
    return {
      heading: 'A lower wattage can still suit a home routine',
      paragraphs: [
        wattageContext,
        'Under 1,400 W may be a sensible choice when portability or a lighter dryer matters. Compare drying performance and heat and speed settings rather than dismissing it.',
        'For home use, put wattage alongside airflow and motor design, attachments, weight and cable length.',
      ],
      links: [chooserGuide],
    };
  }

  if (answers.wattage === 'over-1800') {
    return {
      heading: 'A higher figure is one home-use detail to investigate',
      paragraphs: [
        wattageContext,
        'Over 1,800 W may suit a power-focused home routine, but it can also make weight, heat control and noise worth checking.',
        'Compare airflow and motor design, settings, attachments and cable length before treating the label as a shortcut to performance.',
      ],
      links: [chooserGuide, products],
    };
  }

  if (answers.wattage === 'unknown') {
    return {
      heading: 'Find the label before making wattage a deciding factor',
      paragraphs: [
        wattageContext,
        'The number may be on the dryer, manual or manufacturer specification. Until you can confirm it, compare airflow or motor information, heat and speed controls, attachments, weight and cable length.',
      ],
      links: [chooserGuide, products],
    };
  }

  return {
    heading: 'This is a practical middle range to compare in context',
    paragraphs: [
      wattageContext,
      'For everyday home drying, 1,400–1,800 W can be a useful starting point, not a universal target. Compare airflow and motor design, heat and speed controls, attachments, weight and cable length.',
      answers.priority === 'light-compact'
        ? 'If a lighter dryer matters most, check balance and the features you will actually use alongside the label.'
        : 'Choose the control layout and attachments that best suit your usual routine.',
    ],
    links: [chooserGuide, products],
  };
}
