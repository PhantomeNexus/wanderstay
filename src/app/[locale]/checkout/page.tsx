import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout-flow";
import { destinations, getDestination } from "@/lib/destinations";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Checkout" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Checkout");
  const query = await searchParams;

  const staySlug = typeof query.stay === "string" ? query.stay : destinations[0].slug;
  const destination = getDestination(staySlug) ?? destinations[0];
  const checkIn = typeof query.from === "string" ? query.from : "2026-09-12";
  const checkOut = typeof query.to === "string" ? query.to : "2026-09-19";
  const guests = typeof query.guests === "string" ? Number(query.guests) : 2;

  return (
    <div className="shell py-12 md:py-16">
      <header className="max-w-2xl">
        <h1 className="text-[32px] leading-tight font-bold tracking-tight text-ink md:text-[40px]">
          {t("pageHeading")}
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-muted">
          {t("pageIntro", {
            destinationName: destination.name,
            location: destination.location,
          })}
        </p>
      </header>

      <div className="mt-10">
        <CheckoutFlow
          destination={destination}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={Number.isFinite(guests) && guests > 0 ? guests : 2}
        />
      </div>
    </div>
  );
}
