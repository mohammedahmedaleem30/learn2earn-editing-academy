import { Check, Copy } from "lucide-react";

export default function CopyButton({ text, copied, onCopy, label = "Copy" }) {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    onCopy?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-button)] px-3 text-xs font-semibold text-[var(--app-text)] transition hover:border-[var(--app-border-strong)] hover:bg-[var(--app-hover)]"
    >
      {copied ? <Check className="h-4 w-4 text-[var(--app-accent)]" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </button>
  );
}
