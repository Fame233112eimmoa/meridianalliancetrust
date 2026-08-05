import {
  getPrivateAccessCredentialProfiles,
  type PrivateAccessCredentialProfile,
  type PrivateAccessCredentialProfileId,
} from "@/lib/private-access-credentials";
import type { Account, BankCard, Transaction } from "@/lib/site-data";

export type ActivityItem = {
  title: string;
  detail: string;
  time: string;
};

export type TrustedDevice = {
  name: string;
  location: string;
  lastActive: string;
  status: string;
};

export type PrivateAccessCustomerProfile = {
  firstName: string;
  lastName: string;
  fullName: string;
  customerId: string;
  relationshipManager: string;
  mailingAddress: string;
};

export type NotificationDelivery = {
  primaryMobile: string;
  pushNotifications: string;
  digestFrequency: string;
};

export type AccountDetails = {
  sortCode: string;
  checkingIban: string;
  savingsIban: string;
  branch: string;
  statementDelivery: string;
  clientTier: string;
  relationshipStatus: string;
};

export type SavingsSnapshot = {
  annualRate: string;
  lastInterestPayout: string;
  reserveGoalProgress: string;
  largestAllocation: string;
};

export type PaymentSummary = {
  scheduledPayments: string;
  pendingReview: string;
  outgoingThisMonth: string;
};

export type SecuritySummary = {
  score: string;
  recentAlerts: string;
};

export type PrivateAccessProfile = {
  id: PrivateAccessCredentialProfileId;
  accountName: string;
  customerNumber: string;
  password: string;
  otp: string;
  customerProfile: PrivateAccessCustomerProfile;
  accounts: Account[];
  transactions: Transaction[];
  cards: BankCard[];
  notifications: ActivityItem[];
  trustedDevices: TrustedDevice[];
  loginActivities: ActivityItem[];
  notificationDelivery: NotificationDelivery;
  accountDetails: AccountDetails;
  savingsSnapshot: SavingsSnapshot;
  paymentSummary: PaymentSummary;
  securitySummary: SecuritySummary;
  profileNotes: string[];
};

type PrivateAccessProfileTemplate = Omit<
  PrivateAccessProfile,
  "accountName" | "customerNumber" | "password" | "otp" | "customerProfile" | "id"
>;

const profileTemplates: Record<
  PrivateAccessCredentialProfileId,
  PrivateAccessProfileTemplate
> = {
  primary: {
    accounts: [
      {
        name: "Everyday Checking",
        number: "•••• 4021",
        balance: "£2,682,030.00",
        available: "£2,682,030.00",
        change: "+ £1,840.10 this month",
        description: "Primary account for daily spending, salary credits, and transfers.",
      },
      {
        name: "Reserve Savings",
        number: "•••• 1944",
        balance: "£2,550,000.00",
        available: "£2,550,000.00",
        change: "+ 2.10% annual interest",
        description: "Protected savings balance for long-term goals and emergency reserves.",
      },
    ],
    transactions: [
      {
        id: "txn-001",
        name: "Salary Credit",
        category: "Income",
        date: "14 Jan 2026",
        amount: "+ £7,450.00",
        type: "credit",
        account: "Checking",
        status: "posted",
      },
      {
        id: "txn-002",
        name: "Canary Wharf Rent",
        category: "Housing",
        date: "12 Jan 2026",
        amount: "- £2,140.00",
        type: "debit",
        account: "Checking",
        status: "posted",
      },
      {
        id: "txn-003",
        name: "Savings Transfer",
        category: "Internal Transfer",
        date: "10 Jan 2026",
        amount: "- £1,500.00",
        type: "debit",
        account: "Checking",
        status: "posted",
      },
      {
        id: "txn-004",
        name: "Interest Payout",
        category: "Savings",
        date: "09 Jan 2026",
        amount: "+ £150.21",
        type: "credit",
        account: "Savings",
        status: "posted",
      },
      {
        id: "txn-005",
        name: "Westminster Utilities",
        category: "Bill Payment",
        date: "06 Jan 2026",
        amount: "- £186.45",
        type: "debit",
        account: "Checking",
        status: "posted",
      },
      {
        id: "txn-006",
        name: "Global Merchant Refund",
        category: "Card Refund",
        date: "04 Jan 2026",
        amount: "+ £84.00",
        type: "credit",
        account: "Checking",
        status: "posted",
      },
    ],
    cards: [
      {
        id: "debit-8821",
        name: "Platinum Debit Card",
        type: "Debit",
        number: "•••• •••• •••• 8821",
        fullNumber: "4727 6018 3384 8821",
        expires: "08/29",
        status: "Active",
        linkedView: "Checking Account",
        description: "Primary day-to-day card controls linked to your checking account.",
        controls: [
          {
            id: "online-payments",
            label: "Online Payments",
            description: "Allow purchases on websites and mobile wallets.",
            enabled: true,
          },
          {
            id: "international-use",
            label: "International Use",
            description: "Permit overseas merchant and travel transactions.",
            enabled: true,
          },
          {
            id: "cash-withdrawals",
            label: "Cash Withdrawals",
            description: "Allow ATM cash access from the linked checking account.",
            enabled: true,
          },
        ],
        limits: [
          {
            label: "Daily Spending",
            value: "£5,000.00",
            description: "Maximum purchase volume across card and wallet payments per day.",
          },
          {
            label: "ATM Withdrawal",
            value: "£1,000.00",
            description: "Daily cash access limit for domestic and international ATMs.",
          },
          {
            label: "Contactless Cap",
            value: "£100.00",
            description: "Maximum tap amount before a chip-and-PIN prompt may be required.",
          },
        ],
      },
      {
        id: "credit-1147",
        name: "Signature Credit Card",
        type: "Credit",
        number: "•••• •••• •••• 1147",
        fullNumber: "5274 9123 6401 1147",
        expires: "01/30",
        status: "Active",
        linkedView: "Credit Facility",
        description: "Premium spending card with statement and repayment visibility.",
        controls: [
          {
            id: "online-payments",
            label: "Online Payments",
            description: "Allow ecommerce, subscriptions, and digital wallet spending.",
            enabled: true,
          },
          {
            id: "international-use",
            label: "International Use",
            description: "Permit cross-border and foreign currency transactions.",
            enabled: true,
          },
          {
            id: "cash-advance",
            label: "Cash Advance",
            description: "Allow cash access against the approved credit facility.",
            enabled: false,
          },
        ],
        limits: [
          {
            label: "Credit Line",
            value: "£12,000.00",
            description: "Total approved revolving facility for this card account.",
          },
          {
            label: "Available Credit",
            value: "£8,430.00",
            description: "Spending room currently available before the next statement cycle.",
          },
          {
            label: "Cash Access Limit",
            value: "£2,000.00",
            description: "Maximum same-day cash advance limit when enabled.",
          },
        ],
      },
    ],
    notifications: [
      {
        title: "International transfer approved",
        detail: "Your £2,400 transfer to Zurich was queued for next-day settlement.",
        time: "30 Jun 2026, 09:15",
      },
      {
        title: "New trusted device added",
        detail: "MacBook Pro signed in from London, United Kingdom.",
        time: "29 Jun 2026, 18:40",
      },
      {
        title: "Debit card used online",
        detail: "£128.90 spent at Kensington Travel on your Platinum Debit Card.",
        time: "29 Jun 2026, 14:05",
      },
    ],
    trustedDevices: [
      {
        name: "MacBook Pro",
        location: "London, United Kingdom",
        lastActive: "30 Jun 2026, 09:08",
        status: "Current session",
      },
      {
        name: "iPhone 15 Pro",
        location: "Manchester, United Kingdom",
        lastActive: "29 Jun 2026, 21:44",
        status: "Trusted",
      },
      {
        name: "iPad Air",
        location: "Leeds, United Kingdom",
        lastActive: "26 Jun 2026, 11:20",
        status: "Trusted",
      },
    ],
    loginActivities: [
      {
        title: "Successful login",
        detail: "MacBook Pro via biometric sign-in",
        time: "30 Jun 2026, 09:08",
      },
      {
        title: "OTP verification completed",
        detail: "iPhone 15 Pro accepted security code",
        time: "29 Jun 2026, 21:44",
      },
      {
        title: "Password updated",
        detail: "Security credentials refreshed from London session",
        time: "18 Jun 2026, 13:12",
      },
    ],
    notificationDelivery: {
      primaryMobile: "+44 7700 900123",
      pushNotifications: "Enabled on two trusted devices",
      digestFrequency: "Instant for security, daily for service notices",
    },
    accountDetails: {
      sortCode: "12-34-56",
      checkingIban: "GB82 MATR 1234 5612 3456 78",
      savingsIban: "GB82 MATR 1234 5676 5432 10",
      branch: "London Private Banking Centre",
      statementDelivery: "Paperless monthly statements",
      clientTier: "Meridian Premier",
      relationshipStatus: "Active and verified",
    },
    savingsSnapshot: {
      annualRate: "2.10%",
      lastInterestPayout: "£150.21",
      reserveGoalProgress: "84%",
      largestAllocation: "Emergency Reserve",
    },
    paymentSummary: {
      scheduledPayments: "4",
      pendingReview: "0",
      outgoingThisMonth: "£29,842.40",
    },
    securitySummary: {
      score: "96 / 100",
      recentAlerts: "0",
    },
    profileNotes: [
      "Relationship servicing is active and current.",
      "Paperless statements remain enabled for both accounts.",
      "Client identity and access checks are verified.",
    ],
  },
  secondary: {
    accounts: [
      {
        name: "Everyday Checking",
        number: "•••• 6812",
        balance: "£0.00",
        available: "£0.00",
        change: "+ £0.00 this month",
        description: "Daily banking account for spending, incoming credits, and transfers.",
      },
      {
        name: "Reserve Savings",
        number: "•••• 5508",
        balance: "£3,125,880.00",
        available: "£3,125,880.00",
        change: "+ 2.35% annual interest",
        description: "Long-term reserve balance allocated for cash protection and future plans.",
      },
    ],
    transactions: [
      {
        id: "txn-201",
        name: "Consulting Income",
        category: "Income",
        date: "27 Jul 2026",
        amount: "+ £12,300.00",
        type: "credit",
        account: "Checking",
        status: "posted",
      },
      {
        id: "txn-202",
        name: "Property Service Charge",
        category: "Property",
        date: "24 Jul 2026",
        amount: "- £1,285.00",
        type: "debit",
        account: "Checking",
        status: "posted",
      },
      {
        id: "txn-203",
        name: "Savings Allocation",
        category: "Internal Transfer",
        date: "21 Jul 2026",
        amount: "- £8,000.00",
        type: "debit",
        account: "Checking",
        status: "posted",
      },
      {
        id: "txn-204",
        name: "Interest Payout",
        category: "Savings",
        date: "18 Jul 2026",
        amount: "+ £228.10",
        type: "credit",
        account: "Savings",
        status: "posted",
      },
      {
        id: "txn-205",
        name: "Travel Concierge",
        category: "Card Payment",
        date: "16 Jul 2026",
        amount: "- £640.00",
        type: "debit",
        account: "Checking",
        status: "posted",
      },
      {
        id: "txn-206",
        name: "International Transfer Review",
        category: "Payments",
        date: "14 Jul 2026",
        amount: "- £15,500.00",
        type: "debit",
        account: "Checking",
        status: "on-hold",
        note: "Awaiting internal settlement review before release.",
      },
    ],
    cards: [
      {
        id: "debit-6614",
        name: "Premier Debit Card",
        type: "Debit",
        number: "•••• •••• •••• 6614",
        fullNumber: "4727 6018 3384 6614",
        expires: "11/29",
        status: "Active",
        linkedView: "Checking Account",
        description: "Primary debit card with everyday access and travel-ready controls.",
        controls: [
          {
            id: "online-payments",
            label: "Online Payments",
            description: "Allow purchases on websites and digital wallets.",
            enabled: true,
          },
          {
            id: "international-use",
            label: "International Use",
            description: "Permit overseas merchant, ATM, and travel activity.",
            enabled: true,
          },
          {
            id: "cash-withdrawals",
            label: "Cash Withdrawals",
            description: "Allow domestic and international ATM access.",
            enabled: true,
          },
        ],
        limits: [
          {
            label: "Daily Spending",
            value: "£7,500.00",
            description: "Maximum purchase volume allowed across the card per day.",
          },
          {
            label: "ATM Withdrawal",
            value: "£1,500.00",
            description: "Daily cash access limit across supported machines.",
          },
          {
            label: "Contactless Cap",
            value: "£100.00",
            description: "Maximum tap amount before an additional check may be requested.",
          },
        ],
      },
      {
        id: "credit-3308",
        name: "World Credit Card",
        type: "Credit",
        number: "•••• •••• •••• 3308",
        fullNumber: "5274 9123 6401 3308",
        expires: "04/30",
        status: "Active",
        linkedView: "Credit Facility",
        description: "Premium credit facility with international travel and large-value usage.",
        controls: [
          {
            id: "online-payments",
            label: "Online Payments",
            description: "Allow ecommerce, subscriptions, and wallet transactions.",
            enabled: true,
          },
          {
            id: "international-use",
            label: "International Use",
            description: "Permit foreign currency and cross-border transactions.",
            enabled: true,
          },
          {
            id: "cash-advance",
            label: "Cash Advance",
            description: "Allow cash access against the approved credit line.",
            enabled: false,
          },
        ],
        limits: [
          {
            label: "Credit Line",
            value: "£18,500.00",
            description: "Total approved revolving facility for this client card.",
          },
          {
            label: "Available Credit",
            value: "£13,120.00",
            description: "Current available credit before the next statement cycle.",
          },
          {
            label: "Cash Access Limit",
            value: "£3,000.00",
            description: "Maximum same-day cash advance access when enabled.",
          },
        ],
      },
    ],
    notifications: [
      {
        title: "Large transfer queued",
        detail: "Your £15,500 international transfer was submitted for review.",
        time: "28 Jul 2026, 10:25",
      },
      {
        title: "Savings interest applied",
        detail: "Monthly savings interest has been credited to your reserve balance.",
        time: "18 Jul 2026, 08:10",
      },
      {
        title: "Card present transaction",
        detail: "£640.00 was spent at Heathrow Executive Lounge.",
        time: "16 Jul 2026, 13:45",
      },
    ],
    trustedDevices: [
      {
        name: "MacBook Air",
        location: "Edinburgh, United Kingdom",
        lastActive: "28 Jul 2026, 10:12",
        status: "Current session",
      },
      {
        name: "iPhone 15",
        location: "Bristol, United Kingdom",
        lastActive: "27 Jul 2026, 19:33",
        status: "Trusted",
      },
    ],
    loginActivities: [
      {
        title: "Successful login",
        detail: "MacBook Air via password and OTP",
        time: "28 Jul 2026, 10:12",
      },
      {
        title: "OTP verification completed",
        detail: "iPhone 15 completed the latest security challenge",
        time: "27 Jul 2026, 19:33",
      },
      {
        title: "New beneficiary added",
        detail: "Recipient reference saved for future transfer use",
        time: "24 Jul 2026, 17:05",
      },
    ],
    notificationDelivery: {
      primaryMobile: "+44 7700 900456",
      pushNotifications: "Enabled on one current and one trusted device",
      digestFrequency: "Instant for payments, daily summary for service updates",
    },
    accountDetails: {
      sortCode: "22-47-31",
      checkingIban: "GB82 MATR 2247 3111 2233 44",
      savingsIban: "GB82 MATR 2247 3177 8899 55",
      branch: "Edinburgh Private Client Office",
      statementDelivery: "Paperless monthly statements",
      clientTier: "Meridian Signature",
      relationshipStatus: "Active and verified",
    },
    savingsSnapshot: {
      annualRate: "2.35%",
      lastInterestPayout: "£228.10",
      reserveGoalProgress: "91%",
      largestAllocation: "Property Reserve",
    },
    paymentSummary: {
      scheduledPayments: "6",
      pendingReview: "1",
      outgoingThisMonth: "£48,912.90",
    },
    securitySummary: {
      score: "94 / 100",
      recentAlerts: "1",
    },
    profileNotes: [
      "Relationship servicing is active and current.",
      "Priority payment review remains enabled for larger international transfers.",
      "Client identity and access checks are verified.",
    ],
  },
};

function normalizeCustomerNumber(value: string) {
  return value.trim().toUpperCase();
}

function splitFullName(accountName: string) {
  const trimmedName = accountName.trim();
  const [firstName = trimmedName, ...lastNameParts] = trimmedName.split(/\s+/);
  const lastName = lastNameParts.join(" ") || firstName;

  return {
    firstName,
    lastName,
    fullName: trimmedName,
  };
}

function buildPrivateAccessProfile(
  credentialProfile: PrivateAccessCredentialProfile,
): PrivateAccessProfile {
  const template = profileTemplates[credentialProfile.id];
  const customerNumber = normalizeCustomerNumber(credentialProfile.customerNumber);
  const { firstName, lastName, fullName } = splitFullName(credentialProfile.accountName);

  return {
    id: credentialProfile.id,
    accountName: fullName,
    customerNumber,
    password: credentialProfile.password,
    otp: credentialProfile.otp,
    customerProfile: {
      firstName,
      lastName,
      fullName,
      customerId: customerNumber,
      relationshipManager:
        credentialProfile.id === "primary" ? "Sophie Bennett" : "Daniel Mercer",
      mailingAddress:
        credentialProfile.id === "primary"
          ? "18 Belgrave Square, London SW1X 8PP"
          : "42 Chester Square, London SW1W 9EA",
    },
    ...template,
  };
}

export function getPrivateAccessProfiles() {
  return getPrivateAccessCredentialProfiles().map(buildPrivateAccessProfile);
}

export function findPrivateAccessProfileByCustomerNumber(customerNumber: string) {
  const normalizedCustomerNumber = normalizeCustomerNumber(customerNumber);

  return (
    getPrivateAccessProfiles().find(
      (profile) => normalizeCustomerNumber(profile.customerNumber) === normalizedCustomerNumber,
    ) || null
  );
}
