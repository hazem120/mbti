import type { TypeCode } from "@/data";
import type { TypeContent } from "@/content/schema";

export const ntTypes = {
  INTJ: {
    nickname: "The Strategist",
    tagline: "Sees the long game and quietly builds the road to it.",
    overview:
      "INTJs lead with Introverted Intuition, turning scattered clues into a clear picture of where things are heading. Extraverted Thinking then converts that picture into plans, systems, and measurable milestones. Beneath the cool exterior sits a private, firmly held set of values that decides which goals deserve their effort at all. They are at their best with a hard problem, a long horizon, and the freedom to execute without interference.",
    strengths: [
      "Anticipates consequences several moves ahead",
      "Turns abstract vision into concrete, workable plans",
      "Stays calm and objective under pressure",
      "Holds high, consistent standards for quality",
    ],
    blindSpots: [
      "Dismisses ideas before hearing them out",
      "Underestimates how a plan will feel to people",
      "Ignores the body until it demands attention",
      "Reads as cold or arrogant without intending to",
    ],
    situations: {
      work: {
        summary:
          "You do your best work with a complex problem and the autonomy to solve it your way. You see early where a project is heading and quietly redesign the process to get there faster. Meetings without decisions and rules without reasons wear you down.",
        behaviors: [
          "You picture the finished result first, then work backward to today's tasks.",
          "In meetings you stay quiet until you can make the one point that changes direction.",
          "You rebuild a clumsy workflow on your own initiative, often before anyone asks.",
        ],
        tip: "Share your reasoning early, not just your conclusion, so people can follow your plan instead of resisting it.",
      },
      love: {
        summary:
          "You approach love selectively and seriously, looking for someone whose mind you respect and whom you can trust completely. Your feelings run deeper than you show, and you express them through reliability and problem-solving more than words. Once committed, you are steady and loyal.",
        behaviors: [
          "You show care by quietly solving practical problems in your partner's life.",
          "You take a long time to open up, then reveal a surprising tenderness.",
          "You map out the relationship's future in your head before saying any of it aloud.",
        ],
        tip: "Say the affectionate thing out loud, even when you believe your actions already said it.",
      },
      friendship: {
        summary:
          "You keep a small circle and invest in it deeply. You value friends who can argue about ideas without taking it personally and who respect your need for solitude. Your loyalty is quiet but durable.",
        behaviors: [
          "You would rather have one long, honest conversation than attend a crowded party.",
          "You give candid warnings when a friend is walking toward a mistake.",
          "You go silent for weeks, then pick up exactly where you left off.",
        ],
        tip: "Send a short message between the big conversations so friends know you are still there.",
      },
      stress: {
        summary:
          "Stress arrives when chaos you cannot control disrupts your plans, or when you are stuck in long stretches of noise and stimulation. Your inferior Se can take over, pulling you toward overindulgence or an unusual fixation on physical details. At the same time you may grow rigid and wave off every alternative.",
        behaviors: [
          "You binge on food, shows, or cleaning in an attempt to switch your mind off.",
          "You become irritated by noise, clutter, and small physical discomforts.",
          "You cling harder to your plan and refuse to hear objections.",
        ],
        tip: "When you notice indulgence spiraling, take a slow walk or do one simple physical task to reset your senses.",
      },
      conflict: {
        summary:
          "In conflict you default to logic and evidence, aiming for the correct answer rather than an emotional win. You can be blunt, and you may miss that the other person needs acknowledgment more than accuracy. Once you believe a position is right, you are hard to move.",
        behaviors: [
          "You lay out your case point by point with almost no preamble.",
          "You withdraw to think rather than argue in the heat of the moment.",
          "You concede quickly when someone shows you better evidence.",
        ],
        tip: "Before you present your case, name how the other person seems to feel; it makes them far more open to your logic.",
      },
      decisions: {
        summary:
          "You decide by holding a clear image of the outcome you want and testing each option against it. Your Te weighs efficiency and evidence, while your Fi quietly vetoes anything that violates your principles. You tend to decide early and then defend the choice.",
        behaviors: [
          "You find the one factor that matters most and prioritize it ruthlessly.",
          "You research privately before announcing a firm decision.",
          "You rarely revisit a choice unless genuinely new evidence appears.",
        ],
        tip: "Before you lock in, ask one trusted person what you might be missing about the people involved.",
      },
      learning: {
        summary:
          "You learn by building a mental model of the whole system and then filling in the details. You want to know why something is true, not just what to memorize. Self-directed study usually beats a lecture for you.",
        behaviors: [
          "You skim an entire field first to see how the pieces fit together.",
          "You challenge an instructor when an explanation does not hang together.",
          "You drop a subject quickly once you judge it irrelevant to your goals.",
        ],
        tip: "Build hands-on practice into your study, because your models get sharper when reality tests them.",
      },
      leadership: {
        summary:
          "You lead through vision and competence, setting a clear direction and building systems that carry it forward. You expect high standards and grant real autonomy to people who meet them. Your growth edge is warmth and visibility.",
        behaviors: [
          "You set an ambitious long-term goal and a precise roadmap to reach it.",
          "You delegate to capable people and then leave them alone.",
          "You replace an underperforming process quickly and without sentiment.",
        ],
        tip: "Recognize your team's effort publicly and often, because people follow a vision more readily when they feel valued.",
      },
    },
  },
  INTP: {
    nickname: "The Theorist",
    tagline: "Takes ideas apart to understand exactly how they work.",
    overview:
      "INTPs lead with Introverted Thinking, building precise internal frameworks and testing every claim for consistency. Extraverted Intuition feeds that framework a constant stream of new angles, analogies, and what-ifs. They are curious rather than competitive, happier to find the flaw in a theory than to win an argument about it. Give them an interesting problem and uninterrupted time, and they will often find the elegant answer everyone else missed.",
    strengths: [
      "Spots logical flaws and inconsistencies instantly",
      "Builds original frameworks and inventive solutions",
      "Revises views readily when the logic demands it",
      "Explains complex ideas with unusual precision",
    ],
    blindSpots: [
      "Overanalyzes and delays committing to action",
      "Lets deadlines and practical follow-through slide",
      "Misses emotional cues in the middle of conversation",
      "Can seem detached or dismissive of feelings",
    ],
    situations: {
      work: {
        summary:
          "You thrive where you can analyze, design, and troubleshoot without being micromanaged. You are drawn to root causes and elegant solutions, and you will happily redesign a system from scratch. Repetitive tasks and office politics drain you fast.",
        behaviors: [
          "You question the premise of a task before you agree to start it.",
          "You get absorbed in a hard problem and lose all track of time.",
          "You test several approaches in your head before committing to one.",
        ],
        tip: "Decide in advance what 'good enough' looks like, so exploration does not crowd out delivery.",
      },
      love: {
        summary:
          "You want a partner who is a real companion for ideas and who accepts your need for mental space. Your affection is sincere but understated, shown through curiosity about their world and quiet consistency. Putting feelings into words can feel awkward, so you may need time.",
        behaviors: [
          "You show interest by asking probing questions about how your partner thinks.",
          "You share your strangest private theories only with someone you trust.",
          "You analyze your feelings when you could simply express them.",
        ],
        tip: "When your partner is upset, offer comfort before you offer a solution or an analysis.",
      },
      friendship: {
        summary:
          "You bond through shared interests, long conversations, and playful intellectual sparring. You are accepting and rarely bothered by quirks that others would criticize. You may forget to keep in touch, but your friendships survive long gaps.",
        behaviors: [
          "You debate a topic just to explore it, not to win.",
          "You send friends articles that continue a conversation from months ago.",
          "You shrug at unconventional choices that others might judge.",
        ],
        tip: "Initiate plans now and then instead of waiting for friends to reach out first.",
      },
      stress: {
        summary:
          "Stress builds under constant emotional demands, rigid rules, or pressure to decide before you understand. Your inferior Fe can erupt, making you unusually sensitive to rejection or prone to sudden emotional outbursts. You may become convinced that people secretly dislike you.",
        behaviors: [
          "You withdraw completely and replay social interactions looking for mistakes.",
          "You snap unexpectedly, then feel embarrassed by the outburst.",
          "You read criticism or exclusion into neutral comments.",
        ],
        tip: "Tell one trusted person what you are feeling instead of trying to reason it away alone.",
      },
      conflict: {
        summary:
          "You approach conflict as a problem to understand, focusing on definitions and facts. You can become pedantic, and you may miss that the other person needs reassurance, not correction. You would rather avoid emotional confrontation altogether.",
        behaviors: [
          "You correct an inaccuracy in the other person's argument mid-sentence.",
          "You go quiet and detached when emotions run high.",
          "You reopen the topic days later with a carefully reasoned explanation.",
        ],
        tip: "Ask what the other person needs from the conversation before you debate the details.",
      },
      decisions: {
        summary:
          "You decide by reasoning through every variable until the logic feels airtight. Your Ne keeps adding options, which makes closure hard. Once you understand the system, though, your decision is often unusually sound.",
        behaviors: [
          "You map pros, cons, and edge cases before committing.",
          "You delay deciding in case a better option turns up.",
          "You trust your own analysis over authority or popular opinion.",
        ],
        tip: "Give your analysis a deadline, then decide with the best logic you have at that point.",
      },
      learning: {
        summary:
          "You learn by questioning, connecting, and rebuilding concepts in your own terms. A principle only sticks once you understand why it is true. Rote memorization and rigid curricula frustrate you.",
        behaviors: [
          "You chase tangents that deepen your grasp of the core idea.",
          "You rewrite explanations in your own words until they are exact.",
          "You lose interest once you have cracked the underlying logic.",
        ],
        tip: "Use spaced review for the details you find boring, because your memory will not hold them on its own.",
      },
      leadership: {
        summary:
          "You lead as an expert and architect, guiding through ideas rather than authority. You give people freedom and reward independent thinking. Your challenge is sustaining structure and paying attention to morale.",
        behaviors: [
          "You invite debate and let the best argument win over rank.",
          "You design clever systems and hand them to others to run.",
          "You avoid micromanaging, sometimes to the point of seeming absent.",
        ],
        tip: "Check in regularly on how your team is feeling, not only on what they are working on.",
      },
    },
  },
  ENTJ: {
    nickname: "The Director",
    tagline: "Sets the goal, builds the machine, and drives it to the finish.",
    overview:
      "ENTJs lead with Extraverted Thinking, organizing people, resources, and timelines around clear objectives. Introverted Intuition gives them long-range strategic sense, so their plans aim at where things are going rather than where they are. They are energized by challenge and step in naturally when a group lacks direction. Their private feelings run deeper than they let on, and they guard them closely.",
    strengths: [
      "Makes tough calls quickly and confidently",
      "Organizes people and resources around clear goals",
      "Thinks strategically about long-term outcomes",
      "States expectations directly and unambiguously",
    ],
    blindSpots: [
      "Sets a pace others cannot sustain",
      "Treats emotions as obstacles to efficiency",
      "Struggles to show vulnerability or ask for help",
      "Dominates discussions without noticing",
    ],
    situations: {
      work: {
        summary:
          "You are at your best leading ambitious projects with measurable goals and room to scale. You spot inefficiency immediately and restructure processes to remove it. Indecision, vague roles, and slow bureaucracy frustrate you.",
        behaviors: [
          "You set targets, name an owner for each, and track progress relentlessly.",
          "You take charge the moment a meeting starts to drift.",
          "You challenge a weak proposal directly and expect the same in return.",
        ],
        tip: "Before pushing a change, ask the people doing the work what they would fix, because their buy-in speeds execution.",
      },
      love: {
        summary:
          "You bring the same commitment to relationships that you bring to your goals, and you want a partner who is capable, honest, and growing. You express love by building a shared future and tackling problems together. Emotional vulnerability comes slowly, but it runs deep once trust is earned.",
        behaviors: [
          "You plan dates, trips, and milestones with care and initiative.",
          "You champion your partner's ambitions and help them strategize.",
          "You hold back talking about feelings until they have built up.",
        ],
        tip: "Make room to listen without steering toward a plan, because sometimes support simply means being present.",
      },
      friendship: {
        summary:
          "You value friends who are driven, direct, and fun to challenge. You are generous with advice and connections, and you enjoy organizing adventures. You may need reminding that friendship is not a project.",
        behaviors: [
          "You organize the group trip and handle every piece of logistics.",
          "You give friends frank career advice they did not ask for.",
          "You bond through competitive games and spirited argument.",
        ],
        tip: "Ask a friend how they are really doing, and resist the urge to fix it.",
      },
      stress: {
        summary:
          "Stress hits when you are surrounded by incompetence, lose control, or watch a goal slip away. Your inferior Fi can surface as hurt feelings, a sense of being unappreciated, or sudden emotional sensitivity. You may also push harder while your effectiveness drops.",
        behaviors: [
          "You feel suddenly unappreciated despite everything you have done.",
          "You work longer hours even as your results decline.",
          "You become unusually sensitive to any hint of disloyalty.",
        ],
        tip: "Treat rest as part of the strategy: step back, name what hurts, and talk it through with someone you trust.",
      },
      conflict: {
        summary:
          "You meet conflict head-on and prefer to resolve disagreements quickly and cleanly. You argue with logic and confidence, which can overwhelm people who need time to respond. You respect opponents who push back with solid reasoning.",
        behaviors: [
          "You name the problem and propose a fix in the same breath.",
          "You raise your intensity when you sense evasion.",
          "You move on quickly once the issue is settled.",
        ],
        tip: "Slow down and ask the other person to state their full view before you respond.",
      },
      decisions: {
        summary:
          "You decide quickly by weighing objective data against your long-term vision. You are comfortable making calls under uncertainty and adjusting later. The risk is underweighting the human impact.",
        behaviors: [
          "You set decision criteria up front and apply them consistently.",
          "You prefer a good decision now to a perfect one later.",
          "You cut your losses decisively when something is not working.",
        ],
        tip: "Add 'how will this land with the people affected?' to every decision checklist you use.",
      },
      learning: {
        summary:
          "You learn fastest when knowledge serves a goal, especially one you can act on immediately. You like structured programs, expert sources, and clear benchmarks. Abstract material with no practical use loses you quickly.",
        behaviors: [
          "You read strategically, extracting what is useful and skipping the rest.",
          "You seek mentors who have already achieved what you want.",
          "You try new ideas at work within days of learning them.",
        ],
        tip: "Leave some room for learning with no goal attached, because unexpected detours often feed your best strategies.",
      },
      leadership: {
        summary:
          "Leadership comes naturally to you: you set direction, make decisions, and hold people accountable. You are at your best building teams and systems that outlast your involvement. Your growth edge is patience and emotional attunement.",
        behaviors: [
          "You pair a bold vision with a concrete plan to reach it.",
          "You promote people on results rather than tenure.",
          "You give direct feedback on the spot instead of saving it for reviews.",
        ],
        tip: "Praise effort and progress as openly as you critique mistakes.",
      },
    },
  },
  ENTP: {
    nickname: "The Provocateur",
    tagline: "Questions everything and finds the angle no one else saw.",
    overview:
      "ENTPs lead with Extraverted Intuition, spotting connections and possibilities in every conversation, system, and assumption. Introverted Thinking then tests those ideas for logic, which is why they enjoy arguing even for positions they do not hold. Tertiary Fe gives them charm and a knack for reading an audience. They are energized by novelty and debate, and bored by anything that feels settled.",
    strengths: [
      "Generates inventive ideas and unexpected solutions",
      "Adapts quickly to new information and change",
      "Debates skillfully and sharpens others' thinking",
      "Brings energy and humor to any group",
    ],
    blindSpots: [
      "Starts many projects but finishes few",
      "Argues for sport and unsettles people",
      "Neglects routine tasks, health, and details",
      "Resists structure even when it would help",
    ],
    situations: {
      work: {
        summary:
          "You thrive in roles that reward invention, problem-solving, and persuasion. You love brainstorming and challenging the status quo, and you can pitch an idea convincingly on the fly. Routine execution and rigid hierarchy drain you quickly.",
        behaviors: [
          "You pitch three new ideas before the first one is finished.",
          "You play devil's advocate to stress-test a team's plan.",
          "You find clever workarounds for rules that seem arbitrary.",
        ],
        tip: "Team up with a strong finisher and agree up front on which ideas you will actually ship.",
      },
      love: {
        summary:
          "You want a partner who can keep up with your ideas, laugh with you, and never let things go stale. You show love through playful banter, shared adventures, and genuine curiosity. Routine and emotional heaviness can make you restless.",
        behaviors: [
          "You flirt through witty debate and affectionate teasing.",
          "You plan spontaneous adventures to keep things fresh.",
          "You crack a joke to dodge a serious emotional conversation.",
        ],
        tip: "When your partner raises a concern, drop the counterargument and listen for the feeling underneath it.",
      },
      friendship: {
        summary:
          "You are the friend with the wild ideas, the late-night debates, and the unexpected plans. You connect with people from all walks of life and love introducing them to each other. Consistency can slip when something new catches your attention.",
        behaviors: [
          "You challenge a friend's opinion just to see how they defend it.",
          "You introduce friends who you are sure will get along.",
          "You forget a birthday, then show up later with a brilliant surprise.",
        ],
        tip: "Keep a few recurring rituals with close friends so they know they can count on you.",
      },
      stress: {
        summary:
          "Stress rises when you are trapped in routine, micromanaged, or forced to focus on tedious details. Your inferior Si can surface as fixation on bodily symptoms, past mistakes, or a sudden rigid need for control. The usually playful explorer may withdraw.",
        behaviors: [
          "You obsess over a minor health symptom or an old regret.",
          "You become uncharacteristically rigid about small routines.",
          "You withdraw and lose interest in new ideas altogether.",
        ],
        tip: "Restore the basics of sleep, food, and movement before you try to solve anything bigger.",
      },
      conflict: {
        summary:
          "You enjoy intellectual conflict and can treat a serious disagreement like a debate to win. Your quick wit can leave people feeling outmaneuvered rather than heard. You rarely hold grudges and move on easily.",
        behaviors: [
          "You find the logical hole in the other person's argument immediately.",
          "You use humor to defuse tension, sometimes before it is resolved.",
          "You switch sides mid-argument to explore another angle.",
        ],
        tip: "Ask yourself whether you want to be right or to resolve it, then act on the answer.",
      },
      decisions: {
        summary:
          "You decide by exploring every possibility and often change course as new ideas emerge. Your Ti tests options for logical soundness, but commitment itself can feel confining. You decide best when the choice still leaves room to adapt.",
        behaviors: [
          "You brainstorm unconventional options before narrowing down.",
          "You keep decisions reversible whenever you can.",
          "You make quick calls in a crisis, then iterate.",
        ],
        tip: "Pick a date to commit and honor it, even when a shiny new option appears.",
      },
      learning: {
        summary:
          "You learn by exploring, arguing, and connecting ideas across fields. You grasp concepts quickly and enjoy challenging teachers and textbooks. Long drills and memorization lose you.",
        behaviors: [
          "You learn best by debating a topic with someone who disagrees.",
          "You jump between subjects and cross-pollinate insights.",
          "You grab the gist fast and skip the fine print.",
        ],
        tip: "Choose one subject to go deep on, and build a simple routine for practicing its fundamentals.",
      },
      leadership: {
        summary:
          "You lead by inspiring people with ideas and challenging them to think bigger. You create a culture of experiment and open debate. Consistency and follow-through are your growth areas.",
        behaviors: [
          "You encourage bold ideas and reward creative risk.",
          "You rally people with a compelling pitch.",
          "You shift strategy quickly when a better approach appears.",
        ],
        tip: "Pair your vision with a steady operating rhythm so your team is not whiplashed by every change.",
      },
    },
  },
} satisfies Pick<Record<TypeCode, TypeContent>, "INTJ" | "INTP" | "ENTJ" | "ENTP">;
