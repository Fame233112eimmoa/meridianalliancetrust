import type { Metadata } from "next";
import { PublicShell } from "@/components/site/public-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { buildIndexableMetadata } from "@/lib/seo";

export const metadata: Metadata = buildIndexableMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Reach Meridian Alliance Trust USA for onboarding questions, account support, and general banking inquiries.",
});

export default function ContactPage() {
  return (
    <PublicShell>
      <section className="section-shell py-10 sm:py-14 lg:py-20">
        <PageHeader
          eyebrow="Contact"
          title="Connect with Meridian Alliance Trust USA"
          description="Reach out for account support, relationship service, and general banking inquiries through a refined digital contact experience."
        />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card
            title="Send a Message"
            description="Use the contact form for support, onboarding, and account service requests."
          >
            <form className="grid gap-4 sm:grid-cols-2">
              <Input label="Full name" placeholder="Enter your name" />
              <Input label="Email address" placeholder="you@example.com" type="email" />
              <Input label="Phone number" placeholder="+1 (212) 555-0198" type="tel" />
              <Input label="Subject" placeholder="How can we help?" />
              <label className="block text-sm text-stone-700 sm:col-span-2">
                <span className="font-medium text-stone-900">Message</span>
                <textarea
                  className="input-field min-h-40 resize-none"
                  placeholder="Write your inquiry here"
                />
              </label>
              <div className="sm:col-span-2">
                <Button size="lg">Send Message</Button>
              </div>
            </form>
          </Card>

          <Card title="Client Service Desk" description="Primary service details for client communication and relationship support.">
            <div className="grid gap-5 text-sm leading-7 text-stone-600 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Hours</p>
                <p className="mt-2 font-medium text-stone-950">Mon to Fri, 8:00 AM to 6:00 PM ET</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Response Target</p>
                <p className="mt-2 font-medium text-stone-950">Within one business day</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Email</p>
                <p className="mt-2 font-medium text-stone-950">clientservices@meridianalliancetrustusa.example</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Phone</p>
                <p className="mt-2 font-medium text-stone-950">+1 (212) 555-0198</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PublicShell>
  );
}
