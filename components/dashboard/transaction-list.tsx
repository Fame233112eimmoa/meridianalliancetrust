import { Card } from "@/components/ui/card";
import type { Transaction } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type TransactionListProps = {
  title?: string;
  description?: string;
  items: Transaction[];
};

export function TransactionList({
  title = "Recent Transactions",
  description = "Recent account activity for Meridian Alliance Trust UK.",
  items,
}: TransactionListProps) {
  const postedCount = items.filter((item) => item.status !== "on-hold").length;
  const pendingCount = items.length - postedCount;

  return (
    <Card description={description} title={title}>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <div className="surface-muted p-4">
          <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">
            Posted Transactions
          </p>
          <p className="mt-2 text-2xl text-stone-950">{postedCount}</p>
        </div>
        <div className="surface-muted p-4">
          <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">
            Pending Reviews
          </p>
          <p className="mt-2 text-2xl text-stone-950">{pendingCount}</p>
        </div>
        <div className="surface-muted p-4">
          <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">
            Latest Update
          </p>
          <p className="mt-2 text-base font-medium text-stone-950">
            {items[0]?.date ?? "No activity yet"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {items.length ? (
          items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "rounded-[1.6rem] border p-5 transition",
                item.status === "on-hold"
                  ? "border-[#d7afb2] bg-[linear-gradient(135deg,rgba(139,30,36,0.08)_0%,rgba(255,255,255,0.98)_100%)]"
                  : "border-stone-200/80 bg-stone-50/70",
              )}
            >
              <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1.6fr)_13rem_9rem] lg:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-base font-medium text-stone-950">{item.name}</p>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                        item.status === "on-hold"
                          ? "bg-accent/10 text-accent-deep"
                          : "bg-white text-stone-500",
                      )}
                    >
                      {item.status === "on-hold" ? "On Hold" : "Posted"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {item.note ?? "Processed through your protected banking profile."}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-600">
                      {item.category}
                    </span>
                    <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-600">
                      {item.account}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-stone-500 lg:text-right">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">Date</p>
                  <p className="mt-2 font-medium text-stone-900">{item.date}</p>
                </div>

                <div className="lg:text-right">
                  <p
                    className={cn(
                      "text-2xl text-stone-950",
                      item.type === "credit" ? "text-accent-deep" : "text-stone-900",
                    )}
                  >
                    {item.amount}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-stone-400">
                    {item.type === "credit" ? "Credit" : "Debit"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-stone-200/80 bg-stone-50 px-5 py-6 text-sm text-stone-500">
            No transactions are available yet.
          </div>
        )}
      </div>
    </Card>
  );
}
