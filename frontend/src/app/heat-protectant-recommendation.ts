export type HeatProtectantStylingStep = 'blow-dry' | 'dry-tool' | 'both';
export type HeatProtectantApplication = 'damp' | 'dry';
export type HeatProtectantDensity = 'fine' | 'medium' | 'thick';
export type HeatProtectantFinish = 'lightweight' | 'softening' | 'neutral';

export interface HeatProtectantAnswers {
  readonly stylingStep: HeatProtectantStylingStep;
  readonly application: HeatProtectantApplication;
  readonly density: HeatProtectantDensity;
  readonly finish: HeatProtectantFinish;
}

export interface HeatProtectantResult {
  readonly heading: string;
  readonly explanation: string;
  readonly priorities: readonly string[];
  readonly reminder: string;
}

export function recommendHeatProtectant(
  answers: HeatProtectantAnswers,
): HeatProtectantResult {
  const finish =
    answers.finish === 'lightweight'
      ? 'a lightweight feel'
      : answers.finish === 'softening'
        ? 'a softer, more conditioned feel'
        : 'a simple, neutral finish';

  if (answers.application === 'dry') {
    return {
      heading: 'Start with a formula specifically labelled for dry hair',
      explanation: `For dry-hair styling, choose by the label first. A mist or other dry-use format may be easier to distribute for ${finish}, but its directions need to explicitly allow application to dry hair before your chosen tool.`,
      priorities: [
        'Clear dry-hair directions on the label',
        'Even coverage through manageable sections',
        'A format that does not leave your hair feeling overloaded',
      ],
      reminder:
        'Do not assume a damp-hair formula can be reapplied to dry hair; follow the maker’s directions.',
    };
  }

  if (answers.stylingStep === 'dry-tool') {
    return {
      heading: 'Check the directions for your dry-hair styling step',
      explanation: `A straightener, curling tool or heated brush is used on fully dry hair. Choose a formula whose directions explicitly cover that step, even if you prefer ${finish} and applied another product earlier in your routine.`,
      priorities: [
        'Clear dry-hair styling directions on the label',
        'A format that distributes evenly through dry sections',
        'An amount that leaves your hair comfortable to style',
      ],
      reminder:
        'Do not rely on a damp-hair application alone unless the maker says it is suitable for your later dry-hair styling step.',
    };
  }

  if (answers.stylingStep === 'both') {
    return {
      heading:
        'Plan each heat step rather than assuming one application covers both',
      explanation: `When you blow-dry and later use a dry-hair styling tool, begin with a formula labelled for damp hair and check the instructions again before the later step. Your preference for ${finish} can help you choose a format you will use consistently.`,
      priorities: [
        'Damp-hair directions before blow-drying',
        'Clear instructions for any later dry-hair styling',
        'A comfortable amount spread through sections',
      ],
      reminder:
        'A product label, rather than the format name alone, tells you whether and when it can be reapplied.',
    };
  }

  return {
    heading:
      answers.density === 'fine'
        ? 'Start with a light, easy-to-distribute damp-hair format'
        : 'Start with a damp-hair format you can distribute evenly',
    explanation: `For a blow-dry routine, a spray, cream, lotion or milk can all be practical if the directions allow damp-hair use. Choose the application style that helps you achieve ${finish} without making the routine fussy.`,
    priorities: [
      'Damp-hair directions on the label',
      'Even distribution from mid-lengths through ends',
      'An amount that feels comfortable for your hair',
    ],
    reminder:
      'A heat protectant supports a considered routine; use tool settings and sectioning you can comfortably control.',
  };
}
