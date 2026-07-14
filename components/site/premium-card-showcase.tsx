export function PremiumCardShowcase() {
  return (
    <div className="relative min-h-[20rem] overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.14),transparent_32%),linear-gradient(145deg,#100304_0%,#4a0e13_48%,#a11f29_100%)] p-5 sm:min-h-[24rem]">
      <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.26),transparent_70%)] blur-xl" />
      <div className="absolute bottom-3 left-1/2 h-16 w-52 -translate-x-1/2 rounded-full bg-[#ff5968]/30 blur-3xl" />

      <div className="relative mx-auto flex h-full max-w-md items-end justify-center">
        <div className="absolute bottom-0 h-20 w-[88%] rounded-[1.8rem] border border-white/8 bg-stone-950/70 shadow-[0_26px_70px_rgba(0,0,0,0.5)] backdrop-blur-sm" />

        <div className="relative ml-auto aspect-[0.7] w-[72%] rotate-[14deg] rounded-[1.9rem] border border-white/14 bg-[linear-gradient(160deg,#280507_0%,#5d1017_54%,#c02a35_100%)] p-5 text-white shadow-[0_30px_70px_rgba(0,0,0,0.55)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.38em] text-white/72">
                Meridian
              </p>
              <p
                className="mt-1 text-2xl leading-none tracking-[0.18em] text-white"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                M
              </p>
            </div>
            <div className="grid gap-1 text-right">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-white/80">
                Alliance Trust USA
              </p>
              <p className="text-[0.52rem] uppercase tracking-[0.42em] text-white/56">
                Private Banking
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-10 w-14 rounded-xl bg-[linear-gradient(145deg,#d8d8d8_0%,#f7f7f7_50%,#a9a9a9_100%)] shadow-inner" />
            <div className="ml-auto flex items-center gap-1.5 text-white/88">
              <span className="h-2 w-2 rounded-full border border-current" />
              <span className="h-3.5 w-3.5 rounded-full border border-current" />
              <span className="h-5 w-5 rounded-full border border-current" />
            </div>
          </div>

          <div className="mt-12">
            <p className="text-[0.62rem] uppercase tracking-[0.38em] text-white/54">
              Approved Client Card
            </p>
            <p className="mt-3 text-lg tracking-[0.3em] text-white/92">•••• 8821</p>
          </div>
        </div>
      </div>
    </div>
  );
}
