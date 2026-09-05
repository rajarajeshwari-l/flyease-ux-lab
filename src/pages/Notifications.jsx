import { Bell, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";
import { EmptyState } from "../components/States";

const ICONS = {
  success: <CheckCircle2 className="h-5 w-5 text-success-500" />,
  warn: <AlertTriangle className="h-5 w-5 text-warn-500" />,
  danger: <XCircle className="h-5 w-5 text-danger-500" />,
  info: <Info className="h-5 w-5 text-cyan-500" />,
};

export default function Notifications() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  return (
    <div className="section max-w-2xl py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy-900">Notifications</h1>
          <p className="mt-1 text-sm text-neutral-500">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="btn-secondary text-xs">Mark all as read</button>
        )}
      </div>

      <div className="mt-6">
        {notifications.length === 0 ? (
          <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                  n.read ? "border-neutral-100 bg-white" : "border-cyan-200 bg-cyan-50/40"
                }`}
              >
                {ICONS[n.type] || ICONS.info}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-navy-900">{n.title}</p>
                    {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-500" aria-label="Unread" />}
                  </div>
                  <p className="mt-0.5 text-sm text-neutral-500">{n.body}</p>
                  <p className="mt-1 text-[11px] text-neutral-400">{n.time}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
