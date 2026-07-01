import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/auth-page";
import {
  resolvePrivateAccessError,
} from "@/lib/private-access";
import { buildPrivateMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPrivateMetadata({
  path: "/login",
  title: "Login",
  description: "Secure login for the Meridian Alliance Trust UK dashboard.",
});

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const error = resolvePrivateAccessError(params?.error);

  return (
    <AuthPage error={error} />
  );
}
