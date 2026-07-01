"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <main className="section-shell py-6 sm:py-8">
      <div className="mb-4 flex justify-end lg:hidden">
        <button
          aria-controls="dashboard-mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          aria-label="Open navigation menu"
          className="inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-950 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition hover:border-stone-300 hover:bg-stone-50"
          onClick={() => setIsMobileMenuOpen(true)}
          type="button"
        >
          <span aria-hidden="true" className="flex flex-col gap-1">
            <span className="h-0.5 w-4 rounded-full bg-current" />
            <span className="h-0.5 w-4 rounded-full bg-current" />
            <span className="h-0.5 w-4 rounded-full bg-current" />
          </span>
          Menu
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-stone-950/35 backdrop-blur-[2px]"
            onClick={() => setIsMobileMenuOpen(false)}
            type="button"
          />

          <aside
            id="dashboard-mobile-navigation"
            className="panel absolute inset-y-4 left-4 w-[min(18rem,calc(100vw-2rem))] overflow-y-auto px-5 py-6 shadow-soft"
          >
            <Sidebar
              onClose={() => setIsMobileMenuOpen(false)}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />
          </aside>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="panel hidden px-5 py-6 lg:sticky lg:top-6 lg:block lg:h-[calc(100vh-3rem)] lg:overflow-y-auto">
          <Sidebar />
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
