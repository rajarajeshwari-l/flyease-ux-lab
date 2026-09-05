import { AlertTriangle } from "lucide-react";

const METHODS = [
  { name: "User Interviews", purpose: "Understand goals, motivations and frustrations in the traveler's own words.", usage: "Used to uncover why passengers fear missing gates and juggle multiple travel apps." },
  { name: "Surveys", purpose: "Collect quantitative data from a larger sample quickly.", usage: "Used to rank the most requested features and biggest pain points across many travelers." },
  { name: "Observation", purpose: "Watch real behaviour rather than relying on self-reports.", usage: "Used to observe how travelers actually navigate an airport and where they hesitate." },
  { name: "Usability Testing", purpose: "Evaluate whether people can complete key tasks with the interface.", usage: "Used to test the booking flow, seat selection and airport navigation prototype." },
  { name: "Competitive Analysis", purpose: "Learn from existing airline and travel apps' strengths and weaknesses.", usage: "Used to benchmark FlyEase's booking flow against major airline apps." },
  { name: "Personas", purpose: "Turn research into a memorable, decision-guiding user archetype.", usage: "Used to keep design decisions grounded in a specific traveler's needs (see Persona tab)." },
  { name: "Journey Mapping", purpose: "Visualize the end-to-end experience, including emotions at each stage.", usage: "Used to spot the most stressful moments in the airport journey (see Journey Map tab)." },
];

const TOOLS = ["Google Forms", "Figma", "FigJam", "Miro", "Google Meet / Zoom"];

const METRICS = [
  { label: "Participants", value: "—", placeholder: true },
  { label: "Top Pain Point", value: "—", placeholder: true },
  { label: "Booking Difficulty", value: "—", placeholder: true },
  { label: "Airport Navigation Difficulty", value: "—", placeholder: true },
  { label: "Baggage Concern", value: "—", placeholder: true },
  { label: "Most Requested Feature", value: "—", placeholder: true },
];

export default function Research() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-semibold text-navy-900">UX research methods and tools</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Good research combines qualitative methods (interviews, observation) with quantitative ones (surveys) to
          both understand "why" and measure "how many". FlyEase's research plan uses the following methods and tools.
        </p>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-5 py-3">Method</th>
              <th className="px-5 py-3">Purpose</th>
              <th className="px-5 py-3">How FlyEase uses it</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {METHODS.map((m) => (
              <tr key={m.name}>
                <td className="px-5 py-3.5 font-semibold text-navy-900">{m.name}</td>
                <td className="px-5 py-3.5 text-neutral-600">{m.purpose}</td>
                <td className="px-5 py-3.5 text-neutral-600">{m.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-navy-900">Research tools</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOOLS.map((t) => (
            <span key={t} className="badge-neutral">{t}</span>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <div className="alert-warn mb-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="font-semibold">RESEARCH PLAN / DEMO DATA — these metrics are placeholders until real research results are entered.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {METRICS.map((m) => (
            <div key={m.label} className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center">
              <p className="text-2xl font-extrabold text-neutral-300">{m.value}</p>
              <p className="mt-1 text-xs text-neutral-500">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
