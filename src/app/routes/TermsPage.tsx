import React from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold tracking-tight text-gray-900">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
        {children}
      </div>
    </section>
  );
}

function BulletList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5">{children}</ul>;
}

export default function TermsOfServicePage() {
  const appName = "Your App Name";
  const companyName = "Your Company / Your Name";
  const contactEmail = "support@yourdomain.com";
  const effectiveDate = "2025-11-26";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <header className="rounded-2xl border bg-gradient-to-b from-gray-50 to-white p-8 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Terms of Service
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {appName} • Effective date: {effectiveDate}
            </p>
          </div>

          <span className="inline-flex w-fit items-center rounded-full border bg-white px-3 py-1 text-xs font-medium text-gray-700">
            Last updated: {effectiveDate}
          </span>
        </div>

        <p className="mt-6 text-sm leading-6 text-gray-700">
          These Terms of Service (“Terms”) govern your use of <b>{appName}</b>{" "}
          provided by <b>{companyName}</b> (“we”, “us”). By using the Service,
          you agree to these Terms.
        </p>
      </header>

      <main className="mt-8 space-y-6">
        <Section title="1) The Service">
          <p>
            The Service integrates with Atlassian (Jira) via OAuth 2.0 to provide
            features such as viewing or managing Jira-related data as configured
            by you.
          </p>
        </Section>

        <Section title="2) Eligibility and accounts">
          <BulletList>
            <li>You must have permission to connect the Jira account/site.</li>
            <li>
              You are responsible for maintaining the security of your access to
              the Service.
            </li>
          </BulletList>
        </Section>

        <Section title="3) Acceptable use">
          <p>You agree not to:</p>
          <BulletList>
            <li>Use the Service unlawfully or to violate others’ rights.</li>
            <li>Attempt to bypass security or access data you don’t have rights to.</li>
            <li>Abuse rate limits, overload systems, or interfere with operation.</li>
            <li>Reverse engineer the Service except where prohibited by law.</li>
          </BulletList>
        </Section>

        <Section title="4) Third-party services (Atlassian)">
          <p>
            Atlassian and Jira are third-party services. Your use of Atlassian is
            governed by Atlassian’s terms and policies. We are not responsible
            for third-party services.
          </p>
        </Section>

        <Section title="5) Tokens and authorization">
          <p>
            If you authorize via OAuth, you grant the Service permission to
            access Atlassian APIs according to the scopes you approved. You can
            revoke authorization at any time in your Atlassian account settings.
          </p>
        </Section>

        <Section title="6) Availability and changes">
          <p>
            We may modify, suspend, or discontinue the Service (in whole or in
            part) at any time. We try to keep the Service available but do not
            guarantee uninterrupted operation.
          </p>
        </Section>

        <Section title="7) Disclaimer">
          <p>
            The Service is provided “as is” and “as available”, without
            warranties of any kind, express or implied, to the extent permitted
            by law.
          </p>
        </Section>

        <Section title="8) Limitation of liability">
          <p>
            To the extent permitted by law, {companyName} will not be liable for
            any indirect, incidental, special, consequential, or punitive damages,
            or any loss of data, profits, or revenues.
          </p>
        </Section>

        <Section title="9) Termination">
          <p>
            We may suspend or terminate access if you violate these Terms. You
            may stop using the Service at any time and revoke OAuth access.
          </p>
        </Section>

        <Section title="10) Contact">
          <div className="rounded-xl border bg-gray-50 p-4">
            <p className="text-sm text-gray-700">
              Questions about these Terms?{" "}
              <a
                className="font-medium text-gray-900 underline underline-offset-4"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>
            </p>
          </div>
        </Section>

        <Section title="11) Governing law (fill this)">
          <p>
            These Terms are governed by the laws of <b>[Your country/state]</b>,
            without regard to conflict of laws principles.
          </p>
        </Section>
      </main>

      <footer className="mt-10 text-xs text-gray-500">
        This is a template and not legal advice.
      </footer>
    </div>
  );
}
