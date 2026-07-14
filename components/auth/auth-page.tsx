import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthPageProps = {
  error?: string;
};

export function AuthPage({ error }: AuthPageProps) {
  return (
    <main className="section-shell flex min-h-screen items-center py-10 sm:py-14">
      <section className="panel mx-auto w-full max-w-md p-6 sm:p-8">
        <p className="eyebrow">Login</p>
        <h1 className="mt-3 text-3xl text-stone-950">Sign In</h1>
        <form action="/api/login" className="mt-8 space-y-4" method="post">
          <Input
            autoComplete="username"
            defaultValue=""
            label="Customer number"
            name="customerNumber"
            placeholder="MTB-1024"
            required
            type="text"
          />
          <Input
            autoComplete="current-password"
            defaultValue=""
            label="Password"
            name="password"
            placeholder="Enter your password"
            required
            type="password"
          />

          {error ? (
            <p className="rounded-2xl border border-[#d8b8bb] bg-[#fcf5f6] px-4 py-3 text-sm text-[#7a1c22]">
              {error}
            </p>
          ) : null}

          <Button className="w-full" size="lg" type="submit">
            Login
          </Button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-600">
          <Link href="/contact" className="font-medium text-accent hover:text-accent-deep">
            Forgot password?
          </Link>
          <Link href="/contact" className="font-medium text-accent hover:text-accent-deep">
            Reset password
          </Link>
        </div>
      </section>
    </main>
  );
}
