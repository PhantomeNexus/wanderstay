// User-facing copy lives in `messages/{locale}.json`, never in this module.
// Every entry below exports stable message *keys* only; components resolve the
// copy with `t(...)` against the `Faq` namespace.

/** Keys in the `Faq` namespace. */
export const FAQ_CATEGORIES = [
  { id: "booking", key: "bookingCategory" },
  { id: "payment", key: "paymentCategory" },
  { id: "duringYourStay", key: "duringYourStayCategory" },
  { id: "hosts", key: "hostsCategory" },
] as const;

/** Keys in the `Faq` namespace. */
export const FAQS = [
  {
    id: "bookingLeadTime",
    categoryKey: "bookingCategory",
    questionKey: "bookingLeadTimeQuestion",
    answerKey: "bookingLeadTimeAnswer",
  },
  {
    id: "afterReserving",
    categoryKey: "bookingCategory",
    questionKey: "afterReservingQuestion",
    answerKey: "afterReservingAnswer",
  },
  {
    id: "changingDates",
    categoryKey: "bookingCategory",
    questionKey: "changingDatesQuestion",
    answerKey: "changingDatesAnswer",
  },
  {
    id: "minimumStay",
    categoryKey: "bookingCategory",
    questionKey: "minimumStayQuestion",
    answerKey: "minimumStayAnswer",
  },
  {
    id: "whenCardCharged",
    categoryKey: "paymentCategory",
    questionKey: "whenCardChargedQuestion",
    answerKey: "whenCardChargedAnswer",
  },
  {
    id: "cancellationPolicy",
    categoryKey: "paymentCategory",
    questionKey: "cancellationPolicyQuestion",
    answerKey: "cancellationPolicyAnswer",
  },
  {
    id: "hiddenFees",
    categoryKey: "paymentCategory",
    questionKey: "hiddenFeesQuestion",
    answerKey: "hiddenFeesAnswer",
  },
  {
    id: "acceptedCards",
    categoryKey: "paymentCategory",
    questionKey: "acceptedCardsQuestion",
    answerKey: "acceptedCardsAnswer",
  },
  {
    id: "collectingKeys",
    categoryKey: "duringYourStayCategory",
    questionKey: "collectingKeysQuestion",
    answerKey: "collectingKeysAnswer",
  },
  {
    id: "problemOnArrival",
    categoryKey: "duringYourStayCategory",
    questionKey: "problemOnArrivalQuestion",
    answerKey: "problemOnArrivalAnswer",
  },
  {
    id: "bringingADog",
    categoryKey: "duringYourStayCategory",
    questionKey: "bringingADogQuestion",
    answerKey: "bringingADogAnswer",
  },
  {
    id: "choosingHouses",
    categoryKey: "hostsCategory",
    questionKey: "choosingHousesQuestion",
    answerKey: "choosingHousesAnswer",
  },
  {
    id: "listingYourHouse",
    categoryKey: "hostsCategory",
    questionKey: "listingYourHouseQuestion",
    answerKey: "listingYourHouseAnswer",
  },
] as const;
