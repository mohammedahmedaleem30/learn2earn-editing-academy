import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import BRollVault from "./components/BRollVault";
import ClientFinder from "./components/ClientFinder";
import Dashboard from "./components/Dashboard";
import EditingTools from "./components/EditingTools";
import HookVault from "./components/HookVault";
import NicheVault from "./components/NicheVault";
import Resources from "./components/Resources";
import ScriptVault from "./components/ScriptVault";
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";
import { navItems } from "./data/academyData";

const THEME_KEY = "learn2earn-theme";

function getInitialTheme() {
  const htmlTheme = document.documentElement.dataset.theme;
  if (htmlTheme === "light" || htmlTheme === "dark") return htmlTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [toast, setToast] = useState("");
  const [copiedId, setCopiedId] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Theme still works for the current session if storage is blocked.
    }
  }, [theme]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1600);
  };

  const copyText = (id) => {
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((current) => (current === id ? "" : current)), 1300);
    showToast("Copied");
  };

  const changePage = (id) => {
    setPage(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = {
    home: <Dashboard setPage={changePage} />,
    niches: <NicheVault />,
    hooks: <HookVault copiedId={copiedId} onCopied={copyText} />,
    scripts: <ScriptVault copiedId={copiedId} onCopied={copyText} />,
    broll: <BRollVault />,
    tools: <EditingTools />,
    clients: <ClientFinder copiedId={copiedId} onCopied={copyText} />,
    resources: <Resources />,
  };

  return (
    <main className="app-shell min-h-screen bg-[var(--app-bg)] text-[var(--app-text)]">
      <Toast toast={toast} />

      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[var(--app-border)] bg-[var(--app-sidebar)] px-4 shadow-[var(--app-shadow)] lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--app-border)] bg-[var(--app-button)]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <p className="min-w-0 truncate text-sm font-black">Learn2Earn Editing Academy</p>
        <div className="h-10 w-10" />
      </header>

      {mobileOpen ? <button className="fixed inset-0 z-40 bg-[var(--app-overlay)] lg:hidden" aria-label="Close menu" onClick={() => setMobileOpen(false)} /> : null}

      <div className={`fixed inset-y-0 left-0 z-50 w-[292px] border-r border-[var(--app-border)] bg-[var(--app-sidebar)] shadow-[var(--app-shadow)] transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar
          items={navItems}
          page={page}
          setPage={changePage}
          theme={theme}
          toggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        />
      </div>

      <section className="relative z-10 px-4 pb-12 pt-20 sm:px-6 lg:ml-[292px] lg:px-8 lg:pt-6">
        <div className="mx-auto max-w-[1220px]">{pages[page] ?? pages.home}</div>
      </section>
    </main>
  );
}
