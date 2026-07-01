import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant: "horizontal" | "stacked" | "monogram";
  className?: string;
};

const logos = {
  horizontal: "/images/meridian-logo-horizontal.jpg",
  stacked: "/images/meridian-logo-stacked.jpg",
  monogram: "/images/meridian-logo-monogram.jpg",
};

export function BrandLogo({ variant, className }: BrandLogoProps) {
  return (
    <img
      alt="Meridian Alliance Trust UK"
      className={cn("block h-auto w-full", className)}
      src={logos[variant]}
    />
  );
}
