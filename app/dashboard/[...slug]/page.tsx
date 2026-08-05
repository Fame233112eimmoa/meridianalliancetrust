import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { DashboardRoutePage } from "@/components/dashboard/dashboard-route-page";
import { privateAccessConfig, privateAccessCookieNames } from "@/lib/private-access";
import { getDashboardPageFromSlug } from "@/lib/dashboard-data";
import {
  getAuthenticatedPrivateAccessProfileFromCookieValue,
  hasPrivateAccessConfiguration,
} from "@/lib/private-access.server";
import { buildPrivateMetadata } from "@/lib/seo";

type DashboardRoutePageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

const retiredCardRoutes = new Set([
  "cards/freeze-card",
  "cards/pin-management",
  "cards/replace-card",
]);

export async function generateMetadata({
  params,
}: DashboardRoutePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const page = getDashboardPageFromSlug(resolvedParams.slug);

  if (!page) {
    return buildPrivateMetadata({
      path: "/dashboard",
      title: "Dashboard",
      description: "Protected dashboard for Meridian Alliance Trust UK.",
    });
  }

  return buildPrivateMetadata({
    path: page.href,
    title: page.title,
    description: page.description,
  });
}

export default async function DashboardNestedRoutePage({
  params,
}: DashboardRoutePageProps) {
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

  const resolvedParams = await params;
  const routePath = resolvedParams.slug.join("/");

  if (retiredCardRoutes.has(routePath)) {
    redirect("/dashboard/cards");
  }

  const page = getDashboardPageFromSlug(resolvedParams.slug);

  if (!page) {
    notFound();
  }

  return <DashboardRoutePage page={page} profile={profile} />;
}
