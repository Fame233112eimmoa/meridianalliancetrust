export const privateAccessConfig = {
  accountName: "Richard Bachman",
  loginPath: "/login",
  otpPath: "/login/otp",
  portalPath: "/dashboard",
} as const;

export const privateAccessCookieNames = {
  pending: "meridian-private-access-pending",
  authenticated: "meridian-private-access-authenticated",
} as const;

const privateAccessErrors = {
  credentials: "The customer number or password entered is not approved for this login.",
  otp: "The OTP entered is not approved for this login.",
  unavailable: "Private access is temporarily unavailable because the required login settings are not configured.",
} as const;

export function resolvePrivateAccessError(error?: string | string[]) {
  const errorKey = Array.isArray(error) ? error[0] : error;

  return errorKey && errorKey in privateAccessErrors
    ? privateAccessErrors[errorKey as keyof typeof privateAccessErrors]
    : "";
}
