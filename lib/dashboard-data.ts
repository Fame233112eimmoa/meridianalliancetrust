export type DashboardAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type DashboardPage = {
  id: string;
  section: string;
  label: string;
  href: string;
  routePath: string;
  eyebrow: string;
  title: string;
  description: string;
  actions?: DashboardAction[];
  highlights?: string[];
};

export type DashboardNavSection = {
  label: string;
  items: Array<{
    label: string;
    href: string;
  }>;
};

function routePathFromHref(href: string) {
  return href.replace(/^\/dashboard\/?/, "");
}

function page(config: Omit<DashboardPage, "routePath">): DashboardPage {
  return {
    ...config,
    routePath: routePathFromHref(config.href),
  };
}

export const dashboardPages: DashboardPage[] = [
  page({
    id: "account-summary",
    section: "Overview",
    label: "Dashboard",
    href: "/dashboard",
    eyebrow: "Account Summary",
    title: "Welcome back, Richard Bahcnam",
    description: "View balances, activity, and the next actions across your banking profile.",
    actions: [
      { label: "Transfer Funds", href: "/dashboard/payments/internal-transfer", variant: "secondary" },
      { label: "Manage Cards", href: "/dashboard/cards" },
    ],
  }),
  page({
    id: "accounts",
    section: "Overview",
    label: "Accounts",
    href: "/dashboard/accounts",
    eyebrow: "Customer Dashboard",
    title: "Accounts",
    description: "Compare balances, account usage, and available funds across your portfolio.",
    actions: [{ label: "Account Details", href: "/dashboard/accounts/account-details" }],
  }),
  page({
    id: "checking-account",
    section: "Overview",
    label: "Checking Account",
    href: "/dashboard/accounts/checking-account",
    eyebrow: "Accounts",
    title: "Checking Account",
    description: "Manage everyday spending, direct deposits, and outgoing transfers.",
    actions: [{ label: "Move Money", href: "/dashboard/payments/internal-transfer" }],
  }),
  page({
    id: "savings-account",
    section: "Overview",
    label: "Savings Account",
    href: "/dashboard/accounts/savings-account",
    eyebrow: "Accounts",
    title: "Savings Account",
    description: "Track savings performance, interest, and reserve contributions.",
    actions: [{ label: "Account Details", href: "/dashboard/accounts/account-details" }],
  }),
  page({
    id: "account-details",
    section: "Overview",
    label: "Account Details",
    href: "/dashboard/accounts/account-details",
    eyebrow: "Accounts",
    title: "Account Details",
    description: "Review reference numbers, branch details, and statement delivery settings.",
    actions: [{ label: "View Transactions", href: "/dashboard/transactions", variant: "secondary" }],
  }),
  page({
    id: "transaction-history",
    section: "Overview",
    label: "Transaction History",
    href: "/dashboard/transactions",
    eyebrow: "Accounts",
    title: "Transaction History",
    description: "Review credits and debits across your checking and savings accounts.",
    actions: [{ label: "Payments Dashboard", href: "/dashboard/payments" }],
  }),
  page({
    id: "cards-overview",
    section: "Cards",
    label: "Cards",
    href: "/dashboard/cards",
    eyebrow: "Cards",
    title: "Card Overview",
    description: "View your active cards, limits, and linked account access in one simple overview.",
  }),
  page({
    id: "payments-dashboard",
    section: "Payments",
    label: "Payments Dashboard",
    href: "/dashboard/payments",
    eyebrow: "Payments & Transfers",
    title: "Payments Dashboard",
    description: "Access transfer types, bill payments, and upcoming scheduled activity.",
    actions: [
      { label: "Internal Transfer", href: "/dashboard/payments/internal-transfer", variant: "secondary" },
      { label: "International", href: "/dashboard/payments/international" },
    ],
  }),
  page({
    id: "internal-transfer",
    section: "Payments",
    label: "Internal Transfer",
    href: "/dashboard/payments/internal-transfer",
    eyebrow: "Payments & Transfers",
    title: "Internal Transfer",
    description: "Move funds between your Meridian Alliance Trust UK accounts.",
    highlights: [
      "Same-day movement is available between checking and savings.",
      "Balances refresh immediately after successful completion.",
      "Alerts remain enabled for larger transfer amounts.",
    ],
  }),
  page({
    id: "another-bank",
    section: "Payments",
    label: "Another Bank",
    href: "/dashboard/payments/another-bank",
    eyebrow: "Payments & Transfers",
    title: "Transfer to Another Bank",
    description: "Send domestic transfers to approved beneficiaries outside Meridian Alliance Trust UK.",
    highlights: [
      "Verify sort code and account number carefully.",
      "Review whether the payment should be scheduled rather than sent immediately.",
      "Large-value domestic transfers remain subject to security review.",
    ],
  }),
  page({
    id: "international",
    section: "Payments",
    label: "International",
    href: "/dashboard/payments/international",
    eyebrow: "Payments & Transfers",
    title: "International Transfer",
    description: "Prepare cross-border payments with the correct recipient and settlement details.",
    highlights: [
      "International transfers require recipient, bank, and settlement reference details.",
      "Cross-border payments may pause for compliance or legal review.",
      "Use the relationship team for high-value transfer guidance.",
    ],
  }),
  page({
    id: "notifications",
    section: "Profile & Security",
    label: "Notifications",
    href: "/dashboard/notifications",
    eyebrow: "Notifications",
    title: "Notifications Center",
    description: "Recent account and service messages for this protected session.",
  }),
  page({
    id: "security",
    section: "Profile & Security",
    label: "Security",
    href: "/dashboard/security",
    eyebrow: "Security",
    title: "Security Dashboard",
    description: "Review login protection, devices, and the latest access activity.",
  }),
  page({
    id: "profile",
    section: "Profile & Security",
    label: "Profile",
    href: "/dashboard/profile",
    eyebrow: "Profile",
    title: "Profile",
    description: "Review your contact profile, relationship details, and account holder records.",
  }),
  page({
    id: "settings",
    section: "Profile & Security",
    label: "Settings",
    href: "/dashboard/settings",
    eyebrow: "Settings",
    title: "Settings",
    description: "Adjust dashboard preferences, alerts, and session-related controls.",
  }),
];

const sectionOrder = ["Overview", "Cards", "Payments", "Profile & Security"];

export const dashboardSections: DashboardNavSection[] = sectionOrder.map((section) => ({
  label: section,
  items: dashboardPages
    .filter((pageEntry) => pageEntry.section === section)
    .map((pageEntry) => ({
      label: pageEntry.label,
      href: pageEntry.href,
    })),
}));

export function getDashboardPageFromSlug(slug?: string[]) {
  const routePath = slug?.join("/") ?? "";

  return dashboardPages.find((pageEntry) => pageEntry.routePath === routePath);
}

export function getDashboardPageFromHref(href: string) {
  return dashboardPages.find((pageEntry) => pageEntry.href === href);
}
