const STAGES = [
  { stage: "Search", action: "Enters origin, destination and dates.", pain: "Unsure which airports serve nearby cities.", emotion: "Curious", solution: "Simple dropdowns with recognizable city names and codes." },
  { stage: "Compare", action: "Reviews flight options by price and time.", pain: "Too many similar options to compare manually.", emotion: "Overwhelmed", solution: "Working filters and sort by price, duration and departure time." },
  { stage: "Book", action: "Enters passenger details, seat and baggage.", pain: "Long forms with unclear required fields.", emotion: "Impatient", solution: "Inline validation and a visible progress stepper." },
  { stage: "Check-in", action: "Confirms booking and receives boarding pass.", pain: "Worry about losing a paper ticket.", emotion: "Relieved", solution: "Digital boarding pass saved to My Trips at all times." },
  { stage: "Reach Airport", action: "Travels to the airport.", pain: "Uncertainty about how early to arrive.", emotion: "Anxious", solution: "Airport Assistant shows recommended arrival and journey stages." },
  { stage: "Find Gate", action: "Navigates from entrance to the departure gate.", pain: "Airports are large and signage is inconsistent.", emotion: "Stressed", solution: "Simulated Airport Navigation map with distance and walking time." },
  { stage: "Board", action: "Waits for and boards the flight.", pain: "Missing boarding announcements.", emotion: "Alert", solution: "Notification centre for gate changes and boarding calls." },
  { stage: "Collect Baggage", action: "Waits for checked baggage after landing.", pain: "No visibility into baggage status.", emotion: "Uncertain", solution: "Baggage Tracking page with simulated status stages." },
];

export default function JourneyMap() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-semibold text-navy-900">End-to-end user journey</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Mapping the full journey — not just the booking flow — reveals that most passenger anxiety happens
          <em> after</em> booking: reaching the airport, finding the gate and waiting for baggage. This directly
          shaped FlyEase's scope to include Airport Assistant, Navigation and Baggage Tracking.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {STAGES.map((s, i) => (
          <div key={s.stage} className="w-64 shrink-0 card p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-[11px] font-bold text-white">{i + 1}</span>
              <h3 className="font-semibold text-navy-900">{s.stage}</h3>
            </div>
            <dl className="mt-3 space-y-2 text-xs">
              <div><dt className="font-semibold text-neutral-400">User action</dt><dd className="text-neutral-600">{s.action}</dd></div>
              <div><dt className="font-semibold text-neutral-400">Pain point</dt><dd className="text-neutral-600">{s.pain}</dd></div>
              <div><dt className="font-semibold text-neutral-400">Emotion</dt><dd><span className="badge-warn">{s.emotion}</span></dd></div>
              <div><dt className="font-semibold text-neutral-400">FlyEase solution</dt><dd className="text-neutral-600">{s.solution}</dd></div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
