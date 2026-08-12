import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { WallOfLove } from "@/components/wall-of-love";
import { StarIcon } from "@/components/icons";
import { getAllReviews, getReviewStats } from "@/lib/reviews";
import { formatRating } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WallOfLove" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function WallOfLovePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("WallOfLove");
  const reviews = getAllReviews();
  const stats = getReviewStats();

  return (
    <div className="shell py-12 md:py-16">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 text-[34px] leading-tight font-bold tracking-tight text-ink md:text-[46px]">
          {t("heading")}
        </h1>
        <p className="mt-4 text-[16.5px] leading-relaxed text-muted">
          {t.rich("intro", {
            strong: (chunks) => <strong className="font-semibold text-ink">{chunks}</strong>,
            count: stats.total,
            houses: stats.houseCount,
          })}
        </p>
      </header>

      <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
        <div className="text-center">
          <dt className="flex items-center justify-center gap-1.5 text-[26px] font-bold tracking-tight text-ink md:text-[30px]">
            <StarIcon className="h-5 w-5 text-accent" />
            {formatRating(locale, stats.averageRating)}
          </dt>
          <dd className="mt-1 text-[13px] text-muted">{t("statAverageRating")}</dd>
        </div>
        <div className="text-center">
          <dt className="text-[26px] font-bold tracking-tight text-ink md:text-[30px]">
            {stats.total}
          </dt>
          <dd className="mt-1 text-[13px] text-muted">{t("statTotalReviews")}</dd>
        </div>
        <div className="text-center">
          <dt className="text-[26px] font-bold tracking-tight text-ink md:text-[30px]">
            {stats.fiveStarCount}
          </dt>
          <dd className="mt-1 text-[13px] text-muted">{t("statFiveStar")}</dd>
        </div>
        <div className="text-center">
          <dt className="text-[26px] font-bold tracking-tight text-ink md:text-[30px]">
            {stats.houseCount}
          </dt>
          <dd className="mt-1 text-[13px] text-muted">{t("statHouses")}</dd>
        </div>
      </dl>

      <div className="mt-12">
        <WallOfLove reviews={reviews} />
      </div>

      <section className="mt-16 rounded-2xl bg-ink px-6 py-12 text-center md:px-14">
        <h2 className="text-[26px] font-bold tracking-tight text-canvas md:text-[32px]">
          {t("ctaHeading")}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-canvas/70">
          {t("ctaBody")}
        </p>
        <Link
          href="/destinations"
          className="mt-7 inline-block rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          {t("ctaAction")}
        </Link>
      </section>
    </div>
  );
}
