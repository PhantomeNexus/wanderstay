"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CheckIcon, ShieldIcon } from "./icons";
import { formatPrice } from "@/lib/format";

const COVERAGE_PER_DAY = 4;

interface TravelProtectionProps {
  nights: number;
}

export function TravelProtection({ nights }: TravelProtectionProps) {
  const t = useTranslations("TravelProtection");
  const locale = useLocale();
  const [added, setAdded] = useState(false);
  const total = COVERAGE_PER_DAY * nights;

  return (
    <section className="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-card">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-raised text-accent">
          <ShieldIcon className="h-4.5 w-4.5" />
        </span>
        <div>
          <h3 className="text-[16px] font-bold tracking-tight text-ink">
            {t("heading")}
          </h3>
          <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
            {t("description")}
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-[13.5px] text-muted">
        {(["benefitRefund", "benefitAssistance", "benefitCoverage"] as const).map(
          (benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {t(benefit)}
            </li>
          ),
        )}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-[13.5px] font-semibold text-ink">
          {t("priceLine", {
            perDay: formatPrice(locale, COVERAGE_PER_DAY),
            total: formatPrice(locale, total),
            nights,
          })}
        </span>
        <button
          type="button"
          onClick={() => setAdded(!added)}
          className="rounded-full border border-line-strong px-5 py-2 text-[13.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {added ? t("addedCta") : t("addCta")}
        </button>
      </div>

      {added ? (
        <p className="mt-3 text-[12.5px] text-faint">{t("removeNote")}</p>
      ) : null}
    </section>
  );
}
