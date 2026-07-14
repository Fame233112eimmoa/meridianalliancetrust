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
import {
  accounts,
  cards,
  customerProfile,
  loginActivities,
  notifications,
  transactions,
  trustedDevices,
} from "@/lib/site-data";

type DashboardRoutePageProps = {
  page: DashboardPage;
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

function DeviceList() {
  return (
    <Card
      description="Trusted devices currently recognised for private access."
      title="Trusted Devices"
    >
      <div className="space-y-4">
        {trustedDevices.map((device) => (
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

export function DashboardRoutePage({ page }: DashboardRoutePageProps) {
  const checkingTransactions = transactions.filter((item) => item.account === "Checking");
  const savingsTransactions = transactions.filter((item) => item.account === "Savings");

  switch (page.routePath) {
    case "":
      return (
        <RouteFrame page={page}>
          <StatGrid
            items={[
              {
                label: "Total Balance",
                value: "£5,232,030.00",
                detail: "Checking and savings balances combined across your portfolio.",
              },
              {
                label: "Security Score",
                value: "96 / 100",
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
        <RouteFrame page={page}>
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
        <RouteFrame page={page}>
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
        <RouteFrame page={page}>
          <AccountCard account={accounts[1]} />
          <Card description="A simple view of the reserve account." title="Savings Snapshot">
            <DetailList
              items={[
                { label: "Annual Rate", value: "2.10%" },
                { label: "Last Interest Payout", value: "£150.21" },
                { label: "Reserve Goal Progress", value: "84%" },
                { label: "Largest Allocation", value: "Emergency Reserve" },
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
        <RouteFrame page={page}>
          <Card
            description="Key account information and servicing details."
            title="Reference Details"
          >
            <DetailList
              items={[
                { label: "Account Holder", value: customerProfile.fullName },
                { label: "Sort Code", value: "12-34-56" },
                { label: "Checking IBAN", value: "GB82 MATR 1234 5612 3456 78" },
                { label: "Savings IBAN", value: "GB82 MATR 1234 5676 5432 10" },
                { label: "Branch", value: "London Private Banking Centre" },
                { label: "Statement Delivery", value: "Paperless monthly statements" },
                { label: "Client Tier", value: "Meridian Premier" },
                { label: "Relationship Status", value: "Active and verified" },
              ]}
            />
          </Card>
        </RouteFrame>
      );

    case "transactions":
      return (
        <RouteFrame page={page}>
          <TransactionList
            description="Combined checking and savings account activity."
            items={transactions}
            title="All Transactions"
          />
        </RouteFrame>
      );

    case "cards":
      return (
        <RouteFrame page={page}>
          <CardsOverview cardholderName={customerProfile.fullName} cards={cards} />
        </RouteFrame>
      );

    case "payments":
      return (
        <RouteFrame page={page}>
          <StatGrid
            items={[
              {
                label: "Scheduled Payments",
                value: "4",
                detail: "Upcoming over the next 14 days.",
              },
              {
                label: "Pending Review",
                value: "0",
                detail: "There are no payment items awaiting review right now.",
              },
              {
                label: "This Month Outgoing",
                value: "£29,842.40",
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
        <RouteFrame page={page}>
          <TransferReviewCard
            description="Move funds between your active Meridian Alliance Trust UK accounts."
            sections={[
              {
                title: "Transfer Setup",
                description:
                  "Select the Meridian accounts involved and choose when the transfer should be booked.",
                fields: [
                  {
                    label: "From account",
                    options: ["Everyday Checking", "Reserve Savings"],
                    defaultValue: "Everyday Checking",
                    hint: "Available funds are checked again at review and release.",
                  },
                  {
                    label: "To account",
                    options: ["Reserve Savings", "Everyday Checking"],
                    defaultValue: "Reserve Savings",
                    hint: "Only eligible Meridian accounts appear in this list.",
                  },
                  {
                    label: "Amount",
                    placeholder: "£0.00",
                    type: "text",
                    hint: "Enter the amount exactly as it should post to the destination account.",
                  },
                  {
                    label: "Value date",
                    type: "date",
                    hint: "Instructions approved before 17:00 London time normally post the same business day.",
                  },
                ],
              },
              {
                title: "Reference & Purpose",
                description:
                  "Add the statement reference and service classification for this internal movement.",
                fields: [
                  {
                    label: "Reference",
                    placeholder: "Reserve allocation July",
                    hint: "This reference appears on both account statements.",
                  },
                  {
                    label: "Transfer purpose",
                    options: [
                      "Reserve funding",
                      "Liquidity movement",
                      "Property allocation",
                      "Portfolio reserve",
                    ],
                    defaultValue: "Reserve funding",
                    hint: "Used for relationship review and payment categorisation.",
                  },
                  {
                    label: "Client note",
                    control: "textarea",
                    placeholder: "Optional note for your internal record.",
                    fullWidth: true,
                    required: false,
                    rows: 4,
                    hint: "Saved with the instruction summary but not sent outside the bank.",
                  },
                ],
              },
            ] satisfies TransferSection[]}
            contextItems={[
              {
                label: "Execution Window",
                value: "Same-day before 17:00",
                detail: "Internal movements are usually visible immediately once released.",
              },
              {
                label: "Service Route",
                value: "Meridian to Meridian",
                detail: "Transfers remain within your managed relationship accounts.",
              },
              {
                label: "High-Value Review",
                value: "Relationship callback",
                detail: "Large instructions may still prompt a courtesy verification call.",
              },
            ]}
            checklist={[
              "Confirm the debit account, destination account, and amount before sending.",
              "Use a clear reference so the movement is easy to identify on both statements.",
              "Review the value date if the transfer is intended for a future booking day.",
            ]}
            submitLabel="Review Transfer"
            title="Internal Transfer"
          />
        </RouteFrame>
      );

    case "payments/another-bank":
      return (
        <RouteFrame page={page}>
          <TransferReviewCard
            description="Enter beneficiary details carefully before confirming a domestic transfer."
            sections={[
              {
                title: "Debit Account",
                description:
                  "Choose the account to debit and set the timing for this domestic payment.",
                fields: [
                  {
                    label: "From account",
                    options: ["Everyday Checking", "Reserve Savings"],
                    defaultValue: "Everyday Checking",
                    hint: "Domestic payments are normally released from the primary current account.",
                  },
                  {
                    label: "Amount",
                    placeholder: "£0.00",
                    type: "text",
                    hint: "Enter the gross amount to be sent to the beneficiary.",
                  },
                  {
                    label: "Payment date",
                    type: "date",
                    hint: "Same-day domestic release depends on the payment window and review outcome.",
                  },
                  {
                    label: "Payment reference",
                    placeholder: "Property invoice 1482",
                    hint: "Visible to the beneficiary on receipt where supported.",
                  },
                ],
              },
              {
                title: "Beneficiary Details",
                description:
                  "Enter the recipient and destination bank details exactly as provided.",
                fields: [
                  {
                    label: "Beneficiary name",
                    placeholder: "Enter full beneficiary name",
                    hint: "Use the account name registered at the receiving bank.",
                  },
                  {
                    label: "Bank name",
                    placeholder: "Receiving bank name",
                    hint: "Useful for relationship review and beneficiary verification.",
                  },
                  {
                    label: "Sort code",
                    placeholder: "00-00-00",
                    hint: "Enter the six-digit branch sort code.",
                  },
                  {
                    label: "Account number",
                    placeholder: "12345678",
                    hint: "UK domestic account number for the beneficiary.",
                  },
                ],
              },
              {
                title: "Payment Details",
                description:
                  "Record the payment purpose and any internal servicing note for this instruction.",
                fields: [
                  {
                    label: "Purpose of payment",
                    options: [
                      "Professional services",
                      "Property costs",
                      "Family support",
                      "Invoice settlement",
                    ],
                    defaultValue: "Professional services",
                    hint: "Used for payment screening and servicing notes.",
                  },
                  {
                    label: "Client note",
                    control: "textarea",
                    placeholder: "Optional note for your relationship team.",
                    fullWidth: true,
                    required: false,
                    rows: 4,
                    hint: "This note remains within the bank and is not shown to the beneficiary.",
                  },
                ],
              },
            ] satisfies TransferSection[]}
            contextItems={[
              {
                label: "Delivery Rail",
                value: "Faster Payments / CHAPS",
                detail: "The bank selects the appropriate rail based on amount and release timing.",
              },
              {
                label: "Cut-off",
                value: "15:30 London time",
                detail: "Instructions approved after cut-off may move to the next business day.",
              },
              {
                label: "Beneficiary Review",
                value: "Callback for new payees",
                detail: "New or amended beneficiary details may require direct verification.",
              },
            ]}
            checklist={[
              "Verify the beneficiary name, sort code, and account number before release.",
              "Keep the payment reference concise and recognisable for the recipient.",
              "High-value domestic payments may be delayed for an additional callback review.",
            ]}
            submitLabel="Review Domestic Transfer"
            title="Transfer to Another Bank"
          />
        </RouteFrame>
      );

    case "payments/international":
      return (
        <RouteFrame page={page}>
          <TransferReviewCard
            description="Provide the required recipient and settlement details for a cross-border payment."
            sections={[
              {
                title: "Debit & Currency",
                description:
                  "Choose the debit account, transfer currency, and requested value date for settlement.",
                fields: [
                  {
                    label: "From account",
                    options: ["Everyday Checking", "Reserve Savings"],
                    defaultValue: "Everyday Checking",
                    hint: "Cross-border transfers usually debit your current account after final review.",
                  },
                  {
                    label: "Currency",
                    options: ["USD", "EUR", "GBP", "CHF", "AED"],
                    defaultValue: "USD",
                    hint: "The settlement currency used for the outgoing payment.",
                  },
                  {
                    label: "Amount",
                    placeholder: "£0.00",
                    type: "text",
                    hint: "Enter the payment amount in the selected settlement currency.",
                  },
                  {
                    label: "Value date",
                    type: "date",
                    hint: "Cut-off and compliance review affect whether same-day release is available.",
                  },
                ],
              },
              {
                title: "Beneficiary & Bank",
                description:
                  "Provide the beneficiary identity and destination bank details exactly as instructed.",
                fields: [
                  {
                    label: "Beneficiary name",
                    placeholder: "Enter beneficiary name",
                    hint: "Use the legal name held on the recipient account.",
                  },
                  {
                    label: "Beneficiary bank",
                    placeholder: "Recipient bank name",
                    hint: "Enter the receiving institution handling the transfer.",
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
                    hint: "Choose the beneficiary bank country for settlement routing.",
                  },
                  {
                    label: "IBAN / Account",
                    placeholder: "Recipient account number or IBAN",
                    hint: "Use the exact IBAN or local account number provided by the beneficiary.",
                  },
                  {
                    label: "SWIFT / BIC",
                    placeholder: "Recipient bank SWIFT / BIC",
                    fullWidth: true,
                    hint: "Required for most international settlements and correspondent bank routing.",
                  },
                ],
              },
              {
                title: "Settlement Instructions",
                description:
                  "Select the charging basis and describe the business purpose for the cross-border payment.",
                fields: [
                  {
                    label: "Charge option",
                    options: [
                      "SHA - Shared charges",
                      "OUR - Sender pays all charges",
                      "BEN - Beneficiary pays charges",
                    ],
                    defaultValue: "SHA - Shared charges",
                    hint: "Determines how correspondent bank charges are allocated.",
                  },
                  {
                    label: "Payment reference",
                    placeholder: "Project reserve funding",
                    hint: "Reference shown with the outgoing transfer where supported.",
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
                    hint: "Used during compliance screening and settlement review.",
                  },
                  {
                    label: "Additional instructions",
                    control: "textarea",
                    placeholder: "Optional note for beneficiary servicing or your relationship team.",
                    fullWidth: true,
                    required: false,
                    rows: 4,
                    hint: "For internal servicing notes or clarification that may assist the release team.",
                  },
                ],
              },
            ] satisfies TransferSection[]}
            contextItems={[
              {
                label: "FX Handling",
                value: "Rate fixed at release",
                detail: "The applicable rate is confirmed when the instruction clears review.",
              },
              {
                label: "Cut-off",
                value: "14:00 London time",
                detail: "Later submissions may settle on the next available business day.",
              },
              {
                label: "Compliance Path",
                value: "Destination and purpose review",
                detail: "Cross-border payments remain subject to documentary and sanctions screening.",
              },
            ]}
            checklist={[
              "Confirm the beneficiary bank, IBAN/account number, and SWIFT/BIC before release.",
              "Make sure the chosen currency and charge option match the beneficiary instructions.",
              "Supporting documents may still be requested for high-value or first-time overseas payments.",
            ]}
            submitLabel="Review International Transfer"
            title="International Transfer"
          />
        </RouteFrame>
      );

    case "notifications":
      return (
        <RouteFrame page={page}>
          <ActivityFeed
            description="The latest notices surfaced for this client relationship."
            items={notifications}
            title="Notifications Center"
          />
          <Card description="Contact channels used for service communication." title="Delivery Methods">
            <DetailList
              items={[
                { label: "Primary Email", value: customerProfile.email },
                { label: "Primary Mobile", value: "+44 7700 900123" },
                { label: "Push Notifications", value: "Enabled on two trusted devices" },
                { label: "Digest Frequency", value: "Instant for security, daily for service notices" },
              ]}
            />
          </Card>
        </RouteFrame>
      );

    case "security":
      return (
        <RouteFrame page={page}>
          <StatGrid
            items={[
              {
                label: "Two-Factor Authentication",
                value: "Enabled",
                detail: "OTP is required on every approved login.",
              },
              {
                label: "Trusted Devices",
                value: "3",
                detail: "All active sessions are recognised and current.",
              },
              {
                label: "Recent Security Alerts",
                value: "0",
                detail: "No unresolved sign-in or device warnings detected.",
              },
            ]}
          />
          <ActivityFeed
            description="Recent authentication and security-related activity."
            items={loginActivities}
            title="Login Activity"
          />
          <DeviceList />
        </RouteFrame>
      );

    case "profile":
      return (
        <RouteFrame page={page}>
          <Card description="Verified customer and relationship details." title="Account Holder Profile">
            <DetailList
              items={[
                { label: "Full Name", value: customerProfile.fullName },
                { label: "Primary Email", value: customerProfile.email },
                { label: "Relationship Manager", value: customerProfile.relationshipManager },
                { label: "Mailing Address", value: customerProfile.mailingAddress },
              ]}
            />
          </Card>
          <InfoHighlights
            description="Profile service notes for this relationship."
            items={[
              "Relationship servicing is active and current.",
              "Paperless statements remain enabled for both accounts.",
              "Client identity and access checks are verified.",
            ]}
            title="Profile Notes"
          />
        </RouteFrame>
      );

    case "settings":
      return (
        <RouteFrame page={page}>
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
        <RouteFrame page={page}>
          <InfoHighlights
            description={page.description}
            items={page.highlights ?? []}
            title={page.title}
          />
        </RouteFrame>
      );
  }
}
