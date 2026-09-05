const PATTERNS = [
  { pattern: "Search", example: "Origin/destination + date search card", purpose: "Let users specify intent quickly with minimal fields.", used: "Home, Flight Search" },
  { pattern: "Filter", example: "Price, airline, stops, time filters", purpose: "Narrow large result sets to relevant options.", used: "Flight Results" },
  { pattern: "Sort", example: "Recommended / Cheapest / Fastest / Earliest", purpose: "Reorder results by the criteria that matters most to the user.", used: "Flight Results" },
  { pattern: "Forms", example: "Passenger details, payment fields", purpose: "Collect structured information with inline validation.", used: "Passenger Details, Payment" },
  { pattern: "Buttons", example: "Primary / secondary / ghost / danger buttons", purpose: "Signal action importance and hierarchy consistently.", used: "Throughout" },
  { pattern: "Tabs", example: "Upcoming / Completed / Cancelled", purpose: "Segment related content without leaving the page.", used: "My Trips, UX Lab" },
  { pattern: "Cards", example: "Flight cards, feature cards, trip cards", purpose: "Group related information into scannable units.", used: "Home, Results, My Trips" },
  { pattern: "Dropdowns", example: "Airport, class, passenger selects", purpose: "Constrain input to valid, known values.", used: "Search forms" },
  { pattern: "Seat Selection", example: "Interactive aircraft seat map", purpose: "Let users choose a specific, visual option with immediate feedback.", used: "Seat Selection" },
  { pattern: "Progress Indicator", example: "Booking stepper", purpose: "Show users where they are in a multi-step process.", used: "Booking flow" },
  { pattern: "Notifications", example: "Notification centre with unread badge", purpose: "Surface time-sensitive updates without interrupting flow.", used: "Notifications, Navbar" },
  { pattern: "Confirmation Dialog", example: "Modal component", purpose: "Confirm an action before it takes effect.", used: "Reusable Modal component" },
  { pattern: "Error State", example: "Inline field errors, error banners", purpose: "Explain what went wrong and how to fix it.", used: "Forms, Flight Details" },
  { pattern: "Empty State", example: "No trips / no results illustrations", purpose: "Guide users when there's nothing to show yet.", used: "My Trips, Results, Notifications" },
  { pattern: "Loading State", example: "Skeleton cards, spinner on payment", purpose: "Communicate that content is on the way.", used: "Flight Results, Payment" },
  { pattern: "Success State", example: "Booking confirmation screen", purpose: "Confirm a completed action clearly.", used: "Confirmation" },
  { pattern: "Modal", example: "Reusable dialog component", purpose: "Focus attention on a single decision.", used: "Reusable component" },
  { pattern: "Tooltip", example: "Accessible labels via aria-label", purpose: "Provide extra context without cluttering the UI.", used: "Icon-only buttons" },
];

export default function InteractionPatterns() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-semibold text-navy-900">Interaction pattern gallery</h2>
        <p className="mt-2 text-sm text-neutral-600">
          These are real, functioning patterns used throughout FlyEase — not abstract examples. Each pattern was
          chosen because it is a well-understood convention users already recognize from other apps.
        </p>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-5 py-3">Pattern</th>
              <th className="px-5 py-3">Example</th>
              <th className="px-5 py-3">Purpose</th>
              <th className="px-5 py-3">Where used</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {PATTERNS.map((p) => (
              <tr key={p.pattern}>
                <td className="px-5 py-3.5 font-semibold text-navy-900">{p.pattern}</td>
                <td className="px-5 py-3.5 text-neutral-600">{p.example}</td>
                <td className="px-5 py-3.5 text-neutral-600">{p.purpose}</td>
                <td className="px-5 py-3.5 text-neutral-500">{p.used}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
