import {
  Bot,
  BriefcaseBusiness,
  Clapperboard,
  Film,
  Flame,
  Layers3,
  PenLine,
  Scissors,
  Send,
} from "lucide-react";
import { useMemo, useState } from "react";
import CopyButton from "./components/CopyButton";
import Hero from "./components/Hero";
import NicheSelector from "./components/NicheSelector";
import SectionCard, { NumberedList, ToolGrid } from "./components/SectionCard";
import Sidebar from "./components/Sidebar";
import { academyStats, niches } from "./data/academyData";

const sectionMeta = {
  hooks: { id: "hooks", title: "Hooks", eyebrow: "Attention starters", icon: Flame },
  scripts: { id: "scripts", title: "Script Frameworks", eyebrow: "Retention structure", icon: PenLine },
  broll: { id: "broll", title: "B-Roll Ideas", eyebrow: "Visual library", icon: Film },
  software: { id: "software", title: "Editing Software", eyebrow: "Editor stack", icon: Scissors },
  ai: { id: "ai-tools", title: "AI Tools For Editors", eyebrow: "Workflow boosters", icon: Bot },
  clients: { id: "clients", title: "Client Acquisition", eyebrow: "Outreach templates", icon: Send },
};

export default function App() {
  const [selectedNicheId, setSelectedNicheId] = useState("business");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState("");

  const selectedNiche = useMemo(
    () => niches.find((niche) => niche.id === selectedNicheId) ?? niches[0],
    [selectedNicheId],
  );

  const showCopied = (key) => {
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((current) => (current === key ? "" : current)), 1600);
  };

  const selectNiche = (id) => {
    setSelectedNicheId(id);
    setMobileOpen(false);
  };

  const scrollToNiches = () => {
    document.getElementById("niches")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="academy-noise min-h-screen bg-[#070707] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[12%] top-[-12%] h-96 w-96 rounded-full bg-crimson-700/20 blur-3xl" />
        <div className="absolute right-[-6%] top-[18%] h-96 w-96 rounded-full bg-[#DC143C]/14 blur-3xl" />
        <div className="absolute bottom-[-18%] left-[38%] h-[28rem] w-[28rem] rounded-full bg-[#C9A36A]/8 blur-3xl" />
      </div>

      <div className="relative z-10 lg:flex">
        <Sidebar
          niches={niches}
          selectedNicheId={selectedNicheId}
          onSelectNiche={selectNiche}
          mobileOpen={mobileOpen}
          onToggleMobile={() => setMobileOpen((open) => !open)}
        />

        <div className="min-w-0 flex-1 px-4 pb-10 pt-20 sm:px-6 lg:px-8 lg:pt-6">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-6">
            <Hero stats={academyStats} onStart={scrollToNiches} />

            <NicheSelector niches={niches} selectedNicheId={selectedNicheId} onSelectNiche={selectNiche} />

            <section className="rounded-xl border border-crimson-300/20 bg-[#111111] p-5 shadow-panel sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-crimson-gradient shadow-red-glow">
                    <BriefcaseBusiness className="h-6 w-6 text-white" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-crimson-200">Selected niche</p>
                    <h2 className="mt-1 text-3xl font-semibold text-white">{selectedNiche.name}</h2>
                  </div>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-zinc-400">
                  Built for editors serving {selectedNiche.audience}: copy a hook, use a script structure, collect matching B-roll, and pitch creators with a clean offer.
                </p>
              </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
              <div className="flex min-w-0 flex-col gap-6">
                <SectionCard
                  {...sectionMeta.hooks}
                  action={
                    <CopyButton
                      text={selectedNiche.hooks.join("\n")}
                      label={copiedKey === `${selectedNiche.id}-all-hooks` ? "Copied!" : "Copy All Hooks"}
                      copiedLabel="Copied!"
                      onCopied={() => showCopied(`${selectedNiche.id}-all-hooks`)}
                    />
                  }
                >
                  <NumberedList
                    items={selectedNiche.hooks}
                    renderAction={(item, index) => (
                      <CopyButton
                        text={item}
                        label={copiedKey === `${selectedNiche.id}-hook-${index}` ? "Copied!" : "Copy"}
                        copiedLabel="Copied!"
                        onCopied={() => showCopied(`${selectedNiche.id}-hook-${index}`)}
                      />
                    )}
                  />
                </SectionCard>

                <SectionCard {...sectionMeta.scripts}>
                  <NumberedList items={selectedNiche.scriptFrameworks} />
                </SectionCard>

                <SectionCard {...sectionMeta.broll}>
                  <NumberedList items={selectedNiche.brollIdeas} />
                </SectionCard>
              </div>

              <div className="flex min-w-0 flex-col gap-6">
                <SectionCard {...sectionMeta.software}>
                  <ToolGrid items={selectedNiche.editingSoftware} />
                </SectionCard>

                <SectionCard {...sectionMeta.ai}>
                  <ToolGrid items={selectedNiche.aiTools} />
                </SectionCard>

                <SectionCard {...sectionMeta.clients}>
                  <NumberedList
                    items={selectedNiche.clientTemplates}
                    renderAction={(item, index) => (
                      <CopyButton
                        text={item}
                        label={copiedKey === `${selectedNiche.id}-template-${index}` ? "Copied!" : "Copy"}
                        copiedLabel="Copied!"
                        onCopied={() => showCopied(`${selectedNiche.id}-template-${index}`)}
                      />
                    )}
                  />
                </SectionCard>

                <section className="rounded-xl border border-white/10 bg-black/30 p-5">
                  <div className="flex items-center gap-3 text-white">
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-crimson-300/20 bg-crimson-500/12">
                      <Layers3 className="h-5 w-5 text-crimson-100" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Beginner workflow</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Hook {"->"} Edit {"->"} Pitch</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-400">
                    Start with one niche, build three sample edits, then send the client templates with a free sample offer.
                  </p>
                </section>
              </div>
            </div>

            <footer className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Clapperboard className="h-4 w-4 text-crimson-200" />
                <span>Learn2Earn Editing Academy</span>
              </div>
              <span>Static vault. No login, backend, database, or AI API.</span>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
