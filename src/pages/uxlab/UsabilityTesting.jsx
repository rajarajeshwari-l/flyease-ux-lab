import { AlertTriangle } from "lucide-react";

const TASKS = [
  "Search for a flight",
  "Select a flight",
  "Choose a seat",
  "Complete a booking",
  "Find the airport gate",
  "Check baggage status",
];

export default function UsabilityTesting() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-semibold text-navy-900">Usability testing tasks</h2>
        <p className="mt-2 text-sm text-neutral-600">
          These six tasks form the core usability test script for FlyEase. Each participant is asked to complete
          them unaided while a facilitator observes and notes difficulty.
        </p>
        <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-neutral-600">
          {TASKS.map((t) => <li key={t}>{t}</li>)}
        </ol>
      </div>

      <div className="card p-6">
        <div className="alert-warn mb-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="font-semibold">TESTING RESULTS TEMPLATE — fill this in after running real sessions. No participant data has been fabricated.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-4 py-3">Task</th>
                <th className="px-4 py-3">Participant</th>
                <th className="px-4 py-3">Success</th>
                <th className="px-4 py-3">Difficulty</th>
                <th className="px-4 py-3">Observation</th>
                <th className="px-4 py-3">Improvement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {TASKS.map((t) => (
                <tr key={t}>
                  <td className="px-4 py-3 font-medium text-navy-900">{t}</td>
                  <td className="px-4 py-3 text-neutral-300">—</td>
                  <td className="px-4 py-3 text-neutral-300">—</td>
                  <td className="px-4 py-3 text-neutral-300">—</td>
                  <td className="px-4 py-3 text-neutral-300">—</td>
                  <td className="px-4 py-3 text-neutral-300">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
