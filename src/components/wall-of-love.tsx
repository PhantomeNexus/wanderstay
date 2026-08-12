"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Scenery } from "./scenery";
import { ChevronIcon, StarIcon } from "./icons";
import { formatLongDate } from "@/lib/format";
import { REGION_FILTERS } from "@/lib/destinations";
import { RATING_FILTERS, type WallReview } from "@/lib/reviews";

interface WallOfLoveProps {
  reviews: WallReview[];
}

export function WallOfLove({ reviews }: WallOfLoveProps) {
  const t = useTranslations("WallOfLove");
  const tFilters = useTranslations("Filters");
  const locale = useLocale();

  const [regionKey, setRegionKey] = useState<string>(REGION_FILTERS[0].key);
  const [ratingKey, setRatingKey] = useState<string>(RATING_FILTERS[0].key);

  const visible = useMemo(() => {
    const region = REGION_FILTERS.find((option) => option.key === regionKey);
    const rating = RATING_FILTERS.find((option) => option.key === ratingKey);

    return reviews.filter((review) => {
      const regionOk = !region?.region || review.region === region.region;
      const ratingOk = review.rating >= (rating?.minimum ?? 0);
      return regionOk && ratingOk;
    });
  }, [reviews, regionKey, ratingKey]);

  const filtersActive =
    regionKey !== REGION_FILTERS[0].key || ratingKey !== RATING_FILTERS[0].key;

  function clearFilters() {
    setRegionKey(REGION_FILTERS[0].key);
    setRatingKey(RATING_FILTERS[0].key);
  }

  return (
    <>
      <div className="rounded-2xl border border-line bg-surface p-4 shadow-card md:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[12px] font-semibold tracking-wide text-muted uppercase">
              {t("regionFilterLabel")}
            </span>
            <span className="relative mt-2 block">
              <select
                value={regionKey}
                onChange={(event) => setRegionKey(event.target.value)}
                aria-label={t("regionFilterLabel")}
                className="w-full appearance-none rounded-xl border border-line bg-canvas px-4 py-3 pe-10 text-[14.5px] font-medium text-ink outline-none transition-colors hover:border-line-strong focus:border-accent"
              >
                {REGION_FILTERS.map((option) => (
                  <option key={option.key} value={option.key}>
                    {tFilters(option.key)}
                  </option>
                ))}
              </select>
              <ChevronIcon className="pointer-events-none absolute end-3.5 top-1/2 h-4 w-4 -mt-2 text-muted" />
            </span>
          </label>

          <label className="block">
            <span className="text-[12px] font-semibold tracking-wide text-muted uppercase">
              {t("ratingFilterLabel")}
            </span>
            <span className="relative mt-2 block">
              <select
                value={ratingKey}
                onChange={(event) => setRatingKey(event.target.value)}
                aria-label={t("ratingFilterLabel")}
                className="w-full appearance-none rounded-xl border border-line bg-canvas px-4 py-3 pe-10 text-[14.5px] font-medium text-ink outline-none transition-colors hover:border-line-strong focus:border-accent"
              >
                {RATING_FILTERS.map((option) => (
                  <option key={option.key} value={option.key}>
                    {t(option.key)}
                  </option>
                ))}
              </select>
              <ChevronIcon className="pointer-events-none absolute end-3.5 top-1/2 h-4 w-4 -mt-2 text-muted" />
            </span>
          </label>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[14.5px] text-muted">
          {t("resultCount", { count: visible.length })}
        </p>
        {filtersActive ? (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-line-strong px-4 py-2 text-[13.5px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {t("clearFilters")}
          </button>
        ) : null}
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 gap-6 sm:columns-2 lg:columns-3">
          {visible.map((review) => (
            <figure
              key={review.id}
              className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
            >
              <div className="p-6">
                <div
                  className="flex gap-0.5 text-accent"
                  aria-label={t("ratingOutOfFive", { rating: review.rating })}
                >
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <StarIcon key={index} className="h-4 w-4" />
                  ))}
                </div>

                <blockquote className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  {review.text}
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-raised text-[13px] font-bold text-ink">
                    {review.author.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-semibold text-ink">
                      {review.author}
                    </span>
                    <span className="block truncate text-[13px] text-muted">
                      {formatLongDate(locale, review.date)}
                    </span>
                  </span>
                </figcaption>
              </div>

              <Link
                href={"/destinations/" + review.destinationSlug}
                className="flex items-center gap-3 border-t border-line bg-raised/50 p-4 transition-colors hover:bg-raised"
              >
                <span className="h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Scenery
                    motif={review.motif}
                    palette={review.palette}
                    tone="golden"
                    seed={review.rating + 4}
                    className="h-full w-full"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13.5px] font-semibold text-ink">
                    {review.destinationName}
                  </span>
                  <span className="block truncate text-[12.5px] text-muted">
                    {review.destinationLocation}
                  </span>
                </span>
              </Link>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
          <h2 className="text-[18px] font-semibold text-ink">{t("emptyHeading")}</h2>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-muted">
            {t("emptyBody")}
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            {t("clearFilters")}
          </button>
        </div>
      )}
    </>
  );
}
