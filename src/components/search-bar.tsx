"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CalendarIcon, GuestsIcon, PinIcon, SearchIcon } from "./icons";
import { destinations } from "@/lib/destinations";

export function SearchBar() {
  const t = useTranslations("Search");
  const router = useRouter();
  const [where, setWhere] = useState("");
  const [checkIn, setCheckIn] = useState("2026-09-12");
  const [checkOut, setCheckOut] = useState("2026-09-19");
  const [guests, setGuests] = useState(2);

  function handleSearch() {
    const match = destinations.find(
      (destination) =>
        destination.location.toLowerCase().includes(where.toLowerCase()) ||
        destination.name.toLowerCase().includes(where.toLowerCase()),
    );

    if (where.length > 0 && match) {
      router.push("/destinations/" + match.slug);
    } else {
      router.push("/destinations");
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-2 shadow-float md:rounded-full md:p-2">
      <div className="grid gap-2 md:grid-cols-[1.4fr_1fr_1fr_0.9fr_auto] md:items-center md:gap-0">
        <label className="rounded-xl px-4 py-3 transition-colors hover:bg-raised/60 md:rounded-full">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
            <PinIcon className="h-3.5 w-3.5 text-accent" />
            {t("destinationLabel")}
          </span>
          <input
            type="text"
            value={where}
            onChange={(event) => setWhere(event.target.value)}
            placeholder={t("destinationPlaceholder")}
            aria-label={t("destinationFieldLabel")}
            className="mt-1 w-full bg-transparent text-[14px] text-ink-soft outline-none placeholder:text-faint"
          />
        </label>

        <label className="rounded-xl px-4 py-3 transition-colors hover:bg-raised/60 md:rounded-full md:border-l md:border-line">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
            <CalendarIcon className="h-3.5 w-3.5 text-accent" />
            {t("checkInLabel")}
          </span>
          <input
            type="date"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            aria-label={t("checkInFieldLabel")}
            className="mt-1 w-full bg-transparent text-[14px] text-ink-soft outline-none"
          />
        </label>

        <label className="rounded-xl px-4 py-3 transition-colors hover:bg-raised/60 md:rounded-full md:border-l md:border-line">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
            <CalendarIcon className="h-3.5 w-3.5 text-accent" />
            {t("checkOutLabel")}
          </span>
          <input
            type="date"
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            aria-label={t("checkOutFieldLabel")}
            className="mt-1 w-full bg-transparent text-[14px] text-ink-soft outline-none"
          />
        </label>

        <label className="rounded-xl px-4 py-3 transition-colors hover:bg-raised/60 md:rounded-full md:border-l md:border-line">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
            <GuestsIcon className="h-3.5 w-3.5 text-accent" />
            {t("guestsLabel")}
          </span>
          <select
            value={guests}
            onChange={(event) => setGuests(Number(event.target.value))}
            aria-label={t("guestsFieldLabel")}
            className="mt-1 w-full bg-transparent text-[14px] text-ink-soft outline-none"
          >
            {[1, 2, 3, 4, 5, 6, 8, 10].map((count) => (
              <option key={count} value={count}>
                {t("guestsOption", { count })}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={handleSearch}
          title={t("submitTitle")}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-accent-dark md:mr-1 md:rounded-full"
        >
          <SearchIcon className="h-4 w-4" />
          <span className="md:hidden lg:inline">{t("submit")}</span>
          <span className="hidden md:inline lg:hidden">{t("submitShort")}</span>
        </button>
      </div>
    </div>
  );
}
