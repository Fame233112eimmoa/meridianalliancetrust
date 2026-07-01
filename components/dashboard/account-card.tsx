import type { Account } from "@/lib/site-data";
import { Card } from "@/components/ui/card";

type AccountCardProps = {
  account: Account;
};

export function AccountCard({ account }: AccountCardProps) {
  return (
    <Card description={account.description} title={account.name}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-stone-500">Balance</p>
            <p className="mt-2 text-3xl text-stone-950">{account.balance}</p>
          </div>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-stone-700">
            {account.number}
          </span>
        </div>

        <div className="grid gap-3 rounded-[1.5rem] border border-stone-200/70 bg-stone-50 p-4 text-sm text-stone-600 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Available</p>
            <p className="mt-1 font-medium text-stone-900">{account.available}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Movement</p>
            <p className="mt-1 font-medium text-stone-900">{account.change}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
