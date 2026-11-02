import { airflowMethodRelated } from './airflow-method-guides';
import { waveMethodRelated } from './wave-method-guides';
import { toolChoiceRelated } from './tool-choice-guides';
import { everydayMethodRelated } from './everyday-method-guides';
import { currentModelRelated } from './current-model-comparison-guides';
import { finishingMethodRelated } from './finishing-method-guides';
import { carePackingRelated } from './care-packing-guides';
import { fastenerRelated } from './fastener-guides';
import { careMethodRelated } from './care-method-guides';
import { headFormatRelated } from './head-format-guides';
import { ArticleSlug } from './article-slug';
import { coreGuideRelated } from './core-guide-quality';
import { articleRegistry, guideCategoryById } from './article-registry';

export interface GuideLinkMapEntry {
  readonly hubPath: string;
  readonly relatedSlugs: readonly string[];
}

/**
 * Contextual links answer the reader's next question. Registry order is a
 * publication concern and must not determine editorial recommendations.
 */
const comparisonOverrides: Readonly<Record<string, readonly string[]>> = {
  ...waveMethodRelated,
  ...toolChoiceRelated,
  ...everydayMethodRelated,
  ...currentModelRelated,
  ...finishingMethodRelated,
  ...carePackingRelated,
  ...fastenerRelated,
  ...careMethodRelated,
  ...coreGuideRelated,
  ...headFormatRelated,
  ...airflowMethodRelated,
  [ArticleSlug.GhdAirVsHelios]: [
    ArticleSlug.HairDryerChooser,
    ArticleSlug.HairDryerWattageGuide,
    ArticleSlug.HairDryerDiffuserCompatibility,
  ],
  [ArticleSlug.ParluxAlyonVsDigitalyon]: [
    ArticleSlug.HairDryerChooser,
    ArticleSlug.HairDryerDiffuserVsConcentrator,
    ArticleSlug.HowToCleanHairDryerFilter,
  ],
  [ArticleSlug.CloudNineOriginalIronVsWideIron]: [
    ArticleSlug.FlatIronPlateWidthGuide,
    ArticleSlug.BestFlatIrons,
    ArticleSlug.HowToUseAFlatIron,
  ],
  [ArticleSlug.GhdSoftCurlTongVsCreativeCurlWand]: [
    ArticleSlug.CurlingIronVsWand,
    ArticleSlug.CurlingIronBarrelSizeGuide,
    ArticleSlug.HowToUseACurlingWand,
  ],
  [ArticleSlug.TangleTeezerUltimateDetanglerVsFineFragile]: [
    ArticleSlug.BestDetanglingBrushes,
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.CanYouUseDetanglingBrushForBlowDrying,
  ],
  [ArticleSlug.HowToSectionHairForStyling]: [
    ArticleSlug.HowToUseAWideToothComb,
    ArticleSlug.HowToUseACurlDefiningBrush,
    ArticleSlug.HowToChooseHairSectioningClips,
  ],
  [ArticleSlug.HowToUseAWideToothComb]: [
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.WideToothCombVsDetanglingBrush,
    ArticleSlug.HowToCleanAHairComb,
  ],
  [ArticleSlug.HowToUseACurlDefiningBrush]: [
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.CurlDefiningBrushVsDetanglingBrush,
    ArticleSlug.DenmanD3VsD4,
  ],
  [ArticleSlug.HowToUseAHairPick]: [
    ArticleSlug.HowToUseAWideToothComb,
    ArticleSlug.HowToUseACurlDefiningBrush,
    ArticleSlug.BestBrushesCurlyHair,
  ],
  [ArticleSlug.HowToPlopHair]: [
    ArticleSlug.HowToUseAMicrofibreHairTowel,
    ArticleSlug.MicrofiberHairTowelVsCottonTShirt,
    ArticleSlug.HowToUseAHairDryerDiffuser,
  ],

  [ArticleSlug.HowToUseHairspray]: [
    ArticleSlug.FlexibleVsStrongHoldHairspray,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.WhyCurlsFallOut,
  ],
  [ArticleSlug.FlexibleVsStrongHoldHairspray]: [
    ArticleSlug.HowToUseHairspray,
    ArticleSlug.WhyCurlsFallOut,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.SeaSaltSprayVsTexturisingSpray]: [
    ArticleSlug.HowToUseSeaSaltSpray,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.HairMousseVsGel,
  ],
  [ArticleSlug.HowToUseSeaSaltSpray]: [
    ArticleSlug.SeaSaltSprayVsTexturisingSpray,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.HowToApplyHairMousse,
  ],
  [ArticleSlug.PomadeVsHairClay]: [
    ArticleSlug.HowToApplyHairPomade,
    ArticleSlug.HairMousseVsGel,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.HowToApplyHairPomade]: [
    ArticleSlug.PomadeVsHairClay,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.HairBrushVsComb,
  ],
  [ArticleSlug.HairMousseVsGel]: [
    ArticleSlug.HowToApplyHairMousse,
    ArticleSlug.HowToApplyGelToCurlyHair,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.CurlCreamVsLeaveInConditioner]: [
    ArticleSlug.BestLeaveInConditionersDryHair,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.HairMousseVsGel,
  ],
  [ArticleSlug.HowToApplyHairMousse]: [
    ArticleSlug.HairMousseVsGel,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.HowToApplyGelToCurlyHair,
  ],
  [ArticleSlug.HowToApplyGelToCurlyHair]: [
    ArticleSlug.HairMousseVsGel,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.CurlCreamVsLeaveInConditioner,
  ],
  [ArticleSlug.HairSerumVsHairOil]: [
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.CurlCreamVsLeaveInConditioner,
    ArticleSlug.BestHeatProtectants,
  ],
  [ArticleSlug.HairStylingProductOrder]: [
    ArticleSlug.HairMousseVsGel,
    ArticleSlug.CurlCreamVsLeaveInConditioner,
    ArticleSlug.HairSerumVsHairOil,
  ],
  [ArticleSlug.HowToUseHeatedHairRollers]: [
    ArticleSlug.HeatedRollersVsSelfGripRollers,
    ArticleSlug.HairRollerSizeGuide,
    ArticleSlug.HowToUseVelcroHairRollers,
  ],
  [ArticleSlug.BobbyPinsVsUShapedHairPins]: [
    ArticleSlug.HowToUseBobbyPins,
    ArticleSlug.HowToUseAFrenchHairPin,
    ArticleSlug.HowToChooseClawClipSize,
  ],
  [ArticleSlug.HowToUseBobbyPins]: [
    ArticleSlug.BobbyPinsVsUShapedHairPins,
    ArticleSlug.HowToUseAFrenchHairPin,
    ArticleSlug.HowToChooseAHairBarrette,
  ],
  [ArticleSlug.HowToUseAFrenchHairPin]: [
    ArticleSlug.BobbyPinsVsUShapedHairPins,
    ArticleSlug.HowToUseBobbyPins,
    ArticleSlug.HairElasticsVsScrunchies,
  ],
  [ArticleSlug.HowToChooseAHairBarrette]: [
    ArticleSlug.HowToChooseClawClipSize,
    ArticleSlug.BobbyPinsVsUShapedHairPins,
    ArticleSlug.HowToChooseHairSectioningClips,
  ],
  [ArticleSlug.HowToWashASatinBonnet]: [
    ArticleSlug.SatinBonnetVsSatinPillowcase,
    ArticleSlug.SilkVsSatinPillowcaseHair,
    ArticleSlug.HowToCleanHairScrunchies,
  ],
  [ArticleSlug.HowToCleanHairScrunchies]: [
    ArticleSlug.HairElasticsVsScrunchies,
    ArticleSlug.HowToWashASatinBonnet,
    ArticleSlug.HowToChooseClawClipSize,
  ],
  [ArticleSlug.HowToCleanAHairComb]: [
    ArticleSlug.HowToCleanAHairBrush,
    ArticleSlug.WhenToReplaceHairbrushOrComb,
    ArticleSlug.TailCombVsWideToothComb,
    ArticleSlug.WideToothCombVsDetanglingBrush,
  ],
  [ArticleSlug.HeatedRollersVsSelfGripRollers]: [
    ArticleSlug.HowToUseHeatedHairRollers,
    ArticleSlug.HairRollerSizeGuide,
    ArticleSlug.HowToUseVelcroHairRollers,
  ],
  [ArticleSlug.SatinBonnetVsSatinPillowcase]: [
    ArticleSlug.HowToWashASatinBonnet,
    ArticleSlug.SilkVsSatinPillowcaseHair,
  ],

  [ArticleSlug.HowToUseFlexiRods]: [
    ArticleSlug.HowToUseSnapClosureFoamRollers,
    ArticleSlug.HairRollerSizeGuide,
    ArticleSlug.HowToUseHeatlessCurlingRod,
    ArticleSlug.HeatlessCurlsNotWorking,
  ],
  [ArticleSlug.HowToUseSnapClosureFoamRollers]: [
    ArticleSlug.VelcroVsFoamHairRollers,
    ArticleSlug.HowToUseFlexiRods,
    ArticleSlug.HowToUseVelcroHairRollers,
    ArticleSlug.HairRollerSizeGuide,
  ],
  [ArticleSlug.HowToCleanHairStraightenerPlates]: [
    ArticleSlug.FlatIronSnaggingHair,
    ArticleSlug.FlatIronPlateWidthGuide,
    ArticleSlug.BestFlatIrons,
  ],
  [ArticleSlug.HowToCleanACurlingIronOrWand]: [
    ArticleSlug.CurlingIronLeavesCrease,
    ArticleSlug.WhyCurlsFallOut,
    ArticleSlug.BestCurlingIrons,
    ArticleSlug.HowToCleanHairStraightenerPlates,
  ],
  [ArticleSlug.VelcroVsFoamHairRollers]: [
    ArticleSlug.HowToUseFlexiRods,
    ArticleSlug.HowToUseSnapClosureFoamRollers,
    ArticleSlug.HowToUseVelcroHairRollers,
  ],
  [ArticleSlug.HowToUseVelcroHairRollers]: [
    ArticleSlug.VelcroVsFoamHairRollers,
    ArticleSlug.HowToUseFlexiRods,
    ArticleSlug.HowToUseSnapClosureFoamRollers,
  ],
  [ArticleSlug.BestCurlingIronsFineHair]: [
    ArticleSlug.CurlingIronBarrelSizeGuide,
    ArticleSlug.CurlingIronVsWand,
  ],
  [ArticleSlug.BestCurlingToolsShortHair]: [
    ArticleSlug.CurlingIronBarrelSizeGuide,
    ArticleSlug.HowToUseACurlingIron,
  ],
  [ArticleSlug.BestCurlingToolsLongHair]: [
    ArticleSlug.CurlingIronBarrelSizeGuide,
    ArticleSlug.HowToUseACurlingIron,
  ],
  [ArticleSlug.FlatIronVsCurlingIron]: [
    ArticleSlug.CurlingIronVsWand,
    ArticleSlug.HowToUseACurlingIron,
  ],
  [ArticleSlug.BestHotAirBrushes]: [
    ArticleSlug.HotAirBrushBarrelSizeGuide,
    ArticleSlug.HowToUseHotAirBrush,
  ],
  [ArticleSlug.HowToUseHotAirBrush]: [
    ArticleSlug.BestHotAirBrushes,
    ArticleSlug.HotAirBrushFrizzyHair,
  ],
  [ArticleSlug.HotAirBrushVsStraighteningBrush]: [
    ArticleSlug.HowToUseHotAirBrush,
    ArticleSlug.HowToChooseAStraighteningBrush,
  ],
  [ArticleSlug.HotAirBrushVsCurlingIron]: [
    ArticleSlug.HowToUseHotAirBrush,
    ArticleSlug.HowToUseACurlingIron,
  ],
  [ArticleSlug.HairDryerSettingsGuide]: [
    ArticleSlug.HowToUseHairDryerConcentratorNozzle,
    ArticleSlug.HairDryerChooser,
  ],
  [ArticleSlug.HowToUseHairDryerConcentratorNozzle]: [
    ArticleSlug.HairDryerDiffuserVsConcentrator,
    ArticleSlug.HairDryerSettingsGuide,
  ],
  [ArticleSlug.WideToothCombVsDetanglingBrush]: [
    ArticleSlug.BestDetanglingBrushes,
    ArticleSlug.TailCombVsWideToothComb,
  ],
  [ArticleSlug.SilkVsSatinPillowcaseHair]: [
    ArticleSlug.SatinBonnetVsSatinPillowcase,
  ],
  [ArticleSlug.MicrofiberHairTowelVsCottonTShirt]: [
    ArticleSlug.BestMicrofibreHairTowels,
    ArticleSlug.HowToUseAMicrofibreHairTowel,
  ],

  [ArticleSlug.BestHeatlessCurlingSets]: [
    ArticleSlug.HowToUseHeatlessCurlingRod,
    ArticleSlug.HowToUseHeatlessCurlersOnShortHair,
  ],
  [ArticleSlug.HowToUseHeatlessCurlersOnShortHair]: [
    ArticleSlug.HowToUseHeatlessCurlingRod,
    ArticleSlug.HeatlessCurlsNotWorking,
  ],
  [ArticleSlug.HeatlessCurlsNotWorking]: [
    ArticleSlug.BestHeatlessCurlingSets,
    ArticleSlug.HowToUseHeatlessCurlersOnShortHair,
  ],
  [ArticleSlug.GhdRiseVsGlidePlus]: [
    ArticleSlug.ThermalBrushVsHotAirBrush,
    ArticleSlug.WhatHairToolsDoINeed,
  ],
  [ArticleSlug.VentedBrushVsPaddleBrush]: [
    ArticleSlug.HowToUseARoundBrushWithAHairDryer,
    ArticleSlug.HowToChooseHairBrush,
  ],
  [ArticleSlug.TaperedVsCylindricalCurlingWand]: [
    ArticleSlug.HowToUseACurlingWand,
    ArticleSlug.CurlingIronBarrelSizeGuide,
  ],
  [ArticleSlug.CordedVsCordlessHairStraighteners]: [
    ArticleSlug.FlatIronPlateWidthGuide,
    ArticleSlug.BestTravelFlatIrons,
  ],
  [ArticleSlug.HowToChooseHairToolHeatMatAndPouch]: [
    ArticleSlug.BestTravelFlatIrons,
    ArticleSlug.WhatHairToolsDoINeed,
  ],
  [ArticleSlug.DysonSupersonicVsSharkSpeedstyle]: [
    ArticleSlug.HairDryerChooser,
    ArticleSlug.HairDryerWattageGuide,
  ],
  [ArticleSlug.DysonAirwrapVsSharkFlexstyle]: [
    ArticleSlug.HowToChooseMultiStylerAttachments,
    ArticleSlug.BestHotAirBrushes,
  ],
  [ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume]: [
    ArticleSlug.RotatingVsFixedHotAirBrush,
    ArticleSlug.HotAirBrushBarrelSizeGuide,
  ],
  [ArticleSlug.GhdChronosVsPlatinumPlus]: [
    ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners,
    ArticleSlug.GhdGoldVsPlatinumPlus,
  ],
  [ArticleSlug.RevlonOneStepVolumizerVsPlus]: [
    ArticleSlug.BestHotAirBrushes,
    ArticleSlug.RotatingVsFixedHotAirBrush,
  ],
  [ArticleSlug.GhdGoldVsPlatinumPlus]: [
    ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners,
    ArticleSlug.BestFlatIrons,
  ],
  [ArticleSlug.GhdChronosVsChronosMax]: [
    ArticleSlug.FlatIronPlateWidthGuide,
    ArticleSlug.GhdChronosVsPlatinumPlus,
  ],
  [ArticleSlug.TangleTeezerVsWetBrushOriginal]: [
    ArticleSlug.BestDetanglingBrushes,
    ArticleSlug.CanYouUseDetanglingBrushForBlowDrying,
  ],
};

function relatedSlugs(slug: string): readonly string[] {
  return comparisonOverrides[slug] ?? [];
}

export const guideLinkMap: Readonly<Record<string, GuideLinkMapEntry>> =
  Object.fromEntries(
    articleRegistry
      .filter((entry) => entry.enabled)
      .map((entry) => {
        const category = guideCategoryById[entry.group];
        if (!category)
          throw new Error(`No guide category exists for '${entry.slug}'.`);
        return [
          entry.slug,
          {
            hubPath: category.path,
            relatedSlugs: relatedSlugs(entry.slug),
          },
        ];
      }),
  );
