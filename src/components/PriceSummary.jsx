import { formatINR } from "../utils/helpers";

export default function PriceSummary({ items = [], total, ctaLabel, onCta, ctaDisabled, note }) {
  return (
    <div className="card sticky top-20 p-5">
      <h3 className="text-sm font-bold text-navy-900">Price Summary</h3>
      <div className="mt-4 space-y-2.5 text-sm">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-neutral-500">{item.label}</span>
            <span className={`font-medium ${item.muted ? "text-neutral-400" : "text-navy-900"}`}>
              {item.value === 0 ? "Free" : formatINR(item.value)}
            </span>
          </div>
        ))}
      </div>
      <div className="my-4 h-px bg-neutral-100" />
      <div className="flex items-center justify-between">
        <span className="font-bold text-navy-900">Total</span>
        <span className="text-xl font-extrabold text-navy-900">{formatINR(total)}</span>
      </div>
      {note && <p className="mt-2 text-xs text-neutral-400">{note}</p>}
      {ctaLabel && (
        <button onClick={onCta} disabled={ctaDisabled} className="btn-accent mt-5 w-full">
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
