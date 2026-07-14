export const privateAccessCredentialKeys = [
  "customerNumber",
  "password",
  "otp",
  "sessionSecret",
] as const;

export type PrivateAccessCredentialKey =
  (typeof privateAccessCredentialKeys)[number];

const privateAccessCredentialDefaults: Record<PrivateAccessCredentialKey, string> = {
  customerNumber: "MTB-1024",
  password: "Friendly2026",
  otp: "500300",
  sessionSecret: "meridian-private-access-demo-session-secret-2026-07-14",
};

const privateAccessCredentialEnvNames: Record<PrivateAccessCredentialKey, string> = {
  customerNumber: "PRIVATE_ACCESS_CUSTOMER_NUMBER",
  password: "PRIVATE_ACCESS_PASSWORD",
  otp: "PRIVATE_ACCESS_OTP",
  sessionSecret: "PRIVATE_ACCESS_SESSION_SECRET",
};

export function getPrivateAccessCredentialValue(key: PrivateAccessCredentialKey) {
  const envName = privateAccessCredentialEnvNames[key];
  return process.env[envName]?.trim() || privateAccessCredentialDefaults[key];
}

export function hasPrivateAccessCredentialConfiguration() {
  return privateAccessCredentialKeys.every((key) =>
    Boolean(getPrivateAccessCredentialValue(key)),
  );
}

