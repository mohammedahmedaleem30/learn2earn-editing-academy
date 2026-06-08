import { ArrowRight, Crown, Moon, PlayCircle, Sun } from "lucide-react";

export default function Hero({ stats, onStart, theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <section className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-panel sm:p-8 lg:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--color-accent-soft),transparent_34rem),linear-gradient(135deg,var(--color-accent-softer),transparent_46%)]" />
      <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[var(--color-accent-soft)] blur-3xl" />
      <button
        type="button"
        onClick={onToggleTheme}
        className="absolute right-4 top-4 z-10 inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-button)] px-3 text-sm font-semibold text-[var(--color-text)] shadow-panel transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-button-hover)] sm:right-6 sm:top-6"
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        {isDark ? <Moon className="h-4 w-4 text-[var(--color-accent-text)]" /> : <Sun className="h-4 w-4 text-[var(--color-accent-text)]" />}
        {isDark ? "Dark" : "Light"}
      </button>

      <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-end">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 pr-24 sm:pr-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-text)]">
              <Crown className="h-3.5 w-3.5" />
              Premium beginner vault
            </div>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] text-[var(--color-text)] sm:text-5xl lg:text-6xl">
            Learn2Earn Editing Academy
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-text-muted)] sm:text-lg">
            Choose your niche and get hooks, scripts, B-roll ideas, tools, and client templates to start editing like a creator who gets paid.
          </p>

          <button
            type="button"
            onClick={onStart}
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-crimson-gradient px-5 text-sm font-semibold text-[var(--color-on-accent)] shadow-red-glow transition hover:-translate-y-0.5 hover:shadow-red-glow-strong"
          >
            <PlayCircle className="h-5 w-5" />
            Start Learning
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 xl:grid-cols-1">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
              <p className="text-2xl font-semibold text-[var(--color-text)] sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
