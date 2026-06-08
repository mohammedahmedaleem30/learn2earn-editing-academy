import { ArrowUpRight } from "lucide-react";

export default function NicheSelector({ niches, selectedNicheId, onSelectNiche }) {
  return (
    <section id="niches" className="scroll-mt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-text)]">Choose a niche</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text)]">Resource Packs</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[var(--color-text-muted)]">
          Every pack includes hooks, scripts, B-roll, tool recommendations, and outreach templates.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {niches.map((niche) => {
          const selected = niche.id === selectedNicheId;

          return (
            <button
              key={niche.id}
              type="button"
              onClick={() => onSelectNiche(niche.id)}
              className={`group min-h-[142px] rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-[var(--color-border-strong)] bg-[var(--color-accent-soft)] shadow-red-glow"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-accent-softer)]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-[var(--color-text)]">{niche.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{niche.tagline}</p>
                </div>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition ${
                    selected
                      ? "border-[var(--color-border-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]"
                      : "border-[var(--color-border)] text-[var(--color-text-subtle)] group-hover:border-[var(--color-border-strong)] group-hover:text-[var(--color-text)]"
                  }`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">{niche.hooks.length} hooks included</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
