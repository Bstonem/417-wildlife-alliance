# SEO Audit - 417 Wildlife Alliance

Date: 2026-05-16

## Target Search Intent

The strongest local search cluster is southwest Missouri wildlife help, especially:

- Wildlife help in Springfield, MO and the 417 area
- Wildlife rehabilitator or rehabber directory near Springfield, Greene County, and Christian County
- Found injured, orphaned, or displaced wildlife
- Baby squirrel, baby bird, opossum, vehicle-strike, and tree-work nest guidance
- Donate to wildlife rehabilitation support in southwest Missouri
- Wildlife-aware tree care, landscaping, and outdoor-service companies

## Completed Improvements

- Added reusable canonical metadata helpers and site-wide SEO configuration.
- Added page-specific titles, descriptions, Open Graph data, Twitter cards, keyword hints, and canonical URLs across public landing pages.
- Added root organization and website JSON-LD.
- Added FAQPage JSON-LD to the FAQ page.
- Added Article JSON-LD to wildlife guide and story detail pages.
- Added Next metadata routes for `/robots.txt` and `/sitemap.xml`.
- Kept `/api/` out of crawler traffic and added `noindex` metadata for admin pages.
- Marked the coming-soon merch page as `noindex` until it has a real shop experience.
- Added local-service-area copy to the homepage for Springfield, Greene County, Christian County, and broader 417-area searches.
- Expanded the FAQ with local wildlife-help questions.
- Removed demo-ish directory language from public-facing directory cards.
- Documented `NEXT_PUBLIC_SITE_URL` as the production URL source for canonical and sitemap output.

## Remaining Launch Items

- Set `NEXT_PUBLIC_SITE_URL` to the real production domain before launch.
- Connect verified Supabase directory data before indexing the directory page broadly. The page now noindexes when admin Supabase config is missing.
- Add a real logo/icon asset and include it in organization metadata once available.
- Add verified organization details when known: nonprofit status, EIN if applicable, public contact email, and social profiles.
- After deploy, submit `/sitemap.xml` in Google Search Console and test JSON-LD with Google's Rich Results Test.
