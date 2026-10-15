import { ArticleSlug } from './article-slug';
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
  [ArticleSlug.BestCurlingIronsFineHair]: [
    ArticleSlug.CurlingIronBarrelSizeGuide,
    ArticleSlug.CurlingIronVsWand,
  ],
  [ArticleSlug.BestCurlingIrons]: [
    ArticleSlug.CurlingIronBarrelSizeGuide,
    ArticleSlug.CurlingIronVsWand,
    ArticleSlug.HowToUseACurlingIron,
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
  [ArticleSlug.HowToChooseHairSectioningClips]: [
    ArticleSlug.HowToUseHeatlessCurlingRod,
    ArticleSlug.HowToUseVelcroHairRollers,
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
