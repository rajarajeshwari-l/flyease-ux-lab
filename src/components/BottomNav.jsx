import { NavLink } from "react-router-dom";
import { Home, Search, Luggage, Bot, User } from "lucide-react";

const ITEMS = [
  { to: "/", icon: Home, label: "Home", end: true },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/my-trips", icon: Luggage, label: "Trips" },
  { to: "/flybot", icon: Bot, label: "FlyBot" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex border-t border-neutral-200 bg-white/95 backdrop-blur sm:hidden"
      aria-label="Bottom navigation"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {ITEMS.map(({ to, icon: Icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${
              isActive ? "text-cyan-600" : "text-neutral-500"
            }`
          }
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
