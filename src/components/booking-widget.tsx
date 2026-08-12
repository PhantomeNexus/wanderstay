"use client";

import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { CheckIcon, ShieldIcon, StarIcon } from "./icons";
import { buildPriceBreakdown, getAvailabilityMessage } from "@/lib/booking";
import { formatPrice, formatRating } from "@/lib/format";
import type { Destination } from "@/lib/types";

const WIDGET_COPY = {
  perNight: "per night",
  checkIn: "Check-in",
  checkOut: "Check-out",
  guests: "Guests",
  addGuest: "Add a guest",
  removeGuest: "Remove a guest",
  submit: "Reserve now",
  noCharge: "You will not be charged yet",
  cleaning: "Cleaning fee",
  service: "Wanderstay service fee",
  tax: "Occupancy tax",
  total: "Total before taxes",
  totalDue: "Total",
  protection: "Free cancellation until 14 days before check-in",
  report: "Report this listing",
};

interface BookingWidgetProps {
  destination: Destination;
}

export function BookingWidget({ destination }: BookingWidgetProps) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("2026-09-12");
  const [checkOut, setCheckOut] = useState("2026-09-19");
  const [guests, setGuests] = useState(2);

  const breakdown = buildPriceBreakdown(destination, checkIn, checkOut);
  const availability = getAvailabilityMessage(breakdown.nights, destination.maxGuests, guests);
  const bookable = availability === "These dates are available";

  function handleReserve() {
    const query =
      "?stay=" +
      destination.slug +
      "&from=" +
      checkIn +
      "&to=" +
      checkOut +
      "&guests=" +
      guests;
    router.push("/checkout" + query);
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-raised">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[15px] text-muted">
          <strong className="text-[24px] font-bold text-ink">
            {formatPrice(destination.pricePerNight)}
          </strong>{" "}
          {WIDGET_COPY.perNight}
        </p>
        <span className="flex items-center gap-1 text-[13.5px] font-semibold text-ink">
          <StarIcon className="h-3.5 w-3.5 text-accent" />
          {formatRating(destination.rating)}
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-line-strong">
        <div className="grid grid-cols-2">
          <label className="border-r border-line-strong px-4 py-3">
            <span className="block text-[11.5px] font-semibold tracking-wide text-muted uppercase">
              {WIDGET_COPY.checkIn}
            </span>
            <input
              type="date"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
              aria-label="Check-in date"
              className="mt-1 w-full bg-transparent text-[14px] font-medium text-ink outline-none"
            />
          </label>
          <label className="px-4 py-3">
            <span className="block text-[11.5px] font-semibold tracking-wide text-muted uppercase">
              {WIDGET_COPY.checkOut}
            </span>
            <input
              type="date"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              aria-label="Check-out date"
              className="mt-1 w-full bg-transparent text-[14px] font-medium text-ink outline-none"
            />
          </label>
        </div>

        <div className="flex items-center justify-between border-t border-line-strong px-4 py-3">
          <span>
            <span className="block text-[11.5px] font-semibold tracking-wide text-muted uppercase">
              {WIDGET_COPY.guests}
            </span>
            <span className="mt-1 block text-[14px] font-medium text-ink">
              {guests + " guests"}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <button
              type="button"
              aria-label={WIDGET_COPY.removeGuest}
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="grid h-8 w-8 place-items-center rounded-full border border-line-strong text-[17px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              −
            </button>
            <button
              type="button"
              aria-label={WIDGET_COPY.addGuest}
              onClick={() => setGuests(guests + 1)}
              className="grid h-8 w-8 place-items-center rounded-full border border-line-strong text-[17px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              +
            </button>
          </span>
        </div>
      </div>

      <p
        className={
          "mt-3 flex items-center gap-1.5 text-[13px] font-medium " +
          (bookable ? "text-positive" : "text-accent")
        }
      >
        {bookable ? <CheckIcon className="h-3.5 w-3.5" /> : null}
        {availability}
      </p>

      <button
        type="button"
        onClick={handleReserve}
        disabled={!bookable}
        className="mt-5 w-full rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-line-strong disabled:text-muted"
      >
        {WIDGET_COPY.submit}
      </button>

      <p className="mt-3 text-center text-[13px] text-muted">{WIDGET_COPY.noCharge}</p>

      <dl className="mt-6 space-y-3 border-t border-line pt-6 text-[14px]">
        <div className="flex items-center justify-between">
          <dt className="text-ink-soft underline decoration-line-strong underline-offset-4">
            {formatPrice(destination.pricePerNight) + " × " + breakdown.nights + " nights"}
          </dt>
          <dd className="font-medium text-ink">{formatPrice(breakdown.accommodation)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-soft">{WIDGET_COPY.cleaning}</dt>
          <dd className="font-medium text-ink">{formatPrice(breakdown.cleaningFee)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-soft">{WIDGET_COPY.service}</dt>
          <dd className="font-medium text-ink">{formatPrice(breakdown.serviceFee)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-soft">{WIDGET_COPY.tax}</dt>
          <dd className="font-medium text-ink">{formatPrice(breakdown.occupancyTax)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-line pt-4 text-[16px]">
          <dt className="font-semibold text-ink">{WIDGET_COPY.totalDue}</dt>
          <dd className="font-bold text-ink">{formatPrice(breakdown.total)}</dd>
        </div>
      </dl>

      <p className="mt-5 flex items-start gap-2 rounded-xl bg-positive-soft px-3.5 py-3 text-[13px] leading-relaxed text-positive">
        <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0" />
        {WIDGET_COPY.protection}
      </p>
    </div>
  );
}
