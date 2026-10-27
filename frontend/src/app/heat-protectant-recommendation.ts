export type HeatProtectantStylingStep = 'drying' | 'contact' | 'both';
export type HeatProtectantApplication = 'unselected' | 'damp' | 'dry';
export type HeatProtectantDirections = 'unclear' | 'damp' | 'dry' | 'both';
export type HeatProtectantFinish = 'none' | 'light' | 'conditioned';

export interface HeatProtectantAnswers {
  readonly stylingStep: HeatProtectantStylingStep;
  readonly application: HeatProtectantApplication;
  readonly directions: HeatProtectantDirections;
  readonly finish: HeatProtectantFinish;
}
export interface HeatProtectantResult {
  readonly heading: string;
  readonly explanation: string;
  readonly sequence: string;
  readonly preference?: string;
  readonly reminder: string;
}
export const heatProtectantDefaults: HeatProtectantAnswers = {
  stylingStep: 'drying',
  application: 'unselected',
  directions: 'unclear',
  finish: 'none',
};
export function recommendHeatProtectant(
  answers: HeatProtectantAnswers,
): HeatProtectantResult {
  let heading: string;
  let explanation: string;
  if (answers.directions === 'unclear') {
    heading = 'Read the product directions first';
    explanation =
      "The allowed starting state is not recorded. Check the exact formula's application instructions before choosing a method.";
  } else if (answers.application === 'unselected') {
    heading = 'Choose the planned application state';
    explanation =
      'Record the state in which you intend to apply the product, then compare it with the exact directions. Do not infer the answer from spray or cream.';
  } else if (
    (answers.application === 'damp' && answers.directions === 'dry') ||
    (answers.application === 'dry' && answers.directions === 'damp')
  ) {
    heading = 'The recorded starting states do not match';
    explanation =
      'Your planned application and the states recorded from the label differ. Recheck the formula or change the plan before proceeding; the helper does not override those directions.';
  } else {
    heading = 'Review coverage and readiness';
    explanation =
      'The recorded starting-state answers agree. This does not verify the product, its quantity or the appliance stage. Check placement, distribution and readiness in the exact instructions.';
  }
  const sequences = {
    drying:
      'For the drying stage, check the exact dryer or airflow-brush preparation requirements alongside the product directions.',
    contact:
      'Before a dry-hair styling tool, meet its required hair and product state. A heat-protectant name does not establish readiness for contact.',
    both: 'Check the later styling stage separately. Neither automatic full reapplication nor assumed continuing coverage is established by these answers.',
  };
  const preferences = {
    light:
      'Compare the actual formula and the amount its directions specify. A spray format alone does not guarantee a lighter result.',
    conditioned:
      "Compare the actual formula's role and directions. A cream format alone does not establish a richer or better result.",
  };
  return {
    heading,
    explanation,
    sequence: sequences[answers.stylingStep],
    preference:
      answers.finish === 'none' ? undefined : preferences[answers.finish],
    reminder: 'No product winner, dose or appliance setting is generated.',
  };
}
