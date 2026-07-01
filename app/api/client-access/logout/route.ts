import { NextRequest, NextResponse } from "next/server";
import { privateAccessConfig } from "@/lib/private-access";
import { clearPrivateAccess } from "@/lib/private-access.server";
import { buildRedirectUrl } from "@/lib/request-url";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(
    buildRedirectUrl(request, privateAccessConfig.loginPath),
    303,
  );
  clearPrivateAccess(response);
  return response;
}

export function GET(request: NextRequest) {
  return NextResponse.redirect(buildRedirectUrl(request, privateAccessConfig.loginPath), 303);
}
