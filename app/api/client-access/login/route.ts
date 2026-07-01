import { NextRequest, NextResponse } from "next/server";
import { privateAccessConfig } from "@/lib/private-access";
import {
  clearPrivateAccess,
  hasPrivateAccessConfiguration,
  isApprovedEmail,
  isApprovedPassword,
  setPendingAccess,
} from "@/lib/private-access.server";
import { buildRedirectUrl } from "@/lib/request-url";

export async function POST(request: NextRequest) {
  if (!hasPrivateAccessConfiguration()) {
    const response = NextResponse.redirect(
      buildRedirectUrl(request, `${privateAccessConfig.loginPath}?error=unavailable`),
      303,
    );

    clearPrivateAccess(response);
    return response;
  }

  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!isApprovedEmail(email) || !isApprovedPassword(password)) {
    const response = NextResponse.redirect(
      buildRedirectUrl(request, `${privateAccessConfig.loginPath}?error=credentials`),
      303,
    );

    clearPrivateAccess(response);
    return response;
  }

  const response = NextResponse.redirect(buildRedirectUrl(request, privateAccessConfig.otpPath), 303);
  setPendingAccess(response);
  return response;
}

export function GET(request: NextRequest) {
  return NextResponse.redirect(buildRedirectUrl(request, privateAccessConfig.loginPath), 303);
}
