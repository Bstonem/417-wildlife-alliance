import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/utils";

export const siteConfig = {
  name: "417 Wildlife Alliance",
  url: getSiteUrl(),
  description:
    "Wildlife help, rehabber support, and community education for Springfield, southwest Missouri, and the 417 area.",
  defaultImage: "/assets/matt-and-squirrel.jpg",
  locale: "en_US",
  keywords: [
    "417 Wildlife Alliance",
    "wildlife help Springfield MO",
    "wildlife rehabber Springfield MO",
    "wildlife rehabilitation southwest Missouri",
    "injured wildlife Missouri",
    "orphaned wildlife Missouri",
    "baby squirrel help Springfield MO",
    "opossum wildlife help Missouri",
    "417 area wildlife rescue",
    "Missouri wildlife rehabilitators"
  ]
};

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export function createMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.defaultImage,
  keywords = [],
  noIndex = false
}: SeoOptions): Metadata {
  const pageUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: `${siteConfig.name} wildlife help in southwest Missouri`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    },
    robots: noIndex
      ? {
          index: false,
          follow: true
        }
      : {
          index: true,
          follow: true
        }
  };
}

export function siteJsonLd() {
  const organizationId = `${siteConfig.url}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": organizationId,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        areaServed: [
          { "@type": "AdministrativeArea", name: "Southwest Missouri" },
          { "@type": "AdministrativeArea", name: "417 area" },
          { "@type": "City", name: "Springfield, Missouri" },
          { "@type": "City", name: "Nixa, Missouri" },
          { "@type": "City", name: "Ozark, Missouri" },
          { "@type": "City", name: "Republic, Missouri" },
          { "@type": "City", name: "Branson, Missouri" }
        ],
        knowsAbout: [
          "wildlife rehabilitation support",
          "injured wildlife guidance",
          "orphaned wildlife guidance",
          "wildlife rehabilitator referrals",
          "baby squirrel help",
          "opossum help",
          "wildlife-aware tree care"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "en-US",
        publisher: {
          "@id": organizationId
        }
      }
    ]
  };
}

export function faqJsonLd(faqs: Array<{ q: string; a: string }>, path = "/faq") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };
}

type ArticleJsonLdOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  articleSection?: string;
};

export function articleJsonLd({
  title,
  description,
  path,
  image = siteConfig.defaultImage,
  articleSection
}: ArticleJsonLdOptions) {
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: title,
    description,
    image: [absoluteUrl(image)],
    inLanguage: "en-US",
    articleSection,
    datePublished: "2026-05-16",
    dateModified: "2026-05-16",
    author: {
      "@type": "Organization",
      name: siteConfig.name
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    },
    mainEntityOfPage: pageUrl
  };
}
