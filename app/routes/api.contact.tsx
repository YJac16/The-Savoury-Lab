import type {Route} from './+types/api.contact';
import {
  getClientIp,
  isHoneypotFilled,
  isRateLimited,
} from '~/lib/formGuard';

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string;
};

export async function action({request, context}: Route.ActionArgs) {
  if (request.method !== 'POST') {
    return Response.json({ok: false, error: 'Method not allowed'}, {status: 405});
  }

  const ip = getClientIp(request);
  if (isRateLimited(`contact:${ip}`)) {
    return Response.json({ok: false, error: 'Too many requests'}, {status: 429});
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ok: false, error: 'Invalid JSON'}, {status: 400});
  }

  // Honeypot — bots fill "company"; humans never see it
  if (isHoneypotFilled(body.company)) {
    return Response.json({ok: true});
  }

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const message = body.message?.trim() ?? '';

  if (!name || !message) {
    return Response.json({ok: false, error: 'Missing required fields'}, {status: 400});
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ok: false, error: 'Valid email required'}, {status: 400});
  }

  const payload = {
    name,
    email,
    phone: body.phone?.trim() ?? '',
    message,
    source: 'contact',
  };

  console.log('Contact form submission', payload);

  const webhookUrl = context.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Contact webhook failed', error);
    }
  }

  return Response.json({ok: true});
}
