import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, Ticket, MapPin } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { getAirport } from "../data/airports";
import { formatINR, formatDateReadable } from "../utils/helpers";
import { ErrorState } from "../components/States";

export default function Confirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBooking } = useBooking();
  const booking = getBooking(id);

  if (!booking) {
    return (
      <div className="section py-16">
        <ErrorState title="Booking not found" description="We couldn't find this booking. Check My Trips for your bookings." />
        <button className="btn-accent mt-4" onClick={() => navigate("/my-trips")}>Go to My Trips</button>
      </div>
    );
  }

  const total = booking.flight.price + booking.seat.fee + booking.baggage.price;
  const fromA = getAirport(booking.flight.from);
  const toA = getAirport(booking.flight.to);

  return (
    <div className="section max-w-2xl py-10">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-50">
          <CheckCircle2 className="h-9 w-9 text-success-500" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-navy-900">Booking confirmed!</h1>
        <p className="mt-1 text-neutral-500">Your booking ID is <span className="font-semibold text-navy-900">{booking.id}</span></p>
      </div>

      <div className="card mt-8 p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Detail label="Passenger" value={`${booking.passenger.firstName} ${booking.passenger.lastName}`} />
          <Detail label="Flight" value={`${booking.flight.airline} · ${booking.flight.flightNumber}`} />
          <Detail label="Route" value={`${fromA?.city} (${booking.flight.from}) → ${toA?.city} (${booking.flight.to})`} />
          <Detail label="Date" value={formatDateReadable(booking.flight.date)} />
          <Detail label="Seat" value={booking.seat.id} />
          <Detail label="Baggage" value={booking.baggage.label} />
          <Detail label="Gate" value={booking.gate} />
          <Detail label="Total paid" value={formatINR(total)} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button onClick={() => navigate(`/boarding-pass/${booking.id}`)} className="btn-accent">
          <Ticket className="h-4 w-4" /> Boarding Pass
        </button>
        <button onClick={() => navigate("/my-trips")} className="btn-secondary">View My Trip</button>
        <button onClick={() => navigate("/airport-assistant")} className="btn-secondary">
          <MapPin className="h-4 w-4" /> Airport Assistant
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-navy-900">{value}</p>
    </div>
  );
}
