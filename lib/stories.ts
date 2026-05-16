export type Story = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  imageSrc: string;
  imagePosition?: string;
  intro: string;
  sections: Array<{
    title: string;
    text: string;
  }>;
  impact: string[];
};

export const stories: Story[] = [
  {
    slug: "formula-that-lets-rehabbers-say-yes",
    category: "Impact",
    title: "The formula that lets rehabbers say yes",
    summary: "Baby season can turn one small supply need into a daily expense. Donor support helps keep qualified care possible.",
    imageSrc: "/assets/squirrel-2.jpg",
    imagePosition: "center 48%",
    intro:
      "A baby animal can need round-the-clock care long before it is strong enough for an outdoor enclosure or release plan. Formula, feeding tools, bedding, heat support, and cleaning supplies disappear quickly during baby season.",
    sections: [
      {
        title: "The need",
        text: "Independent rehabbers often pay for supplies before anyone sees the work. A single intake may need specialized food, safe housing, and weeks of steady care."
      },
      {
        title: "How support helps",
        text: "A predictable fund can help cover formula, syringes, bedding, cleaning supplies, and transport so rehabbers are not choosing between saying yes and absorbing every cost alone."
      },
      {
        title: "What donors make possible",
        text: "When supplies are ready before the call comes in, the first hours are calmer for the finder, the rehabber, and the animal."
      }
    ],
    impact: [
      "Formula and feeding supplies",
      "Heat, bedding, and cleaning materials",
      "Transport between finder, rehabber, and veterinary support",
      "Better records for future donor updates"
    ]
  },
  {
    slug: "compassionate-tree-care-before-the-cut",
    category: "Partners",
    title: "Compassionate tree care starts before the first cut",
    summary: "Tree crews can prevent harm by spotting nests, pausing work, and knowing who to contact before babies are displaced.",
    imageSrc: "/assets/squirrel-6.jpg",
    imagePosition: "center",
    intro:
      "Many wildlife emergencies begin during ordinary outdoor work: trimming branches, removing trees, clearing storm damage, or opening a cavity that was being used as a den.",
    sections: [
      {
        title: "The moment that matters",
        text: "A trained crew does not need to become a wildlife expert. They need to recognize warning signs, pause when something is wrong, and contact qualified help quickly."
      },
      {
        title: "What preparation changes",
        text: "A simple stop-work plan can protect employees, prevent unsafe handling, and give parents or qualified caregivers a better chance to respond."
      },
      {
        title: "Why public recognition helps",
        text: "When customers see a company taking wildlife seriously, prevention becomes part of the value of responsible outdoor work."
      }
    ],
    impact: [
      "Fewer preventable nest and den disruptions",
      "Clearer steps for crews in the field",
      "Better photos and location details for rehabbers",
      "Public recognition for wildlife-aware companies"
    ]
  },
  {
    slug: "reuniting-is-rescue",
    category: "Education",
    title: "Reuniting is rescue when it is done right",
    summary: "Some young animals are safest when people protect the area, step back, and let a parent return.",
    imageSrc: "/assets/opossum.jpg",
    imagePosition: "center 62%",
    intro:
      "Not every young animal on the ground is abandoned. Sometimes the most compassionate action is protecting the area, gathering careful details, and getting guidance before intervening.",
    sections: [
      {
        title: "The common mistake",
        text: "Well-meaning people may scoop up babies because they cannot see a parent nearby. For some species, parents visit quietly and briefly, often when people are not watching."
      },
      {
        title: "The better first step",
        text: "Photos, location, age clues, visible injuries, pet contact, and weather conditions help a qualified person decide whether reunification is possible."
      },
      {
        title: "Why education matters",
        text: "Clear public guidance keeps healthy young animals with their parents when appropriate and helps injured or displaced animals reach care sooner."
      }
    ],
    impact: [
      "Fewer healthy animals removed unnecessarily",
      "Faster help for animals that truly need intervention",
      "Calmer decisions during stressful moments",
      "Public education that supports rehabbers instead of overwhelming them"
    ]
  }
];

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}
