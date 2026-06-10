import {
  BadgeDollarSign,
  BarChart3,
  BookOpen,
  Bot,
  Calculator,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Filter,
  Home,
  Library,
  Menu,
  Moon,
  Percent,
  RotateCcw,
  Search,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Wand2,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type CommissionType = "Recurring" | "One-Time";
type Difficulty = "Beginner Friendly" | "Intermediate" | "Advanced";
type Theme = "light" | "dark";
type Page =
  | "dashboard"
  | "opportunities"
  | "ai-tools"
  | "hook-generator"
  | "resources"
  | "level-system"
  | "calculator";
type FilterKey = "All" | "Recurring" | "One-Time" | "Beginner Friendly" | "High Commission" | "Trading" | "Software" | "AI";
type BlueprintTab = "Overview" | "Audience" | "Content Ideas" | "Promotion Strategy" | "Resources";

type OfferPlan = {
  id: string;
  name: string;
  price: string;
  monthlyPrice: number;
  commission: string;
  affiliateLink: string;
};

type Offer = {
  id: string;
  productName: string;
  affiliateLink: string;
  description: string;
  category: string;
  rating?: number;
  reviews?: number;
  members?: string;
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
  pros?: string[];
  promotionAngles?: string[];
  contentIdeas?: string[];
  earningsPotential?: string;
  marketingChannels?: string[];
  plans?: OfferPlan[];
};

type AiTool = {
  name: string;
  description: string;
  useCase: string;
  url: string;
};

type ProgressState = {
  xp: number;
  timeXp: number;
  activeSeconds: number;
  completedActions: Record<string, CompletedAction>;
};

type CalculatorSummary = {
  monthly: number;
  yearly: number;
  customers: number;
};

type CompletedAction = {
  label: string;
  xp: number;
  date: string;
};

const THEME_STORAGE_KEY = "affiliate-opportunity-vault-theme";
const PROGRESS_STORAGE_KEY = "affiliate-vault-progress";
const CALCULATOR_STORAGE_KEY = "affiliate-vault-calculator-summary";
const CALCULATOR_CUSTOMERS_KEY = "affiliate-vault-calculator-customers";
const CALCULATOR_PLANS_KEY = "affiliate-vault-calculator-plans";

const rankLadder = [
  { name: "Bronze I", xp: 0 },
  { name: "Bronze II", xp: 100 },
  { name: "Bronze III", xp: 250 },
  { name: "Silver I", xp: 500 },
  { name: "Silver II", xp: 850 },
  { name: "Silver III", xp: 1250 },
  { name: "Gold I", xp: 1800 },
  { name: "Gold II", xp: 2500 },
  { name: "Gold III", xp: 3300 },
  { name: "Platinum I", xp: 4500 },
  { name: "Platinum II", xp: 6000 },
  { name: "Platinum III", xp: 7800 },
  { name: "Diamond I", xp: 10000 },
  { name: "Diamond II", xp: 13000 },
  { name: "Diamond III", xp: 16500 },
  { name: "Onyx I", xp: 20500 },
  { name: "Onyx II", xp: 25000 },
  { name: "Onyx III", xp: 30000 },
  { name: "Arch Nemesis I", xp: 36000 },
  { name: "Arch Nemesis II", xp: 43000 },
  { name: "Arch Nemesis III", xp: 51000 },
  { name: "Nemesis", xp: 60000 },
];

const offers: Offer[] = [
  {
    id: "toolsuite",
    productName: "ToolSuite",
    affiliateLink: "https://whop.com/toolsuite/buy-vip?a=youthx",
    description:
      "ToolSuite gives users access to 50+ premium tools through one subscription including AI, design, editing, productivity, and creator tools.",
    category: "AI Tools / Creator Tools",
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
    contentIdeas: ["Tool stack comparisons", "Creator workflow demos", "Subscription cost breakdowns", "AI productivity tutorials"],
    marketingChannels: ["TikTok", "YouTube Shorts", "Instagram Reels", "X", "Reddit"],
  },
  {
    id: "deal-soldier",
    productName: "Deal Soldier",
    affiliateLink: "https://whop.com/deal-soldier/deal-soldier?a=youthx",
    description:
      "Deal Soldier helps members find hidden clearance deals at stores like Walmart, Target, Home Depot, and Lowe's so they can resell products for profit.",
    category: "Reselling / Side Hustle",
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
    contentIdeas: ["Clearance deal breakdowns", "Flip margin examples", "Store walkthrough content", "Beginner reseller checklists"],
    marketingChannels: ["TikTok", "Facebook Groups", "YouTube Shorts", "Reddit"],
  },
  {
    id: "friends-family-tickets",
    productName: "Friends and Family x Tickets",
    affiliateLink: "https://whop.com/fnfcommunity/concert-event-tickets?a=youthx",
    description:
      "Friends and Family is a ticket reselling community for people interested in concerts, events, collectibles, resale opportunities, and casual flipping.",
    category: "Reselling / Tickets",
    rating: 4.9,
    reviews: 429,
    price: "$50/month",
    commissionPercent: 20,
    monthlyCommission: 10,
    commissionType: "Recurring",
    estimatedEarnings: "$10/month per active customer",
    difficulty: "Beginner Friendly",
    bestPlatforms: ["TikTok", "YouTube Shorts", "Instagram Reels", "Facebook Groups", "Reddit"],
    targetAudience: ["Ticket Resellers", "Event Fans", "Side Hustlers", "Collectors", "Casual Flippers"],
    exampleHooks: [
      "Concert tickets can be a real resale opportunity if you know what to look for.",
      "Most people only buy tickets. Some people learn how the resale market works.",
      "This is a beginner-friendly way to study event and ticket flipping.",
      "If you already follow concerts and events, this side hustle may fit your interests.",
    ],
    promotionNotes:
      "Focus on ticket reselling education, event demand, collectibles, and casual flipping. Avoid guaranteed profit claims and keep messaging practical.",
    contentIdeas: ["Event demand breakdowns", "Ticket resale basics", "Collector market explainers", "Concert flipping case studies"],
    marketingChannels: ["TikTok", "Instagram Reels", "Facebook Groups", "Reddit"],
  },
  {
    id: "skylit",
    productName: "Skylit",
    affiliateLink: "https://whop.com/heatseeker/community-access-ae?a=youthx",
    description:
      "Skylit is a trading education and community offer for people who want market structure guidance, trading frameworks, and a more serious skill-building environment.",
    category: "Trading",
    rating: 4.8,
    reviews: 358,
    price: "Multiple plans",
    commissionPercent: 15,
    monthlyCommission: 15,
    commissionType: "Recurring",
    estimatedEarnings: "$15.00-$104.85/month per active customer",
    difficulty: "Intermediate",
    bestPlatforms: ["YouTube", "TikTok", "Instagram Reels", "X", "Discord"],
    targetAudience: ["Aspiring Traders", "Trading Students", "Side Hustlers", "Market Learners", "Finance Creators"],
    exampleHooks: [
      "Most traders lose because they never build a repeatable process.",
      "This is what a serious trading community should actually include.",
      "If you are learning trading alone, this may save you months.",
      "The difference between signals and real trading education.",
    ],
    pros: [
      "Multiple plan levels for different buyer intent.",
      "Trading community angle gives creators several content paths.",
      "High-ticket Pro plan creates stronger upside per referral.",
    ],
    promotionNotes:
      "Promote Skylit responsibly. Focus on education, discipline, community, risk management, and skill development. Avoid income guarantees or unrealistic trading claims.",
    promotionAngles: [
      "Premium trading education for people who want structure instead of random tips.",
      "Community-first learning for traders who need feedback, accountability, and better routines.",
      "Position the offer as a serious next step after free YouTube trading content.",
      "Highlight process, risk management, and consistency over hype.",
    ],
    contentIdeas: [
      "Break down common beginner trading mistakes.",
      "Compare free trading content vs guided community learning.",
      "Post market routine checklists.",
      "Share risk-management reminders and trading psychology lessons.",
    ],
    earningsPotential:
      "At 15% recurring commission, earnings scale with plan price and retention. Community Access pays $15.00, Initiate pays $44.85, and Pro pays $104.85 per active customer monthly.",
    marketingChannels: ["YouTube long-form", "YouTube Shorts", "TikTok", "Instagram Reels", "X threads", "Discord communities"],
    plans: [
      {
        id: "skylit-community",
        name: "Community Access",
        price: "$99.99/month",
        monthlyPrice: 99.99,
        commission: "15% recurring",
        affiliateLink: "https://whop.com/heatseeker/community-access-ae?a=youthx",
      },
      {
        id: "skylit-initiate",
        name: "Initiate",
        price: "$299/month",
        monthlyPrice: 299,
        commission: "15% recurring",
        affiliateLink: "https://whop.com/heatseeker/heatseeker-initiate?a=youthx",
      },
      {
        id: "skylit-pro",
        name: "Pro",
        price: "$699/month",
        monthlyPrice: 699,
        commission: "15% recurring",
        affiliateLink: "https://whop.com/heatseeker/heatseeker?a=youthx",
      },
    ],
  },
  {
    id: "swift-algo-indicator",
    productName: "Swift Algo Indicator",
    affiliateLink: "https://whop.com/swift-algo/swift-algo?a=youthx",
    description:
      "Swift Algo Indicator provides traders with advanced trading signals, buy and sell indicators, market analysis tools, and educational resources designed to help traders make better decisions.",
    category: "Trading / Signals",
    rating: 4.7,
    reviews: 129,
    members: "2066+",
    price: "$67/month",
    commissionPercent: 30,
    monthlyCommission: 20.1,
    commissionType: "Recurring",
    estimatedEarnings: "$20.10/month per active customer",
    difficulty: "Intermediate",
    bestPlatforms: ["YouTube", "TikTok", "Instagram Reels", "X", "Discord"],
    targetAudience: ["Day traders", "Swing traders", "Forex traders", "Options traders", "Crypto traders"],
    exampleHooks: [
      "This indicator is built for traders who want cleaner buy and sell signals.",
      "Stop guessing entries without a repeatable trading framework.",
      "A trading signal tool is only useful when you understand the setup behind it.",
      "Here is how traders use indicators alongside market analysis.",
    ],
    pros: [
      "Advanced buy and sell indicators for active traders.",
      "Market analysis tools that support trade planning.",
      "Educational resources for improving decision-making.",
      "Recurring commission with a clear monthly price point.",
    ],
    contentIdeas: ["Trading signal breakdowns", "Before/after trade examples", "Market analysis videos", "Trading strategy content"],
    promotionAngles: [
      "Position Swift Algo as a decision-support tool, not a guaranteed profit system.",
      "Explain how signals, analysis, and education can work together in a trading routine.",
      "Create content around responsible trade planning and risk management.",
    ],
    earningsPotential:
      "$20.10/month per active customer. Ten active referrals would estimate $201/month, or $2,412/year before churn.",
    marketingChannels: ["YouTube", "TikTok", "Instagram Reels", "X threads", "Discord communities"],
    promotionNotes:
      "Focus on trading education, signal clarity, decision support, and risk-aware content. Avoid guaranteed income or guaranteed trading result claims.",
  },
];

const aiTools: AiTool[] = [
  { name: "ChatGPT", description: "AI assistant for scripts, research, workflows, and offer positioning.", useCase: "Prompt writing and content systems", url: "https://chatgpt.com" },
  { name: "Claude", description: "Long-form writing assistant for strategy docs, scripts, and analysis.", useCase: "Deep writing and blueprint drafting", url: "https://claude.ai" },
  { name: "Gemini", description: "Google AI assistant for research, planning, and creative workflows.", useCase: "Research and campaign ideation", url: "https://gemini.google.com" },
  { name: "Perplexity", description: "AI answer engine for quick research and source discovery.", useCase: "Market and competitor research", url: "https://www.perplexity.ai" },
  { name: "ElevenLabs", description: "Voice generation for narrations, ads, and short-form content.", useCase: "Voiceovers and creator assets", url: "https://elevenlabs.io" },
  { name: "Canva", description: "Design platform for thumbnails, reels, carousels, and promo graphics.", useCase: "Affiliate creative assets", url: "https://www.canva.com" },
  { name: "CapCut", description: "Video editor for short-form affiliate and organic content.", useCase: "TikTok and Reels editing", url: "https://www.capcut.com" },
  { name: "Descript", description: "Transcript-first editor for podcasts, walkthroughs, and video ads.", useCase: "Editing and captions", url: "https://www.descript.com" },
];

const filters: FilterKey[] = ["All", "Recurring", "One-Time", "Beginner Friendly", "High Commission", "Trading", "Software", "AI"];
const featuredIds = ["skylit", "swift-algo-indicator", "toolsuite", "deal-soldier", "friends-family-tickets"];
const validPages: Page[] = ["dashboard", "opportunities", "ai-tools", "hook-generator", "resources", "level-system", "calculator"];
const navGroups: Array<{ title: string; items: Array<{ label: string; page: Page; filter?: FilterKey; icon: LucideIcon }> }> = [
  { title: "Dashboard", items: [{ label: "Dashboard", page: "dashboard", icon: Home }] },
  {
    title: "Opportunities",
    items: [
      { label: "All Opportunities", page: "opportunities", filter: "All", icon: Library },
      { label: "Recurring", page: "opportunities", filter: "Recurring", icon: TrendingUp },
      { label: "One-Time", page: "opportunities", filter: "One-Time", icon: BadgeDollarSign },
      { label: "Beginner Friendly", page: "opportunities", filter: "Beginner Friendly", icon: Users },
      { label: "High Commission", page: "opportunities", filter: "High Commission", icon: Percent },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "AI Tools Vault", page: "ai-tools", icon: Bot },
      { label: "Hook Generator", page: "hook-generator", icon: Wand2 },
      { label: "Resources", page: "resources", icon: BookOpen },
    ],
  },
  {
    title: "Personal",
    items: [
      { label: "Level System", page: "level-system", icon: Trophy },
      { label: "Earnings Calculator", page: "calculator", icon: Calculator },
    ],
  },
];

function readProgress(): ProgressState {
  if (typeof window === "undefined") return { xp: 0, timeXp: 0, activeSeconds: 0, completedActions: {} };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? "");
    return {
      xp: Math.max(0, Number(parsed?.xp) || 0),
      timeXp: Math.max(0, Number(parsed?.timeXp) || 0),
      activeSeconds: Math.max(0, Number(parsed?.activeSeconds) || 0),
      completedActions: parsed?.completedActions && typeof parsed.completedActions === "object" ? parsed.completedActions : {},
    };
  } catch {
    return { xp: 0, timeXp: 0, activeSeconds: 0, completedActions: {} };
  }
}

function readCalculatorSummary(): CalculatorSummary {
  if (typeof window === "undefined") return { monthly: 0, yearly: 0, customers: 0 };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CALCULATOR_STORAGE_KEY) ?? "");
    return {
      monthly: Math.max(0, Number(parsed?.monthly) || 0),
      yearly: Math.max(0, Number(parsed?.yearly) || 0),
      customers: Math.max(0, Number(parsed?.customers) || 0),
    };
  } catch {
    return { monthly: 0, yearly: 0, customers: 0 };
  }
}

function readStoredRecord(key: string): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "{}");
    return Object.fromEntries(Object.entries(parsed).map(([itemKey, value]) => [itemKey, Math.max(0, Number(value) || 0)]));
  } catch {
    return {};
  }
}

function readStoredStringRecord(key: string): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "{}");
    return Object.fromEntries(Object.entries(parsed).map(([itemKey, value]) => [itemKey, String(value)]));
  } catch {
    return {};
  }
}

function getRankInfo(xp: number) {
  const index = rankLadder.reduce((currentIndex, rank, rankIndex) => (xp >= rank.xp ? rankIndex : currentIndex), 0);
  const currentRank = rankLadder[index];
  const isFinal = index === rankLadder.length - 1;
  const nextRank = isFinal ? null : rankLadder[index + 1];
  const currentFloor = currentRank.xp;
  const nextFloor = nextRank?.xp ?? currentRank.xp;
  return {
    currentRank: currentRank.name,
    nextRank: isFinal ? "Nemesis: Top 250 eligible" : nextRank?.name ?? "Nemesis",
    currentFloor,
    nextFloor,
    needed: isFinal ? 0 : Math.max(0, nextFloor - xp),
    progress: isFinal ? 100 : Math.min(100, ((xp - currentFloor) / Math.max(1, nextFloor - currentFloor)) * 100),
    isFinal,
  };
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  const whopTheme =
    document.documentElement.dataset.theme ||
    document.documentElement.getAttribute("data-whop-theme") ||
    document.body?.dataset.theme ||
    document.body?.getAttribute("data-whop-theme");
  return whopTheme === "light" || whopTheme === "dark" ? whopTheme : getSystemTheme();
}

function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [blueprintTab, setBlueprintTab] = useState<BlueprintTab>("Overview");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [xpToast, setXpToast] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressState>(readProgress);
  const [calculatorSummary, setCalculatorSummary] = useState<CalculatorSummary>(readCalculatorSummary);
  const lastActivityAt = useRef(Date.now());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      if (!window.localStorage.getItem(THEME_STORAGE_KEY)) setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    window.localStorage.setItem(CALCULATOR_STORAGE_KEY, JSON.stringify(calculatorSummary));
  }, [calculatorSummary]);

  useEffect(() => {
    const activityEvents = ["pointerdown", "keydown", "scroll", "touchstart"];
    const markActive = () => {
      lastActivityAt.current = Date.now();
    };

    activityEvents.forEach((eventName) => window.addEventListener(eventName, markActive, { passive: true }));
    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastActivityAt.current > 120000) return;
      setProgress((current) => {
        const nextSeconds = current.activeSeconds + 60;
        const crossedHour = Math.floor(nextSeconds / 3600) > Math.floor(current.activeSeconds / 3600);
        if (!crossedHour) return { ...current, activeSeconds: nextSeconds };
        return {
          ...current,
          xp: current.xp + 1,
          timeXp: current.timeXp + 1,
          activeSeconds: nextSeconds,
        };
      });
    }, 60000);

    return () => {
      window.clearInterval(timer);
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, markActive));
    };
  }, []);

  useEffect(() => {
    const syncWhopTheme = () => {
      if (window.localStorage.getItem(THEME_STORAGE_KEY)) return;
      const whopTheme =
        document.documentElement.dataset.theme ||
        document.documentElement.getAttribute("data-whop-theme") ||
        document.body?.dataset.theme ||
        document.body?.getAttribute("data-whop-theme");
      if (whopTheme === "light" || whopTheme === "dark") setTheme(whopTheme);
    };

    const observer = new MutationObserver(syncWhopTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-whop-theme"] });
    if (document.body) observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme", "data-whop-theme"] });
    syncWhopTheme();
    return () => observer.disconnect();
  }, []);

  const filteredOffers = useMemo(() => filterOffers(offers, activeFilter, query), [activeFilter, query]);

  const showXpToast = (message: string) => {
    setXpToast(message);
    window.setTimeout(() => setXpToast(null), 1800);
  };

  const claimXp = (actionKey: string, amount: number, label: string) => {
    if (progress.completedActions[actionKey]) {
      showXpToast("XP already claimed");
      return;
    }
    setProgress((current) => {
      if (current.completedActions[actionKey]) {
        return current;
      }
      return {
        ...current,
        xp: current.xp + amount,
        completedActions: {
          ...current.completedActions,
          [actionKey]: { label, xp: amount, date: new Date().toISOString() },
        },
      };
    });
    showXpToast(`+${amount} XP earned`);
  };

  const claimCalculatorXp = () => {
    const today = new Date().toISOString().slice(0, 10);
    claimXp(`calculator:${today}`, 2, "Used Earnings Calculator");
  };

  const openPage = (nextPage: Page, nextFilter?: FilterKey) => {
    if (nextPage === "resources") claimXp("page:resources", 2, "Opened Resources");
    setPage(nextPage);
    if (nextFilter) setActiveFilter(nextFilter);
    setSidebarOpen(false);
  };

  const openBlueprint = (offer: Offer) => {
    claimXp(`blueprint:${offer.id}`, 5, `Viewed ${offer.productName} Blueprint`);
    setSelectedOffer(offer);
    setBlueprintTab("Overview");
  };

  const openAffiliateLink = (offer: Offer, link = offer.affiliateLink, actionId = offer.id) => {
    claimXp(`open-link:${actionId}`, 2, `Opened ${offer.productName} Affiliate Link`);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const openTool = (tool: AiTool) => {
    claimXp(`tool:${tool.name}`, 2, `Opened ${tool.name}`);
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  const claimResource = (resource: string) => {
    claimXp(`resource:${resource}`, 2, `Opened ${resource}`);
  };

  const copyAffiliateLink = (link: string, id: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = link;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      if (id !== "hooks") claimXp(`copy-link:${link}`, 3, "Copied affiliate link");
      setCopiedId(id);
      setToast("Affiliate link copied");
      window.setTimeout(() => {
        setCopiedId(null);
        setToast(null);
      }, 1800);
    } catch {
      prompt("Copy this affiliate link:", link);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <motion.main className="app-shell min-h-screen overflow-x-hidden bg-[var(--app-bg)] text-[var(--app-text)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.button
              className="fixed inset-0 z-30 bg-[var(--app-overlay)] backdrop-blur-sm lg:hidden"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        <Sidebar page={page} activeFilter={activeFilter} open={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={openPage} />

        <section className="min-w-0 flex-1 px-3 py-3 sm:px-5 lg:px-6">
          <Topbar
            page={page}
            query={query}
            theme={theme}
            onMenu={() => setSidebarOpen(true)}
            onQuery={setQuery}
            onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          />

          <div className="mt-4">
            {page === "dashboard" && (
              <DashboardPage
                onBrowse={() => openPage("opportunities", "All")}
                onCalculator={() => openPage("calculator")}
                onBlueprint={openBlueprint}
                onCopy={copyAffiliateLink}
                copiedId={copiedId}
                progress={progress}
                calculatorSummary={calculatorSummary}
                onOpenLink={openAffiliateLink}
              />
            )}
            {page === "opportunities" && (
              <OpportunitiesPage
                filter={activeFilter}
                query={query}
                offers={filteredOffers}
                copiedId={copiedId}
                onFilter={setActiveFilter}
                onBlueprint={openBlueprint}
                onCopy={copyAffiliateLink}
                onOpenLink={openAffiliateLink}
              />
            )}
            {page === "ai-tools" && <AiToolsPage onOpenTool={openTool} />}
            {page === "hook-generator" && <HookGeneratorPage onCopyAll={(text) => copyAffiliateLink(text, "hooks")} copied={copiedId === "hooks"} />}
            {page === "resources" && <ResourcesPage onOpportunities={() => openPage("opportunities", "All")} onHooks={() => openPage("hook-generator")} onOpenResource={claimResource} />}
            {page === "level-system" && (
              <LevelSystemPage
                progress={progress}
                calculatorSummary={calculatorSummary}
                onReset={() => setProgress({ xp: 0, timeXp: 0, activeSeconds: 0, completedActions: {} })}
              />
            )}
            {page === "calculator" && <EarningsCalculator onSummary={setCalculatorSummary} onUse={claimCalculatorXp} />}
            {!validPages.includes(page) && <FallbackPage onHome={() => openPage("dashboard")} />}
          </div>
          <div className="mt-4 xl:hidden">
            <CreatorProgressPanel progress={progress} calculatorSummary={calculatorSummary} onCalculator={() => openPage("calculator")} onOpportunities={() => openPage("opportunities", "All")} />
          </div>
        </section>
        <UtilityPanel progress={progress} calculatorSummary={calculatorSummary} onCalculator={() => openPage("calculator")} onOpportunities={() => openPage("opportunities", "All")} />
      </div>

      <AnimatePresence>
        {selectedOffer && (
          <BlueprintModal
            offer={selectedOffer}
            activeTab={blueprintTab}
            copiedId={copiedId}
            onTab={setBlueprintTab}
            onClose={() => setSelectedOffer(null)}
            onCopy={copyAffiliateLink}
            onClaimXp={claimXp}
            onOpenLink={openAffiliateLink}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed right-4 top-4 z-[70] max-w-[calc(100vw-2rem)] rounded-xl border border-[var(--app-border-strong)] bg-[var(--app-surface)] px-4 py-3 text-sm font-semibold text-[var(--app-text)] shadow-[var(--app-glow)]"
            initial={{ y: -16, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.96 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {xpToast && (
          <motion.div
            className="fixed bottom-4 right-4 z-[70] max-w-[calc(100vw-2rem)] rounded-xl border border-[var(--app-border-strong)] bg-[var(--app-surface)] px-4 py-3 text-sm font-bold text-[var(--app-accent-text)] shadow-[var(--app-glow)]"
            initial={{ y: 16, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.96 }}
          >
            {xpToast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

function filterOffers(source: Offer[], filter: FilterKey, search: string) {
  const term = search.trim().toLowerCase();
  return source.filter((offer) => {
    const matchesFilter =
      filter === "All" ||
      offer.commissionType === filter ||
      offer.difficulty === filter ||
      (filter === "High Commission" && offer.commissionPercent >= 40) ||
      (filter === "Trading" && offer.category.toLowerCase().includes("trading")) ||
      (filter === "Software" && /software|creator|tools/i.test(offer.category)) ||
      (filter === "AI" && /ai|toolsuite/i.test(`${offer.productName} ${offer.category}`));

    const haystack = [offer.productName, offer.description, offer.category, offer.price, offer.difficulty, offer.bestPlatforms.join(" "), offer.targetAudience.join(" ")]
      .join(" ")
      .toLowerCase();
    return matchesFilter && (!term || haystack.includes(term));
  });
}

function Sidebar({
  page,
  activeFilter,
  open,
  onClose,
  onNavigate,
}: {
  page: Page;
  activeFilter: FilterKey;
  open: boolean;
  onClose: () => void;
  onNavigate: (page: Page, filter?: FilterKey) => void;
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-[min(304px,88vw)] border-r border-[var(--app-border)] bg-[var(--app-sidebar)] p-4 shadow-[var(--app-shadow)] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <button className="flex min-w-0 items-center gap-3 text-left" onClick={() => onNavigate("dashboard")}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--app-accent)] text-white shadow-[var(--app-glow)]">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block break-words text-sm font-bold text-[var(--app-text)]">Affiliate Vault</span>
            <span className="block break-words text-xs text-[var(--app-muted)]">Learn2Earn x Whop</span>
          </span>
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--app-border)] text-[var(--app-muted)] lg:hidden" onClick={onClose}>
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="mt-6 flex h-[calc(100vh-6rem)] flex-col space-y-5 overflow-y-auto pr-1">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--app-subtle)]">{group.title}</p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = page === item.page && (!item.filter || item.filter === activeFilter);
                return <NavButton key={`${item.page}-${item.label}`} item={item} active={active} onClick={() => onNavigate(item.page, item.filter)} />;
              })}
            </div>
          </div>
        ))}
        <div className="mt-auto rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--app-accent)] text-xs font-bold text-white">L2</span>
            <div className="min-w-0">
              <p className="break-words text-sm font-bold text-[var(--app-text)]">Learn2Earn Member</p>
              <p className="break-words text-xs text-[var(--app-muted)]">Whop creator workspace</p>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

function NavButton({
  item,
  active,
  onClick,
}: {
  item: { label: string; icon: LucideIcon };
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      className={`flex min-h-10 w-full min-w-0 items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
        active
          ? "border-[var(--app-border-strong)] bg-[var(--app-active)] text-[var(--app-text)] shadow-[var(--app-glow)]"
          : "border-transparent text-[var(--app-muted)] hover:border-[var(--app-border)] hover:bg-[var(--app-hover)] hover:text-[var(--app-text)]"
      }`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="min-w-0 flex-1 break-words">{item.label}</span>
    </button>
  );
}

function Topbar({
  page,
  query,
  theme,
  onMenu,
  onQuery,
  onToggleTheme,
}: {
  page: Page;
  query: string;
  theme: Theme;
  onMenu: () => void;
  onQuery: (value: string) => void;
  onToggleTheme: () => void;
}) {
  const showSearch = page === "opportunities";
  return (
    <header className="app-card sticky top-3 z-20 flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <button className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--app-border)] bg-[var(--app-button)] text-[var(--app-text)] lg:hidden" onClick={onMenu}>
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <p className="break-words text-sm font-semibold text-[var(--app-text)]">Affiliate Opportunity Vault</p>
          <p className="break-words text-xs text-[var(--app-muted)]">Creator-focused affiliate operating system</p>
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
        {showSearch && (
          <label className="relative min-w-0 sm:w-[340px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--app-muted)]" />
            <input
              className="h-10 w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-input)] pl-9 pr-3 text-sm text-[var(--app-text)] outline-none focus:border-[var(--app-border-strong)]"
              value={query}
              onChange={(event) => onQuery(event.target.value)}
              placeholder="Search offers, platforms, categories..."
            />
          </label>
        )}
        <Button icon={theme === "dark" ? Sun : Moon} label={theme === "dark" ? "Light" : "Dark"} onClick={onToggleTheme} />
      </div>
    </header>
  );
}

function DashboardPage({
  onBrowse,
  onCalculator,
  onBlueprint,
  onCopy,
  onOpenLink,
  copiedId,
  progress,
  calculatorSummary,
}: {
  onBrowse: () => void;
  onCalculator: () => void;
  onBlueprint: (offer: Offer) => void;
  onCopy: (link: string, id: string) => void;
  onOpenLink: (offer: Offer) => void;
  copiedId: string | null;
  progress: ProgressState;
  calculatorSummary: CalculatorSummary;
}) {
  const featured = featuredIds.map((id) => offers.find((offer) => offer.id === id)).filter(Boolean) as Offer[];
  const rankInfo = getRankInfo(progress.xp);
  const hours = progress.activeSeconds / 3600;
  return (
    <div className="space-y-4">
      <section className="app-card overflow-visible rounded-3xl p-5 sm:p-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[var(--app-border-strong)] bg-[var(--app-active)] px-3 py-1 text-xs font-semibold text-[var(--app-accent-text)]">
            Built for Whop creators
          </span>
          <h1 className="mt-4 break-words text-4xl font-bold tracking-tight text-[var(--app-text)] sm:text-6xl">Affiliate Opportunity Vault</h1>
          <p className="mt-4 max-w-2xl break-words text-base leading-7 text-[var(--app-muted)]">
            Discover vetted affiliate opportunities, AI tools, and promotion blueprints.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button icon={Library} label="Browse Opportunities" onClick={onBrowse} variant="primary" />
            <Button icon={Calculator} label="Open Earnings Calculator" onClick={onCalculator} />
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <ProgressCard
          label="Monthly Earnings"
          value={formatCurrency(calculatorSummary.monthly)}
          subtext="Based on your calculator inputs."
          icon={BadgeDollarSign}
        />
        <ProgressCard
          label="Yearly Projection"
          value={formatCurrency(calculatorSummary.monthly * 12)}
          subtext="Estimated annual affiliate income."
          icon={TrendingUp}
        />
        <RankCard progress={progress} rankInfo={rankInfo} />
        <ProgressCard
          label="Learning Time"
          value={`${hours.toFixed(1)} hrs`}
          subtext={`${progress.timeXp} XP earned from time.`}
          icon={Trophy}
        />
      </section>

      <section className="app-card rounded-3xl p-4 sm:p-5">
        <SectionTitle eyebrow="Featured Opportunities" title="Start with proven creator-friendly offers" />
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((offer) => (
            <OfferCard key={offer.id} offer={offer} copied={copiedId === offer.id} onBlueprint={() => onBlueprint(offer)} onCopy={() => onCopy(offer.affiliateLink, offer.id)} onOpenLink={() => onOpenLink(offer)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProgressCard({
  label,
  value,
  subtext,
  icon: Icon,
}: {
  label: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
}) {
  return (
    <div className="app-card min-w-0 overflow-visible rounded-2xl p-4">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-words text-xs font-semibold uppercase tracking-[0.12em] text-[var(--app-subtle)]">{label}</p>
          <p className="mt-2 break-words text-2xl font-black text-[var(--app-text)]">{value}</p>
          <p className="mt-2 break-words text-xs leading-5 text-[var(--app-muted)]">{subtext}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--app-border-strong)] bg-[var(--app-active)] text-[var(--app-accent-text)]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

function RankCard({ progress, rankInfo }: { progress: ProgressState; rankInfo: ReturnType<typeof getRankInfo> }) {
  return (
    <div className="app-card min-w-0 overflow-visible rounded-2xl p-4">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-words text-xs font-semibold uppercase tracking-[0.12em] text-[var(--app-subtle)]">Creator Rank</p>
          <p className="mt-2 break-words text-xl font-black text-[var(--app-text)]">{rankInfo.currentRank}</p>
          <p className="mt-1 break-words text-xs leading-5 text-[var(--app-muted)]">
            Next: {rankInfo.nextRank}. {rankInfo.isFinal ? "Top 250 eligible." : `${rankInfo.needed} XP needed.`}
          </p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--app-border-strong)] bg-[var(--app-active)] text-[var(--app-accent-text)]">
          <Trophy className="h-5 w-5" />
        </span>
      </div>
      <XpBar value={rankInfo.progress} />
      <p className="mt-2 break-words text-xs font-semibold text-[var(--app-muted)]">
        {progress.xp} XP / {rankInfo.isFinal ? "MAX" : `${rankInfo.nextFloor} XP`}
      </p>
    </div>
  );
}

function XpBar({ value }: { value: number }) {
  return (
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--app-hover)]">
      <div className="h-full rounded-full bg-[var(--app-accent)] transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function OpportunitiesPage({
  filter,
  query,
  offers: visibleOffers,
  copiedId,
  onFilter,
  onBlueprint,
  onCopy,
  onOpenLink,
}: {
  filter: FilterKey;
  query: string;
  offers: Offer[];
  copiedId: string | null;
  onFilter: (filter: FilterKey) => void;
  onBlueprint: (offer: Offer) => void;
  onCopy: (link: string, id: string) => void;
  onOpenLink: (offer: Offer) => void;
}) {
  return (
    <div className="space-y-4">
      <section className="app-card rounded-3xl p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <SectionTitle eyebrow="Opportunities" title="Vetted affiliate marketplace" description="Filter by payout type, skill level, category, or creator workflow." />
          <p className="text-sm text-[var(--app-muted)]">{visibleOffers.length} matching offers {query ? `for "${query}"` : ""}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              className={`min-h-10 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                filter === item
                  ? "border-[var(--app-border-strong)] bg-[var(--app-active)] text-[var(--app-text)]"
                  : "border-[var(--app-border)] bg-[var(--app-button)] text-[var(--app-muted)] hover:text-[var(--app-text)]"
              }`}
              onClick={() => onFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="app-card overflow-visible rounded-3xl">
        <div className="hidden grid-cols-[1.35fr_.7fr_.7fr_1fr_.8fr_.9fr_1.2fr] gap-3 border-b border-[var(--app-border)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--app-subtle)] xl:grid">
          <span>Offer</span>
          <span>Type</span>
          <span>Commission</span>
          <span>Estimated Earnings</span>
          <span>Difficulty</span>
          <span>Category</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-[var(--app-border)]">
          {visibleOffers.length ? (
            visibleOffers.map((offer) => <OfferRow key={offer.id} offer={offer} copied={copiedId === offer.id} onBlueprint={() => onBlueprint(offer)} onCopy={() => onCopy(offer.affiliateLink, offer.id)} onOpenLink={() => onOpenLink(offer)} />)
          ) : (
            <div className="p-8 text-center">
              <p className="text-lg font-semibold text-[var(--app-text)]">No offers found</p>
              <p className="mt-2 text-sm text-[var(--app-muted)]">Try a broader filter or search term.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function OfferRow({
  offer,
  copied,
  onBlueprint,
  onCopy,
  onOpenLink,
}: {
  offer: Offer;
  copied: boolean;
  onBlueprint: () => void;
  onCopy: () => void;
  onOpenLink: () => void;
}) {
  return (
    <div className="grid min-w-0 gap-3 p-4 xl:grid-cols-[1.35fr_.7fr_.7fr_1fr_.8fr_.9fr_1.2fr] xl:items-center">
      <div className="flex min-w-0 gap-3">
        <LogoBadge label={getOfferInitials(offer)} />
        <div className="min-w-0">
        <p className="break-words font-semibold text-[var(--app-text)]">{offer.productName}</p>
        <p className="mt-1 whitespace-normal break-words text-sm leading-6 text-[var(--app-muted)]">{offer.description}</p>
        {offer.rating && <p className="mt-1 text-xs text-[var(--app-subtle)]">{offer.rating.toFixed(1)} rating{offer.reviews ? ` / ${offer.reviews} reviews` : ""}</p>}
        </div>
      </div>
      <MobileLabel label="Type" value={offer.commissionType} />
      <MobileLabel label="Commission" value={`${offer.commissionPercent}%`} />
      <MobileLabel label="Estimated Earnings" value={offer.estimatedEarnings} />
      <MobileLabel label="Difficulty" value={offer.difficulty} />
      <MobileLabel label="Category" value={offer.category} />
      <div className="grid min-w-0 gap-2 sm:grid-cols-3 xl:grid-cols-1">
        <Button icon={Target} label="View Blueprint" onClick={onBlueprint} variant="primary" />
        <Button icon={copied ? Check : Copy} label={copied ? "Copied" : "Copy Affiliate Link"} onClick={onCopy} />
        <Button icon={ExternalLink} label="Open Affiliate Link" onClick={onOpenLink} />
      </div>
    </div>
  );
}

function OfferCard({
  offer,
  copied,
  onBlueprint,
  onCopy,
  onOpenLink,
}: {
  offer: Offer;
  copied: boolean;
  onBlueprint: () => void;
  onCopy: () => void;
  onOpenLink: () => void;
}) {
  return (
    <motion.article className="flex min-w-0 flex-col rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-4" whileHover={{ y: -4 }}>
      <div className="flex min-w-0 items-start gap-3">
        <LogoBadge label={getOfferInitials(offer)} />
        <div className="min-w-0">
          <p className="whitespace-normal break-words text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-accent-text)]">{offer.category}</p>
          <h3 className="mt-2 whitespace-normal break-words text-xl font-bold text-[var(--app-text)]">{offer.productName}</h3>
          {offer.rating && <p className="mt-1 whitespace-normal break-words text-xs text-[var(--app-muted)]">{offer.rating.toFixed(1)} rating{offer.reviews ? ` / ${offer.reviews} reviews` : ""}</p>}
        </div>
      </div>

      <p className="mt-3 min-w-0 whitespace-normal break-words text-sm leading-6 text-[var(--app-muted)]">{offer.description}</p>

      <div className="mt-4 flex min-w-0 flex-row flex-wrap gap-2">
        <OfferBadge label="Price" value={offer.price} />
        <OfferBadge label="Commission" value={`${offer.commissionPercent}%`} />
        <OfferBadge label="Difficulty" value={offer.difficulty} />
      </div>

      <div className="mt-auto grid gap-2 pt-4 sm:grid-cols-2">
        <Button icon={Target} label="View Blueprint" onClick={onBlueprint} variant="primary" />
        <Button icon={copied ? Check : Copy} label={copied ? "Copied" : "Copy Link"} onClick={onCopy} />
        <div className="sm:col-span-2">
          <Button icon={ExternalLink} label="Open Affiliate Link" onClick={onOpenLink} />
        </div>
      </div>
    </motion.article>
  );
}

function OfferBadge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex min-w-0 max-w-full flex-row items-center gap-1 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-1 text-xs leading-5">
      <span className="shrink-0 font-semibold text-[var(--app-subtle)]">{label}:</span>
      <span className="min-w-0 whitespace-normal break-words font-bold text-[var(--app-text)]">{value}</span>
    </span>
  );
}

function LogoBadge({ label }: { label: string }) {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[var(--app-border-strong)] bg-[var(--app-active)] text-sm font-black text-[var(--app-accent-text)] shadow-[var(--app-glow)]">
      {label}
    </span>
  );
}

function getOfferInitials(offer: Offer) {
  const initials: Record<string, string> = {
    toolsuite: "TS",
    "deal-soldier": "DS",
    "friends-family-tickets": "FF",
    skylit: "SK",
    "swift-algo-indicator": "SA",
  };
  return initials[offer.id] ?? offer.productName.split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase();
}

function getToolInitials(name: string) {
  const initials: Record<string, string> = {
    ChatGPT: "GPT",
    Claude: "CL",
    Gemini: "GM",
    Perplexity: "PX",
    ElevenLabs: "EL",
    Canva: "CV",
    CapCut: "CC",
    Descript: "DS",
  };
  return initials[name] ?? name.slice(0, 2).toUpperCase();
}

function BlueprintModal({
  offer,
  activeTab,
  copiedId,
  onTab,
  onClose,
  onCopy,
  onClaimXp,
  onOpenLink,
}: {
  offer: Offer;
  activeTab: BlueprintTab;
  copiedId: string | null;
  onTab: (tab: BlueprintTab) => void;
  onClose: () => void;
  onCopy: (link: string, id: string) => void;
  onClaimXp: (actionKey: string, amount: number, label: string) => void;
  onOpenLink: (offer: Offer, link?: string, actionId?: string) => void;
}) {
  const tabs: BlueprintTab[] = ["Overview", "Audience", "Content Ideas", "Promotion Strategy", "Resources"];
  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center bg-[var(--app-overlay)] p-3 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.section
        className="app-card max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl p-4 sm:p-6"
        initial={{ y: 28, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 18, opacity: 0, scale: 0.98 }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--app-accent-text)]">Affiliate Blueprint</p>
            <h2 className="mt-2 break-words text-3xl font-bold text-[var(--app-text)]">{offer.productName}</h2>
            <p className="mt-2 max-w-3xl break-words text-sm leading-6 text-[var(--app-muted)]">{offer.description}</p>
          </div>
          <button className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--app-border)] bg-[var(--app-button)] text-[var(--app-text)]" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`min-h-10 rounded-xl border px-3 py-2 text-sm font-semibold ${
                activeTab === tab ? "border-[var(--app-border-strong)] bg-[var(--app-active)] text-[var(--app-text)]" : "border-[var(--app-border)] bg-[var(--app-button)] text-[var(--app-muted)]"
              }`}
              onClick={() => {
                if (tab === "Resources") onClaimXp(`blueprint-resources:${offer.id}`, 2, `Opened ${offer.productName} Resources`);
                onTab(tab);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {activeTab === "Overview" && <BlueprintOverview offer={offer} />}
          {activeTab === "Audience" && <BlueprintAudience offer={offer} />}
          {activeTab === "Content Ideas" && <BlueprintContent offer={offer} />}
          {activeTab === "Promotion Strategy" && <BlueprintStrategy offer={offer} />}
          {activeTab === "Resources" && <BlueprintResources offer={offer} copiedId={copiedId} onCopy={onCopy} onClaimXp={onClaimXp} onOpenLink={onOpenLink} />}
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button icon={copiedId === offer.id ? Check : Copy} label={copiedId === offer.id ? "Copied" : "Copy Affiliate Link"} onClick={() => onCopy(offer.affiliateLink, offer.id)} variant="primary" />
          <Button icon={ExternalLink} label="Open Affiliate Link" onClick={() => onOpenLink(offer)} />
        </div>
      </motion.section>
    </motion.div>
  );
}

function BlueprintOverview({ offer }: { offer: Offer }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="What is it?" icon={FileText}>
        <p>{offer.description}</p>
      </Panel>
      <Panel title="Why promote it?" icon={TrendingUp}>
        <p>{offer.promotionNotes}</p>
      </Panel>
      <Panel title="Commission details" icon={BadgeDollarSign}>
        <p>
          {offer.commissionPercent}% {offer.commissionType.toLowerCase()} commission. Estimated payout: {offer.estimatedEarnings}.
        </p>
      </Panel>
      <Panel title="Proof points" icon={BarChart3}>
        <PillList items={[offer.category, offer.difficulty, offer.rating ? `${offer.rating.toFixed(1)} rating` : "Vetted", offer.members ? `${offer.members} members` : offer.price]} />
      </Panel>
      {offer.plans && (
        <div className="lg:col-span-2">
          <Panel title="Plans" icon={Library}>
            <div className="grid gap-3 md:grid-cols-3">
              {offer.plans.map((plan) => (
                <div key={plan.id} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4">
                  <p className="font-bold text-[var(--app-text)]">{plan.name}</p>
                  <p className="mt-2 text-sm text-[var(--app-muted)]">{plan.price}</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--app-accent-text)]">{plan.commission}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}

function BlueprintAudience({ offer }: { offer: Offer }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title="Who should buy" icon={Users}>
        <PillList items={offer.targetAudience} />
      </Panel>
      <Panel title="Ideal customer" icon={Target}>
        <p>People already searching for a practical solution in {offer.category.toLowerCase()} with enough intent to pay monthly.</p>
      </Panel>
      <Panel title="Pain points" icon={Sparkles}>
        <BulletList items={["Too many random tips", "No clear workflow", "No trusted community", "Hard to compare good offers"]} />
      </Panel>
    </div>
  );
}

function BlueprintContent({ offer }: { offer: Offer }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Hooks" icon={Wand2}>
        <BulletList items={offer.exampleHooks} />
      </Panel>
      <Panel title="TikTok ideas" icon={Sparkles}>
        <BulletList items={offer.contentIdeas ?? ["Problem-solution demo", "Before/after workflow", "Beginner mistake breakdown", "Offer comparison"]} />
      </Panel>
      <Panel title="YouTube ideas" icon={FileText}>
        <BulletList items={["Full review", "Beginner guide", "Case study", "Alternatives comparison"]} />
      </Panel>
      <Panel title="Twitter and Reddit ideas" icon={BookOpen}>
        <BulletList items={["Thread breakdown", "Checklist post", "Community answer", "Resource roundup"]} />
      </Panel>
    </div>
  );
}

function BlueprintStrategy({ offer }: { offer: Offer }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Organic" icon={TrendingUp}>
        <BulletList items={offer.promotionAngles ?? ["Lead with the buyer problem", "Show the workflow", "Mention recurring value", "Avoid unrealistic claims"]} />
      </Panel>
      <Panel title="Short-form" icon={Sparkles}>
        <BulletList items={["Hook in first 2 seconds", "Show proof or demo", "Use simple CTA", "Pin affiliate comment where allowed"]} />
      </Panel>
      <Panel title="Community" icon={Users}>
        <BulletList items={["Answer questions", "Share useful checklists", "Avoid spam posting", "Disclose affiliate relationship where required"]} />
      </Panel>
      <Panel title="Email" icon={FileText}>
        <BulletList items={["Problem email", "Tool breakdown", "Case study", "Final reminder"]} />
      </Panel>
    </div>
  );
}

function BlueprintResources({
  offer,
  copiedId,
  onCopy,
  onClaimXp,
  onOpenLink,
}: {
  offer: Offer;
  copiedId: string | null;
  onCopy: (link: string, id: string) => void;
  onClaimXp: (actionKey: string, amount: number, label: string) => void;
  onOpenLink: (offer: Offer, link?: string, actionId?: string) => void;
}) {
  const resources = ["Official Website", "Affiliate Link", "Terms", "Assets"];
  return (
    <div className="space-y-4">
      <Panel title="Resources" icon={Library}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <div key={resource} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4">
              <p className="font-semibold text-[var(--app-text)]">{resource}</p>
              <p className="mt-2 text-sm text-[var(--app-muted)]">Use inside your Whop creator workflow.</p>
              {resource === "Assets" && (
                <div className="mt-3">
                  <Button icon={ExternalLink} label="View Assets" onClick={() => onClaimXp(`assets:${offer.id}`, 2, `Viewed ${offer.productName} Assets`)} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Panel>
      {offer.plans && (
        <Panel title="Plan Links" icon={ExternalLink}>
          <div className="grid gap-3 md:grid-cols-3">
            {offer.plans.map((plan) => (
              <div key={plan.id} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4">
                <p className="font-bold text-[var(--app-text)]">{plan.name}</p>
                <p className="mt-1 text-sm text-[var(--app-muted)]">{plan.price}</p>
                <div className="mt-3 grid gap-2">
                  <Button icon={copiedId === plan.id ? Check : Copy} label={copiedId === plan.id ? "Copied" : "Copy Link"} onClick={() => onCopy(plan.affiliateLink, plan.id)} />
                  <Button icon={ExternalLink} label="Open Link" onClick={() => onOpenLink(offer, plan.affiliateLink, plan.id)} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}

function AiToolsPage({ onOpenTool }: { onOpenTool: (tool: AiTool) => void }) {
  return (
    <section className="app-card rounded-3xl p-5">
      <SectionTitle eyebrow="AI Tools Vault" title="Creator tools for faster affiliate execution" description="Research, write, design, edit, clip, and publish without leaving your creator workflow." />
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {aiTools.map((tool) => (
          <div key={tool.name} className="flex min-w-0 flex-col rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-4">
            <div className="flex min-w-0 items-start gap-3">
              <LogoBadge label={getToolInitials(tool.name)} />
              <div className="min-w-0">
                <h3 className="whitespace-normal break-words text-lg font-bold text-[var(--app-text)]">{tool.name}</h3>
                <p className="mt-2 whitespace-normal break-words text-sm leading-6 text-[var(--app-muted)]">{tool.description}</p>
              </div>
            </div>
            <div className="mt-4">
              <Metric label="Use case" value={tool.useCase} />
            </div>
            <div className="mt-4">
              <Button icon={ExternalLink} label="Open Tool" onClick={() => onOpenTool(tool)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HookGeneratorPage({ onCopyAll, copied }: { onCopyAll: (text: string) => void; copied: boolean }) {
  const [category, setCategory] = useState("Trading");
  const [count, setCount] = useState(5);
  const hooks = useMemo(() => generateHooks(category, count), [category, count]);
  return (
    <section className="app-card rounded-3xl p-5">
      <SectionTitle eyebrow="Hook Generator" title="Generate fast hooks for affiliate content" description="Pick a vertical, choose a quantity, and copy a ready-to-edit batch." />
      <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
        <select className="h-11 rounded-xl border border-[var(--app-border)] bg-[var(--app-input)] px-3 text-[var(--app-text)]" value={category} onChange={(event) => setCategory(event.target.value)}>
          {["Trading", "Software", "AI", "Reselling", "Tickets", "Editing"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2">
          {[5, 10, 20].map((item) => (
            <button
              key={item}
              className={`min-h-11 rounded-xl border px-4 text-sm font-semibold ${count === item ? "border-[var(--app-border-strong)] bg-[var(--app-active)] text-[var(--app-text)]" : "border-[var(--app-border)] bg-[var(--app-button)] text-[var(--app-muted)]"}`}
              onClick={() => setCount(item)}
            >
              {item} hooks
            </button>
          ))}
        </div>
        <Button icon={copied ? Check : Copy} label={copied ? "Copied" : "Copy All"} onClick={() => onCopyAll(hooks.join("\n"))} variant="primary" />
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {hooks.map((hook, index) => (
          <div key={hook} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-4">
            <p className="text-xs font-semibold text-[var(--app-subtle)]">Hook {index + 1}</p>
            <p className="mt-2 break-words text-sm font-semibold text-[var(--app-text)]">{hook}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResourcesPage({
  onOpportunities,
  onHooks,
  onOpenResource,
}: {
  onOpportunities: () => void;
  onHooks: () => void;
  onOpenResource: (resource: string) => void;
}) {
  const resources = [
    {
      title: "Blueprint Checklist",
      description: "Open an offer, review audience fit, choose a content angle, and copy the correct affiliate link.",
      icon: Target,
    },
    {
      title: "Compliance Notes",
      description: "Avoid unrealistic income claims, disclose affiliate relationships where required, and promote responsibly.",
      icon: FileText,
    },
    {
      title: "Creator Workflow",
      description: "Research the offer, generate hooks, publish short-form tests, then track estimated earnings in the calculator.",
      icon: TrendingUp,
    },
    {
      title: "Platform Ideas",
      description: "Use TikTok, Reels, Shorts, Reddit, X, Discord, and niche communities based on the offer category.",
      icon: Users,
    },
  ];

  return (
    <section className="app-card rounded-3xl p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <SectionTitle
          eyebrow="Resources"
          title="Creator operating resources"
          description="Practical guidance for turning affiliate opportunities into content, campaigns, and repeatable promotion workflows."
        />
        <div className="grid gap-2 sm:grid-cols-2">
          <Button icon={Library} label="Browse Offers" onClick={onOpportunities} variant="primary" />
          <Button icon={Wand2} label="Generate Hooks" onClick={onHooks} />
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {resources.map((resource) => (
          <Panel key={resource.title} title={resource.title} icon={resource.icon}>
            <p>{resource.description}</p>
            <div className="mt-4">
              <Button icon={ExternalLink} label="Open Resource" onClick={() => onOpenResource(resource.title)} />
            </div>
          </Panel>
        ))}
      </div>
    </section>
  );
}

function LevelSystemPage({
  progress,
  calculatorSummary,
  onReset,
}: {
  progress: ProgressState;
  calculatorSummary: CalculatorSummary;
  onReset: () => void;
}) {
  const rankInfo = getRankInfo(progress.xp);
  const hours = progress.activeSeconds / 3600;
  const completedActions = Object.entries(progress.completedActions).sort(([, a], [, b]) => Date.parse(b.date) - Date.parse(a.date));
  const xpRules = [
    "1 XP per active hour spent in the app while visible and active.",
    "5 XP the first time you view each unique blueprint.",
    "3 XP the first time you copy each unique affiliate link.",
    "2 XP the first time you open each unique affiliate link.",
    "2 XP once per day when you use the Earnings Calculator.",
    "2 XP the first time you open each unique resource or tool.",
  ];

  return (
    <div className="space-y-4">
      <section className="app-card rounded-3xl p-5 sm:p-6">
        <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr] xl:items-start">
          <div className="min-w-0">
            <SectionTitle
              eyebrow="Level System"
              title="Creator rank progression"
              description="Earn XP through meaningful creator actions. Each offer, link, resource, and tool can only reward XP once where applicable."
            />
            <div className="mt-5 rounded-3xl border border-[var(--app-border-strong)] bg-[var(--app-active)] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-subtle)]">Current Rank</p>
                  <h3 className="mt-2 break-words text-4xl font-black text-[var(--app-text)]">{rankInfo.currentRank}</h3>
                  <p className="mt-2 break-words text-sm text-[var(--app-muted)]">
                    {rankInfo.isFinal ? "Nemesis reached. Top 250 eligible." : `${rankInfo.needed} XP until ${rankInfo.nextRank}.`}
                  </p>
                </div>
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-[var(--app-border-strong)] bg-[var(--app-surface)] text-[var(--app-accent-text)] shadow-[var(--app-glow)]">
                  <Trophy className="h-9 w-9" />
                </div>
              </div>
              <XpBar value={rankInfo.progress} />
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Metric label="Total XP" value={`${progress.xp} XP`} />
                <Metric label="Learning Hours" value={`${hours.toFixed(1)} hrs`} />
                <Metric label="Next Rank" value={rankInfo.nextRank} />
              </div>
            </div>
          </div>
          <Button icon={RotateCcw} label="Reset Progress" onClick={onReset} />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <div className="app-card rounded-3xl p-5">
          <SectionTitle eyebrow="Rank Ladder" title="Path to Nemesis" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {rankLadder.map((rank, index) => {
              const active = rank.name === rankInfo.currentRank;
              const unlocked = progress.xp >= rank.xp;
              return (
                <div
                  key={rank.name}
                  className={`rounded-2xl border p-3 ${
                    active
                      ? "border-[var(--app-border-strong)] bg-[var(--app-active)]"
                      : unlocked
                        ? "border-[var(--app-border)] bg-[var(--app-surface-muted)]"
                      : "border-[var(--app-border)] bg-[var(--app-surface)] opacity-70"
                  }`}
                >
                  <p className="break-words text-sm font-bold text-[var(--app-text)]">{rank.name}</p>
                  <p className="mt-1 text-xs text-[var(--app-muted)]">{rank.name === "Nemesis" ? "60000 XP + Top 250 eligible" : `${rank.xp} XP`}</p>
                  <p className="mt-2 text-xs font-semibold text-[var(--app-accent-text)]">{unlocked ? "Unlocked" : "Locked"}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="app-card rounded-3xl p-5">
            <SectionTitle eyebrow="How to Earn XP" title="Creator actions" />
            <div className="mt-5">
              <BulletList items={xpRules} />
            </div>
          </div>
          <div className="app-card rounded-3xl p-5">
            <SectionTitle eyebrow="Completed Actions" title="Claimed XP" description="Anti-farming log for one-time XP rewards." />
            <div className="mt-5 space-y-2">
              {completedActions.length ? (
                completedActions.slice(0, 12).map(([key, action]) => (
                  <div key={key} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-3">
                    <p className="break-words text-sm font-bold text-[var(--app-text)]">{action.label}</p>
                    <p className="mt-1 text-xs text-[var(--app-muted)]">+{action.xp} XP claimed</p>
                  </div>
                ))
              ) : (
                <p className="break-words text-sm text-[var(--app-muted)]">No XP actions claimed yet. Open a blueprint, copy a link, or use the calculator to start.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FallbackPage({ onHome }: { onHome: () => void }) {
  return (
    <section className="app-card rounded-3xl p-8 text-center">
      <X className="mx-auto h-10 w-10 text-[var(--app-accent-text)]" />
      <h1 className="mt-4 break-words text-3xl font-bold text-[var(--app-text)]">Section unavailable</h1>
      <p className="mx-auto mt-3 max-w-2xl break-words text-sm leading-6 text-[var(--app-muted)]">
        That section is not available in this vault. Return to the dashboard to continue.
      </p>
      <div className="mt-5 flex justify-center">
        <Button icon={Home} label="Back to Dashboard" onClick={onHome} variant="primary" />
      </div>
    </section>
  );
}

function EarningsCalculator({ onSummary, onUse }: { onSummary: (summary: CalculatorSummary) => void; onUse: () => void }) {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [customers, setCustomers] = useState<Record<string, number>>(() => ({
    ...Object.fromEntries(offers.map((offer) => [offer.id, 0])),
    ...readStoredRecord(CALCULATOR_CUSTOMERS_KEY),
  }));
  const [plans, setPlans] = useState<Record<string, string>>(() => ({ skylit: "skylit-community", ...readStoredStringRecord(CALCULATOR_PLANS_KEY) }));
  const rows = offers.map((offer) => {
    const selectedPlan = offer.plans?.find((plan) => plan.id === plans[offer.id]) ?? offer.plans?.[0];
    const commission = selectedPlan ? selectedPlan.monthlyPrice * (offer.commissionPercent / 100) : offer.monthlyCommission;
    const count = customers[offer.id] ?? 0;
    return { offer, selectedPlan, commission, count, monthly: commission * count, yearly: commission * count * 12 };
  });
  const totalMonthly = rows.reduce((sum, row) => sum + row.monthly, 0);
  const totalYearly = totalMonthly * 12;
  const totalCustomers = rows.reduce((sum, row) => sum + row.count, 0);

  useEffect(() => {
    const summary = { monthly: totalMonthly, yearly: totalYearly, customers: totalCustomers };
    onSummary(summary);
    window.localStorage.setItem(CALCULATOR_CUSTOMERS_KEY, JSON.stringify(customers));
    window.localStorage.setItem(CALCULATOR_PLANS_KEY, JSON.stringify(plans));
  }, [customers, plans, totalMonthly, totalYearly, totalCustomers, onSummary]);
  return (
    <div className="space-y-4">
      <section className="app-card rounded-3xl p-5 sm:p-6">
        <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr] xl:items-end">
          <SectionTitle eyebrow="Earnings Calculator" title="Forecast affiliate revenue by offer" description="Select plan levels, enter referrals, and estimate monthly or yearly recurring payouts." />
          <div className="rounded-3xl border border-[var(--app-border-strong)] bg-[var(--app-active)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-subtle)]">Estimated Bank Balance</p>
            <p className="mt-2 break-words text-4xl font-black text-[var(--app-text)]">{formatCurrency(period === "monthly" ? totalMonthly : totalYearly)}</p>
            <p className="mt-2 text-sm text-[var(--app-muted)]">{period === "monthly" ? "Monthly recurring projection" : "Yearly recurring projection"}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Stat label="Monthly Earnings" value={formatCurrency(totalMonthly)} icon={BadgeDollarSign} />
          <Stat label="Yearly Earnings" value={formatCurrency(totalYearly)} icon={TrendingUp} />
          <Stat label="Customers Referred" value={totalCustomers.toString()} icon={Users} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {(["monthly", "yearly"] as const).map((item) => (
            <button
              key={item}
              className={`min-h-10 rounded-xl border px-4 text-sm font-semibold capitalize ${period === item ? "border-[var(--app-border-strong)] bg-[var(--app-active)] text-[var(--app-text)]" : "border-[var(--app-border)] bg-[var(--app-button)] text-[var(--app-muted)]"}`}
              onClick={() => setPeriod(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
      <section className="grid gap-3">
        {rows.map((row) => (
          <div key={row.offer.id} className="app-card grid min-w-0 gap-4 rounded-2xl p-4 lg:grid-cols-2 xl:grid-cols-[1.25fr_minmax(240px,1.1fr)_1fr_1fr] xl:items-stretch">
            <div className="flex min-w-0 gap-3 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-3">
              <LogoBadge label={getOfferInitials(row.offer)} />
              <div className="min-w-0">
                <p className="break-words font-bold text-[var(--app-text)]">{row.offer.productName}</p>
                <p className="mt-1 break-words text-sm text-[var(--app-muted)]">{row.offer.category}</p>
                <p className="mt-2 break-words text-sm font-semibold text-[var(--app-accent-text)]">{formatCurrency(row.commission)} per customer</p>
              </div>
            </div>
            <div className="grid min-w-0 gap-3 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-3">
              {row.offer.plans ? (
                <label className="min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--app-subtle)]">Selected Plan</span>
                  <select
                    className="mt-1 h-12 w-full min-w-0 rounded-xl border border-[var(--app-border)] bg-[var(--app-input)] px-3 text-sm font-semibold text-[var(--app-text)]"
                    value={row.selectedPlan?.id}
                    onChange={(event) => {
                      onUse();
                      setPlans((current) => ({ ...current, [row.offer.id]: event.target.value }));
                    }}
                  >
                    {row.offer.plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <Metric label="Plan" value="Standard" />
              )}
              <label className="min-w-0">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--app-subtle)]">Customers Referred</span>
                <input
                  className="mt-1 h-12 w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-input)] px-3 text-[var(--app-text)]"
                  type="number"
                  min="0"
                  value={row.count}
                  onChange={(event) => {
                    onUse();
                    setCustomers((current) => ({ ...current, [row.offer.id]: Math.max(0, Number(event.target.value) || 0) }));
                  }}
                />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:col-span-2">
              <Stat label="Monthly" value={formatCurrency(row.monthly)} icon={BadgeDollarSign} />
              <Stat label="Yearly" value={formatCurrency(row.yearly)} icon={TrendingUp} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function UtilityPanel({
  progress,
  calculatorSummary,
  onCalculator,
  onOpportunities,
}: {
  progress: ProgressState;
  calculatorSummary: CalculatorSummary;
  onCalculator: () => void;
  onOpportunities: () => void;
}) {
  return (
    <aside className="sticky top-0 hidden h-screen w-[320px] shrink-0 border-l border-[var(--app-border)] bg-[var(--app-sidebar)] p-4 xl:block">
      <CreatorProgressPanel progress={progress} calculatorSummary={calculatorSummary} onCalculator={onCalculator} onOpportunities={onOpportunities} />
    </aside>
  );
}

function CreatorProgressPanel({
  progress,
  calculatorSummary,
  onCalculator,
  onOpportunities,
}: {
  progress: ProgressState;
  calculatorSummary: CalculatorSummary;
  onCalculator: () => void;
  onOpportunities: () => void;
}) {
  const rankInfo = getRankInfo(progress.xp);
  const hours = progress.activeSeconds / 3600;
  return (
    <section className="app-card rounded-3xl p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[var(--app-border-strong)] bg-[var(--app-active)] text-[var(--app-accent-text)]">
          <Trophy className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="break-words text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-subtle)]">Creator Progress</p>
          <h3 className="mt-1 break-words text-lg font-black text-[var(--app-text)]">{rankInfo.currentRank}</h3>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold text-[var(--app-text)]">{progress.xp} XP</p>
          <p className="text-xs text-[var(--app-muted)]">{rankInfo.isFinal ? "Top 250 eligible" : `${rankInfo.needed} XP to ${rankInfo.nextRank}`}</p>
        </div>
        <XpBar value={rankInfo.progress} />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <Metric label="Learning Time" value={`${hours.toFixed(1)} hrs`} />
        <Metric label="Monthly Earnings" value={formatCurrency(calculatorSummary.monthly)} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
        <Button icon={Library} label="Browse Opportunities" onClick={onOpportunities} />
        <Button icon={Calculator} label="Open Calculator" onClick={onCalculator} variant="primary" />
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="min-w-0">
      <p className="break-words text-xs font-semibold uppercase tracking-[0.16em] text-[var(--app-accent-text)]">{eyebrow}</p>
      <h2 className="mt-1 break-words text-2xl font-bold text-[var(--app-text)] sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-3xl break-words text-sm leading-6 text-[var(--app-muted)]">{description}</p>}
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="app-card min-w-0 rounded-2xl p-4">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-words text-xs font-semibold uppercase tracking-[0.12em] text-[var(--app-subtle)]">{label}</p>
          <p className="mt-2 break-words text-2xl font-bold text-[var(--app-text)]">{value}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--app-border)] bg-[var(--app-active)] text-[var(--app-accent-text)]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

function MobileLabel({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 xl:block">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--app-subtle)] xl:hidden">{label}</p>
      <p className="break-words text-sm font-semibold text-[var(--app-text)]">{value}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-3">
      <p className="break-words text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--app-subtle)]">{label}</p>
      <p className="mt-1 break-words text-sm font-bold text-[var(--app-text)]">{value}</p>
    </div>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-4">
      <div className="flex min-w-0 items-center gap-2 text-sm font-bold text-[var(--app-text)]">
        <Icon className="h-4 w-4 shrink-0 text-[var(--app-accent-text)]" />
        <span className="break-words">{title}</span>
      </div>
      <div className="mt-3 break-words text-sm leading-6 text-[var(--app-muted)]">{children}</div>
    </div>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-[var(--app-border)] bg-[var(--app-button)] px-3 py-1 text-xs font-semibold text-[var(--app-muted)]">
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
        <li key={item} className="flex min-w-0 gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--app-accent)]" />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Button({
  icon: Icon,
  label,
  onClick,
  variant = "secondary",
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}) {
  return (
    <motion.button
      className={`flex min-h-10 w-full min-w-0 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition ${
        variant === "primary"
          ? "border-[var(--app-accent)] bg-[var(--app-accent)] text-white shadow-[var(--app-glow)] hover:brightness-110"
          : "border-[var(--app-border-strong)] bg-[var(--app-button)] text-[var(--app-text)] hover:bg-[var(--app-hover)]"
      }`}
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="min-w-0 whitespace-normal break-words leading-tight">{label}</span>
    </motion.button>
  );
}

function generateHooks(category: string, count: number) {
  const base = [
    `Most people in ${category} are missing this simple angle.`,
    `If you are trying to grow with ${category}, start here.`,
    `This is the ${category} mistake I would avoid as a beginner.`,
    `I tested a smarter way to approach ${category}.`,
    `Before you pay for another tool, watch this ${category} breakdown.`,
    `The fastest way to explain ${category} to a beginner.`,
    `Here is the difference between random advice and a real ${category} system.`,
    `This ${category} workflow can save you hours every week.`,
    `If I had to start ${category} from zero, I would do this.`,
    `Nobody talks about this part of ${category}.`,
    `This is how creators can turn ${category} into content.`,
    `Stop overcomplicating ${category}. Use this checklist.`,
    `The hidden cost of doing ${category} without a process.`,
    `This ${category} offer is not for everyone, but it solves a real problem.`,
    `Here is a clean way to compare ${category} tools.`,
    `I would not promote a ${category} offer without checking this first.`,
    `A beginner-friendly way to understand ${category}.`,
    `This is what buyers actually want from ${category}.`,
    `The ${category} content angle that gets people curious.`,
    `Save this before you choose your next ${category} platform.`,
  ];
  return base.slice(0, count);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

export default App;
