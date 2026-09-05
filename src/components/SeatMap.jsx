import { formatINR } from "../utils/helpers";

const COLS = ["A", "B", "C", "D", "E", "F"];

export default function SeatMap({ seats, selected, onSelect }) {
  const rows = Array.from(new Set(seats.map((s) => s.row))).sort((a, b) => a - b);

  return (
    <div>
      <div className="mx-auto max-w-sm">
        <div className="mb-4 flex items-center justify-center gap-2 rounded-t-3xl border border-b-0 border-neutral-200 bg-neutral-50 py-3 text-xs font-semibold text-neutral-500">
          NOSE
        </div>
        <div className="max-h-[420px] overflow-y-auto rounded-b-2xl border border-t-0 border-neutral-200 p-3">
          {rows.map((row) => (
            <div key={row} className="mb-1.5 flex items-center justify-center gap-1.5">
              <span className="w-5 text-right text-[11px] text-neutral-400">{row}</span>
              {COLS.map((col, i) => {
                const seat = seats.find((s) => s.row === row && s.col === col);
                const isSelected = selected === seat.id;
                return (
                  <div key={col} className="flex items-center">
                    {i === 3 && <span className="mx-1 w-2" />}
                    <button
                      type="button"
                      disabled={seat.occupied}
                      onClick={() => onSelect(seat)}
                      aria-label={`Seat ${seat.id}${seat.occupied ? ", occupied" : isSelected ? ", selected" : ", available"}${
                        seat.fee ? `, fee ${formatINR(seat.fee)}` : ""
                      }`}
                      aria-pressed={isSelected}
                      className={`flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-semibold transition-colors ${
                        seat.occupied
                          ? "cursor-not-allowed bg-neutral-200 text-neutral-400"
                          : isSelected
                          ? "bg-cyan-500 text-white ring-2 ring-cyan-500 ring-offset-1"
                          : seat.fee > 0
                          ? "bg-cyan-50 text-cyan-700 hover:bg-cyan-100"
                          : "bg-success-50 text-success-600 hover:bg-success-100"
                      }`}
                    >
                      {col}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded bg-success-50 ring-1 ring-success-200" /> Available
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded bg-cyan-50 ring-1 ring-cyan-200" /> Extra legroom / fee
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded bg-cyan-500" /> Selected
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded bg-neutral-200" /> Occupied
        </span>
      </div>
    </div>
  );
}
