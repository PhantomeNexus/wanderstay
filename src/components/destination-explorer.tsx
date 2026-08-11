"use client";

import Link from "next/link";
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

const FILTER_LABELS = {
  region: "Region",
  price: "Price range",
  tripType: "Trip type",
  sort: "Sort by",
  clear: "Clear all filters",
  heading: "Filter the list",
};

export function DestinationExplorer() {
  const [region, setRegion] = useState(REGION_FILTERS[0]);
  const [priceLabel, setPriceLabel] = useState(PRICE_FILTERS[0].label);
  const [tripType, setTripType] = useState(TRIP_TYPE_FILTERS[0]);
  const [sort, setSort] = useState(SORT_OPTIONS[0]);

  const visible = useMemo(() => {
    const price = PRICE_FILTERS.find((option) => option.label === priceLabel) ?? PRICE_FILTERS[0];

    const filtered = destinations.filter((destination) => {
      const regionOk = region === REGION_FILTERS[0] || destination.region === region;
      const tripOk = tripType === TRIP_TYPE_FILTERS[0] || destination.tripType === tripType;
      const priceOk =
        destination.pricePerNight >= price.min && destination.pricePerNight <= price.max;
      return regionOk && tripOk && priceOk;
    });

    const sorted = [...filtered];

    if (sort === "Price: low to high") {
      sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sort === "Price: high to low") {
      sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sort === "Top rated") {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [region, priceLabel, tripType, sort]);

  const filtersActive =
    region !== REGION_FILTERS[0] ||
    tripType !== TRIP_TYPE_FILTERS[0] ||
    priceLabel !== PRICE_FILTERS[0].label;

  function clearFilters() {
    setRegion(REGION_FILTERS[0]);
    setTripType(TRIP_TYPE_FILTERS[0]);
    setPriceLabel(PRICE_FILTERS[0].label);
  }

  return (
    <>
      <div className="rounded-2xl border border-line bg-surface p-4 shadow-card md:p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <FilterSelect
            label={FILTER_LABELS.region}
            value={region}
            options={REGION_FILTERS}
            onChange={setRegion}
          />
          <FilterSelect
            label={FILTER_LABELS.price}
            value={priceLabel}
            options={PRICE_FILTERS.map((option) => option.label)}
            onChange={setPriceLabel}
          />
          <FilterSelect
            label={FILTER_LABELS.tripType}
            value={tripType}
            options={TRIP_TYPE_FILTERS}
            onChange={setTripType}
          />
          <FilterSelect
            label={FILTER_LABELS.sort}
            value={sort}
            options={SORT_OPTIONS}
            onChange={setSort}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[14.5px] text-muted">
          <strong className="font-semibold text-ink">
            {"Showing " + visible.length + " of " + TOTAL_STAYS_ON_PLATFORM + " stays"}
          </strong>{" "}
          across eleven countries
        </p>
        {filtersActive ? (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-line-strong px-4 py-2 text-[13.5px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {FILTER_LABELS.clear}
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
          <h3 className="text-[18px] font-semibold text-ink">{EMPTY_STATES.noResults.heading}</h3>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-muted">
            {EMPTY_STATES.noResults.body}
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            {EMPTY_STATES.noResults.cta}
          </button>
        </div>
      )}

      <div className="mt-14 rounded-2xl border border-line bg-raised px-6 py-10 text-center">
        <h3 className="text-[20px] font-semibold text-ink">Not seeing the right house?</h3>
        <p className="mx-auto mt-3 max-w-lg text-[14.5px] leading-relaxed text-muted">
          There are thirty-six more properties we have not put on the public list yet. Tell a
          specialist what you are after and we will send back three options.
        </p>
        <Link
          href="/faq"
          className="mt-6 inline-block rounded-full border border-line-strong bg-surface px-6 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Talk to a specialist
        </Link>
      </div>
    </>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
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
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -mt-2 text-muted" />
      </span>
    </label>
  );
}
