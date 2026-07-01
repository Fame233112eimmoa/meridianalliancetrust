import type { ReactNode } from "react";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

type PublicShellProps = {
  children: ReactNode;
};

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

