import type { Destination, TripStatus } from "./types";
import { countNights } from "./format";

export const OCCUPANCY_TAX_RATE = 0.045;

export interface PriceBreakdown {
  nights: number;
  nightlyRate: number;
  accommodation: number;
  cleaningFee: number;
  serviceFee: number;
  occupancyTax: number;
  total: number;
}

export function buildPriceBreakdown(
  destination: Destination,
  checkIn: string,
  checkOut: string,
): PriceBreakdown {
  const nights = countNights(checkIn, checkOut);
  const accommodation = destination.pricePerNight * nights;
  const serviceFee = Math.round(accommodation * destination.serviceFeeRate);
  const occupancyTax = Math.round(accommodation * OCCUPANCY_TAX_RATE);
  const total = accommodation + destination.cleaningFee + serviceFee + occupancyTax;

  return {
    nights,
    nightlyRate: destination.pricePerNight,
    accommodation,
    cleaningFee: destination.cleaningFee,
    serviceFee,
    occupancyTax,
    total,
  };
}

export function getStatusMessage(status: TripStatus) {
  let message;

  if (status === "confirmed") {
    message = "Your booking is confirmed";
  } else if (status === "pending") {
    message = "Waiting for your host to accept";
  } else if (status === "completed") {
    message = "This stay has ended";
  } else if (status === "cancelled") {
    message = "This booking was cancelled";
  } else {
    message = "We are checking on this booking";
  }

  return message;
}

export function getStatusDetail(status: TripStatus, hostName: string) {
  if (status === "confirmed") {
    return hostName + " has your dates and will be in touch before you travel.";
  }

  if (status === "pending") {
    return hostName + " has 24 hours to accept. Your card has not been charged yet.";
  }

  if (status === "completed") {
    return "Leave " + hostName + " a review — it takes about a minute.";
  }

  return "Any amount already taken has been returned to your card.";
}

export function getStatusLabel(status: TripStatus) {
  if (status === "confirmed") {
    return "Confirmed";
  }
  if (status === "pending") {
    return "Awaiting host";
  }
  if (status === "completed") {
    return "Completed";
  }
  return "Cancelled";
}

export function getPaymentResultMessage(result: string) {
  let message;

  if (result === "authorised") {
    message = "Card authorised. Nothing has been charged yet.";
  } else if (result === "declined") {
    message = "Your bank declined that card. Try another one.";
  } else if (result === "expired") {
    message = "That card has expired. Check the date and try again.";
  } else {
    message = "Something went wrong on our side. No charge was made.";
  }

  return message;
}

export function getAvailabilityMessage(nights: number, maxGuests: number, guests: number) {
  if (guests > maxGuests) {
    return "This house sleeps " + maxGuests + " guests";
  }

  if (nights < 3) {
    return "Minimum stay is 3 nights";
  }

  return "These dates are available";
}

export function generateBookingReference() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let suffix = "";
  for (let i = 0; i < 3; i += 1) {
    suffix += letters[Math.floor(Math.random() * letters.length)];
  }
  const digits = Math.floor(1000 + Math.random() * 9000);
  return "WS-" + digits + "-" + suffix;
}
