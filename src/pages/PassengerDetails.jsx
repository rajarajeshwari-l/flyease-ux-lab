import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import BookingStepper from "../components/BookingStepper";
import { useBooking } from "../context/BookingContext";
import { isValidEmail, isValidPhone } from "../utils/helpers";

const EMPTY = { firstName: "", lastName: "", dob: "", gender: "", email: "", phone: "", idNumber: "" };

export default function PassengerDetails() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useBooking();
  const [form, setForm] = useState(draft.passenger || EMPTY);
  const [errors, setErrors] = useState({});

  if (!draft.flight) {
    return (
      <div className="section py-16 text-center">
        <p className="text-neutral-500">No flight selected yet.</p>
        <button className="btn-accent mt-4" onClick={() => navigate("/search")}>Search flights</button>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.dob) e.dob = "Date of birth is required.";
    if (!form.gender) e.gender = "Please select a gender.";
    if (!form.email || !isValidEmail(form.email)) e.email = "Enter a valid email address.";
    if (!form.phone || !isValidPhone(form.phone)) e.phone = "Enter a valid 10-digit phone number.";
    if (!form.idNumber.trim()) e.idNumber = "Passport / ID number is required for demo purposes.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    updateDraft({ passenger: form });
    navigate("/seat-selection");
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="section max-w-2xl py-8">
      <div className="mb-6"><BookingStepper current={2} /></div>
      <h1 className="text-xl font-bold text-navy-900">Passenger details</h1>
      <p className="mt-1 text-sm text-neutral-500">Details must match the passenger's travel ID (demo only — not stored anywhere real).</p>

      <form onSubmit={submit} className="card mt-6 space-y-4 p-6" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="First name" value={form.firstName} onChange={set("firstName")} error={errors.firstName} placeholder="Ananya" />
          <Input label="Last name" value={form.lastName} onChange={set("lastName")} error={errors.lastName} placeholder="Sharma" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Date of birth" type="date" value={form.dob} onChange={set("dob")} error={errors.dob} />
          <Input as="select" label="Gender" value={form.gender} onChange={set("gender")} error={errors.gender}>
            <option value="">Select…</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </Input>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} placeholder="you@example.com" />
          <Input label="Phone" type="tel" value={form.phone} onChange={set("phone")} error={errors.phone} placeholder="9876543210" />
        </div>
        <Input label="Passport / ID number (demo)" value={form.idNumber} onChange={set("idNumber")} error={errors.idNumber} placeholder="For demo purposes only" />

        <button type="submit" className="btn-accent w-full sm:w-auto">Continue</button>
      </form>
    </div>
  );
}
