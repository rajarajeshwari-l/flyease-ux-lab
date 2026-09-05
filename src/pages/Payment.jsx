import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, Landmark, ShieldAlert, Loader2 } from "lucide-react";
import Input from "../components/Input";
import PriceSummary from "../components/PriceSummary";
import BookingStepper from "../components/BookingStepper";
import { useBooking } from "../context/BookingContext";
import { useNotifications } from "../context/NotificationContext";
import { gates } from "../data/staticData";

const METHODS = [
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", icon: Landmark },
];

export default function Payment() {
  const navigate = useNavigate();
  const { draft, confirmBooking } = useBooking();
  const { addNotification, pushToast } = useNotifications();
  const [method, setMethod] = useState("upi");
  const [fields, setFields] = useState({ upi: "", cardNumber: "", cardExpiry: "", cardCvv: "", cardName: "", bank: "" });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  if (!draft.flight || !draft.baggage) {
    return (
      <div className="section py-16 text-center">
        <p className="text-neutral-500">Please complete previous steps first.</p>
        <button className="btn-accent mt-4" onClick={() => navigate("/search")}>Search flights</button>
      </div>
    );
  }

  const total = draft.flight.price + draft.seat.fee + draft.baggage.price;

  const validate = () => {
    const e = {};
    if (method === "upi") {
      if (!/^[\w.-]+@[\w.-]+$/.test(fields.upi)) e.upi = "Enter a valid UPI ID, e.g. name@bank.";
    } else if (method === "card") {
      if (!/^\d{16}$/.test(fields.cardNumber.replace(/\s/g, ""))) e.cardNumber = "Enter a valid 16-digit card number.";
      if (!/^\d{2}\/\d{2}$/.test(fields.cardExpiry)) e.cardExpiry = "Use MM/YY format.";
      if (!/^\d{3}$/.test(fields.cardCvv)) e.cardCvv = "Enter a valid 3-digit CVV.";
      if (!fields.cardName.trim()) e.cardName = "Enter the name on card.";
    } else if (method === "netbanking") {
      if (!fields.bank) e.bank = "Please select your bank.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const pay = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setProcessing(true);
    setTimeout(() => {
      const gate = gates[Math.floor(Math.random() * gates.length)];
      const record = confirmBooking({ gate });
      addNotification({ type: "success", title: "Booking confirmed", body: `Your flight ${record.flight.flightNumber} has been booked successfully.` });
      pushToast({ type: "success", title: "Payment successful", body: `Booking ${record.id} confirmed.` });
      navigate(`/confirmation/${record.id}`);
    }, 1400);
  };

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="section py-8">
      <div className="mb-6"><BookingStepper current={5} /></div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="card p-6">
          <div className="alert-warn mb-6">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="font-semibold">DEMO PAYMENT — NO REAL TRANSACTION. This is a simulated payment for a college project.</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-semibold transition-colors ${
                  method === m.id ? "border-cyan-500 bg-cyan-50/60 text-cyan-700" : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                }`}
              >
                <m.icon className="h-5 w-5" /> {m.label}
              </button>
            ))}
          </div>

          <form onSubmit={pay} className="mt-6 space-y-4" noValidate>
            {method === "upi" && (
              <Input label="UPI ID" placeholder="yourname@upi" value={fields.upi} onChange={set("upi")} error={errors.upi} />
            )}
            {method === "card" && (
              <>
                <Input label="Card number" placeholder="1234 5678 9012 3456" value={fields.cardNumber} onChange={set("cardNumber")} error={errors.cardNumber} />
                <Input label="Name on card" placeholder="Ananya Sharma" value={fields.cardName} onChange={set("cardName")} error={errors.cardName} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry (MM/YY)" placeholder="09/29" value={fields.cardExpiry} onChange={set("cardExpiry")} error={errors.cardExpiry} />
                  <Input label="CVV" placeholder="123" value={fields.cardCvv} onChange={set("cardCvv")} error={errors.cardCvv} />
                </div>
              </>
            )}
            {method === "netbanking" && (
              <Input as="select" label="Select bank" value={fields.bank} onChange={set("bank")} error={errors.bank}>
                <option value="">Choose your bank…</option>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </Input>
            )}

            <button type="submit" disabled={processing} className="btn-accent w-full">
              {processing ? (<><Loader2 className="h-4 w-4 animate-spin" /> Processing payment…</>) : "Pay now"}
            </button>
          </form>
        </div>

        <PriceSummary
          items={[
            { label: "Flight fare", value: draft.flight.price },
            { label: `Seat ${draft.seat.id}`, value: draft.seat.fee },
            { label: draft.baggage.label, value: draft.baggage.price },
          ]}
          total={total}
          note="Simulated demo payment. No real money is charged."
        />
      </div>
    </div>
  );
}
