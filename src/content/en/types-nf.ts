import type { TypeCode } from "@/data";
import type { TypeContent } from "@/content/schema";

export const nfTypes = {
  INFJ: {
    nickname: "The Seer",
    tagline: "Reads the undercurrent and quietly steers people toward growth.",
    overview:
      "INFJs lead with Introverted Intuition, sensing the meaning beneath events and where people and situations are heading. Extraverted Feeling turns that insight outward, toward understanding and helping others. Their tertiary Ti gives them a private, analytical edge that surprises people who only see their warmth. They need a sense of purpose above all, and they can be quietly relentless once they believe in a cause.",
    strengths: [
      "Reads people's motives with uncanny accuracy",
      "Puts complex insights into warm, clear language",
      "Stays committed to long-term, meaningful goals",
      "Creates a safe space for others' honesty",
    ],
    blindSpots: [
      "Absorbs others' emotions until burned out",
      "Holds ideals no real person can meet",
      "Avoids conflict, then cuts people off abruptly",
      "Neglects practical details and physical needs",
    ],
    situations: {
      work: {
        summary:
          "You feel fulfilled when your work serves a purpose you believe in and lets you help people grow. You excel at seeing the big picture and sensing what people need before they say it. Constant conflict or hollow goals exhaust you.",
        behaviors: [
          "You notice tension on a team weeks before anyone names it.",
          "You connect a routine project to the deeper purpose it serves.",
          "You work deeply alone, then share a polished insight rather than a rough draft.",
        ],
        tip: "Guard blocks of uninterrupted time and decline requests that pull you away from your real purpose.",
      },
      love: {
        summary:
          "You want a deep, soulful connection with someone who understands you beneath the surface. You give generously and intuitively, often sensing your partner's needs before they speak. Voicing your own needs is much harder.",
        behaviors: [
          "You remember subtle details of your partner's inner world and bring them up later.",
          "You imagine what the relationship could become and what it means.",
          "You hide your own needs to keep the peace.",
        ],
        tip: "Tell your partner plainly what you need, because they cannot read you as well as you read them.",
      },
      friendship: {
        summary:
          "You keep a small circle of deeply trusted friends, though many people feel close to you. You are a gifted listener whose advice often reframes the whole problem. Even good conversations leave you needing solitude afterward.",
        behaviors: [
          "People confide in you after knowing you only briefly.",
          "You offer a perspective that changes how a friend sees their own situation.",
          "You disappear for a while to recharge, then return fully present.",
        ],
        tip: "Let friends support you too, and share your struggles before they turn into crises.",
      },
      stress: {
        summary:
          "Stress mounts when you are overloaded with people, noise, and demands, or when your values are trampled. Your inferior Se can take over, driving you toward overindulgence or fixation on sensory details. You may also shut the door completely on someone who hurt you.",
        behaviors: [
          "You overeat, overspend, or binge-watch to quiet your mind.",
          "You fixate on a stain, a noise, or a small physical annoyance.",
          "You cut someone off abruptly after a long silence.",
        ],
        tip: "Schedule solitude and grounding activities, like cooking or a walk, before you are running on empty.",
      },
      conflict: {
        summary:
          "You avoid conflict as long as you can, working to preserve harmony and understanding. When pushed too far, your patience can snap into cold, final withdrawal. You prefer to resolve things in a thoughtful, private conversation.",
        behaviors: [
          "You rehearse a difficult conversation many times before having it.",
          "You try to understand the other person's motives before judging them.",
          "You close the door for good once you feel a line has been crossed.",
        ],
        tip: "Raise small concerns early, before quiet resentment builds to a breaking point.",
      },
      decisions: {
        summary:
          "You decide from an inner sense of where things lead, checked against how the choice will affect people. You often know the answer long before you can explain it. Practical details can get lost along the way.",
        behaviors: [
          "You wait for a feeling of inner certainty before committing.",
          "You weigh how each option will land emotionally on the people involved.",
          "You audit your intuition with a private, logical cross-check.",
        ],
        tip: "Once you have decided, list the concrete steps and resources you need so the vision survives contact with reality.",
      },
      learning: {
        summary:
          "You learn best when ideas connect to meaning, people, or a larger purpose. You absorb patterns quickly and enjoy symbolic or theoretical material. Fragmented facts without context do not stick.",
        behaviors: [
          "You link new ideas to psychology, philosophy, or human stories.",
          "You reflect quietly before you are ready to discuss.",
          "You write or journal to integrate what you have learned.",
        ],
        tip: "Balance deep reading with hands-on practice so your insights turn into skills.",
      },
      leadership: {
        summary:
          "You lead through vision and empathy, showing people why their work matters. You notice individual potential and nurture it patiently. Your challenge is holding firm boundaries and addressing conflict directly.",
        behaviors: [
          "You mentor people quietly, one conversation at a time.",
          "You articulate a mission that gives the team a reason to care.",
          "You step in early when someone is quietly struggling.",
        ],
        tip: "Make hard calls promptly, because kindness includes clarity.",
      },
    },
  },
  INFP: {
    nickname: "The Idealist",
    tagline: "Guided by quiet conviction and a vivid sense of what could be.",
    overview:
      "INFPs lead with Introverted Feeling, a deep inner compass that measures every choice against personal values and authenticity. Extraverted Intuition gives them imagination, so they see hidden potential in people, stories, and causes. They are gentle on the surface but unshakable on matters of conscience. Their challenge is turning a rich inner world into concrete, finished action.",
    strengths: [
      "Lives by deeply held personal values",
      "Empathizes with people others overlook",
      "Imagines original, creative possibilities",
      "Accepts people as they are, without judgment",
    ],
    blindSpots: [
      "Hears criticism of work as criticism of self",
      "Idealizes people, then feels let down",
      "Procrastinates on practical, unpleasant tasks",
      "Hides needs until resentment surfaces",
    ],
    situations: {
      work: {
        summary:
          "You need work that aligns with your values and leaves room for creative expression. You bring originality, empathy, and real dedication to projects you care about. Cutthroat cultures and meaningless tasks drain your motivation.",
        behaviors: [
          "You pour yourself into a project the moment it feels personally meaningful.",
          "You write or design with a voice that is unmistakably your own.",
          "You quietly resist a rule that clashes with your values.",
        ],
        tip: "Break big creative projects into small deadlines so inspiration becomes finished work.",
      },
      love: {
        summary:
          "You seek a love that feels authentic, profound, and deeply accepting. You are devoted and romantic, often expressing feelings through words, gestures, and handmade gifts. You may idealize a partner before truly knowing them.",
        behaviors: [
          "You write heartfelt letters or create gifts with personal meaning.",
          "You need time alone to understand what you feel.",
          "You feel wounded by small signs of indifference.",
        ],
        tip: "Share your hopes and hurts openly instead of waiting for your partner to guess them.",
      },
      friendship: {
        summary:
          "You are a loyal, accepting friend who values depth over breadth. You create space for friends to be fully themselves. You may need time before you open up.",
        behaviors: [
          "You remember what matters to each friend and honor it.",
          "You defend a friend fiercely when they are treated unfairly.",
          "You prefer a quiet evening for two over a big gathering.",
        ],
        tip: "Tell friends when you need space so your silence is not mistaken for distance.",
      },
      stress: {
        summary:
          "Stress builds when your values are ignored, when you face harsh criticism, or when practical chaos piles up. Your inferior Te can emerge as brutal judgment of yourself and others, or frantic, unfocused attempts to regain control. You may suddenly feel incompetent at everything.",
        behaviors: [
          "You berate yourself for not being productive enough.",
          "You say something blunt and cutting that surprises everyone, including you.",
          "You bury yourself in lists and plans that never quite start.",
        ],
        tip: "Pick one concrete task you can finish today and let that small win quiet the inner critic.",
      },
      conflict: {
        summary:
          "You avoid conflict until a core value is threatened, and then you stand firm. You may bottle up feelings and struggle to express them clearly in the moment. You look for a resolution that protects everyone's dignity.",
        behaviors: [
          "You withdraw to process your feelings before you respond.",
          "You express yourself most clearly in writing, after the fact.",
          "You refuse to budge once an ethical line is crossed.",
        ],
        tip: "Say 'I need a moment to think' instead of disappearing, so the door stays open.",
      },
      decisions: {
        summary:
          "You decide by consulting your values and asking whether a choice feels true to who you are. Your Ne explores many possibilities, which can make committing hard. Once a choice feels aligned, you are unwavering.",
        behaviors: [
          "You imagine what living out each option would feel like.",
          "You resist decisions made purely on cost or efficiency.",
          "You put off deciding until the choice feels right.",
        ],
        tip: "Pair your values check with one practical question: what will this require of me, concretely?",
      },
      learning: {
        summary:
          "You learn best through stories, meaning, and self-paced exploration. Ideas that resonate personally stay with you for years. Competitive classrooms and dry facts can shut you down.",
        behaviors: [
          "You connect new material to people and human experience.",
          "You explore a subject creatively, often through writing or art.",
          "You lose motivation when a topic feels pointless.",
        ],
        tip: "Find and write down a personal reason to care about each subject, even the dull ones.",
      },
      leadership: {
        summary:
          "You lead by example and conviction, inspiring people through authenticity and care. You empower individuals and encourage their unique contributions. Structure and tough feedback are your growth areas.",
        behaviors: [
          "You champion a cause and gather people around it.",
          "You give team members freedom to work in their own way.",
          "You postpone delivering criticism, sometimes for too long.",
        ],
        tip: "Frame hard feedback as helping someone become the person they want to be.",
      },
    },
  },
  ENFJ: {
    nickname: "The Catalyst",
    tagline: "Brings out the best in people and rallies them around a vision.",
    overview:
      "ENFJs lead with Extraverted Feeling, reading the emotional climate of a room and knowing how to bring people together. Introverted Intuition shows them where people could grow, so their warmth usually carries a purpose. They are persuasive, organized, and energized by helping others succeed. Their risk is losing themselves in everyone else's needs.",
    strengths: [
      "Inspires people toward shared goals",
      "Reads group dynamics and moods accurately",
      "Speaks with warmth, clarity, and conviction",
      "Develops others' potential through encouragement",
    ],
    blindSpots: [
      "Neglects own needs while caring for others",
      "Takes criticism of the group personally",
      "Pushes a personal vision of growth onto others",
      "Avoids cold, impersonal analysis",
    ],
    situations: {
      work: {
        summary:
          "You shine in roles that develop people, such as teaching, leading, coaching, or advocacy. You create cohesion and motivate teams toward a shared mission. Environments without human connection feel empty.",
        behaviors: [
          "You notice who has gone quiet in a meeting and draw them back in.",
          "You frame goals in terms of the people they will help.",
          "You organize the event or initiative that brings departments together.",
        ],
        tip: "Delegate some of the emotional labor, because you do not have to hold the whole team together alone.",
      },
      love: {
        summary:
          "You are a devoted partner who invests fully in the relationship and its growth. You show love through attention, encouragement, and carefully planned moments. You may need to let your partner lead sometimes.",
        behaviors: [
          "You plan gestures that prove you truly see your partner.",
          "You encourage your partner's dreams and help them take the next step.",
          "You over-function to keep the relationship harmonious.",
        ],
        tip: "Let your partner care for you too, because receiving is part of intimacy.",
      },
      friendship: {
        summary:
          "You are the friend who brings people together and remembers what matters to everyone. You are generous, encouraging, and loyal. You may take on too much responsibility for everyone's happiness.",
        behaviors: [
          "You host gatherings and make sure nobody sits alone.",
          "You check in on a friend going through a hard time without being asked.",
          "You mediate when two friends fall out.",
        ],
        tip: "Allow some friendships to be simple fun rather than one more responsibility.",
      },
      stress: {
        summary:
          "Stress mounts with disharmony, criticism, or the sense that your efforts go unappreciated. Your inferior Ti can emerge as harsh self-analysis, cold criticism, or an obsessive search for the logical explanation. You may pull away from the people you usually care for.",
        behaviors: [
          "You become uncharacteristically critical and nitpicky.",
          "You dissect what went wrong in a relationship over and over.",
          "You withdraw from the people you normally look after.",
        ],
        tip: "Take solitude without guilt, and journal to separate the feelings from the facts.",
      },
      conflict: {
        summary:
          "You try to resolve conflict quickly and restore harmony, often by mediating. You are skilled at seeing all sides but may put peace ahead of truth. When your values are challenged, you can become intense.",
        behaviors: [
          "You smooth tensions before they come to the surface.",
          "You appeal to shared values to bring people back together.",
          "You take criticism of your intentions very personally.",
        ],
        tip: "Let a disagreement breathe, since resolving it too quickly can bury the real issue.",
      },
      decisions: {
        summary:
          "You decide by weighing the impact on people alongside the long-term vision. You consult others and look for consensus. Impersonal data can end up underweighted.",
        behaviors: [
          "You ask others how they feel about each option.",
          "You picture how each choice will shape people's futures.",
          "You decide quickly when someone's wellbeing is at stake.",
        ],
        tip: "Run important decisions past someone who will argue the cold, logical case.",
      },
      learning: {
        summary:
          "You learn best through discussion, collaboration, and material with human relevance. You grasp ideas fully by teaching them. Isolated, impersonal study feels flat.",
        behaviors: [
          "You learn by explaining ideas to others.",
          "You join or start study groups and discussion circles.",
          "You connect every theory to how it could help people.",
        ],
        tip: "Test your understanding on your own before sharing it, because teaching can hide the gaps.",
      },
      leadership: {
        summary:
          "You are a natural leader who inspires loyalty and brings out the best in people. You set a values-driven vision and rally people behind it. Your challenge is making tough, unpopular decisions.",
        behaviors: [
          "You give speeches that reconnect people to the mission.",
          "You invest personally in each team member's development.",
          "You hesitate over decisions that will disappoint people.",
        ],
        tip: "Remember that a clear, fair decision serves people better than prolonged uncertainty.",
      },
    },
  },
  ENFP: {
    nickname: "The Spark",
    tagline: "Sees the spark of possibility in everyone and everything.",
    overview:
      "ENFPs lead with Extraverted Intuition, seeing possibility and connection in people, ideas, and places. Introverted Feeling anchors that curiosity in deeply personal values, so their enthusiasm is sincere rather than performed. They are warm, imaginative, and quick to champion people and causes they believe in. Their challenge is focus: turning many beginnings into a few meaningful completions.",
    strengths: [
      "Energizes people with contagious enthusiasm",
      "Sees potential others overlook in people and ideas",
      "Connects easily with very different personalities",
      "Improvises creatively when plans change",
    ],
    blindSpots: [
      "Overcommits and struggles to follow through",
      "Lets routine chores and paperwork pile up",
      "Feels criticism more deeply than they show",
      "Loses interest once the novelty fades",
    ],
    situations: {
      work: {
        summary:
          "You flourish in creative, people-centered roles with variety and freedom. You generate ideas, inspire teams, and bring energy to new initiatives. Rigid routines and detail-heavy tasks drain you.",
        behaviors: [
          "You launch a project with excitement that pulls others in.",
          "You link ideas and people across departments who would never have met.",
          "You leave tedious admin until the last possible moment.",
        ],
        tip: "Use a simple system, like one list and a weekly review, to carry projects past the exciting start.",
      },
      love: {
        summary:
          "You love passionately and imaginatively, and you want a partner who shares your curiosity and values. You show affection through enthusiasm, attention, and spontaneous adventures. Routine can feel threatening at first.",
        behaviors: [
          "You surprise your partner with an unplanned day trip.",
          "You talk for hours about dreams, ideas, and the future.",
          "You idealize the relationship in its early stages.",
        ],
        tip: "Build small rituals together, since stability can deepen passion rather than dull it.",
      },
      friendship: {
        summary:
          "You make friends everywhere and bring warmth and fun to any group. You are supportive, encouraging, and genuinely interested in people. Staying in touch with everyone is a real struggle.",
        behaviors: [
          "You hype up a friend's ideas as if they were your own.",
          "You juggle several friendship circles at once.",
          "You drop everything to help a friend in crisis.",
        ],
        tip: "Invest steadily in a few close friendships, not only in exciting new ones.",
      },
      stress: {
        summary:
          "Stress comes from routine, criticism, and too many commitments at once. Your inferior Si can surface as fixation on health worries, past mistakes, or an unusual rigidity. You may withdraw and lose your usual optimism.",
        behaviors: [
          "You search symptoms online and convince yourself something is wrong.",
          "You replay an old mistake again and again.",
          "You pull back from social life and feel stuck.",
        ],
        tip: "Cancel a commitment or two and restore sleep and meals before tackling anything else.",
      },
      conflict: {
        summary:
          "You dislike conflict but will defend your values and your people passionately. You may avoid a tough conversation, then express feelings with sudden intensity. What you want most is to resolve things and keep the connection.",
        behaviors: [
          "You express hurt with sudden emotional intensity.",
          "You look for a creative compromise that lets everyone win.",
          "You avoid a problem until it feels urgent.",
        ],
        tip: "Address small frictions early, while they are still easy to talk about.",
      },
      decisions: {
        summary:
          "You decide by exploring possibilities and checking them against your values. Too many options can make choosing difficult. You decide best when you can keep some flexibility.",
        behaviors: [
          "You generate a long list of options before narrowing down.",
          "You follow your gut about what feels right.",
          "You change your mind when a new possibility excites you.",
        ],
        tip: "Write down your two most important values for the decision and choose the option that serves both.",
      },
      learning: {
        summary:
          "You learn through exploration, conversation, and personal meaning. You pick up new concepts quickly and love connections between disciplines. Repetition and rigid structure dampen your enthusiasm.",
        behaviors: [
          "You learn by talking ideas through with others.",
          "You follow curiosity down unexpected paths.",
          "You lose steam once a topic feels familiar.",
        ],
        tip: "Set small milestones and reward yourself for finishing, not just for starting.",
      },
      leadership: {
        summary:
          "You lead by inspiration, bringing energy, vision, and warmth to a team. You encourage creativity and see people's potential. Structure and follow-through are your growth edges.",
        behaviors: [
          "You rally people around an exciting possibility.",
          "You encourage team members to pursue their passions.",
          "You find it hard to enforce deadlines.",
        ],
        tip: "Pair up with a detail-oriented deputy and agree on clear accountability.",
      },
    },
  },
} satisfies Pick<Record<TypeCode, TypeContent>, "INFJ" | "INFP" | "ENFJ" | "ENFP">;
