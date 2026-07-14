import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { privateAccessConfig } from "@/lib/private-access";
import { buildPrivateMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPrivateMetadata({
  path: "/client-access/portal",
  title: "Dashboard Redirect",
  description: "Legacy dashboard path redirect for Meridian Alliance Trust UK.",
});

export default function ClientAccessPortalPage() {
  redirect(privateAccessConfig.portalPath);
}
