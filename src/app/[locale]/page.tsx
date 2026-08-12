import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { SearchBar } from "@/components/search-bar";
import { DestinationCard } from "@/components/destination-card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Scenery } from "@/components/scenery";
import { ArrowIcon, StarIcon, VALUE_PROP_ICONS } from "@/components/icons";
import { getFeaturedDestinations, TOTAL_STAYS_ON_PLATFORM } from "@/lib/destinations";
import { STAT_HIGHLIGHTS, TESTIMONIALS, VALUE_PROPS } from "@/lib/site-config";
import { currentUser } from "@/lib/user";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");
  const tStats = await getTranslations("Stats");
  const tValueProps = await getTranslations("ValueProps");
  const tTestimonials = await getTranslations("Testimonials");

  const featured = getFeaturedDestinations();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 -z-10">
          <Scenery motif="coast" palette="sunlit" tone="golden" seed={3} className="h-full w-full opacity-[0.22]" />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas/70 via-canvas/85 to-canvas" />
        </div>

        <div className="shell rise py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/80 px-4 py-1.5 text-[13px] font-medium text-ink-soft backdrop-blur-sm">
              <StarIcon className="h-3.5 w-3.5 text-accent" />
              {t("heroBadge")}
            </span>

            <h1 className="mt-6 text-[38px] leading-[1.08] font-bold tracking-tight text-ink md:text-[58px]">
              {t.rich("heroHeading", {
                accent: (chunks) => <span className="text-accent">{chunks}</span>,
              })}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-ink-soft md:text-[18px]">
              {t("heroIntro")}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <SearchBar />
          </div>

          <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            {STAT_HIGHLIGHTS.map((stat) => (
              <div key={stat.id} className="text-center">
                <dt className="text-[26px] font-bold tracking-tight text-ink md:text-[30px]">
                  {tStats(stat.valueKey, { value: stat.value })}
                </dt>
                <dd className="mt-1 text-[13px] text-muted">{tStats(stat.labelKey)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
              {t("featuredEyebrow")}
            </p>
            <h2 className="mt-3 text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
              {t("featuredHeading")}
            </h2>
            <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-muted">
              {t("featuredCount", {
                shown: featured.length,
                total: TOTAL_STAYS_ON_PLATFORM,
              })}
            </p>
          </div>
          <Link
            href="/destinations"
            className="group flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {t("featuredSeeAllCta")}
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((destination, index) => (
            <DestinationCard key={destination.slug} destination={destination} index={index} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16 md:py-24">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
              {t("whyEyebrow")}
            </p>
            <h2 className="mt-3 text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
              {t("whyHeading")}
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
              {t.rich("whyBody", {
                strong: (chunks) => (
                  <strong className="font-semibold text-ink">{chunks}</strong>
                ),
              })}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((prop) => {
              const Icon = VALUE_PROP_ICONS[prop.icon as keyof typeof VALUE_PROP_ICONS];
              return (
                <div
                  key={prop.id}
                  className="rounded-2xl border border-line bg-canvas p-6 transition-colors hover:border-line-strong"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[16px] font-semibold text-ink">
                    {tValueProps(prop.titleKey)}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                    {tValueProps(prop.bodyKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
            {t("testimonialsEyebrow")}
          </p>
          <h2 className="mt-3 text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
            {t("testimonialsHeading", { firstName: currentUser.firstName })}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-card"
            >
              <div className="flex gap-0.5 text-accent">
                {[0, 1, 2, 3, 4].map((star) => (
                  <StarIcon key={star} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">
                {tTestimonials(testimonial.quoteKey)}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-raised text-[13px] font-bold text-ink">
                  {testimonial.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold text-ink">
                    {testimonial.author}
                  </span>
                  <span className="block truncate text-[13px] text-muted">
                    {tTestimonials(testimonial.roleKey)}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <NewsletterSignup />

      <div className="h-4" />
    </>
  );
}
