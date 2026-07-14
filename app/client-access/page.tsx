import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { privateAccessConfig } from "@/lib/private-access";
import { buildPrivateMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPrivateMetadata({
  path: "/client-access",
  title: "Login Redirect",
  description: "Legacy login path redirect for Meridian Alliance Trust USA.",
});

export default function ClientAccessPage() {
  redirect(privateAccessConfig.loginPath);
}
