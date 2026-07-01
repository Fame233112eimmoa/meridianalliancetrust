import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

type LinkButtonProps = SharedProps & {
  href: string;
  target?: string;
};

type NativeButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses = {
  primary:
    "bg-accent text-white hover:bg-accent-deep focus-visible:ring-accent/30",
  secondary:
    "bg-accent-soft text-accent hover:bg-accent-muted focus-visible:ring-accent/30",
  ghost:
    "bg-transparent text-accent hover:bg-accent-soft focus-visible:ring-accent/20",
};

const sizeClasses = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-sm",
};

function buttonClassName(
  variant: SharedProps["variant"] = "primary",
  size: SharedProps["size"] = "md",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export function Button(props: ButtonProps) {
  if ("href" in props && props.href) {
    const { children, className, variant, size, href, target } = props;

    return (
      <Link
        href={href}
        target={target}
        className={buttonClassName(variant, size, className)}
      >
        {children}
      </Link>
    );
  }

  const nativeProps = props as NativeButtonProps;
  const { children, className, variant, size, ...rest } = nativeProps;

  return (
    <button
      {...rest}
      className={buttonClassName(variant, size, className)}
      type={rest.type ?? "button"}
    >
      {children}
    </button>
  );
}
