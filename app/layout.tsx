import type { Metadata, Viewport } from "next";
import {
  absoluteUrl,
  getSiteStructuredData,
  publicRobots,
  siteConfig,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  referrer: "strict-origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  category: "finance",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: publicRobots,
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title: siteConfig.name,
    description: siteConfig.description,
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
    title: siteConfig.name,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImagePath)],
  },
  verification: siteConfig.googleVerification
    ? {
        google: siteConfig.googleVerification,
        ...(siteConfig.bingVerification
          ? {
              other: {
                "msvalidate.01": siteConfig.bingVerification,
              },
            }
          : {}),
      }
    : siteConfig.bingVerification
      ? {
          other: {
            "msvalidate.01": siteConfig.bingVerification,
          },
        }
      : undefined,
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#8B1E24",
};

const structuredData = getSiteStructuredData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language}>
      <body>
        <div className="relative min-h-screen overflow-x-hidden">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(139,30,36,0.16),_transparent_55%)]" />
          {children}
        </div>
      </body>
    </html>
  );
}
