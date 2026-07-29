import {useState, type FormEvent} from 'react';
import {BRAND} from '~/lib/brand';
import {Button} from '~/components/ui/Button';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterForm({className = ''}: {className?: string}) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setState('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setState('loading');
    setMessage('');

    const form = event.currentTarget;
    const company =
      (form.elements.namedItem('company') as HTMLInputElement | null)?.value ??
      '';

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email.trim(), company}),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setState('success');
      setMessage(
        'Thank you. Look out for specials, Ramadan offers, and Eid celebrations in your inbox.',
      );
      setEmail('');
    } catch {
      setState('error');
      setMessage('Something went wrong. Please try again shortly.');
    }
  }

  return (
    <div className={className}>
      <p className="eyebrow mb-3">Stay in touch</p>
      <h2 className="mb-3 text-balance text-2xl sm:text-3xl">
        Seasonal specials &amp; celebrations
      </h2>
      <p className="mb-8 max-w-md text-ink-muted">
        Be first to hear about new savouries, Ramadan packs, Eid gifting, and
        exclusive offers from {BRAND.name}.
      </p>

      {state === 'success' ? (
        <p
          className="rounded-sm border border-success/30 bg-success/5 px-5 py-4 text-sm text-success"
          role="status"
        >
          {message}
        </p>
      ) : (
        <form
          onSubmit={(event) => {
            void handleSubmit(event);
          }}
          className="relative flex flex-col gap-4 sm:flex-row sm:items-stretch"
          noValidate
        >
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="newsletter-company">Company</label>
            <input
              id="newsletter-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            disabled={state === 'loading'}
            className="min-h-12 flex-1 border border-neutral-muted bg-brand-inverse px-4 py-3 font-sans text-sm text-brand placeholder:text-ink-muted/60 focus-visible:border-accent disabled:opacity-60"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={state === 'loading'}
            className="min-h-12 shrink-0 disabled:pointer-events-none disabled:opacity-60"
            aria-label="Subscribe to newsletter"
          >
            {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </Button>
        </form>
      )}

      {state === 'error' && message && (
        <p className="mt-4 text-sm text-error" role="alert">
          {message}
        </p>
      )}
    </div>
  );
}
