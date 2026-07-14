import type { Metadata } from "next";

const CUSTOM_SITE_URL = "https://meridianalliancetrust.com";

function normalizeSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

function normalizePath(path: string) {
  if (path === "/") {
    return "/";
  }

  const trimmed = path.replace(/^\/+|\/+$/g, "");

  return trimmed ? `/${trimmed}` : "/";
}

function composeMetaTitle(title?: string) {
  return title ? `${title} | ${siteConfig.name}` : siteConfig.name;
}

function isLocalLikeSiteUrl(value: string) {
  const hostname = new URL(value).hostname.toLowerCase();

  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname.endsWith(".local")
  );
}

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim() || CUSTOM_SITE_URL;
const vercelEnvironment = process.env.VERCEL_ENV?.trim().toLowerCase() || "";
const isPreviewDeployment =
  process.env.VERCEL === "1" && Boolean(vercelEnvironment) && vercelEnvironment !== "production";

export const siteConfig = {
  name: "Meridian Alliance Trust UK",
  legalName: "Meridian Alliance Trust UK",
  description:
    "Private banking website for Meridian Alliance Trust UK with account-opening guidance, client support, and a protected dashboard login.",
  url: normalizeSiteUrl(configuredSiteUrl),
  locale: "en_GB",
  language: "en-GB",
  logoPath: "/images/meridian-logo-monogram.jpg",
  ogImagePath: "/images/meridian-home-hero.jpg",
  ogImageAlt: "Historic London architecture representing Meridian Alliance Trust UK's British banking heritage",
  ogImageWidth: 6000,
  ogImageHeight: 4000,
  googleVerification:
    process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
    "",
  bingVerification:
    process.env.BING_SITE_VERIFICATION?.trim() ||
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim() ||
    "",
  contactEmail: "clientservices@meridianalliancetrustuk.example",
  contactPhone: "+44 20 5555 0198",
  areaServed: "GB",
};

export const indexableRoutes = ["/", "/create-account", "/contact", "/support"] as const;
export const hasPublicSiteUrl =
  !isLocalLikeSiteUrl(siteConfig.url) && !isPreviewDeployment;

export const indexRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const noIndexRobots: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

export const publicRobots: NonNullable<Metadata["robots"]> = hasPublicSiteUrl
  ? indexRobots
  : noIndexRobots;

export function absoluteUrl(path = "/") {
  return new URL(normalizePath(path), `${siteConfig.url}/`).toString();
}

export function getSiteStructuredData() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl(siteConfig.logoPath),
      description: siteConfig.description,
      email: siteConfig.contactEmail,
      telephone: siteConfig.contactPhone,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.contactEmail,
          telephone: siteConfig.contactPhone,
          areaServed: siteConfig.areaServed,
          availableLanguage: siteConfig.language,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: {
        "@id": absoluteUrl("/#organization"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BankOrCreditUnion",
      "@id": absoluteUrl("/#bank"),
      name: siteConfig.legalName,
      url: siteConfig.url,
      image: absoluteUrl(siteConfig.ogImagePath),
      logo: absoluteUrl(siteConfig.logoPath),
      description: siteConfig.description,
      areaServed: siteConfig.areaServed,
      availableLanguage: siteConfig.language,
      email: siteConfig.contactEmail,
      telephone: siteConfig.contactPhone,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "https://schema.org/Monday",
            "https://schema.org/Tuesday",
            "https://schema.org/Wednesday",
            "https://schema.org/Thursday",
            "https://schema.org/Friday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.contactEmail,
          telephone: siteConfig.contactPhone,
          areaServed: siteConfig.areaServed,
          availableLanguage: siteConfig.language,
        },
      ],
      parentOrganization: {
        "@id": absoluteUrl("/#organization"),
      },
    },
  ];
}

export type BreadcrumbItem = {
  label: string;
  path: string;
};

type IndexablePageStructuredDataArgs = {
  path: string;
  title?: string;
  description: string;
  pageType?: "WebPage" | "CollectionPage" | "ContactPage";
  breadcrumbs?: BreadcrumbItem[];
};

export function buildPageStructuredData({
  path,
  title,
  description,
  pageType = "WebPage",
  breadcrumbs = [],
}: IndexablePageStructuredDataArgs) {
  const canonical = absoluteUrl(path);
  const breadcrumbId = `${canonical}#breadcrumb`;
  const pageName = composeMetaTitle(title);
  const webPage = {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": canonical,
    url: canonical,
    name: pageName,
    description,
    inLanguage: siteConfig.language,
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    about: {
      "@id": absoluteUrl("/#bank"),
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.ogImagePath),
    },
    ...(breadcrumbs.length
      ? {
          breadcrumb: {
            "@id": breadcrumbId,
          },
        }
      : {}),
  };

  if (!breadcrumbs.length) {
    return [webPage];
  }

  return [
    webPage,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: absoluteUrl(item.path),
      })),
    },
  ];
}

export function buildIndexableMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title?: string;
  description: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = composeMetaTitle(title);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
    },
    robots: publicRobots,
    openGraph: {
      type: "website",
      url: canonical,
      title: socialTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: absoluteUrl(siteConfig.ogImagePath),
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: siteConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteUrl(siteConfig.ogImagePath)],
    },
  };
}

export function buildPrivateMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    robots: noIndexRobots,
  };
}

export function buildNoIndexMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    robots: noIndexRobots,
  };
}
