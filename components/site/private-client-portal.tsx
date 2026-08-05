import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
type PrivateClientPortalProps = {
  accountName: string;
  approvedCustomerNumber: string;
};

export function PrivateClientPortal({
  accountName,
  approvedCustomerNumber,
}: PrivateClientPortalProps) {
  return (
    <main className="section-shell py-10 sm:py-14 lg:py-20">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="eyebrow">Secure Dashboard</p>
          <h1 className="text-4xl text-stone-950 sm:text-5xl">Welcome back, {accountName}</h1>
          <p className="max-w-3xl text-base leading-7 text-stone-600">
            This dashboard is restricted to the signed-in customer profile, its approved
            credentials, and the signed server session configured for this deployment.
          </p>
        </div>
        <form action="/api/logout" method="post">
          <Button type="submit" variant="secondary">
            Sign Out
          </Button>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          title="Approved Customer Number"
          description="The exact customer number associated with the current protected session."
        >
          <p className="text-base font-medium text-stone-950">{approvedCustomerNumber}</p>
        </Card>

        <Card
          title="Password & OTP Control"
          description="Both values can be changed later from your deployment environment."
        >
          <p className="text-sm leading-7 text-stone-600">
            Update `PRIVATE_ACCESS_PASSWORD`, `PRIVATE_ACCESS_PASSWORD_2`, `PRIVATE_ACCESS_OTP`,
            `PRIVATE_ACCESS_OTP_2`, and `PRIVATE_ACCESS_SESSION_SECRET`, then redeploy when you
            want to rotate access.
          </p>
        </Card>

        <Card
          title="Dashboard Security"
          description="This access layer is enforced on the server before the dashboard loads."
        >
          <p className="text-sm leading-7 text-stone-600">
            Public website pages can still be indexed, while this dashboard remains outside Google
            indexing and requires the approved credentials every time.
          </p>
        </Card>
      </div>
    </main>
  );
}
