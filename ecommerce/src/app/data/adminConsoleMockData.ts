export type AdminReportPoint = {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
  refunds: number;
};

export const ADMIN_REPORT_SERIES: AdminReportPoint[] = [
  { month: 'Apr', revenue: 74200, orders: 640, customers: 410, refunds: 1200 },
  { month: 'May', revenue: 80500, orders: 702, customers: 460, refunds: 1600 },
  { month: 'Jun', revenue: 91800, orders: 780, customers: 520, refunds: 2100 },
  { month: 'Jul', revenue: 87600, orders: 744, customers: 498, refunds: 1800 },
  { month: 'Aug', revenue: 96200, orders: 832, customers: 560, refunds: 2400 },
  { month: 'Sep', revenue: 101800, orders: 890, customers: 610, refunds: 2600 },
  { month: 'Oct', revenue: 109400, orders: 940, customers: 655, refunds: 3100 },
  { month: 'Nov', revenue: 118900, orders: 1012, customers: 710, refunds: 3400 },
  { month: 'Dec', revenue: 142600, orders: 1288, customers: 905, refunds: 5200 },
  { month: 'Jan', revenue: 121300, orders: 1085, customers: 760, refunds: 4100 },
  { month: 'Feb', revenue: 114700, orders: 990, customers: 700, refunds: 3600 },
  { month: 'Mar', revenue: 132900, orders: 1168, customers: 840, refunds: 4700 },
];

export const ADMIN_CHANNEL_PERFORMANCE = [
  { channel: 'Shop', revenue: 426000, orders: 3820 },
  { channel: 'Distributor', revenue: 318500, orders: 640 },
  { channel: 'Wholesale', revenue: 241300, orders: 210 },
  { channel: 'Marketplace', revenue: 128900, orders: 980 },
];

export const ADMIN_CATEGORY_SPLIT = [
  { category: 'Wheels', share: 46 },
  { category: 'Exterior', share: 34 },
  { category: 'Interior', share: 20 },
];

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'Active' | 'Hidden';
  productCount: number;
  updatedAt: string;
};

export const ADMIN_CATEGORIES: AdminCategory[] = [
  {
    id: 'cat-1',
    name: 'Wheels',
    slug: 'wheels',
    description: 'Forged wheels, spacers, locks, and accessories.',
    status: 'Active',
    productCount: 9,
    updatedAt: '2026-03-27',
  },
  {
    id: 'cat-2',
    name: 'Exterior',
    slug: 'exterior',
    description: 'Aero, carbon fiber, trim, racks, and protection.',
    status: 'Active',
    productCount: 10,
    updatedAt: '2026-03-26',
  },
  {
    id: 'cat-3',
    name: 'Interior',
    slug: 'interior',
    description: 'Cabin upgrades, comfort, and detailing.',
    status: 'Active',
    productCount: 6,
    updatedAt: '2026-03-24',
  },
  {
    id: 'cat-4',
    name: 'Limited Drops',
    slug: 'limited',
    description: 'Small-batch releases and collaborations.',
    status: 'Hidden',
    productCount: 2,
    updatedAt: '2026-03-20',
  },
];

export type AdminWarehouse = {
  id: string;
  name: string;
  city: string;
  region: string;
  capacityUnits: number;
  usedUnits: number;
  inboundToday: number;
  outboundToday: number;
  manager: string;
};

export const ADMIN_WAREHOUSES: AdminWarehouse[] = [
  {
    id: 'wh-nyc',
    name: 'East Hub',
    city: 'Newark',
    region: 'NJ',
    capacityUnits: 4800,
    usedUnits: 3620,
    inboundToday: 84,
    outboundToday: 126,
    manager: 'J. Rivera',
  },
  {
    id: 'wh-dal',
    name: 'Central Hub',
    city: 'Dallas',
    region: 'TX',
    capacityUnits: 5200,
    usedUnits: 4015,
    inboundToday: 112,
    outboundToday: 98,
    manager: 'K. Patel',
  },
  {
    id: 'wh-lax',
    name: 'West Hub',
    city: 'Ontario',
    region: 'CA',
    capacityUnits: 4400,
    usedUnits: 2890,
    inboundToday: 70,
    outboundToday: 140,
    manager: 'S. Chen',
  },
];

export type AdminWarehouseItem = {
  sku: string;
  name: string;
  category: string;
  reorderPoint: number;
};

export const ADMIN_WAREHOUSE_ITEMS: AdminWarehouseItem[] = [
  { sku: 'HW-WHL-22F', name: 'Forged Alloy Wheel 22"', category: 'Wheels', reorderPoint: 40 },
  { sku: 'HW-TNT-CRT', name: 'Ceramic Window Tint (Premium)', category: 'Exterior', reorderPoint: 60 },
  { sku: 'HW-CBN-MIR', name: 'Carbon Fiber Mirror Caps', category: 'Exterior', reorderPoint: 25 },
  { sku: 'HW-LED-AMBT', name: 'Ambient Interior LED Kit', category: 'Interior', reorderPoint: 80 },
  { sku: 'HW-MAT-AWX', name: 'All-Weather Floor Mat Set', category: 'Interior', reorderPoint: 50 },
  { sku: 'HW-LCK-WHL', name: 'Premium Wheel Lock Set', category: 'Wheels', reorderPoint: 100 },
  { sku: 'HW-SPC-HUB', name: 'Wheel Spacer Set (Hubcentric)', category: 'Wheels', reorderPoint: 60 },
  { sku: 'HW-SPL-FRT', name: 'Aerodynamic Front Splitter', category: 'Exterior', reorderPoint: 18 },
];

export const ADMIN_WAREHOUSE_STOCK_BY_WAREHOUSE: Record<string, Record<string, number>> = {
  'wh-nyc': {
    'HW-WHL-22F': 46,
    'HW-TNT-CRT': 88,
    'HW-CBN-MIR': 34,
    'HW-LED-AMBT': 112,
    'HW-MAT-AWX': 70,
    'HW-LCK-WHL': 140,
    'HW-SPC-HUB': 62,
    'HW-SPL-FRT': 12,
  },
  'wh-dal': {
    'HW-WHL-22F': 54,
    'HW-TNT-CRT': 102,
    'HW-CBN-MIR': 28,
    'HW-LED-AMBT': 130,
    'HW-MAT-AWX': 62,
    'HW-LCK-WHL': 166,
    'HW-SPC-HUB': 58,
    'HW-SPL-FRT': 16,
  },
  'wh-lax': {
    'HW-WHL-22F': 32,
    'HW-TNT-CRT': 76,
    'HW-CBN-MIR': 40,
    'HW-LED-AMBT': 94,
    'HW-MAT-AWX': 84,
    'HW-LCK-WHL': 120,
    'HW-SPC-HUB': 44,
    'HW-SPL-FRT': 9,
  },
};

