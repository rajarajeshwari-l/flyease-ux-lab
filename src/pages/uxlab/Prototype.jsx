import { Link } from "react-router-dom";
import { Lightbulb, Users, Wrench, FlaskConical, Repeat, ShieldCheck } from "lucide-react";

const FLOW = ["Home", "Search", "Results", "Flight Details", "Passenger", "Seat", "Baggage", "Payment", "Confirmation", "Boarding Pass"];

const BENEFITS = [
  { icon: Lightbulb, title: "Ideation", text: "Turns abstract ideas into something clickable, making it easier to spot better solutions early." },
  { icon: Users, title: "Collaboration", text: "Gives stakeholders a shared, concrete artifact to discuss instead of describing screens in words." },
  { icon: Wrench, title: "Problem Solving", text: "Surfaces real interaction problems (e.g. confusing seat selection) before they become expensive to fix." },
  { icon: FlaskConical, title: "Early Testing", text: "Lets real users attempt real tasks, producing evidence rather than opinions." },
  { icon: Repeat, title: "Iteration", text: "Makes it cheap to change flows, layouts and copy based on what testing reveals." },
  { icon: ShieldCheck, title: "Reducing Development Risk", text: "Catches usability issues before expensive engineering work is committed." },
];

export default function Prototype() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-semibold text-navy-900">This website is the working prototype</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Rather than a static click-through mockup, FlyEase is built as a functioning high-fidelity prototype with
          real interaction logic — filtering, seat selection, form validation and local data persistence — so it
          can be tested the same way a shipped product would be.
        </p>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-navy-900">Prototype flow</h3>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {FLOW.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-navy-900">{s}</span>
              {i < FLOW.length - 1 && <span className="text-neutral-300">↓</span>}
            </div>
          ))}
        </div>
        <Link to="/search" className="btn-accent mt-5 inline-flex">Try the live prototype</Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b) => (
          <div key={b.title} className="card p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
              <b.icon className="h-4.5 w-4.5" />
            </div>
            <h3 className="mt-3 font-semibold text-navy-900">{b.title}</h3>
            <p className="mt-1.5 text-sm text-neutral-600">{b.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
