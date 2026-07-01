import type { NextRequest } from "next/server";

function getForwardedValue(value: string | null) {
  return value?.split(",")[0]?.trim() || "";
}

export function buildRedirectUrl(request: NextRequest, path: string) {
  const host =
    getForwardedValue(request.headers.get("x-forwarded-host")) ||
    getForwardedValue(request.headers.get("host")) ||
    request.nextUrl.host;
  const protocol =
    getForwardedValue(request.headers.get("x-forwarded-proto")) ||
    request.nextUrl.protocol.replace(/:$/, "");

  return new URL(path, `${protocol}://${host}`);
}
