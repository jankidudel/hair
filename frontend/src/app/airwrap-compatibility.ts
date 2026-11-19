/**
 * Dyson Airwrap attachment compatibility at the family level documented by
 * Dyson UK (sources P01–P03 in seo-growth-guides.ts). This is not a SKU
 * catalogue: every "family" answer still requires the exact part listing.
 */
export type AirwrapBodyFamily = 'earlier' | 'id' | 'co-anda2x' | 'unknown';
export type AirwrapAttachmentFamily =
  'earlier' | 'id' | 'co-anda2x' | 'third-party' | 'unknown';

export type AirwrapFitStatus =
  'family-compatible' | 'excluded' | 'not-established' | 'identify-first';

export interface AirwrapFitAnswer {
  readonly status: AirwrapFitStatus;
  readonly statusLabel: string;
  readonly answer: string;
  readonly nextCheck: string;
}

export const airwrapBodyLabels: Readonly<Record<AirwrapBodyFamily, string>> = {
  earlier: 'Earlier Airwrap (before i.d.)',
  id: 'Airwrap i.d.',
  'co-anda2x': 'Airwrap Co-anda2x',
  unknown: "I don't know",
};

export const airwrapAttachmentLabels: Readonly<
  Record<AirwrapAttachmentFamily, string>
> = {
  earlier: 'Earlier Airwrap attachment',
  id: 'Airwrap i.d. attachment',
  'co-anda2x': 'Co-anda2x (2x) attachment',
  'third-party': 'Third-party adapter or lookalike part',
  unknown: "I don't know",
};

const statusLabels: Readonly<Record<AirwrapFitStatus, string>> = {
  'family-compatible': 'Compatible family',
  excluded: 'Not compatible',
  'not-established': 'Not established',
  'identify-first': 'Identify it first',
};

const answer = (
  status: AirwrapFitStatus,
  text: string,
  nextCheck: string,
): AirwrapFitAnswer => ({
  status,
  statusLabel: statusLabels[status],
  answer: text,
  nextCheck,
});

const exactPartCheck =
  'Confirm the exact part listing names your body before ordering.';

export function airwrapFit(
  body: AirwrapBodyFamily,
  attachment: AirwrapAttachmentFamily,
): AirwrapFitAnswer {
  if (body === 'unknown' || attachment === 'unknown')
    return answer(
      'identify-first',
      'Identify the generation before buying. A Dyson name or a similar styling job does not establish fit.',
      'Check the product name on the original box, receipt, order confirmation or registration, or the model details on the appliance. If it is still unclear, ask Dyson support.',
    );
  if (attachment === 'third-party')
    return answer(
      'not-established',
      'No Dyson approval for a third-party adapter or lookalike part was found in this research. CombReport does not recommend a workaround.',
      'Use a part Dyson lists for your exact body, or ask Dyson support.',
    );
  if (body === 'co-anda2x')
    return attachment === 'co-anda2x'
      ? answer(
          'family-compatible',
          'Correct generation family. Co-anda2x parts belong to the Co-anda2x attachment system.',
          'Confirm the exact part and what your box includes. Not every 2x attachment ships in every Co-anda2x box.',
        )
      : answer(
          'excluded',
          'Not compatible. Dyson says earlier Airwrap and Airwrap i.d. attachments do not fit Co-anda2x.',
          'Budget for Co-anda2x parts, or keep using the older parts with an earlier or i.d. body.',
        );
  if (attachment === 'co-anda2x')
    return answer(
      'excluded',
      'Not compatible. Dyson says Co-anda2x attachments do not fit earlier Airwrap or Airwrap i.d. bodies.',
      'Choose an earlier or i.d. part for this body, or compare a whole Co-anda2x kit.',
    );
  if (body === attachment)
    return answer(
      'family-compatible',
      'Same generation family.',
      exactPartCheck,
    );
  return answer(
    'family-compatible',
    "Cross-compatible at Dyson's family level: earlier Airwrap and Airwrap i.d. attachments are described as interchangeable.",
    `${exactPartCheck} A part that fits physically may not add connected i.d. features to an earlier body.`,
  );
}

/** Rows shown in the static matrix; the lookup must return the same answers. */
export const airwrapMatrixRows: readonly {
  readonly body: Exclude<AirwrapBodyFamily, 'unknown'>;
  readonly attachment: Exclude<AirwrapAttachmentFamily, 'unknown'>;
}[] = [
  { body: 'earlier', attachment: 'id' },
  { body: 'id', attachment: 'earlier' },
  { body: 'co-anda2x', attachment: 'earlier' },
  { body: 'co-anda2x', attachment: 'id' },
  { body: 'earlier', attachment: 'co-anda2x' },
  { body: 'id', attachment: 'co-anda2x' },
  { body: 'co-anda2x', attachment: 'co-anda2x' },
  { body: 'id', attachment: 'third-party' },
];
