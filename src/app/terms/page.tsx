import Head from 'next/head';

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-10">
      <Head>
        <title>Terms and Conditions | Maile.uk</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">
        Maile.uk - Terms and Conditions
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">1. Introduction</h2>
        <p>
          Maile.uk is a free, open, and temporary email receiving service
          designed primarily for developers and users who require a disposable
          email address. By accessing and using Maile.uk, you agree to comply
          with the terms outlined below. If you do not agree to these terms, you
          may not use the service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">2. Use of the Service</h2>
        <ul className="list-disc ml-6">
          <li>
            Maile.uk allows anyone to generate and access a temporary email
            inbox by simply entering an email address. The emails received by
            these addresses can be viewed publicly by any user who knows or
            guesses the inbox name.
          </li>
          <li>
            The service is provided “as-is” without any guarantees regarding
            functionality, security, or the continuous availability of the inbox
            or messages.
          </li>
          <li>
            Maile.uk may not be used for any unlawful, harmful, or abusive
            purposes, including but not limited to sending unsolicited messages,
            spam, or conducting fraudulent activities.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">3. Data Removal</h2>
        <ul className="list-disc ml-6">
          <li>
            All emails and inboxes are temporary, and Maile.uk will remove
            messages and inboxes periodically without prior notice.
          </li>
          <li>
            The timing of data removal is at the sole discretion of Maile.uk,
            and users should not expect permanent storage of any emails
            received.
          </li>
          <li>
            Maile.uk is not responsible for the loss of any data stored within
            temporary inboxes.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">4. User Responsibility</h2>
        <p>
          Users are responsible for ensuring that they do not use Maile.uk for
          purposes that are illegal or harmful. Maile.uk is not liable for any
          misuse of the service, including the content of any emails received or
          sent. You agree that you are solely responsible for your own conduct
          and any data that is uploaded or transmitted through Maile.uk.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">5. Disclaimer of Liability</h2>
        <p>
          Maile.uk provides this service on a voluntary basis, and it is free
          for use as an open, disposable email platform.{' '}
          <strong>
            Maile.uk is not liable for any messages the user receives or sends
          </strong>{' '}
          or how users utilize the temporary email addresses.
        </p>
        <p>
          The service is offered without any warranties, express or implied,
          including but not limited to the implied warranties of
          merchantability, fitness for a particular purpose, or
          non-infringement. The user assumes all risks associated with the use
          of the service.
        </p>
        <p>
          Maile.uk is not responsible for the content of the emails received or
          the actions taken by users who access the inbox.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">6. Privacy and Security</h2>
        <p>
          Due to the open nature of the inboxes, Maile.uk does not offer any
          privacy or security for the emails received. Any user can access an
          inbox by entering the correct email address.
        </p>
        <p>
          It is advised that users do not use Maile.uk for receiving sensitive,
          private, or personally identifiable information.
        </p>
        <p>
          Maile.uk does not store emails for any longer than necessary and
          removes them periodically without prior notice. We do not guarantee
          data protection or secure transmission of email content.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">7. Changes to Terms</h2>
        <p>
          Maile.uk reserves the right to modify these Terms and Conditions at
          any time. Users are responsible for reviewing these terms periodically
          for any changes. Continued use of the service following any changes
          constitutes acceptance of the new terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">8. Termination</h2>
        <p>
          Maile.uk may suspend or terminate access to the service at any time,
          with or without cause or notice, for any reason, including a violation
          of these Terms and Conditions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">9. Governing Law</h2>
        <p>
          These Terms and Conditions are governed by and construed in accordance
          with the laws of [Jurisdiction]. By using Maile.uk, you agree to
          submit to the exclusive jurisdiction of the courts of [Jurisdiction]
          to resolve any dispute or claim arising from your use of the service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">10. Contact</h2>
        <p>
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at &nbsp;
          <a
            href="mailto:contact@maile.uk"
            className="text-blue-500 hover:underline"
          >
            contact@maile.uk
          </a>
          .
        </p>
      </section>
    </div>
  );
}
