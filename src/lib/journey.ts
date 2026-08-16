import type { PolarstepsLiveData } from './polarsteps-api';

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

/** Stats to show for a page — live Polarsteps numbers when available, the manual config otherwise. */
export function toDisplayStats(live: PolarstepsLiveData | null): { label: string; value: string }[] {
  if (!live) return journeyStats;
  return [
    { label: 'Countries visited', value: String(live.stats.countryCount) },
    { label: 'Trips taken', value: String(live.stats.tripCount) },
    {
      label: 'Distance traveled',
      value: live.stats.kmCount ? `${Math.round(live.stats.kmCount).toLocaleString()} km` : '—',
    },
  ];
}

/** Location to show for a page — live Polarsteps location when available, the manual config otherwise. */
export function toDisplayLocation(live: PolarstepsLiveData | null): { city: string; country: string } {
  return live?.currentLocation
    ? { city: live.currentLocation.name, country: live.currentLocation.country }
    : currentLocation;
}

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
