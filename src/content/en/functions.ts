import type { SiteContent } from "@/content/schema";

export const functions = {
  Ni: {
    name: "Introverted Intuition",
    short: "Sees where things are heading.",
    description:
      "Introverted Intuition works beneath the surface, compressing scattered impressions into a single insight about what something means or where it is going. It rarely shows its work: answers arrive as a sudden certainty, an image, or a sense that the pieces have clicked. Where other perceiving functions widen the field, Ni narrows it, discarding possibilities until one vision remains. It is the function of foresight, strategy, and reading patterns that unfold slowly over time.",
    asDominant:
      "Dominant Ni gives a steady inner compass and a habit of thinking several moves ahead. These people often sense the ending before others have noticed the plot, and they can struggle to explain how they got there.",
    asInferior:
      "When Ni is inferior, as it is for Se-dominant types, stress turns it into dark forecasting where one bad sign becomes proof that everything is doomed. The usually present-focused person may suddenly hunt for hidden meanings or feel haunted by a future they cannot see.",
    keywords: ["Foresight", "Insight", "Convergence", "Vision"],
  },
  Ne: {
    name: "Extraverted Intuition",
    short: "Spots possibilities everywhere.",
    description:
      "Extraverted Intuition scans the outer world for what could be, linking ideas, people, and patterns that seem unrelated. It thinks by branching: one thought sparks five more, and each of those sparks five again. Ne loves the first draft, the brainstorm, and the question that reframes everything. It keeps options open because closing them too early feels like losing something.",
    asDominant:
      "Dominant Ne makes a person an idea engine who lights up at novelty and gets restless with repetition. They see the potential in people and projects early, though starting often excites them more than finishing.",
    asInferior:
      "When Ne is inferior, as it is for Si-dominant types, stress unleashes a flood of worst-case scenarios. Normally grounded people imagine every way a plan could fail and lose faith in the routines that usually steady them.",
    keywords: ["Possibility", "Connection", "Brainstorm", "Curiosity"],
  },
  Si: {
    name: "Introverted Sensing",
    short: "Remembers what works, and how it felt.",
    description:
      "Introverted Sensing builds a rich inner archive of experience: how things were done, how they felt, and what reliably holds up. It compares the present against that record and notices small changes others overlook. Si also tracks the body closely, registering fatigue, comfort, and habit with fine detail. It is the function of continuity, careful maintenance, and trust earned over time.",
    asDominant:
      "Dominant Si produces people who are dependable, precise, and loyal to methods and traditions they have tested themselves. Their vivid memory of past experience lets them keep people and systems steady when others improvise.",
    asInferior:
      "When Si is inferior, as it is for Ne-dominant types, stress shows up as sudden fixation on bodily symptoms, old mistakes, or tasks left undone. The usually restless explorer withdraws and clings rigidly to a narrow routine.",
    keywords: ["Memory", "Detail", "Continuity", "Reliability"],
  },
  Se: {
    name: "Extraverted Sensing",
    short: "Lives fully in the present moment.",
    description:
      "Extraverted Sensing takes in the physical world directly and in real time: texture, movement, color, and opportunity. It reacts fast, reading a room or a situation before others have finished thinking about it. Se prefers to act and adjust rather than plan in the abstract, and it enjoys making a visible impact. It is the function of presence, aesthetic sense, and seizing the moment.",
    asDominant:
      "Dominant Se makes people vivid, adaptable, and acutely aware of their surroundings, often skilled with their hands or bodies. They thrive in action and can turn a crisis into an opening on the spot.",
    asInferior:
      "When Se is inferior, as it is for Ni-dominant types, stress pushes it out as sensory overindulgence such as overeating, binge-watching, impulsive spending, or frantic cleaning. It can also appear as sharp irritation at noise, clutter, or physical discomfort.",
    keywords: ["Presence", "Action", "Aesthetics", "Adaptability"],
  },
  Ti: {
    name: "Introverted Thinking",
    short: "Builds precise inner logic.",
    description:
      "Introverted Thinking constructs an internal framework of principles and tests every claim against it. It asks whether something is true and consistent, not whether it is useful or popular. Ti takes ideas apart, names things exactly, and notices contradictions the moment they appear. It is the function of analysis, precision, and understanding how things really work.",
    asDominant:
      "Dominant Ti creates people who need to understand something from first principles before they accept it. They are independent thinkers and gifted troubleshooters, though their standard of accuracy can make them slow to commit.",
    asInferior:
      "When Ti is inferior, as it is for Fe-dominant types, stress brings out harsh, uncharacteristic criticism and a cold, nitpicking tone. They may fixate on proving a point with logic and feel foolish when the argument does not hold.",
    keywords: ["Logic", "Precision", "Analysis", "Consistency"],
  },
  Te: {
    name: "Extraverted Thinking",
    short: "Organizes the world to get results.",
    description:
      "Extraverted Thinking arranges the outside world by measurable criteria: what works, what is efficient, and what the evidence shows. It sets goals, breaks them into steps, assigns resources, and tracks outcomes. Te trusts verifiable data and clear structures over private hunches. It is the function of execution, accountability, and decisive action.",
    asDominant:
      "Dominant Te produces natural organizers who see inefficiency and move to fix it immediately. They are direct, productive, and comfortable making hard calls, though they can run over feelings in the name of progress.",
    asInferior:
      "When Te is inferior, as it is for Fi-dominant types, stress surfaces as harsh judgment of their own competence and bursts of frantic, unfocused activity. They may criticize others bluntly or try to fix everything at once with lists and ultimatums.",
    keywords: ["Efficiency", "Structure", "Results", "Evidence"],
  },
  Fi: {
    name: "Introverted Feeling",
    short: "Knows what matters, deep down.",
    description:
      "Introverted Feeling weighs every choice against a private core of values and asks whether it is true to who one is. It feels intensely but often quietly, sensing authenticity or its absence in people and decisions. Fi resists outside pressure to conform and defends what it cares about with surprising firmness. It is the function of integrity, personal conviction, and empathy grounded in lived resonance.",
    asDominant:
      "Dominant Fi creates people with a strong inner identity and an unmistakable moral center. They are often gentle on the surface and immovable on the things they believe matter.",
    asInferior:
      "When Fi is inferior, as it is for Te-dominant types, stress brings sudden hurt feelings and a sense of being unappreciated or misunderstood. The usually composed person may become touchy, tearful, or convinced that no one truly values them.",
    keywords: ["Values", "Authenticity", "Conviction", "Individuality"],
  },
  Fe: {
    name: "Extraverted Feeling",
    short: "Tunes into the emotions of the group.",
    description:
      "Extraverted Feeling reads and responds to the emotional climate between people. It notices who is uncomfortable, what the room needs, and which words will bring people together. Fe works through shared values, social norms, and open expressions of warmth. It is the function of harmony, hospitality, and influence through connection.",
    asDominant:
      "Dominant Fe produces people who instinctively look after the mood and relationships of the group. They are warm, persuasive, and attentive, though they can lose track of their own needs while tending everyone else's.",
    asInferior:
      "When Fe is inferior, as it is for Ti-dominant types, stress brings emotional outbursts or a sudden, painful conviction of being disliked or excluded. The normally detached analyst becomes hypersensitive to how others react.",
    keywords: ["Harmony", "Empathy", "Rapport", "Hospitality"],
  },
} satisfies SiteContent["functions"];
