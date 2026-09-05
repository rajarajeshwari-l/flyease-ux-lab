export function generateSeatMap(seed = 1) {
  const rows = 20;
  const cols = ["A", "B", "C", "D", "E", "F"];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const seats = [];
  for (let r = 1; r <= rows; r++) {
    for (const c of cols) {
      const isExit = r === 12 || r === 13;
      const occupied = rand() < 0.32;
      const fee = r <= 4 ? 900 : isExit ? 650 : 500;
      seats.push({
        id: `${r}${c}`,
        row: r,
        col: c,
        occupied,
        fee: r <= 4 ? fee : isExit ? fee : 0,
        isExitRow: isExit,
        isFront: r <= 4,
      });
    }
  }
  return seats;
}

export const baggageOptions = [
  { id: "cabin", label: "Cabin baggage", detail: "7 kg · included with every fare", price: 0, included: true },
  { id: "15kg", label: "Check-in 15 kg", detail: "Standard checked baggage", price: 0, included: true },
  { id: "20kg", label: "Check-in 20 kg", detail: "5 kg extra allowance", price: 800 },
  { id: "30kg", label: "Check-in 30 kg", detail: "15 kg extra allowance", price: 1500 },
];

export const airportPOIs = [
  { id: "entrance", name: "Main Entrance", type: "entrance", x: 6, y: 50 },
  { id: "checkin", name: "Check-in Counters A-F", type: "checkin", x: 18, y: 50 },
  { id: "security", name: "Security Check", type: "security", x: 34, y: 50 },
  { id: "restroom1", name: "Restrooms (Near Security)", type: "restroom", x: 34, y: 22 },
  { id: "food1", name: "Food Court", type: "food", x: 50, y: 22 },
  { id: "lounge1", name: "FlyEase Lounge", type: "lounge", x: 50, y: 78 },
  { id: "charging1", name: "Charging Station", type: "charging", x: 62, y: 50 },
  { id: "restroom2", name: "Restrooms (Near Gates)", type: "restroom", x: 78, y: 22 },
  { id: "gateA", name: "Gate A1-A6", type: "gate", x: 78, y: 78 },
  { id: "gateB", name: "Gate B10-B18", type: "gate", x: 94, y: 50 },
];

export function estimateWalk(fromId, toId) {
  const from = airportPOIs.find((p) => p.id === fromId);
  const to = airportPOIs.find((p) => p.id === toId);
  if (!from || !to) return { distance: 0, minutes: 0 };
  const dx = (to.x - from.x) * 6;
  const dy = (to.y - from.y) * 6;
  const distance = Math.round(Math.sqrt(dx * dx + dy * dy) * 3.2);
  const minutes = Math.max(1, Math.round(distance / 80));
  return { distance, minutes };
}

export const gates = ["A1", "A2", "A3", "A4", "B10", "B12", "B14", "B16", "B18"];

export const sampleNotifications = [
  { id: "n1", type: "success", title: "Booking confirmed", body: "Your flight FE-6E482 has been booked successfully.", read: false, time: "2 min ago" },
  { id: "n2", type: "warn", title: "Gate changed", body: "Departure gate updated from B12 to B16.", read: false, time: "18 min ago" },
  { id: "n3", type: "info", title: "Boarding started", body: "Boarding has started for flight FE-6E482 at Gate B16.", read: false, time: "40 min ago" },
  { id: "n4", type: "danger", title: "Flight delayed", body: "Your flight is delayed by 25 minutes due to weather.", read: true, time: "1 hr ago" },
  { id: "n5", type: "info", title: "Baggage update", body: "Your checked baggage has been loaded onto the aircraft.", read: true, time: "2 hr ago" },
];
