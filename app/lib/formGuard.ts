/**
 * Lightweight spam / abuse guards for public form API routes.
 * In-memory rate limiting is per serverless instance (best-effort on Vercel).
 */

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;

const hits = new Map<string, number[]>();

export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

/** Returns true when the client should be rate-limited. */
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
  if (recent.length >= RATE_MAX) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}
