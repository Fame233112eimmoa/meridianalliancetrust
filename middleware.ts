import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { privateAccessConfig, privateAccessCookieNames } from "@/lib/private-access";
import { buildRedirectUrl } from "@/lib/request-url";

const encoder = new TextEncoder();

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function getRequiredPrivateAccessEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} must be configured for protected private access.`);
  }

  return value;
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

async function createSignature(key: string, value: string) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(value));
  return toHex(signature);
}

function getApprovedEmail() {
  return normalizeEmail(getRequiredPrivateAccessEnv("PRIVATE_ACCESS_EMAIL"));
}

function getApprovedPassword() {
  return getRequiredPrivateAccessEnv("PRIVATE_ACCESS_PASSWORD");
}

function getApprovedOtp() {
  return getRequiredPrivateAccessEnv("PRIVATE_ACCESS_OTP");
}

async function getSessionSecret() {
  return getRequiredPrivateAccessEnv("PRIVATE_ACCESS_SESSION_SECRET");
}

async function hasValidCookie(
  scope: "pending" | "authenticated",
  value?: string,
) {
  if (!value) {
    return false;
  }

  const separatorIndex = value.lastIndexOf(".");

  if (separatorIndex <= 0) {
    return false;
  }

  const email = normalizeEmail(value.slice(0, separatorIndex));
  const signature = value.slice(separatorIndex + 1);
  const expectedSignature = await createSignature(
    await getSessionSecret(),
    `${scope}:${email}`,
  );

  return email === getApprovedEmail() && signature === expectedSignature;
}

function clearPrivateCookies(response: NextResponse) {
  response.cookies.delete(privateAccessCookieNames.pending);
  response.cookies.delete(privateAccessCookieNames.authenticated);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authenticated = await hasValidCookie(
    "authenticated",
    request.cookies.get(privateAccessCookieNames.authenticated)?.value,
  );

  if (pathname.startsWith(privateAccessConfig.portalPath)) {
    if (authenticated) {
      return NextResponse.next();
    }

    const response = NextResponse.redirect(
      buildRedirectUrl(request, privateAccessConfig.loginPath),
    );
    clearPrivateCookies(response);
    return response;
  }

  if (pathname.startsWith(privateAccessConfig.otpPath)) {
    if (authenticated) {
      return NextResponse.redirect(buildRedirectUrl(request, privateAccessConfig.portalPath));
    }

    const pending = await hasValidCookie(
      "pending",
      request.cookies.get(privateAccessCookieNames.pending)?.value,
    );

    if (pending) {
      return NextResponse.next();
    }

    const response = NextResponse.redirect(
      buildRedirectUrl(request, privateAccessConfig.loginPath),
    );
    clearPrivateCookies(response);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login/otp/:path*", "/dashboard/:path*"],
};
