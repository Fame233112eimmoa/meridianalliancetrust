import type { Metadata } from "next";
import { PublicShell } from "@/components/site/public-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { buildIndexableMetadata } from "@/lib/seo";

const supportBlocks = [
  {
    title: "Login Help",
    copy: "Go to the secure login page to begin the email, password, and OTP flow for dashboard access.",
    href: "/login",
  },
  {
    title: "Payments Guidance",
    copy: "Speak with our team about domestic and international payment questions, documentation, and next steps.",
    href: "/contact",
  },
  {
    title: "Card Support",
    copy: "Get help with card servicing, replacement questions, and general support through the public contact channels.",
    href: "/contact",
  },
];

const faqs = [
  {
    question: "How do I sign in to the dashboard?",
    answer: "Use the login page, enter the approved email and password, then complete OTP verification to reach the dashboard.",
  },
  {
    question: "Can I request help for card-related questions here?",
    answer: "Yes. Use the contact page for card servicing inquiries, replacement questions, and general client assistance.",
  },
  {
    question: "Where can I get help with transfers or account questions?",
    answer: "Use the contact page for guided assistance with payments, onboarding, client support, and general account questions.",
  },
];

export const metadata: Metadata = buildIndexableMetadata({
  path: "/support",
  title: "Support",
  description:
    "Explore support pathways for login, cards, transfers, and everyday client help at Meridian Alliance Trust USA.",
});

export default function SupportPage() {
  return (
    <PublicShell>
      <section className="section-shell py-10 sm:py-14 lg:py-20">
        <PageHeader
          eyebrow="Support"
          title="A calm, guided support experience"
          description="Explore support pathways for login, cards, payments, and everyday client help."
          actions={<Button href="/contact">Contact Us</Button>}
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {supportBlocks.map((block) => (
            <Card key={block.title} title={block.title} description={block.copy}>
              <Button href={block.href} variant="secondary">
                Get Help
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card title="Frequently Asked Questions" description="Quick answers for common banking and service questions.">
            <div className="space-y-4">
              {faqs.map((item) => (
                <div key={item.question} className="rounded-[1.5rem] border border-stone-200/80 bg-stone-50 p-5">
                  <p className="text-lg text-stone-950">{item.question}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </PublicShell>
  );
}
