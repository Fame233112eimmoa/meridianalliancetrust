import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";
import {
  getPrivateAccessCredentialValue,
  hasPrivateAccessCredentialConfiguration,
} from "@/lib/private-access-credentials";
import { privateAccessConfig, privateAccessCookieNames } from "@/lib/private-access";

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

function getApprovedCustomerNumber() {
  return normalizeCustomerNumber(getPrivateAccessCredentialValue("customerNumber"));
}

function getApprovedPassword() {
  return getPrivateAccessCredentialValue("password");
}

function getApprovedOtp() {
  return getPrivateAccessCredentialValue("otp");
}

function getSessionSecret() {
  return getPrivateAccessCredentialValue("sessionSecret");
}

function buildSignature(scope: "pending" | "authenticated", customerNumber: string) {
  return createHmac("sha256", getSessionSecret())
    .update(`${scope}:${customerNumber}`)
    .digest("hex");
}

function buildCookieValue(scope: "pending" | "authenticated") {
  const customerNumber = getApprovedCustomerNumber();
  return `${customerNumber}.${buildSignature(scope, customerNumber)}`;
}

function readCookieValue(scope: "pending" | "authenticated", value?: string) {
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

  if (!safeEqual(normalizedCustomerNumber, getApprovedCustomerNumber())) {
    return null;
  }

  return normalizedCustomerNumber;
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

export function hasPrivateAccessConfiguration() {
  return hasPrivateAccessCredentialConfiguration();
}

export function isApprovedCustomerNumber(customerNumber: string) {
  return safeEqual(
    normalizeCustomerNumber(customerNumber),
    getApprovedCustomerNumber(),
  );
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

export function getApprovedPrivateAccessCustomerNumber() {
  return getPrivateAccessCredentialValue("customerNumber");
}

export function getPrivateAccessPortalSummary() {
  return {
    accountName: privateAccessConfig.accountName,
    approvedCustomerNumber: getApprovedPrivateAccessCustomerNumber(),
  };
}
