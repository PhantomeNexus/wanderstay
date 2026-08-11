import destinationsData from "@/data/destinations.json";
import tripsData from "@/data/trips.json";
import type { Destination, Trip } from "./types";

export const destinations = destinationsData as Destination[];
export const trips = tripsData as Trip[];

export const TOTAL_STAYS_ON_PLATFORM = 48;

export const REGION_FILTERS = [
  "All regions",
  "Mediterranean",
  "Northern Europe",
  "Alpine",
  "Atlantic Coast",
  "North Africa",
];

export const TRIP_TYPE_FILTERS = [
  "Any trip",
  "Coastal escape",
  "Mountain retreat",
  "City break",
  "Design stay",
  "Wellness",
  "Off-grid",
];

export const PRICE_FILTERS = [
  { label: "Any price", min: 0, max: 100000 },
  { label: "Under $200", min: 0, max: 199 },
  { label: "$200 to $350", min: 200, max: 350 },
  { label: "$350 and up", min: 351, max: 100000 },
];

export const SORT_OPTIONS = [
  "Recommended",
  "Price: low to high",
  "Price: high to low",
  "Top rated",
];

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
