"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ChevronIcon } from "./icons";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");
  const router = useRouter();
  const pathname = usePathname();

  return (
    <span className="relative inline-flex items-center">
      <select
        value={locale}
        aria-label={t("label")}
        onChange={(event) => router.replace(pathname, { locale: event.target.value })}
        className="appearance-none rounded-full border border-line-strong bg-surface py-2 pl-3.5 pr-8 text-[13.5px] font-medium text-ink outline-none transition-colors hover:border-accent"
      >
        {routing.locales.map((option) => (
          <option key={option} value={option}>
            {t(option)}
          </option>
        ))}
      </select>
      <ChevronIcon className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-muted" />
    </span>
  );
}
