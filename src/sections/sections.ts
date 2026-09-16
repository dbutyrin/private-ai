/** Ordered list of slides. Drives the nav rail and the scroll observer. */
export const SECTION_LABELS = [
  'Hero',
  'Qualifier',
  'Consequences',
  'Mechanism',
  'Economics',
  'Delivery',
  'Estimate',
] as const

export type SectionLabel = (typeof SECTION_LABELS)[number]

/** Index of the estimate form — the hero button and nav both jump to it. */
export const ESTIMATE_INDEX = SECTION_LABELS.length - 1
