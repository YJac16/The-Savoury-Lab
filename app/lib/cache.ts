/**
 * Minimal Web Cache API implementation for Node/Vercel.
 * Oxygen provides `caches.open()`; Vercel does not.
 */

type CacheEntry = {
  body: ArrayBuffer;
  status: number;
  statusText: string;
  headers: [string, string][];
  expiresAt: number;
};

const stores = new Map<string, Map<string, CacheEntry>>();

function requestKey(request: RequestInfo | URL): string {
  if (typeof request === 'string') return request;
  if (request instanceof URL) return request.toString();
  return request.url;
}

function cloneResponse(entry: CacheEntry): Response {
  return new Response(entry.body.slice(0), {
    status: entry.status,
    statusText: entry.statusText,
    headers: entry.headers,
  });
}

class MemoryCache implements Cache {
  #map: Map<string, CacheEntry>;

  constructor(map: Map<string, CacheEntry>) {
    this.#map = map;
  }

  async match(
    request: RequestInfo | URL,
    _options?: CacheQueryOptions,
  ): Promise<Response | undefined> {
    const key = requestKey(request);
    const entry = this.#map.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.#map.delete(key);
      return undefined;
    }
    return cloneResponse(entry);
  }

  async matchAll(): Promise<readonly Response[]> {
    return [];
  }

  async add(request: RequestInfo | URL): Promise<void> {
    const response = await fetch(request);
    await this.put(request, response);
  }

  async addAll(requests: RequestInfo[]): Promise<void> {
    await Promise.all(requests.map((request) => this.add(request)));
  }

  async put(request: RequestInfo | URL, response: Response): Promise<void> {
    const key = requestKey(request);
    const cacheControl = response.headers.get('cache-control') ?? '';
    const maxAgeMatch = /max-age=(\d+)/i.exec(cacheControl);
    const sMaxAgeMatch = /s-maxage=(\d+)/i.exec(cacheControl);
    const seconds = Number(sMaxAgeMatch?.[1] ?? maxAgeMatch?.[1] ?? 60);
    const body = await response.arrayBuffer();
    this.#map.set(key, {
      body,
      status: response.status,
      statusText: response.statusText,
      headers: [...response.headers.entries()],
      expiresAt: Date.now() + seconds * 1000,
    });
  }

  async delete(
    request: RequestInfo | URL,
    _options?: CacheQueryOptions,
  ): Promise<boolean> {
    return this.#map.delete(requestKey(request));
  }

  async keys(): Promise<readonly Request[]> {
    return [...this.#map.keys()].map((url) => new Request(url));
  }
}

export async function openHydrogenCache(name = 'hydrogen'): Promise<Cache> {
  let map = stores.get(name);
  if (!map) {
    map = new Map();
    stores.set(name, map);
  }
  return new MemoryCache(map);
}

/** Prefer platform Cache API when available (Oxygen); otherwise memory shim. */
export async function getHydrogenCache(name = 'hydrogen'): Promise<Cache> {
  if (typeof caches !== 'undefined' && typeof caches.open === 'function') {
    return caches.open(name);
  }
  return openHydrogenCache(name);
}
