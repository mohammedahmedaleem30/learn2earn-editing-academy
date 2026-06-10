export const navItems = [
  { id: "home", label: "Home" },
  { id: "niches", label: "Niche Vault" },
  { id: "hooks", label: "Hook Library" },
  { id: "scripts", label: "Script Templates" },
  { id: "broll", label: "B-Roll Ideas" },
  { id: "tools", label: "Editing Tools" },
  { id: "clients", label: "Client Templates" },
  { id: "resources", label: "Resources" },
];

export const niches = {
  Business: {
    angles: ["Skill building", "Online income", "Creator offers", "Productivity", "Case studies"],
    hooks: ["Most creators do not need more ideas. They need a clearer offer.", "If your content is not converting, fix this first.", "Your first paid skill can start with one useful result."],
    broll: ["Laptop workspace", "Analytics screen", "Client call", "Notes and planning"],
    style: "Clean captions, calm pacing, proof screenshots, and sharp callouts.",
    clientAngle: "Help founders and creators turn expertise into short-form videos that explain and sell.",
  },
  Fitness: {
    angles: ["Transformation", "Form fixes", "Meal prep", "Discipline", "Coach authority"],
    hooks: ["Your workout is not broken. Your consistency system is.", "Most gym videos start too late.", "Fix this form mistake before adding weight."],
    broll: ["Workout sets", "Timer shots", "Meal prep", "Transformation clips"],
    style: "Fast cuts on movement, bold captions, rep-timed sound hits, and form callouts.",
    clientAngle: "Help coaches package workouts and transformations into content that gets saves.",
  },
  "AI Creators": {
    angles: ["Tool demos", "Prompt workflows", "Workflow systems", "Before and after", "Creator systems"],
    hooks: ["Most people use AI like a search bar. That is the mistake.", "This workflow turns one idea into five assets.", "Stop collecting tools and build a repeatable system."],
    broll: ["Prompt typing", "Tool output", "Screen recordings", "Workflow board"],
    style: "Screen zooms, cursor highlights, split screens, and result-first edits.",
    clientAngle: "Help AI educators make tutorials clearer, faster, and easier to follow.",
  },
  Podcast: {
    angles: ["Strong quotes", "Guest stories", "Contrarian takes", "Lessons", "Reaction moments"],
    hooks: ["Most podcast clips fail because they start too late.", "This 12-second answer says everything.", "The best clip was hidden after the setup."],
    broll: ["Speaker close-up", "Reaction shot", "Waveform", "Studio detail"],
    style: "Tight cuts, speaker labels, subtle punch zooms, and clean subtitles.",
    clientAngle: "Help podcasters turn long conversations into sharp short clips.",
  },
  "Real Estate": {
    angles: ["Listing features", "Buyer mistakes", "Market updates", "Neighborhoods", "Agent trust"],
    hooks: ["This listing looks normal until you see this detail.", "Here is what buyers should check before making an offer.", "Most sellers miss this before listing."],
    broll: ["Exterior reveal", "Kitchen pan", "Door opening", "Agent talking clip"],
    style: "Premium pacing, room reveals, location labels, and soft cinematic movement.",
    clientAngle: "Help agents make listings and market advice feel more polished and trustworthy.",
  },
  Motivation: {
    angles: ["Discipline", "Self-trust", "Habits", "Standards", "Comeback stories"],
    hooks: ["Discipline feels hard until regret becomes heavier.", "The version of you that wins is built quietly.", "Stop negotiating with your goals."],
    broll: ["Morning routine", "Gym clip", "Journal", "Night work session"],
    style: "Cinematic B-roll, restrained captions, strong audio, and emotional pacing.",
    clientAngle: "Help personal brands turn short messages into clean motivational edits.",
  },
  Gaming: {
    angles: ["Clutch moments", "Tips", "Loadouts", "Streamer reactions", "Funny mistakes"],
    hooks: ["This clutch should not have worked.", "Most players panic here. Watch the better move.", "This reaction deserved its own edit."],
    broll: ["Gameplay replay", "Facecam", "Chat reaction", "Score screen"],
    style: "Punch zooms, freeze frames, replay labels, and sound hits on key moments.",
    clientAngle: "Help streamers turn long sessions into clips people actually finish.",
  },
  Cars: {
    angles: ["Sound", "Interior detail", "Build reveal", "Spec breakdown", "Driving feel"],
    hooks: ["This detail makes the whole build feel expensive.", "The best angle on this car is not the front.", "This startup sound deserves a replay."],
    broll: ["Engine start", "Wheel detail", "Interior shot", "Rolling clip"],
    style: "Slow reveals, engine sound emphasis, macro details, and luxury color grading.",
    clientAngle: "Help car creators and dealerships make vehicles feel premium on short-form.",
  },
};

export const hookCategories = ["All", ...Object.keys(niches)];

export const hooks = Object.entries(niches).flatMap(([category, data]) =>
  data.hooks.map((text, index) => ({ id: `${category}-${index}`, category, text })),
);

export const scriptTemplates = [
  { id: "talking-head", title: "Talking Head", purpose: "Explain one useful idea clearly.", structure: "Hook -> Context -> Key point -> Example -> CTA" },
  { id: "storytelling", title: "Storytelling", purpose: "Turn a personal lesson into a short video.", structure: "Moment -> Conflict -> Realization -> Lesson -> Takeaway" },
  { id: "short-ad", title: "Short-Form Ad", purpose: "Promote an offer without sounding pushy.", structure: "Problem -> Pain -> Offer -> Proof -> Action" },
  { id: "testimonial", title: "Client Testimonial", purpose: "Show a result or client win.", structure: "Before -> Process -> Result -> Trust cue -> CTA" },
  { id: "faceless", title: "Faceless Video", purpose: "Build a video from voiceover and B-roll.", structure: "Bold claim -> Visual proof -> Steps -> Summary -> Save prompt" },
];

export const brollIdeas = Object.fromEntries(
  Object.entries(niches).map(([name, data]) => [
    name,
    {
      use: data.broll.join(", "),
      find: "Use your own footage, creator assets, screen recordings, Pexels, Mixkit, or approved client clips.",
      edit: data.style,
    },
  ]),
);

export const tools = [
  { name: "CapCut", initials: "CC", bestFor: "Fast short-form edits and captions", type: "Free/Paid", url: "https://www.capcut.com" },
  { name: "DaVinci Resolve", initials: "DR", bestFor: "Professional editing and color grading", type: "Free/Paid", url: "https://www.blackmagicdesign.com/products/davinciresolve" },
  { name: "Premiere Pro", initials: "PR", bestFor: "Client workflows and advanced timelines", type: "Paid", url: "https://www.adobe.com/products/premiere.html" },
  { name: "Canva", initials: "CV", bestFor: "Thumbnails, graphics, and simple assets", type: "Free/Paid", url: "https://www.canva.com" },
  { name: "ChatGPT", initials: "AI", bestFor: "Hooks, scripts, captions, and ideas", type: "Free/Paid", url: "https://chat.openai.com" },
  { name: "ElevenLabs", initials: "EL", bestFor: "Voiceovers for faceless videos", type: "Free/Paid", url: "https://elevenlabs.io" },
  { name: "Descript", initials: "DS", bestFor: "Transcript-based podcast and talking-head edits", type: "Free/Paid", url: "https://www.descript.com" },
  { name: "Runway", initials: "RW", bestFor: "AI visuals and creative video tools", type: "Free/Paid", url: "https://runwayml.com" },
];

export const clientTemplates = [
  { title: "Cold DM", text: "Hey [Name], I liked your recent video about [topic]. I noticed the hook could be stronger, so I had an idea for a tighter edit. Want me to make a short free sample?" },
  { title: "Follow-up message", text: "Hey [Name], quick follow-up. I still think your content has strong potential with sharper pacing and captions. Happy to send one sample if useful." },
  { title: "Portfolio pitch", text: "I specialize in editing short-form videos for [niche]. Here are a few sample edits showing hooks, captions, B-roll, and pacing." },
  { title: "Sample offer", text: "I can edit one short sample from your existing content so you can compare the difference before deciding anything." },
  { title: "Client delivery message", text: "Here is the edited version. I focused on the first three seconds, cleaner captions, tighter pacing, and better visual support." },
];

export const resourceCards = [
  "Video lessons",
  "Editing asset pack",
  "Downloadable guides",
  "Community feedback",
  "Portfolio examples",
];
