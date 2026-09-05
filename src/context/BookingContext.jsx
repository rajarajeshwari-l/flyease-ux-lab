import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { generateBookingId, generateBaggageId } from "../utils/helpers";

const BookingContext = createContext(null);

const STORAGE_KEY = "flyease_bookings";
const DRAFT_KEY = "flyease_draft_booking";

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [draft, setDraft] = useState(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [draft]);

  const updateDraft = useCallback((patch) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const clearDraft = useCallback(() => {
    setDraft({});
    sessionStorage.removeItem(DRAFT_KEY);
  }, []);

  const confirmBooking = useCallback(() => {
    const id = generateBookingId();
    const baggageId = generateBaggageId();
    const gate = draft.gate || "B16";
    const record = {
      id,
      baggageId,
      status: "upcoming",
      createdAt: new Date().toISOString(),
      gate,
      ...draft,
    };
    setBookings((prev) => [record, ...prev]);
    clearDraft();
    return record;
  }, [draft, clearDraft]);

  const getBooking = useCallback(
    (id) => bookings.find((b) => b.id === id),
    [bookings]
  );

  const updateBookingStatus = useCallback((id, status) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }, []);

  return (
    <BookingContext.Provider
      value={{ bookings, draft, updateDraft, clearDraft, confirmBooking, getBooking, updateBookingStatus }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
