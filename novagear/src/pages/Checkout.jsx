import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getItemMeta } from "../utils/bundleItems";

import CheckoutStepper from "../components/CheckoutStepper";

const taxRate = 0.13;

const shippingFields = [
  {
    name: "fullName",
    label: "Full name",
    type: "text",
    autocomplete: "name",
    placeholder: "Example: Avery Chen",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    autocomplete: "email",
    placeholder: "avery@example.com",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    autocomplete: "street-address",
    placeholder: "123 Setup Lane",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    autocomplete: "address-level2",
    placeholder: "Ottawa",
  },
  {
    name: "province",
    label: "Province",
    type: "text",
    autocomplete: "address-level1",
    placeholder: "ON",
  },
  {
    name: "postalCode",
    label: "Postal code",
    type: "text",
    autocomplete: "postal-code",
    placeholder: "K1A 0B1",
  },
];

const paymentFields = [
  {
    name: "cardName",
    label: "Name on card",
    type: "text",
    autocomplete: "cc-name",
    placeholder: "Example: Avery Chen",
  },
  {
    name: "cardNumber",
    label: "Card number",
    type: "text",
    autocomplete: "cc-number",
    placeholder: "Use demo digits only",
  },
  {
    name: "expiry",
    label: "Expiry date",
    type: "text",
    autocomplete: "cc-exp",
    placeholder: "MM/YY",
  },
  {
    name: "cvv",
    label: "CVV",
    type: "password",
    autocomplete: "cc-csc",
    placeholder: "123",
  },
];

const guestContactFields = [
  {
    name: "fullName",
    label: "Full name",
    type: "text",
    autocomplete: "name",
    placeholder: "Example: Avery Chen",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    autocomplete: "email",
    placeholder: "avery@example.com",
  },
  {
    name: "phone",
    label: "Phone for delivery updates",
    type: "tel",
    autocomplete: "tel",
    placeholder: "613-555-0148",
  },
];

const initialShipping = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
};

const initialGuestContact = {
  fullName: "",
  email: "",
  phone: "",
};

const initialPayment = {
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function getShippingFromAccount(user) {
  if (!user) {
    return initialShipping;
  }

  return {
    fullName: user.fullName ?? "",
    email: user.email ?? "",
    address: user.address ?? "",
    city: user.city ?? "",
    province: user.province ?? "",
    postalCode: user.postalCode ?? "",
  };
}

function isValidEmail(value) {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
    value.trim(),
  );
}

function hasFirstAndLastName(value) {
  return /^[A-Za-z][A-Za-z'-]+(?:\s+[A-Za-z][A-Za-z'-]+)+$/.test(value.trim());
}

function isLettersOnly(value) {
  return /^[A-Za-z][A-Za-z\s'-]{1,}$/.test(value.trim());
}

function isValidAddress(value) {
  return /^\d+\s+[A-Za-z0-9][A-Za-z0-9\s'.#-]{4,}$/.test(value.trim());
}

function isValidCanadianPostalCode(value) {
  return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(value.trim());
}

function getDigits(value) {
  return value.replace(/\D/g, "");
}

function formatExpiry(value) {
  const digits = getDigits(value).slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function formatPostalCode(value) {
  const compactValue = value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);

  if (compactValue.length <= 3) {
    return compactValue;
  }

  return `${compactValue.slice(0, 3)} ${compactValue.slice(3)}`;
}

function isValidFutureExpiry(value) {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value);

  if (!match) {
    return false;
  }

  const expiryMonth = Number(match[1]);
  const expiryYear = 2000 + Number(match[2]);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  return (
    expiryYear > currentYear ||
    (expiryYear === currentYear && expiryMonth >= currentMonth)
  );
}

function getInputMode(fieldName) {
  if (["phone", "cardNumber", "cvv"].includes(fieldName)) {
    return "numeric";
  }

  if (fieldName === "expiry") {
    return "numeric";
  }

  if (fieldName === "email") {
    return "email";
  }

  return "text";
}

function getMaxLength(fieldName) {
  const maxLengths = {
    phone: 10,
    province: 2,
    postalCode: 7,
    cardNumber: 19,
    expiry: 5,
    cvv: 4,
  };

  return maxLengths[fieldName];
}

function normalizeInputValue(fieldName, value) {
  if (fieldName === "phone") {
    return getDigits(value).slice(0, 10);
  }

  if (fieldName === "province") {
    return value.replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 2);
  }

  if (fieldName === "postalCode") {
    return formatPostalCode(value);
  }

  if (fieldName === "cardNumber") {
    return getDigits(value).slice(0, 19);
  }

  if (fieldName === "expiry") {
    return formatExpiry(value);
  }

  if (fieldName === "cvv") {
    return getDigits(value).slice(0, 4);
  }

  return value;
}

function validateFields(fields, values) {
  return fields.reduce((nextErrors, field) => {
    const value = values[field.name]?.trim() ?? "";

    if (!value) {
      return {
        ...nextErrors,
        [field.name]: `Enter your ${field.label.toLowerCase()} to continue.`,
      };
    }

    if (
      (field.name === "fullName" || field.name === "cardName") &&
      !hasFirstAndLastName(value)
    ) {
      return {
        ...nextErrors,
        [field.name]: "Enter a first and last name using letters.",
      };
    }

    if (field.name === "email" && !isValidEmail(value)) {
      return {
        ...nextErrors,
        [field.name]: "Enter a valid email address for order updates.",
      };
    }

    if (field.name === "phone" && getDigits(value).length !== 10) {
      return {
        ...nextErrors,
        [field.name]: "Enter a 10 digit phone number for delivery updates.",
      };
    }

    if (field.name === "address" && !isValidAddress(value)) {
      return {
        ...nextErrors,
        [field.name]: "Enter a street number and street name.",
      };
    }

    if (field.name === "city" && !isLettersOnly(value)) {
      return {
        ...nextErrors,
        [field.name]: "Enter a city name using letters.",
      };
    }

    if (field.name === "province" && !/^[A-Za-z]{2}$/.test(value)) {
      return {
        ...nextErrors,
        [field.name]: "Enter a 2 letter province code, like ON.",
      };
    }

    if (field.name === "postalCode" && !isValidCanadianPostalCode(value)) {
      return {
        ...nextErrors,
        [field.name]: "Enter a valid postal code, like K1A 0B1.",
      };
    }

    if (
      field.name === "cardNumber" &&
      !/^\d{13,19}$/.test(getDigits(value))
    ) {
      return {
        ...nextErrors,
        [field.name]: "Enter a valid card number with 13 to 19 digits.",
      };
    }

    if (field.name === "expiry" && !isValidFutureExpiry(value)) {
      return {
        ...nextErrors,
        [field.name]: "Use a future expiry date in MM/YY format.",
      };
    }

    if (field.name === "cvv" && !/^\d{3,4}$/.test(value)) {
      return {
        ...nextErrors,
        [field.name]: "Enter a 3 or 4 digit CVV.",
      };
    }

    return nextErrors;
  }, {});
}

function TextField({ field, value, onChange, error }) {
  const fieldId = `checkout-${field.name}`;
  const errorId = `${fieldId}-error`;
  const showError = Boolean(error);

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-2 block text-sm font-black text-zinc-800"
      >
        {field.label} <span className="text-violet-700">*</span>
      </label>
      <input
        id={fieldId}
        name={field.name}
        required
        aria-required="true"
        aria-invalid={showError}
        aria-describedby={showError ? errorId : undefined}
        autoComplete={field.autocomplete}
        inputMode={getInputMode(field.name)}
        maxLength={getMaxLength(field.name)}
        type={field.type}
        value={value}
        placeholder={field.placeholder}
        onChange={(event) =>
          onChange(field.name, normalizeInputValue(field.name, event.target.value))
        }
        className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-violet-500 ${
          showError ? "border-rose-400" : "border-zinc-200"
        }`}
      />
      {showError && (
        <span
          id={errorId}
          className="mt-2 block text-sm font-semibold text-rose-600"
        >
          {error}
        </span>
      )}
    </div>
  );
}

function OrderSummary({ cartItems, subtotal, estimatedTax, total }) {
  return (
    <aside
      aria-labelledby="checkout-summary-heading"
      className="rounded-3xl bg-zinc-950 p-7 text-white shadow-sm lg:sticky lg:top-24 lg:self-start"
    >
      <h2 id="checkout-summary-heading" className="text-2xl font-black">
        Order Summary
      </h2>
      <div className="mt-5 space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between gap-4 border-b border-white/15 pb-4"
            >
              <div>
                <p className="font-black text-white">{item.name}</p>
                <p className="mt-1 text-sm text-zinc-400">
                  {getItemMeta(item)} / Qty {item.quantity}
                </p>
              </div>
              <p className="font-black text-white">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm leading-6 text-zinc-300">
            Your cart is empty. Add gear before placing an order.
          </p>
        )}
      </div>

      <div className="mt-6 space-y-3 text-sm font-semibold">
        <div className="flex justify-between text-zinc-300">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-zinc-300">
          <span>Estimated tax</span>
          <span>{formatPrice(estimatedTax)}</span>
        </div>
        <div className="border-t border-white/15 pt-4">
          <div className="flex justify-between text-2xl font-black text-white">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Checkout({ cartItems, accountUser }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutAccess, setCheckoutAccess] = useState(
    accountUser ? "ready" : "choice",
  );
  const [guestContact, setGuestContact] = useState(initialGuestContact);
  const [shipping, setShipping] = useState(() =>
    getShippingFromAccount(accountUser),
  );
  const [payment, setPayment] = useState(initialPayment);
  const [submittedSteps, setSubmittedSteps] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (!accountUser) {
      return;
    }

    setCheckoutAccess("ready");
    setShipping(getShippingFromAccount(accountUser));
    setPayment(initialPayment);
    setFieldErrors({});
  }, [accountUser]);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );
  const estimatedTax = subtotal * taxRate;
  const total = subtotal + estimatedTax;

  function updateShipping(name, value) {
    setShipping((current) => ({ ...current, [name]: value }));
  }

  function updateGuestContact(name, value) {
    setGuestContact((current) => ({ ...current, [name]: value }));
  }

  function updatePayment(name, value) {
    setPayment((current) => ({ ...current, [name]: value }));
  }

  function canContinueFromStep(step) {
    if (step === 1) {
      return Object.keys(validateFields(shippingFields, shipping)).length === 0;
    }

    if (step === 2) {
      return Object.keys(validateFields(paymentFields, payment)).length === 0;
    }

    if (step === 3) {
      return cartItems.length > 0;
    }

    return true;
  }

  function continueAsGuest() {
    setCheckoutAccess("guestContact");
    setFieldErrors({});
  }

  function continueFromGuestContact() {
    const nextErrors = validateFields(guestContactFields, guestContact);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setShipping((current) => ({
      ...current,
      fullName: guestContact.fullName,
      email: guestContact.email,
    }));
    setCheckoutAccess("ready");
    setFieldErrors({});
  }

  function handleContinue() {
    setSubmittedSteps((current) => ({ ...current, [currentStep]: true }));
    const nextErrors =
      currentStep === 1
        ? validateFields(shippingFields, shipping)
        : currentStep === 2
          ? validateFields(paymentFields, payment)
          : {};
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !canContinueFromStep(currentStep)) {
      return;
    }

    if (currentStep === 3) {
      navigate("/confirmation");
      return;
    }

    setCurrentStep((step) => step + 1);
  }

  function handleBack() {
    if (currentStep === 1) {
      if (!accountUser && checkoutAccess === "ready") {
        setCheckoutAccess("guestContact");
        return;
      }

      navigate("/cart");
      return;
    }

    setFieldErrors({});
    setCurrentStep((step) => step - 1);
  }

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10 lg:p-12">
        <p className="text-sm font-black uppercase tracking-wide text-violet-700">
          Checkout
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-zinc-950">
          Finish your NovaGear order.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
          Follow the steps, confirm your setup, and place a demo order. No real
          payment is processed.
        </p>
      </section>

      {!accountUser && checkoutAccess === "choice" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm font-black uppercase tracking-wide text-violet-700">
              Account Check
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-zinc-950">
              How would you like to checkout?
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
              Sign in or create an account to reuse saved details, or continue as
              a guest and enter contact information for tracking updates.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/account"
                state={{ returnTo: "/checkout" }}
                className="btn-primary-glow rounded-full px-6 py-3 text-center text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                Log In / Sign Up
              </Link>
              <button
                type="button"
                onClick={continueAsGuest}
                className="btn-secondary-polish rounded-full border px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                Continue as Guest
              </button>
            </div>
          </section>

          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            estimatedTax={estimatedTax}
            total={total}
          />
        </div>
      )}

      {!accountUser && checkoutAccess === "guestContact" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm font-black uppercase tracking-wide text-violet-700">
              Guest Contact
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-zinc-950">
              Add contact details for tracking.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
              We need an email and phone number before shipping so NovaGear can
              send order confirmations, delivery updates, and package tracking.
            </p>
            <div className="mt-7 grid gap-6 sm:grid-cols-3">
              {guestContactFields.map((field) => (
                <TextField
                  key={field.name}
                  field={field}
                  value={guestContact[field.name]}
                  onChange={updateGuestContact}
                  error={fieldErrors[field.name]}
                />
              ))}
            </div>
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => {
                  setCheckoutAccess("choice");
                  setFieldErrors({});
                }}
                className="btn-secondary-polish rounded-full border px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                Back
              </button>
              <button
                type="button"
                onClick={continueFromGuestContact}
                className="btn-primary-glow rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                Continue to Shipping
              </button>
            </div>
          </section>

          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            estimatedTax={estimatedTax}
            total={total}
          />
        </div>
      )}

      {checkoutAccess === "ready" && <CheckoutStepper currentStep={currentStep} />}

      {checkoutAccess === "ready" && (
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section
          aria-labelledby="checkout-step-heading"
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 lg:p-9"
        >
          {currentStep === 1 && (
            <div>
              <h2
                id="checkout-step-heading"
                className="text-3xl font-black tracking-tight text-zinc-950"
              >
                Shipping Details
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-zinc-600">
                Tell us where this loadout should ship. All fields marked with
                an asterisk are required.
              </p>
              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                {shippingFields.map((field) => (
                  <TextField
                    key={field.name}
                    field={field}
                    value={shipping[field.name]}
                    onChange={updateShipping}
                    error={submittedSteps[currentStep] ? fieldErrors[field.name] : ""}
                  />
                ))}
              </div>
              {!accountUser && guestContact.email && (
                <p className="mt-5 rounded-2xl bg-violet-50 p-4 text-sm font-semibold text-violet-900">
                  Guest tracking updates will be sent to {guestContact.email}.
                </p>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2
                id="checkout-step-heading"
                className="text-3xl font-black tracking-tight text-zinc-950"
              >
                Payment
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-zinc-600">
                Use placeholder payment details. This prototype does not process
                real payments. All fields marked with an asterisk are required.
              </p>
              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                {paymentFields.map((field) => (
                  <TextField
                    key={field.name}
                    field={field}
                    value={payment[field.name]}
                    onChange={updatePayment}
                    error={submittedSteps[currentStep] ? fieldErrors[field.name] : ""}
                  />
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2
                id="checkout-step-heading"
                className="text-3xl font-black tracking-tight text-zinc-950"
              >
                Review Order
              </h2>
              <p className="mt-3 leading-7 text-zinc-600">
                Check the details before placing the demo order.
              </p>

              {cartItems.length === 0 && (
                <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 font-semibold text-rose-700">
                  Add products to your cart before placing an order.
                </div>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                  <h3 className="font-black text-zinc-950">Shipping</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {shipping.fullName}
                    <br />
                    {shipping.address}
                    <br />
                    {shipping.city}, {shipping.province} {shipping.postalCode}
                    <br />
                    {shipping.email}
                  </p>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                  <h3 className="font-black text-zinc-950">Payment</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {payment.cardName}
                    <br />
                    Card ending in {payment.cardNumber.slice(-4) || "----"}
                    <br />
                    Expires {payment.expiry}
                  </p>
                </div>
              </div>
            </div>
          )}

          {submittedSteps[currentStep] && !canContinueFromStep(currentStep) && (
            <p
              role="alert"
              className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700"
            >
              Please complete the required details before continuing.
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={handleBack}
              aria-label={
                currentStep === 1
                  ? "Return to cart"
                  : "Go back to the previous checkout step"
              }
              className="btn-secondary-polish rounded-full border px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleContinue}
              aria-label={
                currentStep === 3
                  ? "Place demo order"
                  : "Continue to next checkout step"
              }
              className="btn-primary-glow rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {currentStep === 3 ? "Place Order" : "Continue"}
            </button>
          </div>
        </section>

        <OrderSummary
          cartItems={cartItems}
          subtotal={subtotal}
          estimatedTax={estimatedTax}
          total={total}
        />
      </div>
      )}

      {cartItems.length === 0 && (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
          <p className="text-zinc-600">Need gear first?</p>
          <Link
            to="/products"
            className="btn-secondary-polish mt-3 inline-flex rounded-full border px-5 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Shop Products
          </Link>
        </div>
      )}
    </div>
  );
}

export default Checkout;
