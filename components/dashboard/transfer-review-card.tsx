"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type TransferField = {
  label: string;
  placeholder?: string;
  type?: string;
  control?: "input" | "textarea";
  options?: string[];
  hint?: string;
  fullWidth?: boolean;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
};

export type TransferSection = {
  title: string;
  description: string;
  fields: TransferField[];
};

type TransferContextItem = {
  label: string;
  value: string;
  detail: string;
};

type TransferReviewCardProps = {
  title: string;
  description: string;
  sections: TransferSection[];
  submitLabel: string;
  contextItems?: TransferContextItem[];
  checklist?: string[];
};

type SendState = "idle" | "failed";

function getAllFields(sections: TransferSection[]) {
  return sections.flatMap((section) => section.fields);
}

function buildInitialValues(sections: TransferSection[]) {
  const nextValues: Record<string, string> = {};

  for (const field of getAllFields(sections)) {
    nextValues[field.label] = field.defaultValue ?? "";
  }

  return nextValues;
}

function buildFailureReason() {
  return "This transfer could not be completed because the account has been dormant for a long time. A deposit of £150,000 must be made into the account to remove it from its dormant state.";
}

export function TransferReviewCard({
  title,
  description,
  sections,
  submitLabel,
  contextItems = [],
  checklist = [],
}: TransferReviewCardProps) {
  const [values, setValues] = useState<Record<string, string>>(() => buildInitialValues(sections));
  const [reviewError, setReviewError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendState, setSendState] = useState<SendState>("idle");
  const timeoutRef = useRef<number | null>(null);
  const allFields = getAllFields(sections);

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
    values["Beneficiary bank"] ||
    "Selected recipient";
  const fromAccount = values["From account"];
  const failureReason = buildFailureReason();

  const previewSections = sections
    .map((section) => ({
      ...section,
      fields: section.fields.filter((field) => values[field.label]?.trim()),
    }))
    .filter((section) => section.fields.length);

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
    const hasMissingRequiredValue = allFields.some(
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
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              handleReview();
            }}
          >
            {sections.map((section) => (
              <section key={section.title} className="surface-muted p-5 sm:p-6">
                <div className="border-b border-[#ead8da] pb-4">
                  <p className="eyebrow">{section.title}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">{section.description}</p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {section.fields.map((field) => {
                    const wrapperClassName = field.fullWidth ? "sm:col-span-2" : "";
                    const optional = field.required === false;

                    if (field.options) {
                      return (
                        <label
                          key={field.label}
                          className={`block text-sm text-stone-700 ${wrapperClassName}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-stone-900">{field.label}</span>
                            {optional ? (
                              <span className="text-[10px] uppercase tracking-[0.24em] text-stone-400">
                                Optional
                              </span>
                            ) : null}
                          </div>
                          <select
                            className="input-field"
                            onChange={(event) => updateField(field.label, event.target.value)}
                            value={values[field.label] ?? ""}
                          >
                            {field.placeholder && !field.defaultValue ? (
                              <option disabled value="">
                                {field.placeholder}
                              </option>
                            ) : null}
                            {field.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          {field.hint ? (
                            <span className="mt-2 block text-xs leading-6 text-stone-500">
                              {field.hint}
                            </span>
                          ) : null}
                        </label>
                      );
                    }

                    if (field.control === "textarea") {
                      return (
                        <label key={field.label} className={`block text-sm text-stone-700 ${wrapperClassName}`}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-stone-900">{field.label}</span>
                            {optional ? (
                              <span className="text-[10px] uppercase tracking-[0.24em] text-stone-400">
                                Optional
                              </span>
                            ) : null}
                          </div>
                          <textarea
                            className="input-field min-h-32 resize-none"
                            onChange={(event) => updateField(field.label, event.target.value)}
                            placeholder={field.placeholder}
                            rows={field.rows ?? 4}
                            value={values[field.label] ?? ""}
                          />
                          {field.hint ? (
                            <span className="mt-2 block text-xs leading-6 text-stone-500">
                              {field.hint}
                            </span>
                          ) : null}
                        </label>
                      );
                    }

                    return (
                      <label key={field.label} className={`block text-sm text-stone-700 ${wrapperClassName}`}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-stone-900">{field.label}</span>
                          {optional ? (
                            <span className="text-[10px] uppercase tracking-[0.24em] text-stone-400">
                              Optional
                            </span>
                          ) : null}
                        </div>
                        <input
                          className="input-field"
                          onChange={(event) => updateField(field.label, event.target.value)}
                          placeholder={field.placeholder}
                          type={field.type ?? "text"}
                          value={values[field.label] ?? ""}
                        />
                        {field.hint ? (
                          <span className="mt-2 block text-xs leading-6 text-stone-500">
                            {field.hint}
                          </span>
                        ) : null}
                      </label>
                    );
                  })}
                </div>
              </section>
            ))}

            {reviewError ? (
              <p className="rounded-2xl border border-[#d8b8bb] bg-[#fcf5f6] px-4 py-3 text-sm text-[#7a1c22]">
                {reviewError}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 rounded-[1.5rem] border border-stone-200/80 bg-stone-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-7 text-stone-600">
                Review completes a final check on beneficiary details, payment purpose, and available funds before release.
              </p>
              <Button size="lg" type="submit">
                {submitLabel}
              </Button>
            </div>
          </form>

          <aside className="space-y-4">
            {contextItems.length ? (
              <div className="surface-muted p-5">
                <p className="eyebrow">Transfer Controls</p>
                <div className="mt-4 space-y-4">
                  {contextItems.map((item) => (
                    <div key={item.label} className="rounded-[1.2rem] bg-white/80 px-4 py-4">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400">
                        {item.label}
                      </p>
                      <p className="mt-2 text-base font-medium text-stone-950">{item.value}</p>
                      <p className="mt-1 text-sm leading-6 text-stone-600">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {checklist.length ? (
              <div className="surface-muted p-5">
                <p className="eyebrow">Before You Send</p>
                <div className="mt-4 space-y-3">
                  {checklist.map((item) => (
                    <div key={item} className="flex gap-3 rounded-[1.2rem] bg-white/80 px-4 py-4">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
                      <p className="text-sm leading-7 text-stone-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
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

              <div className="mt-4 space-y-4">
                {previewSections.map((section) => (
                  <div key={section.title}>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400">
                      {section.title}
                    </p>
                    <div className="mt-2 space-y-3">
                      {section.fields.map((field) => (
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
