import { ArticleSlug } from './article-slug';

export interface DecisionSnapshotContent {
  readonly label?: string;
  readonly heading?: string;
  readonly intro: string;
  readonly rows: readonly {
    readonly label: string;
    readonly text: string;
  }[];
  readonly footer?: string;
}

export interface RelatedDecisionLinks {
  readonly sentence: string;
  readonly links: readonly { readonly label: string; readonly path: string }[];
}

export interface EvidenceOwner {
  readonly productSlugs: readonly string[];
  readonly upgradeBeforeHeading: string;
  readonly marketContext?: string;
}

const guide = (slug: string) => `/guides/${slug}`;

export const decisionSnapshots: Readonly<
  Record<string, DecisionSnapshotContent>
> = {
  [ArticleSlug.HowToSectionHairForStyling]: {
    label: 'Quick answer',
    intro:
      'Separate an area you can reach and control, park the unused hair clear of the working path, and release only what you need next. Change the section when handling becomes awkward; there is no universal number of sections for every tool or routine.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToUseAWideToothComb]: {
    label: 'Quick answer',
    intro:
      'Check the exact comb’s permitted use, separate a manageable section and begin at the ends. Move higher only as the lower part becomes easy to pass through. Stop and reassess a catch rather than using more force.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToUseACurlDefiningBrush]: {
    label: 'Quick answer',
    intro:
      'Start with a section that is already manageable, check the manual brush’s directions and use a controlled styling movement with a clear release path. Stop if it catches. Compare the released section before repeating the movement across the rest of your hair.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToUseAHairPick]: {
    label: 'Quick answer',
    intro:
      'Read the exact pick’s intended use, work on a prepared area and use a controlled lifting movement without dragging through a catch. Step back to inspect the outline before repeating the action. Do not assume the tool permits heat or full-length detangling.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToPlopHair]: {
    label: 'Quick answer',
    intro:
      'Use a suitable clean towel or fabric, lower the lengths into its centre and fasten it according to its design without pulling. Unwrap carefully before continuing your routine. If the position or closure is awkward, use an upright blotting or cupping method instead.',
    rows: [],
    footer: '',
  },

  [ArticleSlug.HowToUseHairspray]: {
    label: 'Quick answer',
    intro:
      'Read the can or bottle before spraying. Follow its hair-state instructions, distance and warnings, apply to the intended area, and let the application settle as directed before deciding whether another pass is needed.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.FlexibleVsStrongHoldHairspray]: {
    label: 'Quick answer',
    intro:
      'Use flexible and strong hold as starting points for reading a product description. Compare the exact formula’s intended finish and application directions; do not assume that the same number or adjective means the same result across brands.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.SeaSaltSprayVsTexturisingSpray]: {
    label: 'Quick answer',
    intro:
      'Check the intended finish and whether each product is applied to damp hair, dry hair or either. Do not assume that every texture spray is a dry finishing aerosol or that every sea salt spray follows the same method.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToUseSeaSaltSpray]: {
    label: 'Quick answer',
    intro:
      'Check the label’s starting hair state, apply to the intended sections and follow its arranging and drying method. Review distribution and the finished result before deciding that the routine needs more product.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.PomadeVsHairClay]: {
    label: 'Quick answer',
    intro:
      'Read the stated finish, hold and preparation instructions for each product. Do not choose solely on the assumption that pomade always means high shine or clay always means a matte result.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToApplyHairPomade]: {
    label: 'Quick answer',
    intro:
      'Follow the exact pomade’s preparation and starting-state directions, spread it as instructed and work through the intended areas. Arrange the hair before deciding whether another application is needed.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HairMousseVsGel]: {
    label: 'Quick answer',
    intro:
      'Choose mousse if you prefer distributing a foam through your styling sections. Choose gel if you prefer working with a non-foamed formula whose placement you can control section by section. Compare labelled hold, application state and drying directions separately.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.CurlCreamVsLeaveInConditioner]: {
    label: 'Quick answer',
    intro:
      'Choose by the missing step in your routine. A leave-in may provide the conditioning or preparation you want, while a curl cream may focus on styling your existing curl pattern. Check the exact directions before deciding that both are necessary.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToApplyHairMousse]: {
    label: 'Quick answer',
    intro:
      'Follow the exact container’s dispensing instructions, prepare the permitted hair state and distribute the mousse through manageable sections. Judge the result after the intended drying routine before changing the amount or adding another product.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToApplyGelToCurlyHair]: {
    label: 'Quick answer',
    intro:
      'Use the gel’s permitted starting state, separate manageable sections and distribute the stated amount using its application method. Complete the intended drying routine before deciding whether coverage, quantity or the formula needs changing.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HairSerumVsHairOil]: {
    label: 'Quick answer',
    intro:
      'Check what the product contains, where it is applied and whether it belongs before styling or on the finished hair. Choose the formula for the job you need; the words serum and oil do not establish purity, weight, heat protection or repair.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HairStylingProductOrder]: {
    label: 'Quick answer',
    intro:
      'Check appliance restrictions first, then group compatible products by their stated application stage. Use a manufacturer’s sequence for the exact combination where available. Do not assume every routine needs leave-in, cream, mousse, gel, serum and oil.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToUseHeatedHairRollers]: {
    label: 'Quick answer',
    intro:
      'Check the exact kit manual, prepare the permitted starting state, heat the rollers as directed, wrap manageable sections, secure the supplied clips and follow the kit’s removal instructions. Treat clips as potentially hot too.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.BobbyPinsVsUShapedHairPins]: {
    label: 'Quick answer',
    intro:
      'A closed bobby pin grips a small section between two arms. An open U pin or rigid French pin is placed through an arranged bun or twist. Choose by the fastening action, then check the exact pin’s shape and directions.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToUseBobbyPins]: {
    label: 'Quick answer',
    intro:
      'Use an intact closed bobby pin on a small section. For a conventional crimped pin, place the crimped side toward the scalp, slide it through the section into nearby hair and release it gently. Reposition instead of forcing a tight or slipping pin.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToUseAFrenchHairPin]: {
    label: 'Quick answer',
    intro:
      'Form and support the bun first, then guide the rigid pin through the arranged hair using its maker’s method. Check the hold before releasing your hand. If it slips or presses, remove it and rebuild the placement rather than pushing harder.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToChooseAHairBarrette]: {
    label: 'Quick answer',
    intro:
      'Gather the section as you intend to wear it, then check whether the clasp closes and releases normally around that amount of hair. Compare the fastening underneath the decoration; outside length alone does not show holding capacity.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToWashASatinBonnet]: {
    label: 'Quick answer',
    intro:
      'Read the bonnet’s fibre and care label first. Follow its permitted wash and drying method, clean the band as well as the body and let every layer dry before storage. Satin describes a fabric construction, not one universal washing rule.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToCleanHairScrunchies]: {
    label: 'Quick answer',
    intro:
      'Check whether the exact scrunchie permits spot cleaning, hand washing or machine washing. Treat the fabric, elastic and decoration as one item. A washable pillowcase from the same brand does not establish that its scrunchies can be washed the same way.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToCleanAHairComb]: {
    label: 'Quick answer',
    intro:
      'Remove loose hair, check the material and care instructions, then clean the teeth and spine with permitted tools and products. Do not default to soaking. Dry before storage and stop using a comb with a cracked tooth or rough edge.',
    rows: [],
    footer: '',
  },
  [ArticleSlug.HowToUseFlexiRods]: {
    label: 'Quick answer',
    intro:
      'Start with the instructions for your exact rod set and any products you plan to use. Detangle each section, secure the ends, wrap with consistent tension, bend the rod only enough to hold it, and remove it by reversing the wrap after the set is ready.',
    rows: [
      {
        label: 'This method may suit',
        text: 'A heatless set where each section needs its own bendable closure.',
      },
      {
        label: 'Check first',
        text: 'Your rod maker’s starting-state, product and set-readiness instructions; these are not identical across every set.',
      },
    ],
    footer: '',
  },
  [ArticleSlug.HowToUseSnapClosureFoamRollers]: {
    label: 'Quick answer',
    intro:
      'Follow the instructions for your exact roller set. Smooth a manageable section, place the ends on the foam, roll without twisting the section into a rope, close the frame without trapping loose hair, and open the closure fully before reversing the roll.',
    rows: [
      {
        label: 'This method may suit',
        text: 'A heatless roller set where each section is held by a built-in snap closure.',
      },
      {
        label: 'Check first',
        text: 'The set’s starting-state and product directions, plus any loose hair near the hinge or clasp.',
      },
    ],
    footer: '',
  },
  [ArticleSlug.HowToCleanHairStraightenerPlates]: {
    label: 'Quick answer',
    intro:
      'Unplug the straightener, let it cool completely and clean only as the exact model instructions allow. Keep liquid away from openings, do not scrape the plates, and stop using the tool if the heated surface or electrical parts are damaged.',
    rows: [
      {
        label: 'This page covers',
        text: 'Routine external cleaning and a visual check before the next use.',
      },
      {
        label: 'Do not improvise',
        text: 'A household cleaning hack is not a substitute for model-specific instructions.',
      },
    ],
    footer: '',
  },
  [ArticleSlug.HowToCleanACurlingIronOrWand]: {
    label: 'Quick answer',
    intro:
      'Switch off, unplug and let the tool cool completely. Follow the exact manual for the barrel and exterior, keep moisture away from openings, never scrape the finish, and stop using the tool if the barrel, clamp, housing, cord or plug is damaged.',
    rows: [
      {
        label: 'This page covers',
        text: 'Routine external cleaning of a conventional curling iron or clipless wand.',
      },
      {
        label: 'Check the format',
        text: 'A rotating, air-powered, steam or multi-styling tool may have separate maintenance instructions and should not be treated as a conventional barrel tool.',
      },
    ],
    footer: '',
  },
  [ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume]: {
    heading: 'Choose attachments or one repeatable brush routine',
    intro:
      'Air Style 1000 model 2136U covers several documented jobs by changing attachments. Flawless Volume model 2764U keeps the routine centred on one 38 mm brush head.',
    rows: [
      {
        label: 'Choose the first option',
        text: 'Choose Air Style 1000 if you will use its drying nozzle, 50 mm brush, paddle brush or conical attachment and are willing to change and store the parts.',
      },
      {
        label: 'Choose the second option',
        text: 'Choose Flawless Volume if one brush-led routine matches the job and you do not need interchangeable attachments.',
      },
      {
        label: 'Keep what you have',
        text: 'Keep a working dryer-and-brush setup when it already dries and shapes the sections you normally style.',
      },
    ],
  },
  [ArticleSlug.GhdChronosVsPlatinumPlus]: {
    heading: 'Choose from controls and ownership details',
    intro:
      'Both compared standard-width tools use a preset styling temperature. The clearest documented differences are the control description, inactivity shutoff and current ownership terms.',
    rows: [
      {
        label: 'Choose the first option',
        text: 'Choose Chronos if its 10-minute inactivity shutoff and current Chronos control design solve a real preference.',
      },
      {
        label: 'Choose the second option',
        text: 'Choose Platinum+ if its 30-minute shutoff, current package and established control design fit your routine.',
      },
      {
        label: 'Keep what you have',
        text: 'Keep a working standard-width straightener when neither documented difference changes the way you style.',
      },
    ],
  },
  [ArticleSlug.GhdGoldVsPlatinumPlus]: {
    heading: 'Choose from ownership terms, not the technology name',
    intro:
      'The compared US black models share a 1-inch plate label, one preset 365°F setting and a 30-minute inactivity shutoff.',
    rows: [
      {
        label: 'Choose the first option',
        text: 'Choose Gold if its fixed control, listed plate guard and current two-year US warranty meet the purchase.',
      },
      {
        label: 'Choose the second option',
        text: 'Choose Platinum+ if its current three-year US warranty and different maker-described monitoring system matter to you.',
      },
      {
        label: 'Keep what you have',
        text: 'Keep either working tool when the alternative adds no documented feature you will use.',
      },
    ],
  },
  [ArticleSlug.GhdChronosVsChronosMax]: {
    heading: 'Choose the plate width you can use consistently',
    intro:
      'The standard Chronos and Chronos Max belong to the same named family, but the plate-width choice changes section coverage and edge access.',
    rows: [
      {
        label: 'Choose the first option',
        text: 'Choose standard Chronos when a standard-width plate gives you the access and section control you need.',
      },
      {
        label: 'Choose the second option',
        text: 'Choose Chronos Max when its documented wider plate matches the broad sections you regularly straighten.',
      },
      {
        label: 'Keep what you have',
        text: 'Keep the current iron when changing width would not solve a section-handling problem.',
      },
    ],
  },
  [ArticleSlug.DysonSupersonicVsSharkSpeedstyle]: {
    heading: 'Choose the exact dryer and attachment set',
    intro:
      'Compare the current models by controls, supplied attachments, documented weight and local package. Brand-level claims do not establish a head-to-head drying result.',
    rows: [
      {
        label: 'Choose the first option',
        text: 'Choose the Dyson Supersonic Nural™ hair dryer if its exact attachments and controls match the drying and finishing jobs you repeat.',
      },
      {
        label: 'Choose the second option',
        text: 'Choose the Shark SpeedStyle™ Pro Hair Dryer System (HD731) if its exact attachments and controls cover those jobs with a package you prefer.',
      },
      {
        label: 'Keep what you have',
        text: 'Keep a working dryer when neither package adds a documented attachment or control you need.',
      },
    ],
  },
  [ArticleSlug.DysonAirwrapVsSharkFlexstyle]: {
    heading: 'Choose the bundle whose attachments match real jobs',
    intro:
      'A multi-styler bundle earns its place only when its exact attachments cover tasks you will perform. Compare the named market bundles rather than the family names alone.',
    rows: [
      {
        label: 'Choose the first option',
        text: 'Choose the compared Airwrap i.d. bundle if its documented barrels, brushes and drying attachment match your routine.',
      },
      {
        label: 'Choose the second option',
        text: 'Choose the compared FlexStyle HD430 bundle if its documented attachments cover your routine and you prefer that changeover system.',
      },
      {
        label: 'Keep what you have',
        text: 'Keep the tools you own when the new bundle mainly duplicates drying, smoothing or curling stages already covered.',
      },
    ],
  },
  [ArticleSlug.DenmanD3VsD4]: {
    heading: 'Choose seven rows or nine rows for the section you handle',
    intro:
      'The useful difference is the documented row layout and the working section it creates, not a promise that one styler suits every head of hair.',
    rows: [
      {
        label: 'Choose the first option',
        text: 'Choose D3 if its seven-row layout gives the section size and access you want.',
      },
      {
        label: 'Choose the second option',
        text: 'Choose D4 if its nine-row layout suits a broader working section you can still control.',
      },
      {
        label: 'Keep what you have',
        text: 'Keep the current styler when its row layout already guides the sections you use without crowding or snagging.',
      },
    ],
  },
  [ArticleSlug.TangleTeezerVsWetBrushOriginal]: {
    heading: 'Choose from tooth layout, grip and permitted use',
    intro:
      'These exact detanglers differ in contact layout and handle design. Their maker descriptions do not establish which one is universally gentler or faster.',
    rows: [
      {
        label: 'Choose the first option',
        text: 'Choose the Ultimate Detangler Matte if its documented tooth layout, handle and permitted use match your detangling stage.',
      },
      {
        label: 'Choose the second option',
        text: 'Choose the Wet Brush Original Frost Black if its documented bristle layout and grip match the sections you handle.',
      },
      {
        label: 'Keep what you have',
        text: 'Keep a sound detangler that already moves through manageable sections comfortably and is permitted for the way you use it.',
      },
    ],
  },
  [ArticleSlug.MicrofiberHairTowelVsCottonTShirt]: {
    heading: 'Choose from coverage, fastening and laundry',
    intro:
      'A shaped wrap mainly changes coverage and fastening. A cotton T-shirt you already own may do the job when it covers the hair and stays in place without a tight twist.',
    rows: [
      {
        label: 'Choose a purpose-made wrap',
        text: 'Choose one when its usable fabric area and closure make the blotting step easier to secure.',
      },
      {
        label: 'Use a cotton T-shirt',
        text: 'Use a clean T-shirt when its size, seams and fabric label suit the way you gather and blot the hair.',
      },
      {
        label: 'Keep the current setup',
        text: 'Keep the item that covers the required sections, washes easily and comes off without disturbing the next step.',
      },
    ],
  },
  [ArticleSlug.SilkVsSatinPillowcaseHair]: {
    heading: 'Read the fibre label before choosing by the word satin',
    intro:
      'Silk is a fibre and satin is a weave, so the labels are not mutually exclusive. Compare composition, construction, closure, feel and care on the exact pillowcase.',
    rows: [
      {
        label: 'Choose by fibre',
        text: 'Choose silk when the declared fibre and its care requirements are what you want to pay for and maintain.',
      },
      {
        label: 'Choose by surface and construction',
        text: 'Choose a non-silk satin case when its declared fibre, closure and laundry instructions fit your routine.',
      },
      {
        label: 'Keep the current case',
        text: 'Keep a case that fits, feels comfortable and washes reliably when another label does not solve a specific problem.',
      },
    ],
  },
};

export const evidenceOwners: Readonly<Record<string, EvidenceOwner>> = {
  [ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume]: {
    productSlugs: [
      'babyliss-air-style-1000-2136u-uk',
      'babyliss-flawless-volume-2764u-uk',
    ],
    upgradeBeforeHeading: 'When to choose neither',
  },
  [ArticleSlug.GhdChronosVsPlatinumPlus]: {
    productSlugs: [
      'ghd-chronos',
      'ghd-platinum-plus',
      'ghd-chronos-black-uk',
      'ghd-platinum-plus-black-uk',
    ],
    upgradeBeforeHeading: 'Decide from controls and ownership details',
  },
  [ArticleSlug.GhdGoldVsPlatinumPlus]: {
    productSlugs: ['ghd-gold', 'ghd-platinum-plus'],
    upgradeBeforeHeading: 'Who might choose each',
  },
  [ArticleSlug.GhdChronosVsChronosMax]: {
    productSlugs: [
      'ghd-chronos',
      'ghd-chronos-max',
      'ghd-chronos-black-uk',
      'ghd-chronos-max-black-uk',
    ],
    upgradeBeforeHeading: 'What to compare next',
  },
  [ArticleSlug.DysonSupersonicVsSharkSpeedstyle]: {
    productSlugs: ['dyson-supersonic-nural', 'shark-speedstyle-pro'],
    upgradeBeforeHeading: 'The bottom line',
  },
  [ArticleSlug.DysonAirwrapVsSharkFlexstyle]: {
    productSlugs: ['dyson-airwrap-id-straight-wavy', 'shark-flexstyle-hd430'],
    upgradeBeforeHeading: 'Verdict by user type',
    marketContext:
      'US main comparison. Separate UK HD446UK and Airwrap i.d. Straight+Wavy bundle examples appear below; their details do not substitute for the US records.',
  },
  [ArticleSlug.DenmanD3VsD4]: {
    productSlugs: [
      'denman-d3-original-7-row-uk',
      'denman-d4-original-9-row-uk',
    ],
    upgradeBeforeHeading: 'A small-section handling test',
  },
  [ArticleSlug.TangleTeezerVsWetBrushOriginal]: {
    productSlugs: [
      'tangle-teezer-ultimate-detangler-matte-uk',
      'wet-brush-original-detangler',
    ],
    upgradeBeforeHeading: 'Let the evidence decide only the feature it covers',
  },
};

export const decisionRelatedLinks: Readonly<
  Record<string, RelatedDecisionLinks>
> = {
  [ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume]: {
    sentence:
      'Choose the next page from the part of the routine you still need to resolve.',
    links: [
      {
        label: 'Choose a hot-air brush by task',
        path: guide(ArticleSlug.BestHotAirBrushes),
      },
      {
        label: 'Compare a hot-air brush with a dryer and round brush',
        path: guide(ArticleSlug.HotAirBrushVsHairDryerAndRoundBrush),
      },
      {
        label: 'Use a hot-air brush',
        path: guide(ArticleSlug.HowToUseHotAirBrush),
      },
    ],
  },
  [ArticleSlug.GhdChronosVsPlatinumPlus]: {
    sentence:
      'Continue with the control or width decision that could change this comparison.',
    links: [
      {
        label: 'Compare fixed and adjustable straightener controls',
        path: guide(ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners),
      },
      {
        label: 'Compare standard Chronos with Chronos Max',
        path: guide(ArticleSlug.GhdChronosVsChronosMax),
      },
      {
        label: 'Use the flat-iron plate-width guide',
        path: guide(ArticleSlug.FlatIronPlateWidthGuide),
      },
    ],
  },
  [ArticleSlug.GhdGoldVsPlatinumPlus]: {
    sentence:
      'Continue with the control, width or alternative ghd comparison that matches the unresolved question.',
    links: [
      {
        label: 'Compare fixed and adjustable straightener controls',
        path: guide(ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners),
      },
      {
        label: 'Compare Chronos and Platinum+',
        path: guide(ArticleSlug.GhdChronosVsPlatinumPlus),
      },
      {
        label: 'Use the flat-iron plate-width guide',
        path: guide(ArticleSlug.FlatIronPlateWidthGuide),
      },
    ],
  },
  [ArticleSlug.GhdChronosVsChronosMax]: {
    sentence:
      'Continue with plate width, control choice or the standard-model comparison.',
    links: [
      {
        label: 'Use the flat-iron plate-width guide',
        path: guide(ArticleSlug.FlatIronPlateWidthGuide),
      },
      {
        label: 'Compare fixed and adjustable controls',
        path: guide(ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners),
      },
      {
        label: 'Compare Chronos and Platinum+',
        path: guide(ArticleSlug.GhdChronosVsPlatinumPlus),
      },
    ],
  },
  [ArticleSlug.DysonSupersonicVsSharkSpeedstyle]: {
    sentence:
      'Continue with the attachment, setting or travel question that still affects the dryer choice.',
    links: [
      {
        label: 'Choose a hair dryer by routine',
        path: guide(ArticleSlug.HairDryerChooser),
      },
      {
        label: 'Compare diffuser and concentrator attachments',
        path: guide(ArticleSlug.HairDryerDiffuserVsConcentrator),
      },
      {
        label: 'Check plug and voltage labels before travel',
        path: guide(ArticleSlug.PlugAdapterVsVoltageConverter),
      },
    ],
  },
  [ArticleSlug.DysonAirwrapVsSharkFlexstyle]: {
    sentence:
      'Continue with bundle roles, starting state or the method for the attachment you expect to use.',
    links: [
      {
        label: 'Choose a multi-styler attachment bundle',
        path: guide(ArticleSlug.HowToChooseMultiStylerAttachments),
      },
      {
        label: 'Compare a hot-air brush with a curling iron',
        path: guide(ArticleSlug.HotAirBrushVsCurlingIron),
      },
      {
        label: 'Use a hot-air brush',
        path: guide(ArticleSlug.HowToUseHotAirBrush),
      },
    ],
  },
  [ArticleSlug.DenmanD3VsD4]: {
    sentence:
      'Continue with section handling, defining versus detangling, or care for the exact styler.',
    links: [
      {
        label: 'Compare a defining brush with a detangling brush',
        path: guide(ArticleSlug.CurlDefiningBrushVsDetanglingBrush),
      },
      {
        label: 'Choose a brush by job',
        path: guide(ArticleSlug.HowToChooseHairBrush),
      },
      {
        label: 'Clean a manual hair brush',
        path: guide(ArticleSlug.HowToCleanAHairBrush),
      },
    ],
  },
  [ArticleSlug.TangleTeezerVsWetBrushOriginal]: {
    sentence:
      'Continue with wet-use permission, comb-versus-brush contact or tool condition.',
    links: [
      {
        label: 'Compare a wide-tooth comb with a detangling brush',
        path: guide(ArticleSlug.WideToothCombVsDetanglingBrush),
      },
      {
        label: 'Choose a detangling brush',
        path: guide(ArticleSlug.BestDetanglingBrushes),
      },
      {
        label: 'Decide whether to replace a brush or comb',
        path: guide(ArticleSlug.WhenToReplaceHairbrushOrComb),
      },
    ],
  },
  [ArticleSlug.MicrofiberHairTowelVsCottonTShirt]: {
    sentence:
      'Continue with wrap selection, fastening or the next wash-day step.',
    links: [
      {
        label: 'Choose a microfiber hair towel',
        path: guide(ArticleSlug.BestMicrofibreHairTowels),
      },
      {
        label: 'Fasten a microfiber hair towel',
        path: guide(ArticleSlug.HowToUseAMicrofibreHairTowel),
      },
      {
        label: 'Choose sectioning clips for styling',
        path: guide(ArticleSlug.HowToChooseHairSectioningClips),
      },
    ],
  },
  [ArticleSlug.SilkVsSatinPillowcaseHair]: {
    sentence:
      'Continue with overnight coverage, care or the fastener used before bed.',
    links: [
      {
        label: 'Compare a satin bonnet with a satin pillowcase',
        path: guide(ArticleSlug.SatinBonnetVsSatinPillowcase),
      },
      {
        label: 'Compare hair elastics with scrunchies',
        path: guide(ArticleSlug.HairElasticsVsScrunchies),
      },
    ],
  },
  // 27 November 2026: the related rail also carries the kit comparison. Keep
  // the guide paths in step with modelDecisionRelated.
  [ArticleSlug.SharkFlexfusionVsFlexstyle]: {
    sentence:
      'Continue with the fit or kit question that is still open for your shortlist.',
    links: [
      {
        label: 'Shark FlexStyle models and kits compared',
        path: guide(ArticleSlug.SharkFlexstyleModelsCompared),
      },
      {
        label: 'Which diffuser fits my Shark FlexStyle?',
        path: guide(ArticleSlug.SharkFlexstyleDiffuserCompatibility),
      },
      {
        label: 'Shark FlexFusion vs Dyson Airwrap i.d.',
        path: guide(ArticleSlug.SharkFlexfusionVsDysonAirwrapId),
      },
      {
        label: 'Compare multi-styler kits side by side',
        path: '/products#compare-multi-styler-kits',
      },
    ],
  },
  [ArticleSlug.SharkFlexfusionVsDysonAirwrapId]: {
    sentence:
      'Continue with the attachment or kit question that is still open for your shortlist.',
    links: [
      {
        label: 'How to choose a multi-styler attachment bundle',
        path: guide(ArticleSlug.HowToChooseMultiStylerAttachments),
      },
      {
        label: 'Shark Glam vs Dyson Airwrap i.d.',
        path: guide(ArticleSlug.SharkGlamVsDysonAirwrapId),
      },
      {
        label: 'Shark FlexFusion vs FlexStyle',
        path: guide(ArticleSlug.SharkFlexfusionVsFlexstyle),
      },
      {
        label: 'Compare multi-styler kits side by side',
        path: '/products#compare-multi-styler-kits',
      },
    ],
  },
};
