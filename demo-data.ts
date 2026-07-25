# 417 Wildlife Alliance Product Requirements Document

Status: Draft v0.1  
Date: 2026-05-16  
Primary region: Southwest Missouri / 417 area, with expansion potential

## 1. Executive Summary

417 Wildlife Alliance is a public website and backend platform for helping injured, orphaned, displaced, or at-risk wildlife reach appropriate care while creating a sustainable funding and partner network for licensed wildlife rehabilitators.

The first product should do five things well:

1. Help a member of the public answer: "I found an animal. What now?"
2. Route animal-help requests to the nearest appropriate licensed/permitted rehabber or organization.
3. Let donors contribute to a transparent wildlife rehabilitation fund.
4. Let partners, sponsors, volunteers, and businesses sign up.
5. Give admins a simple backend to manage cases, directory listings, donations, partners, sponsors, resources, and success stories.

The site should be compassionate, practical, and safety-aware. It should never imply that unlicensed members of the public can keep, treat, feed, or rehabilitate wild animals. The platform should encourage observation, reunification when appropriate, and contact with licensed/permitted professionals.

## 2. Source Inputs Parsed

### Messenger Conversation

Core ideas from Matthew:

- Create an ongoing wildlife rehabilitation fund for the 417 area.
- Support nonprofits and independent licensed rehabilitators.
- Address the problem that rehabbers are overwhelmed, underfunded, and sometimes have to turn animals away.
- Explore federal grant opportunities.
- Help rehabbers with systems, fundraising, and operational support.
- Potentially connect Theta to the project through proceeds, brand partnership, or shared wellness/ecological wellness messaging.
- Build a "417 Wildlife Alliance certified" program for tree companies that learn how to identify and mitigate wildlife welfare issues.
- Give certified companies stickers for trucks and website listings as conscious, compassionate tree care providers.

### Sketch / Concept Map

The handwritten map centers on "417 Wildlife Alliance" and branches into:

- Who we are
  - Mission
  - Story
  - Team
- How you can help
  - Donate
  - Legislation / advocacy
  - Partnership
- Directory of rehabbers
  - Map to locate nearest rehabber
  - Filter/select by animal type
- Wildlife compassionate companies / partners
  - WA certified companies
  - Sponsors
  - Similar resources
  - Partner listings
- So you found an animal. What next?
  - Complete guide
  - By animal type
  - Reuniting resources
- Success stories / news
  - Local success
  - Global success
- FAQ
- Merch

## 3. Product Vision

417 Wildlife Alliance should become the trusted regional hub for wildlife help, rehabber support, and conservation-minded community action.

The public-facing site should feel calm and urgent in the right places: reassuring for someone who just found an animal, credible for donors and grant reviewers, and useful for rehabbers and partner businesses.

The backend should be operationally boring in the best way: every animal request, partner lead, sponsor inquiry, signup, and donation should land somewhere structured instead of disappearing into DMs, texts, or scattered spreadsheets.

## 4. Goals

### MVP Goals

- Launch a credible public website for 417 Wildlife Alliance.
- Collect animal-help submissions with location, species, urgency, photos, and contact information.
- Provide immediate, safe, species-aware guidance after submission.
- Maintain a searchable/filterable directory of rehabbers and organizations.
- Collect donor, volunteer, rehabber, partner, sponsor, and certified-company leads.
- Accept one-time and recurring donations.
- Publish basic impact stories, news, FAQ, and educational resources.
- Provide an admin dashboard for managing submissions and site content.

### Longer-Term Goals

- Build a grant-ready impact reporting system.
- Support micro-grants or reimbursements to licensed rehabbers.
- Add certification workflows for tree companies and other wildlife-adjacent businesses.
- Build a capacity-aware rehabber routing system.
- Add volunteer transport coordination.
- Add a merch store or merchandise partner integration.
- Expand beyond the 417 area when the operating model is proven.

## 5. Non-Goals For The MVP

- Do not build a full wildlife medical records system in v1.
- Do not give medical treatment instructions beyond basic public safety and contact guidance approved by qualified rehabbers.
- Do not promise emergency dispatch or 24/7 response unless the organization can operationally support it.
- Do not publish private rehabber addresses without explicit consent.
- Do not launch the certification program as legally binding accreditation until training, criteria, waivers, and review processes are defined.
- Do not imply donations are tax-deductible until nonprofit status and fiscal sponsorship details are confirmed.

## 6. Users And Personas

### Animal Finder

Someone in the 417 area finds an animal that appears injured, orphaned, trapped, displaced, or unsafe. They may be panicked, unsure what species it is, and tempted to feed or handle it.

Needs:

- Clear next steps.
- Species-specific routing.
- Nearest appropriate help.
- Fast mobile form.
- Confirmation that the request was received.

### Donor

Someone wants to financially support wildlife rehabbers, either once or monthly.

Needs:

- Clear explanation of the fund.
- Trust signals.
- Donation options.
- Receipts.
- Impact reporting.

### Licensed Rehabber / Rehab Organization

A licensed/permitted person or nonprofit that needs funding, supplies, volunteers, transport help, public education, or better request routing.

Needs:

- Directory profile.
- Species/service-area controls.
- Capacity/status updates.
- Request routing that does not overwhelm them.
- Ability to request support from the fund.

### Partner Business

A business, such as a tree company, landscaping company, pest control company, vet office, pet business, or wellness brand, that wants to support wildlife welfare.

Needs:

- Partner application.
- Sponsor tiers.
- Certification pathway where applicable.
- Public listing.
- Badge/sticker assets after approval.

### Sponsor / Brand Partner

A company or individual sponsor that wants visible alignment with the mission.

Needs:

- Sponsor packages.
- Recognition.
- Impact updates.
- Clear payment/contact flow.

### Volunteer

Someone who wants to help with transport, events, admin, fundraising, content, or rehabber support.

Needs:

- Signup flow.
- Role preferences.
- Availability.
- Training requirements.

### Admin

The internal team running the alliance.

Needs:

- View and triage animal submissions.
- Manage rehabber and partner records.
- Manage content.
- Export data for grants and reporting.
- Avoid losing information in Messenger/texts.

## 7. MVP Feature Requirements

### 7.1 Public Site Navigation

Required pages:

- `/` Home
- `/found-animal` So You Found An Animal. What Next?
- `/directory` Directory of Rehabbers
- `/help` How You Can Help
- `/donate` Donate
- `/partners` Partners and Sponsors
- `/certified-companies` Wildlife Compassionate Companies
- `/about` Who We Are
- `/stories` Success Stories / News
- `/faq` FAQ
- `/merch` Merch or Coming Soon

Header CTAs:

- Found an animal?
- Donate
- Become a partner

Footer content:

- Contact
- Social links
- Emergency disclaimer
- Privacy policy
- Terms
- Nonprofit/tax status note

### 7.2 Found Animal Flow

The found-animal flow is the highest-priority MVP feature.

Public form fields:

- Finder name
- Phone
- Email
- Preferred contact method
- Animal type
- If unknown, "I am not sure"
- Approximate age if known
- Condition
- Location/address or nearest cross streets
- County
- Is the animal currently contained?
- Is the animal in immediate danger?
- Are there visible injuries?
- Did a tree, nest, den, building, vehicle, pet, or weather event cause displacement?
- Photo upload
- Short description
- Consent to share submission with appropriate rehabbers/partners
- Acknowledgement that 417 Wildlife Alliance is not a 24/7 emergency service unless explicitly stated

Immediate confirmation should:

- Show submission ID.
- Tell the user not to attempt feeding, treating, or keeping wildlife unless instructed by a licensed/permitted rehabilitator.
- Present safe next steps based on broad animal category.
- Show nearest directory matches when available.
- Provide MDC/local authority contact guidance where appropriate.
- Send confirmation by email/SMS if configured.

Admin behavior:

- Store submission.
- Notify admins.
- Allow status changes: new, reviewing, contacted finder, referred, accepted by rehabber, closed, duplicate, spam.
- Allow assignment to a rehabber or organization.
- Keep internal notes.

Acceptance criteria:

- A mobile user can submit a case in under 3 minutes.
- A submitted case creates a backend record.
- Admin receives notification.
- User receives confirmation.
- Submission can include at least one image.
- User is never instructed to keep or treat wildlife themselves.

### 7.3 Directory Of Rehabbers

The directory should help users locate appropriate help without exposing private information or overwhelming rehabbers.

Directory listing fields:

- Rehabber or organization name
- Public contact method
- Public website/social link
- General service area
- Species categories accepted
- Permit/license notes
- Intake availability/status
- Accepts public calls?
- Accepts texts?
- Accepts drop-offs?
- Transport available?
- Notes approved for public display
- Admin-only address, phone, email, permit docs, and capacity notes

Filters:

- Animal type/species group
- County or distance
- Accepting intakes now
- Organization vs independent rehabber
- Mammals, birds, reptiles/amphibians, other categories

Map:

- MVP can use approximate service-area markers rather than exact private addresses.
- Exact locations should only display for organizations or rehabbers who explicitly approve public address display.

Acceptance criteria:

- Admin can create/edit/publish/unpublish directory entries.
- Public users can filter by animal type and location.
- Private data is not exposed on public pages.

### 7.4 Donations

Donation options:

- One-time donation
- Monthly donation
- Preset amounts
- Custom amount
- Optional dedication
- Optional fund preference:
  - General Wildlife Rehab Fund
  - Formula and Feeding Supplies
  - Emergency Medical Support
  - Transport Support
  - Rehabber Micro-Grants

MVP implementation:

- Use Stripe Checkout, Donorbox, Givebutter, or another donation processor.
- Store donation intent/metadata locally where possible.
- Use webhooks to record successful payments if using Stripe.

Important copy:

- Tax-deductibility language depends on actual nonprofit/fiscal sponsor status.
- Avoid promising that restricted funds always go to a specific individual unless the accounting process supports it.

Acceptance criteria:

- Donor can complete a one-time donation.
- Donor can start a recurring donation.
- Admin can view donation records or processor links.
- Donation success page thanks the donor and offers newsletter/social follow-up.

### 7.5 Signups

Signup types:

- Newsletter
- Volunteer
- Rehabber directory interest
- Partner business
- Sponsor inquiry
- Certified company interest
- General contact

Shared fields:

- Name
- Email
- Phone optional
- Organization/company optional
- County/location
- Interest type
- Message
- Consent to be contacted

Volunteer-specific fields:

- Interest areas
- Transport availability
- Animal handling experience
- Admin/fundraising/event skills
- Availability
- Willingness to complete training/background checks if needed

Acceptance criteria:

- Every signup creates a backend lead.
- Admin can filter by lead type.
- User receives a confirmation.

### 7.6 Partners, Sponsors, And Certified Companies

Partner categories:

- Rehab partner
- Veterinary partner
- Tree care partner
- Landscaping partner
- Pest/wildlife conflict partner
- Wellness/brand partner
- Education/community partner
- Corporate sponsor

Wildlife Compassionate Company program:

- Application form.
- Internal review status.
- Training/checklist completion.
- Approval/expiration date.
- Public listing after approval.
- Downloadable badge/sticker asset after approval.

Tree-company certification should likely include:

- Nest/den awareness training.
- Seasonal wildlife risk awareness.
- Stop-work/escalation process for displaced or injured wildlife.
- Referral process to licensed/permitted care.
- Public-facing code of conduct.
- Renewal requirement.

Acceptance criteria:

- Businesses can apply.
- Admin can approve/reject/publish listings.
- Public can browse approved companies.
- Sponsor inquiries are separated from certification applications.

### 7.7 Success Stories / News

Content types:

- Success story
- Local news
- Global wildlife success
- Rehabber spotlight
- Partner spotlight
- Fund impact update
- Education article

Fields:

- Title
- Slug
- Summary
- Body
- Category
- Location
- Images
- Animal/species tags
- Related partner/rehabber
- Published status
- Publish date

Acceptance criteria:

- Admin can publish/unpublish posts.
- Public can browse posts by category.
- Posts can be used for donor trust and grant reporting.

### 7.8 FAQ And Resources

Initial FAQ themes:

- I found a baby animal. What should I do?
- Should I feed it?
- Should I move it?
- How do I know if it needs help?
- What animals can rehabbers take?
- Why do rehabbers need money?
- How are donations used?
- Can my business partner with 417 Wildlife Alliance?
- What does "certified company" mean?
- Are donations tax-deductible?
- How can I volunteer?

Resource library:

- Animal-specific public guidance.
- Reuniting resources.
- Seasonal wildlife notices.
- Partner education materials.
- Grant/impact reports.

### 7.9 Merch

MVP:

- Coming soon page or external store link.

Later:

- Shopify, Fourthwall, Printful, or Stripe products.
- Track merch proceeds that support the fund.

## 8. Backend And Admin Requirements

### Admin Dashboard

Admin sections:

- Animal cases
- Directory entries
- Signups/leads
- Partners
- Sponsorships
- Certified companies
- Donations/payment records
- Posts/stories/news
- FAQ/resources
- Settings
- Exports

Roles:

- Super admin
- Staff/admin
- Case manager
- Content editor
- Partner manager
- Read-only/reporting

Admin acceptance criteria:

- Admin users must authenticate.
- Public submissions must be protected from unauthorized access.
- Admins can export cases, donations, leads, and partners as CSV.
- Admin actions should be logged for sensitive records.

### Notifications

MVP notifications:

- New animal case email to admin.
- New partner/sponsor lead email to admin.
- Confirmation email to submitter.
- Donation success email handled by payment processor or app.

Later notifications:

- SMS notifications for urgent animal submissions.
- Rehabber-specific routing notifications.
- Capacity update reminders.
- Certification renewal reminders.

## 9. Suggested Technical Direction For Scaffolding

Recommended stack for the next build step:

- Framework: Next.js with App Router and TypeScript
- Styling: Tailwind CSS
- UI components: shadcn/ui or a lightweight local component library
- Icons: lucide-react
- Database: Supabase Postgres
- Auth: Supabase Auth
- File storage: Supabase Storage for submitted images and content images
- Forms: react-hook-form plus zod validation
- Payments: Stripe Checkout and webhooks
- Email: Resend or Postmark
- Maps: Mapbox, Google Maps, or a privacy-safe embedded map strategy
- Deployment: Vercel or Netlify

Reasoning:

- Next.js can support public pages, admin pages, API routes, and donation webhooks in one codebase.
- Supabase gives a fast path for auth, Postgres, file storage, and row-level security.
- Stripe is flexible for recurring donations and later sponsor/merch payments.

## 10. Draft Data Model

### users

- id
- email
- full_name
- role
- created_at
- updated_at

### animal_cases

- id
- public_case_number
- finder_name
- finder_phone
- finder_email
- preferred_contact_method
- animal_type
- animal_type_unknown boolean
- approximate_age
- condition
- description
- location_text
- county
- latitude
- longitude
- currently_contained boolean
- immediate_danger boolean
- visible_injury boolean
- displacement_context
- consent_to_share boolean
- status
- assigned_rehabber_id
- assigned_organization_id
- created_at
- updated_at

### animal_case_photos

- id
- animal_case_id
- storage_path
- alt_text
- created_at

### rehabbers

- id
- display_name
- organization_id
- public_slug
- public_email
- public_phone
- website_url
- service_area_text
- public_location_text
- private_address
- private_notes
- permit_status
- permit_notes
- accepts_public_contact boolean
- accepts_texts boolean
- accepts_dropoffs boolean
- transport_available boolean
- intake_status
- published boolean
- created_at
- updated_at

### rehabber_species_capabilities

- id
- rehabber_id
- species_group
- notes

### organizations

- id
- name
- type
- website_url
- public_email
- public_phone
- public_location_text
- private_notes
- published boolean
- created_at
- updated_at

### signups

- id
- signup_type
- name
- email
- phone
- organization_name
- county
- message
- status
- created_at
- updated_at

### partners

- id
- name
- type
- contact_name
- contact_email
- contact_phone
- website_url
- county
- status
- public_slug
- public_description
- published boolean
- created_at
- updated_at

### sponsorships

- id
- partner_id
- tier
- amount
- start_date
- end_date
- recognition_preferences
- status
- created_at
- updated_at

### certifications

- id
- partner_id
- program_name
- status
- training_completed_at
- approved_at
- expires_at
- public_badge_url
- internal_notes
- created_at
- updated_at

### donations

- id
- donor_name
- donor_email
- amount
- currency
- frequency
- fund_preference
- payment_provider
- payment_provider_id
- status
- created_at

### fund_requests

- id
- rehabber_id
- organization_id
- request_type
- amount_requested
- description
- status
- approved_amount
- approved_at
- paid_at
- created_at
- updated_at

### posts

- id
- title
- slug
- summary
- body
- category
- location
- status
- cover_image_path
- published_at
- created_at
- updated_at

### resources

- id
- title
- slug
- resource_type
- animal_type
- body
- status
- published_at
- created_at
- updated_at

### audit_events

- id
- actor_user_id
- entity_type
- entity_id
- action
- metadata
- created_at

## 11. API / Route Requirements

Public API routes:

- `POST /api/animal-cases`
- `POST /api/signups`
- `POST /api/partners/apply`
- `POST /api/certified-companies/apply`
- `POST /api/contact`
- `POST /api/stripe/webhook`

Admin API/routes:

- `/admin`
- `/admin/cases`
- `/admin/cases/[id]`
- `/admin/rehabbers`
- `/admin/partners`
- `/admin/sponsors`
- `/admin/certifications`
- `/admin/donations`
- `/admin/posts`
- `/admin/resources`
- `/admin/exports`

Public dynamic routes:

- `/directory/[slug]`
- `/partners/[slug]`
- `/stories/[slug]`
- `/resources/[slug]`

## 12. Compliance, Safety, And Trust Requirements

Wildlife care requirements:

- Site language should emphasize contacting licensed/permitted rehabilitators and authorities.
- The public animal-help flow should avoid detailed medical care instructions.
- Missouri and federal permit requirements must be reviewed before launch and periodically updated.
- If migratory birds are included, federal permit requirements must be respected.
- Directory listings should identify species categories and permit limitations clearly.

Privacy requirements:

- Do not publish private rehabber addresses without consent.
- Protect animal finder contact information.
- Use consent before sharing submissions with third-party rehabbers or partners.
- Store photos securely.
- Include privacy policy and data retention language.

Donation/legal requirements:

- Confirm nonprofit status, fiscal sponsor, or other legal structure before using tax-deductible donation language.
- Use clear fund allocation language.
- Keep donation and disbursement records exportable for accounting and grants.

Certification/liability requirements:

- Certified-company language should be reviewed before launch.
- Make certification criteria public.
- Include expiration/renewal.
- Avoid implying 417 Wildlife Alliance guarantees all actions of a listed company.

## 13. Content Strategy

Tone:

- Compassionate
- Practical
- Non-alarmist
- Credible
- Local first, expandable later

Potential homepage message:

"Helping people help wildlife, and helping rehabilitators keep saying yes."

Potential Theta/partner framing:

"Human wellness and ecological wellness are connected. 417 Wildlife Alliance brings community, business, and rehabilitation support together so more wild animals can receive appropriate care and return to the places they belong."

Core content pillars:

- Immediate wildlife help
- Rehabber support
- Community education
- Conscious business partnerships
- Transparent impact

## 14. Metrics

MVP metrics:

- Animal-help submissions per month
- Percentage routed to appropriate resources
- Average time to first admin response
- Donation conversion rate
- Monthly recurring donors
- Total funds raised
- Partner applications
- Certified company applications
- Rehabber directory participants
- Newsletter signups

Longer-term impact metrics:

- Funds disbursed to rehabbers/nonprofits
- Supplies funded
- Transport requests completed
- Number of rehabbers supported
- Number of animals routed to care
- Public education page views
- Certified companies active
- Success stories published

## 15. Launch Phases

### Phase 0: Foundation

- Confirm nonprofit/fiscal sponsor path.
- Confirm initial leadership/team roles.
- Confirm species and geographic scope.
- Confirm payment processor.
- Confirm initial rehabber contacts and consent to list.
- Confirm emergency/non-emergency language.

### Phase 1: MVP Website And Intake

- Public website.
- Found-animal form.
- Automatic rehabber matching by species and county on found-animal submissions, shown to the finder immediately; outbound contact to matched rehabbers stays admin-approved before it sends (originally scoped as Phase 3 "capacity-aware routing," pulled forward into Phase 1 since the basic species/county match was straightforward to build alongside the intake form itself).
- Admin case inbox.
- Rehabber directory.
- Donation page.
- Partner/sponsor/signup forms, combined with Wildlife Compassionate Company certification interest into a single application flow.
- FAQ/resources.
- Stories/news.
- Basic analytics.

### Phase 2: Fund Operations

- Rehabber support request flow.
- Donation reporting.
- Micro-grant/reimbursement workflow.
- Sponsor tiers.
- Certified company training checklist.
- Partner listings.
- CSV exports for accounting and grants.

### Phase 3: Network Expansion

- Capacity-aware routing (real-time intake status/load weighting; basic species/county matching already shipped in Phase 1).
- Volunteer transport coordination.
- SMS alerts.
- Merch store.
- Public impact dashboard.
- Regional expansion beyond the 417 area.
- Grant reporting dashboards.

## 16. Open Questions

1. Will 417 Wildlife Alliance itself rehabilitate wildlife, or will it initially fund and route to existing licensed/permitted rehabbers?
2. Is the organization already incorporated or seeking 501(c)(3), fiscal sponsorship, or another structure?
3. Who will receive and respond to animal-help submissions?
4. What are the intended support hours?
5. Which species are in scope for launch?
6. Which rehabbers and nonprofits are already known and willing to be listed?
7. Should home addresses ever be shown, or only service-area/contact info?
8. What donation processor should be used?
9. Should Theta be a founding sponsor, a cause-marketing partner, or a separate optional integration?
10. What should the certified-company criteria be?
11. Should certification require a paid fee, donation, training completion, manual approval, or annual renewal?
12. Should the site include public legislation/advocacy content in MVP or later?
13. What data should be included in grant reporting?
14. Does the team want SMS from day one, or email-only for MVP?
15. What is the brand style: field-guide, regional conservation, warm nonprofit, or more modern alliance/network?

## 17. Next Scaffolding Checklist

When ready to build, create:

- Next.js TypeScript app.
- Tailwind and base design system.
- Public route skeletons.
- Admin route skeletons.
- Supabase schema/migrations.
- Auth guard for admin routes.
- Public forms with zod validation.
- Animal case submission endpoint.
- Image upload plumbing.
- Directory data model and seed data.
- Partner/signup endpoints.
- Stripe checkout placeholder.
- Webhook placeholder.
- Email notification adapter.
- Environment variable template.
- README with local setup instructions.

## 18. Regulatory Reference Links

These are implementation references, not legal advice:

- Missouri Department of Conservation wildlife health page: https://mdc.mo.gov/wildlife/wildlife-health
- Missouri Department of Conservation public reminder to contact MDC before acting on injured or truly orphaned wildlife: https://mdc.mo.gov/newsroom/mdc-reminds-public-keep-wildlife-wild-summer
- Missouri wildlife rehabilitation report form, required by Rule 3 CSR 10-9.415: https://missouridepartmentofconservation.org/sites/default/files/2020-11/WildlifeRehabilitationReportForm.pdf
- Missouri rule text for Wildlife Rehabilitation Permit, 3 CSR 10-9.415: https://www.sos.mo.gov/cmsimages/adrules/csr/previous/3csr/3csr1001/3c10-9.pdf
- U.S. Fish and Wildlife Service Migratory Bird Rehabilitation permit page: https://www.fws.gov/service/3-200-10b-migratory-bird-rehabilitation
