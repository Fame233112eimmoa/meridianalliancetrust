"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/site/brand-logo";
import { Button } from "@/components/ui/button";
import { publicNav } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-white/90 backdrop-blur">
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="min-w-0" aria-label="Go to Meridian Alliance Trust UK home">
          <BrandLogo
            variant="horizontal"
            className="w-[11.5rem] max-w-full sm:w-[13rem] lg:w-[14.5rem]"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {publicNav.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition",
                  active ? "text-stone-950" : "text-stone-600 hover:text-stone-950",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/support" variant="ghost">
            Support
          </Button>
          <Button href="/login">Login</Button>
        </div>

        <button
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-stone-900 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span className="text-lg">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-stone-200 bg-white lg:hidden">
          <div className="section-shell flex flex-col gap-4 py-5">
            <nav aria-label="Mobile primary" className="flex flex-col gap-4">
              {publicNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-stone-700"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pt-2">
              <Button href="/support" variant="secondary">
                Support
              </Button>
              <Button href="/login">Login</Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
