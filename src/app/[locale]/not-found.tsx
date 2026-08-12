import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { TOTAL_STAYS_ON_PLATFORM } from "@/lib/destinations";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="shell py-24 text-center md:py-32">
      <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
        {t("eyebrow")}
      </p>
      <h1 className="mt-4 text-[34px] leading-tight font-bold tracking-tight text-ink md:text-[44px]">
        {t("heading")}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-muted">
        {t("body", { count: TOTAL_STAYS_ON_PLATFORM })}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/destinations"
          className="rounded-full bg-accent px-6 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          {t("browseDestinationsCta")}
        </Link>
        <Link
          href="/"
          className="rounded-full border border-line-strong bg-surface px-6 py-3 text-[14.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {t("backHomeCta")}
        </Link>
      </div>
    </div>
  );
}
