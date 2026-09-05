import { GraduationCap, Target, TriangleAlert } from "lucide-react";

export default function Persona() {
  return (
    <div className="space-y-6">
      <span className="badge-warn">SAMPLE PERSONA</span>

      <div className="card overflow-hidden">
        <div className="bg-navy-900 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl font-bold">A</div>
            <div>
              <h2 className="text-xl font-bold">Ananya</h2>
              <p className="text-white/70">Age 21 · Student</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-navy-900"><Target className="h-4 w-4 text-cyan-500" /> Goals</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-neutral-600">
              <li>• Fast booking</li>
              <li>• Simple seat selection</li>
              <li>• Clear baggage information</li>
              <li>• Easy airport navigation</li>
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-navy-900"><TriangleAlert className="h-4 w-4 text-warn-500" /> Pain points</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-neutral-600">
              <li>• Confusing booking process</li>
              <li>• Unclear airport directions</li>
              <li>• Too many separate travel tools</li>
              <li>• Fear of missing the gate</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-100 p-6">
          <h3 className="flex items-center gap-2 font-semibold text-navy-900"><GraduationCap className="h-4 w-4 text-cyan-500" /> Context</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Ananya travels a few times a year for university and family visits. She's comfortable with technology
            but has limited patience for apps that require many steps. She values a single place to manage her whole
            trip — from booking to boarding — over having the cheapest possible fare.
          </p>
        </div>
      </div>

      <div className="card p-5">
        <p className="text-sm text-neutral-500">
          This persona is a sample created for the assignment. Replace it with a persona built from your own
          research once interviews or surveys are conducted (see the UX Research tab).
        </p>
      </div>
    </div>
  );
}
