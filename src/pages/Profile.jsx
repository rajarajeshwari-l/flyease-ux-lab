import { useState } from "react";
import { User, Bell, Plane, Palette, Save } from "lucide-react";
import Input from "../components/Input";
import { useNotifications } from "../context/NotificationContext";

const STORAGE_KEY = "flyease_profile";

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const DEFAULT_PROFILE = {
  firstName: "Ananya",
  lastName: "Sharma",
  email: "ananya@example.com",
  phone: "9876543210",
  seatPref: "Window",
  mealPref: "Vegetarian",
  classPref: "Economy",
  notifyGate: true,
  notifyDelay: true,
  notifyPromo: false,
  theme: "system",
};

export default function Profile() {
  const [profile, setProfile] = useState(loadProfile() || DEFAULT_PROFILE);
  const { pushToast } = useNotifications();

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setProfile((p) => ({ ...p, [key]: value }));
  };

  const save = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    pushToast({ type: "success", title: "Preferences saved" });
  };

  return (
    <div className="section max-w-2xl py-8">
      <h1 className="text-xl font-bold text-navy-900">Profile</h1>
      <p className="mt-1 text-sm text-neutral-500">Saved locally on this device for the demo.</p>

      <form onSubmit={save} className="mt-6 space-y-6">
        <section className="card p-6">
          <h2 className="flex items-center gap-2 font-semibold text-navy-900"><User className="h-4 w-4 text-cyan-500" /> Saved passenger information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="First name" value={profile.firstName} onChange={set("firstName")} />
            <Input label="Last name" value={profile.lastName} onChange={set("lastName")} />
            <Input label="Email" type="email" value={profile.email} onChange={set("email")} />
            <Input label="Phone" type="tel" value={profile.phone} onChange={set("phone")} />
          </div>
        </section>

        <section className="card p-6">
          <h2 className="flex items-center gap-2 font-semibold text-navy-900"><Plane className="h-4 w-4 text-cyan-500" /> Travel preferences</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input as="select" label="Seat preference" value={profile.seatPref} onChange={set("seatPref")}>
              <option>Window</option><option>Aisle</option><option>Middle</option>
            </Input>
            <Input as="select" label="Meal preference" value={profile.mealPref} onChange={set("mealPref")}>
              <option>Vegetarian</option><option>Non-Vegetarian</option><option>Vegan</option><option>No preference</option>
            </Input>
            <Input as="select" label="Preferred class" value={profile.classPref} onChange={set("classPref")}>
              <option>Economy</option><option>Premium Economy</option><option>Business</option>
            </Input>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="flex items-center gap-2 font-semibold text-navy-900"><Bell className="h-4 w-4 text-cyan-500" /> Notification preferences</h2>
          <div className="mt-4 space-y-2.5 text-sm">
            <label className="flex items-center gap-2 text-neutral-600"><input type="checkbox" className="accent-cyan-500" checked={profile.notifyGate} onChange={set("notifyGate")} /> Gate change alerts</label>
            <label className="flex items-center gap-2 text-neutral-600"><input type="checkbox" className="accent-cyan-500" checked={profile.notifyDelay} onChange={set("notifyDelay")} /> Delay alerts</label>
            <label className="flex items-center gap-2 text-neutral-600"><input type="checkbox" className="accent-cyan-500" checked={profile.notifyPromo} onChange={set("notifyPromo")} /> Promotions and offers</label>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="flex items-center gap-2 font-semibold text-navy-900"><Palette className="h-4 w-4 text-cyan-500" /> Theme preference</h2>
          <div className="mt-4 flex gap-2">
            {["light", "system", "dark"].map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setProfile((p) => ({ ...p, theme: t }))}
                className={`rounded-lg border px-4 py-2 text-sm font-medium capitalize ${
                  profile.theme === t ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-neutral-200 text-neutral-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-neutral-400">Dark theme is a preference toggle for this demo; the interface currently renders in light mode.</p>
        </section>

        <button type="submit" className="btn-accent"><Save className="h-4 w-4" /> Save preferences</button>
      </form>
    </div>
  );
}
