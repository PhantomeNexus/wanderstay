export const TOAST_MESSAGES = {
  tripSaved: "Trip saved to your list",
  tripRemoved: "Removed from your saved list",
  changeRequested: "Change request sent to your host",
  hostMessaged: "Message sent — hosts usually reply within two hours",
  detailsCopied: "Booking reference copied to your clipboard",
  reviewReminder: "Thanks — your review has been sent to the host",
  cancelUnavailable: "This stay is inside the cancellation window. Call a specialist to cancel.",
  receiptSent: "Receipt on its way to your email",
  linkShared: "Share link copied",
};

export const EMPTY_STATES = {
  cancelled: {
    heading: "Nothing cancelled",
    body: "You have not cancelled a booking with us. If plans change, most stays can be moved instead of cancelled outright.",
    cta: "Browse destinations",
  },
  upcoming: {
    heading: "No trips booked yet",
    body: "When you reserve a house it will show up here with your check-in details and your host's number.",
    cta: "Find somewhere to go",
  },
  past: {
    heading: "No past stays",
    body: "Once you have checked out of a house, it moves here so you can leave a review or book it again.",
    cta: "Browse destinations",
  },
  noResults: {
    heading: "No houses match those filters",
    body: "Try widening the price range or clearing the trip type. There are 48 houses on the list and something will fit.",
    cta: "Clear all filters",
  },
};

export const TRIP_TABS = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "cancelled", label: "Cancelled" },
];

export const TRIP_ACTIONS = {
  viewHouse: "View house",
  requestChange: "Request a change",
  messageHost: "Message host",
  copyReference: "Copy reference",
  leaveReview: "Leave a review",
  bookAgain: "Book again",
  downloadReceipt: "Email me a receipt",
};
