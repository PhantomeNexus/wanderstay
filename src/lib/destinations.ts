import destinationsData from "@/data/destinations.json";
import tripsData from "@/data/trips.json";
import type { Destination, Trip } from "./types";

export const destinations = destinationsData as Destination[];
export const trips = tripsData as Trip[];

export const TOTAL_STAYS_ON_PLATFORM = 48;

// Filter options carry stable message keys, never translated labels: the label is
// resolved with `t(option.key)` inside the component (namespace `Filters`).
// `region` / `tripType` hold the raw data value matched against destinations.json;
// `null` means "no restriction".
export const REGION_FILTERS = [
  { key: "regionAll", region: null },
  { key: "regionMediterranean", region: "Mediterranean" },
  { key: "regionNorthernEurope", region: "Northern Europe" },
  { key: "regionAlpine", region: "Alpine" },
  { key: "regionAtlanticCoast", region: "Atlantic Coast" },
  { key: "regionNorthAfrica", region: "North Africa" },
] as const;

export const TRIP_TYPE_FILTERS = [
  { key: "tripTypeAny", tripType: null },
  { key: "tripTypeCoastalEscape", tripType: "Coastal escape" },
  { key: "tripTypeMountainRetreat", tripType: "Mountain retreat" },
  { key: "tripTypeCityBreak", tripType: "City break" },
  { key: "tripTypeDesignStay", tripType: "Design stay" },
  { key: "tripTypeWellness", tripType: "Wellness" },
  { key: "tripTypeOffGrid", tripType: "Off-grid" },
] as const;

export const PRICE_FILTERS = [
  { key: "priceAny", min: 0, max: 100000 },
  { key: "priceUnder200", min: 0, max: 199 },
  { key: "price200To350", min: 200, max: 350 },
  { key: "price350AndUp", min: 351, max: 100000 },
] as const;

export const SORT_OPTIONS = [
  { key: "sortRecommended" },
  { key: "sortPriceLowToHigh" },
  { key: "sortPriceHighToLow" },
  { key: "sortTopRated" },
] as const;

export function getDestination(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function getFeaturedDestinations() {
  return destinations.filter((destination) => destination.featured);
}

export function getReviewCount(slug: string) {
  const destination = getDestination(slug);
  return destination ? destination.reviews.length : 0;
}

export function getTripsByStatus(status: string) {
  if (status === "upcoming") {
    return trips.filter((trip) => trip.status === "confirmed" || trip.status === "pending");
  }
  if (status === "past") {
    return trips.filter((trip) => trip.status === "completed");
  }
  return trips.filter((trip) => trip.status === "cancelled");
}
