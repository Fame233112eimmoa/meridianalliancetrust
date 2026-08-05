export const privateAccessCredentialProfileIds = ["primary", "secondary"] as const;

export type PrivateAccessCredentialProfileId =
  (typeof privateAccessCredentialProfileIds)[number];

export type PrivateAccessCredentialProfile = {
  id: PrivateAccessCredentialProfileId;
  accountName: string;
  customerNumber: string;
  password: string;
  otp: string;
};

type PrivateAccessCredentialField = Omit<PrivateAccessCredentialProfile, "id">;

const privateAccessCredentialProfileDefaults: Record<
  PrivateAccessCredentialProfileId,
  PrivateAccessCredentialField
> = {
  primary: {
    accountName: "Richard Bachman",
    customerNumber: "MTB-1024",
    password: "Friendly2026",
    otp: "500300",
  },
  secondary: {
    accountName: "Thayenne L. Dancini",
    customerNumber: "MTB-2048",
    password: "Harbor2026",
    otp: "700900",
  },
};

const privateAccessCredentialProfileEnvNames: Record<
  PrivateAccessCredentialProfileId,
  Record<keyof PrivateAccessCredentialField, string>
> = {
  primary: {
    accountName: "PRIVATE_ACCESS_ACCOUNT_NAME",
    customerNumber: "PRIVATE_ACCESS_CUSTOMER_NUMBER",
    password: "PRIVATE_ACCESS_PASSWORD",
    otp: "PRIVATE_ACCESS_OTP",
  },
  secondary: {
    accountName: "PRIVATE_ACCESS_ACCOUNT_NAME_2",
    customerNumber: "PRIVATE_ACCESS_CUSTOMER_NUMBER_2",
    password: "PRIVATE_ACCESS_PASSWORD_2",
    otp: "PRIVATE_ACCESS_OTP_2",
  },
};

const sessionSecretEnvName = "PRIVATE_ACCESS_SESSION_SECRET";
const sessionSecretDefault = "meridian-private-access-demo-session-secret-2026-07-14";

function getProfileValue(
  profileId: PrivateAccessCredentialProfileId,
  field: keyof PrivateAccessCredentialField,
) {
  const envName = privateAccessCredentialProfileEnvNames[profileId][field];
  return process.env[envName]?.trim() || privateAccessCredentialProfileDefaults[profileId][field];
}

export function getPrivateAccessCredentialProfiles(): PrivateAccessCredentialProfile[] {
  return privateAccessCredentialProfileIds.map((profileId) => ({
    id: profileId,
    accountName: getProfileValue(profileId, "accountName"),
    customerNumber: getProfileValue(profileId, "customerNumber"),
    password: getProfileValue(profileId, "password"),
    otp: getProfileValue(profileId, "otp"),
  }));
}

export function getPrivateAccessSessionSecret() {
  return process.env[sessionSecretEnvName]?.trim() || sessionSecretDefault;
}

export function hasPrivateAccessCredentialConfiguration() {
  return (
    Boolean(getPrivateAccessSessionSecret()) &&
    getPrivateAccessCredentialProfiles().every(
      (profile) =>
        Boolean(profile.accountName) &&
        Boolean(profile.customerNumber) &&
        Boolean(profile.password) &&
        Boolean(profile.otp),
    )
  );
}
