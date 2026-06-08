import { BookOpen, Clapperboard, Menu, Sparkles, X } from "lucide-react";

const sectionLinks = [
  { id: "hooks", label: "Hooks" },
  { id: "scripts", label: "Scripts" },
  { id: "broll", label: "B-Roll" },
  { id: "software", label: "Software" },
  { id: "ai-tools", label: "AI Tools" },
  { id: "clients", label: "Clients" },
];

export default function Sidebar({ niches, selectedNicheId, onSelectNiche, mobileOpen, onToggleMobile }) {
  return (
    <>
      <button
        type="button"
        onClick={onToggleMobile}
        className="fixed left-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-panel backdrop-blur lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-[var(--color-overlay)] backdrop-blur-sm lg:hidden"
          aria-label="Close navigation overlay"
          onClick={onToggleMobile}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[292px] border-r border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-5 shadow-panel backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-crimson-gradient shadow-red-glow">
              <Clapperboard className="h-5 w-5 text-[var(--color-on-accent)]" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight text-[var(--color-text)]">Learn2Earn</p>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-accent-text)]">Editing Academy</p>
            </div>
          </div>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-accent-softer)] hover:text-[var(--color-text)] lg:hidden"
            onClick={onToggleMobile}
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-accent-softer)] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
            <Sparkles className="h-4 w-4 text-[var(--color-accent-text)]" />
            Creator Vault
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            Pick a niche, copy the assets, and build a portfolio around paid editing outcomes.
          </p>
        </div>

        <nav className="mt-7 space-y-2">
          <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">Niches</p>
          {niches.map((niche) => (
            <button
              key={niche.id}
              type="button"
              onClick={() => onSelectNiche(niche.id)}
              className={`flex h-11 w-full items-center justify-between rounded-lg border px-3 text-left text-sm transition ${
                selectedNicheId === niche.id
                  ? "border-[var(--color-border-strong)] bg-[var(--color-accent-soft)] text-[var(--color-text)] shadow-red-glow"
                  : "border-transparent text-[var(--color-text-muted)] hover:border-[var(--color-border)] hover:bg-[var(--color-accent-softer)] hover:text-[var(--color-text)]"
              }`}
            >
              <span>{niche.name}</span>
              <BookOpen className="h-4 w-4" />
            </button>
          ))}
        </nav>

        <nav className="mt-8 space-y-2">
          <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">Sections</p>
          {sectionLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="block rounded-lg px-3 py-2 text-sm text-[var(--color-text-muted)] transition hover:bg-[var(--color-accent-softer)] hover:text-[var(--color-text)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
