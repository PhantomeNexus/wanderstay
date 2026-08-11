export const guestDetailsConfig = {
  stepLabel: "Step 1 of 2",
  heading: "Who is travelling?",
  subheading: "We pass these details straight to your host and nobody else.",
  fields: {
    firstName: {
      label: "First name",
      placeholder: "Sofia",
      required: "Enter your first name",
      tooShort: "That looks a little short — please enter your full first name",
    },
    lastName: {
      label: "Last name",
      placeholder: "Nilsson",
      required: "Enter your last name",
      tooShort: "That looks a little short — please enter your full last name",
    },
    email: {
      label: "Email address",
      placeholder: "you@example.com",
      helper: "Your booking confirmation and check-in details go here.",
      required: "Enter an email address",
      invalid: "That email address does not look right",
    },
    phone: {
      label: "Phone number",
      placeholder: "+46 70 123 45 67",
      helper: "Your host will only use this on the day of arrival.",
      required: "Enter a phone number",
      invalid: "Enter a phone number with at least 7 digits",
    },
    arrivalTime: {
      label: "Estimated arrival time",
      helper: "You can change this later from My Trips.",
      options: [
        "Before 3:00 PM",
        "3:00 PM – 6:00 PM",
        "6:00 PM – 9:00 PM",
        "After 9:00 PM",
        "Not sure yet",
      ],
    },
    specialRequests: {
      label: "Anything the host should know?",
      placeholder:
        "Travelling with a dog, arriving on a late flight, celebrating something — tell us here.",
      helper: "Optional, but hosts read every one of these.",
      tooLong: "Please keep this under 500 characters",
    },
  },
  submit: "Continue to payment",
  back: "Back to the house",
};

export const paymentConfig = {
  stepLabel: "Step 2 of 2",
  heading: "Payment details",
  subheading: "Your card is charged once the host accepts. Nothing leaves your account today.",
  fields: {
    cardName: {
      label: "Name on card",
      placeholder: "Sofia Nilsson",
      required: "Enter the name printed on your card",
    },
    cardNumber: {
      label: "Card number",
      placeholder: "4242 4242 4242 4242",
      required: "Enter your card number",
      invalid: "A card number is 16 digits",
    },
    expiry: {
      label: "Expiry",
      placeholder: "MM/YY",
      required: "Enter the expiry date",
      invalid: "Use the format MM/YY",
      expired: "That date is in the past",
    },
    cvc: {
      label: "Security code",
      placeholder: "123",
      helper: "The three digits on the back of your card.",
      required: "Enter the security code",
      invalid: "The security code is 3 digits",
    },
    billingPostcode: {
      label: "Billing postcode",
      placeholder: "113 51",
      required: "Enter the postcode on your billing address",
    },
    terms: {
      label: "I have read the house rules and the cancellation policy",
      required: "Please confirm you have read the house rules",
    },
  },
  submit: "Confirm and reserve",
  back: "Back to guest details",
  processing: "Reserving your dates…",
  secureNote: "Payments are encrypted end to end. Wanderstay never stores your full card number.",
};

export const orderSummaryConfig = {
  heading: "Order summary",
  nightsLabel: "Nights",
  guestsLabel: "Guests",
  checkInLabel: "Check-in",
  checkOutLabel: "Check-out",
  cleaningLabel: "Cleaning fee",
  serviceLabel: "Wanderstay service fee",
  taxLabel: "Occupancy tax",
  totalLabel: "Total due",
  dueTodayLabel: "Due today",
  dueTodayValue: "$0",
  policyNote: "Free cancellation until 14 days before check-in.",
};
