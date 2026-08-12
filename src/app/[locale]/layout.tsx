import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getDirection, routing } from "@/i18n/routing";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Wanderstay — Boutique stays and experiences",
    template: "%s | Wanderstay",
  },
  description:
    "Wanderstay is a small, hand-picked collection of boutique houses across Europe and North Africa. Every property is visited before it is listed.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={`${jakarta.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
