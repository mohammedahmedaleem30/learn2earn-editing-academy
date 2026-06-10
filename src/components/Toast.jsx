import { CheckCircle2 } from "lucide-react";

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div className="fixed right-4 top-4 z-[80] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-[var(--app-border-strong)] bg-[var(--app-surface)] px-4 py-3 text-sm font-semibold text-[var(--app-text)] shadow-[var(--app-glow)]">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--app-accent)]" />
      <span>{toast}</span>
    </div>
  );
}
