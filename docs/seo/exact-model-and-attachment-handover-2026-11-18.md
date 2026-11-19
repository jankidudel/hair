# CombReport: exact-model choices and attachment lookups

Research and implementation handover · 18 November 2026

## 1. Assignment and release scope

Implement this as one cohesive frontend/editorial batch in the existing Hair repository. The research, URL decisions, factual boundaries and link placements are supplied below; Codex should implement them, not restart keyword discovery. Recheck a source only to resolve a changed listing or an identified factual conflict.

The selected scope is **nine new guides, 21 existing-guide updates and eight discovery-page updates**. Some existing-guide changes are deliberately short contextual links rather than rewrites. Keep that distinction in the completion report. Add the diagrams specified below and reconcile the existing research CSV. Do not introduce infrastructure, dependencies, affiliate accounts, commercial tracking or redirects.

These are **research-led editorial pilots**, not proven traffic winners. Exact query volumes, organic difficulty and controlled national rankings remain unknown. The user has requested continued implementation planning despite those gaps. Preserve the uncertainty in the research records rather than manufacturing scores, demand or predictions. The batch provides documented decisions and original comparison/lookup organisation; it does not establish firsthand product-testing results.

### Baseline checked for this handover

- Repository reviewed at `4b54640`; `docs/seo/README.md` and the 314-row, 40-column `docs/seo/content-opportunities.csv` were read. The CSV contains 46 RESEARCH rows representing 47 hypothesis tags.
- The live sitemap returned HTTP 200 with **259 unique URLs** on 18 November. The nine proposed guide URLs below each returned HTTP 404 in direct HEAD checks.
- Relevant existing article bodies were read, including the Denman comparisons, Cloud Nine comparison, steam-tool guides, dryer controls and compatibility, automatic-curler operation/care, spiral ties, mousse/product order and heatless formats.
- The 17 November release had already been verified: 259 sitemap URLs, 101 production article checks against source and the retired brush URL variants. This is historical release evidence, not a new Search Console indexing or ranking report.
- A pre-existing untracked `test.sh` was present. Leave it and any other unrelated work untouched.
- No new Search Console export was available for this research. Earlier 28-day page totals and eight US/GB exact-page reports remain dated baselines, not evidence of demand for these new pairs.

If all nine additions ship and no unrelated routes change, expect **268 unique sitemap URLs**. Confirm the baseline again before release and explain legitimate differences rather than forcing that count.

### Read the repository rules

Follow `AGENTS.md`, the publishing section of `README.md`, `COMBREPORT_SEO_IMPLEMENTATION_REPORT.md`, `docs/README.md` and `docs/seo/README.md`. Use the shared Angular article renderer and existing typed slug/link system. Keep all work unstaged; do not commit or deploy.

## 2. What the research changes

The strongest contribution is a usable answer to a narrow purchase or replacement question: exact controls, exact included accessories, compatible parts and the boundaries between similarly named products. A brand catalogue is evidence for a specification, not evidence of search volume or independent performance.

Several previous hypothesis rows contain adjacent-product catalogue leads. Examples include a ghd page beside a Panasonic nozzle idea and Shark links beside a Dreame comparison. Preserve those as historical leads if useful, but never cite them as proof for the unrelated product. Replace `source_urls` for selected work with the exact sources in this handover.

Three particularly important decisions:

1. **Do not create a Kitsch rod-versus-flexi-rods URL.** The existing heatless-set guide already compares the exact Sunset ribbon and Rosewood jumbo rods, including dimensions, closures and counts. Improve the existing format owner with the six-piece variant boundary instead.
2. **Do not turn every automatic-curler family name into a separate pair page.** This batch compares only documented UK C1900U and C6688U. Generic Curl Secret, Hydro-Fusion and Collection variants remain separate evidence questions.
3. **Do not create an operating-mode page beside every comparison.** Remington StyleAdapt and T3 StyleMax control questions belong in the selected comparison plus the general settings guide; SilkiPro wet/dry-mode coverage already has an owner.

The following SEO rules underpin the implementation: satisfy the reader's task; add analysis rather than reproduce manufacturer marketing; distinguish researched specifications from experience; avoid arbitrary length padding and cosmetic date changes. References: [Google helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [review guidance](https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews), [scaled-content policy](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content).

## 3. Source register

Checked on 18 November 2026 through official manufacturer pages, official manuals or indexed manufacturer text. A successful indexed-text retrieval is not a guarantee that every browser can open that URL. BaByliss product pages produced access/redirect problems; their exact manufacturer PDFs supplied the operational evidence. Retain the original source URL and model/market scope in the evidence registry.

| ID  | Source                                                                                                                                                                          | Permitted use                                                                                                                       |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| S01 | [Parlux English MagicSense](https://www.parlux.it/en/products/magicsense-diffuser)                                                                                              | Direct-fit list, adapter statement and exclusions.                                                                                  |
| S02 | [Parlux Italian MagicSense](https://www.parlux.it/products/diffusore-magicsense)                                                                                                | Explicit Ethos entry and adapter statement; label the language/source difference.                                                   |
| S03 | [Parlux MagicCompact](https://www.parlux.it/en/products/diffusore-magiccompact%C2%AE)                                                                                           | Elysium-only attachment scope.                                                                                                      |
| S04 | [Parlux US diffuser listing](https://parluxus.com/products/parlux-magic-sense-special-diffuser-adapter)                                                                         | A US offer exists; its current sparse description does not establish a complete model matrix.                                       |
| S05 | [Parlux diffuser buying guide](https://www.parlux.it/en/blogs/news/diffusore-professionale-guida-acquisto)                                                                      | Supporting context; do not override exact product compatibility with broad marketing language.                                      |
| S06 | [T3 US AireLuxe](https://t3micro.com/products/t3-aireluxe-professional-hair-dryer-new)                                                                                          | Current named US dryer/box; selected colour and bundle must be recorded.                                                            |
| S07 | [T3 US Featherweight StyleMax](https://t3micro.com/collections/bestsellers/products/featherweight-stylemax-professional-hair-dryer)                                             | Model 77832, controls, included attachments and electrical rating.                                                                  |
| S08 | [T3 SoftTouch 3 diffuser](https://t3micro.com/products/softtouch3-finger-diffuser)                                                                                              | Explicit AireLuxe / Featherweight 3i / Featherweight StyleMax scope only.                                                           |
| S09 | [Remington UK EC9001](https://uk.remington-europe.com/hydraluxe-pro-hair-dryer-ec9001-uk)                                                                                       | Exact Hydraluxe Pro identity and package/control description.                                                                       |
| S10 | [Remington UK EC9001 instructions](https://cdn-img.remington-europe.com/manager/remington-europe_com/User%20Manuals/uk/EC9001_UK_T22-7001335-B.pdf)                             | Parts and instructions, particularly printed pages 4–5.                                                                             |
| S11 | [Remington UK AC9800](https://uk.remington-europe.com/proluxe-you-adaptive-hair-dryer-ac9800-uk)                                                                                | Exact PROluxe You identity.                                                                                                         |
| S12 | [Remington UK AC9800 instructions](https://uk.remington-europe.com/amfile/file/download/file/3187/product/4540/)                                                                | Printed pages 4–6: modes, manual override, attachments and care.                                                                    |
| S13 | [Cloud Nine UK Original Iron](https://www.cloudninehair.com/products/the-original-iron)                                                                                         | Current ordinary Original Iron specification, not Cordless or Contouring.                                                           |
| S14 | [Cloud Nine UK Touch Iron](https://www.cloudninehair.com/products/the-touch-iron)                                                                                               | Two settings, voltage and hibernation; tap-count wording conflicts within the page.                                                 |
| S15 | [L'Oréal UK SteamPod 3 guidance](https://www.lorealprofessionnel.co.uk/hair-styling-advice/how-to-use-steampod-hair-straightener)                                               | Historical 3.0 directions, removable comb and preparation.                                                                          |
| S16 | [L'Oréal UK SteamPod 4](https://www.lorealprofessionnel.co.uk/all-products/hair-tools/steampod-4)                                                                               | Wider plates/design description, three combs and the actual comparator behind advertising figures.                                  |
| S17 | [L'Oréal UK SteamPod 4 explanation](https://www.lorealprofessionnel.co.uk/hair-styling-advice/how-to-use-steampod-4)                                                            | Three comb roles; retain the brand's classification and do not invent universal hair-type thresholds.                               |
| S18 | [Rowenta LP7400 support](https://www.rowenta.com/instructions-for-use/Products-/Personal-Care/Straightener/STEAMPOD-4-LP7400/csp/1830008757)                                    | Use the existing guide's already-cited exact support/manual link if this support alias changes. Reconfirm before adding a new href. |
| S19 | [Denman UK D3](https://denmanbrush.com/products/d3-original-styler-7-row)                                                                                                       | Seven-row original styling brush and its stated use.                                                                                |
| S20 | [Denman UK D38](https://denmanbrush.com/products/d38-denman-detangler)                                                                                                          | D3-style pins in an air-cushioned paddle format.                                                                                    |
| S21 | [Denman's D38 explanation](https://denmanbrush.com/blogs/news/brush-of-the-month-d38-power-paddle)                                                                              | Construction relationship between D3 pins and the wider paddle body.                                                                |
| S22 | [invisibobble ORIGINAL Crystal Clear](https://invisibobble.com/products/original-crystal-clear-2023)                                                                            | Named everyday spiral, wrapping and three-pack.                                                                                     |
| S23 | [invisibobble POWER Crystal Clear](https://invisibobble.com/collections/spirals-sprunchies/products/power-crystal-clear-2023)                                                   | Brand positioning for extra hold/active use and three-pack; not an independent hold test.                                           |
| S24 | [invisibobble SLIM Pink Monocle](https://invisibobble.com/collections/spirals-sprunchies/products/slim-pink-monocle-2023)                                                       | Named slim/elegant variant and three-pack.                                                                                          |
| S25 | [Color Wow UK Raise the Root](https://uk.colorwowhair.com/products/raise-the-root)                                                                                              | Root placement, permitted starting states and drying directions.                                                                    |
| S26 | [Color Wow UK Xtra Large](https://uk.colorwowhair.com/products/flat-hair-volumizer-extra-large)                                                                                 | Current damp/dry permission, section application and air-/blow-drying.                                                              |
| S27 | [Color Wow Xtra Large Q&A](https://uk.colorwowhair.com/blogs/all/volume-hair-xtra-large-bombshell)                                                                              | Root-versus-all-over distinction and documented combination with Raise the Root; older starting-state wording is narrower than S26. |
| S28 | [BaByliss UK Wave Secret Air C1900U manual](https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1772798725082/information-booklets/C1900U_IB.pdf)  | Printed settings, product-free preparation, cooling-air action and sleep/shutoff distinctions.                                      |
| S29 | [BaByliss UK Style Secret Air C6688U manual](https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1757671677225/information-booklets/C6688U_IB.pdf) | Heated settings versus warm AIR mode, permitted preparation and filter/inlet-mesh boundaries.                                       |
| S30 | [Kitsch Sunset continuous set](https://www.mykitsch.com/collections/casey-holme-s-favorites/products/satin-heatless-curling-set-sunset-tie-dye)                                 | Already-covered ribbon construction and supplied fasteners.                                                                         |
| S31 | [Kitsch UK Rosewood jumbo four-pack](https://www.mykitsch.co.uk/collections/curling-tools/products/satin-jumbo-flexi-rods-4pc-rosewood)                                         | Already-covered exact jumbo dimensions/count; not evidence for a different pack.                                                    |
| S32 | [Kitsch UK satin six-pack](https://www.mykitsch.co.uk/products/satin-wrapped-flexi-rods-6pc)                                                                                    | Six-piece identity and individual bendable format; dimensions were not established in the retrieved text.                           |

Never copy maker health promises, damage percentages, comfort guarantees, testimonials or promotional price winners into the articles. Paraphrase supported facts and explain the decision they change. Public copy should contain original analysis, not long quotations.

## 4. New-guide requirements shared by N01–N09

- Required front matter: the title, description, H1 and intent supplied below; author `combreport-editorial-team`; `contentMethod: specification-researched`; an honest `reviewMethod` explaining exact manufacturer documentation and no firsthand comparison.
- Use the opening supplied below, then integrate the table, explanation, limitations, sources and next steps into one finished article. Do not append disconnected research notes to template filler.
- The table must answer the page's actual choice, not merely enumerate specifications. Add a short conditional recommendation and the circumstance in which keeping an existing tool is reasonable.
- Meet existing editorial gates without padding. There is no SEO word-count target. If a planned explanation repeats the same point, edit it rather than writing another generic paragraph.
- Use original accessible SVG drawings where specified. State “schematic, not to scale”; provide useful alt text and a caption. Do not infer measured dimensions or reproduce manufacturer photography.
- Add the three named FAQs with concise answers consistent with the body. These are reader-facing answers; do not add new FAQ rich-result machinery or fake Product/Review ratings.
- One indexable, self-canonical URL per decision. Reverse comparison wording, spelling variants and relevant US/UK variants belong on the same URL unless the actual answer differs materially.
- Follow existing article evidence/source/related-guide rendering conventions. Keep the usable answer before long evidence explanation; do not expose backlog terminology, SEO scores or implementation IDs in public copy.
- Set actual publication scheduling at implementation/release time. Preserve source-check dates internally. Do not display publication/update dates in public copy.

### N01 — Parlux diffuser compatibility

**URL:** https://www.combreport.com/guides/parlux-diffuser-compatibility  
**Reuse CSV ID:** `cr-parlux-diffuser-compatibility` (`hypothesis-02`); also resolve the separate MagicSense/MagicCompact hypothesis into this owner.  
**Title:** `Parlux Diffuser Compatibility: MagicSense and MagicCompact | Comb Report`  
**H1:** `Parlux diffuser compatibility: MagicSense and MagicCompact`  
**Description:** `Check Parlux MagicSense and MagicCompact fit by dryer model, adapter requirement and source scope, including Elysium and excluded models.`  
**Primary query:** `Parlux diffuser compatibility`  
**Variants:** `MagicSense adapter which models`; `MagicCompact vs MagicSense`; `does MagicSense fit Elysium`; `Parlux Ethos diffuser fit`.  
**Market:** International manufacturer evidence, with explicit local-offer verification for UK/US purchases. Sources S01–S05.

**Opening:** “Start with both names: the dryer model and the diffuser model. MagicSense and MagicCompact are different attachment decisions, and an adapter supplied with one does not make every Parlux pairing compatible.”

**Mandatory lookup rows:**

| Diffuser / dryer                   | Answer to publish                                                                                             | Evidence boundary                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| MagicSense / Alyon                 | Direct fit documented.                                                                                        | S01 and S02.                                                                                         |
| MagicSense / Digitalyon            | Direct fit documented.                                                                                        | S01 and S02.                                                                                         |
| MagicSense / Advance               | Direct fit documented.                                                                                        | S01 and S02.                                                                                         |
| MagicSense / Ethos                 | Italian product page explicitly lists direct fit; English product list differs. Confirm the exact offer/part. | Do not silently turn a language omission/general adapter statement into identical regional approval. |
| MagicSense / 3500                  | Excluded from the cited general compatibility statement.                                                      | Do not recommend the adapter as a workaround.                                                        |
| MagicSense / 385                   | Excluded from the cited general compatibility statement.                                                      | Preserve the model name rather than guessing subvariants.                                            |
| MagicSense / Elysium               | Excluded.                                                                                                     | S01/S02.                                                                                             |
| MagicCompact / Elysium             | Exclusively documented pairing.                                                                               | S03.                                                                                                 |
| MagicCompact / other Parlux bodies | Not compatible under S03's exclusivity statement.                                                             | Do not transfer MagicSense adapter permission.                                                       |

**Sections:** Find the two model names; Read the fit table; What the adapter statement establishes; Why the Ethos source wording needs care; Check the selected package before ordering; Sources and next task.

The adapter statement concerns the MagicSense accessory package. It does not establish that every dryer box includes a diffuser. Explain this distinction with one short original decision tree. Keep unspecified older models as “check exact model against maker”, rather than inventing an exhaustive all-years approval list. S04 is too sparse for a separate complete US matrix.

**FAQs:** Does MagicSense fit Elysium? No under the cited scope. Is the adapter needed on Alyon/Digitalyon? Not for the documented direct-fit pairings. Does every dryer pack include the diffuser? No such inference follows; inspect its box list.

**Existing owners:** general physical-fit method stays on diffuser compatibility; Alyon/Digitalyon motor/pack comparison stays on its current comparison. Incoming placements: E09 and E20. Hub: hair-dryers.

### N02 — T3 AireLuxe vs Featherweight StyleMax

**URL:** https://www.combreport.com/guides/t3-aireluxe-vs-featherweight-stylemax  
**Reuse CSV ID:** `cr-research-t3-aireluxe-vs-featherweight-stylemax` (`hypothesis-03`).  
**Title:** `T3 AireLuxe vs Featherweight StyleMax: US Controls and Kits | Comb Report`  
**H1:** `T3 AireLuxe vs Featherweight StyleMax: US controls and kits`  
**Description:** `Compare the named US T3 AireLuxe and Featherweight StyleMax dryers by control workflow, supplied attachments, diffuser options and electrical rating.`  
**Primary query:** `T3 AireLuxe vs Featherweight StyleMax`  
**Variants:** `AireLuxe StyleMax difference`; `T3 StyleMax diffuser included`; `SoftTouch 3 AireLuxe fit`; `T3 dryer automatic settings`.  
**Market:** US specifications only in the main table. Sources S06–S08.

**Opening:** “Compare the control workflow and the selected box before deciding from the T3 name. AireLuxe offers direct heat and speed choices; Featherweight StyleMax adds a texture-and-style selection workflow and a different documented attachment package.”

**Table rows:** five heat/three speed selections listed for each; StyleMax selection workflow; two concentrators; diffuser inclusion; smoothing-comb inclusion; 125 V / 1875 W on the checked US listings; exact chosen variant/model label. S07 lists model 77832 and includes SoftTouch 3 and the smoothing comb. S06 lists those two attachments as separate purchases; its white offer also names brushes. Label the selected box explicitly and do not make those brushes universal to every colour or retailer kit.

**Sections:** Controls versus automatic selection; Match four attachment tasks to the box; If you already own SoftTouch 3; Check US electrical scope; Which purchase changes a repeated task; Sources.

The original contribution is a task-to-box matrix: broad drying / directed styling / diffusing / comb-guided shaping, with “included”, “separately listed” and “verify selected box”. Same numeric setting counts do not establish identical control behaviour. Explain that a compatible spare already owned can change the purchase calculation. Do not call one universally better from a small published weight difference or repeat comparative drying/conditioning marketing.

**FAQs:** Is the diffuser included with the checked StyleMax? Yes. Is SoftTouch 3 approved for AireLuxe? Yes, under S08's named list. Are these US ratings proof of UK or worldwide use? No.

**Existing owners:** generic setting advice and general diffuser-fit method remain in place. Fold `hypothesis-41` into this comparison plus E07; `hypothesis-23` becomes an E09 addition rather than another thin spare page. Incoming: E07 and E19. Hub: hair-dryers.

### N03 — Remington EC9001 vs AC9800

**URL:** https://www.combreport.com/guides/remington-hydraluxe-pro-vs-proluxe-you-dryer  
**Reuse CSV ID:** `cr-research-remington-hydraluxe-pro-vs-proluxe-you-dryer` (`hypothesis-05`).  
**Title:** `Remington Hydraluxe Pro vs PROluxe You: EC9001 vs AC9800 | Comb Report`  
**H1:** `Remington Hydraluxe Pro vs PROluxe You: EC9001 vs AC9800`  
**Description:** `Compare UK Remington EC9001 and AC9800 dryers by Hydracare, StyleAdapt, manual controls and attachment fitting without confusing the wider product ranges.`  
**Primary query:** `Remington Hydraluxe Pro vs PROluxe You dryer`  
**Variants:** `EC9001 vs AC9800`; `Hydracare vs StyleAdapt`; `AC9800 manual mode`; `PROluxe You dryer settings`.  
**Market:** UK. Sources S09–S12.

**Opening:** “EC9001 and AC9800 are the dryer model numbers to compare. Hydracare's sensor switch and StyleAdapt's task modes are different control arrangements; a similar Remington range name does not make their settings or attachments interchangeable.”

**Table rows:** EC9001 separate three-heat/two-speed controls and Hydracare on/off; AC9800 Diffuse/Style/Quick Dry modes, three speeds in adaptive operation and Manual override; documented concentrators/diffuser; push fitting versus AC9800's documented twist-lock fitting; manual-specific diffuser restriction. A difference in the mounting descriptions is **not** an interchangeability test.

**Sections:** Match the model suffix; Sensor switch versus mode selection; How manual override changes AC9800 operation; Match accessories to their own body; Interpret the purchase trade-off; Sources.

Explain one concrete interface trade-off: separate manual selection versus choosing a task mode, not an invented better finish. Do not copy the catalogue's “Travel Size” label or implausible height units. The Remington range page also contains inconsistent speed/heat headings and airspeed figures; use exact manuals for controls and omit the disputed airspeed comparison. Do not state that the Hydraluxe dryer sprays water because a straightener in the same range uses mist.

**FAQs:** Are these the straighteners? No. Can AC9800 operate manually? Yes under S12. Are similarly named attachments automatically interchangeable? Not established.

`hypothesis-40` is answered here and E07, not by another URL. Incoming: E07 and E19. Hub: hair-dryers.

### N04 — Cloud Nine Original vs Touch

**URL:** https://www.combreport.com/guides/cloud-nine-original-iron-vs-touch-iron  
**Reuse CSV ID:** `cr-research-cloud-nine-original-iron-vs-touch-iron` (`hypothesis-08`).  
**Title:** `Cloud Nine Original Iron vs Touch Iron: Controls and Voltage | Comb Report`  
**H1:** `Cloud Nine Original Iron vs Touch Iron: controls and voltage`  
**Description:** `Compare current UK Cloud Nine Original and Touch irons by heat choices, activation, hibernation and voltage, keeping older and Contouring models separate.`  
**Primary query:** `Cloud Nine Original Iron vs Touch Iron`  
**Variants:** `Cloud 9 Touch or Original`; `Touch Iron voltage`; `Original Iron generations`; `Touch Iron temperature settings`.  
**Market:** Current UK listings. Sources S13–S14.

**Opening:** “Choose between the current Original Iron's broader heat selection and the Touch Iron's two-setting, plate-activated control system. Check the exact model before using an older review: the UK listings also state different voltage ranges.”

**Table:** Original: 11 settings, 100–200°C; Touch: two settings, 165°C and 195°C. Both list nominal one-inch plates. Original lists Revive Mode and 100–240 V; Touch lists Touch Technology and 220–240 V. Hibernation is described after 30 minutes versus 30 seconds respectively. These are manufacturer specifications, not measured warm-up, styling or safety-performance results.

**Sections:** Identify ordinary Original, Touch, Contouring and Cordless; Compare the selected controls; Understand hibernation without treating it as unplugging; Check the label before travel; When a working iron already solves the task; Sources.

**Critical conflict:** S14 reverses the two/three-tap temperature mapping between its main feature text and FAQ. Do not publish a tap-count recipe or guess which passage is correct. Tell readers to use the instructions and indicated setting on their own tool. Do not describe the ordinary corded Original as cordless because a comparison aggregator does so. Do not apply its voltage to the free gift dryer shown in a promotional bundle.

**FAQs:** Do both have the same heat choices? No. Is the checked Touch dual voltage? The selected UK page states 220–240 V. Which tap sequence should I follow? The exact supplied instructions; this page does not resolve the conflicting website text.

**Ownership:** Original versus Wide remains the width decision. Generation identification is a section on that owner and here, not a new standalone page now (`hypothesis-29`). Incoming: E03 and E05. Hub: flat-irons.

### N05 — SteamPod 3 vs 4

**URL:** https://www.combreport.com/guides/steampod-3-vs-steampod-4  
**Reuse CSV ID:** `cr-research-steampod-3-vs-steampod-4` (`hypothesis-09`).  
**Title:** `SteamPod 3 vs SteamPod 4: Combs, Design and Upgrade Choice | Comb Report`  
**H1:** `SteamPod 3 vs SteamPod 4: combs, design and upgrade choice`  
**Description:** `Compare documented SteamPod 3 and 4 design and comb differences, understand the advertising comparator, and decide whether an upgrade changes your routine.`  
**Primary query:** `SteamPod 3 vs 4`  
**Variants:** `SteamPod 4 upgrade from 3`; `SteamPod 3 4 comb difference`; `SteamPod 4 replacement comb`; `is SteamPod 4 for wet hair`.  
**Market:** UK documentation. Sources S15–S17 plus the verified exact LP74 manual already used in the repository.

**Opening:** “SteamPod 4 changes the documented plate/design arrangement and adds a choice of three combs. Whether that justifies replacing a working SteamPod 3 depends on the task those changes address, not on assuming every advertised percentage compares the two generations.”

**Table rows:** named generation; 3.0 removable-comb guidance versus 4.0's three comb choices; 4.0's wider-plate/rounder-design description; 4.0 curl-locking guide; exact directions/manual owner; replacement compatibility unknown unless separately approved. Record a field as unknown rather than inventing a generation-wide dimension or spare code.

**Sections:** What changes in the documented setup; Pick the comb using the exact generation's directions; Read the comparator behind the claim; Keep working equipment unless the change solves a task; Operation and care next steps.

S16's prominent comparison figures use a named BaByliss straightener, **not SteamPod 3**. Do not turn them into a 3-versus-4 performance result. S15 is historical brand guidance; its reservoir wording must not become a universal water prescription. Steam use is not wet-hair permission. Link to the existing operating and care guides rather than expanding a second full tutorial here.

**FAQs:** Are the marketing percentages measured against SteamPod 3? Not in S16's cited footnotes. Are old and new combs interchangeable? Not established. Does steam mean wet hair can be styled? No such permission follows; use the model's preparation instructions.

Incoming: E04 and E06. Hub: flat-irons.

### N06 — Denman D3 vs D38

**URL:** https://www.combreport.com/guides/denman-d3-vs-d38  
**Reuse CSV ID:** `cr-research-denman-d3-vs-d38` (`hypothesis-13`).  
**Title:** `Denman D3 vs D38: Styling Head or Cushioned Paddle? | Comb Report`  
**H1:** `Denman D3 vs D38: styling head or cushioned paddle?`  
**Description:** `Compare the Denman D3 styling brush and D38 paddle by head format, pin arrangement and section handling, without treating shared pins as identical brushes.`  
**Primary query:** `Denman D3 vs D38`  
**Variants:** `Denman Power Paddle vs D3`; `D38 curl definition`; `D3 vs paddle brush`; `D38 pins D3`.  
**Market:** Named UK products; no assumed cross-market dimensions. Sources S19–S21.

**Opening:** “The D38 combines D3-style pins with a wider, air-cushioned paddle body. That changes the head and section-handling question: it is not simply another row-count version of the seven-row D3.”

**Table:** D3 original seven-row styling format; D38 paddle format, staggered pin arrangement and air-cushioned pad; stated styling/detangling roles; narrower local section versus broader head as an editorial handling interpretation; measured working dimensions unknown. Do not derive sizes from product codes, copy D83 measurements onto D38 or infer replacement-pad interchangeability.

**Sections:** Compare the head construction; Match the head to the section; Why shared pin language does not mean identical handling; Identify the task before adding another brush; Methods and sources.

**Drawing:** Original side-by-side SVG showing a narrow styling-head silhouette and a broad paddle outline with visibly different pin layouts. Label as schematic/unmeasured. Do not depict air-cushion details as measured engineering or invent cutaway construction.

**FAQs:** Does D38 use D3-style pins? The brand describes that relationship. Is D38 another seven-/nine-row decision? The key comparison here is the paddle body. Does broader mean faster for everyone? No independent timed result is supplied.

**Ownership:** D3/D4 retains seven-versus-nine-row choice; D3/D31 retains spacing; the generic curl-defining-versus-detangling page retains task selection. Incoming: E01 and E21. Hub: brushes-combs.

### N07 — invisibobble ORIGINAL, POWER and SLIM

**URL:** https://www.combreport.com/guides/invisibobble-original-vs-power-vs-slim  
**Reuse CSV ID:** `cr-research-invisibobble-original-vs-power-vs-slim` (`hypothesis-17`).  
**Title:** `invisibobble ORIGINAL vs POWER vs SLIM: Which Spiral? | Comb Report`  
**H1:** `invisibobble ORIGINAL vs POWER vs SLIM: which spiral?`  
**Description:** `Compare named invisibobble ORIGINAL, POWER and SLIM packs by intended use and format, while keeping grip promises, sizing and wrapping checks separate.`  
**Primary query:** `invisibobble Original vs Power vs Slim`  
**Variants:** `invisibobble Power or Original`; `Slim vs Original hair tie`; `invisibobble for thick ponytail`; `invisibobble spiral sizes`.  
**Market:** Official international English catalogue; local availability/packaging must be checked. Sources S22–S24.

**Opening:** “ORIGINAL, POWER and SLIM are different spiral choices within the same brand. Start with the amount of hair you gather and the fastening you can comfortably release; the maker's extra-hold or slim-design descriptions are not a guarantee for every ponytail.”

**Table:** ORIGINAL Crystal Clear as the named everyday design; POWER Crystal Clear positioned by the maker for voluminous hair/active use; SLIM Pink Monocle as the named slimmer/elegant design. Each selected offer lists three pieces. Keep nominal dimensions, material chemistry and measured hold unfilled because these sources do not establish them. SLIM PREMIUM is a separate named offer and not the exact selected example.

**Sections:** Identify the actual pack; Everyday fastening, extra-hold positioning or a slimmer look; Check a real gathered section; Read claim limits; Operation and alternatives.

Give a conditional choice based on the described task, without a forced wrap count or a universal grip ranking. Do not promise no marks, no discomfort or all-day retention. No boiling-water, hot-air reshaping or cross-variant heat tolerance advice. Link to the existing spiral-use tutorial for wrapping/removal rather than reproducing it.

**FAQs:** Is POWER documented as an extra-hold option? Yes, as brand positioning. Is SLIM guaranteed best for fine hair? No. Can I use the same wrap count for every tie and hairstyle? No universal count is established.

Incoming: E12 and the accessories hub; E12 also contains the short selection preview. The generic elastics-versus-scrunchies page remains a different format decision.

### N08 — Color Wow Raise the Root vs Xtra Large

**URL:** https://www.combreport.com/guides/color-wow-raise-the-root-vs-xtra-large  
**Reuse CSV ID:** `cr-research-color-wow-raise-the-root-vs-xtra-large` (`hypothesis-44`).  
**Title:** `Color Wow Raise the Root vs Xtra Large: Lift or Body? | Comb Report`  
**H1:** `Color Wow Raise the Root vs Xtra Large: lift or body?`  
**Description:** `Choose between Color Wow Raise the Root and Xtra Large by application area, spray versus foam and drying method, using the current UK product directions.`  
**Primary query:** `Color Wow Raise the Root vs Xtra Large`  
**Variants:** `can you use Raise the Root and Xtra Large together`; `Xtra Large on dry hair`; `Color Wow root lift vs mousse`; `Xtra Large air dry`.  
**Market:** Current UK product listings. Sources S25–S27.

**Opening:** “Raise the Root targets lift around the roots; Xtra Large is a foam for volume through the areas where it is distributed. Choose the application job first instead of treating the two names as stronger and weaker versions of the same product.”

**Table:** targeted spray versus all-over/section-distributed foam; placement; current damp-or-dry permission for both; Raise the Root's blow-dryer direction for lasting results versus Xtra Large's permitted air-/blow-drying; product-specific dose only. S26 currently permits damp **or dry** hair; S27's older application list says damp. Cite the current product directions beside the answer and do not preserve the older restriction as the only permission.

**Sections:** Define root lift versus distributed body; Compare the two application plans; Can they be combined?; Follow the actual dispenser; Keep the rest of the routine compatible; Next steps.

S27 permits their combination. Present that as an optional documented pairing, not a necessary two-product purchase or palm-mixing instruction. Do not extend it to Dream Coat Original/Extra Strength or every hot appliance. Do not make hair-growth, density-change or independent long-wear claims. If one product already produces the wanted cosmetic finish, the other is optional.

**Drawing:** Simple labelled head/section schematic showing root-targeted placement versus section-length distribution. It is an application-area aid, not a dose or performance map.

**FAQs:** Is Xtra Large only for damp hair? Not under the current UK listing. Does Xtra Large require heat for every permitted routine? The listing permits air drying. Can the two be used together? The cited maker Q&A permits it, with each product's directions retained.

Incoming: E13 and E18. Hub: hair-care. The mousse tutorial keeps the application method; the product-order guide keeps compatibility planning.

### N09 — BaByliss Wave Secret Air vs Style Secret Air

**URL:** https://www.combreport.com/guides/babyliss-wave-secret-air-vs-style-secret-air  
**Reuse CSV ID:** `cr-research-babyliss-wave-secret-air-vs-style-secret-air` (`hypothesis-11`).  
**Title:** `BaByliss Wave Secret Air vs Style Secret Air: UK Models | Comb Report`  
**H1:** `BaByliss Wave Secret Air vs Style Secret Air: UK models`  
**Description:** `Compare UK BaByliss C1900U and C6688U by heated settings, cooling air versus AIR styling mode and exact-model preparation, without mixing Curl Secret variants.`  
**Primary query:** `BaByliss Wave Secret Air vs Style Secret Air`  
**Variants:** `C1900U vs C6688U`; `Style Secret Air AIR mode`; `Wave Secret Air cooling`; `Style Secret Air product preparation`.  
**Market:** UK exact models only. Sources S28–S29.

**Opening:** “For the UK C1900U and C6688U, ‘Air’ describes different parts of the styling sequence. Wave Secret Air documents cooling air on release; Style Secret Air also has a warm AIR styling option. Neither name alone tells you how to prepare or load the hair.”

**Table:** model identity; C1900U 180/200/230°C versus C6688U 170/185/200°C plus warm AIR; cooling-air release versus warm-air shaping; exact preparation restrictions; manual-specific care access. The C1900U manual excludes styling products; C6688U's wording explicitly excepts protectant spray. Neither is an unrestricted product-layering permission.

**Sections:** Match C1900U and C6688U; Cooling air is a different job from AIR shaping; Compare preparation before comparing timers; Follow the exact loading diagram; Operation and care next steps.

C6688U's AIR option is warm air, not a zero-heat or cooling setting. Do not import C1900U sleep/shutoff behaviour into C6688U, or use a retailer's conflicting shutoff figure over the exact manual. Do not equate C6686U Collection, Hydro-Fusion, a generic Curl Secret or the Canadian CD1031C with these models. Do not provide an improvised active-tangle release sequence.

**FAQs:** Is AIR cold? S29 describes warm shaping air. Are preparation directions identical? No. Can a US/Canadian Curl Secret manual establish these UK models? No.

Incoming: E10 and E11. Hub: curling-irons. Generic automatic-curler-versus-wand coverage retains mechanism selection.

## 5. Existing-guide implementation instructions

Preserve the current title/H1/intent unless an instruction explicitly requires a factual correction. Insert additions into the relevant section before the conclusion; do not append a second conclusion, repeated warnings or a detached research appendix. Link labels below identify the intended destination; resolve links through the existing typed system. If the exact sentence's information is already present, keep that information and add the missing contextual destination only.

| ID  | Existing guide — full canonical URL                                         | Concrete change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E01 | https://www.combreport.com/guides/denman-d3-vs-d4                           | At the end of the row-count comparison, add: “For a wider air-cushioned paddle with D3-style pins, compare **D3 vs D38**; that is a head-format decision rather than another row-count choice.” Link the bold phrase to N06. Keep the replacement-pad rows and D3/D4 intent intact.                                                                                                                                                                                                             |
| E02 | https://www.combreport.com/guides/denman-d3-vs-d31                          | After explaining spacing, add a short next-choice sentence linking **D3 vs D38** for a paddle-body decision. Do not add a D41 table without exact evidence or create a D31/D41 URL in this batch.                                                                                                                                                                                                                                                                                               |
| E03 | https://www.combreport.com/guides/cloud-nine-original-iron-vs-wide-iron     | Add a compact current-model identity note before the main table: ordinary current Original/Wide, older Original generations, Contouring and Cordless must retain separate records. Link **Original vs Touch** for controls, not width. Audit the existing voltage/hibernation wording against its own current cited model; do not copy the Touch fields into either current column.                                                                                                             |
| E04 | https://www.combreport.com/guides/how-to-use-a-steam-hair-straightener      | Add a model-routing paragraph linking **SteamPod 3 vs 4** for purchase differences. Preserve the exact LP74 example; distinguish historical 3.0 brand FAQ directions from the current manual. Add no universal reservoir-water table, fill recipe or cross-generation comb permission.                                                                                                                                                                                                          |
| E05 | https://www.combreport.com/guides/best-travel-flat-irons                    | Add one named electrical-scope example after the rating-label decision: the checked UK ordinary Original lists 100–240 V and Touch 220–240 V. Link **Original vs Touch voltage and controls**. Distinguish the iron from a promotional gift dryer. This is not a new “best travel iron” ranking or a recommendation to use a converter.                                                                                                                                                         |
| E06 | https://www.combreport.com/guides/how-to-clean-a-steam-hair-straightener    | In the model/comb check, link **SteamPod 3 vs 4 comb arrangements**. Preserve the current distinction between a removable part, washing permission and spare approval. No new descaling recipe, universal water advice or unverified spare code.                                                                                                                                                                                                                                                |
| E07 | https://www.combreport.com/guides/hair-dryer-heat-and-speed-settings-guide  | Add a small “automatic selection is model-specific” table: T3 StyleMax uses a texture/style selection workflow; Remington AC9800 has named adaptive modes and a Manual override; EC9001 has separate controls plus a Hydracare switch. Link N02 and N03. Explicitly note that AC9800 Manual couples the displayed speed/heat steps under its instructions, so generic advice to change each independently has an exception. Keep the ghd Speed example.                                         |
| E08 | https://www.combreport.com/guides/how-to-clean-hair-dryer-filter            | Add a short AC9800 example from S12: cool/unplug, remove the identified grille as shown, use a cloth/soft brush and replace it. Link N03 for model identity. Do not transfer this access to every sensor dryer or describe dismantling the sensor/body. A fault that persists after permitted care goes to maker support.                                                                                                                                                                       |
| E09 | https://www.combreport.com/guides/hair-dryer-diffuser-compatibility         | Add two concise examples after the current Dyson-specific example: S08's SoftTouch 3 named list, and the distinction between MagicSense/ring and Elysium-only MagicCompact. Link N02 for the selected T3 box and N01 for the full Parlux lookup. Keep fit, enabled features and box inclusion separate. Do not paste the entire N01 matrix into this method guide.                                                                                                                              |
| E10 | https://www.combreport.com/guides/how-to-use-an-automatic-hair-curler       | Preserve the Canadian CD1031C operating example. Add a labelled UK model-routing block from S28/S29: exact C1900U versus C6688U preparation differs; C6688U warm AIR is not a general cold mode. Link N09. Do not combine three different loading diagrams into one supposed universal recipe.                                                                                                                                                                                                  |
| E11 | https://www.combreport.com/guides/how-to-clean-an-automatic-hair-curler     | Add a C6688U-specific filter/inlet distinction from S29: its permitted cooled filter care does not authorise removing the permanently attached inlet mesh. Link N09 and preserve the separate CD1031C cover example. State clearly that a removable filter and a care cover are different parts. Do not transfer washing or active-tangle permissions.                                                                                                                                          |
| E12 | https://www.combreport.com/guides/how-to-use-spiral-hair-ties               | Add an early two-sentence selection preview linking N07: ORIGINAL/POWER/SLIM are named variants, not an automatic universal wrap-count ladder. Keep this page's gather/wrap/unwind method and heat-reshaping boundary. Do not duplicate the full purchase comparison.                                                                                                                                                                                                                           |
| E13 | https://www.combreport.com/guides/how-to-apply-hair-mousse                  | Expand the named dispenser example with a separate non-aerosol comparison: current Xtra Large uses its stated pumps/section method and permits damp/dry hair. This is not permission to shake/invert every package. Keep John Frieda's aerosol method as its own example. Link **Raise the Root vs Xtra Large** and cite S26.                                                                                                                                                                   |
| E14 | https://www.combreport.com/guides/hair-styling-product-order                | Add a named, optional S27 example: root-targeted Raise the Root and distributed Xtra Large can be used together under maker directions. Link N08. Contrast their different application jobs with buying two products that repeat one task; retain the existing Dream Coat wet-stage restrictions and exact-appliance preparation checks. Do not invent a universal mixing order or certify all cross-brand layering.                                                                            |
| E15 | https://www.combreport.com/guides/how-to-use-heatless-curling-rod           | Keep the complete Sunset ribbon sequence. Add one sentence directing format buyers to the existing heatless-set comparison for the four-/six-piece individual-rod alternative. Do not create or point to a new Kitsch comparison URL.                                                                                                                                                                                                                                                           |
| E16 | https://www.combreport.com/guides/how-to-use-flexi-rods                     | Add a brief exact-pack check: Kitsch's four-piece Rosewood jumbo and six-piece satin offers are different packs. Do not carry the jumbo dimensions across to the six-piece set. Link the heatless-set owner for comparison; retain the existing model-specific preparation and reverse-wrap removal method.                                                                                                                                                                                     |
| E17 | https://www.combreport.com/guides/best-heatless-curling-sets                | Retain its existing Sunset-versus-Rosewood comparison. Add a separate S32 six-piece satin row with count/individual closure confirmed and dimensions marked unknown. Extend the pack-coverage example to distinguish four simultaneous sections from six without claiming that either count covers a whole head. Do not duplicate the existing geometry/closure paragraphs or convert this specification comparison into a tested ranking. This resolves hypotheses 16/34 on an existing owner. |
| E18 | https://www.combreport.com/guides/how-to-get-root-volume-with-a-round-brush | Add a short optional-product paragraph after the technique table: targeted root placement versus wider section distribution is a different purchase decision; link N08. Keep the technique useful without either product, and do not turn the page into a Color Wow review.                                                                                                                                                                                                                     |
| E19 | https://www.combreport.com/guides/how-to-choose-hair-dryer                  | Add a three-way control distinction in the control-selection area: direct manual selection, preset/profile selection and model-documented adaptive operation. Link N02 and N03 with task-based labels. Explain that matching an included diffuser/comb to a required job matters more than counting modes; do not add both dryers to an unsupported winner list.                                                                                                                                |
| E20 | https://www.combreport.com/guides/parlux-alyon-vs-digitalyon                | Preserve the existing direct-fit/box table and motor comparison. Add: “For Ethos, Elysium and the adapter exclusions, use the **Parlux diffuser compatibility lookup**.” Link N01. No second full family matrix and no retroactive universal approval for every US listing.                                                                                                                                                                                                                     |
| E21 | https://www.combreport.com/guides/curl-defining-brush-vs-detangling-brush   | Add a short bridge explaining that a named brush can span tasks without making those tasks identical. Link N06 as the exact D3/D38 construction example. Preserve the generic task-selection intent and avoid assigning every paddle or pin arrangement a guaranteed curl result.                                                                                                                                                                                                               |

Expected substantial additions: E03, E05, E07–E11, E13–E14, E16–E17 and E19. The other changes can remain compact context links. Report the actual distinction after implementation.

## 6. Eight discovery pages and link integration

Use the current registry/category-card system. Do not hand-code a second content index. Search results must continue to appear immediately below the input where the current layout requires that. Preserve existing guides and navigation.

| Updated canonical page                      | Required additions                                                                                                                                                                                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://www.combreport.com/                 | Feature a small task-based selection of new decisions; do not add nine repetitive home-page cards. Use the existing category routes for the full collection.                                                                                                  |
| https://www.combreport.com/guides           | Register all nine; add useful searchable aliases such as `Cloud 9`, `EC9001`, `AC9800`, `Hydracare`, `StyleAdapt`, `D38`, `C1900U`, `C6688U`, `MagicCompact`, and `Xtra Large`. Aliases must return the existing canonical owner rather than generate routes. |
| https://www.combreport.com/hair-dryers      | N01–N03 under distinct tasks: replacement fit, included T3 tools, and Remington controls. Keep use/fix routes accessible after selection.                                                                                                                     |
| https://www.combreport.com/brushes-combs    | N06 beside exact-model choices, retaining D3/D4 and D3/D31 for their separate decisions.                                                                                                                                                                      |
| https://www.combreport.com/flat-irons       | N04 and N05 with clear controls/voltage versus steam-generation labels. Do not misclassify them as new hands-on winners.                                                                                                                                      |
| https://www.combreport.com/curling-irons    | N09 under automatic chamber curlers; keep airflow barrel and wand methods separate.                                                                                                                                                                           |
| https://www.combreport.com/hair-care        | N08 under cosmetic volume/application choices, connected to mousse and product-order methods.                                                                                                                                                                 |
| https://www.combreport.com/hair-accessories | N07 plus the expanded existing heatless-format owner. No new Kitsch route.                                                                                                                                                                                    |

Every new guide needs at least one relevant incoming article link and its category card. Prefer the two specified article placements where useful; do not insert unrelated links merely to hit a number. The new guides should link back to their method owner and at most a small curated set of genuine next decisions.

## 7. Search-result evidence and opportunity limits

The searches below were conducted on 18 November 2026 through general web search. **Market and device were not controlled; returned URLs are samples, not national top-ten rankings.** Manufacturer pages supplied technical facts; retailer/forum/aggregator URLs below were inspected as search-result observations only and are not sources for appliance instructions or measured outcomes.

| Query sampled                                                            | Representative returned pages                                                                                                                                                                                                                                                                                                                                                                                                           | Observed opportunity / limit                                                                                                                                                                                        |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Denman D3 D38 which brush`                                              | [Denman D38](https://denmanbrush.com/products/d38-denman-detangler), [Sally Denman range](https://www.sallybeauty.co.uk/brands/denman/), [Denman construction article](https://denmanbrush.com/blogs/news/brush-of-the-month-d38-power-paddle)                                                                                                                                                                                          | Product/range text is available; organise the head-format decision and draw the difference. Exact pair demand remains unknown.                                                                                      |
| `T3 Aireluxe Featherweight Stylemax difference`                          | [T3 comparison context](https://t3micro.com/collections/bestsellers/products/featherweight-stylemax-professional-hair-dryer), [Strand & Steam range article](https://strandandsteam.com/brands/t3)                                                                                                                                                                                                                                      | Some comparison text reduces the choice to settings counts/weight. Explain the documented control workflow and included-part difference instead. No controlled competitive ranking established.                     |
| `Remington Hydraluxe Pro EC9001 PROluxe You AC9800 compare`              | [EC9001](https://uk.remington-europe.com/hydraluxe-pro-hair-dryer-ec9001-uk), [AC9800](https://uk.remington-europe.com/proluxe-you-adaptive-hair-dryer-ac9800-uk), [range article](https://eu.remington-europe.com/hydraluxe-pro)                                                                                                                                                                                                       | Exact-model interface comparison avoids range-name and catalogue-field confusion. Query volume unknown.                                                                                                             |
| `Cloud Nine Original Touch difference`                                   | [Official selector](https://www.cloudninehair.com/blogs/hair/which-hair-straighteners-are-best-for-me), [PriceSpy Original](https://pricespy.co.uk/product.php?p=609289), [VettedTen Touch](https://vettedten.com/household/hair-straighteners/cloud-nine-the-touch-iron/)                                                                                                                                                              | Generation/control/voltage precision adds value. Sample aggregator text calls the ordinary Original cordless; do not repeat it. Official tap counts also conflict. This is a gap inference, not a difficulty score. |
| `SteamPod 3 vs 4`                                                        | [Boards discussion](https://www.boards.ie/discussion/2058310537/steampod-3-vs-4), [French comparison](https://www.pascalcoste-shopping.com/blog/lisseur-vapeur-steampod-30-vs-steampod-4-lequel-choisir/), [official 4.0 page](https://www.lorealprofessionnel.co.uk/all-products/hair-tools/steampod-4)                                                                                                                                | Real generation-comparison discussion exists; provide an English exact-source decision and correct comparator attribution. It is not proof of easy rankings.                                                        |
| `invisibobble POWER SLIM ORIGINAL comparison`                            | [Salontotal ORIGINAL](https://www.salontotal.co.uk/product/invisibobble-original-crystal-clear-3419), [Salontotal POWER](https://www.salontotal.co.uk/product/invisibobble-power-crystal-clear-15682), [official spirals](https://invisibobble.com/collections/spirals-sprunchies)                                                                                                                                                      | Explicit range-choice sections indicate a recognisable buyer question. Actual search volume/independent grip evidence remain unknown.                                                                               |
| `Color Wow Raise the Root Xtra Large difference`                         | [Official Q&A](https://uk.colorwowhair.com/blogs/all/volume-hair-xtra-large-bombshell), [Justmylook guide](https://www.justmylook.com/blogs/haircare/color-wow-the-best-products-and-which-ones-are-right-for-your-hair), [Boots product](https://www.boots.com/color-wow-raise-the-root-thicken-and-lift-spray-150ml-10338503/)                                                                                                        | Root-versus-distribution task and current damp/dry permission are clearer than a “strongest” winner. This cluster has commercial competition.                                                                       |
| `BaByliss Style Secret Air Wave Secret Air` and model-qualified variants | [Manufacturer C1900U manual](https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1772798725082/information-booklets/C1900U_IB.pdf), [manufacturer C6688U manual](https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1757671677225/information-booklets/C6688U_IB.pdf), [Style Secret Air review](https://www.womanandhome.com/beauty/hair/babyliss-style-secret-air-review/) | Similar names obscure warm AIR versus release cooling and preparation differences. Technical facts come from manuals, not retailer settings/auto-off tables.                                                        |
| `Parlux MagicSense MagicCompact compatibility`                           | [Official buying guide](https://www.parlux.it/en/blogs/news/diffusore-professionale-guida-acquisto), [MagicSense](https://www.parlux.it/en/products/magicsense-diffuser), [MagicCompact](https://www.parlux.it/en/products/diffusore-magiccompact%C2%AE)                                                                                                                                                                                | Consolidate compatibility evidence into one lookup with qualified source differences; do not create both a matrix and a second pair page.                                                                           |
| `Kitsch curling rod flexi rods difference`                               | [Official four-pack](https://www.mykitsch.co.uk/collections/curling-tools/products/satin-jumbo-flexi-rods-4pc-rosewood), [six-pack](https://www.mykitsch.co.uk/products/satin-wrapped-flexi-rods-6pc), [Anthropologie pack](https://www.anthropologie.com/en-gb/shop/kitsch-satin-jumbo-flexi-rods-set-of-4?category=beauty-wellness-all&color=000)                                                                                     | Retailer summary can conflate ribbon/scrunchie and individual-rod directions. Our existing format owner already answers the core comparison; expand that owner only.                                                |

Do not label every result a low-authority competitor or call an absent exact-match title evidence of no competition. Product reviews, retailer pages, videos and broader range answers can satisfy the same query. The nine selections are an editorial judgement about answer value and niche fit. Organic opportunity/demand score fields stay blank where evidence is insufficient.

## 8. CSV updates and reconciliation of all 47 hypothesis tags

Preserve existing IDs, column names and historical evidence. Do not replace the maintained CSV with a new incompatible file or duplicate an owner for every spelling variant. Keep one selected `proposed_url` per NEW decision and leave provisional future slugs in notes.

For N01–N09 set `status=PLANNED`, `action=NEW`, the supplied URL/title/queries, exact source URLs, `last_reviewed_on=2026-11-18`, and a note recording editorial selection with demand/difficulty unknown. Use `implementation_state=implemented_local` only after the actual source/build work is complete. Set DONE / `verified_live` only after release verification. Do not mark live merely because the build passes.

Existing owners remain DONE as appropriate; an EXPAND action is not evidence the expansion shipped. Record the pending change and its implementation state separately. Where an existing row already owns the URL, update that row and retain references from hypothesis records; do not create duplicate “new page” owners.

Reconcile the twelve guides deployed on 17 November against that release's dated verification before continuing to describe them as pending. Retain the old snapshot as history. Do not claim that a sitemap inclusion proves Google indexing.

| Hypothesis tag                                   | Decision in this batch                                                                                                                                                                |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01 — Shark HD300/500/700 fit                     | RESEARCH: no new cross-series approval evidence collected; retain exact-part hold, no URL reserved.                                                                                   |
| 02 — Parlux range fit                            | N01 NEW.                                                                                                                                                                              |
| 03 — T3 dryers                                   | N02 NEW.                                                                                                                                                                              |
| 04 — Panasonic NA0J/NA67                         | RESEARCH: exact markets/models and decision value still need direct review.                                                                                                           |
| 05 — Remington dryers                            | N03 NEW; replace irrelevant ghd source lead.                                                                                                                                          |
| 06 — BaByliss dryer pair                         | RESEARCH: exact suffixes/manuals and demand not established here.                                                                                                                     |
| 07 — Dreame Pro/Era                              | RESEARCH: Shark sources cannot establish Dreame specifications.                                                                                                                       |
| 08 — Cloud Nine Original/Touch                   | N04 NEW.                                                                                                                                                                              |
| 09 — SteamPod generations                        | N05 NEW.                                                                                                                                                                              |
| 10 — Curl Secret/Wave                            | RESEARCH: exact Curl Secret model unresolved; do not treat N09 as proof for it.                                                                                                       |
| 11 — Wave/Style Secret Air                       | N09 NEW, restricted to C1900U/C6688U.                                                                                                                                                 |
| 12 — Amika/ghd Rise                              | RESEARCH: do not promote adjacent brush pages into direct comparison evidence.                                                                                                        |
| 13 — Denman D3/D38                               | N06 NEW.                                                                                                                                                                              |
| 14 — Tangle Teezer thick/curly                   | RESEARCH: establish whether current and legacy names designate a distinct product or renamed variant.                                                                                 |
| 15 — BaByliss/Conair roller kits                 | RESEARCH: exact regional identity and electrical scope needed; preserve Conair existing owner.                                                                                        |
| 16 and 34 — Kitsch / generic ribbon versus flexi | EXPAND E17, with E15/E16 links. No new URL. Both tags remain traceable on the existing row.                                                                                           |
| 17 — invisibobble family                         | N07 NEW.                                                                                                                                                                              |
| 18 — France Luxe barrettes                       | RESEARCH: compare actual closure capacity/geometry with the existing barrette owner before selecting a separate URL.                                                                  |
| 19 — Oribe/Living Proof                          | RESEARCH: exact current formulas and reader task not reverified in this batch.                                                                                                        |
| 20 — Dreame/Shark                                | RESEARCH: exact-model comparison evidence and competitive review outstanding.                                                                                                         |
| 21 — T3 Aire 360 diffuser generations            | Keep with the existing T3/Airwrap guide's generation caveat unless a larger approved-part lookup is evidenced; do not create a thin duplicate.                                        |
| 22 — Air Wand spares                             | RESEARCH: exact spare approvals required; existing AS6550U/AS6553U box comparison remains owner for included parts.                                                                   |
| 23 — T3 SoftTouch                                | EXPAND E09 and reference N02; no standalone page.                                                                                                                                     |
| 24 — Bio Ionic universal diffuser                | RESEARCH: nominal universal label is insufficient for a fit matrix.                                                                                                                   |
| 25 — Panasonic diffuser spares                   | RESEARCH: replacement codes and market approval still unresolved.                                                                                                                     |
| 26 and 27 — Ethos versus two Parlux models       | RESEARCH: review one family-selection task before proposing two pair pages. N01 covers attachment fit only.                                                                           |
| 28 — T3 Aire 360 generations                     | RESEARCH: comparison could be distinct, but original-generation evidence is still needed beyond the existing second-generation guide.                                                 |
| 29 — Original Iron generations                   | EXPAND E03; N04 also identifies its selected current generation. No identification-only URL now.                                                                                      |
| 30 — Style Secret/Curl Secret                    | RESEARCH: combine research with tag 10 around exact identity; do not assume it is the same as N09.                                                                                    |
| 31 — MagicSense/MagicCompact                     | Resolve into N01; mark covered by selected owner with no second proposed URL.                                                                                                         |
| 32 — Denman D31/D41                              | RESEARCH: do not derive D41 layout from the suffix; E02 retains the existing spacing decision.                                                                                        |
| 33 — Tangle Teezer Mini/full-size                | RESEARCH: exact dimensions and product naming outstanding; no new size page.                                                                                                          |
| 35 — Air Wand/Air Style 1000                     | RESEARCH: a different existing comparison already covers Air Style/Flawless; body-level comparison needed before another URL.                                                         |
| 36 — SilkiPro wet/dry                            | Existing SilkiPro/Airstrait owner already covers the mode boundary. Record covered-existing / KEEP for that question, not a NEW URL.                                                  |
| 37 — SpeedStyle travel voltage                   | Existing SpeedStyle Pro/Flex comparison plus travel-voltage owner are the likely placements; exact rating evidence remains a hold for the proposed addition. No dedicated travel URL. |
| 38 — Dreame accessory generations                | RESEARCH: no fit inferred from Shark parts sources.                                                                                                                                   |
| 39 — Panasonic nozzle family                     | RESEARCH: ghd nozzle approval is not Panasonic evidence.                                                                                                                              |
| 40 — Remington adaptive/manual                   | Resolve into N03 and E07.                                                                                                                                                             |
| 41 — T3 automatic/manual                         | Resolve into N02 and E07.                                                                                                                                                             |
| 42 — Moroccanoil/pure argan                      | RESEARCH: current exact formula evidence and overlap with serum/oil owner needed.                                                                                                     |
| 43 — Oribe range                                 | RESEARCH: verify exact current products before assigning another texturising owner.                                                                                                   |
| 44 — Color Wow root/all-over                     | N08 NEW; replace unrelated John Frieda source lead.                                                                                                                                   |
| 45 — ghd/Cloud Nine wide                         | RESEARCH: existing width/generation pages are close neighbours; no extra pair selected now.                                                                                           |
| 46 — Duet Blowdry/SmoothStyle                    | RESEARCH: exact SmoothStyle model and distinct comparison evidence still needed.                                                                                                      |
| 47 — FlexStyle/IonCurl filter care               | RESEARCH: no complete exact-model care review in this batch; broader filter guide remains owner pending evidence.                                                                     |

“RESEARCH” above does not mean a fresh full source/SERP investigation was completed for that row. It means the candidate was screened against this batch and retains the stated unresolved work. Preserve that provenance.

Use the current scoring formula if all factors are evidenced; otherwise leave unknown scores and total blank. Use the order N01–N09 as implementation ordering, not an invented numeric SEO ranking. Preserve separate first-party page totals, page/query observations and qualitative commercial-result samples.

## 9. Implementation sequence

1. Read rules and inspect current git status. Record the actual starting commit and preserve unrelated files.
2. Save this handover in `docs/seo/` and link it from the research README. Add the dated source/result notes and update the existing CSV as above.
3. Add the nine HTML sources, typed slugs and registry entries. Check collisions against current, draft, scheduled and retired routes before assigning them.
4. Add evidence records and the two original schematic assets. Use exact model/market captions and current shared article rendering.
5. Make E01–E21 changes in their existing bodies. Preserve useful earlier research, remove contradictions and retain original primary intents.
6. Wire the eight discovery pages through existing category/search infrastructure. Keep current finders working; no separate finder redesign is required.
7. Regenerate the content, build and SEO outputs with existing commands. Update the bounded release-owner manifest/smoke expectations to include this batch without deleting the previous regression coverage.
8. Read each changed article's opening, main table, FAQ, evidence and conclusion together. Resolve conflicting claims across those sections.
9. Run the acceptance checks below. Provide one complete unstaged implementation handoff with added and updated canonical URLs separately. Leave deployment to the user's existing manual flow.

## 10. Acceptance checks

### Content and ownership

- Nine unique new canonical routes, or a concrete source/overlap explanation for any narrowly blocked item. Do not substitute unrelated filler pages to meet a count.
- All selected facts trace to S01–S32 within their model/market scope. No claimed firsthand testing, invented hands-on measurements, product scores, stock/price winner or guaranteed results.
- No new Kitsch comparison, mode-only duplicate, reverse-order duplicate, US/UK near-duplicate or reinstated retired brush page.
- N01 qualifies Ethos wording; N04 publishes no unresolved tap mapping; N05 does not attribute BaByliss-based test figures to SteamPod 3; N08 follows current damp/dry wording; N09 distinguishes warm AIR and cooling air.
- Every new guide is reachable from an appropriate category and a useful existing article; no unrelated adjacency-generated recommendations.
- Source panels and related links follow existing shared conventions. Public dates remain hidden; actual article dates/lastmod stay accurate internally.

### Technical

Use current scripts, including `npm run content:check`, `npm run verify`, `npm run seo:audit`, and the repository's release smoke checks. Avoid running multiple equivalent full builds unnecessarily. If the smoke script supports artifact-only verification, use that before deployment; live new URLs are expected to remain 404 until release.

Verify one H1, correct title/description, one self-canonical, indexable publication state, valid Article/Breadcrumb data where already supported, correct metadata dates and exactly one sitemap entry per published route. Preserve source/generated/live distinctions in reports.

Check internal links and fragments, retained retirement regressions and local/live sitemap parity at the appropriate release stage. The intended increase is 259 to 268 if the baseline remains unchanged. No blanket lastmod refresh and no changefreq/priority project.

### Browser and accessibility

At desktop and 375 px, check all nine new guides and the changed tables/diagrams. Tables must fit their own scroll containers, expose useful labels and support keyboard scrolling when overflowing. The whole page must not acquire unintended horizontal scrolling. SVG text/captions must remain readable. Check search aliases, new category cards, keyboard focus and the actual contextual links. Use Safari/Firefox when possible; any Chrome check should use a separate window/session.

Do not report browser checks, national rankings, Search Console indexing or production rollout as passed unless actually observed.

### Delivery report

Provide: changed files; added canonical URLs; updated canonical URLs; substantive additions versus link-only changes; CSV ownership decisions; validations actually run; remaining exact factual unknowns; and the release status. Keep all changes unstaged and list pre-existing unrelated modifications separately.

## 11. Measurement after release

Record the actual release date and freeze the source/version baseline. For new guides, observe discovery, indexing and selected canonicals before interpreting low query counts. Compare the first 28 complete post-release days against a suitable existing-owner baseline where one exists; extend the window for low-volume pages.

Review query + page + country together when available. Repeated switching between a new comparison and its old method owner is a reason to inspect their answers, not automatic proof of cannibalisation. Judge whether the two pages satisfy different tasks. Do not treat a temporary impression decline or one shared query as sufficient reason to delete a useful page.

This work does not finish SEO permanently or promise rankings. It closes a specific group of source/ownership gaps while leaving the remaining research hypotheses visible for the next evidence review.
