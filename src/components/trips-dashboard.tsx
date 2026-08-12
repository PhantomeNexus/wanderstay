"use client";

import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { Scenery } from "./scenery";
import { CheckIcon, CloseIcon } from "./icons";
import { getDestination, getTripsByStatus } from "@/lib/destinations";
import { getStatusDetail, getStatusLabel, getStatusMessage } from "@/lib/booking";
import { formatDateRange, formatLongDate, formatPrice } from "@/lib/format";
import { EMPTY_STATES, TOAST_MESSAGES, TRIP_ACTIONS, TRIP_TABS } from "@/lib/notifications";
import { currentUser } from "@/lib/user";
import type { Trip } from "@/lib/types";

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-positive-soft text-positive",
  pending: "bg-accent-soft text-accent",
  completed: "bg-raised text-muted",
  cancelled: "bg-raised text-muted",
};

export function TripsDashboard() {
  const [tab, setTab] = useState("upcoming");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = setTimeout(() => setToast(""), 3600);
    return () => clearTimeout(timer);
  }, [toast]);

  const visible = getTripsByStatus(tab);
  const emptyState = EMPTY_STATES[tab as keyof typeof EMPTY_STATES];

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter your trips by status"
        className="flex gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1.5 no-scrollbar"
      >
        {TRIP_TABS.map((item) => {
          const count = getTripsByStatus(item.id).length;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(item.id)}
              className={
                "shrink-0 rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors " +
                (active ? "bg-ink text-canvas" : "text-ink-soft hover:bg-raised")
              }
            >
              {item.label + " (" + count + ")"}
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 space-y-5">
          {visible.map((trip) => (
            <TripCard key={trip.id} trip={trip} onToast={setToast} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
          <h3 className="text-[18px] font-semibold text-ink">{emptyState.heading}</h3>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-muted">
            {emptyState.body}
          </p>
          <Link
            href="/destinations"
            className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            {emptyState.cta}
          </Link>
        </div>
      )}

      {toast ? (
        <div
          role="status"
          className="fade-up fixed inset-x-4 bottom-6 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-ink px-5 py-4 shadow-float"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-white">
            <CheckIcon className="h-4 w-4" />
          </span>
          <p className="flex-1 text-[14px] font-medium text-canvas">{toast}</p>
          <button
            type="button"
            onClick={() => setToast("")}
            aria-label="Dismiss this notification"
            className="text-canvas/60 transition-colors hover:text-canvas"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </>
  );
}

function TripCard({ trip, onToast }: { trip: Trip; onToast: (message: string) => void }) {
  const destination = getDestination(trip.slug);

  if (!destination) {
    return null;
  }

  const statusLabel = getStatusLabel(trip.status);
  const statusMessage = getStatusMessage(trip.status);
  const statusDetail = getStatusDetail(trip.status, destination.host.name);
  const isPast = trip.status === "completed";

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="aspect-[16/10] md:aspect-auto">
          <Scenery
            motif={destination.motif}
            palette={destination.palette}
            tone={isPast ? "mist" : "golden"}
            seed={trip.guests + 3}
            className="h-full w-full"
          />
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <span
                className={
                  "inline-block rounded-full px-3 py-1 text-[12px] font-semibold " +
                  STATUS_STYLES[trip.status]
                }
              >
                {statusLabel}
              </span>
              <h3 className="mt-3 text-[19px] font-bold tracking-tight text-ink">
                {destination.name}
              </h3>
              <p className="mt-0.5 text-[13.5px] text-muted">{destination.location}</p>
            </div>
            <p className="text-[13px] text-faint">{trip.id}</p>
          </div>

          <p className="mt-4 text-[14.5px] font-medium text-ink">{statusMessage}</p>
          <p className="mt-1 text-[14px] leading-relaxed text-muted">{statusDetail}</p>

          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5 text-[14px]">
            <div>
              <dt className="text-[12px] font-semibold tracking-wide text-muted uppercase">
                Dates
              </dt>
              <dd className="mt-1 font-medium text-ink">
                {formatDateRange(trip.checkIn, trip.checkOut)}
              </dd>
            </div>
            <div>
              <dt className="text-[12px] font-semibold tracking-wide text-muted uppercase">
                Guests
              </dt>
              <dd className="mt-1 font-medium text-ink">{trip.guests + " guests"}</dd>
            </div>
            <div>
              <dt className="text-[12px] font-semibold tracking-wide text-muted uppercase">
                Total
              </dt>
              <dd className="mt-1 font-medium text-ink">{formatPrice(trip.total)}</dd>
            </div>
            <div>
              <dt className="text-[12px] font-semibold tracking-wide text-muted uppercase">
                Booked
              </dt>
              <dd className="mt-1 font-medium text-ink">{formatLongDate(trip.bookedOn)}</dd>
            </div>
          </dl>

          <p className="mt-4 rounded-xl bg-raised px-4 py-3 text-[13.5px] leading-relaxed text-ink-soft">
            {trip.note}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href={"/destinations/" + destination.slug}
              className="rounded-full border border-line-strong px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {TRIP_ACTIONS.viewHouse}
            </Link>

            {isPast ? (
              <>
                <button
                  type="button"
                  onClick={() => onToast(TOAST_MESSAGES.reviewReminder)}
                  className="rounded-full border border-line-strong px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {TRIP_ACTIONS.leaveReview}
                </button>
                <button
                  type="button"
                  onClick={() => onToast(TOAST_MESSAGES.receiptSent)}
                  className="rounded-full border border-line-strong px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {TRIP_ACTIONS.downloadReceipt}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onToast(TOAST_MESSAGES.changeRequested)}
                  className="rounded-full border border-line-strong px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {TRIP_ACTIONS.requestChange}
                </button>
                <button
                  type="button"
                  onClick={() => onToast(TOAST_MESSAGES.hostMessaged)}
                  className="rounded-full border border-line-strong px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {TRIP_ACTIONS.messageHost}
                </button>
                <button
                  type="button"
                  onClick={() => onToast(TOAST_MESSAGES.detailsCopied)}
                  className="rounded-full border border-line-strong px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {TRIP_ACTIONS.copyReference}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function TripsGreeting() {
  return (
    <p className="mt-3 text-[16px] leading-relaxed text-muted">
      {"Welcome back, " + currentUser.firstName + ". "}
      You have <strong className="font-semibold text-ink">{currentUser.savedCount + " saved houses"}</strong> and a
      member account since {currentUser.memberSince}.
    </p>
  );
}
