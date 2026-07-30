import {Form, useActionData, useNavigation} from 'react-router';
import type {Route} from './+types/wholesale';
import {BRAND} from '~/lib/brand';
import {buildSeo} from '~/lib/seo';
import {FadeIn} from '~/components/ui/FadeIn';
import {Button} from '~/components/ui/Button';

export const meta: Route.MetaFunction = () => {
  return buildSeo({
    title: 'Wholesale',
    description: `Wholesale and catering enquiries for ${BRAND.name}. Consistent monthly volume, events, schools, mosques, and corporate functions across Cape Town.`,
    path: '/wholesale',
  });
};

type ActionData = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function action({request}: Route.ActionArgs) {
  const formData = await request.formData();

  const payload = {
    businessName: String(formData.get('businessName') ?? '').trim(),
    contactPerson: String(formData.get('contactPerson') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    monthlyVolume: String(formData.get('monthlyVolume') ?? '').trim(),
    productsRequired: String(formData.get('productsRequired') ?? '').trim(),
    deliveryLocation: String(formData.get('deliveryLocation') ?? '').trim(),
    preferredContact: String(formData.get('preferredContact') ?? '').trim(),
    company: String(formData.get('company') ?? '').trim(),
  };

  const fieldErrors: Record<string, string> = {};
  if (!payload.businessName) fieldErrors.businessName = 'Required';
  if (!payload.contactPerson) fieldErrors.contactPerson = 'Required';
  if (!payload.phone) fieldErrors.phone = 'Required';
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    fieldErrors.email = 'Valid email required';
  }
  if (!payload.productsRequired) fieldErrors.productsRequired = 'Required';

  if (Object.keys(fieldErrors).length) {
    return {ok: false, fieldErrors} satisfies ActionData;
  }

  const response = await fetch(new URL('/api/wholesale', request.url), {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {ok: false, error: 'Unable to submit enquiry. Please try again.'} satisfies ActionData;
  }

  return {ok: true} satisfies ActionData;
}

const FORM_FIELDS: Array<{
  name: string;
  label: string;
  type: string;
  required: boolean;
  full?: boolean;
  options?: string[];
}> = [
  {name: 'businessName', label: 'Business Name', type: 'text', required: true},
  {name: 'contactPerson', label: 'Contact Person', type: 'text', required: true},
  {name: 'phone', label: 'Phone', type: 'tel', required: true},
  {name: 'email', label: 'Email', type: 'email', required: true},
  {name: 'monthlyVolume', label: 'Estimated monthly volume', type: 'text', required: false},
  {name: 'productsRequired', label: 'Products required', type: 'text', required: true, full: true},
  {name: 'deliveryLocation', label: 'Delivery location', type: 'text', required: false},
  {
    name: 'preferredContact',
    label: 'Preferred contact method',
    type: 'select',
    required: false,
    options: ['Phone', 'Email', 'WhatsApp'],
  },
];

export default function WholesalePage() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';

  return (
    <div className="bg-brand-inverse">
      <section className="border-b border-neutral-muted bg-brand text-brand-inverse">
        <div className="container-premium section-pad">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow mb-4 text-accent-soft">Wholesale</p>
            <h1 className="text-balance text-4xl sm:text-5xl">
              Partner with {BRAND.name}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-inverse/75">
              Catering, corporate functions, schools, mosques, and monthly volume
              orders across Cape Town. Tell us about your requirements and our
              team will respond promptly.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="container-premium section-pad">
        <div className="mx-auto max-w-3xl">
          {actionData?.ok ? (
            <div
              className="rounded-sm border border-success/30 bg-success/5 px-6 py-8 text-center"
              role="status"
            >
              <h2 className="font-display text-2xl text-success">Enquiry received</h2>
              <p className="mt-3 text-sm text-ink-muted">
                Thank you. We will be in touch shortly to discuss your wholesale
                requirements.
              </p>
            </div>
          ) : (
            <Form method="post" className="space-y-6" noValidate>
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

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {FORM_FIELDS.map((field) => (
                  <div
                    key={field.name}
                    className={field.full ? 'sm:col-span-2' : undefined}
                  >
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-brand"
                    >
                      {field.label}
                      {field.required ? ' *' : ''}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        id={field.name}
                        name={field.name}
                        className="min-h-12 w-full border border-neutral-muted bg-brand-inverse px-4 text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select…
                        </option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        required={field.required}
                        className="min-h-12 w-full border border-neutral-muted bg-brand-inverse px-4 text-sm"
                      />
                    )}
                    {actionData?.fieldErrors?.[field.name] && (
                      <p className="mt-1 text-xs text-error">
                        {actionData.fieldErrors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="min-h-12 w-full sm:w-auto disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting…' : 'Submit enquiry'}
              </Button>
            </Form>
          )}
        </div>
      </section>
    </div>
  );
}
