interface RateLimitRecord {
  count: number;
  windowStart: number;
}

const ipWindows = new Map<string, RateLimitRecord>();

const CONFIG = {
  maxRequests: 10,
  windowMs: 60 * 60 * 1000,
  cleanupInterval: 5 * 60 * 1000,
};

let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CONFIG.cleanupInterval) return;

  lastCleanup = now;
  for (const [ip, record] of ipWindows.entries()) {
    if (now - record.windowStart > CONFIG.windowMs) {
      ipWindows.delete(ip);
    }
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; retryAfterSeconds?: number } {
  cleanup();

  const now = Date.now();
  const record = ipWindows.get(ip);

  if (!record) {
    ipWindows.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: CONFIG.maxRequests - 1 };
  }

  if (now - record.windowStart > CONFIG.windowMs) {
    ipWindows.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: CONFIG.maxRequests - 1 };
  }

  if (record.count >= CONFIG.maxRequests) {
    const retryAfterSeconds = Math.ceil((record.windowStart + CONFIG.windowMs - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  record.count++;
  return { allowed: true, remaining: CONFIG.maxRequests - record.count };
}

export function resetRateLimits() {
  ipWindows.clear();
  lastCleanup = Date.now();
}
