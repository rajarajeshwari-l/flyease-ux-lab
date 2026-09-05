import { PlaneTakeoff, Luggage, Users } from "lucide-react";
import { formatINR } from "../utils/helpers";

export default function FlightCard({ flight, onSelect }) {
  return (
    <div className="card flex flex-col gap-4 p-5 transition-shadow hover:shadow-pop sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-navy-900">
          <PlaneTakeoff className="h-4 w-4 text-cyan-500" />
          {flight.airline}
          <span className="text-neutral-400 font-normal">· {flight.flightNumber}</span>
        </div>

        <div className="mt-3 flex items-center gap-4 sm:gap-6">
          <div>
            <p className="text-lg font-bold text-navy-900">{flight.departureTime}</p>
            <p className="text-xs text-neutral-500">{flight.from}</p>
          </div>
          <div className="flex flex-1 flex-col items-center px-1">
            <p className="text-xs text-neutral-400">{flight.duration}</p>
            <div className="my-1 h-px w-full bg-neutral-200 relative">
              <span className="absolute -top-[3px] right-0 h-1.5 w-1.5 rounded-full bg-cyan-500" />
            </div>
            <p className="text-[11px] text-neutral-400">{flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}</p>
          </div>
          <div>
            <p className="text-lg font-bold text-navy-900">
              {flight.arrivalTime}
              {flight.arrivesNextDay && <span className="ml-1 align-top text-[10px] text-cyan-600">+1</span>}
            </p>
            <p className="text-xs text-neutral-500">{flight.to}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1">
            <Luggage className="h-3.5 w-3.5" /> {flight.baggageKg} kg baggage
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {flight.seatsAvailable} seats left
          </span>
          <span className="badge-neutral">{flight.travelClass}</span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2 border-t border-neutral-100 pt-3 sm:border-0 sm:pt-0 sm:text-right">
        <p className="text-2xl font-extrabold text-navy-900">{formatINR(flight.price)}</p>
        <p className="text-[11px] text-neutral-400">per passenger</p>
        <button onClick={() => onSelect(flight)} className="btn-accent w-full sm:w-auto">
          Select Flight
        </button>
      </div>
    </div>
  );
}
