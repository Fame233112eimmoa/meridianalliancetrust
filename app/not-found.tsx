import Link from "next/link";
import type { Metadata } from "next";
import { PublicShell } from "@/components/site/public-shell";
import { Button } from "@/components/ui/button";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Page Not Found",
  description: "The requested page could not be found on Meridian Alliance Trust UK.",
});

const quickLinks = [
  { label: "Return Home", href: "/" },
  { label: "Visit Support", href: "/support" },
  { label: "Contact Client Services", href: "/contact" },
  { label: "Login", href: "/login" },
];

export default function NotFound() {
  return (
    <PublicShell>
      <section className="section-shell py-16 sm:py-20 lg:py-24">
        <div className="panel mx-auto max-w-3xl p-8 text-center sm:p-10">
          <p className="eyebrow">404</p>
          <h1 className="mt-4 text-4xl text-stone-950 sm:text-5xl">Page not found</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-stone-600">
            The page you requested is unavailable or may have moved. Use one of the links below to
            continue browsing Meridian Alliance Trust UK.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/" size="lg">
              Back to Home
            </Button>
            <Button href="/support" size="lg" variant="secondary">
              Visit Support
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[1.5rem] border border-stone-200/80 bg-stone-50 px-5 py-4 text-left text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:text-stone-950"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
