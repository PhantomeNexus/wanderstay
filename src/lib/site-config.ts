// User-facing copy lives in `messages/{locale}.json`, never in this module.
// Every entry below exports a stable message *key* plus non-copy data
// (hrefs, icon names, initials, numeric values). Components resolve the copy
// with `t(item.key)` against the namespace named in each comment.

/** Brand name — a proper noun, deliberately not translated. */
export const SITE_NAME = "Wanderstay";

/** Key in the `Nav` namespace. */
export const SITE_TAGLINE_KEY = "tagline";

/** Keys in the `Nav` namespace. */
export const NAV_ITEMS = [
  { key: "destinations", href: "/destinations" },
  { key: "trips", href: "/trips" },
  { key: "about", href: "/about" },
  { key: "faq", href: "/faq" },
] as const;

/** Keys in the `Footer` namespace. */
export const FOOTER_COLUMNS = [
  {
    id: "explore",
    headingKey: "exploreHeading",
    links: [
      { key: "allDestinations", href: "/destinations" },
      { key: "coastalEscapes", href: "/destinations" },
      { key: "mountainRetreats", href: "/destinations" },
      { key: "designStays", href: "/destinations" },
      { key: "offGridCabins", href: "/destinations" },
    ],
  },
  {
    id: "company",
    headingKey: "companyHeading",
    links: [
      { key: "aboutUs", href: "/about" },
      { key: "howWeChooseHouses", href: "/about" },
      { key: "careers", href: "/about" },
      { key: "press", href: "/about" },
    ],
  },
  {
    id: "support",
    headingKey: "supportHeading",
    links: [
      { key: "helpCentre", href: "/faq" },
      { key: "faq", href: "/faq" },
      { key: "cancellationPolicy", href: "/faq" },
      { key: "contactSpecialist", href: "/faq" },
    ],
  },
  {
    id: "hosts",
    headingKey: "hostsHeading",
    links: [
      { key: "listYourHouse", href: "/about" },
      { key: "hostStandards", href: "/about" },
      { key: "hostResources", href: "/faq" },
    ],
  },
] as const;

/** Keys in the `Footer` namespace. */
export const FOOTER_LEGAL = [
  { key: "privacy", href: "/about" },
  { key: "terms", href: "/about" },
  { key: "cookies", href: "/about" },
] as const;

/** Key in the `Footer` namespace. */
export const FOOTER_NOTE_KEY = "note";

/** Keys in the `ValueProps` namespace. */
export const VALUE_PROPS = [
  { id: "visited", titleKey: "visitedTitle", bodyKey: "visitedBody", icon: "key" },
  { id: "onePrice", titleKey: "onePriceTitle", bodyKey: "onePriceBody", icon: "receipt" },
  { id: "hostsReply", titleKey: "hostsReplyTitle", bodyKey: "hostsReplyBody", icon: "chat" },
  {
    id: "specialists",
    titleKey: "specialistsTitle",
    bodyKey: "specialistsBody",
    icon: "compass",
  },
] as const;

/**
 * Keys in the `Testimonials` namespace. Author names and initials are proper
 * nouns kept as data.
 */
export const TESTIMONIALS = [
  {
    id: "lindqvist",
    quoteKey: "lindqvistQuote",
    roleKey: "lindqvistRole",
    author: "Rebecca Lindqvist",
    initials: "RL",
  },
  {
    id: "haddad",
    quoteKey: "haddadQuote",
    roleKey: "haddadRole",
    author: "Amir Haddad",
    initials: "AH",
  },
  {
    id: "okonkwo",
    quoteKey: "okonkwoQuote",
    roleKey: "okonkwoRole",
    author: "Grace Okonkwo",
    initials: "GO",
  },
] as const;

/**
 * Keys in the `Stats` namespace. `value` is a raw number — the value message
 * formats it for the active locale: `t(stat.valueKey, {value: stat.value})`.
 */
export const STAT_HIGHLIGHTS = [
  { id: "houses", valueKey: "housesValue", labelKey: "housesLabel", value: 48 },
  { id: "countries", valueKey: "countriesValue", labelKey: "countriesLabel", value: 11 },
  { id: "rating", valueKey: "ratingValue", labelKey: "ratingLabel", value: 4.91 },
  { id: "hostReply", valueKey: "hostReplyValue", labelKey: "hostReplyLabel", value: 2 },
] as const;
