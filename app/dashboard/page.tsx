import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardRoutePage } from "@/components/dashboard/dashboard-route-page";
import { privateAccessConfig, privateAccessCookieNames } from "@/lib/private-access";
import { getDashboardPageFromHref } from "@/lib/dashboard-data";
import {
  getAuthenticatedPrivateAccessProfileFromCookieValue,
  hasPrivateAccessConfiguration,
} from "@/lib/private-access.server";
import { buildPrivateMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPrivateMetadata({
  path: "/dashboard",
  title: "Dashboard",
  description: "Protected dashboard with account summary, cards, payments, security, and support.",
});

export default async function DashboardPage() {
  if (!hasPrivateAccessConfiguration()) {
    redirect(`${privateAccessConfig.loginPath}?error=unavailable`);
  }

  const cookieStore = await cookies();
  const profile = getAuthenticatedPrivateAccessProfileFromCookieValue(
    cookieStore.get(privateAccessCookieNames.authenticated)?.value,
  );

  if (!profile) {
    redirect(privateAccessConfig.loginPath);
  }

  const page = getDashboardPageFromHref("/dashboard");

  if (!page) {
    throw new Error("Dashboard home page is not configured.");
  }

  return <DashboardRoutePage page={page} profile={profile} />;
}
