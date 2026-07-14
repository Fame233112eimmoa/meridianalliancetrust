import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant: "horizontal" | "stacked" | "monogram";
  tone?: "dark" | "light";
  className?: string;
};

const serifStyle = { fontFamily: "var(--font-serif)" } as const;

const tones = {
  dark: {
    ring: "border-[#d8c3c5] bg-white/90",
    monogram: "text-accent",
    wordmark: "text-stone-950",
    accent: "text-accent-deep",
    detail: "text-stone-500",
    divider: "bg-[#d7afb2]",
  },
  light: {
    ring: "border-white/20 bg-white/10",
    monogram: "text-white",
    wordmark: "text-white",
    accent: "text-[#f6d8da]",
    detail: "text-white/72",
    divider: "bg-white/28",
  },
} as const;

function Monogram({ tone }: { tone: BrandLogoProps["tone"] }) {
  const palette = tones[tone ?? "dark"];

  return (
    <div
      className={cn(
        "grid aspect-square place-items-center rounded-full border shadow-[0_12px_32px_rgba(139,30,36,0.14)]",
        palette.ring,
      )}
    >
      <span
        className={cn("text-[2rem] leading-none sm:text-[2.2rem]", palette.monogram)}
        style={serifStyle}
      >
        M
      </span>
    </div>
  );
}

export function BrandLogo({
  variant,
  tone = "dark",
  className,
}: BrandLogoProps) {
  const palette = tones[tone];

  if (variant === "monogram") {
    return (
      <div
        aria-label="Meridian Alliance Trust USA"
        className={cn("inline-flex w-14", className)}
        role="img"
      >
        <Monogram tone={tone} />
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div
        aria-label="Meridian Alliance Trust USA"
        className={cn("inline-flex w-full flex-col items-center gap-3 text-center", className)}
        role="img"
      >
        <div className="w-[4.25rem]">
          <Monogram tone={tone} />
        </div>
        <div className="min-w-0">
          <p
            className={cn("text-[2rem] leading-none tracking-[0.22em]", palette.wordmark)}
            style={serifStyle}
          >
            MERIDIAN
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className={cn("h-px flex-1", palette.divider)} />
            <p className={cn("text-[0.62rem] font-semibold uppercase tracking-[0.34em]", palette.accent)}>
              Alliance Trust USA
            </p>
            <span className={cn("h-px flex-1", palette.divider)} />
          </div>
          <p className={cn("mt-2 text-[0.62rem] uppercase tracking-[0.42em]", palette.detail)}>
            Private Banking
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label="Meridian Alliance Trust USA"
      className={cn("inline-flex w-full items-center gap-3", className)}
      role="img"
    >
      <div className="w-[2.9rem] shrink-0">
        <Monogram tone={tone} />
      </div>
      <div className="min-w-0">
        <p
          className={cn("text-[1.28rem] leading-none tracking-[0.22em]", palette.wordmark)}
          style={serifStyle}
        >
          MERIDIAN
        </p>
        <p className={cn("mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.34em]", palette.accent)}>
          Alliance Trust USA
        </p>
        <p className={cn("mt-1 text-[0.5rem] uppercase tracking-[0.42em]", palette.detail)}>
          Private Banking
        </p>
      </div>
    </div>
  );
}
