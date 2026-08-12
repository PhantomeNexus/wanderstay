import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Scenery } from "@/components/scenery";
import { CheckIcon, SparkIcon } from "@/components/icons";
import { STAT_HIGHLIGHTS } from "@/lib/site-config";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "About Wanderstay",
  description:
    "Wanderstay is a small team that visits every house before listing it. Here is how we choose properties, how we work with hosts, and who we are.",
};

const PRINCIPLES = [
  {
    title: "We stay before we list",
    body: "Someone from the team spends a night in every house. We check the shower pressure, the mattress, the noise at 7 AM and whether the kitchen has a decent knife. About four in five houses do not make it past this stage.",
  },
  {
    title: "We show the room, not the lens",
    body: "Nothing is shot on a lens that makes a small room look like a hall. If a house has one difficult feature — two hundred steps, a sand road, an early ferry — it is written on the page in plain English rather than buried in the rules.",
  },
  {
    title: "We work with hosts, not inventory",
    body: "Every property here is run by an individual or a family, not a management company. We pay hosts within 48 hours of check-in and we do not charge them for placement.",
  },
  {
    title: "We keep the list short",
    body: "Forty-eight houses is a number we can hold in our heads. It means when you call and describe what you want, the person on the phone has been to the house they are recommending.",
  },
];

const TIMELINE = [
  {
    year: "2015",
    title: "One house on the Amalfi coast",
    body: "Wanderstay began as a spreadsheet of houses two friends had stayed in and would vouch for. Casa Limone was the first, and it is still on the list.",
  },
  {
    year: "2018",
    title: "Twelve houses, four countries",
    body: "We started visiting properties properly rather than relying on recommendations, and turned down the first house that did not hold up in person.",
  },
  {
    year: "2021",
    title: "Specialists on call",
    body: "We hired the first full-time travel specialists so that someone with real knowledge of every property answers the phone seven days a week.",
  },
  {
    year: "2026",
    title: "Forty-eight houses, eleven countries",
    body: "The list is the largest it has ever been and the acceptance rate is the lowest it has ever been. We intend to keep it that way.",
  },
];

const TEAM = [
  { name: "Elin Åkerlund", role: "Founder", note: "Visits about thirty houses a year" },
  { name: "Marco Ferretti", role: "Head of properties", note: "Based in Bologna" },
  { name: "Nadia Cherif", role: "Lead travel specialist", note: "Speaks to most of you first" },
  { name: "Tom Wheeler", role: "Host relations", note: "Handles payouts and standards" },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
              About Wanderstay
            </p>
            <h1 className="mt-4 text-[36px] leading-[1.1] font-bold tracking-tight text-ink md:text-[52px]">
              We turn down four houses for every one we list
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
              Wanderstay is eleven people working out of Stockholm and Bologna. We are not trying
              to be the biggest travel site — we are trying to be the one where{" "}
              <strong className="font-semibold text-ink">
                every house on the list is one we would send a friend to
              </strong>
              .
            </p>
          </div>

          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            {STAT_HIGHLIGHTS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[28px] font-bold tracking-tight text-ink">{stat.value}</dt>
                <dd className="mt-1 text-[13px] text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
            How we choose houses
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
            There is no algorithm and no paid placement. There is a checklist, a night in the bed,
            and an argument afterwards.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="rounded-2xl border border-line bg-surface p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                <SparkIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold text-ink">{principle.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{principle.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16 md:py-24">
        <div className="shell">
          <h2 className="text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
            Where we came from
          </h2>

          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {TIMELINE.map((entry) => (
              <li key={entry.year} className="border-t-2 border-accent pt-5">
                <p className="text-[13px] font-bold tracking-wide text-accent">{entry.year}</p>
                <h3 className="mt-2 text-[16.5px] font-semibold text-ink">{entry.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{entry.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
              The people you will deal with
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
              Eleven of us in total, four of whom you are most likely to speak to. Everyone on this
              list has stayed in at least a third of the houses on the site.
            </p>

            <ul className="mt-8 space-y-4">
              {TEAM.map((person) => (
                <li
                  key={person.name}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-raised text-[14px] font-bold text-ink">
                    {person.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{person.name}</p>
                    <p className="text-[13.5px] text-muted">
                      {person.role + " · " + person.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-raised p-8">
            <h3 className="text-[20px] font-bold tracking-tight text-ink">
              Thinking of listing your house?
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
              We read every application. Here is roughly what the process looks like and how long
              each stage takes.
            </p>

            <ul className="mt-6 space-y-3.5">
              {[
                "You send photographs, the address and a paragraph about the house",
                "We reply within two weeks, either way",
                "A conversation, usually about an hour, usually on the phone",
                "One of us comes and stays a night, at our own cost",
                "If it is a yes, you are live within three weeks",
              ].map((step) => (
                <li key={step} className="flex items-start gap-3 text-[14.5px] text-ink-soft">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {step}
                </li>
              ))}
            </ul>

            <Link
              href="/faq"
              className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Read the host FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
