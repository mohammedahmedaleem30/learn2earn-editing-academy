import { Check, Copy } from "lucide-react";

export default function CopyButton({ text, label = "Copy", copiedLabel = "Copied!", onCopied, className = "" }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    onCopied?.();
  };

  const copied = label === copiedLabel;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 text-xs font-semibold transition ${
        copied
          ? "border-crimson-300/40 bg-crimson-500/20 text-white shadow-red-glow"
          : "border-white/10 bg-white/[0.04] text-zinc-200 hover:border-crimson-400/50 hover:bg-crimson-500/10 hover:text-white"
      } ${className}`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span>{label}</span>
    </button>
  );
}
