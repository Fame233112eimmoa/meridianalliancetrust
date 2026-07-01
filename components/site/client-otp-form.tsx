import { OtpCodeInput } from "@/components/auth/otp-code-input";
import { Button } from "@/components/ui/button";
import { privateAccessConfig } from "@/lib/private-access";

type ClientOtpFormProps = {
  error?: string;
};

export function ClientOtpForm({ error }: ClientOtpFormProps) {
  return (
    <div>
      <p className="eyebrow">One-Time Passcode</p>
      <h2 className="mt-3 text-3xl text-stone-950">Complete OTP verification</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
        Enter the approved 6-digit passcode to finish login and open the dashboard.
      </p>

      <form
        action="/api/verify-otp"
        className="mt-8 space-y-4"
        method="post"
      >
        <OtpCodeInput label="Approved OTP" name="otp" />

        {error ? (
          <p className="rounded-2xl border border-[#d8b8bb] bg-[#fcf5f6] px-4 py-3 text-sm text-[#7a1c22]">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="sm:flex-1" size="lg" type="submit">
            Verify OTP
          </Button>
          <Button
            href={privateAccessConfig.loginPath}
            className="sm:flex-1"
            size="lg"
            variant="secondary"
          >
            Start Over
          </Button>
        </div>
      </form>
    </div>
  );
}
