export const SITE_NAME = "Wanderstay";
export const SITE_TAGLINE = "Boutique stays and experiences, chosen one at a time";

export const NAV_ITEMS = [
  { label: "Destinations", href: "/destinations" },
  { label: "My Trips", href: "/trips" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export const NAV_ACTIONS = {
  signIn: "Sign in",
  startBooking: "Book now",
  menuOpen: "Open the main menu",
  menuClose: "Close the main menu",
  brandHome: "Wanderstay home",
};

export const FOOTER_COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "All destinations", href: "/destinations" },
      { label: "Coastal escapes", href: "/destinations" },
      { label: "Mountain retreats", href: "/destinations" },
      { label: "Design stays", href: "/destinations" },
      { label: "Off-grid cabins", href: "/destinations" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "How we choose houses", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Press", href: "/about" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help centre", href: "/faq" },
      { label: "Frequently asked questions", href: "/faq" },
      { label: "Cancellation policy", href: "/faq" },
      { label: "Contact a specialist", href: "/faq" },
    ],
  },
  {
    heading: "Hosts",
    links: [
      { label: "List your house", href: "/about" },
      { label: "Host standards", href: "/about" },
      { label: "Host resources", href: "/faq" },
    ],
  },
];

export const FOOTER_LEGAL = [
  { label: "Privacy", href: "/about" },
  { label: "Terms", href: "/about" },
  { label: "Cookies", href: "/about" },
];

export const FOOTER_NOTE =
  "Wanderstay works with a small number of independent hosts across Europe and North Africa. Every house is visited before it is listed.";

export const VALUE_PROPS = [
  {
    title: "Every house is visited",
    body: "Someone from our team has stayed a night in each property on this site. If a house does not hold up in person, it does not go on the list.",
    icon: "key",
  },
  {
    title: "One price, start to finish",
    body: "The number you see at checkout is the number you pay. Cleaning and service are itemised up front, and there are no resort fees waiting at the door.",
    icon: "receipt",
  },
  {
    title: "Hosts who answer",
    body: "Our hosts reply in under two hours on average. Most of them live within walking distance and will meet you with the keys themselves.",
    icon: "chat",
  },
  {
    title: "Specialists on call",
    body: "A travel specialist is available seven days a week to move dates, arrange transfers or find you a table that is fully booked online.",
    icon: "compass",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "We have booked four trips through Wanderstay now and not one of them has been a compromise. The houses are genuinely as described, which sounds like a low bar until you have used the alternatives.",
    author: "Rebecca Lindqvist",
    role: "Booked The Fjord Cabin and three others",
    initials: "RL",
  },
  {
    quote:
      "I moved our dates twice and changed the guest count once. Both times someone picked up within a minute and sorted it without a fee. That is the whole reason I keep coming back.",
    author: "Amir Haddad",
    role: "Booked Riad Nissa",
    initials: "AH",
  },
  {
    quote:
      "The photography is honest. Nothing was shot with a lens that made a small room look enormous. What we walked into was exactly what we chose eight weeks earlier.",
    author: "Grace Okonkwo",
    role: "Booked Casa Limone",
    initials: "GO",
  },
];

export const NEWSLETTER_COPY = {
  eyebrow: "The Saturday letter",
  heading: "Four houses, once a month",
  body: "New properties, quiet seasons worth booking into, and the occasional rate drop. No more than one email a month, and never a shared list.",
  placeholder: "you@example.com",
  cta: "Subscribe",
  success: "You are on the list. Look out for the next letter.",
  invalid: "Enter an email address so we know where to send it.",
  legal: "By subscribing you agree to receive occasional emails from Wanderstay. Unsubscribe any time.",
};

export const STAT_HIGHLIGHTS = [
  { value: "48", label: "houses on the list" },
  { value: "11", label: "countries covered" },
  { value: "4.91", label: "average guest rating" },
  { value: "2 hrs", label: "average host reply" },
];
