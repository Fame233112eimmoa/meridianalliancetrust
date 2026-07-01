import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { DashboardRoutePage } from "@/components/dashboard/dashboard-route-page";
import { getDashboardPageFromSlug } from "@/lib/dashboard-data";
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
  const resolvedParams = await params;
  const routePath = resolvedParams.slug.join("/");

  if (retiredCardRoutes.has(routePath)) {
    redirect("/dashboard/cards");
  }

  const page = getDashboardPageFromSlug(resolvedParams.slug);

  if (!page) {
    notFound();
  }

  return <DashboardRoutePage page={page} />;
}
