import { ArticleSlug } from './article-slug';
import type { GuideEvidence } from './guide-evidence';
export const carePackingEvidence: Readonly<
  Partial<Record<ArticleSlug, GuideEvidence>>
> = /* @__PURE__ */ (() => ({
  [ArticleSlug.HowToCleanHairRollers]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two named manufacturers provide different care instructions. The sorting and inspection sequence is editorial guidance; no cleaning-efficacy, disinfection or material-resistance test was performed.',
    sources: [
      {
        label: 'Conair HS11RX instruction booklet',
        model: 'Conair HS11RX instruction booklet',
        market: 'US',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dwb62a7325/Instructional%20Booklets/HS11RX.pdf',
        checkedDate: '29 October 2026',
        scope:
          'US Conair HS11RX manual, Maintenance and Storage. Unplug/cool; unit wiped; rollers cleaned with damp cloth and mild detergent/soap. Not an immersion method or an instruction for all heated rollers.',
      },
      {
        label: 'Kitsch Ceramic Thermal Rollers 8pc Set care FAQ',
        model: 'Kitsch Ceramic Thermal Rollers 8pc Set care FAQ',
        market: 'US',
        url: 'https://www.mykitsch.com/products/ceramic-thermal-roller-variety-pack',
        checkedDate: '29 October 2026',
        scope:
          'US Ceramic Thermal Rollers 8pc listing, cleaning FAQ. Damp wiping; named deeper hand-wash option with mild shampoo, rinse and complete air drying. Does not cover every self-grip, foam or electrical roller.',
      },
    ],
  },
  [ArticleSlug.HowToCleanHairClipsAndPins]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'A named maker supplies care instructions for its own accessories. Inspection and sorting advice is editorial guidance, not a tested universal method for coated pins, plated metals, glued decoration or disinfection.',
    sources: [
      {
        label: 'Mauliébris accessory product care',
        model: 'Mauliébris accessory product care',
        market: 'English manufacturer guidance',
        url: 'https://mauliebris.com/en/pages/french-luxury-hair-accessories-product-care',
        checkedDate: '29 October 2026',
        scope:
          'English manufacturer care for its accessories. Cloth care, narrowly permitted light dampening/soap, no immersion and drying. Not a care instruction for every metal pin or coated fastener.',
      },
    ],
  },
  [ArticleSlug.HowToPackHairToolsForTravel]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Named manufacturer care directions support the storage example; an official UK page supplies a travel-check starting point. The kit layout is editorial guidance, not impact testing, electrical certification or worldwide carriage approval.',
    sources: [
      {
        label: 'Cloud Nine product-care FAQ',
        model: 'Cloud Nine product-care FAQ',
        market: 'UK',
        url: 'https://www.cloudninehair.com/pages/product-and-payment-faqs',
        checkedDate: '29 October 2026',
        scope:
          "UK maker's product-care FAQ. Cooling before storage, loose cord loops, plug/plate separation and its model's guard. No universal cooling interval or packing certification.",
      },
      {
        label: 'GOV.UK electronic devices and electrical items',
        model: 'GOV.UK electronic devices and electrical items',
        market: 'UK official guidance',
        url: 'https://www.gov.uk/hand-luggage-restrictions/electronic-devices-and-electrical-items',
        checkedDate: '29 October 2026',
        scope:
          'UK official travel guidance, with separate battery/gas and airline checks. Used as a current starting point for UK journeys, not a worldwide luggage-permission table.',
      },
    ],
  },
  [ArticleSlug.HowToApplyHairClay]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'One named formula establishes its preparation, towel-dried starting state and positioned finish. Distribution checks are editorial guidance, not measured hold, ingredient effects or a comparative performance test.',
    sources: [
      {
        label: 'American Crew Molding Clay directions',
        model: 'American Crew Molding Clay directions',
        market: 'US',
        url: 'https://www.americancrew.com/products/molding-clay',
        checkedDate: '29 October 2026',
        scope:
          'US Molding Clay: small amount softened between palms/fingertips and distributed through towel-dried hair; marketed high hold/medium shine. No universal clay starting state or measured finish comparison.',
      },
    ],
  },
  [ArticleSlug.HowToUseTexturisingSpray]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two named UK listings document different dry-hair application methods. The coverage framework is editorial guidance; no measured volume, hold duration, oil absorption or hair-health comparison was performed.',
    sources: [
      {
        label: 'Bumble and bumble Thickening Dryspun Texture Spray',
        model: 'Bumble and bumble Thickening Dryspun Texture Spray',
        market: 'UK',
        url: 'https://www.bumbleandbumble.co.uk/product/19061/126838/style/texture-sprays/thickening-dryspun-texture-spray',
        checkedDate: '29 October 2026',
        scope:
          'UK Dryspun: dry hair, shake, ten-inch application distance, even strokes and its container warnings. No category-wide distance or independent volume result.',
      },
      {
        label: 'Oribe Dry Texturizing Spray',
        model: 'Oribe Dry Texturizing Spray',
        market: 'UK',
        url: 'https://uk.oribe.com/products/dry-texturizing-spray',
        checkedDate: '29 October 2026',
        scope:
          'UK Dry Texturizing Spray: dry styled hair, shaking, sectioned application, six-to-eight-inch distance in the main directions. Used to demonstrate that instructions differ, not endorse conflicting pro tips.',
      },
    ],
  },
}))();
export const carePackingRelated: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.HowToCleanHairRollers]: [
    ArticleSlug.HowToUseHeatedHairRollers,
    ArticleSlug.HowToUseVelcroHairRollers,
    ArticleSlug.HowToCleanHairClipsAndPins,
  ],
  [ArticleSlug.HowToCleanHairClipsAndPins]: [
    ArticleSlug.HowToUseAClawClip,
    ArticleSlug.HowToChooseAHairBarrette,
    ArticleSlug.HowToCleanHairRollers,
  ],
  [ArticleSlug.HowToPackHairToolsForTravel]: [
    ArticleSlug.BestTravelHairDryers,
    ArticleSlug.BestTravelFlatIrons,
    ArticleSlug.HowToChooseHairToolHeatMatAndPouch,
  ],
  [ArticleSlug.HowToApplyHairClay]: [
    ArticleSlug.PomadeVsHairClay,
    ArticleSlug.HowToApplyHairPomade,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.HowToUseTexturisingSpray]: [
    ArticleSlug.SeaSaltSprayVsTexturisingSpray,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.HowToUseHairspray,
  ],
};
export const carePackingSlugs = Object.keys(
  carePackingEvidence,
) as ArticleSlug[];

/** Contextual source owners required by the editorial handoff, excluding hubs
 * and related-navigation links. Preserve the practical step in each body. */
export const carePackingIncoming: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.HowToCleanHairRollers]: [
    ArticleSlug.HowToUseHeatedHairRollers,
    ArticleSlug.HowToUseVelcroHairRollers,
    ArticleSlug.HowToUseFlexiRods,
  ],
  [ArticleSlug.HowToCleanHairClipsAndPins]: [
    ArticleSlug.HowToUseAClawClip,
    ArticleSlug.HowToChooseAHairBarrette,
  ],
  [ArticleSlug.HowToPackHairToolsForTravel]: [
    ArticleSlug.BestTravelHairDryers,
    ArticleSlug.BestTravelFlatIrons,
    ArticleSlug.HowToChooseHairToolHeatMatAndPouch,
  ],
  [ArticleSlug.HowToApplyHairClay]: [
    ArticleSlug.PomadeVsHairClay,
    ArticleSlug.HowToApplyHairPomade,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.HowToUseTexturisingSpray]: [
    ArticleSlug.SeaSaltSprayVsTexturisingSpray,
    ArticleSlug.HairStylingProductOrder,
  ],
};
