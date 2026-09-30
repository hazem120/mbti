import type { SiteContent } from "@/content/schema";

export const relations = {
  dual: {
    name: "Duality",
    tagline: "Their strengths cover the needs you rarely admit.",
    description:
      "They are strong exactly where you are weak but wish you were not, and you do the same for them. What costs you effort comes naturally to them, and they offer it without making you feel inadequate. Over time the relationship brings a deep sense of ease, as if you can finally stop compensating and simply be yourself. It is often quieter at the start than more intense pairings, but it tends to grow stronger the longer it lasts.",
    whatWorks: [
      "They handle your weak areas without judgment or fuss.",
      "You feel calmer and more like yourself around them.",
      "Each of you supports the other's growth without trying to.",
    ],
    watchOut: [
      "The early spark can feel quieter than more dramatic pairings.",
      "You may lean on them so much that your own skills stall.",
      "Differences in pace and style still need patient communication.",
    ],
  },
  activity: {
    name: "Activation",
    tagline: "Quick sparks and lots of energy, if you pace it.",
    description:
      "Around them you feel switched on: ideas move quickly, plans turn into action, and you egg each other on. They supply the kind of stimulation that gets you moving, and you do the same for them. The catch is intensity, because the energy that makes this relationship exciting can also wear both of you out. It works best with regular breaks and room to recharge apart.",
    whatWorks: [
      "Joint projects get off the ground fast.",
      "You bring out each other's enthusiasm and initiative.",
      "Conversations stay lively and seldom stall.",
    ],
    watchOut: [
      "Constant stimulation can tip into exhaustion or irritation.",
      "You may push each other into overcommitting.",
      "Without downtime, small frictions pile up quickly.",
    ],
  },
  semiDual: {
    name: "Semi-Duality",
    tagline: "A strong pull and a near fit, with one piece missing.",
    description:
      "They meet one of your deepest needs very well, which often creates a strong and immediate attraction. In another area, though, your styles do not line up, and something important stays slightly out of sync. The relationship can feel magnetic and frustrating at the same time. Naming the mismatch openly keeps it from turning into quiet disappointment.",
    whatWorks: [
      "You get real help in an area you truly value.",
      "Attraction and interest come easily on both sides.",
      "The partial fit feels exciting and full of promise.",
    ],
    watchOut: [
      "You may keep expecting them to fill a need they cannot.",
      "Misread signals in the mismatched area can sting.",
      "Intensity can settle into an uneven, on-and-off rhythm.",
    ],
  },
  mirage: {
    name: "Mirage",
    tagline: "Easy, relaxed, and fun, if not always deep.",
    description:
      "Time with them tends to feel light: you enjoy each other's company, laugh easily, and rarely feel pressured. They offer part of what you need, enough to feel pleasant without challenging you much. The risk is drift, because the relationship can lack direction or seriousness when real decisions arrive. It shines as a friendship or casual collaboration and needs conscious effort to go deeper.",
    whatWorks: [
      "You unwind easily in each other's company.",
      "Low pressure keeps conversation relaxed and playful.",
      "They offer gentle support without asking much in return.",
    ],
    watchOut: [
      "Serious topics may get brushed aside or postponed.",
      "Plans can drift when neither of you takes the lead.",
      "Comfort can be mistaken for deep compatibility.",
    ],
  },
  identity: {
    name: "Identity",
    tagline: "Two copies of the same mind.",
    description:
      "You share the same function stack, so you understand their reasoning almost before it is spoken. Conversations flow with little translation, and you can predict each other's reactions with uncanny accuracy. Because you share the same strengths, you also share the same blind spots, and neither of you naturally fills the gaps. The relationship offers comfort and validation more than growth.",
    whatWorks: [
      "You explain yourself less and are understood more.",
      "Shared priorities make joint decisions quick.",
      "Your advice to them tends to fit their situation well.",
    ],
    watchOut: [
      "Shared blind spots grow unchecked with no one to flag them.",
      "You may compete for the same role or recognition.",
      "Familiarity can slide into boredom without outside input.",
    ],
  },
  mirror: {
    name: "Mirror",
    tagline: "Same values, seen from a slightly different angle.",
    description:
      "You value the same things, but you lead with the function they use second, and they lead with the one you use second. Each of you sees the other as a shifted version of yourself, which makes conversation stimulating and full of useful corrections. They notice what you leave out, and you sharpen what they gloss over. The relationship works best as a partnership of peers who refine each other's ideas.",
    whatWorks: [
      "You push each other's thinking further in discussion.",
      "Mutual correction improves your work without feeling hostile.",
      "Shared values make it easy to trust their intentions.",
    ],
    watchOut: [
      "Small differences in emphasis can escalate into endless debate.",
      "Each of you may feel only half understood by the other.",
      "Constant critique can start to feel like nitpicking.",
    ],
  },
  kindred: {
    name: "Kindred",
    tagline: "Same destination, different routes.",
    description:
      "You lead with the same function, so your core goals and instincts feel familiar to each other. You pursue those goals with different tools, though, which makes their methods seem both recognizable and oddly off. Cooperation comes naturally on what matters, while friction appears over how to get there. Respecting each other's approach turns that difference into a valuable second perspective.",
    whatWorks: [
      "You agree quickly on what the real problem is.",
      "Their different methods show you new ways forward.",
      "Shared instincts make trust relatively easy to build.",
    ],
    watchOut: [
      "You may argue over methods while agreeing on goals.",
      "A rivalry can form over who does it better.",
      "Their approach can look needlessly roundabout to you.",
    ],
  },
  business: {
    name: "Business",
    tagline: "Different aims, shared methods, smooth teamwork.",
    description:
      "You share the same creative approach, so working side by side feels practical and efficient. Your deeper motivations differ, which keeps the relationship polite and task-focused rather than intimate. Collaboration is often productive precisely because it stays businesslike. Closeness can grow, but it usually builds slowly through shared work.",
    whatWorks: [
      "You understand each other's working style right away.",
      "Tasks get divided and done with minimal fuss.",
      "Courtesy and mutual respect come easily.",
    ],
    watchOut: [
      "Different underlying goals can surface at key moments.",
      "The relationship may stay pleasant but shallow.",
      "You may feel quietly competitive about results.",
    ],
  },
  supervisor: {
    name: "Supervisor",
    tagline: "You tend to supervise them, often without meaning to.",
    description:
      "In this relation you are the supervisor: your natural strengths land right on their most sensitive area. Things you say casually can feel to them like an evaluation, and they may sense you are always watching and finding them lacking. From your side, they can seem puzzling or not quite competent in ways you find hard not to point out. Awareness and a gentle touch go a long way toward keeping this balanced.",
    whatWorks: [
      "You can offer genuinely useful feedback when they ask for it.",
      "They tend to take your perspective seriously.",
      "Clear roles and boundaries make cooperation easier.",
    ],
    watchOut: [
      "Offhand remarks may wound more than you intend.",
      "They may turn guarded or defensive around you.",
      "You can slip into a quietly condescending tone.",
    ],
  },
  supervisee: {
    name: "Supervisee",
    tagline: "They tend to supervise you, often without meaning to.",
    description:
      "In this relation they are the supervisor: their natural strengths press on your most vulnerable area. Even neutral comments from them can feel like being graded, and you may catch yourself trying to prove something. They often seem more capable than you in exactly the ways you feel least sure of. Remembering that the pressure comes from the pairing, not from a real verdict on you, helps you stay grounded.",
    whatWorks: [
      "Their feedback can reveal blind spots worth working on.",
      "Their competence can inspire you from a comfortable distance.",
      "Well-defined roles reduce the feeling of being watched.",
    ],
    watchOut: [
      "You may feel constantly evaluated or second-guessed.",
      "Seeking their approval can drain your confidence.",
      "Resentment builds if you never name the pressure.",
    ],
  },
  benefactor: {
    name: "Benefactor",
    tagline: "You give, they receive.",
    description:
      "In this relation you are the benefactor: you naturally offer insight, help, or direction that they find valuable and admire. They tend to listen and learn from you, which can feel rewarding. The flow runs mostly one way, though, and what they offer back is less obviously useful to you, so you may not fully grasp their point of view. Left unattended, the imbalance can leave you feeling unmet and them feeling talked down to.",
    whatWorks: [
      "Your guidance lands well and is genuinely appreciated.",
      "They bring curiosity and admiration to your ideas.",
      "Mentoring roles suit this pairing naturally.",
    ],
    watchOut: [
      "You may overlook what they are trying to give back.",
      "Admiration can slide into dependence.",
      "Your advice can start to sound like instruction.",
    ],
  },
  beneficiary: {
    name: "Beneficiary",
    tagline: "They give, you receive.",
    description:
      "In this relation they are the benefactor: they offer insight or help that you find valuable, and you may admire them for it. Learning from them can feel inspiring, and their perspective often opens doors for you. The flow runs mostly one way, though, and you may sense they do not fully take in what you try to give back. Balance comes from valuing your own contribution instead of chasing their approval.",
    whatWorks: [
      "You gain real insight from how they see things.",
      "Their confidence can spur your own growth.",
      "Learning from them can be highly productive.",
    ],
    watchOut: [
      "You may feel slightly unheard or overlooked.",
      "Admiration can make it hard to disagree with them.",
      "Chasing their approval can quietly erode your confidence.",
    ],
  },
  extinguishment: {
    name: "Contrary",
    tagline: "Similar interests, opposite approach.",
    description:
      "You are drawn to similar topics and often share a real interest in the same questions. You approach them from opposite directions, though: where you turn inward, they turn outward, and the reverse. From a distance this is fascinating, and conversations can be rich and surprising. Up close, the constant difference in approach tends to dampen each other's energy and make joint action tiring.",
    whatWorks: [
      "You enjoy long discussions about shared interests.",
      "Their opposite angle exposes gaps in your reasoning.",
      "Occasional collaboration can be surprisingly fruitful.",
    ],
    watchOut: [
      "Daily cooperation can feel draining for both of you.",
      "You may cancel out each other's enthusiasm.",
      "Debates can circle without ever reaching a decision.",
    ],
  },
  quasiIdentity: {
    name: "Quasi-Identity",
    tagline: "Looks alike, means something different.",
    description:
      "On the surface you seem alike, with overlapping interests and even a similar vocabulary. Underneath, you mean different things by the same words and want different outcomes. That makes misunderstandings easy, because what looks like agreement can turn out to be two separate plans. Patient clarification, especially about goals, keeps the relationship workable and even interesting.",
    whatWorks: [
      "Shared interests give you plenty to talk about.",
      "Their alternative take can broaden your thinking.",
      "Explicit agreements prevent most misunderstandings.",
    ],
    watchOut: [
      "You may assume agreement where none exists.",
      "Their reasoning can seem subtly wrong to you.",
      "Conversations can feel like talking past each other.",
    ],
  },
  superego: {
    name: "Super-Ego",
    tagline: "Respect at a distance, tension up close.",
    description:
      "From afar you often respect them, and may even admire qualities you lack. Up close, your strong functions press on each other's vulnerable points, and interaction becomes careful and formal. Each of you may feel the other is quietly critical or hard to relax around. This relation works best with clear roles, some distance, and generous assumptions about intent.",
    whatWorks: [
      "You can respect and learn from their competence.",
      "Formal or structured settings keep things smooth.",
      "Distance lets appreciation outweigh friction.",
    ],
    watchOut: [
      "Close contact can feel stiff and exhausting.",
      "You may feel judged in areas where you are insecure.",
      "Well-meant advice can land as criticism on both sides.",
    ],
  },
  conflict: {
    name: "Conflict",
    tagline: "The most friction, and the steepest lesson.",
    description:
      "This is the relation with the strongest friction: what you do best tends to land directly on their most vulnerable point, and what they do best lands on yours. Even with good intentions, you can misread each other's motives and feel repeatedly misunderstood. Attraction is possible, but everyday closeness usually demands unusual patience and self-awareness. Approached with care, it shows you exactly where your own blind spots lie.",
    whatWorks: [
      "Clear boundaries and explicit expectations help a lot.",
      "Working in separate lanes reduces constant friction.",
      "They can reveal blind spots no one else can.",
    ],
    watchOut: [
      "Small misunderstandings can escalate quickly.",
      "You may feel drained after even brief interactions.",
      "Good intentions on either side can be read as hostility.",
    ],
  },
} satisfies SiteContent["relations"];
