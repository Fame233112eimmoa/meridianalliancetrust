import Link from "next/link";
import type { ReactNode } from "react";
import { AccountCard } from "@/components/dashboard/account-card";
import { CardsOverview } from "@/components/dashboard/cards-overview";
import {
  TransferReviewCard,
  type TransferSection,
} from "@/components/dashboard/transfer-review-card";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import type { DashboardPage } from "@/lib/dashboard-data";
import type { PrivateAccessProfile } from "@/lib/private-access-profiles";

type DashboardRoutePageProps = {
  page: DashboardPage;
  profile: PrivateAccessProfile;
};

type StatItem = {
  label: string;
  value: string;
  detail: string;
};

type ActionItem = {
  title: string;
  description: string;
  href: string;
};

type DetailItem = {
  label: string;
  value: string;
};

type ToggleItem = {
  title: string;
  description: string;
  defaultChecked?: boolean;
};

function PageActions({ actions }: { actions?: DashboardPage["actions"] }) {
  if (!actions?.length) {
    return null;
  }

  return (
    <>
      {actions.map((action) => (
        <Button key={action.href} href={action.href} variant={action.variant}>
          {action.label}
        </Button>
      ))}
    </>
  );
}

function RouteFrame({
  page,
  actions,
  children,
}: {
  page: DashboardPage;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-5">
      <PageHeader
        actions={actions ?? <PageActions actions={page.actions} />}
        description={page.description}
        eyebrow={page.eyebrow}
        title={page.title}
      />
      {children}
    </div>
  );
}

function StatGrid({ items }: { items: StatItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="panel p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-stone-400">{item.label}</p>
          <p className="mt-3 text-3xl text-stone-950">{item.value}</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

function ActionGrid({ items }: { items: ActionItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-[1.75rem] border border-stone-200/80 bg-stone-50 p-5 transition hover:border-stone-300 hover:bg-white"
        >
          <p className="text-lg text-stone-950">{item.title}</p>
          <p className="mt-2 text-sm leading-7 text-stone-600">{item.description}</p>
        </Link>
      ))}
    </div>
  );
}

function DetailList({ items }: { items: DetailItem[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-[1.5rem] border border-stone-200/80 bg-stone-50 p-5">
          <dt className="text-xs uppercase tracking-[0.24em] text-stone-400">{item.label}</dt>
          <dd className="mt-2 text-base font-medium text-stone-950">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ActivityFeed({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: Array<{ title: string; detail: string; time: string }>;
}) {
  return (
    <Card description={description} title={title}>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.title}-${item.time}`} className="rounded-[1.5rem] border border-stone-200/80 bg-stone-50 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-medium text-stone-950">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">{item.detail}</p>
              </div>
              <p className="text-sm text-stone-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DeviceList({
  items,
}: {
  items: Array<{
    name: string;
    location: string;
    lastActive: string;
    status: string;
  }>;
}) {
  return (
    <Card
      description="Trusted devices currently recognised for private access."
      title="Trusted Devices"
    >
      <div className="space-y-4">
        {items.map((device) => (
          <div key={`${device.name}-${device.lastActive}`} className="rounded-[1.5rem] border border-stone-200/80 bg-stone-50 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-medium text-stone-950">{device.name}</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">{device.location}</p>
              </div>
              <div className="text-sm text-stone-500 sm:text-right">
                <p>{device.status}</p>
                <p className="mt-1">{device.lastActive}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function InfoHighlights({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <Card description={description} title={title}>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="surface-muted px-4 py-3 text-sm leading-7 text-stone-700">
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}

function ToggleList({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: ToggleItem[];
}) {
  return (
    <Card description={description} title={title}>
      <div className="space-y-4">
        {items.map((item) => (
          <label
            key={item.title}
            className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-stone-200/80 bg-stone-50 p-5"
          >
            <div>
              <p className="font-medium text-stone-950">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
            </div>
            <span className="relative mt-1 inline-flex h-7 w-12 shrink-0 items-center">
              <input className="peer sr-only" defaultChecked={item.defaultChecked} type="checkbox" />
              <span className="absolute inset-0 rounded-full bg-stone-300 transition peer-checked:bg-accent" />
              <span className="absolute left-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
            </span>
          </label>
        ))}
      </div>
    </Card>
  );
}

function parseCurrencyValue(value: string) {
  return Number(value.replace(/[^0-9.-]+/g, ""));
}

function formatCurrencyValue(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function DashboardRoutePage({ page, profile }: DashboardRoutePageProps) {
  const {
    accountDetails,
    accounts,
    cards,
    customerProfile,
    loginActivities,
    notificationDelivery,
    notifications,
    paymentSummary,
    profileNotes,
    savingsSnapshot,
    securitySummary,
    transactions,
    trustedDevices,
  } = profile;
  const checkingTransactions = transactions.filter((item) => item.account === "Checking");
  const savingsTransactions = transactions.filter((item) => item.account === "Savings");
  const totalBalance = formatCurrencyValue(
    accounts.reduce((sum, account) => sum + parseCurrencyValue(account.balance), 0),
  );
  const accountNames = accounts.map((account) => account.name);
  const primaryAccountName = accountNames[0] || "Everyday Checking";
  const secondaryAccountName = accountNames[1] || "Reserve Savings";
  const routePage =
    page.routePath === ""
      ? {
          ...page,
          title: `Welcome back, ${customerProfile.fullName}`,
        }
      : page;

  switch (page.routePath) {
    case "":
      return (
        <RouteFrame page={routePage}>
          <StatGrid
            items={[
              {
                label: "Total Balance",
                value: totalBalance,
                detail: "Checking and savings balances combined across your portfolio.",
              },
              {
                label: "Security Score",
                value: securitySummary.score,
                detail: "Two-factor authentication and trusted devices are both active.",
              },
            ]}
          />

          <div className="grid gap-6 xl:grid-cols-2">
            {accounts.map((account) => (
              <AccountCard key={account.number} account={account} />
            ))}
          </div>

          <ActivityFeed
            description="Recent account and service messages"
            items={notifications}
            title="Notifications Center"
          />

          <TransactionList items={transactions} />
        </RouteFrame>
      );

    case "accounts":
      return (
        <RouteFrame page={routePage}>
          <div className="grid gap-6 xl:grid-cols-2">
            {accounts.map((account) => (
              <AccountCard key={account.number} account={account} />
            ))}
          </div>

          <Card
            description="Explore each account view in more detail."
            title="Account Navigation"
          >
            <ActionGrid
              items={[
                {
                  title: "Checking Account",
                  description: "Review deposits, spending, and daily outgoing activity.",
                  href: "/dashboard/accounts/checking-account",
                },
                {
                  title: "Savings Account",
                  description: "Track reserve growth, interest, and future savings goals.",
                  href: "/dashboard/accounts/savings-account",
                },
                {
                  title: "Reference Details",
                  description: "Review sort code, IBAN, branch, and statement settings.",
                  href: "/dashboard/accounts/account-details",
                },
              ]}
            />
          </Card>
        </RouteFrame>
      );

    case "accounts/checking-account":
      return (
        <RouteFrame page={routePage}>
          <AccountCard account={accounts[0]} />
          <TransactionList
            description="Recent debits and credits from the primary spending account."
            items={checkingTransactions}
            title="Checking Activity"
          />
        </RouteFrame>
      );

    case "accounts/savings-account":
      return (
        <RouteFrame page={routePage}>
          <AccountCard account={accounts[1]} />
          <Card description="A simple view of the reserve account." title="Savings Snapshot">
            <DetailList
              items={[
                { label: "Annual Rate", value: savingsSnapshot.annualRate },
                { label: "Last Interest Payout", value: savingsSnapshot.lastInterestPayout },
                { label: "Reserve Goal Progress", value: savingsSnapshot.reserveGoalProgress },
                { label: "Largest Allocation", value: savingsSnapshot.largestAllocation },
              ]}
            />
          </Card>
          <TransactionList
            description="Reserve contributions and interest events."
            items={savingsTransactions}
            title="Savings Activity"
          />
        </RouteFrame>
      );

    case "accounts/account-details":
      return (
        <RouteFrame page={routePage}>
          <Card
            description="Key account information and servicing details."
            title="Reference Details"
          >
            <DetailList
              items={[
                { label: "Account Holder", value: customerProfile.fullName },
                { label: "Sort Code", value: accountDetails.sortCode },
                { label: "Checking IBAN", value: accountDetails.checkingIban },
                { label: "Savings IBAN", value: accountDetails.savingsIban },
                { label: "Branch", value: accountDetails.branch },
                { label: "Statement Delivery", value: accountDetails.statementDelivery },
                { label: "Client Tier", value: accountDetails.clientTier },
                { label: "Relationship Status", value: accountDetails.relationshipStatus },
              ]}
            />
          </Card>
        </RouteFrame>
      );

    case "transactions":
      return (
        <RouteFrame page={routePage}>
          <TransactionList
            description="Combined checking and savings account activity."
            items={transactions}
            title="All Transactions"
          />
        </RouteFrame>
      );

    case "cards":
      return (
        <RouteFrame page={routePage}>
          <CardsOverview cardholderName={customerProfile.fullName} cards={cards} />
        </RouteFrame>
      );

    case "payments":
      return (
        <RouteFrame page={routePage}>
          <StatGrid
            items={[
              {
                label: "Scheduled Payments",
                value: paymentSummary.scheduledPayments,
                detail: "Upcoming over the next 14 days.",
              },
              {
                label: "Pending Review",
                value: paymentSummary.pendingReview,
                detail: "There are no payment items awaiting review right now.",
              },
              {
                label: "This Month Outgoing",
                value: paymentSummary.outgoingThisMonth,
                detail: "Across domestic and international payment types.",
              },
            ]}
          />

          <Card description="Choose the payment route that matches the destination." title="Transfer Routes">
            <ActionGrid
              items={[
                {
                  title: "Internal Transfer",
                  description: "Move funds securely between your checking and savings accounts.",
                  href: "/dashboard/payments/internal-transfer",
                },
                {
                  title: "Another Bank",
                  description: "Send domestic transfers to approved beneficiaries.",
                  href: "/dashboard/payments/another-bank",
                },
                {
                  title: "International",
                  description: "Prepare cross-border transfers with the correct settlement details.",
                  href: "/dashboard/payments/international",
                },
              ]}
            />
          </Card>
        </RouteFrame>
      );

    case "payments/internal-transfer":
      return (
        <RouteFrame page={routePage}>
          <TransferReviewCard
            description="Move funds between your active Meridian Alliance Trust UK accounts."
            sections={[
              {
                title: "Transfer Details",
                fields: [
                  {
                    label: "From account",
                    options: accountNames,
                    defaultValue: primaryAccountName,
                  },
                  {
                    label: "To account",
                    options: [secondaryAccountName, primaryAccountName],
                    defaultValue: secondaryAccountName,
                  },
                  {
                    label: "Amount",
                    placeholder: "£0.00",
                    type: "text",
                  },
                  {
                    label: "Value date",
                    type: "date",
                  },
                  {
                    label: "Reference",
                    placeholder: "Savings allocation",
                  },
                  {
                    label: "Transfer note",
                    control: "textarea",
                    placeholder: "Optional internal note",
                    fullWidth: true,
                    required: false,
                    rows: 3,
                  },
                ],
              },
            ] satisfies TransferSection[]}
            submitLabel="Review Transfer"
            title="Internal Transfer"
          />
        </RouteFrame>
      );

    case "payments/another-bank":
      return (
        <RouteFrame page={routePage}>
          <TransferReviewCard
            description="Enter beneficiary details carefully before confirming a domestic transfer."
            sections={[
              {
                title: "Payment Details",
                fields: [
                  {
                    label: "From account",
                    options: accountNames,
                    defaultValue: primaryAccountName,
                  },
                  {
                    label: "Beneficiary name",
                    placeholder: "Enter beneficiary name",
                  },
                  {
                    label: "Sort code",
                    placeholder: "00-00-00",
                  },
                  {
                    label: "Account number",
                    placeholder: "12345678",
                  },
                  {
                    label: "Amount",
                    placeholder: "£0.00",
                    type: "text",
                  },
                  {
                    label: "Payment date",
                    type: "date",
                  },
                  {
                    label: "Payment reference",
                    placeholder: "Invoice 1482",
                    fullWidth: true,
                  },
                  {
                    label: "Purpose of payment",
                    options: [
                      "Professional services",
                      "Property costs",
                      "Family support",
                      "Invoice settlement",
                    ],
                    defaultValue: "Professional services",
                  },
                  {
                    label: "Payment note",
                    control: "textarea",
                    placeholder: "Optional internal note",
                    fullWidth: true,
                    required: false,
                    rows: 3,
                  },
                ],
              },
            ] satisfies TransferSection[]}
            submitLabel="Review Domestic Transfer"
            title="Transfer to Another Bank"
          />
        </RouteFrame>
      );

    case "payments/international":
      return (
        <RouteFrame page={routePage}>
          <TransferReviewCard
            description="Provide the required recipient and settlement details for a cross-border payment."
            sections={[
              {
                title: "International Payment",
                fields: [
                  {
                    label: "From account",
                    options: accountNames,
                    defaultValue: primaryAccountName,
                  },
                  {
                    label: "Currency",
                    options: ["USD", "EUR", "GBP", "CHF", "AED"],
                    defaultValue: "USD",
                  },
                  {
                    label: "Beneficiary name",
                    placeholder: "Enter beneficiary name",
                  },
                  {
                    label: "Country",
                    options: [
                      "United States",
                      "Switzerland",
                      "United Arab Emirates",
                      "Singapore",
                      "France",
                    ],
                    defaultValue: "United States",
                  },
                  {
                    label: "IBAN / Account",
                    placeholder: "Recipient account or IBAN",
                  },
                  {
                    label: "Beneficiary bank",
                    placeholder: "Recipient bank name",
                  },
                  {
                    label: "SWIFT / BIC",
                    placeholder: "SWIFT / BIC",
                  },
                  {
                    label: "Amount",
                    placeholder: "£0.00",
                    type: "text",
                  },
                  {
                    label: "Value date",
                    type: "date",
                  },
                  {
                    label: "Charge type",
                    options: [
                      "Shared charges",
                      "Sender pays all charges",
                      "Beneficiary pays charges",
                    ],
                    defaultValue: "Shared charges",
                  },
                  {
                    label: "Payment reference",
                    placeholder: "Project reserve funding",
                    fullWidth: true,
                  },
                  {
                    label: "Purpose of payment",
                    options: [
                      "Investment funding",
                      "Property purchase",
                      "Family support",
                      "Supplier settlement",
                      "Tuition fees",
                    ],
                    defaultValue: "Investment funding",
                  },
                  {
                    label: "Additional note",
                    control: "textarea",
                    placeholder: "Optional internal note",
                    fullWidth: true,
                    required: false,
                    rows: 3,
                  },
                ],
              },
            ] satisfies TransferSection[]}
            submitLabel="Review International Transfer"
            title="International Transfer"
          />
        </RouteFrame>
      );

    case "notifications":
      return (
        <RouteFrame page={routePage}>
          <ActivityFeed
            description="The latest notices surfaced for this client relationship."
            items={notifications}
            title="Notifications Center"
          />
          <Card description="Contact channels used for service communication." title="Delivery Methods">
            <DetailList
              items={[
                { label: "Customer ID", value: customerProfile.customerId },
                { label: "Primary Mobile", value: notificationDelivery.primaryMobile },
                { label: "Push Notifications", value: notificationDelivery.pushNotifications },
                { label: "Digest Frequency", value: notificationDelivery.digestFrequency },
              ]}
            />
          </Card>
        </RouteFrame>
      );

    case "security":
      return (
        <RouteFrame page={routePage}>
          <StatGrid
            items={[
              {
                label: "Two-Factor Authentication",
                value: "Enabled",
                detail: "OTP is required on every approved login.",
              },
              {
                label: "Trusted Devices",
                value: String(trustedDevices.length),
                detail: "All active sessions are recognised and current.",
              },
              {
                label: "Recent Security Alerts",
                value: securitySummary.recentAlerts,
                detail: "No unresolved sign-in or device warnings detected.",
              },
            ]}
          />
          <ActivityFeed
            description="Recent authentication and security-related activity."
            items={loginActivities}
            title="Login Activity"
          />
          <DeviceList items={trustedDevices} />
        </RouteFrame>
      );

    case "profile":
      return (
        <RouteFrame page={routePage}>
          <Card description="Verified customer and relationship details." title="Account Holder Profile">
            <DetailList
              items={[
                { label: "Full Name", value: customerProfile.fullName },
                { label: "Customer ID", value: customerProfile.customerId },
                { label: "Relationship Manager", value: customerProfile.relationshipManager },
                { label: "Mailing Address", value: customerProfile.mailingAddress },
              ]}
            />
          </Card>
          <InfoHighlights
            description="Profile service notes for this relationship."
            items={profileNotes}
            title="Profile Notes"
          />
        </RouteFrame>
      );

    case "settings":
      return (
        <RouteFrame page={routePage}>
          <ToggleList
            description="Simple preference controls for alerts and dashboard behaviour."
            items={[
              {
                title: "Login alerts",
                description: "Receive a message whenever a new session is opened.",
                defaultChecked: true,
              },
              {
                title: "Large transaction alerts",
                description: "Surface a notice for high-value debits, credits, or transfers.",
                defaultChecked: true,
              },
              {
                title: "International transfer updates",
                description: "Track status changes for overseas payments.",
                defaultChecked: true,
              },
              {
                title: "Marketing and service updates",
                description: "Stay informed about service changes and product updates.",
              },
            ]}
            title="Alert Preferences"
          />
        </RouteFrame>
      );

    default:
      return (
        <RouteFrame page={routePage}>
          <InfoHighlights
            description={routePage.description}
            items={routePage.highlights ?? []}
            title={routePage.title}
          />
        </RouteFrame>
      );
  }
}
