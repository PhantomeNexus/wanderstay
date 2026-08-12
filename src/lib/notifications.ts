/**
 * Structure and message KEYS only — the copy lives in `messages/{locale}.json`.
 * Resolve inside the component, e.g. `t(TOAST_MESSAGES.tripSaved)`.
 *
 * Namespaces: `TOAST_MESSAGES` → `Toasts`; `TRIP_TABS`, `TRIP_ACTIONS` and the
 * `upcoming` / `past` / `cancelled` empty states → `Trips`. `EMPTY_STATES.noResults`
 * belongs to the destinations explorer and resolves in that component's namespace.
 */

export const TOAST_MESSAGES = {
  tripSaved: "tripSaved",
  tripRemoved: "tripRemoved",
  changeRequested: "changeRequested",
  hostMessaged: "hostMessaged",
  detailsCopied: "detailsCopied",
  reviewReminder: "reviewReminder",
  cancelUnavailable: "cancelUnavailable",
  receiptSent: "receiptSent",
  linkShared: "linkShared",
} as const;

export type ToastKey = (typeof TOAST_MESSAGES)[keyof typeof TOAST_MESSAGES];

export const EMPTY_STATES = {
  cancelled: {
    heading: "emptyCancelledHeading",
    body: "emptyCancelledBody",
    cta: "emptyCancelledCta",
  },
  upcoming: {
    heading: "emptyUpcomingHeading",
    body: "emptyUpcomingBody",
    cta: "emptyUpcomingCta",
  },
  past: {
    heading: "emptyPastHeading",
    body: "emptyPastBody",
    cta: "emptyPastCta",
  },
  noResults: {
    heading: "emptyNoResultsHeading",
    body: "emptyNoResultsBody",
    cta: "emptyNoResultsCta",
  },
} as const;

export const TRIP_TABS = [
  { id: "upcoming", labelKey: "tabUpcoming" },
  { id: "past", labelKey: "tabPast" },
  { id: "cancelled", labelKey: "tabCancelled" },
] as const;

export const TRIP_ACTIONS = {
  viewHouse: "actionViewHouse",
  requestChange: "actionRequestChange",
  messageHost: "actionMessageHost",
  copyReference: "actionCopyReference",
  leaveReview: "actionLeaveReview",
  bookAgain: "actionBookAgain",
  downloadReceipt: "actionDownloadReceipt",
} as const;
