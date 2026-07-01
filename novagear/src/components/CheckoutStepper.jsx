const steps = ["Cart", "Shipping", "Payment", "Review"];

function CheckoutStepper({ currentStep }) {
  return (
    <ol
      aria-label="Checkout progress"
      className="grid gap-3 rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm sm:grid-cols-4"
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <li
            key={step}
            aria-current={isCurrent ? "step" : undefined}
            className={`rounded-2xl border p-4 ${
              isCurrent
                ? "border-zinc-950 bg-zinc-950 text-white"
                : isCompleted
                  ? "border-violet-200 bg-violet-50 text-violet-900"
                  : "border-zinc-200 bg-zinc-50 text-zinc-500"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden={isCompleted ? "true" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${
                  isCompleted
                    ? "bg-violet-600 text-white"
                    : isCurrent
                      ? "bg-white text-zinc-950"
                      : "bg-white text-zinc-500"
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide">
                  Step {index + 1}
                </p>
                <p className="font-black">
                  {step}
                  {isCompleted && <span className="sr-only"> completed</span>}
                  {isCurrent && <span className="sr-only"> current step</span>}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default CheckoutStepper;
