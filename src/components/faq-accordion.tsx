"use client";

import { useState } from "react";
import { ChevronIcon } from "./icons";
import { FAQS } from "@/lib/faqs";

export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      {FAQS.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? -1 : index)}
                aria-expanded={expanded}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-raised/50"
              >
                <span>
                  <span className="block text-[12px] font-semibold tracking-wide text-accent uppercase">
                    {item.category}
                  </span>
                  <span className="mt-1 block text-[16px] font-semibold text-ink">
                    {item.question}
                  </span>
                </span>
                <ChevronIcon
                  className={
                    "h-5 w-5 shrink-0 text-muted transition-transform " +
                    (expanded ? "rotate-180" : "")
                  }
                />
              </button>
            </h3>
            {expanded ? (
              <div className="fade-up px-6 pb-6">
                <p className="max-w-2xl text-[14.5px] leading-[1.75] text-ink-soft">
                  {item.answer}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
