import { Loader2 } from "lucide-react";

export default function Spinner({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted">
      <Loader2 size={28} className="animate-spin-slow text-volt" />
      <p className="font-display text-sm uppercase tracking-wide">{label}</p>
    </div>
  );
}
