const STAGES = ["Research", "Define", "Ideate", "Sketch", "Wireframe", "Prototype", "Test", "Improve"];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-semibold text-navy-900">A user-centered design process</h2>
        <p className="mt-2 text-sm text-neutral-600">
          FlyEase was designed by following a repeatable, user-centered design process rather than jumping straight
          to a visual interface. Each stage below feeds the next, and the loop back from Test to Improve keeps the
          product evolving based on evidence rather than assumption.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {STAGES.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs font-semibold text-navy-900">
                {s}
              </span>
              {i < STAGES.length - 1 && <span className="text-neutral-300">→</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900">Why this matters for FlyEase</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Airport travel involves stress, time pressure and unfamiliar environments. A structured UX process
            helps surface real pain points — like fear of missing a gate — before any screen is designed, so
            the interface solves problems users actually have.
          </p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900">How to use this section</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Use the left navigation to move through each part of the assignment: the five elements of UX, research
            methods, persona and journey mapping, sketches and wireframes, the prototype itself (this working site),
            interaction patterns, usability testing, accessibility and the design system.
          </p>
        </div>
      </div>
    </div>
  );
}
