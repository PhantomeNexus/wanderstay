import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Scenery } from "@/components/scenery";
import { CheckIcon } from "@/components/icons";
import { destinations, getDestination } from "@/lib/destinations";
import { buildPriceBreakdown, getStatusMessage } from "@/lib/booking";
import { formatLongDate, formatPrice, formatShortDate } from "@/lib/format";
import { currentUser } from "@/lib/user";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Booking confirmed",
  description:
    "Your Wanderstay booking is confirmed. Here is your reference, your stay summary and what happens next.",
};

const NEXT_STEPS = [
  {
    title: "Your host has been notified",
    body: "They have 24 hours to accept, though most reply inside two. You will get an email the moment they do.",
  },
  {
    title: "Check-in details, seven days out",
    body: "A week before you travel we send directions, parking notes and either a keypad code or a meeting time.",
  },
  {
    title: "A specialist is on call",
    body: "From the day you book until the day you check out, someone is available seven days a week on the number in your confirmation email.",
  },
  {
    title: "Change your plans for free",
    body: "Dates can be moved without a Wanderstay fee up to 14 days before check-in, subject to the house being available.",
  },
];

export default async function ConfirmationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const query = await searchParams;

  const reference = typeof query.ref === "string" ? query.ref : "WS-4820-KLM";
  const staySlug = typeof query.stay === "string" ? query.stay : destinations[0].slug;
  const destination = getDestination(staySlug) ?? destinations[0];
  const checkIn = typeof query.from === "string" ? query.from : "2026-09-12";
  const checkOut = typeof query.to === "string" ? query.to : "2026-09-19";
  const guests = typeof query.guests === "string" ? Number(query.guests) : 2;
  const guestName = typeof query.name === "string" ? query.name : currentUser.firstName;

  const breakdown = buildPriceBreakdown(destination, checkIn, checkOut);
  const statusMessage = getStatusMessage("confirmed");

  return (
    <div className="shell py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="rise text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-positive-soft text-positive">
            <CheckIcon className="h-7 w-7" />
          </span>
          <h1 className="mt-6 text-[32px] leading-tight font-bold tracking-tight text-ink md:text-[40px]">
            {statusMessage}
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">
            {"Thanks, " + guestName + " — we have sent the details to " + currentUser.email + "."}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
          <div className="relative aspect-[21/9]">
            <Scenery
              motif={destination.motif}
              palette={destination.palette}
              tone="golden"
              seed={7}
              className="h-full w-full"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/72 to-transparent p-6">
              <p className="text-[20px] font-bold text-canvas">{destination.name}</p>
              <p className="text-[14px] text-canvas/80">{destination.location}</p>
            </div>
          </div>

          <div className="border-b border-line bg-raised px-6 py-5 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-[12.5px] font-semibold tracking-wide text-muted uppercase">
                Booking reference
              </p>
              <p className="mt-1 text-[22px] font-bold tracking-tight text-ink">{reference}</p>
            </div>
            <p className="mt-3 text-[13.5px] text-muted sm:mt-0 sm:text-right">
              {"Booked on " + formatShortDate("2026-08-11")}
              <br />
              <span className="text-faint">Keep this reference for your records</span>
            </p>
          </div>

          <dl className="grid gap-x-8 gap-y-5 p-6 sm:grid-cols-2">
            <Detail label="Check-in" value={formatLongDate(checkIn)} note="From 3:00 PM" />
            <Detail label="Check-out" value={formatLongDate(checkOut)} note="By 11:00 AM" />
            <Detail
              label="Guests"
              value={guests + " guests"}
              note={"This house sleeps " + destination.maxGuests}
            />
            <Detail
              label="Length of stay"
              value={breakdown.nights + " nights"}
              note={formatPrice(destination.pricePerNight) + " per night"}
            />
            <Detail label="Host" value={destination.host.name} note={"Replies " + destination.host.responseTime} />
            <Detail
              label="Total"
              value={formatPrice(breakdown.total)}
              note="Charged when your host accepts"
            />
          </dl>
        </div>

        <section className="mt-12">
          <h2 className="text-[24px] font-bold tracking-tight text-ink">What happens next</h2>
          <ol className="mt-6 space-y-4">
            {NEXT_STEPS.map((item, index) => (
              <li
                key={item.title}
                className="flex gap-4 rounded-2xl border border-line bg-surface p-5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-[13px] font-bold text-accent">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-[15.5px] font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/trips"
            className="rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            View in My Trips
          </Link>
          <Link
            href="/destinations"
            className="rounded-full border border-line-strong bg-surface px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Keep browsing
          </Link>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div>
      <dt className="text-[12.5px] font-semibold tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1.5 text-[16px] font-semibold text-ink">{value}</dd>
      <dd className="mt-0.5 text-[13px] text-faint">{note}</dd>
    </div>
  );
}
