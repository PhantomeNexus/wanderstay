"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { WanderstayMark } from "./scenery";
import { CloseIcon, MenuIcon } from "./icons";
import { LocaleSwitcher } from "./locale-switcher";
import { NAV_ACTIONS, NAV_ITEMS, SITE_NAME } from "@/lib/site-config";
import { currentUser } from "@/lib/user";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link
          href="/"
          aria-label={NAV_ACTIONS.brandHome}
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <WanderstayMark className="h-8 w-8" />
          <span className="text-[17px] font-bold tracking-tight text-ink">{SITE_NAME}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  "rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors " +
                  (active
                    ? "bg-raised text-ink"
                    : "text-ink-soft hover:bg-raised/70 hover:text-ink")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <LocaleSwitcher />
          <button
            type="button"
            title="Sign in to your Wanderstay account"
            className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:bg-raised/70 hover:text-ink"
          >
            {NAV_ACTIONS.signIn}
          </button>
          <Link
            href="/destinations"
            className="rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-white shadow-card transition-colors hover:bg-accent-dark"
          >
            {NAV_ACTIONS.startBooking}
          </Link>
          <Link
            href="/trips"
            aria-label={"Open the account area for " + currentUser.firstName}
            title={currentUser.firstName + " " + currentUser.lastName}
            className="grid h-9 w-9 place-items-center rounded-full bg-ink text-[12px] font-bold text-canvas"
          >
            {currentUser.initials}
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? NAV_ACTIONS.menuClose : NAV_ACTIONS.menuOpen}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink md:hidden"
        >
          {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-line bg-canvas md:hidden">
          <div className="shell flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-[15px] font-medium text-ink-soft hover:bg-raised"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-line pt-4">
              <LocaleSwitcher />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                className="rounded-full border border-line-strong px-4 py-2.5 text-[14px] font-medium text-ink"
              >
                {NAV_ACTIONS.signIn}
              </button>
              <Link
                href="/destinations"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-white"
              >
                {NAV_ACTIONS.startBooking}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
