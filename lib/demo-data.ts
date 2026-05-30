import {
  Building2,
  BarChart3,
  CircleHelp,
  ClipboardList,
  DollarSign,
  FileHeart,
  HeartHandshake,
  Inbox,
  MapPinned,
  Newspaper,
  PackageOpen,
  ShieldCheck,
  Sprout,
  TreePine,
  Users,
  Waypoints
} from "lucide-react";

export const navItems = [
  { href: "/found-animal", label: "Found an animal" },
  { href: "/directory", label: "Rehab directory" },
  { href: "/donate", label: "Donate" },
  { href: "/rehabbers", label: "Rehabbers" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" }
];

export const allianceMapNodes = [
  {
    key: "who",
    title: "Who we are",
    eyebrow: "Local people",
    text: "Meet the people working to make wildlife help easier to find in southwest Missouri.",
    href: "/about",
    icon: Users,
    tone: "blue"
  },
  {
    key: "help",
    title: "How you can help",
    eyebrow: "Give time or funds",
    text: "Choose a practical way to support rehabbers, volunteers, education, and community response.",
    href: "/help",
    icon: HeartHandshake,
    tone: "clay"
  },
  {
    key: "directory",
    title: "Directory of rehabbers",
    eyebrow: "Find care",
    text: "Find nearby licensed or permitted help based on species, location, and availability.",
    href: "/directory",
    icon: MapPinned,
    tone: "green"
  },
  {
    key: "companies",
    title: "Wildlife compassionate companies",
    eyebrow: "Safer work sites",
    text: "Education and recognition for businesses that want to prevent wildlife displacement.",
    href: "/certified-companies",
    icon: TreePine,
    tone: "blue"
  },
  {
    key: "found",
    title: "So you found an animal",
    eyebrow: "First calm steps",
    text: "Start here for calm, careful next steps when wildlife may be injured, orphaned, or displaced.",
    href: "/found-animal",
    icon: FileHeart,
    tone: "clay"
  },
  {
    key: "stories",
    title: "Success stories",
    eyebrow: "Impact updates",
    text: "See how donor support, rehabber skill, and community action change outcomes for animals.",
    href: "/stories",
    icon: Newspaper,
    tone: "green"
  },
  {
    key: "faq",
    title: "FAQ",
    eyebrow: "Quick answers",
    text: "Quick answers that help people avoid common mistakes in stressful wildlife moments.",
    href: "/faq",
    icon: CircleHelp,
    tone: "blue"
  },
  {
    key: "merch",
    title: "Merch",
    eyebrow: "Shop for good",
    text: "Mission gear that helps keep wildlife care visible and supported.",
    href: "/merch",
    icon: PackageOpen,
    tone: "clay"
  }
];

export const intakeSteps = [
  {
    title: "Give the animal space",
    text: "Keep people and pets back. Do not feed, bathe, medicate, or try to keep the animal."
  },
  {
    title: "Share what you can see",
    text: "Animal type, condition, exact location, photos, and whether the animal is contained or in immediate danger."
  },
  {
    title: "Reach qualified help",
    text: "Use those details to contact a licensed rehabber, wildlife organization, public authority, or reunification resource."
  }
];

export const operatingLanes = [
  {
    value: "public",
    label: "Neighbors",
    icon: Waypoints,
    title: "Know what to do in the first few minutes",
    text: "Calm safety reminders help people avoid harmful handling and reach licensed or permitted help faster."
  },
  {
    value: "rehabbers",
    label: "Rehabbers",
    icon: FileHeart,
    title: "Back the people doing the hands-on care",
    text: "Licensed and permitted rehabbers need supplies, transport help, community trust, and fewer avoidable calls."
  },
  {
    value: "businesses",
    label: "Businesses",
    icon: TreePine,
    title: "Prevent displacement before it happens",
    text: "Tree crews, landscapers, clinics, and sponsors can learn humane escalation steps and support safer outcomes."
  },
  {
    value: "fund",
    label: "Donors",
    icon: DollarSign,
    title: "Put generosity to work",
    text: "Gifts can help cover formula, food, medication, cages, transport, emergency supplies, and rehabber support."
  }
];

export const impactCards = [
  {
    icon: HeartHandshake,
    label: "Rehabber support",
    value: "Formula, transport, supplies, and emergency care funds"
  },
  {
    icon: MapPinned,
    label: "Find local help",
    value: "Help people find the right licensed care by species and location"
  },
  {
    icon: ShieldCheck,
    label: "Compassionate companies",
    value: "Education and recognition for wildlife-aware tree crews"
  }
];

export const publicStats = [
  { label: "Priority", value: "417 area" },
  { label: "Current focus", value: "Safe help + rehabber support" },
  { label: "Community goal", value: "More animals reaching care" }
];

export const animalTypes = [
  "Unknown",
  "Squirrel",
  "Rabbit",
  "Opossum",
  "Raccoon",
  "Fox",
  "Songbird",
  "Raptor",
  "Waterfowl",
  "Reptile/amphibian",
  "Other"
];

export const rehabberDirectory = [
  {
    name: "417 Wildlife Alliance Wildlife Help",
    type: "General wildlife guidance",
    serviceArea: "Southwest Missouri",
    species: ["Unknown", "Small mammals", "Birds", "Reptiles"],
    status: "Share details",
    contact: "Use the found-animal form to share details, photos, and location so the animal can be connected with appropriate help.",
    url: "/found-animal",
    counties: ["Greene", "Christian", "Webster", "Polk"],
    kind: "resource"
  },
  {
    name: "Ozarks Small Mammal Care",
    type: "Licensed rehabber",
    serviceArea: "Springfield and nearby communities",
    species: ["Squirrels", "Rabbits", "Opossums", "Small mammals"],
    status: "Accepting calls",
    contact: "Best for small-mammal questions, baby season triage, and safe handoff guidance when public contact details have been approved.",
    url: "/found-animal/baby-squirrel",
    counties: ["Greene", "Christian"],
    kind: "rehabber"
  },
  {
    name: "James River Wildlife Support",
    type: "Licensed rehabber",
    serviceArea: "South Springfield, Nixa, Ozark",
    species: ["Squirrels", "Rabbits", "Opossums"],
    status: "Limited intake",
    contact: "May be able to advise on young mammals and reunification questions when capacity and approved public contact preferences allow.",
    url: "/found-animal/baby-rabbit",
    counties: ["Greene", "Christian"],
    kind: "rehabber"
  },
  {
    name: "Table Rock Wildlife Referral",
    type: "Referral partner",
    serviceArea: "Branson, Kimberling City, Table Rock Lake area",
    species: ["Waterfowl", "Songbirds", "Reptiles", "Unknown"],
    status: "Referral only",
    contact: "Helps find the right contact for lake-area wildlife and public-safety situations when a direct listing is not appropriate.",
    url: "/contact",
    counties: ["Stone", "Taney"],
    kind: "resource"
  },
  {
    name: "Finley Creek Wildlife Care",
    type: "Licensed rehabber",
    serviceArea: "Ozark, Sparta, eastern Christian County",
    species: ["Opossums", "Rabbits", "Small mammals"],
    status: "Accepting calls",
    contact: "Focused on small mammals and young opossums when space is available and public contact details have been approved.",
    url: "/found-animal/opossum",
    counties: ["Christian", "Douglas"],
    kind: "rehabber"
  },
  {
    name: "Greene County Animal Control",
    type: "Public safety resource",
    serviceArea: "Greene County",
    species: ["Unknown", "Rabies vector species", "Large mammals"],
    status: "Urgent resource",
    contact: "Information card. Contact the appropriate public authority when wildlife is creating a public-safety risk, is trapped in a building, or is near people or pets.",
    url: "/contact",
    counties: ["Greene"],
    kind: "resource",
    priority: "urgent"
  },
  {
    name: "MDC Conservation Contact",
    type: "Conservation authority",
    serviceArea: "Missouri statewide",
    species: ["Deer", "Fox", "Raptors", "Waterfowl", "Reptiles", "Unknown"],
    status: "Information resource",
    contact: "Information card. Conservation authorities can be appropriate for protected species, public-safety issues, large wildlife, and regulation questions.",
    url: "/directory",
    counties: ["Greene", "Christian", "Webster", "Polk", "Stone", "Taney", "Dallas", "Lawrence"],
    kind: "resource"
  },
  {
    name: "Songbird Recovery Referral",
    type: "Bird care referral",
    serviceArea: "Springfield metro and surrounding counties",
    species: ["Songbirds", "Baby birds"],
    status: "Availability varies",
    contact: "Use for nestling, fledgling, window strike, and cat-contact questions involving small birds when an approved bird-care contact is available.",
    url: "/found-animal/baby-bird",
    counties: ["Greene", "Christian", "Webster"],
    kind: "rehabber"
  },
  {
    name: "Raptor Response Network",
    type: "Specialized referral",
    serviceArea: "Southwest Missouri",
    species: ["Raptors", "Owls", "Hawks"],
    status: "Referral only",
    contact: "Mock listing for testing. Raptor situations need trained handling and should not be approached closely by the public.",
    url: "/found-animal/injured-adult",
    counties: ["Greene", "Christian", "Polk", "Dallas", "Stone", "Taney"],
    kind: "resource"
  },
  {
    name: "Route 65 Wildlife Emergency Guidance",
    type: "Roadside guidance",
    serviceArea: "Major roads and highways",
    species: ["Opossums", "Deer", "Fox", "Unknown"],
    status: "Urgent guidance",
    contact: "Information card. Use when wildlife is injured near traffic. Do not step into traffic or try to move adult wildlife without guidance.",
    url: "/found-animal/vehicle-strike",
    counties: ["Greene", "Christian", "Taney", "Dallas"],
    kind: "resource",
    priority: "urgent"
  },
  {
    name: "Tree Work Nest Response",
    type: "Nest or den guidance",
    serviceArea: "417 area crews and property owners",
    species: ["Squirrels", "Rabbits", "Songbirds", "Small mammals"],
    status: "Guidance available",
    contact: "Information card. Pause work near disturbed nests or dens and gather photos before moving animals or material.",
    url: "/found-animal/tree-work-nest",
    counties: ["Greene", "Christian", "Webster", "Polk", "Stone", "Taney", "Dallas", "Lawrence"],
    kind: "resource"
  },
  {
    name: "Webster County Wildlife Help",
    type: "Volunteer rehab contact",
    serviceArea: "Marshfield, Rogersville, Seymour",
    species: ["Rabbits", "Squirrels", "Opossums"],
    status: "Limited intake",
    contact: "Can help with small-mammal triage when space, transport, and approved public contact preferences are available.",
    url: "/found-animal",
    counties: ["Webster", "Greene"],
    kind: "rehabber"
  },
  {
    name: "Polk County Wildlife Care",
    type: "Licensed rehabber",
    serviceArea: "Bolivar and northern 417 communities",
    species: ["Squirrels", "Opossums", "Reptiles"],
    status: "Accepting calls",
    contact: "Mock listing for testing. Public contact would be shown only with the rehabber's consent.",
    url: "/rehabbers",
    counties: ["Polk", "Dallas"],
    kind: "rehabber"
  },
  {
    name: "Lawrence County Small Animal Rescue",
    type: "Referral partner",
    serviceArea: "Aurora, Mount Vernon, Monett area",
    species: ["Rabbits", "Squirrels", "Unknown", "Small mammals"],
    status: "Availability varies",
    contact: "Helps direct finders toward the right local contact based on animal type, location, and verified public listing details.",
    url: "/contact",
    counties: ["Lawrence", "Barry"],
    kind: "rehabber"
  },
  {
    name: "Reptile and Amphibian Guidance",
    type: "Education resource",
    serviceArea: "Regional",
    species: ["Reptiles", "Amphibians", "Unknown"],
    status: "Information resource",
    contact: "Information card. Many reptiles and amphibians should be left in place unless injured, trapped, or in immediate danger.",
    url: "/faq",
    counties: ["Greene", "Christian", "Webster", "Polk", "Stone", "Taney", "Dallas", "Lawrence"],
    kind: "resource"
  },
  {
    name: "Transport Volunteer Pool",
    type: "Volunteer resource",
    serviceArea: "Springfield, Ozark, Nixa, Republic",
    species: ["Unknown", "Small mammals", "Birds"],
    status: "Coordination needed",
    contact: "Information card. Transport should happen only after a rehabber or appropriate authority confirms where the animal needs to go.",
    url: "/help#signup",
    counties: ["Greene", "Christian"],
    kind: "resource"
  }
];

export const helpOptions = [
  {
    icon: DollarSign,
    title: "Donate",
    text: "Support formula, cages, medication, transport, and emergency rehab costs.",
    href: "/donate"
  },
  {
    icon: Users,
    title: "Volunteer",
    text: "Help with transport, events, coordination, content, fundraising, or outreach.",
    href: "/help#signup"
  },
  {
    icon: Building2,
    title: "Partner",
    text: "Bring a business, clinic, tree crew, or community organization into the alliance.",
    href: "/partners"
  },
  {
    icon: Newspaper,
    title: "Share stories",
    text: "Help the alliance show impact through local wildlife recovery stories.",
    href: "/stories"
  }
];

export const adminCards = [
  {
    icon: ClipboardList,
    label: "Animal help requests",
    href: "/admin/cases",
    description: "Review found-animal details and coordinate appropriate follow-up."
  },
  {
    icon: Inbox,
    label: "Inbox",
    href: "/admin/inbox",
    description: "Review contact messages, volunteer interest, and partner applications."
  },
  {
    icon: MapPinned,
    label: "Directory",
    href: "/admin/directory",
    description: "Manage rehabber listings, species categories, and public visibility."
  },
  {
    icon: Building2,
    label: "Partners",
    href: "/admin/partners",
    description: "Review sponsors, business partners, and certified-company leads."
  },
  {
    icon: DollarSign,
    label: "Donations",
    href: "/admin/donations",
    description: "Track donation records, fund preferences, and rehabber support decisions."
  },
  {
    icon: Newspaper,
    label: "Stories and news",
    href: "/admin/stories",
    description: "Create public updates that show donors where support is going."
  },
  {
    icon: PackageOpen,
    label: "Merch",
    href: "/admin/merch",
    description: "Prepare mission gear, pricing, and product visibility."
  },
  {
    icon: BarChart3,
    label: "Impact loop",
    href: "/admin/impact",
    description: "Track routed animals, rehabber follow-up, updates, and outcomes."
  }
];

export const storyCards = [
  {
    title: "The fund that lets rehabbers say yes",
    category: "Impact",
    summary: "Monthly gifts help cover the predictable costs behind urgent wildlife care: formula, supplies, transport, and safe housing."
  },
  {
    title: "Compassionate tree care starts before the first cut",
    category: "Partners",
    summary: "Wildlife-aware crews can spot nests, dens, displacement risks, and moments when work should pause for guidance."
  },
  {
    title: "Reuniting is rescue when it is done right",
    category: "Education",
    summary: "Some young animals do best when people know when to step back and when to call licensed help."
  }
];

export const faqs = [
  {
    q: "Should I feed an animal I found?",
    a: "No. Feeding the wrong thing can make an animal worse. Keep the animal warm, quiet, and away from pets only if a licensed rehabilitator or appropriate authority tells you containment is necessary."
  },
  {
    q: "Is 417 Wildlife Alliance a 24/7 emergency service?",
    a: "No. If a person is in danger, call emergency services. For wildlife concerns, submit the details and also contact a licensed rehabilitator or appropriate local authority when the situation is urgent."
  },
  {
    q: "Can independent rehabbers receive support?",
    a: "Yes. The alliance is built to support both nonprofit organizations and independent licensed or permitted rehabbers through supplies, transport help, reimbursements, and community funding."
  },
  {
    q: "What does certified company mean?",
    a: "It means a company has committed to wildlife-aware education, humane escalation steps, and a safer response when work may affect nests, dens, or displaced animals."
  },
  {
    q: "Who should I call for wildlife help in Springfield, Missouri?",
    a: "Start with the animal type, exact location, visible injuries, and whether people, pets, traffic, or equipment are involved. Use the found-animal form and directory to look for a licensed rehabilitator, conservation authority, animal control, or other appropriate local resource."
  },
  {
    q: "Does 417 Wildlife Alliance rehabilitate animals directly?",
    a: "The launch model is to route, fund, educate, and coordinate support for licensed or permitted care. The alliance should not directly possess, treat, or rehabilitate wildlife unless the required state and federal permits and qualified facilities are in place."
  },
  {
    q: "What counties are part of the initial 417 wildlife-help focus?",
    a: "The initial focus is southwest Missouri and nearby 417-area communities, including Springfield, Greene County, Christian County, Webster County, Polk County, Stone County, Taney County, Dallas County, and Lawrence County."
  },
  {
    q: "Should I call animal control, MDC, or a wildlife rehabilitator?",
    a: "It depends on the situation. Use emergency services when a person is in danger, local animal control or public-safety resources when wildlife creates an immediate safety risk, conservation authorities for protected species or regulation questions, and licensed rehabilitators for injured or orphaned wildlife that may need care."
  }
];

export const programPillars = [
  {
    icon: Sprout,
    title: "Protect the animal first",
    text: "Help neighbors take safe, calm steps and reach appropriate licensed or permitted care."
  },
  {
    icon: HeartHandshake,
    title: "Fund the people doing the work",
    text: "Turn small donations, sponsors, and grants into support rehabbers can actually use."
  },
  {
    icon: ShieldCheck,
    title: "Build a more aware community",
    text: "Help businesses and residents prevent displacement and respond better when wildlife is affected."
  }
];
