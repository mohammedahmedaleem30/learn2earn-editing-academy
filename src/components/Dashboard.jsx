import { ArrowRight, FileText, Film, Flame, Play, Send, Sparkles } from "lucide-react";

const features = [
  ["Hooks", "Short opening lines for scroll-stopping edits.", Flame],
  ["Scripts", "Simple structures for different video types.", FileText],
  ["B-Roll", "Useful visual ideas by niche.", Film],
  ["Client Templates", "Starter messages for outreach and delivery.", Send],
];

export default function Dashboard({ setPage }) {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-[var(--app-shadow)] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,var(--app-active),transparent_26rem)]" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--app-border-strong)] bg-[var(--app-active)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-accent-text)]">
              <Sparkles className="h-3.5 w-3.5" />
              Free beginner academy
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">Learn2Earn Editing Academy</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--app-muted)]">
              A free editing resource hub for beginners learning how to create better videos, build proof, and get paid.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <HeroButton label="Start with a niche" onClick={() => setPage("niches")} primary />
              <HeroButton label="Browse tools" onClick={() => setPage("tools")} />
            </div>
          </div>
          <div className="relative mx-auto grid h-52 w-full max-w-[280px] place-items-center rounded-[2rem] border border-[var(--app-border-strong)] bg-[linear-gradient(145deg,rgba(220,20,60,0.2),rgba(255,255,255,0.03))] shadow-[var(--app-glow)]">
            <div className="grid h-24 w-24 place-items-center rounded-[1.6rem] bg-[var(--app-accent-gradient)] shadow-[0_24px_70px_rgba(220,20,60,0.35)]">
              <Play className="ml-1 h-11 w-11 fill-white text-white" />
            </div>
          </div>
        </div>
      </section>

      <AcademyUnlockGoal />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {features.map(([title, text, Icon]) => (
          <article key={title} className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--app-active)] text-[var(--app-accent)]">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-lg font-black">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export function AcademyUnlockGoal({ large = false }) {
  return (
    <section className={`rounded-[2rem] border border-[var(--app-border-strong)] bg-[linear-gradient(135deg,var(--app-active),rgba(220,20,60,0.04))] p-5 shadow-[var(--app-glow)] ${large ? "sm:p-7" : ""}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-accent-text)]">Academy Unlock Goal</p>
          <h2 className="mt-2 text-2xl font-black">Current: $0 / Goal: $100</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--app-muted)]">
            When Learn2Earn reaches $100 in support, the next content drop unlocks: hook packs, script templates, B-roll assets, and editing guides.
          </p>
        </div>
        <div className="shrink-0 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3 text-sm font-black text-[var(--app-accent-text)]">
          0% funded
        </div>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-[var(--app-surface)] ring-1 ring-[var(--app-border)]">
        <div className="h-full w-0 rounded-full bg-[var(--app-accent-gradient)]" />
      </div>
    </section>
  );
}

function HeroButton({ label, onClick, primary }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black transition hover:-translate-y-0.5 ${
        primary ? "bg-[var(--app-accent-gradient)] text-white shadow-[var(--app-glow)]" : "border border-[var(--app-border)] bg-[var(--app-button)] text-[var(--app-text)]"
      }`}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

export function Page({ title, subtitle, children }) {
  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-[var(--app-shadow)]">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--app-accent-text)]">Learn2Earn Academy</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--app-muted)] sm:text-base">{subtitle}</p>
      </header>
      {children}
    </div>
  );
}
