import type { Metadata } from "next";
import Link from "next/link";
import { SearchBar } from "@/components/search-bar";
import { DestinationCard } from "@/components/destination-card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Scenery } from "@/components/scenery";
import { ArrowIcon, StarIcon, VALUE_PROP_ICONS } from "@/components/icons";
import { getFeaturedDestinations, TOTAL_STAYS_ON_PLATFORM } from "@/lib/destinations";
import { STAT_HIGHLIGHTS, TESTIMONIALS, VALUE_PROPS } from "@/lib/site-config";
import { currentUser } from "@/lib/user";

export const metadata: Metadata = {
  title: "Wanderstay — Boutique stays and experiences",
  description:
    "Forty-eight boutique houses across Europe and North Africa, each one visited before it went on the list. Book a coastal escape, a mountain retreat or a design stay.",
};

export default function HomePage() {
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
              Four new houses added this month
            </span>

            <h1 className="mt-6 text-[38px] leading-[1.08] font-bold tracking-tight text-ink md:text-[58px]">
              Somewhere worth
              <span className="text-accent"> staying still</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-ink-soft md:text-[18px]">
              A short list of boutique houses across Europe and North Africa. We visit every one
              of them before it goes on the site, and we turn down four out of five.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <SearchBar />
          </div>

          <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            {STAT_HIGHLIGHTS.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="text-[26px] font-bold tracking-tight text-ink md:text-[30px]">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-[13px] text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
              Featured this season
            </p>
            <h2 className="mt-3 text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
              Houses we would book ourselves
            </h2>
            <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-muted">
              {"Showing " + featured.length + " of " + TOTAL_STAYS_ON_PLATFORM + " stays"} — the
              ones our team keeps going back to.
            </p>
          </div>
          <Link
            href="/destinations"
            className="group flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            See all destinations
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
              Why Wanderstay
            </p>
            <h2 className="mt-3 text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
              A shorter list, checked properly
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
              We are not trying to list every house in Europe. We are trying to list{" "}
              <strong className="font-semibold text-ink">forty-eight good ones</strong> and know
              each of them well enough to tell you which room to ask for.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((prop) => {
              const Icon = VALUE_PROP_ICONS[prop.icon as keyof typeof VALUE_PROP_ICONS];
              return (
                <div
                  key={prop.title}
                  className="rounded-2xl border border-line bg-canvas p-6 transition-colors hover:border-line-strong"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[16px] font-semibold text-ink">{prop.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{prop.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
            From our guests
          </p>
          <h2 className="mt-3 text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
            {"Welcome back, " + currentUser.firstName + " — here is what others said"}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.author}
              className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-card"
            >
              <div className="flex gap-0.5 text-accent">
                {[0, 1, 2, 3, 4].map((star) => (
                  <StarIcon key={star} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-raised text-[13px] font-bold text-ink">
                  {testimonial.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold text-ink">
                    {testimonial.author}
                  </span>
                  <span className="block truncate text-[13px] text-muted">{testimonial.role}</span>
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
