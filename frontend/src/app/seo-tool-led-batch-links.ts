import { ArticleSlug } from './article-slug';

/**
 * 27 November 2026 tool-led batch: published guide slugs and related links.
 * Kept apart from the evidence module so the shared navigation bundle does
 * not pull in the batch's source records.
 */
export const toolLedSlugs = [
  ArticleSlug.GhdAirHeliosDiffuserCompatibility,
  ArticleSlug.SharkSpeedstyleDiffuserCompatibility,
  ArticleSlug.DysonWaveCurlDomeVsDiffuse,
  ArticleSlug.GhdHeliosNozzleAttachmentsCompared,
  ArticleSlug.GhdChronosCurveClassicVsGrand,
  ArticleSlug.GhdChronosCurveConicalVsMax,
  ArticleSlug.OliviaGardenNanothermicRoundVsSpeedXl,
  ArticleSlug.HotToolsBlackGoldVs24kGoldOneStep,
  ArticleSlug.T3SinglepassCurlX1Vs125,
  ArticleSlug.BuyingAUsedDysonAirwrap,
  ArticleSlug.SharkFlexstyleHd430VsHd430ref,
  ArticleSlug.DysonAirwrapIdStraightWavyVsWithDiffuser,
] as const;

export const toolLedRelated: Readonly<Record<string, readonly string[]>> = {
  [ArticleSlug.GhdAirHeliosDiffuserCompatibility]: [
    ArticleSlug.GhdAirVsHelios,
    ArticleSlug.HairDryerDiffuserCompatibility,
    ArticleSlug.GhdHeliosNozzleAttachmentsCompared,
  ],
  [ArticleSlug.SharkSpeedstyleDiffuserCompatibility]: [
    ArticleSlug.SharkSpeedstyleProVsProFlex,
    ArticleSlug.SharkFlexstyleDiffuserCompatibility,
    ArticleSlug.HairDryerDiffuserCompatibility,
  ],
  [ArticleSlug.DysonWaveCurlDomeVsDiffuse]: [
    ArticleSlug.HowToUseAHairDryerDiffuser,
    ArticleSlug.DysonAirwrapVsSupersonic,
    ArticleSlug.HairDryerDiffuserCompatibility,
  ],
  [ArticleSlug.GhdHeliosNozzleAttachmentsCompared]: [
    ArticleSlug.HairDryerReplacementNozzleCompatibility,
    ArticleSlug.GhdAirHeliosDiffuserCompatibility,
    ArticleSlug.GhdAirVsHelios,
  ],
  [ArticleSlug.GhdChronosCurveClassicVsGrand]: [
    ArticleSlug.CurlingIronBarrelSizeGuide,
    ArticleSlug.GhdChronosCurveConicalVsMax,
    ArticleSlug.T3SinglepassCurlX1Vs125,
  ],
  [ArticleSlug.GhdChronosCurveConicalVsMax]: [
    ArticleSlug.CurlingIronBarrelSizeGuide,
    ArticleSlug.GhdChronosCurveClassicVsGrand,
    ArticleSlug.T3SinglepassCurlXVsGhdSoftCurl,
  ],
  [ArticleSlug.OliviaGardenNanothermicRoundVsSpeedXl]: [
    ArticleSlug.RoundBrushSizeGuide,
    ArticleSlug.OliviaGardenCeramicIonVsNanothermic,
    ArticleSlug.HotAirBrushBarrelSizeGuide,
  ],
  [ArticleSlug.HotToolsBlackGoldVs24kGoldOneStep]: [
    ArticleSlug.HotAirBrushBarrelSizeGuide,
    ArticleSlug.HotToolsOneStepVsRevlonOneStepPlus,
    ArticleSlug.RoundBrushSizeGuide,
  ],
  [ArticleSlug.T3SinglepassCurlX1Vs125]: [
    ArticleSlug.T3SinglepassCurlXVsGhdSoftCurl,
    ArticleSlug.CurlingIronBarrelSizeGuide,
    ArticleSlug.GhdChronosCurveClassicVsGrand,
  ],
  [ArticleSlug.BuyingAUsedDysonAirwrap]: [
    ArticleSlug.DysonAirwrapAttachmentCompatibility,
    ArticleSlug.HowToChooseADysonAirwrap,
    ArticleSlug.DysonAirwrapIdStraightWavyVsWithDiffuser,
  ],
  [ArticleSlug.SharkFlexstyleHd430VsHd430ref]: [
    ArticleSlug.SharkFlexstyleDiffuserCompatibility,
    ArticleSlug.SharkFlexstyleModelsCompared,
    ArticleSlug.BuyingAUsedDysonAirwrap,
  ],
  [ArticleSlug.DysonAirwrapIdStraightWavyVsWithDiffuser]: [
    ArticleSlug.HowToChooseADysonAirwrap,
    ArticleSlug.DysonAirwrapIdVsCompleteLong,
    ArticleSlug.BuyingAUsedDysonAirwrap,
  ],
};
