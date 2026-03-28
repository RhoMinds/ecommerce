export type Review = {
  id: string;
  productId: string;
  name: string;
  rating: number; // 1..5
  comment: string;
  createdAt: string; // ISO
};

const STORAGE_KEY = 'example_reviews_v1';

function safeParseJson(value: string | null): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function isReview(value: any): value is Review {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    typeof value.productId === 'string' &&
    typeof value.name === 'string' &&
    typeof value.comment === 'string' &&
    typeof value.createdAt === 'string' &&
    typeof value.rating === 'number'
  );
}

function normalizeRating(rating: number) {
  if (!Number.isFinite(rating)) return 5;
  return Math.min(5, Math.max(1, Math.round(rating)));
}

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function uid() {
  const cryptoAny = (globalThis as any).crypto as Crypto | undefined;
  if (cryptoAny?.randomUUID) return cryptoAny.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getStore(): Record<string, Review[]> {
  if (typeof window === 'undefined') return {};
  const raw = safeParseJson(window.localStorage.getItem(STORAGE_KEY));
  if (!raw || typeof raw !== 'object') return {};

  const store: Record<string, Review[]> = {};
  for (const [key, val] of Object.entries(raw as Record<string, unknown>)) {
    if (!Array.isArray(val)) continue;
    const normalized = val.filter(isReview);
    if (normalized.length) store[key] = normalized;
  }
  return store;
}

function setStore(store: Record<string, Review[]>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getStoredReviews(productId: string): Review[] {
  const store = getStore();
  return store[productId] ?? [];
}

export function addStoredReview(input: Omit<Review, 'id' | 'createdAt'>) {
  const review: Review = {
    id: uid(),
    createdAt: new Date().toISOString(),
    ...input,
    rating: normalizeRating(input.rating),
  };

  const store = getStore();
  const current = store[review.productId] ?? [];
  store[review.productId] = [...current, review];
  setStore(store);
  return review;
}

export function getSeedReviews(productId: string, productName: string): Review[] {
  const seed = hashString(`${productId}:${productName}`);
  const comments = [
    'Fitment is perfect and the finish looks OEM+.',
    'Quality is top-tier. Packaging was solid and installation was straightforward.',
    'Looks premium in-person. Exactly what I wanted for the build.',
    'Great value for the quality. Would buy again.',
    'Material and detailing are excellent — elevates the whole look.',
  ];
  const names = ['Aarav', 'Mia', 'Noah', 'Isha', 'Liam', 'Anaya', 'Ethan', 'Zara'];

  const r1 = 4 + (seed % 2); // 4-5
  const r2 = 3 + ((seed >> 3) % 3); // 3-5
  const c1 = comments[seed % comments.length]!;
  const c2 = comments[(seed >> 5) % comments.length]!;
  const n1 = names[seed % names.length]!;
  const n2 = names[(seed >> 7) % names.length]!;

  const baseDate = new Date('2026-03-28T00:00:00.000Z');
  const d1 = new Date(baseDate.getTime() - (3 + (seed % 20)) * 24 * 60 * 60 * 1000);
  const d2 = new Date(baseDate.getTime() - (12 + ((seed >> 4) % 40)) * 24 * 60 * 60 * 1000);

  return [
    {
      id: `seed-${productId}-1`,
      productId,
      name: n1,
      rating: normalizeRating(r1),
      comment: c1,
      createdAt: d1.toISOString(),
    },
    {
      id: `seed-${productId}-2`,
      productId,
      name: n2,
      rating: normalizeRating(r2),
      comment: c2,
      createdAt: d2.toISOString(),
    },
  ];
}

export function getAllReviews(productId: string, productName: string) {
  const seeded = getSeedReviews(productId, productName);
  const stored = getStoredReviews(productId);
  return [...stored, ...seeded].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getReviewStats(reviews: Array<Pick<Review, 'rating'>>) {
  const count = reviews.length;
  if (count === 0) return { average: 0, count: 0 };
  const sum = reviews.reduce((acc, r) => acc + normalizeRating(r.rating), 0);
  const average = Math.round((sum / count) * 10) / 10;
  return { average, count };
}
