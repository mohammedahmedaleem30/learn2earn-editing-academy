export default function SectionCard({ id, title, eyebrow, icon: Icon, children, action }) {
  return (
    <section id={id} className="scroll-mt-6 rounded-xl border border-white/10 bg-[#111111] p-5 shadow-panel sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-crimson-300/20 bg-crimson-500/12 text-crimson-100 shadow-red-glow">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-crimson-200">{eyebrow}</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">{title}</h2>
          </div>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

export function NumberedList({ items, renderAction }) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <article
          key={`${item}-${index}`}
          className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/30 p-4 transition hover:border-crimson-400/30 hover:bg-crimson-500/[0.06] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 gap-3">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-crimson-500/15 text-xs font-semibold text-crimson-100">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="min-w-0 text-sm leading-6 text-zinc-200">{item}</p>
          </div>
          {renderAction ? <div className="shrink-0">{renderAction(item, index)}</div> : null}
        </article>
      ))}
    </div>
  );
}

export function ToolGrid({ items }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <article key={item.name} className="rounded-lg border border-white/10 bg-black/30 p-4 transition hover:border-crimson-400/30">
          <h3 className="text-base font-semibold text-white">{item.name}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
        </article>
      ))}
    </div>
  );
}
