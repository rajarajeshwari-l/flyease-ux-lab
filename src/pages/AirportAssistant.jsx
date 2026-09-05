import { CheckCircle2, Circle, MapPin } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { estimateWalk } from "../data/staticData";
import { EmptyState } from "../components/States";
import { useNavigate } from "react-router-dom";

const STAGES = [
  { id: "checkin", label: "Check-in", desc: "Complete check-in at the counter or kiosk." },
  { id: "security", label: "Security", desc: "Proceed through the security checkpoint." },
  { id: "gate", label: "Gate", desc: "Head to your departure gate." },
  { id: "boarding", label: "Boarding", desc: "Board the aircraft when called." },
];

export default function AirportAssistant() {
  const { bookings } = useBooking();
  const navigate = useNavigate();
  const upcoming = bookings.find((b) => b.status === "upcoming");

  if (!upcoming) {
    return (
      <div className="section py-16">
        <EmptyState
          icon={MapPin}
          title="No upcoming trip"
          description="Book a flight to see your live airport journey here."
          action={<button className="btn-accent" onClick={() => navigate("/search")}>Search Flights</button>}
        />
      </div>
    );
  }

  const walk = estimateWalk("entrance", "gateB");
  const activeIndex = 1; // demo: currently at security

  return (
    <div className="section max-w-3xl py-8">
      <h1 className="text-xl font-bold text-navy-900">Airport Assistant</h1>
      <p className="mt-1 text-sm text-neutral-500">Live-style journey guidance for booking {upcoming.id} (simulated).</p>

      <div className="card mt-6 p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Gate" value={upcoming.gate} />
          <Stat label="Walking distance" value={`${walk.distance} m`} />
          <Stat label="Walking time" value={`${walk.minutes} min`} />
          <Stat label="Boarding time" value={upcoming.flight.departureTime} />
        </div>
        <p className="mt-4 text-xs text-neutral-400">Terminal 2 · This is simulated guidance, not live airport data.</p>
      </div>

      <div className="card mt-6 p-6">
        <h2 className="mb-6 font-semibold text-navy-900">Your journey</h2>
        <ol className="space-y-0">
          {STAGES.map((s, i) => {
            const done = i < activeIndex;
            const active = i === activeIndex;
            return (
              <li key={s.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {done ? (
                    <CheckCircle2 className="h-6 w-6 text-success-500" />
                  ) : (
                    <Circle className={`h-6 w-6 ${active ? "text-cyan-500" : "text-neutral-300"}`} fill={active ? "#EEFBFC" : "none"} />
                  )}
                  {i < STAGES.length - 1 && <div className={`w-0.5 flex-1 ${done ? "bg-success-500" : "bg-neutral-200"}`} style={{ minHeight: 32 }} />}
                </div>
                <div className="pb-8">
                  <p className={`font-semibold ${active ? "text-cyan-700" : "text-navy-900"}`}>{s.label}{active && " · In progress"}</p>
                  <p className="text-sm text-neutral-500">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-neutral-50 p-3 text-center">
      <p className="text-lg font-extrabold text-navy-900">{value}</p>
      <p className="text-[11px] text-neutral-500">{label}</p>
    </div>
  );
}
