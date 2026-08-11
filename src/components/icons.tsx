interface IconProps {
  className?: string;
}

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function StarIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path
        d="M10 1.8l2.42 4.9 5.41.79-3.92 3.82.93 5.39L10 14.15l-4.84 2.55.93-5.39L2.17 7.49l5.41-.79z"
        fill="currentColor"
      />
    </svg>
  );
}

export function KeyIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="4.2" {...strokeProps} />
      <path d="M11 11l8 8M16 16l2-2M19 19l2-2" {...strokeProps} />
    </svg>
  );
}

export function ReceiptIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M5 3h14v18l-3-1.6-2.5 1.6L11 19.4 8.5 21 6 19.4 5 21z" {...strokeProps} />
      <path d="M9 8h6M9 12h6" {...strokeProps} />
    </svg>
  );
}

export function ChatIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 5h16v11H9l-5 4z" {...strokeProps} />
      <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" {...strokeProps} strokeWidth={2.4} />
    </svg>
  );
}

export function CompassIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...strokeProps} />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" {...strokeProps} />
    </svg>
  );
}

export function SearchIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" {...strokeProps} />
      <path d="M16 16l4 4" {...strokeProps} />
    </svg>
  );
}

export function PinIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" {...strokeProps} />
      <circle cx="12" cy="10" r="2.5" {...strokeProps} />
    </svg>
  );
}

export function CalendarIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" {...strokeProps} />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" {...strokeProps} />
    </svg>
  );
}

export function GuestsIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="9" cy="8.5" r="3.5" {...strokeProps} />
      <path d="M2.8 20c0-3.4 2.8-5.6 6.2-5.6s6.2 2.2 6.2 5.6" {...strokeProps} />
      <path d="M16.5 5.6a3.5 3.5 0 010 6.4M18 14.8c2 .8 3.4 2.6 3.4 5.2" {...strokeProps} />
    </svg>
  );
}

export function CheckIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4.5 12.5l5 5 10-11" {...strokeProps} strokeWidth={2} />
    </svg>
  );
}

export function ChevronIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 9.5l6 6 6-6" {...strokeProps} strokeWidth={1.9} />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4.5 12h15M13.5 6l6 6-6 6" {...strokeProps} strokeWidth={1.8} />
    </svg>
  );
}

export function ShieldIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 2.8l7.5 3v6.4c0 4.6-3.1 8-7.5 9-4.4-1-7.5-4.4-7.5-9V5.8z" {...strokeProps} />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.6" {...strokeProps} />
    </svg>
  );
}

export function SparkIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" {...strokeProps} />
    </svg>
  );
}

export function CloseIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" {...strokeProps} strokeWidth={1.9} />
    </svg>
  );
}

export function MenuIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" {...strokeProps} strokeWidth={1.9} />
    </svg>
  );
}

export const VALUE_PROP_ICONS = {
  key: KeyIcon,
  receipt: ReceiptIcon,
  chat: ChatIcon,
  compass: CompassIcon,
};
