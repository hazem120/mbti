import type { TypeCode } from "@/data";
import type { TypeContent } from "@/content/schema";

export const sjTypes = {
  ISTJ: {
    nickname: "The Keeper",
    tagline: "Keeps promises, remembers details, and makes systems dependable.",
    overview:
      "ISTJs lead with Introverted Sensing, drawing on a detailed memory of what has worked and what has failed. Extraverted Thinking organizes that experience into procedures, schedules, and clear responsibilities. They take commitments seriously and follow through without needing applause. Beneath their reserve lies a firm personal code that they rarely compromise.",
    strengths: [
      "Follows through on every commitment made",
      "Catches errors and inconsistencies others miss",
      "Builds reliable systems and routines",
      "Stays steady and composed in a crisis",
    ],
    blindSpots: [
      "Resists untested ideas and sudden change",
      "Expresses appreciation too rarely",
      "Holds others to rigid, unspoken standards",
      "Spirals into worst-case futures when routines break",
    ],
    situations: {
      work: {
        summary:
          "You excel in roles that reward precision, reliability, and accountability. You create order, document how things are done, and make sure nothing falls through the cracks. Vague instructions and last-minute changes frustrate you.",
        behaviors: [
          "You double-check figures before anything leaves your desk.",
          "You keep careful records and pull up last year's numbers when a question comes up.",
          "You deliver on time without needing a single reminder.",
        ],
        tip: "Before rejecting a new method, run a small trial, since evidence from your own test is what earns your trust.",
      },
      love: {
        summary:
          "You express love through loyalty, consistency, and practical care. You want a partner who is honest and dependable, and you treat commitment as a promise. Emotional expression takes time and trust.",
        behaviors: [
          "You remember important dates and prepare for them well in advance.",
          "You fix and maintain things around the home without being asked.",
          "You show feelings through what you do far more than through what you say.",
        ],
        tip: "Tell your partner what you appreciate about them in words, not only in deeds.",
      },
      friendship: {
        summary:
          "You are the steady friend who shows up when it matters. You prefer long-standing friendships built on shared history and trust. You may not initiate often, but you are always there when called.",
        behaviors: [
          "You help friends move house, fix a car, or sort out paperwork.",
          "You keep traditions alive, like the same reunion every year.",
          "You give honest, practical advice rather than empty reassurance.",
        ],
        tip: "Share a little more of what is going on with you, because friends want to support you too.",
      },
      stress: {
        summary:
          "Stress builds with chaos, broken commitments, or unfamiliar demands with no clear process. Your inferior Ne can erupt as catastrophic what-if thinking, imagining every way things could go wrong. You may become rigid and irritable, or uncharacteristically scattered.",
        behaviors: [
          "You picture one worst-case outcome after another.",
          "You cling more tightly to routines and rules.",
          "You make an impulsive choice that surprises everyone around you.",
        ],
        tip: "Write your worries down, then list what you actually know, because facts calm a runaway imagination.",
      },
      conflict: {
        summary:
          "You approach conflict by focusing on facts, rules, and what was agreed. You are calm and fair but can come across as inflexible. You would rather solve the problem than talk about feelings.",
        behaviors: [
          "You point back to what was agreed and to how it was handled before.",
          "You stay matter-of-fact while voices around you rise.",
          "You withdraw when the conversation turns emotional.",
        ],
        tip: "Acknowledge the other person's feelings before you cite the facts.",
      },
      decisions: {
        summary:
          "You decide by comparing options with past experience and proven methods. Your Te weighs efficiency and cost, while your Fi makes sure the choice fits your principles. You avoid unnecessary risk.",
        behaviors: [
          "You research thoroughly before deciding.",
          "You lean on what has worked before.",
          "You stick with a decision once it is made.",
        ],
        tip: "Now and then, ask what would happen if you tried something new, and give the answer real consideration.",
      },
      learning: {
        summary:
          "You learn best through structured, step-by-step instruction and practical application. You value accuracy and thoroughness. Vague theories without application frustrate you.",
        behaviors: [
          "You take detailed, organized notes and keep them for years.",
          "You practice a skill until it becomes automatic.",
          "You ask for a concrete example when an explanation stays abstract.",
        ],
        tip: "Stretch yourself with an occasional open-ended project where there is no single right answer.",
      },
      leadership: {
        summary:
          "You lead through reliability, fairness, and clear expectations. You set standards and hold everyone, including yourself, accountable to them. Flexibility and recognition are your growth areas.",
        behaviors: [
          "You write down procedures so everyone knows what is expected.",
          "You lead by example and work as hard as anyone on the team.",
          "You reward steady, dependable work over flashy results.",
        ],
        tip: "Invite your team's new ideas and thank people publicly when they contribute.",
      },
    },
  },
  ISFJ: {
    nickname: "The Guardian",
    tagline: "Remembers what you need and quietly makes sure you have it.",
    overview:
      "ISFJs lead with Introverted Sensing, holding a rich memory of people, routines, and the small details that make life run well. Extraverted Feeling points that memory toward others, so they notice who takes sugar in their tea and who had a hard week. They are loyal, conscientious, and far more capable than their modesty suggests. Their challenge is saying no and letting their own needs count.",
    strengths: [
      "Remembers the personal details that matter to people",
      "Provides practical care exactly when it is needed",
      "Brings patience and thoroughness to every task",
      "Creates stability and comfort for those around them",
    ],
    blindSpots: [
      "Says yes when they mean no",
      "Carries hurt silently for too long",
      "Resists change even when it is overdue",
      "Undervalues their own contributions",
    ],
    situations: {
      work: {
        summary:
          "You excel in roles where careful, caring work makes a real difference to people. You are the colleague who keeps track of what everyone needs and makes sure it happens. Unrecognized effort and cold, impersonal cultures wear you down.",
        behaviors: [
          "You remember a client's preferences from a conversation months ago.",
          "You quietly pick up tasks that others have dropped.",
          "You follow established procedures carefully and notice when they are skipped.",
        ],
        tip: "Keep a simple record of what you have accomplished so your contributions are visible at review time.",
      },
      love: {
        summary:
          "You love through attentive, practical care, remembering what your partner likes and making their life easier. You want stability, loyalty, and a partner who notices your efforts. You may put their needs ahead of your own for too long.",
        behaviors: [
          "You remember your partner's favorite meal and have it ready after a hard day.",
          "You create comforting routines and traditions for the two of you.",
          "You hide your own frustration to avoid upsetting anyone.",
        ],
        tip: "Ask for what you need directly, because your partner cannot repay care they do not know you want.",
      },
      friendship: {
        summary:
          "You are a loyal friend who remembers birthdays, favorite foods, and the name of everyone's dog. You show up with soup when a friend is sick and help without being asked. You keep friends for decades.",
        behaviors: [
          "You send a card or message on exactly the right day.",
          "You bring practical help, like a meal or a ride, during hard times.",
          "You stay in touch with friends from school and old workplaces.",
        ],
        tip: "Let friends take care of you sometimes, since accepting help strengthens friendship too.",
      },
      stress: {
        summary:
          "Stress builds when you are overloaded, taken for granted, or forced into sudden change. Your inferior Ne can surface as anxious, runaway speculation about everything that might go wrong. You may also become uncharacteristically resentful or rigid.",
        behaviors: [
          "You imagine disasters befalling the people you love.",
          "You become more controlling about routines and household order.",
          "You finally voice resentment you have held for months.",
        ],
        tip: "Say no to one request this week, and notice that the relationship survives it.",
      },
      conflict: {
        summary:
          "You avoid open conflict and try hard to keep the peace. You may absorb hurt quietly until it builds up and spills out. You want the relationship repaired more than the argument won.",
        behaviors: [
          "You accommodate others to avoid a confrontation.",
          "You recall past slights in vivid detail once you finally speak.",
          "You smooth things over with a kind gesture rather than a conversation.",
        ],
        tip: "Raise a concern while it is still small, using a calm 'I noticed' rather than waiting until you are hurt.",
      },
      decisions: {
        summary:
          "You decide by drawing on experience and weighing how each choice will affect the people you care about. Your Si wants proven options, while your Fe checks for harmony. New or risky choices can make you anxious.",
        behaviors: [
          "You consider how a decision will affect everyone in your life.",
          "You favor options that have worked well before.",
          "You ask trusted people for their opinion before committing.",
        ],
        tip: "Include your own needs as a real factor in every decision, not as an afterthought.",
      },
      learning: {
        summary:
          "You learn best through clear, step-by-step instruction with practical examples. You are thorough and diligent, remembering details long after others forget. Chaotic, unstructured settings make learning harder.",
        behaviors: [
          "You follow instructions carefully and practice until you get it right.",
          "You connect new material to real people you know.",
          "You prefer a patient teacher who explains the reasons behind each step.",
        ],
        tip: "Give yourself permission to experiment and make mistakes while learning something new.",
      },
      leadership: {
        summary:
          "You lead through service, reliability, and genuine care for each person on your team. You create a supportive environment where people feel noticed. Asserting authority and confronting problems are your growth edges.",
        behaviors: [
          "You remember each team member's circumstances and adjust support to fit.",
          "You model diligence and quiet reliability.",
          "You struggle to confront someone who is underperforming.",
        ],
        tip: "Treat direct feedback as a form of care, because people cannot improve on what they never hear.",
      },
    },
  },
  ESTJ: {
    nickname: "The Organizer",
    tagline: "Turns chaos into order and makes sure the job gets done right.",
    overview:
      "ESTJs lead with Extraverted Thinking, organizing people and processes around clear goals and measurable results. Introverted Sensing grounds that drive in experience, so their plans rely on methods that have already proven themselves. They are direct, decisive, and dependable, and they expect the same from others. Beneath the efficiency sits a strong sense of duty and loyalty to their people.",
    strengths: [
      "Organizes people and tasks with clear accountability",
      "Makes practical decisions quickly and firmly",
      "Delivers reliably on commitments and deadlines",
      "Says plainly what is expected",
    ],
    blindSpots: [
      "Dismisses unconventional ideas too quickly",
      "Overlooks the emotional side of decisions",
      "Pushes their way as the only right way",
      "Hides hurt behind busyness and control",
    ],
    situations: {
      work: {
        summary:
          "You thrive where there are clear goals, defined roles, and room to run things efficiently. You create structure, enforce standards, and make sure deadlines are met. Disorganization, slackness, and endless discussion frustrate you.",
        behaviors: [
          "You arrive with an agenda and end every meeting with action items.",
          "You track deadlines and follow up the moment one slips.",
          "You take over a disorganized project and restore order within days.",
        ],
        tip: "Ask for input before finalizing a process, because people execute plans better when they helped shape them.",
      },
      love: {
        summary:
          "You bring loyalty, reliability, and practical commitment to relationships. You show love by providing, planning, and keeping promises. Talking about feelings can feel less natural than taking action.",
        behaviors: [
          "You plan the household budget and future with care.",
          "You handle problems for your partner before they ask.",
          "You struggle to find words for your deeper feelings.",
        ],
        tip: "Ask your partner how they feel, and listen without fixing anything.",
      },
      friendship: {
        summary:
          "You are a dependable friend who organizes the reunion and remembers who owes whom a favor. You enjoy traditions, shared activities, and friends who are straightforward. You are loyal but can be bossy.",
        behaviors: [
          "You organize regular gatherings and keep traditions going.",
          "You give practical, no-nonsense advice.",
          "You show up to help with moving, repairs, and logistics.",
        ],
        tip: "Let someone else plan the next get-together, and simply enjoy it.",
      },
      stress: {
        summary:
          "Stress hits when things spiral out of control, rules are ignored, or your competence is questioned. Your inferior Fi can surface as sudden hurt, feeling unappreciated, or emotional outbursts you do not recognize in yourself. You may also tighten control over everything.",
        behaviors: [
          "You feel deeply unappreciated after everything you have done.",
          "You micromanage details you would normally delegate.",
          "You have an emotional reaction that seems out of proportion.",
        ],
        tip: "Admit to someone you trust that you are hurting, since naming the feeling takes away much of its force.",
      },
      conflict: {
        summary:
          "You address conflict directly and aim to settle it with facts and fairness. You can come across as blunt or domineering when you are sure you are right. You respect people who push back with evidence.",
        behaviors: [
          "You state the problem plainly and propose a solution.",
          "You refer to rules, agreements, and precedent.",
          "You move on quickly once a resolution is reached.",
        ],
        tip: "Ask the other person how they see the situation before you present your solution.",
      },
      decisions: {
        summary:
          "You decide quickly by applying logic, experience, and established standards. You prefer proven methods and clear criteria. New and untested options can get dismissed too fast.",
        behaviors: [
          "You compare options against what has worked before.",
          "You set clear criteria and apply them consistently.",
          "You commit firmly and expect others to follow through.",
        ],
        tip: "Before dismissing an unfamiliar option, ask what would have to be true for it to work.",
      },
      learning: {
        summary:
          "You learn best from structured, practical material that you can apply right away. You value clear objectives, expert instruction, and measurable progress. Abstract theory without application feels like a waste of time.",
        behaviors: [
          "You want to know exactly how a lesson will be useful.",
          "You follow a study plan with discipline.",
          "You apply new skills immediately at work or home.",
        ],
        tip: "Spend a little time on ideas that are not immediately useful, because they may solve tomorrow's problems.",
      },
      leadership: {
        summary:
          "You are a natural administrator who sets clear expectations and holds people accountable. You create order, reward reliability, and keep the team on track. Flexibility and emotional attunement are your growth areas.",
        behaviors: [
          "You define roles, responsibilities, and deadlines clearly.",
          "You address underperformance promptly and directly.",
          "You lead from the front and model hard work.",
        ],
        tip: "Recognize personal effort as well as results, because people work harder for a leader who sees them.",
      },
    },
  },
  ESFJ: {
    nickname: "The Host",
    tagline: "Makes everyone feel welcome and keeps the community together.",
    overview:
      "ESFJs lead with Extraverted Feeling, tuning into how everyone around them is doing and working to make them comfortable. Introverted Sensing gives them a strong memory for traditions, personal details, and what has kept people happy before. They are warm, organized, and generous, often the center of family and social life. Their challenge is separating their own worth from other people's approval.",
    strengths: [
      "Makes people feel welcome and cared for",
      "Organizes events and communities with warmth",
      "Remembers personal details and honors traditions",
      "Offers generous, practical support in hard times",
    ],
    blindSpots: [
      "Seeks approval and fears disappointing people",
      "Reads disagreement as rejection",
      "Imposes their own idea of what is proper",
      "Overextends and neglects their own needs",
    ],
    situations: {
      work: {
        summary:
          "You thrive in cooperative environments where you can help people and see the difference it makes. You build team spirit, keep communication flowing, and make sure nobody is left out. Conflict-ridden or coldly impersonal workplaces leave you drained.",
        behaviors: [
          "You remember colleagues' birthdays and organize the celebration.",
          "You make sure a new hire has lunch company on their first day.",
          "You keep a project moving with friendly, persistent follow-up.",
        ],
        tip: "When feedback stings, ask what specifically would improve the work, and treat the answer as information rather than a verdict.",
      },
      love: {
        summary:
          "You are a warm, devoted partner who shows love through attentiveness and acts of service. You value commitment, shared rituals, and a life built together. You need appreciation expressed openly, not assumed.",
        behaviors: [
          "You plan anniversaries and holidays with great care and detail.",
          "You look after your partner's comfort before your own.",
          "You feel quietly hurt when your efforts go unnoticed.",
        ],
        tip: "Tell your partner directly how you like to be appreciated instead of hoping they will guess.",
      },
      friendship: {
        summary:
          "You are the friend who hosts the dinners, remembers everyone's news, and keeps the group connected. You are generous with time and attention. You may feel hurt when that generosity is not returned.",
        behaviors: [
          "You host gatherings and make everyone feel at home.",
          "You check in regularly on friends who have gone quiet.",
          "You organize meals and rides when someone in the group is struggling.",
        ],
        tip: "Invest most in friends who give back as much as you give, and let the other friendships be lighter.",
      },
      stress: {
        summary:
          "Stress builds with conflict, criticism, or the sense that your care is being taken for granted. Your inferior Ti can surface as harsh, uncharacteristic criticism or an obsessive search for the logical reason things went wrong. You may also pull away from the people you usually look after.",
        behaviors: [
          "You dissect a single critical comment for days.",
          "You make a cutting remark you regret almost immediately.",
          "You skip social plans and feel strangely lost without them.",
        ],
        tip: "Step back from caretaking for a day and do something that is only for you.",
      },
      conflict: {
        summary:
          "You work to prevent conflict and restore harmony quickly when it breaks out. Disagreement can feel like a threat to the relationship itself, so you may take it personally. You want everyone to feel okay again as soon as possible.",
        behaviors: [
          "You rush to smooth things over before the issue is fully aired.",
          "You look for others who share your view to feel reassured.",
          "You hear criticism of your methods as criticism of your care.",
        ],
        tip: "Separate the issue from the relationship, because you can disagree with someone and still be close.",
      },
      decisions: {
        summary:
          "You decide by considering how each choice affects the people involved and what has worked in the past. You consult others and value consensus. Detached analysis can feel cold, so you may skip it.",
        behaviors: [
          "You ask the people affected for their opinion before deciding.",
          "You weigh how each option will affect relationships and group harmony.",
          "You favor familiar choices that have kept people happy before.",
        ],
        tip: "Add one purely logical question to every big decision: what does the evidence actually say?",
      },
      learning: {
        summary:
          "You learn best in supportive, structured settings with clear expectations and practical relevance. Studying with others keeps you motivated. Harsh or cutthroat teaching styles discourage you.",
        behaviors: [
          "You learn by discussing material in a friendly group.",
          "You follow clear instructions diligently and completely.",
          "You remember lessons best when they help someone you know.",
        ],
        tip: "Ask why a method works, not only how to apply it, to deepen what you know.",
      },
      leadership: {
        summary:
          "You lead by building a warm, cohesive team where people feel valued. You organize well and make sure everyone's needs are met. Making unpopular decisions is your growth edge.",
        behaviors: [
          "You celebrate team milestones and individual contributions publicly.",
          "You build a personal relationship with each team member.",
          "You delay decisions that you know will upset someone.",
        ],
        tip: "Remember that a fair, clear decision protects harmony better than avoiding the decision.",
      },
    },
  },
} satisfies Pick<Record<TypeCode, TypeContent>, "ISTJ" | "ISFJ" | "ESTJ" | "ESFJ">;
