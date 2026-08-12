import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Scenery } from "./scenery";
import { StarIcon } from "./icons";
import { formatPrice, formatRating } from "@/lib/format";
import type { Destination } from "@/lib/types";

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

export function DestinationCard({ destination, index = 0 }: DestinationCardProps) {
  const t = useTranslations("DestinationCard");
  const reviews = destination.reviews;

  return (
    <Link
      href={"/destinations/" + destination.slug}
      className="lift group block overflow-hidden rounded-2xl border border-line bg-surface shadow-card hover:border-line-strong hover:shadow-raised"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-raised">
        <Scenery
          motif={destination.motif}
          palette={destination.palette}
          tone={index % 3 === 1 ? "golden" : "day"}
          seed={index + 1}
          className="h-full w-full"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-surface/92 px-3 py-1.5 text-[12px] font-semibold text-ink backdrop-blur-sm">
          {destination.tripType}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[16px] font-semibold text-ink">{destination.name}</h3>
            <p className="mt-0.5 truncate text-[13.5px] text-muted">{destination.location}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-[13.5px] font-semibold text-ink">
            <StarIcon className="h-3.5 w-3.5 text-accent" />
            {formatRating(destination.rating)}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-ink-soft">
          {destination.tagline}
        </p>

        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
          <p className="text-[14px] text-muted">
            {t.rich("pricePerNight", {
              price: formatPrice(destination.pricePerNight),
              amount: (chunks) => (
                <strong className="text-[16px] font-bold text-ink">{chunks}</strong>
              ),
            })}
          </p>
          <span className="text-[13px] text-faint">
            {t("reviewCount", { count: reviews.length })}
          </span>
        </div>
      </div>
    </Link>
  );
}
