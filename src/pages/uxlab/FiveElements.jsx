import { useState } from "react";
import { ChevronDown } from "lucide-react";

const LAYERS = [
  {
    id: "strategy",
    name: "Strategy",
    color: "bg-navy-900",
    summary: "Problem, user goals and business goals.",
    detail:
      "Air travel is stressful because passengers juggle separate tools for booking, navigating the airport and tracking baggage. FlyEase's strategy is to unify these into one calm, guided experience. User goal: reach the gate on time with minimal confusion. Business goal (for this coursework): demonstrate a complete, evidence-based UX process end-to-end.",
  },
  {
    id: "scope",
    name: "Scope",
    color: "bg-navy-800",
    summary: "Features and content requirements.",
    detail:
      "Scope defines what FlyEase actually does: flight search, results filtering, booking (passenger details, seats, baggage, payment), a digital boarding pass, My Trips, airport navigation, live-style baggage tracking, a notification centre and FlyBot assistant. Anything outside this list — e.g. real payments or live flight data — is explicitly out of scope for the demo.",
  },
  {
    id: "structure",
    name: "Structure",
    color: "bg-navy-700",
    summary: "Information architecture and interaction flow.",
    detail:
      "Structure organizes scope into a navigable system: a top-level nav (Home, Flights, My Trips, Airport, Baggage, FlyBot, UX Lab, Profile) and a linear booking flow (Search → Results → Details → Passenger → Seat → Baggage → Payment → Confirmation → Boarding Pass). The stepper component keeps the booking structure visible at every step.",
  },
  {
    id: "skeleton",
    name: "Skeleton",
    color: "bg-cyan-600",
    summary: "Layout, wireframes and navigation placement.",
    detail:
      "Skeleton is the concrete arrangement of interface elements: card-based layouts, a persistent stepper for booking, a sidebar for filters and price summaries, and a bottom navigation bar on mobile. See the Sketches & Wireframes tab for low-fidelity layouts of key screens.",
  },
  {
    id: "surface",
    name: "Surface",
    color: "bg-cyan-500",
    summary: "Visual design: color, typography, icons.",
    detail:
      "Surface is the sensory layer users actually see: a deep navy and cyan palette, Inter typography, consistent cards, buttons and badges. See the Design System tab for the full visual language used throughout FlyEase.",
  },
];

export default function FiveElements() {
  const [open, setOpen] = useState("strategy");

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-semibold text-navy-900">The five elements of UX (Jesse James Garrett)</h2>
        <p className="mt-2 text-sm text-neutral-600">
          FlyEase was designed bottom-up: abstract decisions (strategy) shape scope, which shapes structure, which
          shapes skeleton, which is finally expressed as surface. Click each layer to see how it applies to FlyEase.
        </p>
      </div>

      <div className="space-y-2">
        {LAYERS.map((layer) => {
          const isOpen = open === layer.id;
          return (
            <div key={layer.id} className="overflow-hidden rounded-2xl border border-neutral-100">
              <button
                onClick={() => setOpen(isOpen ? null : layer.id)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between px-5 py-4 text-left text-white transition-colors ${layer.color}`}
              >
                <div>
                  <p className="font-bold">{layer.name}</p>
                  <p className="text-xs text-white/70">{layer.summary}</p>
                </div>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="animate-slideUp bg-white p-5 text-sm text-neutral-600">
                  {layer.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
