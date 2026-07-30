import {Form, useActionData, useNavigation} from 'react-router';
import type {Route} from './+types/contact';
import {BRAND, FAQ_ITEMS} from '~/lib/brand';
import {buildSeo} from '~/lib/seo';
import {FaqAccordion} from '~/components/FaqAccordion';
import {FadeIn} from '~/components/ui/FadeIn';
import {Button} from '~/components/ui/Button';

const MAP_EMBED =
  'https://maps.google.com/maps?q=Kenilworth,+Cape+Town,+South+Africa&z=14&output=embed';

export const meta: Route.MetaFunction = () => {
  return buildSeo({
    title: 'Contact',
    description: `Contact ${BRAND.name} in ${BRAND.location.suburb}, Cape Town. Collection, local delivery, WhatsApp, phone, and email.`,
    path: '/contact',
  });
};

type ActionData = {ok?: boolean; error?: string; fieldErrors?: Record<string, string>};

export async function action({request}: Route.ActionArgs) {
  const formData = await request.formData();
  const payload = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
    company: String(formData.get('company') ?? '').trim(),
  };

  const fieldErrors: Record<string, string> = {};
  if (!payload.name) fieldErrors.name = 'Required';
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    fieldErrors.email = 'Valid email required';
  }
  if (!payload.message) fieldErrors.message = 'Required';

  if (Object.keys(fieldErrors).length) {
    return {ok: false, fieldErrors} satisfies ActionData;
  }

  const response = await fetch(new URL('/api/contact', request.url), {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {ok: false, error: 'Unable to send message. Please try again.'} satisfies ActionData;
  }

  return {ok: true} satisfies ActionData;
}

export default function ContactPage() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';
  const whatsappUrl = `https://wa.me/${BRAND.contact.whatsapp}`;

  return (
    <div className="bg-brand-inverse">
      <section className="border-b border-neutral-muted bg-neutral">
        <div className="container-premium section-pad">
          <FadeIn className="max-w-2xl">
            <p className="eyebrow mb-3">Contact</p>
            <h1 className="text-4xl sm:text-5xl">We would love to hear from you</h1>
            <p className="mt-4 text-sm text-ink-muted">
              Collection in {BRAND.location.suburb} and local delivery across Cape
              Town. Reach out by phone, WhatsApp, email, or the form below.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="container-premium section-pad">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <p className="eyebrow mb-2">Phone</p>
                <a
                  href={`tel:${BRAND.contact.phone.replace(/\s/g, '')}`}
                  className="text-lg text-brand hover:text-accent"
                >
                  {BRAND.contact.phone}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">Email</p>
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  className="text-lg text-brand hover:text-accent"
                >
                  {BRAND.contact.email}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">WhatsApp</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-brand hover:text-accent"
                >
                  Message us on WhatsApp
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">Instagram</p>
                <a
                  href={BRAND.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-brand hover:text-accent"
                >
                  @thesavourylab
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">Hours</p>
                <p className="text-sm text-ink-muted">{BRAND.contact.hours}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Collection address</p>
                <p className="text-sm text-ink-muted">{BRAND.location.address}</p>
              </div>
            </div>

            <div className="mt-10 overflow-hidden border border-neutral-muted shadow-soft">
              <iframe
                title={`${BRAND.name} location map`}
                src={MAP_EMBED}
                className="aspect-4/3 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="eyebrow mb-3">Send a message</p>
            <h2 className="mb-6 text-2xl">Contact form</h2>

            {actionData?.ok ? (
              <p
                className="rounded-sm border border-success/30 bg-success/5 px-5 py-4 text-sm text-success"
                role="status"
              >
                Thank you. We will respond as soon as possible.
              </p>
            ) : (
              <Form method="post" className="space-y-5" noValidate>
                {actionData?.error && (
                  <p className="text-sm text-error" role="alert">
                    {actionData.error}
                  </p>
                )}
                <div
                  aria-hidden="true"
                  className="honeypot"
                >
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                {[
                  {name: 'name', label: 'Name', type: 'text'},
                  {name: 'email', label: 'Email', type: 'email'},
                  {name: 'phone', label: 'Phone (optional)', type: 'tel'},
                ].map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.12em]"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.name !== 'phone'}
                      className="min-h-12 w-full border border-neutral-muted px-4 text-sm"
                    />
                    {actionData?.fieldErrors?.[field.name] && (
                      <p className="mt-1 text-xs text-error">
                        {actionData.fieldErrors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.12em]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full border border-neutral-muted px-4 py-3 text-sm"
                  />
                  {actionData?.fieldErrors?.message && (
                    <p className="mt-1 text-xs text-error">
                      {actionData.fieldErrors.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="min-h-12 disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending…' : 'Send message'}
                </Button>
              </Form>
            )}
          </FadeIn>
        </div>
      </section>

      <section className="section-pad bg-neutral">
        <div className="container-premium max-w-3xl">
          <FadeIn>
            <p className="eyebrow mb-3">FAQ</p>
            <h2 className="mb-8 text-3xl">Common questions</h2>
            <FaqAccordion items={FAQ_ITEMS} />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
