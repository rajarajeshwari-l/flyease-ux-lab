import { useState } from "react";
import { UploadCloud, Smartphone, Tablet, Monitor } from "lucide-react";

const PRINCIPLES = ["Simplicity", "Hierarchy", "Alignment", "Consistency", "Spacing", "Grouping", "Navigation", "Responsiveness"];

function Wireframe({ title, blocks }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
      <p className="mb-2 text-xs font-semibold text-neutral-500">{title}</p>
      <div className="space-y-1.5">
        {blocks.map((h, i) => (
          <div key={i} className="rounded bg-neutral-200" style={{ height: h }} />
        ))}
      </div>
    </div>
  );
}

const WIREFRAMES = {
  Home: [24, 60, 16, 16, 16, 40],
  "Flight Search": [20, 32, 32, 32, 20],
  "Flight Results": [20, 50, 50, 50],
  "Seat Selection": [20, 120, 16],
};

export default function Sketches() {
  const [device, setDevice] = useState("desktop");
  const [uploaded, setUploaded] = useState(null);

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-semibold text-navy-900">Design evolution</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-navy-900">
          <span className="rounded-full bg-neutral-100 px-4 py-2">Hand Sketch</span>
          <span className="text-neutral-300">→</span>
          <span className="rounded-full bg-neutral-100 px-4 py-2">Low-Fidelity Wireframe</span>
          <span className="text-neutral-300">→</span>
          <span className="rounded-full bg-navy-900 px-4 py-2 text-white">High-Fidelity UI</span>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-navy-900">Hand sketch (upload your own)</h3>
        <p className="mt-1 text-sm text-neutral-500">
          This area is intentionally left as a placeholder. Replace it with a photo of your own paper sketch —
          do not present a generated image as a hand sketch.
        </p>
        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 py-10 text-neutral-400 hover:border-cyan-400 hover:text-cyan-600">
          {uploaded ? (
            <img src={uploaded} alt="Uploaded hand sketch" className="max-h-64 rounded-lg object-contain" />
          ) : (
            <>
              <UploadCloud className="h-8 w-8" />
              <span className="text-sm font-medium">Click to upload your paper sketch</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setUploaded(URL.createObjectURL(file));
            }}
          />
        </label>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-navy-900">Low-fidelity wireframes</h3>
        <p className="mt-1 text-sm text-neutral-500">Simplified block layouts for key screens, before visual styling was applied.</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Object.entries(WIREFRAMES).map(([title, blocks]) => (
            <Wireframe key={title} title={title} blocks={blocks} />
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-navy-900">Sketching principles applied</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRINCIPLES.map((p) => (
            <span key={p} className="badge-info">{p}</span>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-navy-900">Responsive design demonstration</h3>
        <p className="mt-1 text-sm text-neutral-500">The same Flight Results interface rearranges across breakpoints.</p>
        <div className="mt-4 flex gap-2">
          {[
            { id: "mobile", icon: Smartphone, label: "Mobile" },
            { id: "tablet", icon: Tablet, label: "Tablet" },
            { id: "desktop", icon: Monitor, label: "Desktop" },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDevice(d.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                device === d.id ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-neutral-200 text-neutral-600"
              }`}
            >
              <d.icon className="h-3.5 w-3.5" /> {d.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <div
            className={`rounded-xl border border-neutral-200 bg-neutral-50 p-3 transition-all ${
              device === "mobile" ? "w-[220px]" : device === "tablet" ? "w-[420px]" : "w-full"
            }`}
          >
            <div className={`grid gap-2 ${device === "desktop" ? "grid-cols-[120px_1fr]" : "grid-cols-1"}`}>
              {device === "desktop" && <div className="h-40 rounded-lg bg-neutral-200" />}
              <div className="space-y-2">
                <div className="h-6 rounded bg-neutral-200" />
                <div className="h-16 rounded bg-neutral-200" />
                <div className="h-16 rounded bg-neutral-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
