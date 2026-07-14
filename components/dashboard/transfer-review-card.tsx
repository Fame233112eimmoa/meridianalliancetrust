"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export type TransferField = {
  label: string;
  placeholder?: string;
  type?: string;
  options?: string[];
  hint?: string;
  fullWidth?: boolean;
  defaultValue?: string;
  required?: boolean;
};

type TransferReviewCardProps = {
  title: string;
  description: string;
  fields: TransferField[];
  submitLabel: string;
};

type SendState = "idle" | "failed";

function buildInitialValues(fields: TransferField[]) {
  const nextValues: Record<string, string> = {};

  for (const field of fields) {
    nextValues[field.label] = field.defaultValue ?? "";
  }

  return nextValues;
}

function buildFailureReason(fields: TransferField[]) {
  if (fields.some((field) => field.label === "SWIFT / BIC")) {
    return "This transfer could not be completed because the account has been dormant for a long time. A deposit of £150,000 must be made into the account to remove it from its dormant state.";
  }

  if (fields.some((field) => field.label === "To account")) {
    return "This transfer could not be completed because the account has been dormant for a long time. A deposit of £150,000 must be made into the account to remove it from its dormant state.";
  }

  return "This transfer could not be completed because the account has been dormant for a long time. A deposit of £150,000 must be made into the account to remove it from its dormant state.";
}

export function TransferReviewCard({
  title,
  description,
  fields,
  submitLabel,
}: TransferReviewCardProps) {
  const [values, setValues] = useState<Record<string, string>>(() => buildInitialValues(fields));
  const [reviewError, setReviewError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendState, setSendState] = useState<SendState>("idle");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const previewAmount = values["Amount"] || "£0.00";
  const recipientName =
    values["Beneficiary name"] ||
    values["To account"] ||
    values["IBAN / Account"] ||
    values["Account number"] ||
    "Selected recipient";
  const fromAccount = values["From account"];
  const failureReason = buildFailureReason(fields);

  const previewFields = fields.filter((field) => values[field.label]?.trim());

  function updateField(label: string, value: string) {
    setValues((current) => ({
      ...current,
      [label]: value,
    }));
  }

  function closePreview() {
    if (isSending) {
      return;
    }

    setShowPreview(false);
  }

  function closeFailurePopup() {
    setSendState("idle");
  }

  function handleReview() {
    const hasMissingRequiredValue = fields.some(
      (field) => (field.required ?? true) && !values[field.label]?.trim(),
    );

    if (hasMissingRequiredValue) {
      setReviewError("Complete all transfer details before reviewing the transfer.");
      return;
    }

    setReviewError("");
    setSendState("idle");
    setShowPreview(true);
  }

  function handleSend() {
    if (isSending) {
      return;
    }

    setIsSending(true);
    setSendState("idle");

    timeoutRef.current = window.setTimeout(() => {
      setIsSending(false);
      setShowPreview(false);
      setSendState("failed");
      timeoutRef.current = null;
    }, 7000);
  }

  return (
    <>
      <Card description={description} title={title}>
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            handleReview();
          }}
        >
          {fields.map((field) => {
            if (field.options) {
              return (
                <label
                  key={field.label}
                  className={`block text-sm text-stone-700 ${field.fullWidth ? "sm:col-span-2" : ""}`}
                >
                  <span className="font-medium text-stone-900">{field.label}</span>
                  <select
                    className="input-field"
                    onChange={(event) => updateField(field.label, event.target.value)}
                    value={values[field.label] ?? ""}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {field.hint ? (
                    <span className="mt-2 block text-xs text-stone-500">{field.hint}</span>
                  ) : null}
                </label>
              );
            }

            return (
              <Input
                key={field.label}
                hint={field.hint}
                label={field.label}
                onChange={(event) => updateField(field.label, event.target.value)}
                placeholder={field.placeholder}
                type={field.type ?? "text"}
                value={values[field.label] ?? ""}
                wrapperClassName={field.fullWidth ? "sm:col-span-2" : ""}
              />
            );
          })}

          {reviewError ? (
            <p className="rounded-2xl border border-[#d8b8bb] bg-[#fcf5f6] px-4 py-3 text-sm text-[#7a1c22] sm:col-span-2">
              {reviewError}
            </p>
          ) : null}

          <div className="pt-2 sm:col-span-2">
            <Button size="lg" type="submit">
              {submitLabel}
            </Button>
          </div>
        </form>
      </Card>

      {showPreview ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            aria-label="Close transfer preview"
            className="absolute inset-0 bg-stone-950/35 backdrop-blur-[2px]"
            onClick={closePreview}
            type="button"
          />

          <section className="panel relative z-10 w-full max-w-lg p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Transfer Preview</p>
                <h3 className="mt-2 text-2xl text-stone-950">Review before sending</h3>
              </div>

              <Button
                className="shrink-0"
                onClick={closePreview}
                size="sm"
                type="button"
                variant="ghost"
              >
                Close
              </Button>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-[#d7afb2] bg-[linear-gradient(135deg,rgba(139,30,36,0.08)_0%,rgba(255,255,255,0.98)_100%)] p-4">
              <div className="flex items-end justify-between gap-4 border-b border-stone-200/80 pb-4">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">
                    Recipient
                  </p>
                  <p className="mt-2 text-lg font-medium text-stone-950">{recipientName}</p>
                  <p className="mt-1 text-sm text-stone-600">
                    {fromAccount ? `${fromAccount} to ${recipientName}` : title}
                  </p>
                </div>
                <p className="text-2xl text-accent-deep">{previewAmount}</p>
              </div>

              <div className="mt-4 space-y-3">
                {previewFields.map((field) => (
                  <div
                    key={field.label}
                    className="flex items-start justify-between gap-4 rounded-[1.1rem] bg-white/80 px-3 py-3"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      {field.label}
                    </p>
                    <p className="max-w-[15rem] text-right text-sm font-medium text-stone-950">
                      {values[field.label]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {isSending ? (
              <div className="mt-6 rounded-[1.5rem] border border-stone-200/80 bg-stone-50 px-4 py-4 text-sm text-stone-600">
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-accent" />
                  <span>
                    Sending transfer request. Processing is in progress and may take a few seconds.
                  </span>
                </div>
              </div>
            ) : null}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                disabled={isSending}
                onClick={closePreview}
                size="lg"
                type="button"
                variant="secondary"
              >
                Edit Details
              </Button>
              <Button disabled={isSending} onClick={handleSend} size="lg" type="button">
                {isSending ? "Sending..." : "Send"}
              </Button>
            </div>
          </section>
        </div>
      ) : null}

      {sendState === "failed" ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            aria-label="Close transfer failure message"
            className="absolute inset-0 bg-stone-950/35 backdrop-blur-[2px]"
            onClick={closeFailurePopup}
            type="button"
          />

          <section className="panel relative z-10 w-full max-w-md p-5 sm:p-6">
            <p className="eyebrow">Transfer Failed</p>
            <h3 className="mt-2 text-2xl text-stone-950">Unable to send transfer</h3>
            <p className="mt-4 rounded-[1.25rem] border border-[#d8b8bb] bg-[#fcf5f6] px-4 py-4 text-sm leading-7 text-[#7a1c22]">
              {failureReason}
            </p>

            <div className="mt-5 flex justify-end">
              <Button onClick={closeFailurePopup} size="lg" type="button" variant="secondary">
                Back to Details
              </Button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
