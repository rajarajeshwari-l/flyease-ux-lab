import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { sampleNotifications } from "../data/staticData";

const NotificationContext = createContext(null);
const STORAGE_KEY = "flyease_notifications";

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : sampleNotifications;
    } catch {
      return sampleNotifications;
    }
  });
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addNotification = useCallback((notification) => {
    const id = "n" + Date.now();
    setNotifications((prev) => [{ id, read: false, time: "Just now", ...notification }, ...prev]);
    return id;
  }, []);

  const pushToast = useCallback((toast) => {
    const id = "t" + Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, ...toast }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, markAsRead, markAllAsRead, addNotification, unreadCount, pushToast, toasts }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
