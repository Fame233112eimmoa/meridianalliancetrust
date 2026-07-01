import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  wrapperClassName?: string;
};

export function Input({
  label,
  hint,
  wrapperClassName,
  className,
  ...props
}: InputProps) {
  return (
    <label className={cn("block text-sm text-stone-700", wrapperClassName)}>
      <span className="font-medium text-stone-900">{label}</span>
      <input className={cn("input-field", className)} {...props} />
      {hint ? <span className="mt-2 block text-xs text-stone-500">{hint}</span> : null}
    </label>
  );
}

