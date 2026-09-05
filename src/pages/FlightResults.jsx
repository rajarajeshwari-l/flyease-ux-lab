import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { generateFlights } from "../data/flights";
import { getAirport } from "../data/airports";
import FlightCard from "../components/FlightCard";
import { LoadingSkeleton, EmptyState } from "../components/States";
import { useBooking } from "../context/BookingContext";
import { formatDateReadable, formatINR } from "../utils/helpers";

const SORTS = [
  { id: "recommended", label: "Recommended" },
  { id: "cheapest", label: "Cheapest" },
  { id: "fastest", label: "Fastest" },
  { id: "earliest", label: "Earliest" },
];

export default function FlightResults() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { updateDraft } = useBooking();

  const from = params.get("from");
  const to = params.get("to");
  const departure = params.get("departure");
  const travelClass = params.get("travelClass") || "Economy";
  const passengers = params.get("passengers") || 1;

  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState([]);
  const [sort, setSort] = useState("recommended");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [airlines, setAirlines] = useState([]);
  const [stopsFilter, setStopsFilter] = useState("any");
  const [timeFilter, setTimeFilter] = useState("any");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const results = generateFlights({ from, to, date: departure, travelClass });
      setFlights(results);
      setMaxPrice(Math.max(...results.map((f) => f.price), 20000));
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, [from, to, departure, travelClass]);

  const allAirlines = useMemo(() => [...new Set(flights.map((f) => f.airline))], [flights]);

  const filtered = useMemo(() => {
    let list = flights.filter((f) => f.price <= maxPrice);
    if (airlines.length) list = list.filter((f) => airlines.includes(f.airline));
    if (stopsFilter === "nonstop") list = list.filter((f) => f.stops === 0);
    if (stopsFilter === "1stop") list = list.filter((f) => f.stops >= 1);
    if (timeFilter !== "any") {
      list = list.filter((f) => {
        const hour = parseInt(f.departureTime.split(":")[0], 10);
        if (timeFilter === "morning") return hour >= 5 && hour < 12;
        if (timeFilter === "afternoon") return hour >= 12 && hour < 17;
        if (timeFilter === "evening") return hour >= 17 && hour < 21;
        return hour >= 21 || hour < 5;
      });
    }

    switch (sort) {
      case "cheapest":
        return [...list].sort((a, b) => a.price - b.price);
      case "fastest":
        return [...list].sort((a, b) => a.durationMins - b.durationMins);
      case "earliest":
        return [...list].sort((a, b) => a.departureTime.localeCompare(b.departureTime));
      default:
        return [...list].sort((a, b) => a.price + a.durationMins / 10 - (b.price + b.durationMins / 10));
    }
  }, [flights, maxPrice, airlines, stopsFilter, timeFilter, sort]);

  const toggleAirline = (name) => {
    setAirlines((prev) => (prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]));
  };

  const handleSelect = (flight) => {
    updateDraft({ flight, from, to, departure, travelClass, passengers, searchParams: { from, to, date: departure, travelClass } });
    navigate(`/flights/${flight.id}?from=${from}&to=${to}&departure=${departure}&travelClass=${travelClass}`);
  };

  const fromA = getAirport(from);
  const toA = getAirport(to);

  return (
    <div className="section py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-navy-900">
            {fromA?.city || from} <span className="text-neutral-400">→</span> {toA?.city || to}
          </h1>
          <p className="text-sm text-neutral-500">{formatDateReadable(departure)} · {passengers} passenger(s) · {travelClass}</p>
        </div>
        <button className="btn-secondary lg:hidden" onClick={() => setShowFilters(true)}>
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        {/* Filters - desktop */}
        <aside className="hidden lg:block">
          <FiltersPanel
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            priceCeiling={Math.max(...flights.map((f) => f.price), 20000)}
            allAirlines={allAirlines}
            airlines={airlines}
            toggleAirline={toggleAirline}
            stopsFilter={stopsFilter}
            setStopsFilter={setStopsFilter}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
          />
        </aside>

        {/* Mobile filter drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-[80] flex lg:hidden">
            <div className="absolute inset-0 bg-navy-950/50" onClick={() => setShowFilters(false)} />
            <div className="relative ml-auto flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-white p-5 animate-slideUp">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-navy-900">Filters</h2>
                <button onClick={() => setShowFilters(false)} aria-label="Close filters"><X className="h-5 w-5" /></button>
              </div>
              <FiltersPanel
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                priceCeiling={Math.max(...flights.map((f) => f.price), 20000)}
                allAirlines={allAirlines}
                airlines={airlines}
                toggleAirline={toggleAirline}
                stopsFilter={stopsFilter}
                setStopsFilter={setStopsFilter}
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
              />
              <button className="btn-accent mt-4" onClick={() => setShowFilters(false)}>Show {filtered.length} results</button>
            </div>
          </div>
        )}

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {SORTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  sort === s.id ? "border-navy-900 bg-navy-900 text-white" : "border-neutral-200 text-neutral-600 hover:border-navy-300"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSkeleton rows={5} />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No flights match your filters"
              description="Try adjusting the price range, airline, or stop filters to see more results."
              action={<button className="btn-secondary" onClick={() => { setAirlines([]); setStopsFilter("any"); setTimeFilter("any"); setMaxPrice(Math.max(...flights.map((f) => f.price), 20000)); }}>Reset filters</button>}
            />
          ) : (
            <div className="space-y-4">
              {filtered.map((f) => (
                <FlightCard key={f.id} flight={f} onSelect={handleSelect} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FiltersPanel({ maxPrice, setMaxPrice, priceCeiling, allAirlines, airlines, toggleAirline, stopsFilter, setStopsFilter, timeFilter, setTimeFilter }) {
  return (
    <div className="card space-y-6 p-5">
      <div>
        <h3 className="text-sm font-semibold text-navy-900">Price</h3>
        <input
          type="range"
          min={1000}
          max={priceCeiling}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="mt-3 w-full accent-cyan-500"
          aria-label="Maximum price"
        />
        <p className="mt-1 text-xs text-neutral-500">Up to {formatINR(maxPrice)}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-navy-900">Airline</h3>
        <div className="mt-2 space-y-1.5">
          {allAirlines.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm text-neutral-600">
              <input type="checkbox" className="accent-cyan-500" checked={airlines.includes(a)} onChange={() => toggleAirline(a)} />
              {a}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-navy-900">Stops</h3>
        <div className="mt-2 space-y-1.5">
          {[
            { id: "any", label: "Any" },
            { id: "nonstop", label: "Non-stop" },
            { id: "1stop", label: "1+ stop" },
          ].map((o) => (
            <label key={o.id} className="flex items-center gap-2 text-sm text-neutral-600">
              <input type="radio" name="stops" className="accent-cyan-500" checked={stopsFilter === o.id} onChange={() => setStopsFilter(o.id)} />
              {o.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-navy-900">Departure time</h3>
        <div className="mt-2 space-y-1.5">
          {[
            { id: "any", label: "Any time" },
            { id: "morning", label: "Morning (5AM–12PM)" },
            { id: "afternoon", label: "Afternoon (12PM–5PM)" },
            { id: "evening", label: "Evening (5PM–9PM)" },
            { id: "night", label: "Night (9PM–5AM)" },
          ].map((o) => (
            <label key={o.id} className="flex items-center gap-2 text-sm text-neutral-600">
              <input type="radio" name="time" className="accent-cyan-500" checked={timeFilter === o.id} onChange={() => setTimeFilter(o.id)} />
              {o.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
