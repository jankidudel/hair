import { ArticleSlug } from './article-slug';
import type { GuideEvidence } from './guide-evidence';
import { toolLedSources as S } from './tool-led-sources';

/**
 * 27 November 2026 tool-led batch: evidence for the twelve guides that
 * support the Hair Dryer Attachment Finder, Hair Tool Size Visualiser and
 * Used Multi-Styler Checklist. See tool-led-sources.ts for which records were
 * read that day, and seo-tool-led-batch-links.ts for slugs and related links.
 */
const noTesting = 'No hands-on testing.';

export const toolLedEvidence: Readonly<Record<string, GuideEvidence>> =
  /* @__PURE__ */ (() => ({
    [ArticleSlug.GhdAirHeliosDiffuserCompatibility]: {
      summary: `Fit and ring instructions come from ghd’s UK p-281 diffuser page and ghd’s support answer on diffuser fit. A fit statement is not a box list for any dryer. ${noTesting}`,
      sources: [S.ghdDiffuser, S.ghdFitFaq, S.ghdHelios],
    },
    [ArticleSlug.SharkSpeedstyleDiffuserCompatibility]: {
      summary: `Compatible-model lists come from SharkNinja’s UK and US part pages and the HD542UK Mocha Silver box from SharkNinja UK, all read on 27 November 2026. Each list covers only the market it is sold in. ${noTesting}`,
      sources: [
        S.sharkUkDiffuser,
        S.sharkHd542uk,
        S.sharkUsHd300Diffuser,
        S.sharkUsHd500Diffuser,
      ],
    },
    [ArticleSlug.DysonWaveCurlDomeVsDiffuse]: {
      summary: `Mode set-up, fit scope and Attachment Learning come from Dyson UK’s support pages for part 973924-01; the box comes from the Supersonic Nural Ceramic patina/topaz listing. No styling results are claimed. ${noTesting}`,
      sources: [
        S.dysonWaveCurl,
        S.dysonWaveCurlVariant,
        S.dysonNural,
        S.dysonNuralManual,
      ],
    },
    [ArticleSlug.GhdHeliosNozzleAttachmentsCompared]: {
      summary: `The supplied nozzle comes from ghd UK’s black Helios listing; the Wide Styling Nozzle and Comb Nozzle from their own ghd UK accessory pages. ghd publishes a width only for the wide nozzle. ${noTesting}`,
      sources: [S.ghdHelios, S.ghdWideNozzle, S.ghdCombNozzle, S.ghdDiffuser],
    },
    [ArticleSlug.GhdChronosCurveClassicVsGrand]: {
      summary: `Barrel diameters, clip format and temperature come from ghd UK’s Classic Tong and Grand Tong listings. Neither listing publishes a heated barrel length. ${noTesting}`,
      sources: [S.ghdClassicTong, S.ghdGrandTong],
    },
    [ArticleSlug.GhdChronosCurveConicalVsMax]: {
      summary: `End diameters and barrel diameter come from ghd UK’s Conical Wand and Max Wand listings. Neither listing publishes a heated barrel length, and no performance claim is repeated. ${noTesting}`,
      sources: [S.ghdConicalWand, S.ghdMaxWand],
    },
    [ArticleSlug.OliviaGardenNanothermicRoundVsSpeedXl]: {
      summary: `Barrel and bristle-tip diameters come from Olivia Garden’s US size charts for each line. Inch figures are the maker’s; millimetre conversions are labelled and kept apart from the maker’s own metric labels. ${noTesting}`,
      sources: [S.ogRound, S.ogSpeedXl],
    },
    [ArticleSlug.HotToolsBlackGoldVs24kGoldOneStep]: {
      summary: `Head labels, detachable wording, included pieces and settings come from the two Hot Tools US listings, read on 27 November 2026. Neither page says which axis its 2.8-inch label measures. ${noTesting}`,
      sources: [S.hotToolsBlackGold, S.hotTools24k],
    },
    [ArticleSlug.T3SinglepassCurlX1Vs125]: {
      summary: `Barrel sizes and iron weights excluding the cord come from T3’s US SinglePass Curl X listing, read on 27 November 2026. Millimetre figures are conversions at 25.4 mm per inch. ${noTesting}`,
      sources: [S.t3CurlX],
    },
    [ArticleSlug.BuyingAUsedDysonAirwrap]: {
      summary: `Kit lists come from Dyson UK’s exact retail and refurbished listings; the support home is Dyson UK’s Airwrap i.d. page. A maker’s package list shows what that pack contains, not what a private seller includes. ${noTesting}`,
      sources: [
        S.dysonIdSupport,
        S.dysonIdStraightWavy,
        S.dysonIdDiffuser,
        S.dysonIdDiffuserRefurb,
        S.dysonCompleteLong,
      ],
    },
    [ArticleSlug.SharkFlexstyleHd430VsHd430ref]: {
      summary: `The HD430 box, the HD430REF Product Details and add-ons, and the XSKHD4DA compatible-model list come from SharkNinja US, read on 27 November 2026. An add-on listing is not box evidence. ${noTesting}`,
      sources: [S.sharkHd430, S.sharkHd430ref, S.sharkFlexDiffuser],
    },
    [ArticleSlug.DysonAirwrapIdStraightWavyVsWithDiffuser]: {
      summary: `Each box list comes from the exact Dyson UK listing for that pack and colour; the refurbished pack is a separate Dyson listing. ${noTesting}`,
      sources: [
        S.dysonIdStraightWavy,
        S.dysonIdDiffuser,
        S.dysonIdDiffuserRefurb,
      ],
    },
  }))();
