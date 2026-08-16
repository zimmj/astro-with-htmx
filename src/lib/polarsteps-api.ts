/**
 * Server-only client for Polarsteps' unofficial API. `/users/byusername/{username}`
 * turns out to be a public, unauthenticated read for a public profile — the
 * blocker isn't auth, it's a required `Polarsteps-Api-Version` header (with
 * no version, or a stale one, the endpoint 404s). Since this all runs in
 * Astro SSR (never in the browser), there's no CORS concern either way.
 *
 * This is undocumented and can change or break at any time — the version
 * header in particular is bumped without a changelog — so every call site
 * must tolerate `null` and fall back to the manual config in
 * src/lib/journey.ts.
 */

interface RawLocation {
  name?: string | null;
  locality?: string | null;
  detail?: string | null;
  country?: string | null;
}

interface RawStep {
  is_deleted?: boolean;
  start_time?: string; // ISO 8601
  location?: RawLocation | null;
}

interface RawTrip {
  id?: number;
  slug?: string | null;
  name?: string | null;
  start_date?: string; // ISO 8601
  end_date?: string; // ISO 8601
  steps?: RawStep[];
}

interface RawStats {
  country_count?: number;
  km_count?: number | string;
  trip_count?: number;
}

interface RawUser {
  trips?: RawTrip[];
  stats?: RawStats;
  living_location?: RawLocation | null;
}

export interface PolarstepsLocation {
  name: string;
  country: string;
}

export interface PolarstepsStats {
  countryCount: number;
  kmCount: number | null;
  tripCount: number;
}

export interface FeaturedTrip {
  name: string;
  /** Public, embeddable trip page — https://www.polarsteps.com/{username}/{id}-{slug} */
  url: string;
}

export interface PolarstepsLiveData {
  currentLocation: PolarstepsLocation | null;
  stats: PolarstepsStats;
  featuredTrip: FeaturedTrip | null;
}

const CACHE_TTL_MS = 5 * 60 * 1000;
// Bumped by Polarsteps with no changelog — if live data silently stops
// working, check the current value via the Network tab on polarsteps.com
// (any request to api.polarsteps.com) and update it here.
const API_VERSION = '61';

let cache: { username: string; data: PolarstepsLiveData; expires: number } | null = null;

export async function getLivePolarstepsData(username: string): Promise<PolarstepsLiveData | null> {
  if (cache && cache.username === username && cache.expires > Date.now()) {
    return cache.data;
  }

  // Optional: only needed if the profile's visibility ever requires it.
  // The public-profile read above works without it.
  const token = import.meta.env.POLARSTEPS_REMEMBER_TOKEN;

  try {
    const response = await fetch(`https://api.polarsteps.com/users/byusername/${username}`, {
      headers: {
        Accept: 'application/json',
        'Polarsteps-Api-Version': API_VERSION,
        ...(token ? { Cookie: `remember_token=${token}` } : {}),
      },
    });

    if (!response.ok) return null;

    const user: RawUser = await response.json();
    const data = toLiveData(user, username);
    cache = { username, data, expires: Date.now() + CACHE_TTL_MS };
    return data;
  } catch {
    // Unofficial API: network errors or schema drift should never break
    // the page — callers fall back to journey.ts.
    return null;
  }
}

function toLiveData(user: RawUser, username: string): PolarstepsLiveData {
  const trips = user.trips ?? [];
  const now = Date.now();
  const { trip, isActive } = pickFeaturedTrip(trips, now);

  // Only trust a trip's latest step as "current location" while it's
  // actually in progress — a past trip's last step is stale, not current.
  const currentLocation =
    (isActive && trip && latestStepLocation(trip, now)) || toLocation(user.living_location);

  return {
    currentLocation,
    stats: {
      countryCount: user.stats?.country_count ?? 0,
      kmCount: toNumber(user.stats?.km_count),
      tripCount: user.stats?.trip_count ?? trips.length,
    },
    featuredTrip: trip ? toFeaturedTrip(trip, username) : null,
  };
}

/** The currently active trip, or failing that the most recently started one. */
function pickFeaturedTrip(
  trips: RawTrip[],
  now: number
): { trip: RawTrip | null; isActive: boolean } {
  const withStart = trips
    .map((trip) => ({ trip, start: trip.start_date ? Date.parse(trip.start_date) : NaN }))
    .filter((entry) => !Number.isNaN(entry.start));

  if (withStart.length === 0) return { trip: null, isActive: false };

  const active = withStart.find(({ trip, start }) => {
    const end = trip.end_date ? Date.parse(trip.end_date) : NaN;
    return start <= now && (Number.isNaN(end) || end >= now);
  });

  if (active) return { trip: active.trip, isActive: true };

  const mostRecent = withStart.sort((a, b) => b.start - a.start)[0];
  return { trip: mostRecent.trip, isActive: false };
}

function toFeaturedTrip(trip: RawTrip, username: string): FeaturedTrip | null {
  if (!trip.id || !trip.slug) return null;
  return {
    name: trip.name ?? 'Latest trip',
    url: `https://www.polarsteps.com/${username}/${trip.id}-${trip.slug}`,
  };
}

function latestStepLocation(trip: RawTrip, now: number): PolarstepsLocation | null {
  const latest = (trip.steps ?? [])
    .filter((step) => !step.is_deleted && step.location && step.start_time)
    .map((step) => ({ location: step.location, timestamp: Date.parse(step.start_time as string) }))
    .filter((step) => !Number.isNaN(step.timestamp) && step.timestamp <= now)
    .sort((a, b) => b.timestamp - a.timestamp)[0];

  return latest ? toLocation(latest.location) : null;
}

function toLocation(location?: RawLocation | null): PolarstepsLocation | null {
  if (!location) return null;
  const place = location.locality ?? location.name ?? location.detail;
  if (!place || !location.country) return null;
  return { name: place, country: location.country };
}

function toNumber(value: number | string | undefined): number | null {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}
