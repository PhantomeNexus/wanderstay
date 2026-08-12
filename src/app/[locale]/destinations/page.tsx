import type { Metadata } from "next";
import { DestinationExplorer } from "@/components/destination-explorer";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "All destinations",
  description:
    "Browse every boutique house on the Wanderstay list — coastal escapes, mountain retreats, design stays and off-grid cabins across Europe and North Africa.",
};

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="shell py-12 md:py-16">
      <header className="max-w-2xl">
        <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
          The full collection
        </p>
        <h1 className="mt-3 text-[34px] leading-tight font-bold tracking-tight text-ink md:text-[44px]">
          Every house on the list
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">
          Filter by region, price and the kind of trip you are planning. Every property here has
          been stayed in by someone on our team within the last eighteen months.
        </p>
      </header>

      <div className="mt-10">
        <DestinationExplorer />
      </div>
    </div>
  );
}
