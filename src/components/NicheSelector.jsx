import { ArrowUpRight } from "lucide-react";

export default function NicheSelector({ niches, selectedNicheId, onSelectNiche }) {
  return (
    <section id="niches" className="scroll-mt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-crimson-200">Choose a niche</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Resource Packs</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-zinc-400">
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
                  ? "border-crimson-300/60 bg-crimson-500/15 shadow-red-glow"
                  : "border-white/10 bg-[#111111] hover:-translate-y-1 hover:border-crimson-400/40 hover:bg-crimson-500/10"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-white">{niche.name}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{niche.tagline}</p>
                </div>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition ${
                    selected
                      ? "border-crimson-200/40 bg-crimson-400/20 text-white"
                      : "border-white/10 text-zinc-500 group-hover:border-crimson-300/30 group-hover:text-white"
                  }`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.18em] text-zinc-500">{niche.hooks.length} hooks included</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
