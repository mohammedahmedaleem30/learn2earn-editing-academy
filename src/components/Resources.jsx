import { resourceCards } from "../data/academyData";
import { AcademyUnlockGoal, Page } from "./Dashboard";

export default function Resources() {
  return (
    <Page title="Resources" subtitle="Future content infrastructure. No fake downloads or fake lessons.">
      <AcademyUnlockGoal large />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {resourceCards.map((title) => (
          <article key={title} className="rounded-[2rem] border border-dashed border-[var(--app-border-strong)] bg-[var(--app-active)] p-5 shadow-[var(--app-shadow)]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-accent-text)]">Coming soon</p>
            <h2 className="mt-3 text-xl font-black">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">Coming soon after the $100 unlock goal.</p>
          </article>
        ))}
      </div>
    </Page>
  );
}
