import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, PlaneTakeoff, Bell, User } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/search", label: "Flights" },
  { to: "/my-trips", label: "My Trips" },
  { to: "/airport", label: "Airport" },
  { to: "/baggage-tracking", label: "Baggage" },
  { to: "/flybot", label: "FlyBot" },
  { to: "/ux-lab", label: "UX Lab" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-navy-900 text-white">
      <nav className="section flex h-16 items-center justify-between" aria-label="Primary">
        <NavLink to="/" className="flex items-center gap-2 font-extrabold tracking-tight" aria-label="FlyEase home">
          <PlaneTakeoff className="h-6 w-6 text-cyan-400" aria-hidden="true" />
          <span className="text-lg">FLYEASE</span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <NavLink to="/notifications" className="relative rounded-lg p-2 text-white/80 hover:bg-white/10" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </NavLink>
          <NavLink to="/profile" className="rounded-lg p-2 text-white/80 hover:bg-white/10" aria-label="Profile">
            <User className="h-5 w-5" />
          </NavLink>
        </div>

        <button
          className="rounded-lg p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy-900 lg:hidden animate-slideUp">
          <div className="section flex flex-col gap-1 py-3">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex gap-2 border-t border-white/10 pt-3">
              <NavLink to="/notifications" onClick={() => setOpen(false)} className="btn-secondary flex-1 !bg-white/5 !text-white !border-white/10">
                <Bell className="h-4 w-4" /> Alerts {unreadCount > 0 && `(${unreadCount})`}
              </NavLink>
              <NavLink to="/profile" onClick={() => setOpen(false)} className="btn-secondary flex-1 !bg-white/5 !text-white !border-white/10">
                <User className="h-4 w-4" /> Profile
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
