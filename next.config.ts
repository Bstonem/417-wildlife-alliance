import { z } from "zod";

export const contactMethodSchema = z.enum(["phone", "email", "text", "any"]);

export const animalCaseSchema = z.object({
  finder_name: z.string().min(2, "Please include your name."),
  finder_phone: z.string().optional(),
  finder_email: z.string().email("Please include a valid email.").optional(),
  preferred_contact_method: contactMethodSchema.default("any"),
  animal_type: z.string().min(1, "Choose an animal type."),
  approximate_age: z.string().optional(),
  condition: z.string().min(1, "Choose the animal's condition."),
  description: z.string().min(10, "Please share a few details."),
  location_text: z.string().min(3, "Please include a location or cross streets."),
  county: z.string().optional(),
  currently_contained: z.boolean().default(false),
  immediate_danger: z.boolean().default(false),
  visible_injury: z.boolean().default(false),
  displacement_context: z.string().optional(),
  consent_to_share: z.literal(true, {
    error: "Consent is required so we can share this with appropriate help."
  })
}).refine((data) => data.finder_phone || data.finder_email, {
  message: "Please include either a phone number or email.",
  path: ["finder_email"]
});

export const signupSchema = z.object({
  signup_type: z.enum(["newsletter", "volunteer", "rehabber", "sponsor", "partner", "certified_company", "general"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organization_name: z.string().optional(),
  county: z.string().optional(),
  message: z.string().optional(),
  consent_to_contact: z.boolean().default(true)
});

export const partnerApplicationSchema = z.object({
  partner_type: z.enum(["tree_care", "veterinary", "landscaping", "wellness", "education", "corporate", "other"]),
  company_name: z.string().min(2),
  contact_name: z.string().min(2),
  contact_email: z.string().email(),
  contact_phone: z.string().optional(),
  website_url: z.string().url().optional().or(z.literal("")),
  county: z.string().optional(),
  message: z.string().optional(),
  seeking_certification: z.boolean().default(false),
  company_type: z.string().optional(),
  wildlife_scenarios: z.string().optional()
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  topic: z.string().min(2),
  message: z.string().min(10)
});

export const donationCheckoutSchema = z.object({
  amount: z.coerce.number().min(5).max(10000),
  frequency: z.enum(["one_time", "monthly"]),
  fund_preference: z.string().optional(),
  donor_email: z.string().email().optional()
});
