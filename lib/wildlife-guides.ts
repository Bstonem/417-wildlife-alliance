export type WildlifeGuideVisual =
  | { type: "photo"; src: string; position?: string }
  | { type: "icon"; icon: "squirrel" | "rabbit" | "opossum" | "bird" | "fox" | "deer" | "reptile" };

export type WildlifeGuide = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  visual: WildlifeGuideVisual;
  imageSrc: string;
  imagePosition?: string;
  urgentTitle: string;
  urgentCues: string[];
  firstSteps: string[];
  doNot: string[];
  details: string[];
  callout: string;
};

export type SituationalGuide = {
  slug: string;
  icon: "injured-adult" | "vehicle-strike" | "tree-work";
  eyebrow: string;
  title: string;
  summary: string;
  cues: string[];
};

export const wildlifeGuides: WildlifeGuide[] = [
  {
    slug: "baby-squirrel",
    eyebrow: "Squirrel",
    title: "Found a squirrel?",
    summary:
      "Baby squirrels often fall after storms, tree work, or nest damage. The safest next step depends on injuries, warmth, location, and whether the mother can return.",
    visual: { type: "photo", src: "/assets/squirrel-8.jpg", position: "46% 44%" },
    imageSrc: "/assets/squirrel-2.jpg",
    imagePosition: "center 48%",
    urgentTitle: "Contact help quickly if you see",
    urgentCues: [
      "Bleeding, swelling, puncture wounds, or fly eggs",
      "A known cat, dog, vehicle, or mower interaction",
      "Coldness, weakness, labored breathing, or repeated crying",
      "Tree work, a destroyed nest, or no sign of the mother returning"
    ],
    firstSteps: [
      "Keep pets and children away and watch from a quiet distance.",
      "Take clear photos from above and from the side without handling more than necessary.",
      "If the baby is in a dangerous spot, contact a licensed rehabilitator or local authority before moving it.",
      "Share the exact location, nearby tree or nest information, and what happened before you found it."
    ],
    doNot: [
      "Do not feed formula, milk, water, nuts, or fruit.",
      "Do not bathe or medicate the squirrel.",
      "Do not assume a quiet baby is healthy or safe to keep overnight."
    ],
    details: [
      "Approximate size and whether the eyes are open",
      "Whether there are visible injuries or insects",
      "Whether the baby feels cold, weak, or alert",
      "Photos of the baby and the place where it was found"
    ],
    callout:
      "Reuniting may be possible in some situations, but injuries, cat contact, coldness, or nest destruction can change the safest plan. Get qualified guidance before attempting anything."
  },
  {
    slug: "baby-rabbit",
    eyebrow: "Rabbit",
    title: "Found a rabbit?",
    summary:
      "Cottontail nests are shallow and easy to miss. A nest can look unattended even when the mother is returning at dawn and dusk.",
    visual: { type: "photo", src: "/assets/rabbit.jpg", position: "58% 38%" },
    imageSrc: "/assets/rabbit.jpg",
    imagePosition: "58% 38%",
    urgentTitle: "Get guidance if",
    urgentCues: [
      "The babies are visibly injured, bleeding, cold, or covered in insects",
      "A cat, dog, mower, or construction equipment disturbed the nest",
      "The nest has been destroyed and the babies cannot be safely returned to it",
      "The babies are scattered, crying, or exposed to weather or predators"
    ],
    firstSteps: [
      "Keep pets away and avoid hovering over the nest.",
      "If the nest is intact, leave the babies covered with the original nesting material.",
      "Mark the area gently so people do not step on it or mow over it.",
      "Send photos and location details if you are unsure whether intervention is needed."
    ],
    doNot: [
      "Do not feed milk, formula, vegetables, or water.",
      "Do not remove healthy babies just because the mother is not visible.",
      "Do not keep baby rabbits in a box while waiting to see what happens."
    ],
    details: [
      "Whether the nest is intact or disturbed",
      "Whether pets had access to the babies",
      "Photos of the nest area and each baby if safe",
      "Any lawn work, digging, or equipment that may have exposed the nest"
    ],
    callout:
      "Healthy baby rabbits are often best left where their mother can find them. The biggest help is usually protecting the nest from people, pets, and equipment while you confirm whether care is needed."
  },
  {
    slug: "opossum",
    eyebrow: "Opossum",
    title: "Found an opossum?",
    summary:
      "Opossums may need help after vehicle strikes, pet interactions, or when small babies are found alone. Distance and clear photos help responders decide what is safe.",
    visual: { type: "photo", src: "/assets/opossum-circle.jpg", position: "center" },
    imageSrc: "/assets/opossum.jpg",
    imagePosition: "center 62%",
    urgentTitle: "Treat it as urgent if",
    urgentCues: [
      "The opossum was hit by a vehicle or attacked by a pet",
      "There are babies near or on an injured adult",
      "The animal is dragging limbs, bleeding, or unable to move normally",
      "A small baby is found alone and is not attached to an adult"
    ],
    firstSteps: [
      "Keep people and pets away from the animal.",
      "Do not touch the mouth, pouch, or babies without qualified guidance.",
      "If the animal is near traffic, call the appropriate local authority for help with safety.",
      "Share photos, location, and whether babies are visible."
    ],
    doNot: [
      "Do not feed or offer water.",
      "Do not handle an adult opossum bare-handed.",
      "Do not remove babies from an adult unless a qualified person instructs you."
    ],
    details: [
      "Exact location and whether the animal is near traffic",
      "Whether babies are visible nearby or on the adult",
      "Known vehicle, dog, or cat contact",
      "Photos showing posture, injuries, and surroundings"
    ],
    callout:
      "Opossums can look still or stunned when they are frightened or injured. Give space, document what you can see, and ask for qualified guidance before intervening."
  },
  {
    slug: "baby-bird",
    eyebrow: "Bird",
    title: "Found a bird?",
    summary:
      "Some young birds are supposed to be on the ground while they learn to fly. Others need help because they are injured, cold, bare-skinned, or out of the nest too early.",
    visual: { type: "photo", src: "/assets/crow.jpg", position: "58% 25%" },
    imageSrc: "/assets/crow.jpg",
    imagePosition: "58% 25%",
    urgentTitle: "Contact help if",
    urgentCues: [
      "The bird is bleeding, weak, cold, or has a drooping wing",
      "A cat or dog had contact with the bird",
      "The bird is bare-skinned or only lightly feathered and the nest cannot be found",
      "The bird is in a dangerous place and cannot move away"
    ],
    firstSteps: [
      "Keep pets indoors and give the bird space.",
      "Look for a nearby nest or parent birds if you can do so safely.",
      "Take photos that show feathering, size, and location.",
      "Share whether the bird is hopping, perching, calling, or unable to move."
    ],
    doNot: [
      "Do not feed bread, seed, milk, water, or insects.",
      "Do not force the beak open.",
      "Do not keep the bird in a busy, noisy room."
    ],
    details: [
      "Whether the bird is feathered or mostly bare",
      "Whether parent birds are nearby",
      "Any cat, dog, window, or vehicle contact",
      "Photos of the bird and the area where it was found"
    ],
    callout:
      "A fully feathered fledgling may not need rescue. The safest choice depends on age, injuries, predators, and whether the parents are still caring for it."
  },
  {
    slug: "skunk",
    eyebrow: "Skunk",
    title: "Found a skunk?",
    summary:
      "Skunks are usually shy and only spray when they feel threatened. Give space, and get guidance quickly if one seems sick, injured, or is out unusually during the day.",
    visual: { type: "photo", src: "/assets/donate-banner.jpg", position: "100% 56%" },
    imageSrc: "/assets/donate-banner.jpg",
    imagePosition: "72% 78%",
    urgentTitle: "Contact help if",
    urgentCues: [
      "The skunk is out and active during full daylight, which can signal illness",
      "It appears disoriented, wobbly, or is circling repeatedly",
      "There is a known dog or cat interaction, or a visible injury",
      "Babies are seen moving alone without an adult nearby"
    ],
    firstSteps: [
      "Keep people and pets at a distance and stay calm and quiet.",
      "Do not corner the skunk or block its escape route.",
      "Take photos from a safe distance if you can do so without approaching.",
      "Share the exact location and what the skunk is doing."
    ],
    doNot: [
      "Do not approach, corner, or make sudden movements near a skunk.",
      "Do not attempt to catch or contain it yourself.",
      "Do not let pets investigate or engage with the skunk."
    ],
    details: [
      "Time of day and how the skunk is behaving",
      "Whether it appears injured, disoriented, or unusually tame",
      "Any pet or vehicle contact",
      "Exact location and photos from a safe distance"
    ],
    callout:
      "Distance is the best protection for you, your pets, and the skunk. A licensed contact can help you tell normal behavior from a sign that something is wrong."
  },
  {
    slug: "fox",
    eyebrow: "Fox",
    title: "Found a fox?",
    summary:
      "Foxes are naturally cautious around people. One that looks thin, is limping, or approaches people closely may need help rather than just be curious.",
    visual: { type: "photo", src: "/assets/fox.jpg", position: "53% 25%" },
    imageSrc: "/assets/fox.jpg",
    imagePosition: "53% 25%",
    urgentTitle: "Contact help if",
    urgentCues: [
      "The fox is limping, dragging a limb, or has visible wounds or hair loss",
      "It approaches people or pets instead of avoiding them",
      "It appears thin, weak, or is circling or stumbling",
      "There is a known vehicle strike or entanglement in a fence or trap"
    ],
    firstSteps: [
      "Keep people and pets back and give the fox a clear path to leave.",
      "Do not attempt to feed, herd, or corner the animal.",
      "Take photos or video from a safe distance if possible.",
      "Share behavior details, location, and any visible injuries."
    ],
    doNot: [
      "Do not approach or try to touch an adult fox.",
      "Do not feed a fox to try to help it.",
      "Do not assume unusual tameness is a good sign; it can mean illness."
    ],
    details: [
      "How the fox is behaving and moving",
      "Any visible injuries, hair loss, or thinness",
      "Whether pets or people were approached",
      "Exact location and time observed"
    ],
    callout:
      "A fox that seems unusually calm around people is often a sign something is wrong, not a friendly encounter. Qualified guidance helps keep everyone safe."
  },
  {
    slug: "deer",
    eyebrow: "Deer",
    title: "Found a deer?",
    summary:
      "A fawn lying alone and still is often exactly where its mother left it. Adult deer that are injured or trapped need distance and qualified help, not direct assistance.",
    visual: { type: "photo", src: "/assets/deer-circle.jpg", position: "center" },
    imageSrc: "/assets/deer-hero.jpg",
    imagePosition: "center 35%",
    urgentTitle: "Contact help if",
    urgentCues: [
      "A fawn is crying persistently, wandering, or clearly injured",
      "An adult deer is down, tangled in fencing, or unable to stand",
      "There has been a known vehicle strike",
      "The deer is in an unsafe spot such as a roadway or a fenced yard with no way out"
    ],
    firstSteps: [
      "Leave a quiet, still fawn where it is; the mother is likely nearby.",
      "Keep people and pets away and avoid repeated visits to check on it.",
      "For an injured or trapped adult, keep distance and contact qualified help.",
      "Share the exact location, behavior, and any visible injuries."
    ],
    doNot: [
      "Do not pick up, move, or try to rescue a healthy-looking fawn.",
      "Do not offer food or water.",
      "Do not attempt to free a tangled or trapped adult deer yourself."
    ],
    details: [
      "Whether it is a fawn alone or an adult, and its behavior",
      "Any visible injury, entanglement, or vehicle contact",
      "Exact location and whether it is near traffic",
      "How long it has been observed in the same spot"
    ],
    callout:
      "Most fawns found alone do not need help. Give space, watch from a distance, and reach out if something looks clearly wrong rather than acting right away."
  },
  {
    slug: "raccoon",
    eyebrow: "Raccoon",
    title: "Found a raccoon?",
    summary:
      "Young raccoons may be found after a den disturbance, while adults active during the day or acting strangely may need urgent attention.",
    visual: { type: "photo", src: "/assets/raccoon-2.jpg", position: "65% 55%" },
    imageSrc: "/assets/raccoon-2.jpg",
    imagePosition: "65% 68%",
    urgentTitle: "Contact help if",
    urgentCues: [
      "The raccoon is active and disoriented during full daylight",
      "It is stumbling, circling, or seems unaware of its surroundings",
      "There are visible wounds or an inability to move normally",
      "There is a known cat, dog, or vehicle interaction"
    ],
    firstSteps: [
      "Keep people and pets away and reduce noise around the animal.",
      "Do not attempt to touch, feed, or corner the raccoon.",
      "Take photos or video from a safe distance if you can.",
      "Share behavior, location, and whether babies are nearby."
    ],
    doNot: [
      "Do not handle a raccoon, even a baby, without gloves and guidance.",
      "Do not feed or offer water.",
      "Do not assume daytime activity alone means something is wrong; get guidance to be sure."
    ],
    details: [
      "Age (baby or adult) and behavior observed",
      "Any visible injuries or disorientation",
      "Whether babies are nearby without an adult",
      "Exact location and photos from a safe distance"
    ],
    callout:
      "Raccoons can carry diseases that make hands-on help risky without training. Distance and a call to a licensed contact keep both you and the animal safer."
  },
  {
    slug: "reptile",
    eyebrow: "Reptile",
    title: "Found a reptile?",
    summary:
      "Turtles, snakes, and lizards are often just passing through. Most native reptiles are harmless and can be left alone unless they are injured or in a dangerous spot.",
    visual: { type: "photo", src: "/assets/box-turtle.jpg", position: "50% 38%" },
    imageSrc: "/assets/box-turtle.jpg",
    imagePosition: "50% 38%",
    urgentTitle: "Contact help if",
    urgentCues: [
      "The animal has a cracked or damaged shell, or a visible wound",
      "It is in a roadway, parking lot, or other dangerous location",
      "There has been a known vehicle strike or pet interaction",
      "It appears weak, lethargic, or unable to move normally"
    ],
    firstSteps: [
      "Leave healthy reptiles alone; most are simply moving between habitats.",
      "If a turtle is crossing a road safely, only move it in the direction it was already heading and only if you can do so safely.",
      "Take photos from a safe distance, especially for snakes, rather than approaching closely.",
      "Share the species if known, location, and any visible injuries."
    ],
    doNot: [
      "Do not pick up or handle a snake you cannot positively identify as harmless.",
      "Do not relocate a turtle far from where it was found.",
      "Do not offer food or water."
    ],
    details: [
      "Species or best description, including size and color patterns",
      "Whether it is injured, in the roadway, or in a safe spot",
      "Any known vehicle or pet contact",
      "Exact location and photos from a safe distance"
    ],
    callout:
      "Most native reptiles found in the 417 area are harmless and better off left in place. Qualified guidance helps you tell a normal encounter from one that needs help."
  }
];

export const situationalGuides: SituationalGuide[] = [
  {
    slug: "injured-adult",
    icon: "injured-adult",
    eyebrow: "Injured adult wildlife",
    title: "Found as an injured adult?",
    summary:
      "Adult wildlife can injure people when scared, even when they look weak. The best first step is distance, safety, photos, and a call to qualified help.",
    cues: [
      "Do not attempt to capture adult wildlife unless instructed by a qualified person.",
      "Do not grab, corner, chase, or throw a towel over it without guidance.",
      "Take photos or video from a safe distance and share location, species, and visible injuries."
    ]
  },
  {
    slug: "vehicle-strike",
    icon: "vehicle-strike",
    eyebrow: "Vehicle strike",
    title: "Hit by a vehicle?",
    summary:
      "Vehicle strikes can involve hidden injuries, traffic danger, and babies nearby. Stay safe first, then share exact location and visible details.",
    cues: [
      "Do not step into traffic or block a roadway to reach the animal.",
      "Call local emergency services or animal control when people or traffic are at risk.",
      "Note the exact road, nearest cross street, and direction of travel."
    ]
  },
  {
    slug: "tree-work-nest",
    icon: "tree-work",
    eyebrow: "Tree work or nest disturbed",
    title: "Did tree work disturb a nest or den?",
    summary:
      "Tree trimming, removals, landscaping, and storm cleanup can expose nests or dens. Pausing work and getting guidance can prevent avoidable harm.",
    cues: [
      "Stop work in the immediate area if it is safe to do so.",
      "Keep equipment, pets, and foot traffic away from the babies or nest area.",
      "Do not relocate babies to a random tree, box, or yard without guidance."
    ]
  }
];

export function getWildlifeGuide(slug: string) {
  return wildlifeGuides.find((guide) => guide.slug === slug);
}
