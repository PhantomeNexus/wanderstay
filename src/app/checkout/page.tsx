import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout-flow";
import { destinations, getDestination } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Confirm your guest details and payment. Your card is only charged once your Wanderstay host accepts the booking.",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
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
          Confirm and pay
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-muted">
          {"You are booking " + destination.name + " in " + destination.location + "."} Nothing
          leaves your account until your host accepts.
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
