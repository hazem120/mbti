import type { SiteContent } from "@/content/schema";

export const situations = {
  work: {
    title: "At work",
    description: "How you contribute, what drains you, and the conditions where your best work happens.",
  },
  love: {
    title: "In love",
    description: "What you need from a partner, how you show care, and where intimacy gets hard.",
  },
  friendship: {
    title: "In friendship",
    description: "How you build trust, what kind of friend you are, and what friends may need from you.",
  },
  stress: {
    title: "Under stress",
    description: "What pushes you off balance and how your least developed function takes the wheel.",
  },
  conflict: {
    title: "In conflict",
    description: "How you handle disagreement, what escalates it, and what helps you repair it.",
  },
  decisions: {
    title: "Making decisions",
    description: "What you weigh first when you choose, and what you are most likely to miss.",
  },
  learning: {
    title: "Learning",
    description: "How new knowledge sticks for you and which settings help or hinder it.",
  },
  leadership: {
    title: "Leading others",
    description: "How you guide people, the leader you naturally become, and your growth edge.",
  },
} satisfies SiteContent["situations"];

export const temperaments = {
  NT: {
    name: "Rationalists",
    description:
      "Rationalists want to understand how systems work and how to make them work better. They trust logic over authority and measure ideas by whether they hold up under pressure.",
  },
  NF: {
    name: "Empaths",
    description:
      "Empaths search for meaning and authenticity in people and ideas. They read emotional undercurrents, champion growth, and want their lives to express what they believe.",
  },
  SJ: {
    name: "Stewards",
    description:
      "Stewards keep things running: they honor commitments, protect what works, and build the stability others lean on. Follow-through and attention to detail are how they show care.",
  },
  SP: {
    name: "Adventurers",
    description:
      "Adventurers live in the present, read situations fast, and act with practical skill. They value freedom, hands-on mastery, and experiences that feel fully alive.",
  },
} satisfies SiteContent["temperaments"];

export const relationGroups = {
  complementary: {
    name: "Complementary",
    description: "Each of you supplies something the other lacks, so the relationship tends to feel supportive and energizing.",
  },
  similar: {
    name: "Similar",
    description: "You share key functions, which brings quick understanding but fewer fresh perspectives.",
  },
  asymmetric: {
    name: "Asymmetric",
    description: "Influence or help flows more strongly in one direction, so the two of you experience the relationship differently.",
  },
  challenging: {
    name: "Challenging",
    description: "Your strengths and theirs pull against each other, so closeness takes patience and deliberate effort.",
  },
} satisfies SiteContent["relationGroups"];
