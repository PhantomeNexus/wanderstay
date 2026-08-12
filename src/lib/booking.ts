import type { Destination, TripStatus } from "./types";
import { countNights } from "./format";

export const OCCUPANCY_TAX_RATE = 0.045;
export const MINIMUM_STAY_NIGHTS = 3;

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

/*
 * The helpers below return message KEYS in the `BookingStatus` namespace, never
 * translated copy — there is no translation context inside a plain module
 * function, and a value resolved at module scope would freeze the first locale
 * that loaded. Resolve at the call site: `t(getStatusLabel(trip.status))`.
 */

export type StatusMessageKey =
  | "confirmedMessage"
  | "pendingMessage"
  | "completedMessage"
  | "cancelledMessage"
  | "unknownMessage";

export function getStatusMessage(status: TripStatus): StatusMessageKey {
  let key: StatusMessageKey;

  if (status === "confirmed") {
    key = "confirmedMessage";
  } else if (status === "pending") {
    key = "pendingMessage";
  } else if (status === "completed") {
    key = "completedMessage";
  } else if (status === "cancelled") {
    key = "cancelledMessage";
  } else {
    key = "unknownMessage";
  }

  return key;
}

export type StatusDetailKey =
  | "confirmedDetail"
  | "pendingDetail"
  | "completedDetail"
  | "cancelledDetail";

/** The host name is an ICU argument: `t(getStatusDetail(status), {hostName})`. */
export function getStatusDetail(status: TripStatus): StatusDetailKey {
  if (status === "confirmed") {
    return "confirmedDetail";
  }

  if (status === "pending") {
    return "pendingDetail";
  }

  if (status === "completed") {
    return "completedDetail";
  }

  return "cancelledDetail";
}

export type StatusLabelKey =
  | "confirmedLabel"
  | "pendingLabel"
  | "completedLabel"
  | "cancelledLabel";

export function getStatusLabel(status: TripStatus): StatusLabelKey {
  if (status === "confirmed") {
    return "confirmedLabel";
  }
  if (status === "pending") {
    return "pendingLabel";
  }
  if (status === "completed") {
    return "completedLabel";
  }
  return "cancelledLabel";
}

export type PaymentResultKey =
  | "paymentAuthorised"
  | "paymentDeclined"
  | "paymentExpired"
  | "paymentError";

export function getPaymentResultMessage(result: string): PaymentResultKey {
  let key: PaymentResultKey;

  if (result === "authorised") {
    key = "paymentAuthorised";
  } else if (result === "declined") {
    key = "paymentDeclined";
  } else if (result === "expired") {
    key = "paymentExpired";
  } else {
    key = "paymentError";
  }

  return key;
}

export type AvailabilityMessageKey =
  | "availabilityMaxGuests"
  | "availabilityMinimumStay"
  | "availabilityAvailable";

/**
 * Both count-sensitive messages are ICU plurals. Resolve with the matching
 * argument: `t("availabilityMaxGuests", {maxGuests})` /
 * `t("availabilityMinimumStay", {minimumNights: MINIMUM_STAY_NIGHTS})`.
 */
export function getAvailabilityMessage(
  nights: number,
  maxGuests: number,
  guests: number,
): AvailabilityMessageKey {
  if (guests > maxGuests) {
    return "availabilityMaxGuests";
  }

  if (nights < MINIMUM_STAY_NIGHTS) {
    return "availabilityMinimumStay";
  }

  return "availabilityAvailable";
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
