import { CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

const ICONS = {
  success: <CheckCircle2 className="h-5 w-5 text-success-500" />,
  warn: <AlertTriangle className="h-5 w-5 text-warn-500" />,
  danger: <XCircle className="h-5 w-5 text-danger-500" />,
  info: <Info className="h-5 w-5 text-cyan-500" />,
};

export default function ToastContainer() {
  const { toasts } = useNotifications();
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-toastIn flex items-start gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-pop"
          role="status"
        >
          {ICONS[t.type || "info"]}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy-900">{t.title}</p>
            {t.body && <p className="mt-0.5 text-xs text-neutral-500">{t.body}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
