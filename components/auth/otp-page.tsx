import Link from "next/link";
import { OtpCodeInput } from "@/components/auth/otp-code-input";
import { Button } from "@/components/ui/button";
import { privateAccessConfig } from "@/lib/private-access";

type OtpPageProps = {
  error?: string;
};

export function OtpPage({ error }: OtpPageProps) {
  return (
    <main className="section-shell flex min-h-screen items-center py-10 sm:py-14">
      <section className="panel mx-auto w-full max-w-md p-6 sm:p-8">
        <p className="eyebrow">OTP</p>
        <h1 className="mt-3 text-3xl text-stone-950">Enter Code</h1>
        <form action="/api/verify-otp" className="mt-8 space-y-4" method="post">
          <OtpCodeInput label="OTP" name="otp" />

          {error ? (
            <p className="rounded-2xl border border-[#d8b8bb] bg-[#fcf5f6] px-4 py-3 text-sm text-[#7a1c22]">
              {error}
            </p>
          ) : null}

          <Button className="w-full" size="lg" type="submit">
            Verify OTP
          </Button>
        </form>

        <div className="mt-5 text-sm text-stone-600">
          <Link href={privateAccessConfig.loginPath} className="font-medium text-accent hover:text-accent-deep">
            Back to login
          </Link>
        </div>
      </section>
    </main>
  );
}
