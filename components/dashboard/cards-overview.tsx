"use client";

import { useState } from "react";
import type { BankCard } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type CardsOverviewProps = {
  cards: BankCard[];
  cardholderName: string;
};

function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M2 12C3.8 8.6 7.3 6 12 6s8.2 2.6 10 6c-1.8 3.4-5.3 6-10 6S3.8 15.4 2 12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      {!visible ? (
        <path
          d="M4 4 20 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.7"
        />
      ) : null}
    </svg>
  );
}

function buildVisibilityState(cards: BankCard[]) {
  return Object.fromEntries(cards.map((card) => [card.id, false])) as Record<string, boolean>;
}

function buildFreezeState(cards: BankCard[]) {
  return Object.fromEntries(
    cards.map((card) => [card.id, card.status.toLowerCase() === "frozen"]),
  ) as Record<string, boolean>;
}

function buildControlState(cards: BankCard[]) {
  return Object.fromEntries(
    cards.map((card) => [
      card.id,
      Object.fromEntries(card.controls.map((control) => [control.id, control.enabled])),
    ]),
  ) as Record<string, Record<string, boolean>>;
}

export function CardsOverview({ cards, cardholderName }: CardsOverviewProps) {
  const [visibleNumbers, setVisibleNumbers] = useState<Record<string, boolean>>(() =>
    buildVisibilityState(cards),
  );
  const [frozenCards, setFrozenCards] = useState<Record<string, boolean>>(() =>
    buildFreezeState(cards),
  );
  const [controlStates, setControlStates] = useState<Record<string, Record<string, boolean>>>(() =>
    buildControlState(cards),
  );

  function toggleNumber(cardId: string) {
    setVisibleNumbers((current) => ({
      ...current,
      [cardId]: !current[cardId],
    }));
  }

  function toggleFreeze(cardId: string) {
    setFrozenCards((current) => ({
      ...current,
      [cardId]: !current[cardId],
    }));
  }

  function toggleControl(cardId: string, controlId: string) {
    setControlStates((current) => ({
      ...current,
      [cardId]: {
        ...current[cardId],
        [controlId]: !current[cardId]?.[controlId],
      },
    }));
  }

  return (
    <div className="space-y-6">
      {cards.map((card) => {
        const isVisible = visibleNumbers[card.id];
        const isFrozen = frozenCards[card.id];
        const cardNumber = isVisible ? card.fullNumber : card.number;

        return (
          <Card
            key={card.id}
            action={
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  isFrozen
                    ? "bg-[#f9e8e9] text-accent-deep"
                    : "bg-accent-soft text-stone-800",
                )}
              >
                {isFrozen ? "Frozen" : "Active"}
              </span>
            }
            description={card.description}
            title={card.name}
          >
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <div className="space-y-4">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[2rem] border border-[#a63e43]/30 bg-[linear-gradient(135deg,#240507_0%,#511015_40%,#8B1E24_100%)] p-6 text-white shadow-soft transition",
                    isFrozen && "saturate-[0.78]",
                  )}
                >
                  <button
                    aria-label={isVisible ? "Hide full card number" : "View full card number"}
                    aria-pressed={isVisible}
                    className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/85 transition hover:bg-white/15"
                    onClick={() => toggleNumber(card.id)}
                    type="button"
                  >
                    <EyeIcon visible={isVisible} />
                  </button>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                        {card.type}
                      </p>
                      <p className="mt-3 text-2xl">{card.name}</p>
                    </div>
                    <span className="rounded-full bg-white/12 px-3 py-1 pr-14 text-xs font-medium text-white/85">
                      {isFrozen ? "Frozen" : "Ready to use"}
                    </span>
                  </div>

                  <div className="mt-12">
                    <p className="text-3xl tracking-[0.22em]">{cardNumber}</p>
                    <div className="mt-5 flex items-center justify-between gap-4 text-sm text-white/75">
                      <span>{cardholderName}</span>
                      <span>Exp {card.expires}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => toggleFreeze(card.id)}
                    size="sm"
                    variant={isFrozen ? "primary" : "secondary"}
                  >
                    {isFrozen ? "Unfreeze Card" : "Freeze Card"}
                  </Button>
                </div>

                {isFrozen ? (
                  <div className="rounded-[1.5rem] border border-[#d9b5b8] bg-[#fcf5f6] px-4 py-4 text-sm leading-7 text-[#7a1c22]">
                    This card is currently frozen. In-store purchases, online payments,
                    contactless use, and cash access remain blocked until it is unfrozen.
                  </div>
                ) : null}
              </div>

              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="surface-muted p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                      Cardholder
                    </p>
                    <p className="mt-2 font-medium text-stone-950">{cardholderName}</p>
                  </div>
                  <div className="surface-muted p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                      Linked View
                    </p>
                    <p className="mt-2 font-medium text-stone-950">{card.linkedView}</p>
                  </div>
                  <div className="surface-muted p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                      Expiry
                    </p>
                    <p className="mt-2 font-medium text-stone-950">{card.expires}</p>
                  </div>
                  <div className="surface-muted p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                      Security
                    </p>
                    <p className="mt-2 font-medium text-stone-950">OTP protected access</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                Card Controls
              </p>

              <div className="mt-3 grid gap-3 lg:grid-cols-3">
                {card.controls.map((control) => (
                  <label
                    key={control.id}
                    className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-stone-200/80 bg-stone-50 p-5"
                  >
                    <div>
                      <p className="font-medium text-stone-950">{control.label}</p>
                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {control.description}
                      </p>
                    </div>
                    <span className="relative mt-1 inline-flex h-7 w-12 shrink-0 items-center">
                      <input
                        checked={Boolean(controlStates[card.id]?.[control.id])}
                        className="peer sr-only"
                        onChange={() => toggleControl(card.id, control.id)}
                        type="checkbox"
                      />
                      <span className="absolute inset-0 rounded-full bg-stone-300 transition peer-checked:bg-accent" />
                      <span className="absolute left-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
