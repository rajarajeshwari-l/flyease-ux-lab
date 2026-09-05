import { Check } from "lucide-react";

const STEPS = ["Flight", "Passenger", "Seat", "Baggage", "Payment", "Confirm"];

export default function BookingStepper({ current }) {
  return (
    <ol className="flex w-full items-center gap-1 overflow-x-auto pb-1" aria-label="Booking progress">
      {STEPS.map((step, i) => {
        const idx = i + 1;
        const state = idx < current ? "done" : idx === current ? "active" : "pending";
        return (
          <li key={step} className="flex flex-1 items-center gap-1">
            <div className="flex flex-col items-center gap-1 whitespace-nowrap">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  state === "done"
                    ? "bg-success-500 text-white"
                    : state === "active"
                    ? "bg-cyan-500 text-white"
                    : "bg-neutral-100 text-neutral-400"
                }`}
                aria-current={state === "active" ? "step" : undefined}
              >
                {state === "done" ? <Check className="h-4 w-4" /> : idx}
              </div>
              <span className={`text-[10px] font-medium ${state === "pending" ? "text-neutral-400" : "text-navy-900"}`}>
                {step}
              </span>
            </div>
            {idx < STEPS.length && <div className={`h-0.5 flex-1 ${state === "done" ? "bg-success-500" : "bg-neutral-100"}`} />}
          </li>
        );
      })}
    </ol>
  );
}
