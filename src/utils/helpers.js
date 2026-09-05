export function formatINR(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export function generateBookingId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "FE-";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export function generateBaggageId() {
  return "BG" + Math.floor(100000 + Math.random() * 900000);
}

export function formatDateReadable(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  return /^\d{10}$/.test(phone.replace(/\D/g, ""));
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
