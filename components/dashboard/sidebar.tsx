"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/site/brand-logo";
import { dashboardSections } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

type SidebarProps = {
  onNavigate?: () => void;
  onClose?: () => void;
};

export function Sidebar({ onNavigate, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-stone-200/80 pb-5">
        <div className="flex items-start justify-between gap-4">
          <Link href="/dashboard" className="block min-w-0" onClick={onNavigate}>
            <BrandLogo variant="stacked" className="w-[11.5rem]" />
            <span className="mt-4 block text-2xl text-stone-950">Private Banking</span>
          </Link>

          {onClose ? (
            <button
              aria-label="Close navigation menu"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white px-4 text-sm font-medium text-stone-600 transition hover:border-stone-300 hover:text-stone-950"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          ) : null}
        </div>

        <p className="mt-3 text-sm leading-6 text-stone-600">
          Account access, cards, transfers, support, and security in one customer
          workspace.
        </p>
      </div>

      <nav className="mt-6 flex-1 space-y-6 overflow-y-auto pb-6">
        {dashboardSections.map((section) => (
          <section key={section.label} className="space-y-3">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "block rounded-2xl px-3 py-3 text-sm font-medium transition",
                      active
                        ? "bg-accent-soft text-stone-950"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-950",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>

      <form action="/api/logout" method="post">
        <button
          className="inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-medium text-white transition hover:bg-accent-deep"
          type="submit"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
