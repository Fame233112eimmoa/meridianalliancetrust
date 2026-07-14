import type { ReactNode } from "react";
import { BrandLogo } from "@/components/site/brand-logo";

type ClientAccessShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function ClientAccessShell({
  eyebrow,
  title,
  description,
  children,
}: ClientAccessShellProps) {
  return (
    <main className="section-shell flex min-h-screen items-center py-10 sm:py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="panel overflow-hidden bg-[linear-gradient(160deg,#230608_0%,#5f1419_48%,#8B1E24_100%)] p-8 text-white sm:p-10">
          <BrandLogo variant="stacked" className="w-40 brightness-[1.9] contrast-[0.9]" />
          <p className="mt-8 text-xs uppercase tracking-[0.28em] text-white/60">{eyebrow}</p>
          <h1 className="mt-4 max-w-xl text-4xl leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/78">{description}</p>
          <div className="mt-10 grid gap-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-4 text-sm leading-7 text-white/78">
              Dashboard access is limited to the approved credentials, a one-time passcode, and
              a signed server session.
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-4 text-sm leading-7 text-white/78">
              Update the configured customer number, password, or OTP later from your environment
              settings and redeploy whenever you need to rotate access.
            </div>
          </div>
        </section>

        <section className="panel p-6 sm:p-8 lg:p-10">{children}</section>
      </div>
    </main>
  );
}
