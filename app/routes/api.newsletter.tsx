import type {Route} from './+types/api.newsletter';
import {
  getClientIp,
  isHoneypotFilled,
  isRateLimited,
} from '~/lib/formGuard';

export async function action({request, context}: Route.ActionArgs) {
  if (request.method !== 'POST') {
    return Response.json({ok: false, error: 'Method not allowed'}, {status: 405});
  }

  const ip = getClientIp(request);
  if (isRateLimited(`newsletter:${ip}`)) {
    return Response.json({ok: false, error: 'Too many requests'}, {status: 429});
  }

  let body: {email?: string; company?: string};
  try {
    body = (await request.json()) as {email?: string; company?: string};
  } catch {
    return Response.json({ok: false, error: 'Invalid JSON'}, {status: 400});
  }

  if (isHoneypotFilled(body.company)) {
    return Response.json({ok: true});
  }

  const email = body.email?.trim() ?? '';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ok: false, error: 'Valid email required'}, {status: 400});
  }

  const webhookUrl = context.env.NEWSLETTER_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, source: 'newsletter'}),
      });
    } catch (error) {
      console.error('Newsletter webhook failed', error);
    }
  }

  return Response.json({ok: true});
}
