import Link from "next/link";
import type { ReactNode } from "react";

export type PageHeaderBreadcrumb = {
  label: string;
  href: string;
};

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  breadcrumbs?: PageHeaderBreadcrumb[];
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  breadcrumbs = [],
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-3">
        {breadcrumbs.length ? (
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-stone-500"
          >
            {breadcrumbs.map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                <Link href={item.href} className="transition hover:text-stone-950">
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        ) : null}
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="text-4xl leading-tight text-stone-950 sm:text-5xl">{title}</h1>
        <p className="max-w-2xl text-base leading-7 text-stone-600">{description}</p>
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  );
}
