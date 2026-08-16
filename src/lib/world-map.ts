/**
 * Renders the world as flat SVG country paths (Natural Earth 110m data via
 * `world-atlas`, projected with d3-geo), so a "countries I've visited" map
 * can be drawn as plain server-rendered SVG — no client JS, no map library
 * shipped to the browser.
 *
 * The topology only has ISO 3166-1 numeric IDs, not names, so matching
 * Polarsteps' country-name strings (e.g. "Indonesia") to a path goes
 * through `i18n-iso-countries`: name -> alpha-3 -> numeric ID.
 */
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, Geometry } from 'geojson';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import worldTopology from 'world-atlas/countries-110m.json';
import type { FeaturedTrip } from './polarsteps-api';

countries.registerLocale(en);

export const MAP_VIEWBOX = '0 0 960 500';

export interface CountryPath {
  /** ISO 3166-1 numeric code, zero-padded to 3 digits. */
  id: string;
  d: string;
}

let cachedPaths: CountryPath[] | null = null;

/** All country border paths for the map, computed once per process. */
export function getWorldMapPaths(): CountryPath[] {
  if (cachedPaths) return cachedPaths;

  const topology = worldTopology as unknown as Topology;
  const countriesGeo = feature(
    topology,
    topology.objects.countries as GeometryCollection
  ) as unknown as { features: Feature<Geometry>[] };

  const projection = geoNaturalEarth1().fitSize([960, 500], countriesGeo as GeoJSON.FeatureCollection);
  const path = geoPath(projection);

  cachedPaths = countriesGeo.features
    .map((f) => ({ id: String(f.id), d: path(f) ?? '' }))
    .filter((c) => c.d);

  return cachedPaths;
}

/** Maps a Polarsteps country name (e.g. "Indonesia") to its numeric ISO code, or null if unmatched. */
export function countryNameToNumericId(name: string): string | null {
  const alpha3 = countries.getAlpha3Code(name, 'en');
  if (!alpha3) return null;
  return countries.alpha3ToNumeric(alpha3) ?? null;
}

/** Re-keys a Polarsteps country-name -> trip map by numeric ISO code, for matching against map paths. */
export function toIdKeyedTrips(countryTrips: Record<string, FeaturedTrip>): Map<string, FeaturedTrip> {
  const byId = new Map<string, FeaturedTrip>();
  for (const [name, trip] of Object.entries(countryTrips)) {
    const id = countryNameToNumericId(name);
    if (id) byId.set(id, trip);
  }
  return byId;
}

/** The country's official English name, for accessible labels — best-effort, may be null. */
export function numericIdToName(id: string): string | null {
  const alpha2 = countries.numericToAlpha2(id);
  if (!alpha2) return null;
  return countries.getName(alpha2, 'en') ?? null;
}
