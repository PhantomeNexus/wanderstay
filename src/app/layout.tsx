import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
