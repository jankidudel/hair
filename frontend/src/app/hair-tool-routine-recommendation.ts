import { ArticleSlug } from './article-slug';

export type HairLength = 'short' | 'medium' | 'long';
export type RoutineGoal = 'smooth' | 'blowout' | 'curls' | 'travel';
export type StylingTime = 'under-10' | '10-20' | 'over-20';
export type OwnedTool =
  | 'dryer'
  | 'hot-air-brush'
  | 'heated-round-brush'
  | 'rollers'
  | 'round-brush'
  | 'flat-iron'
  | 'curling-iron'
  | 'curling-wand';

export interface HairToolRoutineAnswers {
  readonly length: HairLength;
  readonly goal: RoutineGoal;
  readonly time: StylingTime;
  readonly owned: readonly OwnedTool[];
}

export interface RoutineItem {
  readonly label: 'Start with' | 'Add when useful';
  readonly tool: string;
  readonly detail: string;
}

export interface RoutineLink {
  readonly path: string;
  readonly label: string;
}

export interface HairToolRoutineRecommendation {
  readonly summary: string;
  readonly items: readonly RoutineItem[];
  readonly skip: string;
  readonly links: readonly RoutineLink[];
}

const commonLinks: readonly RoutineLink[] = [
  { path: '/hair-brush-finder', label: 'Use the Hair Brush Finder' },
  {
    path: '/guides/what-hair-tools-do-i-need',
    label: 'Read the starter routine guide',
  },
];

export function recommendHairToolRoutine(
  answers: HairToolRoutineAnswers,
): HairToolRoutineRecommendation {
  const owns = (tool: OwnedTool): boolean => answers.owned.includes(tool);
  const quick = answers.time === 'under-10';
  const shortNote =
    answers.length === 'short'
      ? ' Smaller brush or barrel sizes are usually easier to control on shorter sections.'
      : '';
  const links = [...commonLinks];

  if (answers.goal === 'travel') {
    links.push({
      path: '/guides/how-to-choose-hair-dryer',
      label: 'Use the Hair Dryer Finder',
    });
    return {
      summary:
        'Keep the routine light: a compact brush or comb plus one drying or styling option you will genuinely pack.',
      items: [
        {
          label: 'Start with',
          tool: 'Compact brush or comb',
          detail:
            'A simple preparation tool takes little room and handles everyday smoothing.',
        },
        {
          label: 'Add when useful',
          tool:
            owns('dryer') || owns('hot-air-brush')
              ? 'Your existing compact-friendly styling tool'
              : 'Compact dryer or lightweight styling tool',
          detail:
            'Prioritize packable size and only the features you use away from home.',
        },
      ],
      skip: 'Bulky multi-tool collections add weight without helping a low-effort travel routine.',
      links,
    };
  }

  if (answers.goal === 'blowout') {
    links.push(
      {
        path: '/guides/round-brush-size-guide',
        label: 'Read the round brush size guide',
      },
      {
        path: '/guides/how-to-use-a-round-brush-with-a-hair-dryer',
        label: 'Learn the round-brush blow-dry method',
      },
      {
        path: '/guides/how-to-get-root-volume-with-a-round-brush',
        label: 'Learn about root volume with a round brush',
      },
    );
    if (owns('hot-air-brush'))
      return {
        summary:
          'Your existing airflow brush can cover the drying-and-shaping task when its exact directions permit your starting state.',
        items: [
          {
            label: 'Start with',
            tool: 'Your existing hot-air brush',
            detail:
              'Use its own starting-state and attachment directions; work in manageable sections.',
          },
        ],
        skip: 'A separate dryer and manual round brush would duplicate this selected task unless you want independent nozzle and brush control.',
        links: [
          {
            path: `/guides/${ArticleSlug.ThermalBrushVsHotAirBrush}`,
            label: 'Check airflow versus heated-round stages',
          },
          ...links,
        ],
      };
    if (owns('heated-round-brush'))
      return {
        summary: owns('dryer')
          ? 'Your existing dryer covers drying and your dry-use heated round brush covers a separate dry shaping stage. No new styling tool is essential for this route.'
          : 'Your existing heated round brush covers dry-stage shaping. Plan a separate permitted drying step before using it; the brush itself is not a wet-hair dryer.',
        items: [
          {
            label: 'Start with',
            tool: owns('dryer')
              ? 'Your existing dryer'
              : 'A permitted drying method',
            detail:
              'Complete the drying stage before using the dry-only heated brush; follow the exact appliance directions.',
          },
          {
            label: 'Start with',
            tool: 'Your existing heated round brush',
            detail:
              'Use it for shaping already-dry sections within its exact instructions.',
          },
        ],
        skip: 'A manual round brush is optional only if you want to shape damp sections with a separate dryer or prefer a different section path; it is not a required duplicate purchase.',
        links: [
          {
            path: `/guides/${ArticleSlug.ThermalBrushVsHotAirBrush}`,
            label: 'Compare drying and heated-brush stages',
          },
          ...links,
        ],
      };
    const items: RoutineItem[] = [
      {
        label: 'Start with',
        tool: owns('dryer') ? 'Your existing dryer' : 'Hair dryer',
        detail: 'Use controllable airflow for the drying stage.',
      },
      {
        label: owns('round-brush') ? 'Start with' : 'Add when useful',
        tool: owns('round-brush')
          ? 'Your existing round brush'
          : 'Correctly sized round brush',
        detail:
          answers.length === 'long'
            ? 'For long hair, use workable sections and one suitably larger brush rather than several duplicates.'
            : `Choose a barrel you can guide comfortably.${shortNote}`,
      },
    ];
    return {
      summary:
        owns('dryer') && owns('round-brush')
          ? 'Your existing dryer and manual round brush already cover the drying and shaping stages; no new styling tool is essential.'
          : owns('dryer')
            ? 'Build around the dryer you already own and one correctly sized round brush for a shaped, fuller finish.'
            : 'Keep the blowout setup to a controllable dryer and one correctly sized round brush.',
      items: items.slice(0, 2),
      skip: 'A curling iron is not a priority when curls or waves are not part of the result you want.',
      links,
    };
  }

  if (answers.goal === 'curls') {
    links.push(
      {
        path: '/guides/hot-air-brush-vs-curling-iron',
        label: 'Compare a hot-air brush and curling iron',
      },
      {
        path: '/guides/how-to-choose-hair-dryer',
        label: 'Use the Hair Dryer Finder',
      },
    );
    if (owns('rollers'))
      links.push({
        path: `/guides/${ArticleSlug.HairRollerSizeGuide}`,
        label: 'Plan sections with your existing rollers',
      });
    return {
      summary: owns('rollers')
        ? 'Your existing rollers cover a later setting stage, subject to their exact instructions. Prepare and dry the section as required before setting; a defined result is not guaranteed.'
        : 'Use a drying stage and one finishing category that matches the curls or waves you actually want to create.',
      items: [
        {
          label: 'Start with',
          tool: owns('dryer') ? 'Your existing dryer' : 'Hair dryer',
          detail:
            'Use it for the drying stage; a diffuser can be useful when it fits your routine.',
        },
        {
          label: 'Add when useful',
          tool: owns('rollers')
            ? 'Your existing rollers'
            : 'Curl or wave finishing tool category',
          detail: owns('rollers')
            ? 'Use the exact roller directions for starting state, securing and removal. Rollers do not replace preparation or drying; a new curling appliance is optional.'
            : owns('curling-iron') || owns('curling-wand')
              ? 'Use your existing direct-heat curling tool when it still matches the result you want; do not add a duplicate by default.'
              : 'Choose a curling iron, curling wand, or no extra direct-heat tool for the level of definition you want rather than collecting overlapping tools.',
        },
      ],
      skip: 'A large round brush is not the main tool for making defined curls or waves.',
      links,
    };
  }

  links.push({
    path: '/guides/how-to-choose-hair-brush',
    label: 'Read the hair brush choosing guide',
  });
  links.push({
    path: `/guides/${ArticleSlug.HowToChooseAStraighteningBrush}`,
    label: 'Use the Straightening Brush Finder',
  });
  if (answers.length === 'short' && owns('hot-air-brush'))
    links.push({
      path: '/guides/how-to-use-a-hot-air-brush-on-short-hair',
      label: 'Use a hot-air brush on short hair',
    });
  if (owns('hot-air-brush')) {
    return {
      summary:
        'Keep the routine to your existing hot-air brush and one flexible everyday brush or comb for a simple, smooth finish.',
      items: [
        {
          label: 'Start with',
          tool: 'Suitable everyday brush or comb',
          detail: `Use it for ordinary smoothing and preparation.${shortNote}`,
        },
        {
          label: 'Add when useful',
          tool: 'Your existing hot-air brush',
          detail:
            'It can handle a simple smoothing routine without adding a separate dryer and round brush.',
        },
      ],
      skip: 'A separate dryer and round brush would duplicate this simple-finish setup unless you decide you want a fuller blowout.',
      links,
    };
  }
  if (owns('heated-round-brush')) {
    return {
      summary:
        'Your heated round brush is a dry-hair shaping option only when the exact model permits it; keep a separate drying stage if needed.',
      items: [
        {
          label: 'Start with',
          tool: owns('dryer')
            ? 'Your existing dryer'
            : 'A permitted drying method',
          detail:
            'Finish the drying stage before using a dry-only heated round brush.',
        },
        {
          label: 'Add when useful',
          tool: 'Your existing heated round brush',
          detail:
            'Shape already-dry sections within the exact model directions.',
        },
      ],
      skip: 'An airflow brush duplicates the shaping goal unless you also need its distinct drying routine.',
      links: [
        {
          path: `/guides/${ArticleSlug.ThermalBrushVsHotAirBrush}`,
          label: 'Compare heated and airflow brush stages',
        },
        ...links,
      ],
    };
  }
  const items: RoutineItem[] = [
    {
      label: 'Start with',
      tool: 'Suitable everyday brush or comb',
      detail: `Use one flexible tool for ordinary smoothing and preparation.${shortNote}`,
    },
  ];
  if (!quick && !owns('dryer'))
    items.push({
      label: 'Add when useful',
      tool: 'Hair dryer',
      detail: 'Add one only if you regularly dry or style your hair.',
    });
  if (owns('dryer'))
    items.push({
      label: 'Add when useful',
      tool: 'A round brush for occasional shape',
      detail:
        'It is complementary to your dryer when you want a more shaped finish.',
    });
  return {
    summary: owns('dryer')
      ? 'Keep the routine to a flexible everyday brush and the dryer you already own; add a round brush only when you want a shaped finish.'
      : 'Keep the routine to a flexible everyday brush; add a dryer only if you regularly dry or style your hair.',
    items: items.slice(0, quick ? 1 : 2),
    skip: 'Multiple barrel sizes and specialist styling tools are unnecessary for a simple everyday finish.',
    links,
  };
}
