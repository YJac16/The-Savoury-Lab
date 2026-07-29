import type {Route} from './+types/api.wholesale';
import {
  getClientIp,
  isHoneypotFilled,
  isRateLimited,
} from '~/lib/formGuard';

type WholesalePayload = {
  businessName?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  monthlyVolume?: string;
  productsRequired?: string;
  deliveryLocation?: string;
  preferredContact?: string;
  company?: string;
};

export async function action({request, context}: Route.ActionArgs) {
  if (request.method !== 'POST') {
    return Response.json({ok: false, error: 'Method not allowed'}, {status: 405});
  }

  const ip = getClientIp(request);
  if (isRateLimited(`wholesale:${ip}`)) {
    return Response.json({ok: false, error: 'Too many requests'}, {status: 429});
  }

  let body: WholesalePayload;
  try {
    body = (await request.json()) as WholesalePayload;
  } catch {
    return Response.json({ok: false, error: 'Invalid JSON'}, {status: 400});
  }

  if (isHoneypotFilled(body.company)) {
    return Response.json({ok: true});
  }

  const businessName = body.businessName?.trim() ?? '';
  const contactPerson = body.contactPerson?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const productsRequired = body.productsRequired?.trim() ?? '';

  if (!businessName || !contactPerson || !phone || !productsRequired) {
    return Response.json({ok: false, error: 'Missing required fields'}, {status: 400});
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ok: false, error: 'Valid email required'}, {status: 400});
  }

  const payload = {
    businessName,
    contactPerson,
    phone,
    email,
    monthlyVolume: body.monthlyVolume?.trim() ?? '',
    productsRequired,
    deliveryLocation: body.deliveryLocation?.trim() ?? '',
    preferredContact: body.preferredContact?.trim() ?? '',
    source: 'wholesale',
  };

  console.log('Wholesale enquiry', payload);

  const webhookUrl = context.env.WHOLESALE_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Wholesale webhook failed', error);
    }
  }

  return Response.json({ok: true});
}
