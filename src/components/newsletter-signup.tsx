"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { CheckIcon } from "./icons";

export function NewsletterSignup() {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!email.includes("@") || email.length < 5) {
      setStatus("invalid");
      return;
    }

    setStatus("subscribed");
  }

  return (
    <section className="shell">
      <div className="overflow-hidden rounded-2xl bg-ink px-6 py-12 md:px-14 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-[30px] leading-tight font-bold tracking-tight text-canvas md:text-[36px]">
              {t("heading")}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-canvas/70">
              {t("body")}
            </p>
          </div>

          <div>
            {status === "subscribed" ? (
              <div className="flex items-center gap-3 rounded-2xl bg-canvas/10 px-5 py-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-white">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <p className="text-[15px] font-medium text-canvas">{t("successMessage")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    {t("emailFieldLabel")}
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setStatus("idle");
                    }}
                    placeholder={t("emailPlaceholder")}
                    aria-label={t("emailFieldAriaLabel")}
                    className="w-full rounded-full border border-canvas/20 bg-canvas/10 px-5 py-3.5 text-[15px] text-canvas outline-none placeholder:text-canvas/40 focus:border-accent"
                  />
                  {status === "invalid" ? (
                    <p className="mt-2 pl-2 text-[13px] text-accent">{t("invalidEmailError")}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-dark"
                >
                  {t("subscribeAction")}
                </button>
              </form>
            )}
            <p className="mt-4 text-[12.5px] leading-relaxed text-canvas/45">{t("legalNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
