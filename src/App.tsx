import {
  BadgeDollarSign,
  BarChart3,
  Check,
  Copy,
  Crown,
  Flame,
  Link2,
  LockKeyhole,
  Menu,
  Percent,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type CommissionType = "Recurring" | "One-Time";
type Difficulty = "Beginner Friendly" | "Intermediate" | "Advanced";

type Offer = {
  id: string;
  productName: string;
  affiliateLink: string;
  description: string;
  price: string;
  commissionPercent: number;
  monthlyCommission: number;
  commissionType: CommissionType;
  estimatedEarnings: string;
  difficulty: Difficulty;
  bestPlatforms: string[];
  targetAudience: string[];
  exampleHooks: string[];
  promotionNotes: string;
};

const filters = ["All", "Recurring", "One-Time", "Beginner Friendly", "High Commission"];
const calculatorNavLabel = "💰 Earnings Calculator";

// Admin settings: update these values in code to control the public vault unlock status.
const vaultProgress = {
  currentFunds: 0,
  nextMilestone: 100,
  nextUnlock: "New Affiliate Opportunity",
  updateCadence: "Weekly / Milestone Based",
};

// Admin settings: update this list in code as upcoming categories change.
const upcomingOpportunities = ["AI Tools", "SaaS Products", "Creator Programs", "High-Ticket Offers"];

const offers: Offer[] = [
  {
    id: "toolsuite",
    productName: "ToolSuite",
    affiliateLink: "https://whop.com/toolsuite/buy-vip?a=youthx",
    description:
      "ToolSuite gives users access to 50+ premium tools through one subscription including AI, design, editing, productivity, and creator tools.",
    price: "$29.95/month",
    commissionPercent: 50,
    monthlyCommission: 14.97,
    commissionType: "Recurring",
    estimatedEarnings: "$14.97/month per active customer",
    difficulty: "Beginner Friendly",
    bestPlatforms: ["TikTok", "YouTube Shorts", "Instagram Reels", "X", "Reddit"],
    targetAudience: ["Content Creators", "Freelancers", "Students", "Entrepreneurs", "Agency Owners"],
    exampleHooks: [
      "Stop paying for multiple subscriptions.",
      "50+ premium tools for less than $30/month.",
      "The creator toolkit nobody talks about.",
      "What if ChatGPT, Canva, and 50+ tools were all in one place?",
    ],
    promotionNotes: "Focus on cost savings, convenience, and creator productivity.",
  },
  {
    id: "deal-soldier",
    productName: "Deal Soldier",
    affiliateLink: "https://whop.com/deal-soldier/deal-soldier?a=youthx",
    description:
      "Deal Soldier helps members find hidden clearance deals at stores like Walmart, Target, Home Depot, and Lowe's so they can resell products for profit.",
    price: "$44/month",
    commissionPercent: 30,
    monthlyCommission: 13.2,
    commissionType: "Recurring",
    estimatedEarnings: "$13.20/month per active customer",
    difficulty: "Beginner Friendly",
    bestPlatforms: ["TikTok", "YouTube Shorts", "Instagram Reels", "Facebook Groups", "Reddit"],
    targetAudience: ["Resellers", "Side Hustlers", "Flippers", "Bargain Hunters", "Walmart Deal Hunters"],
    exampleHooks: [
      "This Walmart clearance trick is crazy.",
      "Most people walk past these profit opportunities.",
      "I found a product for $7 and sold it for $40.",
      "The side hustle nobody is talking about.",
    ],
    promotionNotes: "Focus on reselling, flipping products, and finding hidden deals.",
  },
];

const averageCommission = Math.round(
  offers.reduce((total, offer) => total + offer.commissionPercent, 0) / offers.length,
);

const stats = [
  { label: "Current Opportunities", value: offers.length.toString(), icon: WalletCards },
  { label: "Next Unlock", value: `$${vaultProgress.nextMilestone}`, icon: Target },
  { label: "Update Cadence", value: vaultProgress.updateCadence, icon: TrendingUp },
  { label: "Average Commission", value: `${averageCommission}%`, icon: Percent },
];

const particles = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 43) % 100}%`,
  size: 2 + (index % 3),
  delay: index * 0.38,
}));

function App() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeView, setActiveView] = useState<"offers" | "calculator">("offers");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const visibleOffers = useMemo(() => {
    const term = query.trim().toLowerCase();

    return offers.filter((offer) => {
      const matchesFilter =
        selectedFilter === "All" ||
        offer.commissionType === selectedFilter ||
        offer.difficulty === selectedFilter ||
        (selectedFilter === "High Commission" && offer.commissionPercent >= 40);

      const searchable = [
        offer.productName,
        offer.description,
        offer.price,
        offer.commissionType,
        offer.difficulty,
        offer.bestPlatforms.join(" "),
        offer.targetAudience.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!term || searchable.includes(term));
    });
  }, [query, selectedFilter]);

  const copyAffiliateLink = (link: string, id: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = link;
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      setCopiedId(id);
      setToast("Affiliate link copied ✅");

      setTimeout(() => {
        setCopiedId(null);
        setToast(null);
      }, 2000);
    } catch (err) {
      prompt("Copy this affiliate link:", link);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <motion.main
      className="vault-noise relative min-h-screen overflow-hidden bg-vault-black px-4 py-4 text-vault-cream sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <BackgroundAura />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1480px] gap-4">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.button
              className="fixed inset-0 z-30 bg-black/75 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        <Sidebar
          open={sidebarOpen}
          selectedFilter={selectedFilter}
          activeView={activeView}
          onClose={() => setSidebarOpen(false)}
          onSelectFilter={(filter) => {
            setActiveView("offers");
            setSelectedFilter(filter);
            setSidebarOpen(false);
          }}
          onSelectCalculator={() => {
            setActiveView("calculator");
            setSidebarOpen(false);
          }}
        />

        <section className="flex min-w-0 flex-1 flex-col gap-4">
          {activeView === "offers" ? (
            <>
              <Hero query={query} onQueryChange={setQuery} onMenuClick={() => setSidebarOpen(true)} />
              <StatsGrid />
              <FilterBar selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />

              <OpportunityGrid
                offers={visibleOffers}
                copiedId={copiedId}
                onViewBlueprint={setSelectedOffer}
                onCopyLink={(offer) => copyAffiliateLink(offer.affiliateLink, offer.id)}
              />
            </>
          ) : (
            <EarningsDashboard onMenuClick={() => setSidebarOpen(true)} />
          )}
        </section>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed right-4 top-4 z-[60] rounded-xl border border-vault-gold/30 bg-black/85 px-4 py-3 text-sm font-semibold text-vault-cream shadow-gold backdrop-blur-md sm:right-6 sm:top-6"
            initial={{ y: -18, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedOffer && (
          <BlueprintModal
            offer={selectedOffer}
            copied={copiedId === selectedOffer.id}
            onClose={() => setSelectedOffer(null)}
            onCopyLink={() => copyAffiliateLink(selectedOffer.affiliateLink, selectedOffer.id)}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}

function BackgroundAura() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[8%] top-[5%] h-80 w-80 rounded-full bg-vault-magenta/20 blur-3xl"
        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.52, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[8%] top-[18%] h-80 w-80 rounded-full bg-vault-gold/14 blur-3xl"
        animate={{ x: [0, -28, 0], y: [0, 18, 0], opacity: [0.22, 0.42, 0.22] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-13%] left-[35%] h-96 w-96 rounded-full bg-vault-rose/10 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-vault-gold/50 shadow-gold"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={{ y: [0, -22, 0], opacity: [0.12, 0.7, 0.12] }}
          transition={{ duration: 4.5 + (particle.id % 4), repeat: Infinity, delay: particle.delay }}
        />
      ))}
    </div>
  );
}

type SidebarProps = {
  open: boolean;
  selectedFilter: string;
  activeView: "offers" | "calculator";
  onClose: () => void;
  onSelectFilter: (filter: string) => void;
  onSelectCalculator: () => void;
};

function Sidebar({ open, selectedFilter, activeView, onClose, onSelectFilter, onSelectCalculator }: SidebarProps) {
  return (
    <motion.aside
      className={`glass-panel fixed inset-y-4 left-4 z-40 w-[286px] rounded-xl p-4 transition-transform duration-300 lg:static lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]"
      }`}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-3 text-left" onClick={() => onSelectFilter("All")}>
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-vault-magenta via-vault-rose to-vault-gold shadow-glow">
            <Crown className="h-5 w-5 text-vault-black" />
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-wide text-vault-cream">Affiliate Vault</span>
            <span className="block text-xs uppercase tracking-[0.22em] text-vault-gold">Learn2Earn Academy</span>
          </span>
        </button>

        <button
          className="grid h-9 w-9 place-items-center rounded-lg text-vault-muted hover:bg-vault-cream/10 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-8 space-y-2">
        {filters.map((filter) => (
          <SidebarButton
            key={filter}
            label={filter}
            icon={filterIcon(filter)}
            active={activeView === "offers" && selectedFilter === filter}
            onClick={() => onSelectFilter(filter)}
          />
        ))}
        <SidebarButton
          label={calculatorNavLabel}
          icon={WalletCards}
          active={activeView === "calculator"}
          onClick={onSelectCalculator}
        />
      </nav>

      <div className="mt-8 rounded-xl border border-vault-gold/20 bg-vault-gold/[0.055] p-4 premium-ring">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Flame className="h-4 w-4 text-vault-gold" />
          Marketplace Focus
        </div>
        <p className="mt-3 text-sm leading-6 text-vault-muted">
          Curated opportunities only. Clear commissions. Clean promotion blueprints.
        </p>
      </div>
    </motion.aside>
  );
}

function filterIcon(filter: string): LucideIcon {
  const icons: Record<string, LucideIcon> = {
    All: BarChart3,
    Recurring: TrendingUp,
    "One-Time": BadgeDollarSign,
    "Beginner Friendly": Users,
    "High Commission": Percent,
  };

  return icons[filter] ?? BarChart3;
}

type HeroProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onMenuClick: () => void;
};

function Hero({ query, onQueryChange, onMenuClick }: HeroProps) {
  return (
    <motion.header
      className="glass-panel relative overflow-hidden rounded-xl p-5 sm:p-7"
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,47,179,0.16),transparent_45%,rgba(214,168,79,0.12))]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <button
              className="grid h-10 w-10 place-items-center rounded-lg border border-vault-magenta/25 bg-vault-cream/5 text-vault-cream lg:hidden"
              onClick={onMenuClick}
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="inline-flex items-center gap-2 rounded-full border border-vault-gold/25 bg-vault-gold/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-vault-gold">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Affiliate Marketplace
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-tight text-vault-cream sm:text-5xl lg:text-6xl">
            💸 Affiliate Opportunity Vault
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-vault-muted">
            Curated affiliate programs, commissions, assets, and promotion strategies for Learn2Earn members.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-vault-muted/90">
            Browse high-quality affiliate opportunities, view commission structures, access blueprints, and find programs worth promoting.
          </p>
        </div>

        <motion.div
          className="hidden rounded-xl border border-vault-gold/25 bg-black/35 px-5 py-4 shadow-gold lg:block"
          animate={{
            boxShadow: [
              "0 0 20px rgba(214,168,79,0.12)",
              "0 0 42px rgba(255,47,179,0.22)",
              "0 0 20px rgba(214,168,79,0.12)",
            ],
          }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-vault-gold">
            <WalletCards className="h-4 w-4" />
            Commission Desk
          </div>
          <p className="mt-2 max-w-[230px] text-sm leading-5 text-vault-muted">
            View payouts, study blueprints, and launch cleaner campaigns.
          </p>
        </motion.div>
      </div>

      <div className="relative mt-6 max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-vault-gold" />
        <input
          className="h-14 w-full rounded-xl border border-vault-magenta/20 bg-black/45 pl-12 pr-4 text-sm text-vault-cream outline-none transition placeholder:text-vault-muted/70 focus:border-vault-magenta/70 focus:shadow-glow"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search opportunities, audiences, platforms..."
        />
      </div>
    </motion.header>
  );
}

function StatsGrid() {
  return (
    <motion.section
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          className="glass-panel rounded-xl p-4 premium-ring"
          variants={{ hidden: { y: 18, opacity: 0 }, show: { y: 0, opacity: 1 } }}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 230, damping: 24 }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-vault-muted">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-vault-cream">{stat.value}</p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-vault-gold/25 bg-vault-gold/10 text-vault-gold shadow-gold">
              <stat.icon className="h-5 w-5" />
            </span>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}

type FilterBarProps = {
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
};

function FilterBar({ selectedFilter, onSelectFilter }: FilterBarProps) {
  return (
    <motion.div
      className="flex gap-2 overflow-x-auto pb-1"
      initial={{ y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.12 }}
    >
      {filters.map((filter) => (
        <button
          key={filter}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
            selectedFilter === filter
              ? "border-vault-magenta/70 bg-vault-magenta/18 text-vault-cream shadow-glow"
              : "border-vault-cream/10 bg-vault-cream/[0.035] text-vault-muted hover:border-vault-gold/45 hover:text-vault-cream"
          }`}
          onClick={() => onSelectFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </motion.div>
  );
}

type OpportunityGridProps = {
  offers: Offer[];
  copiedId: string | null;
  onViewBlueprint: (offer: Offer) => void;
  onCopyLink: (offer: Offer) => void;
};

function OpportunityGrid({ offers, copiedId, onViewBlueprint, onCopyLink }: OpportunityGridProps) {
  return (
    <section className="glass-panel min-h-[500px] rounded-xl p-4 sm:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-vault-gold">Opportunity Board</p>
          <h2 className="mt-1 text-xl font-semibold text-vault-cream">Affiliate Offers</h2>
        </div>
        <span className="rounded-full border border-vault-gold/25 bg-vault-gold/10 px-3 py-1 text-sm text-vault-gold">
          {offers.length} available
        </span>
      </div>

      <motion.div
        className="mt-5 grid gap-4 lg:grid-cols-2"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        animate="show"
      >
        {offers.map((offer) => (
          <OfferCard
            key={offer.productName}
            offer={offer}
            copied={copiedId === offer.id}
            onViewBlueprint={() => onViewBlueprint(offer)}
            onCopyLink={() => onCopyLink(offer)}
          />
        ))}
      </motion.div>

      {offers.length === 0 && (
        <div className="grid min-h-[280px] place-items-center text-center">
          <div>
            <Target className="mx-auto h-9 w-9 text-vault-magenta" />
            <h3 className="mt-3 text-lg font-semibold text-vault-cream">No opportunities found</h3>
            <p className="mt-1 max-w-sm text-sm text-vault-muted">Try another search term or filter.</p>
          </div>
        </div>
      )}

      <ComingSoonUnlockCard />
    </section>
  );
}

function ComingSoonUnlockCard() {
  const progressPercent = Math.min(
    100,
    Math.round((vaultProgress.currentFunds / vaultProgress.nextMilestone) * 100),
  );

  return (
    <motion.article
      className="mt-5 overflow-hidden rounded-xl border border-vault-magenta/25 bg-black/40 p-5 shadow-glow premium-ring"
      initial={{ y: 22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <motion.span
              className="grid h-12 w-12 place-items-center rounded-xl border border-vault-gold/25 bg-vault-gold/10 text-vault-gold shadow-gold"
              animate={{ scale: [1, 1.06, 1], rotate: [0, -4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <LockKeyhole className="h-5 w-5" />
            </motion.span>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-vault-gold">Unlock System</p>
              <h3 className="mt-1 text-2xl font-semibold text-vault-cream">🚀 More Opportunities Coming Soon</h3>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-vault-muted">
            New affiliate opportunities will be added weekly OR when the vault reaches the next funding milestone.
          </p>
          <p className="mt-3 text-sm font-semibold text-vault-cream">
            $100 reached = unlock a new curated affiliate opportunity.
          </p>
        </div>

        <div className="w-full rounded-xl border border-vault-cream/10 bg-vault-cream/[0.035] p-4 lg:max-w-md">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-vault-muted">Current Vault Funds</span>
            <span className="font-semibold text-vault-gold">
              ${vaultProgress.currentFunds} / ${vaultProgress.nextMilestone}
            </span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-black/60 ring-1 ring-vault-cream/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-vault-gold via-vault-rose to-vault-magenta shadow-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="mt-3 text-sm text-vault-muted">
            Next unlock: <span className="font-semibold text-vault-cream">{vaultProgress.nextUnlock}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {upcomingOpportunities.map((item) => (
          <div key={item} className="rounded-lg border border-vault-gold/15 bg-vault-gold/[0.055] px-3 py-3 text-sm font-semibold text-vault-gold">
            {item}
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-5 text-vault-muted">
        Opportunities are manually curated by Learn2Earn. Quality over quantity.
      </p>
    </motion.article>
  );
}

type OfferCardProps = {
  offer: Offer;
  copied: boolean;
  onViewBlueprint: () => void;
  onCopyLink: () => void;
};

function OfferCard({ offer, copied, onViewBlueprint, onCopyLink }: OfferCardProps) {
  return (
    <motion.article
      className="rounded-xl border border-vault-cream/10 bg-vault-cream/[0.035] p-5 premium-ring"
      variants={{ hidden: { y: 22, opacity: 0 }, show: { y: 0, opacity: 1 } }}
      whileHover={{ y: -7, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-vault-gold">{offer.commissionType}</p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight text-vault-cream">{offer.productName}</h3>
        </div>
        <div className="rounded-full border border-vault-magenta/25 bg-vault-magenta/12 px-3 py-1 text-sm font-semibold text-vault-rose">
          {offer.commissionPercent}%
        </div>
      </div>

      <p className="mt-4 min-h-[72px] text-sm leading-6 text-vault-muted">{offer.description}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <CardMetric label="Price" value={offer.price} />
        <CardMetric label="Commission" value={`${offer.commissionPercent}%`} />
        <CardMetric label="Est. Earnings" value={offer.estimatedEarnings} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <ActionButton icon={Target} label="View Blueprint" onClick={onViewBlueprint} variant="primary" />
        <ActionButton
          icon={copied ? Check : Copy}
          label={copied ? "Copied ✅" : "Copy My Affiliate Link"}
          onClick={onCopyLink}
          success={copied}
        />
      </div>
    </motion.article>
  );
}

type BlueprintModalProps = {
  offer: Offer;
  copied: boolean;
  onClose: () => void;
  onCopyLink: () => void;
};

function BlueprintModal({ offer, copied, onClose, onCopyLink }: BlueprintModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/82 p-3 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        className="glass-panel max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl p-5 neon-border sm:p-6"
        initial={{ y: 42, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 28, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 185, damping: 23 }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-vault-gold">Affiliate Blueprint</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-vault-cream">{offer.productName}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-vault-muted">
              A focused promotion plan for Learn2Earn members who want to promote this opportunity with clear positioning,
              practical angles, and a strong affiliate link.
            </p>
          </div>
          <button
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-vault-cream/10 text-vault-muted hover:bg-vault-cream/8"
            onClick={onClose}
            aria-label="Close blueprint"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <CardMetric label="Price" value={offer.price} />
          <CardMetric label="Commission" value={`${offer.commissionPercent}% ${offer.commissionType}`} />
          <CardMetric label="Estimated Earnings" value={offer.estimatedEarnings} />
          <CardMetric label="Difficulty" value={offer.difficulty} />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <BlueprintBlock title="Overview" icon={Crown}>
            <p>{offer.productName} is a curated affiliate opportunity inside the Learn2Earn Academy vault.</p>
          </BlueprintBlock>
          <BlueprintBlock title="Product Description" icon={WalletCards}>
            <p>{offer.description}</p>
          </BlueprintBlock>
          <BlueprintBlock title="Commission Breakdown" icon={BadgeDollarSign}>
            <p>
              {offer.commissionPercent}% {offer.commissionType.toLowerCase()} commission on {offer.price}. Estimated earnings are{" "}
              {offer.estimatedEarnings}.
            </p>
          </BlueprintBlock>
          <BlueprintBlock title="Target Audience" icon={Users}>
            <PillList items={offer.targetAudience} />
          </BlueprintBlock>
          <BlueprintBlock title="Best Platforms" icon={BarChart3}>
            <PillList items={offer.bestPlatforms} />
          </BlueprintBlock>
          <BlueprintBlock title="Example Hooks" icon={Flame}>
            <BulletList items={offer.exampleHooks} />
          </BlueprintBlock>
          <div className="lg:col-span-2">
            <BlueprintBlock title="Promotion Notes" icon={Sparkles}>
              <p>{offer.promotionNotes}</p>
            </BlueprintBlock>
          </div>
        </div>

        <motion.button
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-vault-magenta via-vault-rose to-vault-gold px-5 text-sm font-semibold text-vault-black shadow-glow"
          onClick={onCopyLink}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          animate={{
            boxShadow: [
              "0 0 18px rgba(255,47,179,0.18)",
              "0 0 42px rgba(255,47,179,0.36)",
              "0 0 18px rgba(255,47,179,0.18)",
            ],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
        {copied ? <Check className="h-5 w-5" /> : <Link2 className="h-5 w-5" />}
          {copied ? "Copied ✅" : "Copy My Affiliate Link"}
        </motion.button>
      </motion.section>
    </motion.div>
  );
}

type BlueprintBlockProps = {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
};

function BlueprintBlock({ title, icon: Icon, children }: BlueprintBlockProps) {
  return (
    <div className="rounded-xl border border-vault-cream/10 bg-black/35 p-4 premium-ring">
      <div className="flex items-center gap-2 text-sm font-semibold text-vault-gold">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <div className="mt-3 text-sm leading-6 text-vault-muted">{children}</div>
    </div>
  );
}

function CardMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-vault-cream/10 bg-black/35 p-3">
      <div className="text-[10px] uppercase tracking-[0.16em] text-vault-muted">{label}</div>
      <div className="mt-1 text-sm font-semibold leading-5 text-vault-cream">{value}</div>
    </div>
  );
}

function EarningsDashboard({ onMenuClick }: { onMenuClick: () => void }) {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [customersByOffer, setCustomersByOffer] = useState<Record<string, number>>({
    toolsuite: 0,
    "deal-soldier": 0,
  });

  const rows = offers.map((offer) => {
    const customers = customersByOffer[offer.id] ?? 0;
    const monthly = customers * offer.monthlyCommission;
    const yearly = monthly * 12;

    return { offer, customers, monthly, yearly };
  });

  const totalMonthly = rows.reduce((total, row) => total + row.monthly, 0);
  const totalYearly = totalMonthly * 12;
  const totalCustomers = rows.reduce((total, row) => total + row.customers, 0);
  const bestRow = rows.reduce((best, row) => (row.monthly > best.monthly ? row : best), rows[0]);
  const balance = period === "monthly" ? totalMonthly : totalYearly;

  const updateCustomers = (offerId: string, value: number) => {
    setCustomersByOffer((current) => ({
      ...current,
      [offerId]: Number.isFinite(value) && value >= 0 ? value : 0,
    }));
  };

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <section className="glass-panel relative overflow-hidden rounded-xl p-5 sm:p-7">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,47,179,0.14),transparent_46%,rgba(214,168,79,0.14))]" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <button
                className="grid h-10 w-10 place-items-center rounded-lg border border-vault-magenta/25 bg-vault-cream/5 text-vault-cream lg:hidden"
                onClick={onMenuClick}
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <span className="inline-flex items-center gap-2 rounded-full border border-vault-gold/25 bg-vault-gold/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-vault-gold">
                <WalletCards className="h-3.5 w-3.5" />
                Affiliate Bank Desk
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-vault-cream sm:text-5xl">Earnings Calculator</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-vault-muted sm:text-base">
              Estimate your potential affiliate income across all opportunities.
            </p>
          </div>

          <div className="flex rounded-xl border border-vault-cream/10 bg-black/45 p-1">
            {(["monthly", "yearly"] as const).map((item) => (
              <button
                key={item}
                className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
                  period === item ? "bg-vault-magenta/20 text-vault-cream shadow-glow" : "text-vault-muted hover:text-vault-cream"
                }`}
                onClick={() => setPeriod(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <motion.div
          className="glass-panel relative overflow-hidden rounded-xl border-vault-magenta/30 p-6 neon-border"
          animate={{
            boxShadow: [
              "0 0 24px rgba(255,47,179,0.12)",
              "0 0 52px rgba(214,168,79,0.18)",
              "0 0 24px rgba(255,47,179,0.12)",
            ],
          }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute right-6 top-6 grid h-14 w-14 place-items-center rounded-full border border-vault-gold/25 bg-vault-gold/12 text-2xl shadow-gold"
            animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            💰
          </motion.div>
          <p className="text-xs uppercase tracking-[0.24em] text-vault-gold">Estimated Bank Balance</p>
          <motion.div
            key={`${period}-${balance}`}
            className="mt-5 max-w-full break-words text-5xl font-black tracking-tight text-vault-gold sm:text-7xl"
            initial={{ y: 16, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {formatCurrency(balance)}
          </motion.div>
          <p className="mt-3 text-sm text-vault-muted">
            Showing projected {period === "monthly" ? "monthly" : "yearly"} affiliate earnings.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <DashboardMetric label="Total Monthly Earnings" value={formatCurrency(totalMonthly)} />
          <DashboardMetric label="Total Yearly Earnings" value={formatCurrency(totalYearly)} />
          <DashboardMetric label="Total Customers Referred" value={totalCustomers.toString()} />
          <DashboardMetric label="Best Earning Offer" value={bestRow.monthly > 0 ? bestRow.offer.productName : "None yet"} />
        </div>
      </section>

      <section className="glass-panel rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-vault-gold">Offer Calculators</p>
            <h2 className="mt-1 text-xl font-semibold text-vault-cream">Commission Rows</h2>
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          {rows.map((row) => (
            <CalculatorOfferRow key={row.offer.id} row={row} onChange={updateCustomers} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function DashboardMetric({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      className="glass-panel rounded-xl p-4 premium-ring"
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 230, damping: 24 }}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-vault-muted">{label}</p>
      <motion.p
        key={value}
        className="mt-2 break-words text-2xl font-semibold text-vault-gold"
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}

type CalculatorRow = {
  offer: Offer;
  customers: number;
  monthly: number;
  yearly: number;
};

function CalculatorOfferRow({ row, onChange }: { row: CalculatorRow; onChange: (offerId: string, value: number) => void }) {
  return (
    <motion.article
      className="grid gap-4 rounded-xl border border-vault-magenta/20 bg-black/35 p-4 premium-ring lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]"
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 230, damping: 24 }}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-vault-gold">{row.offer.commissionType}</p>
        <h3 className="mt-2 text-xl font-semibold text-vault-cream">{row.offer.productName}</h3>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-vault-muted">Commission per customer</p>
        <p className="mt-2 text-lg font-semibold text-vault-gold">{formatCurrency(row.offer.monthlyCommission)}</p>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.16em] text-vault-muted" htmlFor={`customers-${row.offer.id}`}>
          Customers referred
        </label>
        <input
          id={`customers-${row.offer.id}`}
          className="mt-2 h-11 w-full rounded-lg border border-vault-cream/10 bg-black/60 px-3 text-sm font-semibold text-vault-cream outline-none transition focus:border-vault-magenta/70 focus:shadow-glow"
          type="number"
          min="0"
          value={row.customers}
          onChange={(event) => onChange(row.offer.id, Number(event.target.value))}
        />
      </div>

      <BankResult label="Monthly earnings" value={formatCurrency(row.monthly)} />
      <BankResult label="Yearly earnings" value={formatCurrency(row.yearly)} />
    </motion.article>
  );
}

function BankResult({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-vault-gold/20 bg-vault-gold/[0.055] p-3">
      <p className="text-xs uppercase tracking-[0.16em] text-vault-muted">{label}</p>
      <motion.p
        key={value}
        className="mt-2 text-lg font-semibold text-vault-gold"
        initial={{ y: 8, opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {value}
      </motion.p>
    </div>
  );
}

function EarningResult({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-vault-gold/20 bg-vault-gold/[0.06] p-3 text-right">
      <div className="text-[10px] uppercase tracking-[0.16em] text-vault-muted">{label}</div>
      <motion.div
        key={value}
        className="mt-1 text-xl font-semibold text-vault-gold"
        initial={{ y: 8, opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {value}
      </motion.div>
    </div>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-vault-gold/18 bg-vault-gold/8 px-3 py-1 text-xs text-vault-gold">
          {item}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vault-magenta shadow-glow" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type ActionButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  success?: boolean;
};

function ActionButton({ icon: Icon, label, onClick, variant = "secondary", success = false }: ActionButtonProps) {
  return (
    <motion.button
      className={`flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 text-xs font-semibold transition ${
        success
          ? "border border-vault-gold/45 bg-vault-gold/15 text-vault-gold shadow-gold"
          : 
        variant === "primary"
          ? "bg-gradient-to-r from-vault-magenta via-vault-rose to-vault-gold text-vault-black shadow-glow"
          : "border border-vault-cream/10 bg-black/35 text-vault-cream hover:border-vault-magenta/45"
      }`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      animate={success ? { scale: [1, 1.04, 1], boxShadow: "0 0 34px rgba(214,168,79,0.28)" } : { scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="leading-tight">{label}</span>
    </motion.button>
  );
}

type SidebarButtonProps = {
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
};

function SidebarButton({ label, icon: Icon, active, onClick }: SidebarButtonProps) {
  return (
    <button
      className={`flex h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-sm transition ${
        active
          ? "border border-vault-magenta/50 bg-vault-magenta/16 text-vault-cream shadow-glow"
          : "border border-transparent text-vault-muted hover:border-vault-gold/20 hover:bg-vault-cream/[0.045] hover:text-vault-cream"
      }`}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </button>
  );
}

export default App;
