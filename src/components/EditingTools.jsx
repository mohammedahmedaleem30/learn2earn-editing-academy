import { ExternalLink } from "lucide-react";
import { tools } from "../data/academyData";
import { Page } from "./Dashboard";

export default function EditingTools() {
  return (
    <Page title="Editing Tools" subtitle="Starter tools for editing, scripting, design, voiceover, and creative workflows.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tools.map((tool) => (
          <article key={tool.name} className="rounded-[2rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--app-accent-gradient)] text-sm font-black text-white shadow-[var(--app-glow)]">
                {tool.initials}
              </span>
              <span className="rounded-full bg-[var(--app-active)] px-3 py-1 text-xs font-bold text-[var(--app-accent-text)]">{tool.type}</span>
            </div>
            <h2 className="mt-5 text-xl font-black">{tool.name}</h2>
            <p className="mt-3 min-h-[64px] text-sm leading-6 text-[var(--app-muted)]">{tool.bestFor}</p>
            <a
              href={tool.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-button)] px-3 text-sm font-black"
            >
              Open Tool <ExternalLink className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </Page>
  );
}
