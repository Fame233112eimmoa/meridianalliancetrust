import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { privateAccessConfig, privateAccessCookieNames } from "@/lib/private-access";
import {
  getAuthenticatedPrivateAccessProfileFromCookieValue,
  hasPrivateAccessConfiguration,
} from "@/lib/private-access.server";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  if (!hasPrivateAccessConfiguration()) {
    redirect(`${privateAccessConfig.loginPath}?error=unavailable`);
  }

  const cookieStore = await cookies();
  const authenticatedProfile = getAuthenticatedPrivateAccessProfileFromCookieValue(
    cookieStore.get(privateAccessCookieNames.authenticated)?.value,
  );

  if (!authenticatedProfile) {
    redirect(privateAccessConfig.loginPath);
  }

  return <DashboardShell>{children}</DashboardShell>;
}
