"use client";

import { useState } from "react";
import { Scenery } from "./scenery";
import type { Destination } from "@/lib/types";

interface GalleryProps {
  destination: Destination;
}

export function Gallery({ destination }: GalleryProps) {
  const [active, setActive] = useState(0);
  const frames = destination.gallery;
  const current = frames[active];

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-raised">
        <div className="aspect-[16/9]">
          <Scenery
            motif={destination.motif}
            palette={destination.palette}
            tone={current.tone}
            seed={active + 2}
            className="h-full w-full"
          />
        </div>
        <p className="absolute bottom-4 left-4 rounded-full bg-ink/72 px-4 py-2 text-[13px] font-medium text-canvas backdrop-blur-sm">
          {current.caption}
        </p>
        <p className="absolute right-4 top-4 rounded-full bg-surface/90 px-3.5 py-1.5 text-[12.5px] font-semibold text-ink backdrop-blur-sm">
          {active + 1 + " of " + frames.length}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-3">
        {frames.map((frame, index) => (
          <button
            key={frame.caption}
            type="button"
            onClick={() => setActive(index)}
            title={frame.caption}
            aria-label={"View photo: " + frame.caption}
            className={
              "overflow-hidden rounded-xl border-2 transition-colors " +
              (index === active ? "border-accent" : "border-transparent hover:border-line-strong")
            }
          >
            <span className="block aspect-[4/3]">
              <Scenery
                motif={destination.motif}
                palette={destination.palette}
                tone={frame.tone}
                seed={index + 2}
                className="h-full w-full"
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
