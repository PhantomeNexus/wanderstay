"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { DestinationCard } from "./destination-card";
import { ChevronIcon } from "./icons";
import {
  destinations,
  PRICE_FILTERS,
  REGION_FILTERS,
  SORT_OPTIONS,
  TOTAL_STAYS_ON_PLATFORM,
  TRIP_TYPE_FILTERS,
} from "@/lib/destinations";
import { EMPTY_STATES } from "@/lib/notifications";

export function DestinationExplorer() {
  const t = useTranslations("Filters");
  const tDestinations = useTranslations("Destinations");

  const [regionKey, setRegionKey] = useState<string>(REGION_FILTERS[0].key);
  const [priceKey, setPriceKey] = useState<string>(PRICE_FILTERS[0].key);
  const [tripTypeKey, setTripTypeKey] = useState<string>(TRIP_TYPE_FILTERS[0].key);
  const [sortKey, setSortKey] = useState<string>(SORT_OPTIONS[0].key);

  const visible = useMemo(() => {
    const price = PRICE_FILTERS.find((option) => option.key === priceKey) ?? PRICE_FILTERS[0];
    const region = REGION_FILTERS.find((option) => option.key === regionKey) ?? REGION_FILTERS[0];
    const tripType =
      TRIP_TYPE_FILTERS.find((option) => option.key === tripTypeKey) ?? TRIP_TYPE_FILTERS[0];

    const filtered = destinations.filter((destination) => {
      const regionOk = region.region === null || destination.region === region.region;
      const tripOk = tripType.tripType === null || destination.tripType === tripType.tripType;
      const priceOk =
        destination.pricePerNight >= price.min && destination.pricePerNight <= price.max;
      return regionOk && tripOk && priceOk;
    });

    const sorted = [...filtered];

    if (sortKey === "sortPriceLowToHigh") {
      sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortKey === "sortPriceHighToLow") {
      sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortKey === "sortTopRated") {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [regionKey, priceKey, tripTypeKey, sortKey]);

  const filtersActive =
    regionKey !== REGION_FILTERS[0].key ||
    tripTypeKey !== TRIP_TYPE_FILTERS[0].key ||
    priceKey !== PRICE_FILTERS[0].key;

  function clearFilters() {
    setRegionKey(REGION_FILTERS[0].key);
    setTripTypeKey(TRIP_TYPE_FILTERS[0].key);
    setPriceKey(PRICE_FILTERS[0].key);
  }

  return (
    <>
      <div className="rounded-2xl border border-line bg-surface p-4 shadow-card md:p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <FilterSelect
            label={t("regionLabel")}
            value={regionKey}
            options={REGION_FILTERS.map((option) => ({
              value: option.key,
              label: t(option.key),
            }))}
            onChange={setRegionKey}
          />
          <FilterSelect
            label={t("priceLabel")}
            value={priceKey}
            options={PRICE_FILTERS.map((option) => ({
              value: option.key,
              label: t(option.key),
            }))}
            onChange={setPriceKey}
          />
          <FilterSelect
            label={t("tripTypeLabel")}
            value={tripTypeKey}
            options={TRIP_TYPE_FILTERS.map((option) => ({
              value: option.key,
              label: t(option.key),
            }))}
            onChange={setTripTypeKey}
          />
          <FilterSelect
            label={t("sortLabel")}
            value={sortKey}
            options={SORT_OPTIONS.map((option) => ({
              value: option.key,
              label: t(option.key),
            }))}
            onChange={setSortKey}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[14.5px] text-muted">
          {tDestinations.rich("resultsSummary", {
            shown: visible.length,
            total: TOTAL_STAYS_ON_PLATFORM,
            highlight: (chunks) => <strong className="font-semibold text-ink">{chunks}</strong>,
          })}
        </p>
        {filtersActive ? (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-line-strong px-4 py-2 text-[13.5px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {t("clearAll")}
          </button>
        ) : null}
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((destination, index) => (
            <DestinationCard key={destination.slug} destination={destination} index={index} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
          <h3 className="text-[18px] font-semibold text-ink">{tDestinations(EMPTY_STATES.noResults.heading)}</h3>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-muted">
            {tDestinations(EMPTY_STATES.noResults.body)}
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            {tDestinations(EMPTY_STATES.noResults.cta)}
          </button>
        </div>
      )}

      <div className="mt-14 rounded-2xl border border-line bg-raised px-6 py-10 text-center">
        <h3 className="text-[20px] font-semibold text-ink">{tDestinations("ctaHeading")}</h3>
        <p className="mx-auto mt-3 max-w-lg text-[14.5px] leading-relaxed text-muted">
          {tDestinations("ctaBody")}
        </p>
        <Link
          href="/faq"
          className="mt-6 inline-block rounded-full border border-line-strong bg-surface px-6 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {tDestinations("ctaLink")}
        </Link>
      </div>
    </>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold tracking-wide text-muted uppercase">{label}</span>
      <span className="relative mt-2 block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
          className="w-full appearance-none rounded-xl border border-line bg-canvas px-4 py-3 pr-10 text-[14.5px] font-medium text-ink outline-none transition-colors hover:border-line-strong focus:border-accent"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -mt-2 text-muted" />
      </span>
    </label>
  );
}
