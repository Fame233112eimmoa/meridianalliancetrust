import type { Metadata } from "next";
import { PublicShell } from "@/components/site/public-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { buildIndexableMetadata } from "@/lib/seo";

const preparationItems = [
  "Your preferred account type and intended banking needs",
  "Primary contact details and state or country of residence",
  "Basic identity and address documentation for follow-up",
];

const nextStepItems = [
  "Share your inquiry with client services",
  "Receive guidance on suitability and documentation",
  "Continue with the relationship team if your inquiry is a fit",
];

export const metadata: Metadata = buildIndexableMetadata({
  path: "/create-account",
  title: "Open an Account",
  description:
    "Learn how to begin an account-opening inquiry with Meridian Alliance Trust USA and what to prepare before contacting client services.",
});

export default function CreateAccountPage() {
  return (
    <PublicShell>
      <section className="section-shell py-10 sm:py-14 lg:py-20">
        <PageHeader
          eyebrow="Open an Account"
          title="Start your account inquiry with confidence"
          description="We use a guided, relationship-led process rather than instant public signup. Speak with client services to discuss suitability, required documents, and the next steps."
          actions={<Button href="/contact">Speak With Client Services</Button>}
        />

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Card
            title="How to begin"
            description="A short conversation with our team is the best starting point for new inquiries."
          >
            <div className="space-y-4 text-sm leading-7 text-stone-600">
              <p>
                Meridian Alliance Trust USA reviews account-opening inquiries through client
                services so expectations, documentation, and service needs can be discussed
                clearly from the outset.
              </p>
              <p>
                If you are exploring personal banking, reserve savings, or relationship-led
                support, contact the team and we will help you understand the most appropriate
                path forward.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg">
                  Request an Intro Conversation
                </Button>
                <Button href="/support" size="lg" variant="secondary">
                  Visit Support
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid gap-6">
            <Card
              title="Prepare these details"
              description="Having this ready helps our team respond more efficiently."
            >
              <ul className="space-y-3 text-sm leading-7 text-stone-600">
                {preparationItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-[1.25rem] border border-stone-200/80 bg-stone-50 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              title="Typical next step"
              description="Client services can explain timing, documentation, and what happens after your initial inquiry."
            >
              <ol className="space-y-3 text-sm leading-7 text-stone-600">
                {nextStepItems.map((item, index) => (
                  <li
                    key={item}
                    className="rounded-[1.25rem] border border-stone-200/80 bg-stone-50 px-4 py-3"
                  >
                    <span className="mr-2 font-medium text-stone-900">{index + 1}.</span>
                    {item}
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
