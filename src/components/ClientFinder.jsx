import { clientTemplates } from "../data/academyData";
import CopyButton from "./CopyButton";
import { Page } from "./Dashboard";

export default function ClientFinder({ copiedId, onCopied }) {
  return (
    <Page title="Client Templates" subtitle="Simple starter messages for practicing outreach and delivery.">
      <div className="grid gap-4 lg:grid-cols-2">
        {clientTemplates.map((template) => (
          <article key={template.title} className="rounded-[2rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
            <h2 className="text-xl font-black">{template.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">{template.text}</p>
            <div className="mt-4">
              <CopyButton text={template.text} copied={copiedId === template.title} onCopy={() => onCopied(template.title)} />
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}
