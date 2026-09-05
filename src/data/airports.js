export const airports = [
  { code: "MAA", city: "Chennai", name: "Chennai International Airport", country: "India" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International Airport", country: "India" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj Intl Airport", country: "India" },
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International Airport", country: "India" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International Airport", country: "India" },
  { code: "SIN", city: "Singapore", name: "Singapore Changi Airport", country: "Singapore" },
  { code: "DXB", city: "Dubai", name: "Dubai International Airport", country: "UAE" },
  { code: "LHR", city: "London", name: "London Heathrow Airport", country: "United Kingdom" },
];

export const getAirport = (code) => airports.find((a) => a.code === code);
