import type { Metadata } from "next";
import { DestinationExplorer } from "@/components/destination-explorer";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Destinations" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Destinations");

  return (
    <div className="shell py-12 md:py-16">
      <header className="max-w-2xl">
        <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 text-[34px] leading-tight font-bold tracking-tight text-ink md:text-[44px]">
          {t("heading")}
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">{t("intro")}</p>
      </header>

      <div className="mt-10">
        <DestinationExplorer />
      </div>
    </div>
  );
}
