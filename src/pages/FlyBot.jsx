import { useEffect, useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { estimateWalk } from "../data/staticData";

const SUGGESTIONS = [
  "Where is my gate?",
  "When should I reach the airport?",
  "Where is baggage claim?",
  "Where is the restroom?",
  "Where can I charge my phone?",
  "What is my seat?",
];

function reply(message, booking) {
  const m = message.toLowerCase();
  const walk = estimateWalk("entrance", "gateB");

  if (!booking) {
    if (m.includes("gate") || m.includes("seat") || m.includes("baggage") || m.includes("board")) {
      return "I don't see an active booking on this device yet. Book a flight first and I can answer questions about your specific trip.";
    }
  }

  if (m.includes("gate")) {
    return booking
      ? `Your departure gate is ${booking.gate}. It's about ${walk.distance} m from the main entrance, roughly ${walk.minutes} minutes on foot.`
      : "Once you have a booking, I can tell you your exact gate number and walking time.";
  }
  if (m.includes("reach") || m.includes("when should") || m.includes("arrive")) {
    return "We recommend arriving at least 2 hours before domestic flights and 3 hours before international flights.";
  }
  if (m.includes("baggage claim") || (m.includes("baggage") && m.includes("where"))) {
    return "Baggage claim is located on the arrivals level, near the airport exit — follow the baggage claim signs after immigration/security.";
  }
  if (m.includes("restroom") || m.includes("washroom") || m.includes("toilet")) {
    return "The nearest restrooms are near Security and near the Gates area — check the Airport Navigation page for the exact route.";
  }
  if (m.includes("charg")) {
    return "There's a charging station near the food court, between Security and the Gates. See Airport Navigation for directions.";
  }
  if (m.includes("seat")) {
    return booking ? `Your seat for this trip is ${booking.seat.id}.` : "You don't have a seat selected yet — you can pick one during Seat Selection when booking.";
  }
  if (m.includes("baggage") && (m.includes("status") || m.includes("track"))) {
    return "You can track your baggage status on the Baggage Tracking page.";
  }
  if (m.includes("hi") || m.includes("hello") || m.includes("hey")) {
    return "Hi! I'm FlyBot, your rule-based travel assistant demo. Ask me about your gate, seat, baggage or airport facilities.";
  }
  if (m.includes("thank")) {
    return "You're welcome! Have a smooth flight. ✈️";
  }
  return "I'm a rule-based demo assistant, so I can only help with a few topics: gates, arrival time, baggage claim, restrooms, charging points and your seat. Try one of the suggestions below!";
}

export default function FlyBot() {
  const { bookings } = useBooking();
  const upcoming = bookings.find((b) => b.status === "upcoming");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi, I'm FlyBot — Travel Assistant Demo. I use rule-based logic (not a live AI model) to answer common airport questions. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { from: "user", text: trimmed }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: reply(trimmed, upcoming) }]);
    }, 500);
  };

  return (
    <div className="section max-w-2xl py-8">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-navy-900">FlyBot — Travel Assistant Demo</h1>
          <p className="text-xs text-neutral-500">Rule-based assistant for this coursework demo, not a live AI model.</p>
        </div>
      </div>

      <div className="card mt-5 flex h-[60vh] flex-col p-4">
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div key={i} className={`flex items-start gap-2 ${m.from === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${m.from === "user" ? "bg-navy-900 text-white" : "bg-cyan-50 text-cyan-600"}`}>
                {m.from === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "bg-navy-900 text-white" : "bg-neutral-100 text-navy-900"}`}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => send(s)} className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 hover:border-cyan-400 hover:text-cyan-700">
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="mt-3 flex items-center gap-2 border-t border-neutral-100 pt-3"
        >
          <label htmlFor="flybot-input" className="sr-only">Message FlyBot</label>
          <input
            id="flybot-input"
            className="input-field flex-1"
            placeholder="Ask FlyBot a question…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-accent" aria-label="Send message">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
