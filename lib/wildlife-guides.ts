export type WildlifeGuide = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  imageSrc: string;
  imagePosition?: string;
  urgentTitle: string;
  urgentCues: string[];
  firstSteps: string[];
  doNot: string[];
  details: string[];
  callout: string;
};

export const wildlifeGuides: WildlifeGuide[] = [
  {
    slug: "baby-squirrel",
    eyebrow: "Baby squirrel",
    title: "Found a baby squirrel?",
    summary:
      "Baby squirrels often fall after storms, tree work, or nest damage. The safest next step depends on injuries, warmth, location, and whether the mother can return.",
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
    eyebrow: "Baby rabbit",
    title: "Found baby rabbits?",
    summary:
      "Cottontail nests are shallow and easy to miss. A nest can look unattended even when the mother is returning at dawn and dusk.",
    imageSrc: "/assets/squirrel-7.jpg",
    imagePosition: "center 42%",
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
    eyebrow: "Baby bird",
    title: "Found a baby bird?",
    summary:
      "Some young birds are supposed to be on the ground while they learn to fly. Others need help because they are injured, cold, bare-skinned, or out of the nest too early.",
    imageSrc: "/assets/squirrel-4.jpg",
    imagePosition: "center",
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
    slug: "injured-adult",
    eyebrow: "Injured adult wildlife",
    title: "Found injured adult wildlife?",
    summary:
      "Adult wildlife can injure people when scared, even when they look weak. The best first step is distance, safety, photos, and a call to qualified help.",
    imageSrc: "/assets/matt-and-squirrel.jpg",
    imagePosition: "center",
    urgentTitle: "Call for help if",
    urgentCues: [
      "The animal is bleeding, trapped, limping, dragging limbs, or unable to stand",
      "The animal was caught by a cat, dog, fence, trap, or netting",
      "The animal is in a roadway, building, chimney, or other unsafe place",
      "The animal is acting disoriented, circling, or unusually approachable"
    ],
    firstSteps: [
      "Do not attempt to capture adult wildlife unless instructed by a qualified person.",
      "Keep people and pets away and reduce noise around the animal.",
      "Take photos or video from a safe distance.",
      "Share location, species if known, visible injuries, and current danger."
    ],
    doNot: [
      "Do not grab, corner, chase, or throw a towel over adult wildlife without guidance.",
      "Do not feed, medicate, or offer water.",
      "Do not transport wildlife in your vehicle unless a qualified contact tells you how to do it safely."
    ],
    details: [
      "Species or best description",
      "Exact location and whether people, pets, or traffic are nearby",
      "What happened before you found the animal",
      "Photos or video from a safe distance"
    ],
    callout:
      "Safety matters for both you and the animal. Adult wildlife should be handled only with proper training, equipment, and legal authority."
  },
  {
    slug: "vehicle-strike",
    eyebrow: "Vehicle strike",
    title: "Wildlife hit by a vehicle?",
    summary:
      "Vehicle strikes can involve hidden injuries, traffic danger, and babies nearby. Stay safe first, then share exact location and visible details.",
    imageSrc: "/assets/opossum.jpg",
    imagePosition: "center 62%",
    urgentTitle: "Act quickly if",
    urgentCues: [
      "The animal is alive, in pain, or in the roadway",
      "There may be babies nearby or attached to an adult",
      "Traffic makes it unsafe for a person to approach",
      "The animal is large, defensive, or difficult to contain"
    ],
    firstSteps: [
      "Do not step into traffic or block a roadway.",
      "Call local emergency services or animal control when people or traffic are at risk.",
      "Note the exact road, nearest cross street, lane, and direction of travel.",
      "Send photos only if you can take them from a safe place."
    ],
    doNot: [
      "Do not put yourself in traffic to move an animal.",
      "Do not assume an animal is dead without qualified help if there are signs of breathing or movement.",
      "Do not handle injured wildlife without gloves, equipment, and guidance."
    ],
    details: [
      "Road name, cross streets, mile marker, or landmark",
      "Whether the animal is alive, moving, or in the roadway",
      "Species or best description",
      "Whether babies are visible nearby"
    ],
    callout:
      "Your safety comes first. A precise location can be the most helpful thing you provide when the animal is near traffic."
  },
  {
    slug: "tree-work-nest",
    eyebrow: "Tree work or nest disturbed",
    title: "Did tree work disturb a nest or den?",
    summary:
      "Tree trimming, removals, landscaping, and storm cleanup can expose nests or dens. Pausing work and getting guidance can prevent avoidable harm.",
    imageSrc: "/assets/squirrel-6.jpg",
    imagePosition: "center",
    urgentTitle: "Pause and ask for help if",
    urgentCues: [
      "Babies fell from a tree, branch, nest, or cavity",
      "A nest or den was cut, moved, crushed, or exposed",
      "Adult animals are circling, calling, or trying to return",
      "Work cannot continue without moving babies or blocking parents"
    ],
    firstSteps: [
      "Stop work in the immediate area if it is safe to do so.",
      "Keep equipment, pets, and foot traffic away from the babies or nest area.",
      "Take photos of the animal, nest or den, tree, and surrounding work site.",
      "Share timing, species if known, and whether adult animals are nearby."
    ],
    doNot: [
      "Do not keep cutting or hauling material that may contain a nest or den.",
      "Do not relocate babies to a random tree, box, or yard without guidance.",
      "Do not feed, water, or warm animals with improvised methods."
    ],
    details: [
      "Type of work being done and when the nest or den was found",
      "Photos of the nest, cavity, branch, or den entrance",
      "Whether adults are nearby",
      "How many babies or animals are visible"
    ],
    callout:
      "A short pause can make the difference between reunification, safe transfer, or further injury. Companies can also join the Wildlife Compassionate Companies program to prepare crews before these moments happen."
  }
];

export function getWildlifeGuide(slug: string) {
  return wildlifeGuides.find((guide) => guide.slug === slug);
}
