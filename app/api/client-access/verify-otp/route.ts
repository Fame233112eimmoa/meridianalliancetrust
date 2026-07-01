import { NextRequest, NextResponse } from "next/server";
import { privateAccessConfig } from "@/lib/private-access";
import {
  clearPrivateAccess,
  hasPendingAccessFromRequest,
  isApprovedOtp,
  setAuthenticatedAccess,
} from "@/lib/private-access.server";
import { buildRedirectUrl } from "@/lib/request-url";

export async function POST(request: NextRequest) {
  if (!hasPendingAccessFromRequest(request)) {
    const response = NextResponse.redirect(
      buildRedirectUrl(request, privateAccessConfig.loginPath),
      303,
    );
    clearPrivateAccess(response);
    return response;
  }

  const formData = await request.formData();
  const otp = String(formData.get("otp") || "");

  if (!isApprovedOtp(otp)) {
    return NextResponse.redirect(
      buildRedirectUrl(request, `${privateAccessConfig.otpPath}?error=otp`),
      303,
    );
  }

  const response = NextResponse.redirect(
    buildRedirectUrl(request, privateAccessConfig.portalPath),
    303,
  );
  setAuthenticatedAccess(response);
  return response;
}

export function GET(request: NextRequest) {
  return NextResponse.redirect(buildRedirectUrl(request, privateAccessConfig.loginPath), 303);
}
