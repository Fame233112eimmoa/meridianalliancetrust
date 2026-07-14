export type NavItem = {
  label: string;
  href: string;
};

export type Account = {
  name: string;
  number: string;
  balance: string;
  available: string;
  change: string;
  description: string;
};

export type Transaction = {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: string;
  type: "credit" | "debit";
  account: "Checking" | "Savings";
  status?: "posted" | "on-hold";
  note?: string;
};

export type BankCard = {
  id: string;
  name: string;
  type: "Debit" | "Credit";
  number: string;
  fullNumber: string;
  expires: string;
  status: string;
  linkedView: string;
  description: string;
  controls: Array<{
    id: string;
    label: string;
    description: string;
    enabled: boolean;
  }>;
  limits: Array<{
    label: string;
    value: string;
    description: string;
  }>;
};

export const customerProfile = {
  firstName: "Richard",
  lastName: "Bahcnam",
  fullName: "Richard Bahcnam",
  email: "richard.bahcnam.demo@example.com",
  relationshipManager: "Sophie Bennett",
  mailingAddress: "18 Belgrave Square, London SW1X 8PP",
};

export const publicNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Open Account", href: "/create-account" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
  { label: "Login", href: "/login" },
];

export const accounts: Account[] = [
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
];

export const transactions: Transaction[] = [
  {
    id: "txn-001",
    name: "Salary Credit",
    category: "Income",
    date: "30 Jun 2026",
    amount: "+ £7,450.00",
    type: "credit",
    account: "Checking",
    status: "posted",
  },
  {
    id: "txn-002",
    name: "Canary Wharf Rent",
    category: "Housing",
    date: "28 Jun 2026",
    amount: "- £2,140.00",
    type: "debit",
    account: "Checking",
    status: "posted",
  },
  {
    id: "txn-003",
    name: "Savings Transfer",
    category: "Internal Transfer",
    date: "26 Jun 2026",
    amount: "- £1,500.00",
    type: "debit",
    account: "Checking",
    status: "posted",
  },
  {
    id: "txn-004",
    name: "Interest Payout",
    category: "Savings",
    date: "25 Jun 2026",
    amount: "+ £150.21",
    type: "credit",
    account: "Savings",
    status: "posted",
  },
  {
    id: "txn-005",
    name: "Westminster Utilities",
    category: "Bill Payment",
    date: "22 Jun 2026",
    amount: "- £186.45",
    type: "debit",
    account: "Checking",
    status: "posted",
  },
  {
    id: "txn-006",
    name: "Global Merchant Refund",
    category: "Card Refund",
    date: "20 Jun 2026",
    amount: "+ £84.00",
    type: "credit",
    account: "Checking",
    status: "posted",
  },
];

export const cards: BankCard[] = [
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
];

export const notifications = [
  {
    title: "International transfer approved",
    detail: "Your £2,400 transfer to Zurich was queued for next-day settlement.",
    time: "Today, 09:15",
  },
  {
    title: "New trusted device added",
    detail: "MacBook Pro signed in from London, United Kingdom.",
    time: "Yesterday, 18:40",
  },
  {
    title: "Debit card used online",
    detail: "£128.90 spent at Kensington Travel on your Platinum Debit Card.",
    time: "Yesterday, 14:05",
  },
];

export const trustedDevices = [
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
];

export const loginActivities = [
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
];
