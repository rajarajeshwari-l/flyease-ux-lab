import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, MapPin, ChevronRight, PlaneTakeoff } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { getAirport } from "../data/airports";
import { formatDateReadable } from "../utils/helpers";
import { EmptyState } from "../components/States";

const TABS = ["upcoming", "completed", "cancelled"];

export default function MyTrips() {
  const { bookings, updateBookingStatus } = useBooking();
  const navigate = useNavigate();
  const [tab, setTab] = useState("upcoming");

  const filtered = bookings.filter((b) => (b.status || "upcoming") === tab);

  return (
    <div className="section py-8">
      <h1 className="text-xl font-bold text-navy-900">My Trips</h1>
      <p className="mt-1 text-sm text-neutral-500">Bookings saved on this device.</p>

      <div className="mt-6 flex gap-2 border-b border-neutral-200">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-2.5 text-sm font-semibold capitalize transition-colors ${
              tab === t ? "border-cyan-500 text-navy-900" : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState
            icon={PlaneTakeoff}
            title={`No ${tab} trips`}
            description={tab === "upcoming" ? "Book a flight to see it appear here." : `You have no ${tab} trips yet.`}
            action={tab === "upcoming" && <button className="btn-accent" onClick={() => navigate("/search")}>Search Flights</button>}
          />
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => {
              const fromA = getAirport(b.flight.from);
              const toA = getAirport(b.flight.to);
              return (
                <div key={b.id} className="card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-cyan-600">{b.id}</p>
                      <p className="mt-1 text-base font-bold text-navy-900">
                        {fromA?.city} ({b.flight.from}) <ChevronRight className="inline h-4 w-4 text-neutral-300" /> {toA?.city} ({b.flight.to})
                      </p>
                      <p className="text-sm text-neutral-500">
                        {formatDateReadable(b.flight.date)} · {b.flight.airline} {b.flight.flightNumber} · Seat {b.seat.id}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => navigate(`/confirmation/${b.id}`)} className="btn-secondary text-xs">View Details</button>
                      <button onClick={() => navigate(`/boarding-pass/${b.id}`)} className="btn-secondary text-xs"><Ticket className="h-3.5 w-3.5" /> Boarding Pass</button>
                      <button onClick={() => navigate("/airport-assistant")} className="btn-secondary text-xs"><MapPin className="h-3.5 w-3.5" /> Assistant</button>
                      {tab === "upcoming" && (
                        <button onClick={() => updateBookingStatus(b.id, "cancelled")} className="btn-ghost text-xs text-danger-500">Cancel</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
