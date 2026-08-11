import type { Metadata } from "next";
import { TripsDashboard, TripsGreeting } from "@/components/trips-dashboard";
import { currentUser } from "@/lib/user";

export const metadata: Metadata = {
  title: "My Trips",
  description:
    "Every stay you have booked with Wanderstay — upcoming, past and cancelled — with your host details and booking references in one place.",
};

export default function TripsPage() {
  return (
    <div className="shell py-12 md:py-16">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
            Your account
          </p>
          <h1 className="mt-3 text-[34px] leading-tight font-bold tracking-tight text-ink md:text-[42px]">
            My Trips
          </h1>
          <TripsGreeting />
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-4">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-[14px] font-bold text-canvas">
            {currentUser.initials}
          </span>
          <div>
            <p className="text-[14.5px] font-semibold text-ink">
              {currentUser.firstName + " " + currentUser.lastName}
            </p>
            <p className="text-[13px] text-muted">{currentUser.email}</p>
          </div>
        </div>
      </header>

      <div className="mt-10">
        <TripsDashboard />
      </div>
    </div>
  );
}
