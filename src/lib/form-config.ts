/**
 * Checkout form structure only — which fields exist, their ids and the order of
 * the arrival-time options. Every value here is a message KEY, never translated
 * copy: `t` does not exist at module scope and the locale is bound per request.
 * Resolve inside the component, e.g. `t(guestDetailsConfig.fields.email.label)`.
 *
 * Namespaces: `guestDetailsConfig` → `Checkout`, `paymentConfig` → `Payment`,
 * `orderSummaryConfig` → `OrderSummary`.
 */

export const guestDetailsConfig = {
  stepLabel: "stepIndicator",
  step: { current: 1, total: 2 },
  heading: "guestDetailsHeading",
  subheading: "guestDetailsSubheading",
  fields: {
    firstName: {
      label: "firstNameLabel",
      placeholder: "firstNamePlaceholder",
      required: "firstNameRequiredError",
      tooShort: "firstNameTooShortError",
    },
    lastName: {
      label: "lastNameLabel",
      placeholder: "lastNamePlaceholder",
      required: "lastNameRequiredError",
      tooShort: "lastNameTooShortError",
    },
    email: {
      label: "emailLabel",
      placeholder: "emailPlaceholder",
      helper: "emailHelper",
      required: "emailRequiredError",
      invalid: "emailInvalidError",
    },
    phone: {
      label: "phoneLabel",
      placeholder: "phonePlaceholder",
      helper: "phoneHelper",
      required: "phoneRequiredError",
      invalid: "phoneInvalidError",
    },
    arrivalTime: {
      label: "arrivalTimeLabel",
      helper: "arrivalTimeHelper",
      options: [
        "arrivalTimeBefore3pm",
        "arrivalTime3pmTo6pm",
        "arrivalTime6pmTo9pm",
        "arrivalTimeAfter9pm",
        "arrivalTimeNotSure",
      ],
    },
    specialRequests: {
      label: "specialRequestsLabel",
      placeholder: "specialRequestsPlaceholder",
      helper: "specialRequestsHelper",
      counter: "specialRequestsCounter",
      tooLong: "specialRequestsTooLongError",
      maxLength: 500,
    },
  },
  submit: "guestDetailsSubmitButton",
  back: "guestDetailsBackLink",
} as const;

export const paymentConfig = {
  stepLabel: "stepIndicator",
  step: { current: 2, total: 2 },
  heading: "paymentHeading",
  subheading: "paymentSubheading",
  fields: {
    cardName: {
      label: "cardNameLabel",
      placeholder: "cardNamePlaceholder",
      required: "cardNameRequiredError",
    },
    cardNumber: {
      label: "cardNumberLabel",
      placeholder: "cardNumberPlaceholder",
      required: "cardNumberRequiredError",
      invalid: "cardNumberInvalidError",
    },
    expiry: {
      label: "expiryLabel",
      placeholder: "expiryPlaceholder",
      required: "expiryRequiredError",
      invalid: "expiryInvalidError",
      expired: "expiryExpiredError",
    },
    cvc: {
      label: "cvcLabel",
      placeholder: "cvcPlaceholder",
      helper: "cvcHelper",
      required: "cvcRequiredError",
      invalid: "cvcInvalidError",
    },
    billingPostcode: {
      label: "billingPostcodeLabel",
      placeholder: "billingPostcodePlaceholder",
      required: "billingPostcodeRequiredError",
    },
    terms: {
      label: "termsLabel",
      required: "termsRequiredError",
    },
  },
  submit: "paymentSubmitButton",
  back: "paymentBackButton",
  processing: "paymentProcessingButton",
  secureNote: "paymentSecureNote",
} as const;

export const orderSummaryConfig = {
  heading: "orderSummaryHeading",
  nightsLabel: "nightsLabel",
  guestsLabel: "guestsLabel",
  checkInLabel: "checkInLabel",
  checkOutLabel: "checkOutLabel",
  cleaningLabel: "cleaningFeeLabel",
  serviceLabel: "serviceFeeLabel",
  taxLabel: "occupancyTaxLabel",
  totalLabel: "totalDueLabel",
  dueTodayLabel: "dueTodayLabel",
  dueTodayValue: "dueTodayAmount",
  policyNote: "cancellationPolicyNote",
} as const;
