import { NextResponse } from "next/server";
import { privateAccessConfig } from "@/lib/private-access";
import { clearPrivateAccess } from "@/lib/private-access.server";

function buildRedirect(request: Request, path: string) {
  return new URL(path, request.url);
}

export async function POST(request: Request) {
  const response = NextResponse.redirect(buildRedirect(request, privateAccessConfig.loginPath), 303);
  clearPrivateAccess(response);
  return response;
}

export function GET(request: Request) {
  return NextResponse.redirect(buildRedirect(request, privateAccessConfig.loginPath), 303);
}
