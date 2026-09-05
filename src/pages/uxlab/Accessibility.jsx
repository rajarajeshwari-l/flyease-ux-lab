import { CheckCircle2 } from "lucide-react";

const ITEMS = [
  { label: "Keyboard navigation", detail: "All interactive elements are reachable and operable via Tab / Enter / Space." },
  { label: "Visible focus states", detail: "A clear cyan focus ring appears on every focused element (see global CSS)." },
  { label: "Accessible form labels", detail: "Every input has an associated <label> and aria-describedby for errors." },
  { label: "Good contrast", detail: "Navy-on-white and white-on-navy text pairs meet comfortable contrast ratios." },
  { label: "Readable typography", detail: "Inter typeface with a clear type scale and generous line-height." },
  { label: "Touch-friendly controls", detail: "Buttons and tap targets are sized for comfortable mobile use." },
  { label: "Meaningful errors", detail: "Validation messages explain what's wrong and how to fix it, not just 'invalid'." },
  { label: "Alt text", detail: "Icon-only buttons include aria-label; decorative icons are aria-hidden." },
  { label: "Semantic HTML", detail: "nav, header, main, footer, table and list elements are used appropriately." },
  { label: "Responsive design", detail: "Layouts adapt from mobile to desktop with no horizontal scrolling." },
];

export default function Accessibility() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-semibold text-navy-900">Accessibility checklist</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Accessibility was treated as a baseline requirement, not an afterthought. Each item below is implemented
          in the actual FlyEase codebase wherever practical for this demo.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <div key={item.label} className="card flex items-start gap-3 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success-500" />
            <div>
              <p className="text-sm font-semibold text-navy-900">{item.label}</p>
              <p className="mt-0.5 text-xs text-neutral-500">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
