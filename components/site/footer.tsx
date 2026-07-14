import Link from "next/link";
import { BrandLogo } from "@/components/site/brand-logo";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Open Account", href: "/create-account" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
  { label: "Login", href: "/login" },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-200/80 bg-white">
      <div className="section-shell grid gap-8 py-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div className="space-y-4">
          <div>
            <Link href="/" aria-label="Go to Meridian Alliance Trust UK home">
              <BrandLogo variant="horizontal" className="w-[14rem] max-w-full sm:w-[16rem]" />
            </Link>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
              Meridian Alliance Trust UK's website for service information, public support, and a
              protected dashboard login for approved users.
            </p>
          </div>
          <p className="text-sm text-stone-500">© 2026 Meridian Alliance Trust UK. Public website.</p>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:justify-items-end"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-stone-600 transition hover:text-stone-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
