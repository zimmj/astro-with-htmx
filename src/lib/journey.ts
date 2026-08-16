export const polarsteps = {
  username: 'zimmj',
  profileUrl: 'https://www.polarsteps.com/zimmj',
};

// TODO: replace with your real current location, or wire this up to the
// Polarsteps unofficial API later (see Polarsteps Integration Strategy in
// documentation/website-goal/PLAN.md).
export const currentLocation = {
  city: 'Somewhere',
  country: 'On Earth',
};

// TODO: replace with real numbers once you have them (or derive from the
// Polarsteps API).
export const journeyStats: { label: string; value: string }[] = [
  { label: 'Countries visited', value: '—' },
  { label: 'Longest stay', value: '—' },
  { label: 'On the road since', value: '—' },
];

export interface JourneyHighlight {
  place: string;
  country: string;
  insight: string;
  /** Optional slug of a writing entry inspired by this place. */
  writingSlug?: string;
}

// TODO: replace these placeholders with real highlights — a favorite place
// and what it taught you, per PLAN.md's "Highlights" + "What each place
// taught me" sections.
export const journeyHighlights: JourneyHighlight[] = [
  {
    place: 'Placeholder Place',
    country: 'Placeholder Country',
    insight: 'What this place taught me — replace with your own reflection.',
  },
  {
    place: 'Another Placeholder',
    country: 'Placeholder Country',
    insight: 'What this place taught me — replace with your own reflection.',
  },
];
