const COLORS = [
  { name: "Navy 900", cls: "bg-navy-900", value: "#0F1B3C" },
  { name: "Cyan 500", cls: "bg-cyan-500", value: "#1FAFC4" },
  { name: "Neutral 100", cls: "bg-neutral-100", value: "#ECEEF1" },
  { name: "Success 500", cls: "bg-success-500", value: "#1E9E52" },
  { name: "Warn 500", cls: "bg-warn-500", value: "#C2790C" },
  { name: "Danger 500", cls: "bg-danger-500", value: "#D14343" },
];

export default function DesignSystem() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-semibold text-navy-900">Design system</h2>
        <p className="mt-2 text-sm text-neutral-600">This is the same visual language used across the entire FlyEase product — not a separate style guide.</p>
      </div>

      <div className="card p-6">
        <h3 className="mb-3 font-semibold text-navy-900">Colors</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {COLORS.map((c) => (
            <div key={c.name}>
              <div className={`h-14 rounded-lg ${c.cls}`} />
              <p className="mt-1.5 text-xs font-medium text-navy-900">{c.name}</p>
              <p className="text-[11px] text-neutral-400">{c.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="mb-3 font-semibold text-navy-900">Typography</h3>
        <div className="space-y-2">
          <p className="text-3xl font-extrabold text-navy-900">Heading 1 — Inter Extrabold</p>
          <p className="text-xl font-bold text-navy-900">Heading 2 — Inter Bold</p>
          <p className="text-base font-semibold text-navy-900">Heading 3 — Inter Semibold</p>
          <p className="text-sm text-neutral-600">Body text — Inter Regular, used for paragraphs and descriptions.</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Label / eyebrow text</p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="mb-3 font-semibold text-navy-900">Buttons</h3>
        <div className="flex flex-wrap gap-3">
          <button className="btn-primary">Primary</button>
          <button className="btn-accent">Accent</button>
          <button className="btn-secondary">Secondary</button>
          <button className="btn-ghost">Ghost</button>
          <button className="btn-danger">Danger</button>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="mb-3 font-semibold text-navy-900">Inputs</h3>
        <div className="max-w-xs space-y-3">
          <input className="input-field" placeholder="Default input" />
          <input className="input-field input-field-error" placeholder="Error input" />
        </div>
      </div>

      <div className="card p-6">
        <h3 className="mb-3 font-semibold text-navy-900">Badges & alerts</h3>
        <div className="flex flex-wrap gap-2">
          <span className="badge-success">Success</span>
          <span className="badge-warn">Warning</span>
          <span className="badge-danger">Danger</span>
          <span className="badge-info">Info</span>
          <span className="badge-neutral">Neutral</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="alert-success">Success alert message</div>
          <div className="alert-warn">Warning alert message</div>
          <div className="alert-danger">Danger alert message</div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="mb-3 font-semibold text-navy-900">Spacing scale</h3>
        <div className="flex items-end gap-2">
          {[2, 4, 6, 8, 12, 16].map((s) => (
            <div key={s} className="flex flex-col items-center gap-1">
              <div className="bg-cyan-500" style={{ width: 16, height: s * 4 }} />
              <span className="text-[10px] text-neutral-400">{s * 4}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
