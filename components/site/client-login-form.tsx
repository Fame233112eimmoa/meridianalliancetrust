import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { privateAccessConfig } from "@/lib/private-access";

type ClientLoginFormProps = {
  error?: string;
};

export function ClientLoginForm({ error }: ClientLoginFormProps) {
  return (
    <div>
      <p className="eyebrow">Login</p>
      <h2 className="mt-3 text-3xl text-stone-950">Enter your approved credentials</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
        Sign in with the approved email and password before continuing to OTP verification.
      </p>

      <form
        action="/api/login"
        className="mt-8 space-y-4"
        method="post"
      >
        <Input
          autoComplete="email"
          defaultValue=""
          label="Approved email"
          name="email"
          placeholder="name@example.com"
          required
          type="email"
        />
        <Input
          autoComplete="current-password"
          defaultValue=""
          label="Password"
          name="password"
          placeholder="Enter approved password"
          required
          type="password"
        />

        {error ? (
          <p className="rounded-2xl border border-[#d8b8bb] bg-[#fcf5f6] px-4 py-3 text-sm text-[#7a1c22]">
            {error}
          </p>
        ) : null}

        <Button className="w-full" size="lg" type="submit">
          Continue to OTP
        </Button>
      </form>

      <p className="mt-4 text-xs leading-6 text-stone-500">
        After your email and password are accepted, you will be sent to{" "}
        {privateAccessConfig.otpPath}
        {" "}to complete OTP verification before opening the dashboard.
      </p>
    </div>
  );
}
