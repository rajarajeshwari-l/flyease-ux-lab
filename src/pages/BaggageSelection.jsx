import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Luggage, Check } from "lucide-react";
import PriceSummary from "../components/PriceSummary";
import BookingStepper from "../components/BookingStepper";
import { useBooking } from "../context/BookingContext";
import { baggageOptions } from "../data/staticData";
import { formatINR } from "../utils/helpers";

export default function BaggageSelection() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useBooking();
  const [selected, setSelected] = useState(draft.baggage?.id || "15kg");

  if (!draft.flight || !draft.seat) {
    return (
      <div className="section py-16 text-center">
        <p className="text-neutral-500">Please complete previous steps first.</p>
        <button className="btn-accent mt-4" onClick={() => navigate("/search")}>Search flights</button>
      </div>
    );
  }

  const chosen = baggageOptions.find((b) => b.id === selected);

  const proceed = () => {
    updateDraft({ baggage: chosen });
    navigate("/payment");
  };

  const items = [
    { label: "Flight fare", value: draft.flight.price },
    { label: `Seat ${draft.seat.id}`, value: draft.seat.fee },
    { label: chosen.label, value: chosen.price },
  ];
  const total = draft.flight.price + draft.seat.fee + chosen.price;

  return (
    <div className="section py-8">
      <div className="mb-6"><BookingStepper current={4} /></div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="card p-6">
          <h1 className="text-lg font-bold text-navy-900">Add baggage</h1>
          <p className="mt-1 text-sm text-neutral-500">Cabin baggage and 15 kg checked baggage are included in your fare.</p>

          <div className="mt-6 space-y-3">
            {baggageOptions.map((b) => (
              <label
                key={b.id}
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                  selected === b.id ? "border-cyan-500 bg-cyan-50/50" : "border-neutral-200 hover:border-neutral-300"
                } ${b.included ? "opacity-90" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${selected === b.id ? "bg-cyan-500 text-white" : "bg-neutral-100 text-neutral-500"}`}>
                    {selected === b.id ? <Check className="h-4 w-4" /> : <Luggage className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{b.label}</p>
                    <p className="text-xs text-neutral-500">{b.detail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-navy-900">{b.price ? formatINR(b.price) : "Included"}</span>
                  <input
                    type="radio"
                    name="baggage"
                    className="accent-cyan-500"
                    checked={selected === b.id}
                    onChange={() => setSelected(b.id)}
                    disabled={b.id === "cabin"}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>

        <PriceSummary items={items} total={total} ctaLabel="Continue to payment" onCta={proceed} />
      </div>
    </div>
  );
}
