import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/auth-page";
import {
  resolvePrivateAccessError,
} from "@/lib/private-access";
import { hasPrivateAccessConfiguration } from "@/lib/private-access.server";
import { buildPrivateMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPrivateMetadata({
  path: "/login",
  title: "Login",
  description: "Secure login for the Meridian Alliance Trust USA dashboard.",
});

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const error = !hasPrivateAccessConfiguration()
    ? resolvePrivateAccessError("unavailable")
    : resolvePrivateAccessError(params?.error);

  return (
    <AuthPage error={error} />
  );
}
