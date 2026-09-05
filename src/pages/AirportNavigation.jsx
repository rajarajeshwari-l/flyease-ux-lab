import { useState } from "react";
import { MapPin, DoorOpen, Coffee, Utensils, Armchair, Zap, PlaneTakeoff, ShieldCheck, Accessibility } from "lucide-react";
import { airportPOIs, estimateWalk } from "../data/staticData";

const ICONS = {
  entrance: DoorOpen,
  checkin: PlaneTakeoff,
  security: ShieldCheck,
  restroom: Coffee,
  food: Utensils,
  lounge: Armchair,
  charging: Zap,
  gate: MapPin,
};

export default function AirportNavigation() {
  const [from] = useState("entrance");
  const [to, setTo] = useState("gateB");
  const [accessible, setAccessible] = useState(false);

  const walk = estimateWalk(from, to);
  const fromPOI = airportPOIs.find((p) => p.id === from);
  const toPOI = airportPOIs.find((p) => p.id === to);

  return (
    <div className="section py-8">
      <h1 className="text-xl font-bold text-navy-900">Airport Navigation</h1>
      <p className="mt-1 text-sm text-neutral-500">Simulated indoor wayfinding — not real-time GPS.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card p-4 sm:p-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-50">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <line x1="6" y1="50" x2="94" y2="50" stroke="#DDE0E5" strokeWidth="1.2" />
              {airportPOIs.map((p) => {
                const isSelected = p.id === to;
                const isFrom = p.id === from;
                const Icon = ICONS[p.type] || MapPin;
                return (
                  <g key={p.id} onClick={() => p.type === "gate" || p.id !== "entrance" ? setTo(p.id) : null} style={{ cursor: "pointer" }}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isSelected || isFrom ? 3.4 : 2.4}
                      fill={isSelected ? "#1FAFC4" : isFrom ? "#0F1B3C" : "#ffffff"}
                      stroke={isSelected ? "#1FAFC4" : "#C2C7CF"}
                      strokeWidth="0.6"
                    />
                  </g>
                );
              })}
            </svg>
            {airportPOIs.map((p) => (
              <button
                key={p.id}
                onClick={() => setTo(p.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/0 p-1 text-[9px] font-semibold text-neutral-500 hover:text-cyan-600"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                aria-label={`Navigate to ${p.name}`}
              >
                <span className="hidden sm:block">{p.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {airportPOIs.map((p) => {
              const Icon = ICONS[p.type] || MapPin;
              return (
                <button
                  key={p.id}
                  onClick={() => setTo(p.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    to === p.id ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" /> {p.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-bold text-navy-900">Directions</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-neutral-500">From</span><span className="font-medium text-navy-900">{fromPOI?.name}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">To</span><span className="font-medium text-navy-900">{toPOI?.name}</span></div>
          </div>
          <div className="my-4 h-px bg-neutral-100" />
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-neutral-50 p-3">
              <p className="text-xl font-extrabold text-navy-900">{walk.distance} m</p>
              <p className="text-[11px] text-neutral-500">Distance</p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-3">
              <p className="text-xl font-extrabold text-navy-900">{walk.minutes} min</p>
              <p className="text-[11px] text-neutral-500">Walking time</p>
            </div>
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
            <input type="checkbox" className="accent-cyan-500" checked={accessible} onChange={(e) => setAccessible(e.target.checked)} />
            <Accessibility className="h-4 w-4" /> Prefer accessible route
          </label>
          {accessible && (
            <p className="mt-2 text-xs text-neutral-400">Accessible route selected: uses elevators and ramps instead of escalators (simulated).</p>
          )}

          <p className="mt-4 text-[11px] text-neutral-400">Simulated airport navigation for demo purposes — not connected to real GPS.</p>
        </div>
      </div>
    </div>
  );
}
