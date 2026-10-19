import { ArticleSlug } from './article-slug';
import type { PathwayGroup } from './choose-use-fix-pathways.component';

const guide = (slug: string) => `/guides/${slug}`;

export const categoryPathways: Readonly<
  Record<string, readonly PathwayGroup[]>
> = {
  'hair-dryers': [
    {
      label: 'Choose',
      description: 'Compare the dryer, controls and attachments before buying.',
      links: [
        {
          label: 'Build a dryer feature checklist',
          path: guide(ArticleSlug.HairDryerChooser),
        },
        {
          label: 'Choose a hair dryer by routine',
          path: guide(ArticleSlug.HairDryerChooser),
        },
        {
          label: 'Compare Dyson Supersonic and Shark SpeedStyle',
          path: guide(ArticleSlug.DysonSupersonicVsSharkSpeedstyle),
        },
      ],
    },
    {
      label: 'Use',
      description:
        'Turn the exact controls and attachment into a repeatable drying step.',
      links: [
        {
          label: 'Plan a complete blow-dry',
          path: guide(ArticleSlug.HowToBlowDryHair),
        },
        {
          label: 'Use a concentrator nozzle',
          path: guide(ArticleSlug.HowToUseHairDryerConcentratorNozzle),
        },
        {
          label: 'Use a diffuser',
          path: guide(ArticleSlug.HowToUseAHairDryerDiffuser),
        },
      ],
    },
    {
      label: 'Fix',
      description: 'Start from the symptom and change one part of the routine.',
      links: [
        {
          label: 'Hair drying takes too long',
          path: guide(ArticleSlug.HairDryerTakesTooLong),
        },
        {
          label: 'A blowout loses its shape',
          path: guide(ArticleSlug.WhyBlowoutDoesNotLast),
        },
        {
          label: 'Check whether a diffuser fits',
          path: guide(ArticleSlug.HairDryerDiffuserCompatibility),
        },
      ],
    },
  ],
  'hot-air-brushes': [
    {
      label: 'Choose',
      description:
        'Choose the starting state, head format and controls that match the routine.',
      links: [
        {
          label: 'Choose a hot-air brush',
          path: guide(ArticleSlug.BestHotAirBrushes),
        },
        {
          label: 'Compare current Revlon One-Step versions',
          path: guide(ArticleSlug.RevlonOneStepVolumizerVsPlus),
        },
        {
          label: 'Compare BaByliss 2136U and 2764U',
          path: guide(ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume),
        },
      ],
    },
    {
      label: 'Use',
      description:
        'Follow the permitted starting state and a section path the head can release.',
      links: [
        {
          label: 'Use a hot-air brush',
          path: guide(ArticleSlug.HowToUseHotAirBrush),
        },
        {
          label: 'Use one on short hair',
          path: guide(ArticleSlug.HowToUseAHotAirBrushOnShortHair),
        },
        {
          label: 'Use one on long hair',
          path: guide(ArticleSlug.HowToUseAHotAirBrushOnLongHair),
        },
      ],
    },
    {
      label: 'Fix',
      description:
        'Identify whether the problem begins with moisture, section size, movement or the tool.',
      links: [
        {
          label: 'A hot-air-brush finish looks frizzy',
          path: guide(ArticleSlug.HotAirBrushFrizzyHair),
        },
        {
          label: 'Choose powered or manual rotation',
          path: guide(ArticleSlug.RotatingVsFixedHotAirBrush),
        },
        {
          label: 'Clean a hot-air brush safely',
          path: guide(ArticleSlug.HowToCleanHotAirBrush),
        },
      ],
    },
  ],
  'brushes-and-combs': [
    {
      label: 'Choose',
      description:
        'Match the contact shape and permitted use to one real task.',
      links: [
        { label: 'Use the Hair Brush Finder', path: '/hair-brush-finder' },
        {
          label: 'Choose a brush by job',
          path: guide(ArticleSlug.HowToChooseHairBrush),
        },
        {
          label: 'Compare a wide-tooth comb and detangler',
          path: guide(ArticleSlug.WideToothCombVsDetanglingBrush),
        },
      ],
    },
    {
      label: 'Use',
      description:
        'Work with manageable sections and the method for the exact brush shape.',
      links: [
        {
          label: 'Use a round brush with a dryer',
          path: guide(ArticleSlug.HowToUseARoundBrushWithAHairDryer),
        },
        {
          label: 'Create root volume with a round brush',
          path: guide(ArticleSlug.HowToGetRootVolumeWithARoundBrush),
        },
        {
          label: 'Choose a defining or detangling step',
          path: guide(ArticleSlug.CurlDefiningBrushVsDetanglingBrush),
        },
      ],
    },
    {
      label: 'Fix',
      description:
        'Inspect the tool and the caught section before buying a replacement.',
      links: [
        {
          label: 'Free a stuck round brush',
          path: guide(ArticleSlug.RoundBrushStuckInHair),
        },
        {
          label: 'Clean a manual brush',
          path: guide(ArticleSlug.HowToCleanAHairBrush),
        },
        {
          label: 'Clean a comb’s teeth and spine',
          path: guide(ArticleSlug.HowToCleanAHairComb),
        },
        {
          label: 'Decide whether to replace a brush or comb',
          path: guide(ArticleSlug.WhenToReplaceHairbrushOrComb),
        },
      ],
    },
  ],
  'hair-accessories': [
    {
      label: 'Choose',
      description:
        'Choose the closure, coverage and format before choosing a material claim.',
      links: [
        {
          label: 'Choose a heatless curling set',
          path: guide(ArticleSlug.BestHeatlessCurlingSets),
        },
        {
          label: 'Choose sectioning clips',
          path: guide(ArticleSlug.HowToChooseHairSectioningClips),
        },
        {
          label: 'Compare a bonnet and pillowcase',
          path: guide(ArticleSlug.SatinBonnetVsSatinPillowcase),
        },
      ],
    },
    {
      label: 'Use',
      description:
        'Follow the placement, fastening and removal path for the item in hand.',
      links: [
        {
          label: 'Use a heatless curling rod',
          path: guide(ArticleSlug.HowToUseHeatlessCurlingRod),
        },
        {
          label: 'Use and remove self-grip rollers',
          path: guide(ArticleSlug.HowToUseVelcroHairRollers),
        },
        {
          label: 'Fasten a microfiber hair towel',
          path: guide(ArticleSlug.HowToUseAMicrofibreHairTowel),
        },
      ],
    },
    {
      label: 'Fix',
      description:
        'Find the stage that failed before changing the entire setup.',
      links: [
        {
          label: 'Troubleshoot heatless curls',
          path: guide(ArticleSlug.HeatlessCurlsNotWorking),
        },
        {
          label: 'Stop short ends slipping from a set',
          path: guide(ArticleSlug.HowToUseHeatlessCurlersOnShortHair),
        },
        {
          label: 'Fix a slipping claw clip',
          path: guide(ArticleSlug.HowToChooseClawClipSize),
        },
      ],
    },
  ],
};
