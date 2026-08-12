import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { WanderstayMark } from "./scenery";
import {
  FOOTER_COLUMNS,
  FOOTER_LEGAL,
  FOOTER_NOTE_KEY,
  SITE_NAME,
} from "@/lib/site-config";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,1fr))] md:gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <WanderstayMark className="h-8 w-8" />
              <span className="text-[17px] font-bold tracking-tight text-ink">{SITE_NAME}</span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">{t(FOOTER_NOTE_KEY)}</p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.id}>
              <h3 className="text-[13px] font-semibold tracking-wide text-ink uppercase">
                {t(column.headingKey)}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-muted transition-colors hover:text-accent"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-faint">{t("copyright")}</p>
          <div className="flex flex-wrap items-center gap-5">
            {FOOTER_LEGAL.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-[13px] text-faint transition-colors hover:text-ink"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
