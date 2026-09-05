import { useNavigate, useParams } from "react-router-dom";
import { PlaneTakeoff, Printer, Download } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { getAirport } from "../data/airports";
import { formatDateReadable } from "../utils/helpers";
import { ErrorState } from "../components/States";

function DemoBarcode({ value }) {
  // Deterministic pseudo-barcode purely for visual demo purposes.
  const bars = Array.from(value).map((c) => c.charCodeAt(0) % 4 + 1);
  return (
    <svg viewBox={`0 0 ${bars.length * 4} 40`} className="h-10 w-full" preserveAspectRatio="none" aria-hidden="true">
      {bars.map((w, i) => (
        <rect key={i} x={i * 4} y="0" width={w} height="40" fill="#0F1B3C" />
      ))}
    </svg>
  );
}

export default function BoardingPass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBooking } = useBooking();
  const booking = getBooking(id);

  if (!booking) {
    return (
      <div className="section py-16">
        <ErrorState title="Boarding pass not found" description="Check My Trips to find your bookings." />
        <button className="btn-accent mt-4" onClick={() => navigate("/my-trips")}>Go to My Trips</button>
      </div>
    );
  }

  const fromA = getAirport(booking.flight.from);
  const toA = getAirport(booking.flight.to);
  const boardingTime = (() => {
    const [h, m] = booking.flight.departureTime.split(":").map(Number);
    const total = (h * 60 + m - 40 + 1440) % 1440;
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  })();

  const download = () => {
    const content = `FLYEASE DEMO BOARDING PASS\nPassenger: ${booking.passenger.firstName} ${booking.passenger.lastName}\nFlight: ${booking.flight.flightNumber}\nFrom: ${fromA?.city} (${booking.flight.from})\nTo: ${toA?.city} (${booking.flight.to})\nDate: ${formatDateReadable(booking.flight.date)}\nDeparture: ${booking.flight.departureTime}\nGate: ${booking.gate}\nSeat: ${booking.seat.id}\nBoarding time: ${boardingTime}\nBooking ID: ${booking.id}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FlyEase-BoardingPass-${booking.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="section max-w-xl py-10 print:py-0">
      <div className="mb-4 flex justify-end gap-2 print:hidden">
        <button onClick={() => window.print()} className="btn-secondary"><Printer className="h-4 w-4" /> Print</button>
        <button onClick={download} className="btn-secondary"><Download className="h-4 w-4" /> Download</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-pop">
        <div className="flex items-center justify-between bg-navy-900 px-6 py-4 text-white">
          <div className="flex items-center gap-2 font-extrabold">
            <PlaneTakeoff className="h-5 w-5 text-cyan-400" /> FLYEASE
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide">DEMO BOARDING PASS</span>
        </div>

        <div className="grid grid-cols-2 gap-5 p-6">
          <Field label="Passenger" value={`${booking.passenger.firstName} ${booking.passenger.lastName}`} span />
          <Field label="Flight" value={`${booking.flight.airline} · ${booking.flight.flightNumber}`} span />
          <Field label="From" value={`${fromA?.city} (${booking.flight.from})`} />
          <Field label="To" value={`${toA?.city} (${booking.flight.to})`} />
          <Field label="Date" value={formatDateReadable(booking.flight.date)} />
          <Field label="Departure" value={booking.flight.departureTime} />
          <Field label="Gate" value={booking.gate} />
          <Field label="Seat" value={booking.seat.id} />
          <Field label="Boarding time" value={boardingTime} span />
        </div>

        <div className="border-t border-dashed border-neutral-200 p-6">
          <DemoBarcode value={booking.id} />
          <p className="mt-2 text-center text-[11px] tracking-widest text-neutral-400">{booking.id} — SIMULATED, NOT A REAL TICKET</p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, span }) {
  return (
    <div className={span ? "col-span-2" : ""}>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
      <p className="mt-0.5 text-base font-bold text-navy-900">{value}</p>
    </div>
  );
}
