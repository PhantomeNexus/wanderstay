const PRICE_CURRENCY = "USD";

function toUtcDate(value: string) {
  return new Date(value + "T00:00:00Z");
}

export function formatPrice(locale: string, amount: number) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: PRICE_CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLongDate(locale: string, value: string) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(toUtcDate(value));
}

export function formatShortDate(locale: string, value: string) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "short",
    timeZone: "UTC",
  }).format(toUtcDate(value));
}

export function formatCompactDate(locale: string, value: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(toUtcDate(value));
}

export function formatDateRange(locale: string, start: string, end: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).formatRange(toUtcDate(start), toUtcDate(end));
}

export function formatRating(locale: string, rating: number) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rating);
}

export function countNights(start: string, end: string) {
  const nights = Math.round(
    (toUtcDate(end).getTime() - toUtcDate(start).getTime()) / 86400000,
  );
  return nights > 0 ? nights : 1;
}

export function addDays(value: string, days: number) {
  const base = toUtcDate(value);
  base.setUTCDate(base.getUTCDate() + days);
  return base.toISOString().slice(0, 10);
}
