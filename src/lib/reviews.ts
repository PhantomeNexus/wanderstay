import { destinations } from "./destinations";
import type { Motif, PaletteName, Review } from "./types";

export interface WallReview extends Review {
  id: string;
  destinationSlug: string;
  destinationName: string;
  destinationLocation: string;
  region: string;
  motif: Motif;
  palette: PaletteName;
}

export const RATING_FILTERS = [
  { key: "ratingAny", minimum: 0 },
  { key: "ratingFiveOnly", minimum: 5 },
  { key: "ratingFourPlus", minimum: 4 },
] as const;

export function getAllReviews(): WallReview[] {
  const collected = destinations.flatMap((destination) =>
    destination.reviews.map((review) => ({
      ...review,
      id: destination.slug + "-" + review.author + "-" + review.date,
      destinationSlug: destination.slug,
      destinationName: destination.name,
      destinationLocation: destination.location,
      region: destination.region,
      motif: destination.motif,
      palette: destination.palette,
    })),
  );

  return collected.sort((a, b) => b.date.localeCompare(a.date));
}

export function getReviewStats() {
  const reviews = getAllReviews();
  const total = reviews.length;
  const sum = reviews.reduce((running, review) => running + review.rating, 0);

  return {
    total,
    averageRating: total > 0 ? sum / total : 0,
    houseCount: destinations.length,
    fiveStarCount: reviews.filter((review) => review.rating === 5).length,
  };
}
