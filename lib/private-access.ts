export const privateAccessConfig = {
  accountName: process.env.PRIVATE_ACCESS_ACCOUNT_NAME?.trim() || "Thayenne L. Dancini",
  loginPath: "/login",
  otpPath: "/login/otp",
  portalPath: "/dashboard",
} as const;

export const privateAccessCookieNames = {
  pending: "meridian-private-access-pending",
  authenticated: "meridian-private-access-authenticated",
} as const;

const privateAccessErrors = {
  credentials: "The email or password entered is not approved for this login.",
  otp: "The OTP entered is not approved for this login.",
} as const;

export function resolvePrivateAccessError(error?: string | string[]) {
  const errorKey = Array.isArray(error) ? error[0] : error;

  return errorKey && errorKey in privateAccessErrors
    ? privateAccessErrors[errorKey as keyof typeof privateAccessErrors]
    : "";
}
