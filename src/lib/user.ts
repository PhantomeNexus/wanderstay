/** Sample account data — identifiers and values, no translatable copy. */
export const currentUser = {
  firstName: "Sofia",
  lastName: "Nilsson",
  email: "sofia.nilsson@example.com",
  phone: "+46 70 123 45 67",
  memberSince: "2023",
  initials: "SN",
  city: "Stockholm",
  savedCount: 7,
};

/**
 * Message keys in the `Account` namespace — the copy lives in
 * `messages/{locale}.json`. Resolve with `t(accountMenu.profile)`.
 */
export const accountMenu = {
  greeting: "greeting",
  profile: "profile",
  trips: "trips",
  saved: "saved",
  settings: "settings",
  signOut: "signOut",
} as const;
