import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OtpPage } from "@/components/auth/otp-page";
import {
  privateAccessConfig,
  privateAccessCookieNames,
  resolvePrivateAccessError,
} from "@/lib/private-access";
import {
  hasAuthenticatedAccessFromCookieValue,
  hasPrivateAccessConfiguration,
  hasPendingAccessFromCookieValue,
} from "@/lib/private-access.server";
import { buildPrivateMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPrivateMetadata({
  path: "/login/otp",
  title: "OTP Verification",
  description: "OTP verification for the Meridian Alliance Trust USA dashboard login.",
});

type LoginOtpPageProps = {
  searchParams?: Promise<{
    error?: string | string[];
  }>;
};

export default async function LoginOtpPage({ searchParams }: LoginOtpPageProps) {
  if (!hasPrivateAccessConfiguration()) {
    redirect(`${privateAccessConfig.loginPath}?error=unavailable`);
  }

  const cookieStore = await cookies();
  const authenticated = hasAuthenticatedAccessFromCookieValue(
    cookieStore.get(privateAccessCookieNames.authenticated)?.value,
  );

  if (authenticated) {
    redirect(privateAccessConfig.portalPath);
  }

  const pending = hasPendingAccessFromCookieValue(
    cookieStore.get(privateAccessCookieNames.pending)?.value,
  );

  if (!pending) {
    redirect(privateAccessConfig.loginPath);
  }

  const params = searchParams ? await searchParams : undefined;
  const error = resolvePrivateAccessError(params?.error);

  return (
    <OtpPage error={error} />
  );
}
