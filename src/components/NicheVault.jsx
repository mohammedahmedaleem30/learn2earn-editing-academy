import { useState } from "react";
import { niches } from "../data/academyData";
import { Page } from "./Dashboard";

export default function NicheVault() {
  const [selected, setSelected] = useState("Business");
  const niche = niches[selected];

  return (
    <Page title="Niche Vault" subtitle="Choose one niche and get a focused starter direction.">
      <section className="rounded-[2rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.keys(niches).map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setSelected(name)}
              className={`h-10 shrink-0 rounded-xl border px-3 text-sm font-semibold ${
                selected === name ? "border-[var(--app-border-strong)] bg-[var(--app-active)] text-[var(--app-accent-text)]" : "border-[var(--app-border)] bg-[var(--app-button)] text-[var(--app-muted)]"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <InfoCard title="Best content angles" items={niche.angles} />
          <InfoCard title="Hook examples" items={niche.hooks} />
          <InfoCard title="B-roll ideas" items={niche.broll} />
          <InfoCard title="Editing style tips" text={niche.style} />
          <div className="lg:col-span-2">
            <InfoCard title="Client angle" text={niche.clientAngle} />
          </div>
        </div>
      </section>
    </Page>
  );
}

function InfoCard({ title, items, text }) {
  return (
    <article className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-5">
      <h2 className="text-lg font-black">{title}</h2>
      {items ? (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--app-muted)]">
          {items.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">{text}</p>
      )}
    </article>
  );
}
