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

type BulletListProps = {
  children: React.ReactNode;
};

function BulletList({ children }: BulletListProps) {
  return <ul className="list-disc space-y-2 pl-5">{children}</ul>;
}

export default function PrivacyPolicyPage() {
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
              Privacy Policy
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
          This Privacy Policy explains how <b>{companyName}</b> (“we”, “us”)
          collects, uses, stores, and shares information when you use{" "}
          <b>{appName}</b> (the “Service”), including when you connect your
          Atlassian (Jira) account via OAuth 2.0.
        </p>
      </header>

      <main className="mt-8 space-y-6">
        <Section title="1) Information we collect">
          <p>When you authorize the Service with Atlassian, we may collect:</p>
          <BulletList>
            <li>
              <b>Atlassian account identifiers</b> (e.g., accountId) to link your
              authorization to your account.
            </li>
            <li>
              <b>OAuth tokens</b> (access token and/or refresh token) to call
              Atlassian APIs on your behalf.
            </li>
            <li>
              <b>Jira site metadata</b> required to operate (e.g., cloudId,
              selected site).
            </li>
            <li>
              <b>Technical/usage logs</b> (e.g., timestamps, IP, user agent) for
              security and troubleshooting.
            </li>
          </BulletList>
        </Section>

        <Section title="2) How we use your information">
          <BulletList>
            <li>To provide the Service features and Jira integration.</li>
            <li>To authenticate requests and maintain your connection.</li>
            <li>To prevent abuse, debug issues, and improve reliability.</li>
            <li>To comply with legal obligations when required.</li>
          </BulletList>
        </Section>

        <Section title="3) Data storage, retention, and security">
          <BulletList>
            <li>
              <b>Storage:</b> Tokens and identifiers may be stored securely
              (e.g., encrypted at rest).
            </li>
            <li>
              <b>Retention:</b> We keep this data while your account is active or
              until you revoke access or request deletion.
            </li>
            <li>
              <b>Security:</b> We apply reasonable safeguards (access controls,
              least privilege, monitoring).
            </li>
          </BulletList>
          <p className="text-xs text-gray-500">
            Update these bullets to match your real implementation (important).
          </p>
        </Section>

        <Section title="4) Sharing and third parties">
          <p>
            We do not sell your personal data. We may share limited information:
          </p>
          <BulletList>
            <li>
              With service providers (hosting/monitoring) strictly to run the
              Service.
            </li>
            <li>
              When required by law, regulation, or to protect our rights and
              users.
            </li>
          </BulletList>
        </Section>

        <Section title="5) Your choices and rights">
          <BulletList>
            <li>
              <b>Revoke access:</b> You can revoke the app in your Atlassian
              account settings to stop future API access.
            </li>
            <li>
              <b>Deletion request:</b> You can request deletion of stored tokens
              and identifiers by contacting us.
            </li>
          </BulletList>
          <div className="rounded-xl border bg-gray-50 p-4">
            <p className="text-sm text-gray-700">
              Contact:{" "}
              <a
                className="font-medium text-gray-900 underline underline-offset-4"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>
            </p>
          </div>
        </Section>

        <Section title="6) International transfers (optional)">
          <p>
            If we process data outside your country, we take steps to help ensure
            appropriate safeguards are in place.
          </p>
        </Section>

        <Section title="7) Changes to this policy">
          <p>
            We may update this policy from time to time. Material changes will be
            posted on this page with an updated effective date.
          </p>
        </Section>
      </main>

      <footer className="mt-10 text-xs text-gray-500">
        This is a template and not legal advice.
      </footer>
    </div>
  );
}
