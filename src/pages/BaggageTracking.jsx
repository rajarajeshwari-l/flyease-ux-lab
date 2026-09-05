import { CheckCircle2, Circle, MapPin } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { EmptyState } from "../components/States";
import { useNavigate } from "react-router-dom";

const STAGES = [
  { id: "checkedin", label: "Checked In" },
  { id: "security", label: "Security Cleared" },
  { id: "loaded", label: "Loaded" },
  { id: "transit", label: "In Transit" },
  { id: "ready", label: "Ready for Pickup" },
];

export default function BaggageTracking() {
  const { bookings } = useBooking();
  const navigate = useNavigate();
  const upcoming = bookings.find((b) => b.status === "upcoming");

  if (!upcoming) {
    return (
      <div className="section py-16">
        <EmptyState
          icon={MapPin}
          title="No baggage to track"
          description="Complete a booking to see simulated baggage tracking here."
          action={<button className="btn-accent" onClick={() => navigate("/search")}>Search Flights</button>}
        />
      </div>
    );
  }

  const currentIndex = 3; // demo: "In Transit"

  return (
    <div className="section max-w-2xl py-8">
      <h1 className="text-xl font-bold text-navy-900">Baggage Tracking</h1>
      <p className="mt-1 text-sm text-neutral-500">Simulated tracking — not connected to real airline baggage systems.</p>

      <div className="card mt-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Baggage ID</p>
            <p className="text-lg font-bold text-navy-900">{upcoming.baggageId}</p>
          </div>
          <span className="badge-info">{upcoming.baggage.label}</span>
        </div>

        <ol className="mt-8 space-y-6">
          {STAGES.map((s, i) => {
            const done = i < currentIndex;
            const active = i === currentIndex;
            return (
              <li key={s.id} className="flex items-center gap-3">
                {done || active ? (
                  <CheckCircle2 className={`h-5 w-5 ${active ? "text-cyan-500" : "text-success-500"}`} />
                ) : (
                  <Circle className="h-5 w-5 text-neutral-300" />
                )}
                <span className={`text-sm font-medium ${done ? "text-navy-900" : active ? "text-cyan-700" : "text-neutral-400"}`}>
                  {s.label} {active && "●"} {i > currentIndex && "○"}
                </span>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 text-[11px] text-neutral-400">SIMULATED TRACKING — demo data updates are illustrative only.</p>
      </div>
    </div>
  );
}
