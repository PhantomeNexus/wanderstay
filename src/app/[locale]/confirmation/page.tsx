import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Scenery } from "@/components/scenery";
import { CheckIcon } from "@/components/icons";
import { destinations, getDestination } from "@/lib/destinations";
import { buildPriceBreakdown, getStatusMessage } from "@/lib/booking";
import { formatLongDate, formatPrice, formatShortDate } from "@/lib/format";
import { currentUser } from "@/lib/user";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Confirmation" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

// Message keys in the `Confirmation` namespace — order only, never copy.
const NEXT_STEPS = [
  { title: "stepHostNotifiedTitle", body: "stepHostNotifiedBody" },
  { title: "stepCheckInDetailsTitle", body: "stepCheckInDetailsBody" },
  { title: "stepSpecialistOnCallTitle", body: "stepSpecialistOnCallBody" },
  { title: "stepFreeChangesTitle", body: "stepFreeChangesBody" },
] as const;

export default async function ConfirmationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Confirmation");
  const tStatus = await getTranslations("BookingStatus");
  const query = await searchParams;

  const reference = typeof query.ref === "string" ? query.ref : "WS-4820-KLM";
  const staySlug = typeof query.stay === "string" ? query.stay : destinations[0].slug;
  const destination = getDestination(staySlug) ?? destinations[0];
  const checkIn = typeof query.from === "string" ? query.from : "2026-09-12";
  const checkOut = typeof query.to === "string" ? query.to : "2026-09-19";
  const guests = typeof query.guests === "string" ? Number(query.guests) : 2;
  const guestName = typeof query.name === "string" ? query.name : currentUser.firstName;

  const breakdown = buildPriceBreakdown(destination, checkIn, checkOut);
  const statusMessage = tStatus(getStatusMessage("confirmed"));

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
            {t("thanksMessage", { guestName, email: currentUser.email })}
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
                {t("bookingReferenceLabel")}
              </p>
              <p className="mt-1 text-[22px] font-bold tracking-tight text-ink">{reference}</p>
            </div>
            <p className="mt-3 text-[13.5px] text-muted sm:mt-0 sm:text-right">
              {t("bookedOn", { date: formatShortDate("2026-08-11") })}
              <br />
              <span className="text-faint">{t("keepReferenceNote")}</span>
            </p>
          </div>

          <dl className="grid gap-x-8 gap-y-5 p-6 sm:grid-cols-2">
            <Detail
              label={t("checkInLabel")}
              value={formatLongDate(checkIn)}
              note={t("checkInNote")}
            />
            <Detail
              label={t("checkOutLabel")}
              value={formatLongDate(checkOut)}
              note={t("checkOutNote")}
            />
            <Detail
              label={t("guestsLabel")}
              value={t("guestsValue", { count: guests })}
              note={t("houseSleepsNote", { count: destination.maxGuests })}
            />
            <Detail
              label={t("lengthOfStayLabel")}
              value={t("nightsValue", { count: breakdown.nights })}
              note={t("perNightNote", { price: formatPrice(destination.pricePerNight) })}
            />
            <Detail
              label={t("hostLabel")}
              value={destination.host.name}
              note={t("hostRepliesNote", { responseTime: destination.host.responseTime })}
            />
            <Detail
              label={t("totalLabel")}
              value={formatPrice(breakdown.total)}
              note={t("totalNote")}
            />
          </dl>
        </div>

        <section className="mt-12">
          <h2 className="text-[24px] font-bold tracking-tight text-ink">{t("nextStepsHeading")}</h2>
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
                  <h3 className="text-[15.5px] font-semibold text-ink">{t(item.title)}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{t(item.body)}</p>
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
            {t("viewInMyTripsLink")}
          </Link>
          <Link
            href="/destinations"
            className="rounded-full border border-line-strong bg-surface px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {t("keepBrowsingLink")}
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
