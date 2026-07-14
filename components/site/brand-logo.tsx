import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant: "horizontal" | "stacked" | "monogram";
  className?: string;
};

const logos = {
  horizontal: {
    src: "/images/meridian-logo-horizontal.jpg",
    width: 932,
    height: 240,
  },
  stacked: {
    src: "/images/meridian-logo-stacked.jpg",
    width: 1290,
    height: 583,
  },
  monogram: {
    src: "/images/meridian-logo-monogram.jpg",
    width: 312,
    height: 262,
  },
};

export function BrandLogo({ variant, className }: BrandLogoProps) {
  const logo = logos[variant];

  return (
    <Image
      alt="Meridian Alliance Trust UK"
      className={cn("block h-auto w-full", className)}
      src={logo.src}
      width={logo.width}
      height={logo.height}
      sizes={
        variant === "horizontal"
          ? "(min-width: 1024px) 14.5rem, (min-width: 640px) 13rem, 11.5rem"
          : variant === "stacked"
            ? "(min-width: 640px) 16rem, 14rem"
            : "4rem"
      }
    />
  );
}
