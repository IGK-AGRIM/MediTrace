import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { useToast } from "../context/ToastContext";

const ICONS = { success: CheckCircle2, warn: AlertTriangle, info: Info };
const COLORS = {
  success: "text-status-good",
  warn: "text-status-warn",
  info: "text-accent",
};

export default function ToastStack() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex w-80 flex-col gap-2">
      {toasts.map((t) => {
        const Icon = ICONS[t.variant] || Info;
        return (
          <div
            key={t.id}
            className="animate-toast-in flex items-start gap-2.5 rounded-md2 border border-border-soft bg-base-elevated2 px-4 py-3 shadow-elevated"
          >
            <Icon size={16} className={`mt-0.5 shrink-0 ${COLORS[t.variant] || COLORS.info}`} />
            <p className="flex-1 text-xs leading-relaxed text-ink-primary">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="text-ink-muted transition-fast hover:text-ink-primary"
              aria-label="Dismiss"
            >
              <X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
