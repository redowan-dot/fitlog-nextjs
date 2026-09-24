"use client";

import { CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

const ICONS = {
  success: CheckCircle2,
  danger: AlertTriangle,
  default: Info,
};

export default function Toaster() {
  const { toasts } = usePlan();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.tone] || ICONS.default;
        return (
          <div
            key={toast.id}
            role="status"
            className={`animate-toast-in flex items-center gap-3 rounded-xl2 border px-4 py-3 shadow-lg backdrop-blur ${
              toast.tone === "danger"
                ? "border-danger/40 bg-danger/10 text-danger"
                : toast.tone === "success"
                ? "border-volt/40 bg-surface text-paper"
                : "border-line bg-surface text-paper"
            }`}
          >
            <Icon
              size={18}
              className={
                toast.tone === "success"
                  ? "shrink-0 text-volt"
                  : toast.tone === "danger"
                  ? "shrink-0 text-danger"
                  : "shrink-0 text-muted"
              }
            />
            <p className="font-body text-sm">{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
}
