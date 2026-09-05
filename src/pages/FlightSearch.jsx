import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight, Search } from "lucide-react";
import { airports } from "../data/airports";
import Input from "../components/Input";
import { todayISO } from "../utils/helpers";

export default function FlightSearch() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    from: "MAA",
    to: "BLR",
    departure: todayISO(),
    ret: "",
    passengers: 1,
    travelClass: "Economy",
  });
  const [error, setError] = useState("");

  const swap = () => setForm((f) => ({ ...f, from: f.to, to: f.from }));

  const submit = (e) => {
    e.preventDefault();
    if (form.from === form.to) {
      setError("Origin and destination cannot be the same. Please choose different airports.");
      return;
    }
    if (!form.departure) {
      setError("Please choose a departure date.");
      return;
    }
    setError("");
    const params = new URLSearchParams({
      from: form.from,
      to: form.to,
      departure: form.departure,
      ret: form.ret,
      passengers: form.passengers,
      travelClass: form.travelClass,
    });
    navigate(`/results?${params.toString()}`);
  };

  return (
    <div className="section py-10">
      <h1 className="text-2xl font-bold text-navy-900">Search flights</h1>
      <p className="mt-1 text-neutral-500">Compare fares across airlines using FlyEase demo data.</p>

      <form onSubmit={submit} className="card mt-6 p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input as="select" label="From" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })}>
            {airports.map((a) => (
              <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
            ))}
          </Input>

          <div className="relative">
            <Input as="select" label="To" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })}>
              {airports.map((a) => (
                <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
              ))}
            </Input>
            <button
              type="button"
              onClick={swap}
              aria-label="Swap origin and destination"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-cyan-600 hover:underline"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" /> Swap
            </button>
          </div>

          <Input label="Travel Class" as="select" value={form.travelClass} onChange={(e) => setForm({ ...form, travelClass: e.target.value })}>
            <option>Economy</option>
            <option>Premium Economy</option>
            <option>Business</option>
          </Input>

          <Input label="Departure" type="date" min={todayISO()} value={form.departure} onChange={(e) => setForm({ ...form, departure: e.target.value })} />
          <Input label="Return (optional)" type="date" min={form.departure} value={form.ret} onChange={(e) => setForm({ ...form, ret: e.target.value })} />
          <Input label="Passengers" as="select" value={form.passengers} onChange={(e) => setForm({ ...form, passengers: e.target.value })}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} passenger{n > 1 ? "s" : ""}</option>
            ))}
          </Input>
        </div>

        {error && <p className="field-error-text mt-3" role="alert">{error}</p>}

        <button type="submit" className="btn-accent mt-5 w-full sm:w-auto">
          <Search className="h-4 w-4" /> Search Flights
        </button>
      </form>
    </div>
  );
}
