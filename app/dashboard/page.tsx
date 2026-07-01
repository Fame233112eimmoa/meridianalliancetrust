import type { Metadata } from "next";
import { DashboardRoutePage } from "@/components/dashboard/dashboard-route-page";
import { getDashboardPageFromHref } from "@/lib/dashboard-data";
import { buildPrivateMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPrivateMetadata({
  path: "/dashboard",
  title: "Dashboard",
  description: "Protected dashboard with account summary, cards, payments, security, and support.",
});

export default function DashboardPage() {
  const page = getDashboardPageFromHref("/dashboard");

  if (!page) {
    throw new Error("Dashboard home page is not configured.");
  }

  return <DashboardRoutePage page={page} />;
}
