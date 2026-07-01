import { NextResponse } from "next/server";
import { privateAccessConfig } from "@/lib/private-access";
import {
  clearPrivateAccess,
  isApprovedEmail,
  isApprovedPassword,
  setPendingAccess,
} from "@/lib/private-access.server";

function buildRedirect(request: Request, path: string) {
  return new URL(path, request.url);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!isApprovedEmail(email) || !isApprovedPassword(password)) {
    const response = NextResponse.redirect(
      buildRedirect(request, `${privateAccessConfig.loginPath}?error=credentials`),
      303,
    );

    clearPrivateAccess(response);
    return response;
  }

  const response = NextResponse.redirect(buildRedirect(request, privateAccessConfig.otpPath), 303);
  setPendingAccess(response);
  return response;
}

export function GET(request: Request) {
  return NextResponse.redirect(buildRedirect(request, privateAccessConfig.loginPath), 303);
}
