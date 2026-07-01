"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type OtpCodeInputProps = {
  label: string;
  name: string;
  length?: number;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function OtpCodeInput({
  label,
  name,
  length = 6,
}: OtpCodeInputProps) {
  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length }, () => ""),
  );
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const joinedValue = digits.join("");

  function focusInput(index: number) {
    inputsRef.current[index]?.focus();
    inputsRef.current[index]?.select();
  }

  function updateDigits(startIndex: number, rawValue: string) {
    const numericValue = onlyDigits(rawValue);

    if (!numericValue) {
      setDigits((current) => {
        const next = [...current];
        next[startIndex] = "";
        return next;
      });
      return;
    }

    setDigits((current) => {
      const next = [...current];

      for (let offset = 0; offset < numericValue.length; offset += 1) {
        const targetIndex = startIndex + offset;

        if (targetIndex >= length) {
          break;
        }

        next[targetIndex] = numericValue[offset];
      }

      const nextFocusIndex = Math.min(startIndex + numericValue.length, length - 1);
      requestAnimationFrame(() => focusInput(nextFocusIndex));

      return next;
    });
  }

  return (
    <div>
      <input
        aria-hidden="true"
        className="sr-only"
        name={name}
        readOnly
        tabIndex={-1}
        type="text"
        value={joinedValue}
      />
      <div className="text-sm text-stone-700">
        <span className="font-medium text-stone-900">{label}</span>
        <div className="mt-3 grid grid-cols-6 gap-2 sm:gap-3">
          {digits.map((digit, index) => (
            <input
              key={`${name}-${index}`}
              ref={(node) => {
                inputsRef.current[index] = node;
              }}
              autoComplete={index === 0 ? "one-time-code" : "off"}
              className={cn(
                "h-14 rounded-2xl border border-stone-200 bg-white text-center text-lg font-semibold text-stone-950 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20",
                "placeholder:text-stone-300",
              )}
              inputMode="numeric"
              maxLength={1}
              onChange={(event) => updateDigits(index, event.target.value)}
              onFocus={(event) => event.target.select()}
              onKeyDown={(event) => {
                if (event.key === "Backspace" && !digits[index] && index > 0) {
                  event.preventDefault();
                  focusInput(index - 1);
                  return;
                }

                if (event.key === "ArrowLeft" && index > 0) {
                  event.preventDefault();
                  focusInput(index - 1);
                  return;
                }

                if (event.key === "ArrowRight" && index < length - 1) {
                  event.preventDefault();
                  focusInput(index + 1);
                }
              }}
              onPaste={(event) => {
                event.preventDefault();
                updateDigits(index, event.clipboardData.getData("text"));
              }}
              pattern="[0-9]*"
              placeholder="0"
              type="text"
              value={digit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
