import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { PublicShell } from "@/components/site/public-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { buildIndexableMetadata, buildPageStructuredData, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildIndexableMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Reach Meridian Alliance Trust UK for onboarding questions, account support, and general banking enquiries.",
});

const structuredData = buildPageStructuredData({
  path: "/contact",
  title: "Contact",
  description:
    "Reach Meridian Alliance Trust UK for onboarding questions, account support, and general banking enquiries.",
  pageType: "ContactPage",
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Contact", path: "/contact" },
  ],
});

export default function ContactPage() {
  return (
    <PublicShell>
      <StructuredData data={structuredData} id="contact-structured-data" />
      <section className="section-shell py-10 sm:py-14 lg:py-20">
        <PageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" },
          ]}
          eyebrow="Contact"
          title="Connect with Meridian Alliance Trust UK"
          description="Reach out for account support, relationship service, and general banking enquiries through a refined digital contact experience."
        />

        <section aria-labelledby="contact-options-heading">
          <h2 id="contact-options-heading" className="sr-only">
            Contact options
          </h2>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Card
              title="Send a Message"
              description="Use the contact form for support, onboarding, and account service requests."
            >
              <form className="grid gap-4 sm:grid-cols-2">
                <Input label="Full name" placeholder="Enter your name" />
                <Input label="Email address" placeholder="you@example.com" type="email" />
                <Input label="Phone number" placeholder="+44 7700 900123" type="tel" />
                <Input label="Subject" placeholder="How can we help?" />
                <label className="block text-sm text-stone-700 sm:col-span-2">
                  <span className="font-medium text-stone-900">Message</span>
                  <textarea
                    className="input-field min-h-40 resize-none"
                    placeholder="Write your enquiry here"
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
                  <p className="mt-2 font-medium text-stone-950">Mon to Fri, 8:00 to 18:00</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Response Target</p>
                  <p className="mt-2 font-medium text-stone-950">Within one business day</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Email</p>
                  <p className="mt-2 font-medium text-stone-950">{siteConfig.contactEmail}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Phone</p>
                  <p className="mt-2 font-medium text-stone-950">{siteConfig.contactPhone}</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </section>
    </PublicShell>
  );
}
