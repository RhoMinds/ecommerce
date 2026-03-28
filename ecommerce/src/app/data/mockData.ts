export type Role = 'customer' | 'distributor' | 'admin';

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  distributorPrice: number;
  minBulkQuantity: number;
};

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered';

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  customerName: string;
  items: number;
};

function productImage(productId: string, tags: string) {
  const lock = Number(productId.replace('p-', '')) || 1;
  return `https://loremflickr.com/1200/1200/${tags}?lock=${lock}`;
}

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function splitTitle(title: string) {
  const normalized = title.replace(/\s+/g, ' ').trim();
  if (normalized.length <= 24) return [normalized];
  const words = normalized.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= 26) current = next;
    else {
      if (current) lines.push(current);
      current = word;
      if (lines.length === 1) break;
    }
  }
  if (current && lines.length < 2) lines.push(current);
  if (lines.length === 0) return [normalized.slice(0, 24) + '…'];
  if (lines.length === 1) return [lines[0].slice(0, 24) + '…'];
  if (lines[1].length > 24) lines[1] = lines[1].slice(0, 24) + '…';
  return lines.slice(0, 2);
}

function productPlaceholderSvg({
  id,
  name,
  category,
}: {
  id: string;
  name: string;
  category: string;
}) {
  const hue = hashString(id) % 360;
  const c1 = `hsl(${hue} 82% 54%)`;
  const c2 = `hsl(${(hue + 36) % 360} 82% 42%)`;
  const lines = splitTitle(name).map(escapeXml);
  const categoryText = escapeXml(category.toUpperCase());

  const line1 = lines[0] ?? '';
  const line2 = lines[1] ?? '';

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="900" height="900" fill="url(#g)"/>
  <rect x="54" y="54" width="792" height="792" rx="30" fill="rgba(0,0,0,0.14)"/>
  <rect x="54" y="54" width="792" height="792" rx="30" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>

  <rect x="54" y="54" width="792" height="10" fill="#F9B303" opacity="0.85"/>

  <text x="86" y="116" fill="rgba(255,255,255,0.95)" font-size="18" font-weight="700" letter-spacing="4" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial">HUSTLE WRAPS</text>
  <text x="86" y="150" fill="rgba(255,255,255,0.8)" font-size="12" font-weight="700" letter-spacing="3" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial">${categoryText}</text>

  <g opacity="0.22">
    <circle cx="740" cy="230" r="150" fill="rgba(255,255,255,0.45)"/>
    <circle cx="780" cy="190" r="92" fill="rgba(0,0,0,0.25)"/>
  </g>

  <text x="86" y="480" fill="rgba(255,255,255,0.98)" font-size="44" font-weight="700" letter-spacing="0.5" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial">${line1}</text>
  ${
    line2
      ? `<text x="86" y="536" fill="rgba(255,255,255,0.92)" font-size="36" font-weight="600" letter-spacing="0.3" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial">${line2}</text>`
      : ''
  }

  <text x="86" y="810" fill="rgba(255,255,255,0.75)" font-size="12" font-weight="700" letter-spacing="3" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial">IMAGE PLACEHOLDER (OFFLINE)</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const PRODUCT_SEEDS: Product[] = [
  {
    id: 'p-1',
    name: 'Forged Alloy Wheel 22"',
    price: 1200,
    description: 'Premium forged alloy wheels designed for maximum performance and aggressive styling.',
    category: 'Wheels',
    image: productImage('p-1', 'car,wheel'),
    stock: 24,
    distributorPrice: 850,
    minBulkQuantity: 10,
  },
  {
    id: 'p-2',
    name: 'Aerodynamic Roof Cargo Box',
    price: 850,
    description: 'Sleek, aerodynamic roof box providing 450L of extra storage space without compromising performance.',
    category: 'Exterior',
    image: productImage('p-2', 'car,roof'),
    stock: 12,
    distributorPrice: 600,
    minBulkQuantity: 5,
  },
  {
    id: 'p-3',
    name: 'Premium Leather Seat Covers',
    price: 450,
    description: 'Custom-fit, perforated Nappa leather seat covers for ultimate luxury and comfort.',
    category: 'Interior',
    image: productImage('p-3', 'car,interior'),
    stock: 50,
    distributorPrice: 280,
    minBulkQuantity: 20,
  },
  {
    id: 'p-4',
    name: 'Carbon Fiber Mirror Caps',
    price: 320,
    description: 'Ultra-lightweight real carbon fiber mirror replacements.',
    category: 'Exterior',
    image: productImage('p-4', 'car,carbon'),
    stock: 35,
    distributorPrice: 200,
    minBulkQuantity: 15,
  },
  {
    id: 'p-5',
    name: 'Performance Brake Caliper Covers',
    price: 180,
    description: 'Heat-resistant caliper covers with a clean OEM+ look and easy bolt-on fitment.',
    category: 'Exterior',
    image: productImage('p-5', 'car,brake'),
    stock: 60,
    distributorPrice: 110,
    minBulkQuantity: 25,
  },
  {
    id: 'p-6',
    name: 'Ambient Interior LED Kit',
    price: 220,
    description: 'Multi-zone ambient lighting kit with smooth diffusion and app control presets.',
    category: 'Interior',
    image: productImage('p-6', 'car,ambient'),
    stock: 90,
    distributorPrice: 150,
    minBulkQuantity: 20,
  },
  {
    id: 'p-7',
    name: 'Carbon Fiber Rear Spoiler',
    price: 640,
    description: 'Real carbon fiber rear spoiler engineered to improve stability and visual stance.',
    category: 'Exterior',
    image: productImage('p-7', 'car,spoiler'),
    stock: 18,
    distributorPrice: 450,
    minBulkQuantity: 6,
  },
  {
    id: 'p-8',
    name: 'All-Weather Floor Mat Set',
    price: 160,
    description: 'Laser-measured, high-wall mats to protect your cabin from water, dust, and debris.',
    category: 'Interior',
    image: productImage('p-8', 'car,floormat'),
    stock: 75,
    distributorPrice: 95,
    minBulkQuantity: 20,
  },
  {
    id: 'p-9',
    name: 'Forged Alloy Wheel 20" (Track)',
    price: 980,
    description: 'Lightweight forged wheel optimized for strength-to-weight with track-ready offsets.',
    category: 'Wheels',
    image: productImage('p-9', 'car,rim'),
    stock: 30,
    distributorPrice: 720,
    minBulkQuantity: 10,
  },
  {
    id: 'p-10',
    name: 'Ceramic Window Tint (Premium)',
    price: 340,
    description: 'High-clarity ceramic tint film for heat rejection, privacy, and UV protection.',
    category: 'Exterior',
    image: productImage('p-10', 'car,window'),
    stock: 40,
    distributorPrice: 210,
    minBulkQuantity: 12,
  },
  {
    id: 'p-11',
    name: 'Alcantara Steering Wheel Wrap',
    price: 140,
    description: 'Soft-touch Alcantara wrap with a precision stitch line and improved grip.',
    category: 'Interior',
    image: productImage('p-11', 'car,steeringwheel'),
    stock: 55,
    distributorPrice: 85,
    minBulkQuantity: 15,
  },
  {
    id: 'p-12',
    name: 'Roof Rail Crossbars (Low Profile)',
    price: 260,
    description: 'Low-noise crossbars with quick-mount hardware and a clean, low-profile design.',
    category: 'Exterior',
    image: productImage('p-12', 'car,roofrack'),
    stock: 26,
    distributorPrice: 180,
    minBulkQuantity: 10,
  },
  {
    id: 'p-13',
    name: 'Premium Wheel Lock Set',
    price: 55,
    description: 'Anti-theft wheel locks with a hardened steel core and corrosion-resistant finish.',
    category: 'Wheels',
    image: productImage('p-13', 'car,lugnuts'),
    stock: 140,
    distributorPrice: 32,
    minBulkQuantity: 50,
  },
  {
    id: 'p-14',
    name: 'Carbon Fiber Door Sill Plates',
    price: 130,
    description: 'Scratch-resistant carbon fiber sill plates with a subtle, premium finish.',
    category: 'Interior',
    image: productImage('p-14', 'car,doorsill'),
    stock: 65,
    distributorPrice: 80,
    minBulkQuantity: 20,
  },
  {
    id: 'p-15',
    name: 'Aerodynamic Front Splitter',
    price: 520,
    description: 'Downforce-focused front splitter with reinforced mounting points and clean fitment.',
    category: 'Exterior',
    image: productImage('p-15', 'car,splitter'),
    stock: 14,
    distributorPrice: 360,
    minBulkQuantity: 6,
  },
  {
    id: 'p-16',
    name: 'Leather Shift Knob (Hand Stitched)',
    price: 95,
    description: 'Hand-stitched leather shift knob with a weighted core for a precise feel.',
    category: 'Interior',
    image: productImage('p-16', 'car,shiftknob'),
    stock: 80,
    distributorPrice: 55,
    minBulkQuantity: 25,
  },
  {
    id: 'p-17',
    name: 'Forged Alloy Wheel 19" (OEM+)',
    price: 860,
    description: 'OEM+ forged wheel design that balances comfort and performance with modern styling.',
    category: 'Wheels',
    image: productImage('p-17', 'car,wheel'),
    stock: 34,
    distributorPrice: 640,
    minBulkQuantity: 10,
  },
  {
    id: 'p-18',
    name: 'Dashboard Phone Mount (Magnetic)',
    price: 42,
    description: 'Low-profile magnetic mount with strong hold and minimal dashboard footprint.',
    category: 'Interior',
    image: productImage('p-18', 'car,phonemount'),
    stock: 200,
    distributorPrice: 24,
    minBulkQuantity: 60,
  },
  {
    id: 'p-19',
    name: 'High-Flow Cabin Air Filter',
    price: 38,
    description: 'Activated carbon filter to reduce odors and improve in-cabin air quality.',
    category: 'Interior',
    image: productImage('p-19', 'car,airfilter'),
    stock: 160,
    distributorPrice: 22,
    minBulkQuantity: 60,
  },
  {
    id: 'p-20',
    name: 'Gloss Black Grille Trim Kit',
    price: 210,
    description: 'Gloss black trim kit to sharpen the front-end look with factory-like fit and finish.',
    category: 'Exterior',
    image: productImage('p-20', 'car,grille'),
    stock: 28,
    distributorPrice: 145,
    minBulkQuantity: 12,
  },
  {
    id: 'p-21',
    name: 'Forged Wheel Center Cap Set',
    price: 75,
    description: 'Precision-machined center caps with a durable, weather-resistant finish.',
    category: 'Wheels',
    image: productImage('p-21', 'car,centercap'),
    stock: 180,
    distributorPrice: 45,
    minBulkQuantity: 50,
  },
  {
    id: 'p-22',
    name: 'Carbon Fiber Diffuser (Rear)',
    price: 740,
    description: 'Aggressive rear diffuser design built from real carbon fiber for a clean performance look.',
    category: 'Exterior',
    image: productImage('p-22', 'car,diffuser'),
    stock: 10,
    distributorPrice: 520,
    minBulkQuantity: 4,
  },
  {
    id: 'p-23',
    name: 'Noise-Reducing Door Seal Kit',
    price: 58,
    description: 'High-density weather seals to reduce wind noise and improve cabin comfort.',
    category: 'Interior',
    image: productImage('p-23', 'car,interior'),
    stock: 120,
    distributorPrice: 34,
    minBulkQuantity: 40,
  },
  {
    id: 'p-24',
    name: 'Roof Box Mount Hardware Kit',
    price: 48,
    description: 'Replacement mounting hardware compatible with most low-profile crossbars.',
    category: 'Exterior',
    image: productImage('p-24', 'car,roof'),
    stock: 95,
    distributorPrice: 28,
    minBulkQuantity: 30,
  },
  {
    id: 'p-25',
    name: 'Wheel Spacer Set (Hubcentric)',
    price: 210,
    description: 'Hubcentric spacers for improved stance and clearance with vibration-free fitment.',
    category: 'Wheels',
    image: productImage('p-25', 'car,wheelspacer'),
    stock: 70,
    distributorPrice: 140,
    minBulkQuantity: 20,
  },
];

export const MOCK_PRODUCTS: Product[] = PRODUCT_SEEDS;

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-1042', date: '2026-03-25', status: 'Pending', total: 1200, customerName: 'Alex Mercer', items: 1 },
  { id: 'ORD-1041', date: '2026-03-22', status: 'Shipped', total: 3400, customerName: 'TechMotion Autos', items: 4 },
  { id: 'ORD-1040', date: '2026-03-18', status: 'Delivered', total: 450, customerName: 'Sarah Jenkins', items: 1 },
];
