import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { BookingWidget } from "@/components/booking-widget";
import { CheckIcon, PinIcon, SparkIcon, StarIcon } from "@/components/icons";
import { destinations, getDestination } from "@/lib/destinations";
import { formatLongDate, formatRating } from "@/lib/format";
import { getTranslations, setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "DestinationDetail" });
  const destination = getDestination(slug);

  if (!destination) {
    return {
      title: t("metaNotFoundTitle"),
      description: t("metaNotFoundDescription"),
    };
  }

  return {
    title: t("metaTitle", { name: destination.name, location: destination.location }),
    description: destination.summary,
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DestinationDetail");
  const destination = getDestination(slug);

  if (!destination) {
    notFound();
  }

  const reviews = destination.reviews;
  const otherHouses = destinations
    .filter((item) => item.slug !== destination.slug && item.region === destination.region)
    .slice(0, 3);

  return (
    <div className="shell py-8 md:py-12">
      <nav aria-label={t("breadcrumbLabel")} className="flex items-center gap-2 text-[13.5px] text-muted">
        <Link href="/" className="transition-colors hover:text-accent">
          {t("breadcrumbHome")}
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/destinations" className="transition-colors hover:text-accent">
          {t("breadcrumbDestinations")}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink">{destination.name}</span>
      </nav>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-accent-soft px-3 py-1.5 text-[12.5px] font-semibold text-accent">
            {destination.tripType}
          </span>
          <span className="flex items-center gap-1.5 text-[13.5px] text-muted">
            <PinIcon className="h-4 w-4" />
            {destination.location}
          </span>
          <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-ink">
            <StarIcon className="h-3.5 w-3.5 text-accent" />
            {t("ratingWithReviews", {
              rating: formatRating(destination.rating),
              count: reviews.length,
            })}
          </span>
        </div>

        <h1 className="mt-4 text-[32px] leading-tight font-bold tracking-tight text-ink md:text-[44px]">
          {destination.name}
        </h1>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
          {destination.tagline}
        </p>
      </header>

      <div className="mt-8">
        <Gallery destination={destination} />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <section>
            <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-8 text-[14.5px] text-ink-soft">
              <span>{t("guestCount", { count: destination.maxGuests })}</span>
              <span aria-hidden="true" className="text-faint">
                ·
              </span>
              <span>{t("bedroomCount", { count: destination.bedrooms })}</span>
              <span aria-hidden="true" className="text-faint">
                ·
              </span>
              <span>{t("bedCount", { count: destination.beds })}</span>
              <span aria-hidden="true" className="text-faint">
                ·
              </span>
              <span>{t("bathroomCount", { count: destination.baths })}</span>
            </div>

            <div className="mt-8 space-y-5">
              {destination.description.map((paragraph, index) => (
                <p key={index} className="text-[15.5px] leading-[1.75] text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {destination.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-2xl border border-line bg-surface p-4 text-[14px] leading-relaxed text-ink-soft"
                >
                  <SparkIcon className="mb-2.5 h-4.5 w-4.5 text-accent" />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 border-t border-line pt-12">
            <h2 className="text-[22px] font-bold tracking-tight text-ink">
              {t("amenitiesHeading")}
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {destination.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center gap-3 text-[14.5px] text-ink-soft">
                  <CheckIcon className="h-4 w-4 shrink-0 text-accent" />
                  {amenity}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 border-t border-line pt-12">
            <h2 className="text-[22px] font-bold tracking-tight text-ink">{t("hostHeading")}</h2>
            <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-start">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-accent-soft text-[19px] font-bold text-accent">
                {destination.host.name.charAt(0)}
              </span>
              <div>
                <h3 className="text-[17px] font-semibold text-ink">{destination.host.name}</h3>
                <p className="mt-1 text-[13.5px] text-muted">
                  {t("hostMeta", {
                    since: destination.host.since,
                    responseTime: destination.host.responseTime,
                  })}
                </p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">
                  {destination.host.bio}
                </p>
                <button
                  type="button"
                  className="mt-5 rounded-full border border-line-strong px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {t("messageHostCta", { name: destination.host.name.split(" ")[0] })}
                </button>
              </div>
            </div>
          </section>

          <section className="mt-12 border-t border-line pt-12">
            <h2 className="flex flex-wrap items-center gap-2 text-[22px] font-bold tracking-tight text-ink">
              <StarIcon className="h-5 w-5 text-accent" />
              {formatRating(destination.rating)}
              <span className="text-muted" aria-hidden="true">
                ·
              </span>
              <span>{t("reviewCount", { count: reviews.length })}</span>
            </h2>

            <div className="mt-6 space-y-5">
              {reviews.map((review) => (
                <article
                  key={review.author + review.date}
                  className="rounded-2xl border border-line bg-surface p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-raised text-[13px] font-bold text-ink">
                        {review.author.charAt(0)}
                      </span>
                      <div>
                        <p className="text-[14.5px] font-semibold text-ink">{review.author}</p>
                        <p className="text-[13px] text-muted">{formatLongDate(review.date)}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-accent">
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <StarIcon key={index} className="h-3.5 w-3.5" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">{review.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t border-line pt-12">
            <h2 className="text-[22px] font-bold tracking-tight text-ink">{t("houseRulesHeading")}</h2>
            <ul className="mt-6 space-y-3">
              {destination.houseRules.map((rule) => (
                <li key={rule} className="flex items-start gap-3 text-[14.5px] text-ink-soft">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                  {rule}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BookingWidget destination={destination} />
        </aside>
      </div>

      {otherHouses.length > 0 ? (
        <section className="mt-16 border-t border-line pt-12">
          <h2 className="text-[22px] font-bold tracking-tight text-ink">
            {t("moreHousesInRegion", { region: destination.region })}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {otherHouses.map((house) => (
              <Link
                key={house.slug}
                href={"/destinations/" + house.slug}
                className="lift rounded-2xl border border-line bg-surface p-5 shadow-card hover:border-line-strong hover:shadow-raised"
              >
                <h3 className="text-[15.5px] font-semibold text-ink">{house.name}</h3>
                <p className="mt-1 text-[13.5px] text-muted">{house.location}</p>
                <p className="mt-3 text-[13.5px] text-ink-soft">
                  {t.rich("nearbyPricePerNight", {
                    price: "$" + house.pricePerNight,
                    amount: (chunks) => <strong className="font-semibold text-ink">{chunks}</strong>,
                  })}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
