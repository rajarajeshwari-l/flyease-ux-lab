import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PlaneTakeoff, PlaneLanding, Clock, Luggage, Wifi, Utensils, Tv, CheckCircle2 } from "lucide-react";
import { getFlightById } from "../data/flights";
import { getAirport } from "../data/airports";
import { useBooking } from "../context/BookingContext";
import { PageLoader, ErrorState } from "../components/States";
import { formatINR, formatDateReadable } from "../utils/helpers";
import BookingStepper from "../components/BookingStepper";

export default function FlightDetails() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { updateDraft } = useBooking();
  const [flight, setFlight] = useState(undefined);

  const searchParams = {
    from: params.get("from"),
    to: params.get("to"),
    date: params.get("departure"),
    travelClass: params.get("travelClass") || "Economy",
  };

  useEffect(() => {
    setFlight(getFlightById(id, searchParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (flight === undefined) return <PageLoader label="Loading flight details…" />;
  if (!flight) return <div className="section py-10"><ErrorState title="Flight not found" description="This flight may have expired. Please search again." /></div>;

  const fromA = getAirport(flight.from);
  const toA = getAirport(flight.to);
  const baseFare = Math.round(flight.price * 0.82);
  const taxes = flight.price - baseFare;

  const proceed = () => {
    updateDraft({ flight, searchParams });
    navigate("/passenger-details");
  };

  return (
    <div className="section py-8">
      <div className="mb-6"><BookingStepper current={1} /></div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-navy-900">{flight.airline}</p>
                <p className="text-xs text-neutral-500">{flight.flightNumber} · {flight.travelClass}</p>
              </div>
              <span className="badge-info">{flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex flex-1 flex-col items-center">
                <PlaneTakeoff className="h-5 w-5 text-cyan-500" />
                <p className="mt-1 text-2xl font-bold text-navy-900">{flight.departureTime}</p>
                <p className="text-sm text-neutral-500">{fromA?.city} ({flight.from})</p>
                <p className="text-xs text-neutral-400">{formatDateReadable(flight.date)}</p>
              </div>
              <div className="flex flex-1 flex-col items-center px-2">
                <p className="flex items-center gap-1 text-xs text-neutral-400"><Clock className="h-3 w-3" /> {flight.duration}</p>
                <div className="my-2 h-px w-full bg-neutral-200" />
              </div>
              <div className="flex flex-1 flex-col items-center">
                <PlaneLanding className="h-5 w-5 text-cyan-500" />
                <p className="mt-1 text-2xl font-bold text-navy-900">
                  {flight.arrivalTime}{flight.arrivesNextDay && <span className="ml-1 align-top text-xs text-cyan-600">+1</span>}
                </p>
                <p className="text-sm text-neutral-500">{toA?.city} ({flight.to})</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-navy-900">Baggage & amenities</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex flex-col items-center gap-1.5 rounded-xl bg-neutral-50 p-3 text-center">
                <Luggage className="h-5 w-5 text-cyan-600" />
                <span className="text-xs text-neutral-600">{flight.baggageKg} kg checked</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl bg-neutral-50 p-3 text-center">
                <Wifi className="h-5 w-5 text-cyan-600" />
                <span className="text-xs text-neutral-600">Wi-Fi onboard</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl bg-neutral-50 p-3 text-center">
                <Utensils className="h-5 w-5 text-cyan-600" />
                <span className="text-xs text-neutral-600">Meal included</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl bg-neutral-50 p-3 text-center">
                <Tv className="h-5 w-5 text-cyan-600" />
                <span className="text-xs text-neutral-600">Entertainment</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-navy-900">Fare rules</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-500" /> Free cancellation within 24 hours of booking.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-500" /> Date change permitted with a fee (demo policy).</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-500" /> Seat and baggage add-ons are non-refundable.</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="card sticky top-20 p-5">
            <h3 className="text-sm font-bold text-navy-900">Price breakdown</h3>
            <div className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-neutral-500">Base fare</span><span className="font-medium text-navy-900">{formatINR(baseFare)}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Taxes & fees</span><span className="font-medium text-navy-900">{formatINR(taxes)}</span></div>
            </div>
            <div className="my-4 h-px bg-neutral-100" />
            <div className="flex justify-between"><span className="font-bold text-navy-900">Total</span><span className="text-xl font-extrabold text-navy-900">{formatINR(flight.price)}</span></div>
            <button onClick={proceed} className="btn-accent mt-5 w-full">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
