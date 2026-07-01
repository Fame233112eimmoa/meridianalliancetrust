import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Card({
  title,
  description,
  action,
  children,
  className,
}: CardProps) {
  return (
    <section className={cn("panel p-6 sm:p-7", className)}>
      {title || description || action ? (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            {title ? <h3 className="text-2xl text-stone-950">{title}</h3> : null}
            {description ? (
              <p className="max-w-2xl text-sm leading-6 text-stone-600">{description}</p>
            ) : null}
          </div>
          {action ? <div>{action}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

