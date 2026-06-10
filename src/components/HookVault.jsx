import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { hookCategories, hooks } from "../data/academyData";
import CopyButton from "./CopyButton";
import { Page } from "./Dashboard";

export default function HookVault({ copiedId, onCopied }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return hooks.filter((hook) => {
      const categoryMatch = category === "All" || hook.category === category;
      return categoryMatch && (!term || hook.text.toLowerCase().includes(term));
    });
  }, [category, query]);

  return (
    <Page title="Hook Library" subtitle="Short hooks you can copy and adapt for practice edits.">
      <section className="rounded-[2rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--app-subtle)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-12 w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-input)] pl-12 pr-4 text-sm outline-none focus:border-[var(--app-border-strong)]"
            placeholder="Search hooks"
          />
        </label>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {hookCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setCategory(item);
                setVisible(6);
              }}
              className={`h-10 shrink-0 rounded-xl border px-3 text-sm font-semibold ${
                category === item ? "border-[var(--app-border-strong)] bg-[var(--app-active)] text-[var(--app-accent-text)]" : "border-[var(--app-border)] bg-[var(--app-button)] text-[var(--app-muted)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.slice(0, visible).map((hook) => (
            <article key={hook.id} className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-accent-text)]">{hook.category}</p>
              <p className="mt-3 min-h-[72px] text-sm leading-6">{hook.text}</p>
              <div className="mt-4">
                <CopyButton text={hook.text} copied={copiedId === hook.id} onCopy={() => onCopied(hook.id)} />
              </div>
            </article>
          ))}
        </div>

        {visible < filtered.length ? (
          <button type="button" onClick={() => setVisible((value) => value + 6)} className="mt-5 h-11 rounded-2xl border border-[var(--app-border)] bg-[var(--app-button)] px-4 text-sm font-black">
            Show more
          </button>
        ) : null}
      </section>
    </Page>
  );
}
