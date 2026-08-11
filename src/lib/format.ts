const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_ABBREVIATIONS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatPrice(amount: number) {
  const rounded = Math.round(amount);
  return "$" + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatPricePerNight(amount: number) {
  return formatPrice(amount) + " per night";
}

export function formatShortDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${month}/${day}/${year}`;
}

export function formatLongDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${MONTH_NAMES[Number(month) - 1]} ${Number(day)}, ${year}`;
}

export function formatCompactDate(value: string) {
  const [, month, day] = value.split("-");
  return `${MONTH_ABBREVIATIONS[Number(month) - 1]} ${Number(day)}`;
}

export function formatDateRange(start: string, end: string) {
  return formatCompactDate(start) + " – " + formatCompactDate(end);
}

export function countNights(start: string, end: string) {
  const from = new Date(start + "T00:00:00Z").getTime();
  const to = new Date(end + "T00:00:00Z").getTime();
  const nights = Math.round((to - from) / 86400000);
  return nights > 0 ? nights : 1;
}

export function addDays(value: string, days: number) {
  const base = new Date(value + "T00:00:00Z");
  base.setUTCDate(base.getUTCDate() + days);
  return base.toISOString().slice(0, 10);
}

export function formatRating(rating: number) {
  return rating.toFixed(2);
}
