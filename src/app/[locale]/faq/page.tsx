import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { FaqAccordion } from "@/components/faq-accordion";
import { FAQ_CATEGORIES, FAQS } from "@/lib/faqs";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers on booking, payment, cancellation, keys and house rules — plus how to reach a Wanderstay specialist seven days a week.",
};

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="shell py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header>
          <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
            Help centre
          </p>
          <h1 className="mt-3 text-[34px] leading-tight font-bold tracking-tight text-ink md:text-[44px]">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            {FAQS.length + " questions"} covering the things guests ask most often. If yours is
            not here, a specialist will answer it in under an hour.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((category) => (
              <span
                key={category}
                className="rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-[13px] font-medium text-ink-soft"
              >
                {category}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-10">
          <FaqAccordion />
        </div>

        <div className="mt-12 rounded-2xl bg-ink px-6 py-10 text-center md:px-12">
          <h2 className="text-[24px] font-bold tracking-tight text-canvas">
            Still have a question?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-canvas/70">
            Specialists are available seven days a week, 8:00 AM to 9:00 PM Central European Time.
            Most questions are answered the same hour.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@wanderstay.example"
              className="rounded-full bg-accent px-6 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Email a specialist
            </a>
            <Link
              href="/destinations"
              className="rounded-full border border-canvas/25 px-6 py-3 text-[14.5px] font-semibold text-canvas transition-colors hover:border-canvas/50"
            >
              Browse destinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
