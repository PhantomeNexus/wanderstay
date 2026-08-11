import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-24 text-center md:py-32">
      <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
        Page not found
      </p>
      <h1 className="mt-4 text-[34px] leading-tight font-bold tracking-tight text-ink md:text-[44px]">
        That house is not on the list
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-muted">
        The page you were looking for has moved or never existed. There are 48 other houses that
        definitely do.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/destinations"
          className="rounded-full bg-accent px-6 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Browse destinations
        </Link>
        <Link
          href="/"
          className="rounded-full border border-line-strong bg-surface px-6 py-3 text-[14.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
