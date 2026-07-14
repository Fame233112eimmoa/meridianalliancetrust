import type { Metadata } from "next";

const LOCAL_FALLBACK_SITE_URL = "http://localhost:3000";

function isExplicitlyConfigured(value?: string) {
  return Boolean(value?.trim());
}

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

const explicitSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim() || "";

const rawSiteUrl =
  explicitSiteUrl ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
  process.env.VERCEL_URL?.trim() ||
  LOCAL_FALLBACK_SITE_URL;

export const siteConfig = {
  name: "Meridian Alliance Trust UK",
  description:
    "Website for Meridian Alliance Trust UK with service information, support pathways, and a protected dashboard login.",
  url: normalizeSiteUrl(rawSiteUrl),
  locale: "en_GB",
  logoPath: "/images/meridian-logo-monogram.jpg",
  ogImagePath: "/images/meridian-home-hero.jpg",
  googleVerification:
    process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
    "",
};

export const indexableRoutes = ["/", "/create-account", "/contact", "/support"] as const;
export const hasConfiguredSiteUrl = isExplicitlyConfigured(explicitSiteUrl);
export const hasPublicSiteUrl = hasConfiguredSiteUrl && !isLocalLikeSiteUrl(siteConfig.url);

export const indexRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
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
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl(siteConfig.logoPath),
      description: siteConfig.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "en-GB",
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
          alt: siteConfig.name,
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
