import { Bot, Clapperboard, FileText, Film, Flame, FolderOpen, Home, Moon, Scissors, Sun, Target, Users } from "lucide-react";

const icons = {
  home: Home,
  niches: Target,
  hooks: Flame,
  scripts: FileText,
  broll: Film,
  tools: Scissors,
  clients: Users,
  resources: FolderOpen,
};

export default function Sidebar({ items, page, setPage, theme, toggleTheme }) {
  return (
    <aside className="flex h-full flex-col gap-6 p-4">
      <div className="flex items-start justify-between gap-3">
        <button type="button" onClick={() => setPage("home")} className="flex min-w-0 items-center gap-3 text-left">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--app-accent-gradient)] text-white shadow-[var(--app-glow)]">
            <Clapperboard className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black">Learn2Earn</span>
            <span className="block truncate text-xs uppercase tracking-[0.18em] text-[var(--app-accent-text)]">Editing Academy</span>
          </span>
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--app-border)] bg-[var(--app-button)] transition hover:border-[var(--app-border-strong)] hover:bg-[var(--app-hover)]"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
        {items.map((item) => {
          const Icon = icons[item.id] ?? Bot;
          const active = page === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setPage(item.id)}
              className={`flex h-11 w-full items-center gap-3 rounded-2xl border px-3 text-left text-sm font-semibold transition ${
                active
                  ? "border-[var(--app-border-strong)] bg-[var(--app-active)] text-[var(--app-text)] shadow-[var(--app-glow)]"
                  : "border-transparent text-[var(--app-muted)] hover:border-[var(--app-border)] hover:bg-[var(--app-hover)] hover:text-[var(--app-text)]"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="min-w-0 truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4">
        <p className="text-sm font-black">Free resource hub</p>
        <p className="mt-2 text-xs leading-5 text-[var(--app-muted)]">Choose a niche, copy useful assets, and build cleaner edits.</p>
      </div>
    </aside>
  );
}
