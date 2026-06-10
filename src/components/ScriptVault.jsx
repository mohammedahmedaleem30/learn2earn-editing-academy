import { scriptTemplates } from "../data/academyData";
import CopyButton from "./CopyButton";
import { Page } from "./Dashboard";

export default function ScriptVault({ copiedId, onCopied }) {
  return (
    <Page title="Script Templates" subtitle="Simple frameworks for practicing clean short-form structure.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {scriptTemplates.map((script) => (
          <article key={script.id} className="rounded-[2rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
            <h2 className="text-xl font-black">{script.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">{script.purpose}</p>
            <div className="mt-5 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-4 text-sm font-semibold">
              {script.structure}
            </div>
            <div className="mt-4">
              <CopyButton text={script.structure} copied={copiedId === script.id} onCopy={() => onCopied(script.id)} label="Copy template" />
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}
