import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";
import {
  getPrivateAccessCredentialProfiles,
  getPrivateAccessSessionSecret,
  hasPrivateAccessCredentialConfiguration,
} from "@/lib/private-access-credentials";
import { privateAccessConfig, privateAccessCookieNames } from "@/lib/private-access";
import {
  findPrivateAccessProfileByCustomerNumber,
  type PrivateAccessProfile,
} from "@/lib/private-access-profiles";

function normalizeCustomerNumber(value: string) {
  return value.trim().toUpperCase();
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function buildSignature(scope: "pending" | "authenticated", customerNumber: string) {
  return createHmac("sha256", getPrivateAccessSessionSecret())
    .update(`${scope}:${customerNumber}`)
    .digest("hex");
}

function buildCookieValue(scope: "pending" | "authenticated", customerNumber: string) {
  const normalizedCustomerNumber = normalizeCustomerNumber(customerNumber);
  return `${normalizedCustomerNumber}.${buildSignature(scope, normalizedCustomerNumber)}`;
}

function readCustomerNumberFromCookieValue(
  scope: "pending" | "authenticated",
  value?: string,
) {
  if (!value) {
    return null;
  }

  const separatorIndex = value.lastIndexOf(".");

  if (separatorIndex <= 0) {
    return null;
  }

  const customerNumber = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);
  const normalizedCustomerNumber = normalizeCustomerNumber(customerNumber);
  const expectedSignature = buildSignature(scope, normalizedCustomerNumber);

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  return findPrivateAccessProfileByCustomerNumber(normalizedCustomerNumber)
    ? normalizedCustomerNumber
    : null;
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

function getProfileByCustomerNumber(customerNumber: string) {
  return findPrivateAccessProfileByCustomerNumber(customerNumber);
}

export function hasPrivateAccessConfiguration() {
  return hasPrivateAccessCredentialConfiguration();
}

export function getPrivateAccessProfileForCredentials(
  customerNumber: string,
  password: string,
) {
  const profile = getProfileByCustomerNumber(customerNumber);

  if (!profile) {
    return null;
  }

  return safeEqual(password, profile.password) ? profile : null;
}

export function isApprovedOtpForProfile(profile: PrivateAccessProfile, otp: string) {
  return safeEqual(otp.trim(), profile.otp.trim());
}

export function getPendingCustomerNumberFromRequest(request: NextRequest) {
  return readCustomerNumberFromCookieValue(
    "pending",
    request.cookies.get(privateAccessCookieNames.pending)?.value,
  );
}

export function getPendingPrivateAccessProfileFromRequest(request: NextRequest) {
  const customerNumber = getPendingCustomerNumberFromRequest(request);
  return customerNumber ? getProfileByCustomerNumber(customerNumber) : null;
}

export function hasPendingAccessFromRequest(request: NextRequest) {
  return Boolean(getPendingCustomerNumberFromRequest(request));
}

export function getAuthenticatedCustomerNumberFromCookieValue(value?: string) {
  return readCustomerNumberFromCookieValue("authenticated", value);
}

export function getAuthenticatedPrivateAccessProfileFromCookieValue(value?: string) {
  const customerNumber = getAuthenticatedCustomerNumberFromCookieValue(value);
  return customerNumber ? getProfileByCustomerNumber(customerNumber) : null;
}

export function hasPendingAccessFromCookieValue(value?: string) {
  return Boolean(readCustomerNumberFromCookieValue("pending", value));
}

export function hasAuthenticatedAccessFromCookieValue(value?: string) {
  return Boolean(readCustomerNumberFromCookieValue("authenticated", value));
}

export function setPendingAccess(response: NextResponse, customerNumber: string) {
  setCookie(
    response,
    privateAccessCookieNames.pending,
    buildCookieValue("pending", customerNumber),
    15 * 60,
  );
  response.cookies.delete(privateAccessCookieNames.authenticated);
}

export function setAuthenticatedAccess(response: NextResponse, customerNumber: string) {
  setCookie(
    response,
    privateAccessCookieNames.authenticated,
    buildCookieValue("authenticated", customerNumber),
    8 * 60 * 60,
  );
  response.cookies.delete(privateAccessCookieNames.pending);
}

export function clearPrivateAccess(response: NextResponse) {
  response.cookies.delete(privateAccessCookieNames.pending);
  response.cookies.delete(privateAccessCookieNames.authenticated);
}

export function getApprovedPrivateAccessCustomerNumber() {
  return getPrivateAccessCredentialProfiles()[0]?.customerNumber || "";
}

export function getPrivateAccessPortalSummary(customerNumber?: string) {
  const profile = customerNumber
    ? getProfileByCustomerNumber(customerNumber)
    : getProfileByCustomerNumber(getApprovedPrivateAccessCustomerNumber());

  return {
    accountName: profile?.customerProfile.fullName || privateAccessConfig.accountName,
    approvedCustomerNumber: profile?.customerNumber || getApprovedPrivateAccessCustomerNumber(),
  };
}
