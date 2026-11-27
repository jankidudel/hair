import type { GuideSource } from './guide-evidence';
import { toolLedSources as S } from './tool-led-sources';

/**
 * Used Multi-Styler Checklist reference packages. A reference lists only what
 * the maker states for that exact pack; a partial source exposes its confirmed
 * pieces and nothing more. An add-on or accessory listing is never box
 * evidence. Reader observations are never part of a reference.
 */
export type ChecklistMarket = 'UK' | 'US';
export type ChecklistRole =
  'curl' | 'round-brush' | 'smoothing' | 'drying' | 'diffusing';

export const roleLabels: Readonly<Record<ChecklistRole, string>> = {
  curl: 'Curl barrels',
  'round-brush': 'Round-brush styling',
  smoothing: 'Smoothing brush',
  drying: 'Drying',
  diffusing: 'Diffusing',
};

export const checklistRoles = Object.keys(roleLabels) as ChecklistRole[];

export type Observation =
  'shown' | 'seller-says' | 'not-included' | 'cant-tell';

export const observationLabels: Readonly<Record<Observation, string>> = {
  shown: 'Shown in photos',
  'seller-says': 'Seller says included',
  'not-included': 'Not included',
  'cant-tell': 'Can’t tell',
};

export const observations = Object.keys(observationLabels) as Observation[];

export interface ChecklistItem {
  readonly id: string;
  /** Exact official name, with the count position when the pack has two. */
  readonly name: string;
  readonly roles: readonly ChecklistRole[];
  /** The appliance itself: always essential. */
  readonly mainUnit?: boolean;
  /** Identity or count matters, so “seller says” still earns a photo request. */
  readonly identityMatters?: boolean;
}

export interface ReferenceKit {
  readonly id: string;
  readonly market: ChecklistMarket;
  readonly family: string;
  readonly name: string;
  readonly variant: string;
  readonly packageType: string;
  readonly complete: boolean;
  readonly items: readonly ChecklistItem[];
  readonly source: GuideSource;
  readonly note?: string;
  /** Matching Multi-Styler Kit Comparison record, for deep links. */
  readonly kitComparisonId?: string;
}

const main = (name: string): ChecklistItem => ({
  id: 'main-unit',
  name,
  roles: [],
  mainUnit: true,
  identityMatters: true,
});
const item = (
  id: string,
  name: string,
  roles: readonly ChecklistRole[] = [],
  identityMatters = false,
): ChecklistItem => ({ id, name, roles, identityMatters });

const idDiffuserItems: readonly ChecklistItem[] = [
  main('Airwrap i.d. main unit'),
  item('fast-dryer', 'Fast dryer', ['drying']),
  item('wave-curl-diffuser', 'Wave+Curl diffuser', ['diffusing'], true),
  item('firm-smoothing', 'Firm smoothing brush', ['smoothing']),
  item('conical-barrel', 'Conical Airwrap barrel', ['curl'], true),
  item('large-round', 'Large round volumising brush', ['round-brush']),
  item('wide-tooth-comb', 'Wide-tooth comb'),
  item('filter-brush', 'Filter cleaning brush'),
  item('case', 'Presentation case'),
];

export const referenceKits: readonly ReferenceKit[] = [
  {
    id: 'uk-airwrap-id-straight-wavy-patina-topaz',
    market: 'UK',
    family: 'Dyson Airwrap i.d.',
    name: 'Dyson Airwrap i.d. Straight+Wavy',
    variant: 'Ceramic Patina/Topaz',
    packageType: 'Dyson retail kit',
    complete: true,
    items: [
      main('Airwrap i.d. main unit'),
      item('fast-dryer', 'Fast dryer', ['drying']),
      item('barrel-40', '40mm Airwrap barrel', ['curl'], true),
      item('conical-barrel', 'Conical Airwrap barrel', ['curl'], true),
      item('soft-smoothing', 'Soft smoothing brush', ['smoothing']),
      item('large-round', 'Large round volumising brush', ['round-brush']),
      item('dryer-flyaway', 'Dryer+Flyaway smoother', ['drying']),
      item('filter-brush', 'Filter cleaning brush'),
      item('case', 'Presentation case'),
    ],
    source: S.dysonIdStraightWavy,
    kitComparisonId: 'dyson-airwrap-id-uk-patina-topaz',
  },
  {
    id: 'uk-airwrap-id-diffuser-vinca-topaz',
    market: 'UK',
    family: 'Dyson Airwrap i.d.',
    name: 'Dyson Airwrap i.d. with Diffuser',
    variant: 'Vinca Blue/Topaz',
    packageType: 'Dyson retail kit',
    complete: true,
    items: idDiffuserItems,
    source: S.dysonIdDiffuser,
  },
  {
    id: 'uk-airwrap-id-diffuser-vinca-topaz-refurbished',
    market: 'UK',
    family: 'Dyson Airwrap i.d.',
    name: 'Dyson Refurbished Airwrap i.d. with Diffuser',
    variant: 'Vinca Blue/Topaz',
    packageType: 'Dyson refurbished kit',
    complete: true,
    items: idDiffuserItems,
    source: S.dysonIdDiffuserRefurb,
    note: 'A separate official package from the retail kit. It listed the same named pieces on the page checked.',
  },
  {
    id: 'uk-airwrap-complete-long-nickel-copper',
    market: 'UK',
    family: 'Dyson Airwrap',
    name: 'Dyson Airwrap Complete Long',
    variant: 'Nickel/Copper',
    packageType: 'Dyson retail kit',
    complete: true,
    items: [
      main('Airwrap Complete Long main unit'),
      item('long-barrel-40', '40 mm Airwrap long barrel', ['curl'], true),
      item('long-barrel-30', '30 mm Airwrap long barrel', ['curl'], true),
      item('firm-smoothing', 'Firm smoothing brush', ['smoothing']),
      item('soft-smoothing', 'Soft smoothing brush', ['smoothing']),
      item('round-volumising', 'Round volumising brush', ['round-brush']),
      item('dryer-flyaway', 'Dryer+Flyaway smoother', ['drying']),
      item('filter-brush', 'Filter cleaning brush'),
      item('case', 'Presentation case'),
    ],
    source: S.dysonCompleteLong,
  },
  {
    id: 'uk-airwrap-complete-long-nickel-copper-refurbished',
    market: 'UK',
    family: 'Dyson Airwrap',
    name: 'Dyson Refurbished Airwrap Complete Long',
    variant: 'Nickel/Copper',
    packageType: 'Dyson refurbished listing (partial)',
    complete: false,
    items: [main('Airwrap main unit')],
    source: S.dysonCompleteLongRefurb,
    note: 'The refurbished page lists the main unit without an itemised attachment list. It does not inherit the retail box.',
  },
  {
    id: 'us-flexstyle-hd430-stone',
    market: 'US',
    family: 'Shark FlexStyle',
    name: 'Shark FlexStyle HD430',
    variant: 'Stone',
    packageType: 'Shark new retail kit',
    complete: true,
    items: [
      main('Shark FlexStyle Air Drying & Styling System'),
      item('curler-1', '1¼-inch Auto-Wrap Curler (Curler 1)', ['curl'], true),
      item('curler-2', '1¼-inch Auto-Wrap Curler (Curler 2)', ['curl'], true),
      item('oval-brush', 'Oval Brush', ['round-brush']),
      item('paddle-brush', 'Paddle Brush', ['smoothing']),
      item('concentrator', 'Styling Concentrator', ['drying'], true),
    ],
    source: S.sharkHd430,
    note: 'The Curl-Defining Diffuser appears only as an add-on on this page, not in the box.',
    kitComparisonId: 'shark-hd430-us',
  },
  {
    id: 'us-flexstyle-hd430ref-beige',
    market: 'US',
    family: 'Shark FlexStyle',
    name: 'Shark FlexStyle Certified Renewed HD430REF',
    variant: 'Beige',
    packageType: 'Shark Certified Renewed listing (partial)',
    complete: false,
    items: [
      main('Shark FlexStyle Certified Renewed main unit'),
      item('curler-1', '1¼-inch Auto-Wrap Curler (Curler 1)', ['curl'], true),
      item('curler-2', '1¼-inch Auto-Wrap Curler (Curler 2)', ['curl'], true),
    ],
    source: S.sharkHd430ref,
    note: 'Shark’s Product Details confirm two curlers. Other parts appear under Add-ons & Accessories, which doesn’t show they are in the box.',
  },
];

/** Generic reader checks for a listing whose kit can't be identified. */
export const genericItems: readonly ChecklistItem[] = [
  main('Main unit'),
  item('generic-curl', 'Curl barrels or curlers', ['curl'], true),
  item('generic-round', 'Round or volumising brush', ['round-brush']),
  item('generic-smoothing', 'Smoothing or paddle brush', ['smoothing']),
  item('generic-drying', 'Dryer or concentrator attachment', ['drying']),
  item('generic-diffuser', 'Diffuser', ['diffusing'], true),
  item('generic-case', 'Case or storage bag'),
];

export const UNKNOWN_KIT = 'unknown';

export const listingConditions = [
  'Private listing',
  'Maker refurbished listing',
  'Other retailer listing',
  'Not sure',
] as const;

export const referenceById = (id: string): ReferenceKit | undefined =>
  referenceKits.find((kit) => kit.id === id);

export const referencesForMarket = (
  market: ChecklistMarket,
): readonly ReferenceKit[] =>
  referenceKits.filter((kit) => kit.market === market);

export const referenceForKitComparison = (
  kitComparisonId: string,
): ReferenceKit | undefined =>
  referenceKits.find((kit) => kit.kitComparisonId === kitComparisonId);

export type ObservationMap = Readonly<Record<string, Observation>>;

export interface ChecklistResult {
  readonly missing: readonly string[];
  readonly ask: readonly string[];
  readonly other: readonly string[];
  readonly questions: readonly string[];
}

/** Official names are kept exactly as the maker writes them. */
const lowerFirst = (text: string) => text;

/**
 * Groups the reader’s observations by what the buyer needs to act on.
 * An item matters when it is the main unit or serves a role the reader wants.
 */
export function buildChecklist(
  kit: ReferenceKit | undefined,
  needed: readonly ChecklistRole[],
  observed: ObservationMap,
): ChecklistResult {
  const items = kit?.items ?? genericItems;
  const state = (i: ChecklistItem) => observed[i.id] ?? 'cant-tell';
  const wanted = (i: ChecklistItem) =>
    i.mainUnit || i.roles.some((role) => needed.includes(role));
  const missing: string[] = [];
  const ask: string[] = [];
  const other: string[] = [];
  const photo: string[] = [];

  for (const i of items) {
    const s = state(i);
    if (wanted(i)) {
      if (s === 'not-included') missing.push(i.name);
      else if (s === 'cant-tell') {
        ask.push(`Ask to see the ${lowerFirst(i.name)}.`);
        photo.push(lowerFirst(i.name));
      } else if (s === 'seller-says' && i.identityMatters) {
        ask.push(
          `The seller says the ${lowerFirst(i.name)} is included. Ask for a photo that shows it clearly.`,
        );
        photo.push(lowerFirst(i.name));
      }
    } else if (s !== 'shown') {
      other.push(`${i.name}: ${observationLabels[s].toLowerCase()}.`);
    }
  }

  const absentRoles = needed.filter(
    (role) => !items.some((i) => i.roles.includes(role)),
  );
  for (const role of absentRoles)
    ask.push(
      kit && !kit.complete
        ? `The maker only confirms some box contents for this kit, and ${roleLabels[role].toLowerCase()} isn’t among them. Ask what comes with the listing.`
        : kit
          ? `This reference kit doesn’t list ${roleLabels[role].toLowerCase()}. Ask what comes with the listing.`
          : `Ask whether the listing includes an attachment for ${roleLabels[role].toLowerCase()}.`,
    );
  if (kit && !kit.complete)
    ask.push(
      'Maker only confirms some box contents. Ask the seller to list every piece included.',
    );

  const questions: string[] = [];
  const named = [...photo];
  const missingPart = missing.length
    ? ` I can’t see the ${missing.map(lowerFirst).join(', ')} in the listing; ${missing.length === 1 ? 'is it' : 'are they'} included?`
    : '';
  questions.push(
    `Could you show ${named.length ? `the ${joinList(named)} and ` : ''}a clear photo of the model and rating label? You can cover the serial number.${missingPart}`,
  );
  for (const role of absentRoles)
    questions.push(
      `Does the listing include anything for ${roleLabels[role].toLowerCase()}? If so, which piece?`,
    );
  if (kit && !kit.complete)
    questions.push('Could you list every piece that comes with it?');
  questions.push(
    'Can you confirm the unit switches on and the controls respond?',
  );
  return { missing, ask, other, questions };
}

const joinList = (parts: readonly string[]) =>
  parts.length <= 1
    ? (parts[0] ?? '')
    : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;

/** Plain-text bulleted list for “Copy questions”. */
export const questionsText = (result: ChecklistResult): string =>
  result.questions.map((q) => `• ${q}`).join('\n');

/** The demo listing: one curler photographed, one unclear, concentrator missing. */
export const demoObservations: Readonly<{
  kitId: string;
  needed: readonly ChecklistRole[];
  observed: ObservationMap;
}> = {
  kitId: 'us-flexstyle-hd430-stone',
  needed: ['curl', 'drying'],
  observed: {
    'main-unit': 'shown',
    'curler-1': 'shown',
    'curler-2': 'cant-tell',
    concentrator: 'not-included',
  },
};
