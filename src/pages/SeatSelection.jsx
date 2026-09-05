import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SeatMap from "../components/SeatMap";
import PriceSummary from "../components/PriceSummary";
import BookingStepper from "../components/BookingStepper";
import { useBooking } from "../context/BookingContext";
import { generateSeatMap } from "../data/staticData";
import { formatINR } from "../utils/helpers";

export default function SeatSelection() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useBooking();
  const seats = useMemo(() => generateSeatMap(draft.flight?.id?.length || 7), [draft.flight]);
  const [selectedId, setSelectedId] = useState(draft.seat?.id || null);

  if (!draft.flight || !draft.passenger) {
    return (
      <div className="section py-16 text-center">
        <p className="text-neutral-500">Please complete previous steps first.</p>
        <button className="btn-accent mt-4" onClick={() => navigate("/search")}>Search flights</button>
      </div>
    );
  }

  const selectedSeat = seats.find((s) => s.id === selectedId);

  const handleSelect = (seat) => setSelectedId(seat.id);

  const proceed = () => {
    updateDraft({ seat: selectedSeat });
    navigate("/baggage");
  };

  const items = [
    { label: "Flight fare", value: draft.flight.price },
    selectedSeat ? { label: `Seat ${selectedSeat.id}`, value: selectedSeat.fee } : { label: "Seat", value: 0, muted: true },
  ];
  const total = draft.flight.price + (selectedSeat?.fee || 0);

  return (
    <div className="section py-8">
      <div className="mb-6"><BookingStepper current={3} /></div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="card p-6">
          <h1 className="text-lg font-bold text-navy-900">Choose your seat</h1>
          <p className="mt-1 text-sm text-neutral-500">Tap an available seat on the map below.</p>

          <div className="mt-6">
            <SeatMap seats={seats} selected={selectedId} onSelect={handleSelect} />
          </div>

          {selectedSeat && (
            <div className="alert-info mt-6">
              <div>
                <p className="font-semibold">Seat {selectedSeat.id} selected</p>
                <p className="mt-0.5">Seat fee: {selectedSeat.fee ? formatINR(selectedSeat.fee) : "Free"}</p>
              </div>
            </div>
          )}
        </div>

        <PriceSummary
          items={items}
          total={total}
          ctaLabel="Continue"
          ctaDisabled={!selectedSeat}
          onCta={proceed}
          note={!selectedSeat ? "Select a seat to continue." : undefined}
        />
      </div>
    </div>
  );
}
