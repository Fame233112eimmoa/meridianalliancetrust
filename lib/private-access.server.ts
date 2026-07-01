import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";
import { privateAccessConfig, privateAccessCookieNames } from "@/lib/private-access";

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

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
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

function getSessionSecret() {
  return getRequiredPrivateAccessEnv("PRIVATE_ACCESS_SESSION_SECRET");
}

function buildSignature(scope: "pending" | "authenticated", email: string) {
  return createHmac("sha256", getSessionSecret())
    .update(`${scope}:${email}`)
    .digest("hex");
}

function buildCookieValue(scope: "pending" | "authenticated") {
  const email = getApprovedEmail();
  return `${email}.${buildSignature(scope, email)}`;
}

function readCookieValue(scope: "pending" | "authenticated", value?: string) {
  if (!value) {
    return null;
  }

  const separatorIndex = value.lastIndexOf(".");

  if (separatorIndex <= 0) {
    return null;
  }

  const email = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);
  const normalizedEmail = normalizeEmail(email);
  const expectedSignature = buildSignature(scope, normalizedEmail);

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  if (!safeEqual(normalizedEmail, getApprovedEmail())) {
    return null;
  }

  return normalizedEmail;
}

function setCookie(
  response: NextResponse,
  name: string,
  value: string,
  maxAge: number,
) {
  response.cookies.set(name, value, {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function isApprovedEmail(email: string) {
  return safeEqual(normalizeEmail(email), getApprovedEmail());
}

export function isApprovedPassword(password: string) {
  return safeEqual(password, getApprovedPassword());
}

export function isApprovedOtp(otp: string) {
  return safeEqual(otp.trim(), getApprovedOtp());
}

export function hasPendingAccessFromRequest(request: NextRequest) {
  return Boolean(
    readCookieValue("pending", request.cookies.get(privateAccessCookieNames.pending)?.value),
  );
}

export function hasAuthenticatedAccessFromRequest(request: NextRequest) {
  return Boolean(
    readCookieValue(
      "authenticated",
      request.cookies.get(privateAccessCookieNames.authenticated)?.value,
    ),
  );
}

export function hasPendingAccessFromCookieValue(value?: string) {
  return Boolean(readCookieValue("pending", value));
}

export function hasAuthenticatedAccessFromCookieValue(value?: string) {
  return Boolean(readCookieValue("authenticated", value));
}

export function setPendingAccess(response: NextResponse) {
  setCookie(
    response,
    privateAccessCookieNames.pending,
    buildCookieValue("pending"),
    15 * 60,
  );
  response.cookies.delete(privateAccessCookieNames.authenticated);
}

export function setAuthenticatedAccess(response: NextResponse) {
  setCookie(
    response,
    privateAccessCookieNames.authenticated,
    buildCookieValue("authenticated"),
    8 * 60 * 60,
  );
  response.cookies.delete(privateAccessCookieNames.pending);
}

export function clearPrivateAccess(response: NextResponse) {
  response.cookies.delete(privateAccessCookieNames.pending);
  response.cookies.delete(privateAccessCookieNames.authenticated);
}

export function getApprovedPrivateAccessEmail() {
  return getRequiredPrivateAccessEnv("PRIVATE_ACCESS_EMAIL");
}

export function getPrivateAccessPortalSummary() {
  return {
    accountName: privateAccessConfig.accountName,
    approvedEmail: getApprovedPrivateAccessEmail(),
  };
}
