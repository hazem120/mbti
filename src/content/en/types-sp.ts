import type { TypeCode } from "@/data";
import type { TypeContent } from "@/content/schema";

export const spTypes = {
  ISTP: {
    nickname: "The Tinkerer",
    tagline: "Figures out how things work by taking them apart, calmly.",
    overview:
      "ISTPs lead with Introverted Thinking, building a precise understanding of how things work and why they fail. Extraverted Sensing keeps that logic grounded in the physical world, so they learn with their hands and react fast when something breaks. They are cool in a crisis, economical with words, and allergic to rules that make no sense. Freedom to solve real problems their own way is what keeps them engaged.",
    strengths: [
      "Troubleshoots mechanical and technical problems fast",
      "Stays cool and effective in emergencies",
      "Learns physical skills quickly by doing",
      "Cuts through noise to the practical fix",
    ],
    blindSpots: [
      "Withdraws instead of explaining their feelings",
      "Loses interest once a problem is solved",
      "Bristles at rules and long-term commitments",
      "Misreads the emotional temperature of a group",
    ],
    situations: {
      work: {
        summary:
          "You do your best work on hands-on, concrete problems with room to improvise. You diagnose what is wrong, fix it efficiently, and move on. Bureaucracy, idle chatter, and meetings about meetings drain your patience.",
        behaviors: [
          "You take a malfunctioning system apart to find the real fault.",
          "You stay silent in meetings until there is a practical problem to solve.",
          "You skip the manual and figure it out by trying.",
        ],
        tip: "Write a brief note on how you fixed something, so your expertise is visible and others can build on it.",
      },
      love: {
        summary:
          "You show love through actions, loyalty, and shared experiences rather than big declarations. You need a partner who respects your independence and does not crowd you. Feelings run deeper than you let on, and putting them into words is hard.",
        behaviors: [
          "You fix things for your partner without mentioning it.",
          "You plan a shared activity, like a hike or a road trip, instead of a long talk.",
          "You go quiet when a conversation becomes emotionally intense.",
        ],
        tip: "Say one thing each week that you appreciate about your partner, out loud.",
      },
      friendship: {
        summary:
          "You bond through shared activities, humor, and mutual respect for space. You are loyal to a few friends and relaxed about how often you meet. Drama and emotional intensity push you away.",
        behaviors: [
          "You invite friends to build, ride, play, or explore together.",
          "You offer help with a practical problem rather than a pep talk.",
          "You disappear for a while, then reappear as if no time passed.",
        ],
        tip: "Check in on a friend going through a hard time, even if you do not know what to say.",
      },
      stress: {
        summary:
          "Stress builds when you are micromanaged, confined, or surrounded by emotional demands. Your inferior Fe can erupt as sudden emotional outbursts or a painful conviction that people do not like you. You may withdraw completely or act impulsively to escape.",
        behaviors: [
          "You explode emotionally in a way that surprises even you.",
          "You become hypersensitive to what people think of you.",
          "You take off on a solo drive or activity to escape.",
        ],
        tip: "Tell someone you trust how you feel before the pressure builds into an outburst.",
      },
      conflict: {
        summary:
          "You approach conflict logically and would rather solve the problem than discuss feelings. You may avoid confrontation by withdrawing or keep it brief and blunt. You respect directness.",
        behaviors: [
          "You state the issue briefly and without embellishment.",
          "You walk away from emotionally charged arguments.",
          "You fix the underlying problem rather than talking about it.",
        ],
        tip: "Acknowledge the other person's feelings in a sentence before you move to the fix.",
      },
      decisions: {
        summary:
          "You decide by analyzing the practical facts in front of you and what will work right now. You trust your logic and your read of the situation. Long-term plans and emotional factors can get less weight.",
        behaviors: [
          "You gather hands-on information before deciding.",
          "You decide quickly in a crisis and adjust as you go.",
          "You avoid committing to plans far in advance.",
        ],
        tip: "For big choices, consider where each option leads in five years, not just how it works today.",
      },
      learning: {
        summary:
          "You learn best by doing, experimenting, and taking things apart. You want to understand the mechanics, not just the theory. Lectures and rote memorization lose you quickly.",
        behaviors: [
          "You learn a tool by using it, not by reading about it.",
          "You ask how something works at the mechanical level.",
          "You drop a subject once you have mastered its practical use.",
        ],
        tip: "Pair hands-on practice with a bit of theory so your skills transfer to new problems.",
      },
      leadership: {
        summary:
          "You lead by competence and example, stepping in when there is a real problem to solve. You give people autonomy and dislike micromanaging. Communicating vision and giving feedback are your growth areas.",
        behaviors: [
          "You demonstrate the fix rather than describing it.",
          "You give team members space to work their way.",
          "You say little until a problem requires action.",
        ],
        tip: "Explain your reasoning and the bigger goal, so your team can act without waiting for you.",
      },
    },
  },
  ISFP: {
    nickname: "The Artisan",
    tagline: "Expresses a deep inner world through beauty, craft, and quiet kindness.",
    overview:
      "ISFPs lead with Introverted Feeling, guided by a deeply personal sense of what is beautiful, right, and true to themselves. Extraverted Sensing pours that inner world into the present moment through art, craft, style, or simply how they care for people. They are gentle, observant, and fiercely independent about their values. They rarely announce their convictions, but they live them.",
    strengths: [
      "Expresses values through art, craft, or style",
      "Notices sensory beauty others walk past",
      "Offers gentle, nonjudgmental acceptance",
      "Adapts calmly to the moment",
    ],
    blindSpots: [
      "Avoids conflict and planning until too late",
      "Takes criticism deeply to heart",
      "Hides talents out of modesty",
      "Drifts without long-term direction",
    ],
    situations: {
      work: {
        summary:
          "You thrive where you can work with your hands or senses on something that reflects your values. You bring craftsmanship, aesthetic sense, and quiet dedication. Rigid rules, harsh criticism, and competitive cultures drain you.",
        behaviors: [
          "You refine the look or feel of a project until it feels right.",
          "You work quietly and let the finished work speak.",
          "You resist tasks that conflict with your values.",
        ],
        tip: "Share your work earlier than feels comfortable, since feedback in the middle is gentler than feedback at the end.",
      },
      love: {
        summary:
          "You love tenderly and through action, creating beautiful moments and caring for your partner in thoughtful, sensory ways. You need a partner who accepts you as you are and does not try to reshape you. Your deepest feelings often stay unspoken, even when they run strongest.",
        behaviors: [
          "You cook a favorite meal, make a playlist, or plan a quiet outing to say what words cannot.",
          "You notice a shift in your partner's mood from their posture before they say anything.",
          "You retreat into silence when you feel judged, even gently.",
        ],
        tip: "Put your feelings into words now and then, because your partner may miss the quieter signals.",
      },
      friendship: {
        summary:
          "You are a warm, accepting friend who enjoys shared experiences and easy, unhurried company. You rarely judge, and you support friends in small, thoughtful ways they remember for years. You need time alone to recharge between gatherings.",
        behaviors: [
          "You invite a friend to a gallery, a hike, or a slow dinner rather than a loud party.",
          "You give gifts you made or chose with unusual care.",
          "You listen to a friend's problem without rushing to advise.",
        ],
        tip: "Reach out to friends you miss rather than waiting for them to call first.",
      },
      stress: {
        summary:
          "Stress builds under criticism, pressure to perform on someone else's terms, or conflict with your values. Your inferior Te can surface as harsh self-judgment, sudden bluntness, or frantic attempts to organize everything at once. You may feel incompetent in a way that has little to do with the facts.",
        behaviors: [
          "You condemn yourself for not being productive or successful enough.",
          "You snap at someone with a bluntness that is unlike you.",
          "You draw up a rigid schedule and abandon it the next day.",
        ],
        tip: "Spend an hour on something sensory and creative before trying to fix the practical problems.",
      },
      conflict: {
        summary:
          "You avoid open conflict and prefer to let tension settle on its own. When one of your values is crossed, though, you dig in with a firmness that surprises people. You are more likely to withdraw than to argue.",
        behaviors: [
          "You leave the room when voices start to rise.",
          "You hold your position silently and do not budge.",
          "You show disagreement by what you quietly stop doing.",
        ],
        tip: "Say what bothers you calmly and early, before it hardens into a silent standoff.",
      },
      decisions: {
        summary:
          "You decide by what feels right to you and what fits the moment you are in. Your Fi checks the values, your Se checks the reality in front of you, and a quiet Ni hunch sometimes settles the matter. Long-range planning can feel like a cage.",
        behaviors: [
          "You trust a gut sense of whether an option is true to you.",
          "You keep your options open until the last responsible moment.",
          "You imagine the texture of daily life under each choice.",
        ],
        tip: "Sketch a rough plan for big decisions so your future self still has room to move.",
      },
      learning: {
        summary:
          "You learn best by doing, sensing, and working at your own pace. Material that feels personally meaningful or beautiful sticks with you. Competitive, lecture-heavy classrooms discourage you.",
        behaviors: [
          "You learn a craft by practicing it until your hands know it.",
          "You absorb the most in calm, patient settings.",
          "You tune out abstract material that has no personal relevance.",
        ],
        tip: "Tie each new subject to something you care about, and practice it physically whenever possible.",
      },
      leadership: {
        summary:
          "You lead quietly, by example and by honoring each person's individuality. You create an accepting space where people feel free to work in their own style. Setting firm direction and giving hard feedback are your growth edges.",
        behaviors: [
          "You let each team member approach the work in their own way.",
          "You model the standard you want rather than lecturing about it.",
          "You put off addressing a problem in hopes it will resolve itself.",
        ],
        tip: "Set clear goals for the team, because freedom works best when everyone shares a direction.",
      },
    },
  },
  ESTP: {
    nickname: "The Maverick",
    tagline: "Reads the room fast, acts faster, and thrives when the stakes are high.",
    overview:
      "ESTPs lead with Extraverted Sensing, taking in everything happening around them and reacting in real time. Introverted Thinking gives them a sharp, practical logic for sizing up a situation and finding the angle that works. Tertiary Fe makes them surprisingly good at reading an audience, which is why they persuade, negotiate, and entertain so easily. Long-range planning and quiet reflection come less naturally, because the moment in front of them always feels more real.",
    strengths: [
      "Reacts quickly and decisively in a crisis",
      "Reads people and situations in real time",
      "Negotiates and persuades with easy confidence",
      "Turns obstacles into openings on the spot",
    ],
    blindSpots: [
      "Acts before weighing long-term consequences",
      "Gets bored by routine and follow-through",
      "Takes risks mainly for the thrill",
      "Waves off feelings as overthinking",
    ],
    situations: {
      work: {
        summary:
          "You thrive in fast-moving, high-stakes environments where quick thinking pays off immediately. You are a natural troubleshooter, negotiator, and closer. Slow approvals, abstract theory, and paperwork frustrate you.",
        behaviors: [
          "You handle the crisis while others are still debating what to do.",
          "You read a client's body language and adjust your pitch mid-sentence.",
          "You skip the planning meeting and start testing the idea for real.",
        ],
        tip: "Spend ten minutes on second-order consequences before any big move, and write them down.",
      },
      love: {
        summary:
          "You bring excitement, spontaneity, and strong physical presence to relationships. You show love by making things happen and turning ordinary days into adventures. Long, serious conversations about feelings can make you want to change the subject.",
        behaviors: [
          "You book the last-minute trip and tell your partner to pack.",
          "You show affection through touch and shared activity more than words.",
          "You deflect a heavy talk with a joke or a plan to go out.",
        ],
        tip: "Stay in a serious conversation a few minutes longer than feels comfortable; that is where trust is built.",
      },
      friendship: {
        summary:
          "You are the friend who turns a quiet evening into a story people retell for years. You are generous, loyal in action, and quick to back your friends in a tight spot. You may drift when a friendship asks for emotional depth rather than shared fun.",
        behaviors: [
          "You text the group at eight and have everyone out by nine.",
          "You step in forcefully when a friend is being pushed around.",
          "You keep things light when a friend wants to talk about something painful.",
        ],
        tip: "Ask a friend one deeper question this week and let the silence sit while they answer.",
      },
      stress: {
        summary:
          "Stress builds with inactivity, confinement, or long stretches of abstract planning. Your inferior Ni can surface as dark premonitions, suspicion about people's hidden motives, or a sudden fixation on what everything means. The usually confident improviser can feel lost about the future.",
        behaviors: [
          "You become convinced something bad is about to happen, without knowing what.",
          "You read hidden agendas into ordinary comments.",
          "You chase more and more intense stimulation to escape the unease.",
        ],
        tip: "Burn off the tension physically first, then talk your worries through with someone who is calm and grounded.",
      },
      conflict: {
        summary:
          "You handle conflict directly and quickly, preferring to deal with it now and move on. You can be blunt, competitive, and occasionally provocative just to see how people react. You rarely hold grudges once the air is clear.",
        behaviors: [
          "You call out the issue on the spot, in front of whoever is there.",
          "You use charm or humor to defuse tension once you have made your point.",
          "You treat an argument as finished the moment you have moved on.",
        ],
        tip: "Before you move on, check that the other person feels resolved too, not just you.",
      },
      decisions: {
        summary:
          "You decide fast by reading the situation and trusting your practical logic. You are comfortable with risk and prefer to adjust as things unfold rather than plan every step. Consequences that play out over years are the ones you most often miss.",
        behaviors: [
          "You make the call based on what is actually in front of you.",
          "You change tactics the moment a plan stops working.",
          "You take a calculated risk that others are too cautious to try.",
        ],
        tip: "For major decisions, sleep on it once and picture where the choice leaves you a year from now.",
      },
      learning: {
        summary:
          "You learn by doing, competing, and putting knowledge to use immediately. You pick up practical skills remarkably fast. Long lectures and theory for its own sake lose your attention within minutes.",
        behaviors: [
          "You learn fastest when real stakes are on the line.",
          "You turn practice into a challenge or a friendly competition.",
          "You jump straight to application and skip the introductory chapters.",
        ],
        tip: "Invest a little time in the underlying theory, because it makes your instincts sharper and more reliable.",
      },
      leadership: {
        summary:
          "You lead from the front, taking decisive action and energizing people when things get tense. You are persuasive and at your best in a turnaround or a crisis. Sustaining long projects and building patient systems are your growth edges.",
        behaviors: [
          "You rally the team with energy and humor when morale dips.",
          "You make confident calls without waiting for perfect information.",
          "You lose interest once the crisis becomes routine maintenance.",
        ],
        tip: "Hand long-term planning to a strategic partner, and put a recurring check-in on your calendar to stay involved.",
      },
    },
  },
  ESFP: {
    nickname: "The Showstopper",
    tagline: "Brings the energy, lights up the room, and makes life feel like a celebration.",
    overview:
      "ESFPs lead with Extraverted Sensing, fully present in the moment and alive to people, color, music, and experience. Introverted Feeling gives that energy a warm heart, so their generosity comes from genuine care rather than performance. Tertiary Te lends them a practical streak that surprises people, especially when a friend needs real help fast. Planning far ahead and sitting with difficult emotions are their growth edges.",
    strengths: [
      "Brings joy and energy into any room",
      "Senses what people need in the moment",
      "Adapts easily when plans suddenly change",
      "Offers generous, hands-on help without hesitation",
    ],
    blindSpots: [
      "Postpones long-term planning and uncomfortable truths",
      "Seeks stimulation to escape painful feelings",
      "Hears critique of performance as personal rejection",
      "Overspends time, energy, or money",
    ],
    situations: {
      work: {
        summary:
          "You thrive in lively, people-centered roles with variety and hands-on work. You bring warmth, practical skill, and an instinct for what will make an experience memorable. Isolated, repetitive, or purely theoretical work drains you fast.",
        behaviors: [
          "You turn a dull team event into something people actually enjoy.",
          "You win over difficult customers with warmth and quick thinking.",
          "You leave paperwork until someone chases you for it.",
        ],
        tip: "Batch routine tasks into one short daily block so they never pile up into a crisis.",
      },
      love: {
        summary:
          "You love generously and playfully, showing affection through experiences, gifts, and physical warmth. You want a partner who enjoys life alongside you and appreciates your spontaneity. Heavy conversations and prolonged tension feel draining.",
        behaviors: [
          "You plan surprise dates that engage every sense.",
          "You say and show your affection openly, in public and private.",
          "You steer away from a difficult conversation toward something fun.",
        ],
        tip: "Make room for serious talks too, because facing hard things together is what deepens a bond.",
      },
      friendship: {
        summary:
          "You are the friend who makes every outing memorable and every newcomer feel included. You notice what makes each person happy and deliver it without fuss. Friends in a long, heavy season may need more patience than you naturally offer.",
        behaviors: [
          "You drag a lonely friend out of the house and make sure they laugh.",
          "You remember each friend's favorite song, drink, or restaurant.",
          "You try to cheer someone up before they are ready to feel better.",
        ],
        tip: "Sometimes sit with a friend's sadness without trying to fix or brighten it.",
      },
      stress: {
        summary:
          "Stress builds with boredom, isolation, or pressure to plan far into the future. Your inferior Ni can surface as bleak visions of what lies ahead or a sense that small events carry ominous meaning. Your natural optimism can disappear almost overnight.",
        behaviors: [
          "You feel trapped by a future that suddenly looks empty.",
          "You read dark significance into a minor setback.",
          "You cancel plans and withdraw from the fun you usually crave.",
        ],
        tip: "Call a friend and do something physical to anchor yourself back in the present.",
      },
      conflict: {
        summary:
          "You dislike conflict and try to keep things light for as long as possible. When you are hurt, though, you react quickly and visibly. What you want most is for everyone to feel good about each other again.",
        behaviors: [
          "You try to lighten a tense mood with a joke.",
          "You show hurt openly and in the moment.",
          "You bounce back quickly once the air is cleared.",
        ],
        tip: "Stay with an issue until it is truly settled, even when changing the subject is tempting.",
      },
      decisions: {
        summary:
          "You decide based on your values and what feels right in the moment. You trust your senses and respond to what is directly in front of you. Consequences that unfold slowly, such as money and long commitments, can slip past you.",
        behaviors: [
          "You say yes to an opportunity before you have checked the calendar.",
          "You picture how a choice will feel in your body and your day.",
          "You avoid long deliberation because it drains the joy out of choosing.",
        ],
        tip: "Before a big commitment, ask a practical friend to walk through the numbers with you.",
      },
      learning: {
        summary:
          "You learn best by doing, interacting, and experiencing things firsthand. Practical skills come quickly, especially when other people are involved. Dry lectures and abstract theory lose you within minutes.",
        behaviors: [
          "You remember a lesson by the experience you had while learning it.",
          "You study best with a partner or group to keep energy up.",
          "You drift off when material has no visible connection to real life.",
        ],
        tip: "Turn study into something active and social, like teaching a friend or role-playing the material.",
      },
      leadership: {
        summary:
          "You lead with warmth and enthusiasm, creating a team where people genuinely enjoy working together. You notice individual contributions and celebrate them. Structure, long-range planning, and delivering bad news are your growth edges.",
        behaviors: [
          "You lift morale with energy and personal attention.",
          "You celebrate wins publicly, big and small.",
          "You delay delivering hard news until it cannot wait.",
        ],
        tip: "Pair with a steady planner so your team's energy turns into results that last.",
      },
    },
  },
} satisfies Pick<Record<TypeCode, TypeContent>, "ISTP" | "ISFP" | "ESTP" | "ESFP">;
