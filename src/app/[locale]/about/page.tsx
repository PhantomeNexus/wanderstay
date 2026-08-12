import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Scenery } from "@/components/scenery";
import { CheckIcon, SparkIcon } from "@/components/icons";
import { STAT_HIGHLIGHTS } from "@/lib/site-config";
import { getTranslations, setRequestLocale } from "next-intl/server";

/** Keys in the `About` namespace. */
const PRINCIPLES = [
  { id: "stayBeforeListing", titleKey: "stayBeforeListingTitle", bodyKey: "stayBeforeListingBody" },
  { id: "honestPhotography", titleKey: "honestPhotographyTitle", bodyKey: "honestPhotographyBody" },
  { id: "hostsNotInventory", titleKey: "hostsNotInventoryTitle", bodyKey: "hostsNotInventoryBody" },
  { id: "shortList", titleKey: "shortListTitle", bodyKey: "shortListBody" },
] as const;

/** Keys in the `About` namespace. `year` is a numeral kept as data. */
const TIMELINE = [
  { id: "firstHouse", year: "2015", titleKey: "firstHouseTitle", bodyKey: "firstHouseBody" },
  { id: "twelveHouses", year: "2018", titleKey: "twelveHousesTitle", bodyKey: "twelveHousesBody" },
  { id: "specialists", year: "2021", titleKey: "specialistsTitle", bodyKey: "specialistsBody" },
  { id: "today", year: "2026", titleKey: "todayTitle", bodyKey: "todayBody" },
] as const;

/** Keys in the `About` namespace. Names are proper nouns kept as data. */
const TEAM = [
  { id: "elin", name: "Elin Åkerlund", metaKey: "elinMeta" },
  { id: "marco", name: "Marco Ferretti", metaKey: "marcoMeta" },
  { id: "nadia", name: "Nadia Cherif", metaKey: "nadiaMeta" },
  { id: "tom", name: "Tom Wheeler", metaKey: "tomMeta" },
] as const;

/** Keys in the `About` namespace. */
const HOST_STEPS = [
  "hostStepApplication",
  "hostStepReply",
  "hostStepConversation",
  "hostStepVisit",
  "hostStepLive",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");
  const tStats = await getTranslations("Stats");

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 -z-10">
          <Scenery motif="peaks" palette="fjord" tone="mist" seed={9} className="h-full w-full opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas/75 via-canvas/88 to-canvas" />
        </div>

        <div className="shell rise py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-[36px] leading-[1.1] font-bold tracking-tight text-ink md:text-[52px]">
              {t("heading")}
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
              {t.rich("intro", {
                strong: (chunks) => (
                  <strong className="font-semibold text-ink">{chunks}</strong>
                ),
              })}
            </p>
          </div>

          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            {STAT_HIGHLIGHTS.map((stat) => (
              <div key={stat.id}>
                <dt className="text-[28px] font-bold tracking-tight text-ink">
                  {tStats(stat.valueKey, { value: stat.value })}
                </dt>
                <dd className="mt-1 text-[13px] text-muted">{tStats(stat.labelKey)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
            {t("principlesHeading")}
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
            {t("principlesIntro")}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <div key={principle.id} className="rounded-2xl border border-line bg-surface p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                <SparkIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold text-ink">
                {t(principle.titleKey)}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
                {t(principle.bodyKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16 md:py-24">
        <div className="shell">
          <h2 className="text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
            {t("timelineHeading")}
          </h2>

          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {TIMELINE.map((entry) => (
              <li key={entry.id} className="border-t-2 border-accent pt-5">
                <p className="text-[13px] font-bold tracking-wide text-accent">{entry.year}</p>
                <h3 className="mt-2 text-[16.5px] font-semibold text-ink">
                  {t(entry.titleKey)}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{t(entry.bodyKey)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
              {t("teamHeading")}
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
              {t("teamIntro")}
            </p>

            <ul className="mt-8 space-y-4">
              {TEAM.map((person) => (
                <li
                  key={person.id}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-raised text-[14px] font-bold text-ink">
                    {person.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{person.name}</p>
                    <p className="text-[13.5px] text-muted">{t(person.metaKey)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-raised p-8">
            <h3 className="text-[20px] font-bold tracking-tight text-ink">
              {t("hostHeading")}
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
              {t("hostBody")}
            </p>

            <ul className="mt-6 space-y-3.5">
              {HOST_STEPS.map((stepKey) => (
                <li key={stepKey} className="flex items-start gap-3 text-[14.5px] text-ink-soft">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {t(stepKey)}
                </li>
              ))}
            </ul>

            <Link
              href="/faq"
              className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              {t("hostCta")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
