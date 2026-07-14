import type { Metadata } from "next";
import { PublicShell } from "@/components/site/public-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildIndexableMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildIndexableMetadata({
  path: "/",
  description: siteConfig.description,
});

const featureCards = [
  {
    title: "Everyday Banking",
    copy: "Explore current-account, savings, and relationship-banking services presented with clarity and discretion.",
  },
  {
    title: "Cards Support",
    copy: "Understand the support pathways available for debit and credit cards, including servicing and replacement requests.",
  },
  {
    title: "Secure Dashboard",
    copy: "Use the protected login, OTP verification, and approved access flow for the private dashboard.",
  },
];

const securityPoints = [
  "Careful review for onboarding and service requests",
  "Relationship-led support with clear communication paths",
  "Dedicated help for payment cards and account enquiries",
];

const heroHighlights = [
  {
    label: "Current & Savings Services",
    value: "Support for day-to-day banking needs and longer-term reserves",
  },
  {
    label: "Payments & Transfers",
    value: "Guidance for domestic and international payment enquiries",
  },
  {
    label: "Private Support",
    value: "Relationship-led guidance, card support, and clear service touchpoints",
  },
];

export default function HomePage() {
  return (
    <PublicShell>
      <section className="section-shell pb-10 pt-4 sm:pb-12 sm:pt-6 lg:pb-16 lg:pt-8">
        <div className="overflow-hidden rounded-[2.5rem] border border-stone-200/80 bg-white shadow-soft">
          <div className="relative">
            <div
              className="absolute inset-0 bg-cover bg-[position:72%_center]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(252,252,251,0.98) 0%, rgba(252,252,251,0.92) 30%, rgba(252,252,251,0.58) 54%, rgba(15,23,42,0.14) 100%), url('/images/meridian-home-hero.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.4),_transparent_45%)]" />
            <div className="relative grid min-h-[32rem] gap-8 px-6 py-7 sm:px-8 sm:py-8 lg:min-h-[38rem] lg:grid-cols-[1.06fr_0.94fr] lg:px-12 lg:py-12">
              <div className="flex flex-col justify-between gap-8">
                <div className="max-w-3xl space-y-5">
                  <p className="eyebrow">Premium Personal Banking</p>
                  <h1 className="max-w-3xl text-5xl leading-[1.02] text-stone-950 sm:text-6xl">
                    Thoughtful private banking support with a distinctly British sense of trust and calm.
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
                    Meridian Alliance Trust UK presents card servicing support, international
                    payment guidance, secure dashboard login, and responsive client contact
                    pathways in a refined website designed for clarity and discretion.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button href="/login" size="lg">
                    Login
                  </Button>
                  <Button href="/support" size="lg" variant="secondary">
                    Support
                  </Button>
                  <Button href="/contact" size="lg" variant="ghost">
                    Contact
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {heroHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.75rem] border border-white/80 bg-white/82 p-5 backdrop-blur-sm"
                    >
                      <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                        {item.label}
                      </p>
                      <p className="mt-3 text-base leading-7 text-stone-950">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-end">
                <div className="w-full max-w-sm rounded-[2rem] border border-white/80 bg-white/86 p-6 shadow-soft backdrop-blur-sm sm:p-7">
                  <p className="eyebrow">Client Approach</p>
                  <h2 className="mt-4 text-3xl text-stone-950">
                    London heritage paired with a modern service standard.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-stone-600">
                    From secure dashboard access to cross-border payment support, the experience is
                    designed to feel composed, clear, and easy to navigate across devices.
                  </p>
                  <div className="mt-6 grid gap-3">
                    <div className="surface-muted p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                        Relationship Banking
                      </p>
                      <p className="mt-2 font-medium text-stone-950">
                        Personal service, tailored guidance, and thoughtful client support
                      </p>
                    </div>
                    <div className="surface-muted p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                        Security Standards
                      </p>
                      <p className="mt-2 font-medium text-stone-950">
                        Careful onboarding, client privacy, and responsive support
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <Card
            title="A signature card presentation with a refined service feel"
            description="Card servicing, payment guidance, and client support are presented in a clear, polished public experience."
          >
            <div className="grid gap-3 text-sm leading-7 text-stone-600">
              <p>
                Explore a quieter, more focused experience built around responsive support,
                secure login, and polished client service information.
              </p>
              <Button href="/support" variant="ghost">
                Explore Client Services
              </Button>
            </div>
          </Card>

          <div className="panel overflow-hidden bg-[linear-gradient(135deg,#180607_0%,#401014_44%,#8B1E24_100%)] p-4 sm:p-5">
            <img
              alt="Meridian Alliance Trust UK premium card"
              className="w-full rounded-[1.75rem] object-cover"
              src="/images/meridian-premium-card.png"
            />
          </div>
        </div>
      </section>

      <section className="section-shell py-6 lg:py-10">
        <div className="grid gap-5 lg:grid-cols-3">
          {featureCards.map((item) => (
            <Card key={item.title} title={item.title} description={item.copy}>
              <p className="text-sm leading-7 text-stone-600">
                Meridian Alliance Trust UK keeps layouts spacious, readable, and consistent across
                mobile and desktop use.
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell py-10 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-5">
            <p className="eyebrow">Security First</p>
            <h2 className="text-4xl text-stone-950 sm:text-5xl">
              Discreet support for cards, onboarding, and sensitive enquiries.
            </h2>
            <p className="max-w-xl text-base leading-8 text-stone-600">
              Every important action is framed with clear controls, soft visual hierarchy, and
              straightforward navigation to reduce friction without feeling lightweight.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {securityPoints.map((point) => (
              <div key={point} className="panel flex min-h-44 items-end p-6">
                <p className="text-base leading-7 text-stone-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-8 lg:py-14">
        <div className="grid gap-5 lg:grid-cols-3">
          <Card
            title="Debit and credit cards"
            description="Clear information helps clients understand card servicing and support options."
          >
            <div className="grid gap-3 text-sm leading-7 text-stone-600">
              <p>Review the support available for card replacement questions, servicing requests, and general client assistance.</p>
              <Button href="/contact" variant="secondary">
                Ask About Card Support
              </Button>
            </div>
          </Card>

          <Card
            title="Secure login"
            description="Approved users can sign in with a customer number, password, and OTP verification before reaching the dashboard."
          >
            <div className="grid gap-3 text-sm leading-7 text-stone-600">
              <p>
                The login flow stays separate from the public website and only opens the dashboard
                for users with the correct credentials.
              </p>
              <Button href="/login" variant="secondary">
                Go to Login
              </Button>
            </div>
          </Card>

          <Card
            title="Support when you need it"
            description="Contact support, browse FAQs, or open guided service routes from a dedicated client care area."
          >
            <div className="grid gap-3 text-sm leading-7 text-stone-600">
              <p>Account help, payments guidance, card servicing, and live chat are organised into clear, easy-to-follow journeys.</p>
              <Button href="/support" variant="ghost">
                Visit Support
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="section-shell pb-12 pt-8 sm:pb-16 lg:pb-24">
        <div className="rounded-[2rem] border border-[#8B1E24]/10 bg-[linear-gradient(135deg,#28080b_0%,#5f1419_45%,#8B1E24_100%)] px-6 py-10 text-white shadow-soft sm:px-8 lg:px-12 lg:py-14">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow text-white/60">Get Started</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Step into Meridian Alliance Trust UK</h2>
              <p className="mt-4 text-base leading-8 text-white/75">
                Reach support quickly, review service information, and use the protected login to
                enter the private dashboard.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/login" size="lg" variant="secondary">
                Login
              </Button>
              <Button href="/support" size="lg" className="bg-white text-accent hover:bg-stone-100">
                Visit Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
