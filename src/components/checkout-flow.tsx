"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { Scenery } from "./scenery";
import { CheckIcon, ShieldIcon } from "./icons";
import { guestDetailsConfig, orderSummaryConfig, paymentConfig } from "@/lib/form-config";
import { buildPriceBreakdown, generateBookingReference } from "@/lib/booking";
import { formatLongDate, formatPrice } from "@/lib/format";
import { currentUser } from "@/lib/user";
import type { Destination } from "@/lib/types";

interface CheckoutFlowProps {
  destination: Destination;
  checkIn: string;
  checkOut: string;
  guests: number;
}

type Errors = Record<string, string>;

export function CheckoutFlow({ destination, checkIn, checkOut, guests }: CheckoutFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [arrivalTime, setArrivalTime] = useState(guestDetailsConfig.fields.arrivalTime.options[1]);
  const [specialRequests, setSpecialRequests] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [billingPostcode, setBillingPostcode] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState<Errors>({});

  const breakdown = buildPriceBreakdown(destination, checkIn, checkOut);
  const fields = guestDetailsConfig.fields;
  const payFields = paymentConfig.fields;

  function validateGuestDetails() {
    const next: Errors = {};

    if (firstName.trim().length === 0) {
      next.firstName = fields.firstName.required;
    } else if (firstName.trim().length < 2) {
      next.firstName = fields.firstName.tooShort;
    }

    if (lastName.trim().length === 0) {
      next.lastName = fields.lastName.required;
    } else if (lastName.trim().length < 2) {
      next.lastName = fields.lastName.tooShort;
    }

    if (email.trim().length === 0) {
      next.email = fields.email.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = fields.email.invalid;
    }

    const digits = phone.replace(/[^0-9]/g, "");
    if (phone.trim().length === 0) {
      next.phone = fields.phone.required;
    } else if (digits.length < 7) {
      next.phone = fields.phone.invalid;
    }

    if (specialRequests.length > 500) {
      next.specialRequests = fields.specialRequests.tooLong;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validatePayment() {
    const next: Errors = {};

    if (cardName.trim().length === 0) {
      next.cardName = payFields.cardName.required;
    }

    const cardDigits = cardNumber.replace(/[^0-9]/g, "");
    if (cardDigits.length === 0) {
      next.cardNumber = payFields.cardNumber.required;
    } else if (cardDigits.length !== 16) {
      next.cardNumber = payFields.cardNumber.invalid;
    }

    if (expiry.trim().length === 0) {
      next.expiry = payFields.expiry.required;
    } else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiry)) {
      next.expiry = payFields.expiry.invalid;
    } else if (Number(expiry.slice(3)) < 26) {
      next.expiry = payFields.expiry.expired;
    }

    if (cvc.trim().length === 0) {
      next.cvc = payFields.cvc.required;
    } else if (!/^[0-9]{3}$/.test(cvc)) {
      next.cvc = payFields.cvc.invalid;
    }

    if (billingPostcode.trim().length === 0) {
      next.billingPostcode = payFields.billingPostcode.required;
    }

    if (!termsAccepted) {
      next.terms = payFields.terms.required;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleContinue(event: React.FormEvent) {
    event.preventDefault();
    if (validateGuestDetails()) {
      setStep(2);
      setErrors({});
    }
  }

  function handleConfirm(event: React.FormEvent) {
    event.preventDefault();
    if (!validatePayment()) {
      return;
    }

    setSubmitting(true);
    const reference = generateBookingReference();
    const query =
      "?ref=" +
      reference +
      "&stay=" +
      destination.slug +
      "&from=" +
      checkIn +
      "&to=" +
      checkOut +
      "&guests=" +
      guests +
      "&name=" +
      encodeURIComponent(firstName);

    router.push("/confirmation" + query);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-14">
      <div>
        <ol className="flex items-center gap-4">
          <StepPill index={1} label="Guest details" active={step === 1} done={step > 1} />
          <span className="h-px flex-1 bg-line-strong" aria-hidden="true" />
          <StepPill index={2} label="Payment" active={step === 2} done={false} />
        </ol>

        {step === 1 ? (
          <form onSubmit={handleContinue} noValidate className="fade-up mt-9">
            <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
              {guestDetailsConfig.stepLabel}
            </p>
            <h2 className="mt-2 text-[26px] font-bold tracking-tight text-ink">
              {guestDetailsConfig.heading}
            </h2>
            <p className="mt-2 text-[14.5px] text-muted">{guestDetailsConfig.subheading}</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field
                id="firstName"
                label={fields.firstName.label}
                placeholder={fields.firstName.placeholder}
                value={firstName}
                onChange={setFirstName}
                error={errors.firstName}
              />
              <Field
                id="lastName"
                label={fields.lastName.label}
                placeholder={fields.lastName.placeholder}
                value={lastName}
                onChange={setLastName}
                error={errors.lastName}
              />
              <Field
                id="email"
                type="email"
                label={fields.email.label}
                placeholder={fields.email.placeholder}
                helper={fields.email.helper}
                value={email}
                onChange={setEmail}
                error={errors.email}
              />
              <Field
                id="phone"
                type="tel"
                label={fields.phone.label}
                placeholder={fields.phone.placeholder}
                helper={fields.phone.helper}
                value={phone}
                onChange={setPhone}
                error={errors.phone}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="arrivalTime" className="block text-[14px] font-semibold text-ink">
                {fields.arrivalTime.label}
              </label>
              <select
                id="arrivalTime"
                value={arrivalTime}
                onChange={(event) => setArrivalTime(event.target.value)}
                className="mt-2 w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-[14.5px] text-ink outline-none transition-colors focus:border-accent"
              >
                {fields.arrivalTime.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[13px] text-muted">{fields.arrivalTime.helper}</p>
            </div>

            <div className="mt-5">
              <label
                htmlFor="specialRequests"
                className="block text-[14px] font-semibold text-ink"
              >
                {fields.specialRequests.label}
              </label>
              <textarea
                id="specialRequests"
                rows={4}
                value={specialRequests}
                onChange={(event) => setSpecialRequests(event.target.value)}
                placeholder={fields.specialRequests.placeholder}
                className="mt-2 w-full resize-y rounded-xl border border-line-strong bg-surface px-4 py-3 text-[14.5px] text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
              />
              <div className="mt-1.5 flex items-center justify-between gap-4">
                <p className="text-[13px] text-muted">{fields.specialRequests.helper}</p>
                <p className="text-[13px] text-faint">{specialRequests.length + " / 500"}</p>
              </div>
              {errors.specialRequests ? (
                <p className="mt-1.5 text-[13px] font-medium text-accent">
                  {errors.specialRequests}
                </p>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                {guestDetailsConfig.submit}
              </button>
              <Link
                href={"/destinations/" + destination.slug}
                className="text-[14.5px] font-medium text-muted transition-colors hover:text-ink"
              >
                {guestDetailsConfig.back}
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleConfirm} noValidate className="fade-up mt-9">
            <p className="text-[13px] font-semibold tracking-wide text-accent uppercase">
              {paymentConfig.stepLabel}
            </p>
            <h2 className="mt-2 text-[26px] font-bold tracking-tight text-ink">
              {paymentConfig.heading}
            </h2>
            <p className="mt-2 text-[14.5px] text-muted">{paymentConfig.subheading}</p>

            <div className="mt-8 grid gap-5">
              <Field
                id="cardName"
                label={payFields.cardName.label}
                placeholder={payFields.cardName.placeholder}
                value={cardName}
                onChange={setCardName}
                error={errors.cardName}
              />
              <Field
                id="cardNumber"
                label={payFields.cardNumber.label}
                placeholder={payFields.cardNumber.placeholder}
                value={cardNumber}
                onChange={setCardNumber}
                error={errors.cardNumber}
              />
              <div className="grid gap-5 sm:grid-cols-3">
                <Field
                  id="expiry"
                  label={payFields.expiry.label}
                  placeholder={payFields.expiry.placeholder}
                  value={expiry}
                  onChange={setExpiry}
                  error={errors.expiry}
                />
                <Field
                  id="cvc"
                  label={payFields.cvc.label}
                  placeholder={payFields.cvc.placeholder}
                  helper={payFields.cvc.helper}
                  value={cvc}
                  onChange={setCvc}
                  error={errors.cvc}
                />
                <Field
                  id="billingPostcode"
                  label={payFields.billingPostcode.label}
                  placeholder={payFields.billingPostcode.placeholder}
                  value={billingPostcode}
                  onChange={setBillingPostcode}
                  error={errors.billingPostcode}
                />
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
                className="mt-0.5 h-4.5 w-4.5 accent-accent"
              />
              <span className="text-[14px] leading-relaxed text-ink-soft">
                {payFields.terms.label}
              </span>
            </label>
            {errors.terms ? (
              <p className="mt-1.5 text-[13px] font-medium text-accent">{errors.terms}</p>
            ) : null}

            <p className="mt-6 flex items-start gap-2.5 rounded-xl bg-raised px-4 py-3.5 text-[13px] leading-relaxed text-muted">
              <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
              {paymentConfig.secureNote}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-dark disabled:bg-line-strong disabled:text-muted"
              >
                {submitting ? paymentConfig.processing : paymentConfig.submit}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setErrors({});
                }}
                className="text-[14.5px] font-medium text-muted transition-colors hover:text-ink"
              >
                {paymentConfig.back}
              </button>
            </div>
          </form>
        )}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
          <div className="aspect-[16/9]">
            <Scenery
              motif={destination.motif}
              palette={destination.palette}
              tone="golden"
              seed={5}
              className="h-full w-full"
            />
          </div>

          <div className="p-6">
            <h2 className="text-[17px] font-semibold text-ink">{orderSummaryConfig.heading}</h2>
            <p className="mt-3 text-[15px] font-semibold text-ink">{destination.name}</p>
            <p className="text-[13.5px] text-muted">{destination.location}</p>

            <dl className="mt-5 space-y-2.5 border-t border-line pt-5 text-[14px]">
              <Row label={orderSummaryConfig.checkInLabel} value={formatLongDate(checkIn)} />
              <Row label={orderSummaryConfig.checkOutLabel} value={formatLongDate(checkOut)} />
              <Row label={orderSummaryConfig.nightsLabel} value={breakdown.nights + " nights"} />
              <Row label={orderSummaryConfig.guestsLabel} value={guests + " guests"} />
            </dl>

            <dl className="mt-5 space-y-2.5 border-t border-line pt-5 text-[14px]">
              <Row
                label={formatPrice(destination.pricePerNight) + " × " + breakdown.nights + " nights"}
                value={formatPrice(breakdown.accommodation)}
              />
              <Row
                label={orderSummaryConfig.cleaningLabel}
                value={formatPrice(breakdown.cleaningFee)}
              />
              <Row
                label={orderSummaryConfig.serviceLabel}
                value={formatPrice(breakdown.serviceFee)}
              />
              <Row label={orderSummaryConfig.taxLabel} value={formatPrice(breakdown.occupancyTax)} />
            </dl>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
              <p className="text-[16px] font-semibold text-ink">{orderSummaryConfig.totalLabel}</p>
              <p className="text-[20px] font-bold text-ink">{formatPrice(breakdown.total)}</p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-[13.5px] text-muted">{orderSummaryConfig.dueTodayLabel}</p>
              <p className="text-[13.5px] font-semibold text-positive">
                {orderSummaryConfig.dueTodayValue}
              </p>
            </div>

            <p className="mt-5 flex items-start gap-2 rounded-xl bg-positive-soft px-3.5 py-3 text-[13px] leading-relaxed text-positive">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {orderSummaryConfig.policyNote}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="shrink-0 font-medium text-ink">{value}</dd>
    </div>
  );
}

function StepPill({
  index,
  label,
  active,
  done,
}: {
  index: number;
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <li className="flex items-center gap-2.5">
      <span
        className={
          "grid h-8 w-8 place-items-center rounded-full text-[13px] font-bold " +
          (active || done ? "bg-accent text-white" : "bg-raised text-muted")
        }
      >
        {done ? <CheckIcon className="h-4 w-4" /> : index}
      </span>
      <span
        className={
          "text-[14px] font-semibold " + (active || done ? "text-ink" : "text-muted")
        }
      >
        {label}
      </span>
    </li>
  );
}

interface FieldProps {
  id: string;
  label: string;
  placeholder?: string;
  helper?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function Field({
  id,
  label,
  placeholder,
  helper,
  type = "text",
  value,
  onChange,
  error,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-label={label}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={
          "mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-[14.5px] text-ink outline-none transition-colors placeholder:text-faint focus:border-accent " +
          (error ? "border-accent" : "border-line-strong")
        }
      />
      {error ? (
        <p className="mt-1.5 text-[13px] font-medium text-accent">{error}</p>
      ) : helper ? (
        <p className="mt-1.5 text-[13px] text-muted">{helper}</p>
      ) : null}
    </div>
  );
}
