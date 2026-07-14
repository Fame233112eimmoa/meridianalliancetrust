import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { privateAccessConfig } from "@/lib/private-access";
import { buildPrivateMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPrivateMetadata({
  path: "/client-access/otp",
  title: "OTP Redirect",
  description: "Legacy OTP path redirect for Meridian Alliance Trust USA.",
});

export default function ClientAccessOtpPage() {
  redirect(privateAccessConfig.otpPath);
}
