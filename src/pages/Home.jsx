import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlaneTakeoff,
  MapPin,
  Ticket,
  Luggage,
  BellRing,
  Bot,
  ArrowLeftRight,
  Search,
} from "lucide-react";
import { airports } from "../data/airports";
import Input from "../components/Input";
import { todayISO } from "../utils/helpers";

const FEATURES = [
  { icon: Ticket, title: "Smart Booking", desc: "Search, compare and book flights in a few guided steps with transparent pricing." },
  { icon: MapPin, title: "Airport Navigation", desc: "Simulated indoor wayfinding to gates, lounges, food courts and more." },
  { icon: PlaneTakeoff, title: "Digital Boarding Pass", desc: "A boarding pass generated instantly after booking, ready to show or print." },
  { icon: Luggage, title: "Baggage Tracking", desc: "Follow simulated baggage status from check-in to pickup." },
  { icon: BellRing, title: "Travel Alerts", desc: "Gate changes, delays and boarding updates in one notification centre." },
  { icon: Bot, title: "FlyBot", desc: "A rule-based assistant that answers common airport questions instantly." },
];

export default function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    from: "MAA",
    to: "DEL",
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
      setError("Origin and destination cannot be the same.");
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
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="section relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold text-cyan-400">Smart Airport Booking & Passenger Experience Platform</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">FLYEASE</h1>
            <p className="mt-4 text-lg text-white/70">Book. Navigate. Travel. Stress-free.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => document.getElementById("search-card")?.scrollIntoView({ behavior: "smooth" })} className="btn-accent">
                <Search className="h-4 w-4" /> Search Flights
              </button>
              <button onClick={() => navigate("/airport")} className="btn-secondary !bg-white/5 !text-white !border-white/15 hover:!bg-white/10">
                <MapPin className="h-4 w-4" /> Explore Airport
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search card */}
      <section className="section -mt-10 pb-4">
        <form id="search-card" onSubmit={submit} className="card p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <Input as="select" label="From" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })}>
              {airports.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.city} ({a.code})
                </option>
              ))}
            </Input>

            <div className="relative">
              <Input as="select" label="To" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })}>
                {airports.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.city} ({a.code})
                  </option>
                ))}
              </Input>
              <button
                type="button"
                onClick={swap}
                aria-label="Swap origin and destination"
                className="absolute -left-3 top-8 hidden h-6 w-6 -translate-x-full items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-cyan-600 sm:flex"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <Input label="Departure" type="date" min={todayISO()} value={form.departure} onChange={(e) => setForm({ ...form, departure: e.target.value })} />
            <Input label="Return (optional)" type="date" min={form.departure} value={form.ret} onChange={(e) => setForm({ ...form, ret: e.target.value })} />
            <Input label="Passengers" as="select" value={form.passengers} onChange={(e) => setForm({ ...form, passengers: e.target.value })}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} passenger{n > 1 ? "s" : ""}</option>
              ))}
            </Input>
            <Input label="Class" as="select" value={form.travelClass} onChange={(e) => setForm({ ...form, travelClass: e.target.value })}>
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
            </Input>
          </div>

          {error && <p className="field-error-text mt-3" role="alert">{error}</p>}

          <button type="submit" className="btn-accent mt-5 w-full sm:w-auto">
            <Search className="h-4 w-4" /> Search Flights
          </button>
        </form>
      </section>

      {/* Features */}
      <section className="section py-16">
        <h2 className="text-2xl font-bold text-navy-900">Everything for a calmer trip</h2>
        <p className="mt-1 text-neutral-500">One platform from search to gate.</p>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-navy-900">{f.title}</h3>
              <p className="mt-1.5 text-sm text-neutral-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
