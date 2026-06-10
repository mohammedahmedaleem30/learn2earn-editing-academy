import { useState } from "react";
import { brollIdeas } from "../data/academyData";
import { Page } from "./Dashboard";

export default function BRollVault() {
  const [niche, setNiche] = useState("Business");
  const current = brollIdeas[niche];

  return (
    <Page title="B-Roll Ideas" subtitle="Choose a niche and get a short practical B-roll direction.">
      <section className="rounded-[2rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.keys(brollIdeas).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setNiche(item)}
              className={`h-10 shrink-0 rounded-xl border px-3 text-sm font-semibold ${
                niche === item ? "border-[var(--app-border-strong)] bg-[var(--app-active)] text-[var(--app-accent-text)]" : "border-[var(--app-border)] bg-[var(--app-button)] text-[var(--app-muted)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3">
          <Row label="Use" text={current.use} />
          <Row label="Find" text={current.find} />
          <Row label="Edit" text={current.edit} />
        </div>
      </section>
    </Page>
  );
}

function Row({ label, text }) {
  return (
    <article className="grid gap-2 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-4 sm:grid-cols-[120px_minmax(0,1fr)]">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--app-accent-text)]">{label}</p>
      <p className="text-sm leading-6 text-[var(--app-muted)]">{text}</p>
    </article>
  );
}
