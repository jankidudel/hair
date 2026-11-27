/**
 * Multi-Styler Kit Comparison records (Product Explorer #compare-multi-styler-kits).
 * A role is Included only when the exact listing’s box list names a head for
 * it: by head name (paddle → smoothing, oval or round volumising →
 * volumising) or by the maker’s own description of that head’s job.
 * Model-to-model fit is never derived from a box list.
 */
export type KitMarket = 'UK' | 'US';
export type KitRole =
  | 'drying'
  | 'concentrator'
  | 'smoothing-brush'
  | 'volumising-brush'
  | 'airflow-curling'
  | 'diffuser'
  | 'ceramic-straightening';
export type KitRoleStatus = 'included' | 'not-listed' | 'unconfirmed';

export interface KitRoleCell {
  readonly status: KitRoleStatus;
  /** Exact head name from the listing, or why the role is unconfirmed. */
  readonly detail?: string;
}

export interface KitOptionalAccessory {
  readonly role: KitRole;
  readonly name: string;
  readonly scope: string;
  readonly url: string;
}

export interface MultiStylerKit {
  readonly id: string;
  readonly market: KitMarket;
  readonly name: string;
  readonly sourceLabel: string;
  readonly sourceUrl: string;
  readonly checkedDate: string;
  readonly roles: Readonly<Record<KitRole, KitRoleCell>>;
  readonly optional?: readonly KitOptionalAccessory[];
  readonly note?: string;
  /** Matching Used Multi-Styler Checklist reference (same exact pack). */
  readonly usedChecklistId?: string;
}

export const kitRoleLabels: Readonly<Record<KitRole, string>> = {
  drying: 'Drying',
  concentrator: 'Concentrator',
  'smoothing-brush': 'Smoothing brush',
  'volumising-brush': 'Volumising brush',
  'airflow-curling': 'Airflow curling',
  diffuser: 'Diffuser',
  'ceramic-straightening': 'Ceramic straightening',
};

export const kitRoles = Object.keys(kitRoleLabels) as readonly KitRole[];

export const kitStatusLabels: Readonly<Record<KitRoleStatus, string>> = {
  included: 'Included',
  'not-listed': 'Not listed in this box',
  unconfirmed: 'Unconfirmed',
};

const inc = (detail: string): KitRoleCell => ({ status: 'included', detail });
const notListed: KitRoleCell = { status: 'not-listed' };
const unconfirmed = (detail: string): KitRoleCell => ({
  status: 'unconfirmed',
  detail,
});
const allUnconfirmed = (detail: string) =>
  Object.fromEntries(
    kitRoles.map((role) => [role, unconfirmed(detail)]),
  ) as Record<KitRole, KitRoleCell>;

export const multiStylerKits: readonly MultiStylerKit[] = [
  {
    id: 'dyson-airwrap-id-uk-patina-topaz',
    market: 'UK',
    name: 'Dyson Airwrap i.d. Straight+Wavy, Ceramic Patina/Topaz',
    sourceLabel: 'Dyson UK listing',
    sourceUrl:
      'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-id/straight-wavy-ceramic-patina-topaz',
    checkedDate: '26 November 2026',
    roles: allUnconfirmed(
      'We could not confirm this box list on our latest check.',
    ),
    note: 'Dyson’s UK manual lists every Airwrap i.d. attachment and says some may not be included, so it cannot stand in for this box list.',
    usedChecklistId: 'uk-airwrap-id-straight-wavy-patina-topaz',
  },
  {
    id: 'shark-hd446uk',
    market: 'UK',
    name: 'Shark FlexStyle HD446UK, Black',
    sourceLabel: 'SharkNinja UK HD446UK listing',
    sourceUrl:
      'https://www.sharkninja.co.uk/shark-flexstyle-5-in-1-air-styler-hair-dryer-with-storage-case-black-hd446uk/HD446UK.html',
    checkedDate: '26 November 2026',
    roles: {
      drying: inc('Main unit, rotated to dryer mode'),
      concentrator: inc('Styling Concentrator'),
      'smoothing-brush': inc('Paddle Brush'),
      'volumising-brush': inc('Oval Brush'),
      'airflow-curling': inc('Two curlers (left and right)'),
      diffuser: inc('Curl-defining Diffuser'),
      'ceramic-straightening': notListed,
    },
  },
  {
    id: 'shark-hd652suk',
    market: 'UK',
    name: 'Shark FlexFusion Straight HD652SUK',
    sourceLabel: 'SharkNinja UK HD652SUK straightener part',
    sourceUrl:
      'https://www.sharkninja.co.uk/shark-straightener-attachment-hd652suk/XSKHD6SAHRUK.html',
    checkedDate: '26 November 2026',
    roles: allUnconfirmed(
      'No main HD652SUK box list was available from Shark UK on our latest check.',
    ),
    note: 'Shark UK sells parts labelled for HD652SUK, including a Straightener Attachment, but a part listing shows what is sold, not what is in the box.',
  },
  {
    id: 'shark-hd6051suk',
    market: 'UK',
    name: 'Shark Glam HD6051SUK',
    sourceLabel: 'SharkNinja UK HD6051SUK listing',
    sourceUrl:
      'https://www.sharkninja.co.uk/shark-glam-ceramic-air-styling-and-drying-system-with-frizzfighter-hd6051suk/HD6051SUK.html',
    checkedDate: '26 November 2026',
    roles: {
      drying: inc('Main unit (air styling and drying system)'),
      concentrator: inc('Styling Concentrator'),
      'smoothing-brush': inc('Glossi Blow-Dry Tool (Shark: smooth, stretch)'),
      'volumising-brush': inc('Glossi Blow-Dry Tool (Shark: create bounce)'),
      'airflow-curling': inc('Auto-Wrap Curlers'),
      diffuser: notListed,
      'ceramic-straightening': inc(
        'Silki Straightening Tool (heat-controlled ceramic and airflow)',
      ),
    },
  },
  {
    id: 'babyliss-as6550u',
    market: 'UK',
    name: 'BaByliss Air Wand AS6550U',
    sourceLabel: 'BaByliss UK AS6550U listing',
    sourceUrl: 'https://www.babyliss.com/uk-en/air-wand-AS6550U.html',
    checkedDate: '17 November 2026',
    roles: {
      drying: inc('Handset used without a head'),
      concentrator: unconfirmed(
        'No concentrator named in the recorded box list',
      ),
      'smoothing-brush': notListed,
      'volumising-brush': inc('Curved oval brush'),
      'airflow-curling': notListed,
      diffuser: notListed,
      'ceramic-straightening': inc('Ceramic straightening attachment'),
    },
    note: 'BaByliss sells an Air Wand diffuser separately, but its listing does not name AS6550U, so no optional accessory is shown.',
  },
  {
    id: 'dyson-airwrap-id-us-plum-copper',
    market: 'US',
    name: 'Dyson Airwrap i.d. Straight+Wavy, Plum/Copper',
    sourceLabel: 'Dyson US listing',
    sourceUrl:
      'https://www.dyson.com/hair-care/hair-stylers/airwrap-id/straight-wavy-plum-copper',
    checkedDate: '8 October 2026',
    roles: {
      drying: inc('Fast Dryer'),
      concentrator: notListed,
      'smoothing-brush': unconfirmed(
        'Anti Snag Loop Brush listed; its job is not described in our record',
      ),
      'volumising-brush': inc('Large Round Volumizing Brush'),
      'airflow-curling': inc('Conical and 1.6-inch Airwrap barrels'),
      diffuser: notListed,
      'ceramic-straightening': notListed,
    },
  },
  {
    id: 'shark-hd430-us',
    market: 'US',
    name: 'Shark FlexStyle HD430, Stone',
    sourceLabel: 'SharkNinja US HD430 listing',
    sourceUrl:
      'https://www.sharkninja.com/shark-flexstyle-air-styling-drying-system/HD430.html',
    checkedDate: '26 November 2026',
    roles: {
      drying: inc('Main unit, rotated to dryer mode'),
      concentrator: inc('Styling Concentrator'),
      'smoothing-brush': inc('Paddle Brush'),
      'volumising-brush': inc('Oval Brush'),
      'airflow-curling': inc('Two 1.25-inch Auto-Wrap Curlers'),
      diffuser: notListed,
      'ceramic-straightening': notListed,
    },
    note: 'Shark’s US XSKHD4DA diffuser listing names HD430REF but not standard HD430, so no optional diffuser is shown for this body.',
    usedChecklistId: 'us-flexstyle-hd430-stone',
  },
  {
    id: 't3-aire-360-dv-us',
    market: 'US',
    name: 'T3 Aire 360 Ceramic Dual Voltage Air Styler (602192-UL-10)',
    sourceLabel: 'T3 US Aire 360 Dual Voltage listing',
    sourceUrl:
      'https://t3micro.com/collections/pos-hair-dryers/products/aire360-dual-voltage',
    checkedDate: '26 November 2026',
    roles: {
      drying: inc('SoftAire Drying Concentrator on the Aire 360 base'),
      concentrator: inc('SoftAire Drying Concentrator'),
      'smoothing-brush': inc('Oval Brush Attachment (T3: lift or smooth)'),
      'volumising-brush': inc('Oval Brush Attachment'),
      'airflow-curling': inc('Two curling attachments (left and right)'),
      diffuser: notListed,
      'ceramic-straightening': notListed,
    },
    optional: [
      {
        role: 'diffuser',
        name: 'Diffuser for Aire 360 Ceramic Dual Voltage Air Styler',
        scope:
          'T3 US says it is compatible only with the second-generation dual-voltage Aire 360.',
        url: 'https://t3micro.com/collections/pos-hair-dryers/products/aire360-dual-voltage-diffuser',
      },
    ],
  },
];

export const kitById = (id: string): MultiStylerKit | undefined =>
  multiStylerKits.find((kit) => kit.id === id);

export const kitsForMarket = (market: KitMarket): readonly MultiStylerKit[] =>
  multiStylerKits.filter((kit) => kit.market === market);

export type KitSummary =
  'all-included' | 'missing' | 'unconfirmed' | 'missing-and-unconfirmed';

export const kitSummaryLabels: Readonly<Record<KitSummary, string>> = {
  'all-included': 'All selected roles are included',
  missing: 'At least one selected role is not listed in this box',
  unconfirmed: 'At least one selected role still needs confirmation',
  'missing-and-unconfirmed':
    'At least one selected role is not listed in this box. At least one selected role still needs confirmation',
};

/** Optional accessories never change a role’s status. */
export function summariseKit(
  kit: MultiStylerKit,
  required: readonly KitRole[],
): KitSummary | undefined {
  if (required.length === 0) return undefined;
  const statuses = required.map((role) => kit.roles[role].status);
  const missing = statuses.includes('not-listed');
  const pending = statuses.includes('unconfirmed');
  if (missing && pending) return 'missing-and-unconfirmed';
  if (missing) return 'missing';
  if (pending) return 'unconfirmed';
  return 'all-included';
}

/** Keep only selections valid for the market, and never two of the same kit. */
export function reconcileKitSelection(
  market: KitMarket,
  selection: readonly (string | undefined)[],
): [string | undefined, string | undefined] {
  const valid = selection.map((id) =>
    id && kitById(id)?.market === market ? id : undefined,
  );
  const [first, second] = valid;
  return [first, second && second !== first ? second : undefined];
}
