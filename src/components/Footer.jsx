import { Link } from "react-router-dom";
import { PlaneTakeoff } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-100 bg-white pb-16 sm:pb-0">
      <div className="section grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-navy-900">
            <PlaneTakeoff className="h-5 w-5 text-cyan-500" />
            FLYEASE
          </div>
          <p className="mt-3 max-w-xs text-sm text-neutral-500">
            Smart Airport Booking & Passenger Experience Platform.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-navy-900">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-500">
            <li><Link to="/search" className="hover:text-cyan-600">Flights</Link></li>
            <li><Link to="/my-trips" className="hover:text-cyan-600">My Trips</Link></li>
            <li><Link to="/airport" className="hover:text-cyan-600">Airport</Link></li>
            <li><Link to="/baggage-tracking" className="hover:text-cyan-600">Baggage</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-navy-900">Support</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-500">
            <li><Link to="/flybot" className="hover:text-cyan-600">FlyBot Assistant</Link></li>
            <li><Link to="/notifications" className="hover:text-cyan-600">Notifications</Link></li>
            <li><Link to="/profile" className="hover:text-cyan-600">Profile</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-navy-900">Project</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-500">
            <li><Link to="/ux-lab" className="hover:text-cyan-600">UX Lab</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-100 bg-neutral-50 py-4">
        <div className="section flex flex-col items-center justify-between gap-2 text-xs text-neutral-500 sm:flex-row">
          <p>© {new Date().getFullYear()} FlyEase — Student / Academic Demo Project.</p>
          <p>Not a real airline. All bookings and payments are simulated for coursework.</p>
        </div>
      </div>
    </footer>
  );
}
