import { useState } from "react";
import Overview from "./uxlab/Overview";
import FiveElements from "./uxlab/FiveElements";
import Research from "./uxlab/Research";
import Persona from "./uxlab/Persona";
import JourneyMap from "./uxlab/JourneyMap";
import Sketches from "./uxlab/Sketches";
import Prototype from "./uxlab/Prototype";
import InteractionPatterns from "./uxlab/InteractionPatterns";
import UsabilityTesting from "./uxlab/UsabilityTesting";
import Accessibility from "./uxlab/Accessibility";
import DesignSystem from "./uxlab/DesignSystem";

const TABS = [
  { id: "overview", label: "UX Lab Overview", Component: Overview },
  { id: "elements", label: "Five UX Elements", Component: FiveElements },
  { id: "research", label: "UX Research", Component: Research },
  { id: "persona", label: "Persona", Component: Persona },
  { id: "journey", label: "Journey Map", Component: JourneyMap },
  { id: "sketches", label: "Sketches & Wireframes", Component: Sketches },
  { id: "prototype", label: "Prototype", Component: Prototype },
  { id: "patterns", label: "Interaction Patterns", Component: InteractionPatterns },
  { id: "testing", label: "Usability Testing", Component: UsabilityTesting },
  { id: "accessibility", label: "Accessibility", Component: Accessibility },
  { id: "design-system", label: "Design System", Component: DesignSystem },
];

export default function UXLab() {
  const [active, setActive] = useState("overview");
  const Active = TABS.find((t) => t.id === active)?.Component || Overview;

  return (
    <div className="section py-8">
      <div className="mb-6">
        <p className="text-xs font-semibold text-cyan-600">ASSIGNMENT 2 · UI &amp; UX DESIGN</p>
        <h1 className="mt-1 text-2xl font-bold text-navy-900">UX Lab</h1>
        <p className="mt-1 max-w-2xl text-sm text-neutral-500">
          A living case study showing how FlyEase was researched, structured, sketched, prototyped and tested —
          all inside the working product itself.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <nav aria-label="UX Lab sections" className="shrink-0 lg:w-56">
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {TABS.map((t) => (
              <li key={t.id} className="shrink-0">
                <button
                  onClick={() => setActive(t.id)}
                  className={`w-full whitespace-nowrap rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                    active === t.id ? "bg-navy-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                  aria-current={active === t.id ? "page" : undefined}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 flex-1 animate-fadeIn">
          <Active />
        </div>
      </div>
    </div>
  );
}
