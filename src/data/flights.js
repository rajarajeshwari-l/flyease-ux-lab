const AIRLINES = [
  { code: "6E", name: "IndiGo" },
  { code: "AI", name: "Air India" },
  { code: "UK", name: "Vistara" },
  { code: "SG", name: "SpiceJet" },
  { code: "EK", name: "Emirates" },
  { code: "SQ", name: "Singapore Airlines" },
];

function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 1;
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

function minutesToDuration(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${pad(m)}m`;
}

function addMinutes(hh, mm, add) {
  let total = hh * 60 + mm + add;
  total = ((total % 1440) + 1440) % 1440;
  return { h: Math.floor(total / 60), m: total % 60, nextDay: hh * 60 + mm + add >= 1440 };
}

export function generateFlights({ from, to, date, travelClass = "Economy" }) {
  if (!from || !to) return [];
  const seed = hashString(`${from}-${to}-${date}-${travelClass}`);
  const rand = seededRandom(seed);
  const count = 6 + Math.floor(rand() * 4);
  const flights = [];

  const basePrice = 3200 + Math.floor(rand() * 4200);

  for (let i = 0; i < count; i++) {
    const airline = AIRLINES[Math.floor(rand() * AIRLINES.length)];
    const flightNum = `${airline.code} ${100 + Math.floor(rand() * 800)}`;
    const depH = Math.floor(rand() * 24);
    const depM = rand() > 0.5 ? 0 : 30;
    const durationMins = 60 + Math.floor(rand() * 240);
    const stops = rand() > 0.75 ? 1 : 0;
    const arr = addMinutes(depH, depM, durationMins);
    const price = Math.round((basePrice + i * 350 + rand() * 900) / 10) * 10;
    const seatsAvailable = 1 + Math.floor(rand() * 9);
    const baggageKg = travelClass === "Business" ? 30 : 15;

    flights.push({
      id: `${from}${to}${date}-${i}`,
      airline: airline.name,
      airlineCode: airline.code,
      flightNumber: flightNum,
      from,
      to,
      date,
      departureTime: `${pad(depH)}:${pad(depM)}`,
      arrivalTime: `${pad(arr.h)}:${pad(arr.m)}`,
      arrivesNextDay: arr.nextDay,
      durationMins,
      duration: minutesToDuration(durationMins),
      stops,
      baggageKg,
      price,
      seatsAvailable,
      travelClass,
    });
  }

  return flights;
}

export function getFlightById(id, searchParams) {
  const flights = generateFlights(searchParams);
  return flights.find((f) => f.id === id);
}
