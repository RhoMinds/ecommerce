export type AdminCategoryStatus = 'Active' | 'Hidden';

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: AdminCategoryStatus;
  productCount: number;
  updatedAt: string;
};

export type AdminReportPoint = {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
  refunds: number;
};

export type AdminChannelPerformance = {
  channel: string;
  revenue: number;
  orders: number;
};

export type AdminWarehouse = {
  id: string;
  name: string;
  city: string;
  region: string;
  capacityUnits: number;
  usedUnits: number;
};

export type AdminWarehouseItem = {
  sku: string;
  name: string;
  category: string;
  reorderPoint: number;
};

export type AdminShipmentStatus =
  | 'Ready to Pack'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered';

export type AdminPaymentStatus = 'Paid' | 'Pending' | 'Refunded';

export type AdminOrderPriority = 'High' | 'Normal' | 'Low';

export type AdminOrderItem = {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type AdminOrder = {
  id: string;
  orderedAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  city: string;
  region: string;
  channel: 'Website' | 'Instagram' | 'Wholesale' | 'Showroom';
  shipmentStatus: AdminShipmentStatus;
  paymentStatus: AdminPaymentStatus;
  courier: string;
  trackingId: string;
  estimatedDelivery: string;
  priority: AdminOrderPriority;
  warehouseId: string;
  notes: string;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  items: AdminOrderItem[];
};

export type AdminUserRole = 'Customer' | 'Distributor' | 'Admin';

export type AdminUserStatus = 'VIP' | 'Active' | 'New' | 'At Risk';

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  city: string;
  joinedAt: string;
  lastOrderAt: string;
  lifetimeOrders: number;
  totalSpend: number;
  avgOrderValue: number;
  status: AdminUserStatus;
};

export type AdminFulfillmentPoint = {
  day: string;
  packed: number;
  shipped: number;
  delivered: number;
};

export type AdminRegionalPerformance = {
  region: string;
  revenue: number;
  orders: number;
  repeatRate: number;
  avgDeliveryDays: number;
};

export type AdminTopProductPerformance = {
  product: string;
  category: string;
  unitsSold: number;
  revenue: number;
  margin: number;
};

export type AdminGoal = {
  metric: string;
  actual: number;
  target: number;
  format: 'currency' | 'number' | 'percent';
};

export const ADMIN_CATEGORIES: AdminCategory[] = [
  {
    id: 'cat-wheels',
    name: 'Wheels',
    slug: 'wheels',
    description: 'Forged, track-ready, and premium wheel packages.',
    status: 'Active',
    productCount: 14,
    updatedAt: '2026-03-18',
  },
  {
    id: 'cat-exterior',
    name: 'Exterior',
    slug: 'exterior',
    description: 'Aerodynamic styling, carbon trim, tint, and roof systems.',
    status: 'Active',
    productCount: 23,
    updatedAt: '2026-03-20',
  },
  {
    id: 'cat-interior',
    name: 'Interior',
    slug: 'interior',
    description: 'Cabin upgrades focused on comfort, texture, and lighting.',
    status: 'Active',
    productCount: 17,
    updatedAt: '2026-03-14',
  },
  {
    id: 'cat-performance',
    name: 'Performance',
    slug: 'performance',
    description: 'Brake, handling, and drivetrain-oriented accessories.',
    status: 'Active',
    productCount: 9,
    updatedAt: '2026-03-11',
  },
  {
    id: 'cat-detailing',
    name: 'Detailing',
    slug: 'detailing',
    description: 'Care kits and finishing products for showroom presentation.',
    status: 'Hidden',
    productCount: 6,
    updatedAt: '2026-03-08',
  },
];

export const ADMIN_REPORT_SERIES: AdminReportPoint[] = [
  { month: 'Apr', revenue: 84200, orders: 118, customers: 76, refunds: 2200 },
  { month: 'May', revenue: 88750, orders: 126, customers: 81, refunds: 2450 },
  { month: 'Jun', revenue: 93100, orders: 131, customers: 88, refunds: 2600 },
  { month: 'Jul', revenue: 97800, orders: 138, customers: 93, refunds: 2840 },
  { month: 'Aug', revenue: 100400, orders: 142, customers: 96, refunds: 2960 },
  { month: 'Sep', revenue: 104900, orders: 149, customers: 102, refunds: 3180 },
  { month: 'Oct', revenue: 109600, orders: 154, customers: 108, refunds: 3320 },
  { month: 'Nov', revenue: 117800, orders: 166, customers: 119, refunds: 3580 },
  { month: 'Dec', revenue: 126900, orders: 178, customers: 128, refunds: 3910 },
  { month: 'Jan', revenue: 113400, orders: 161, customers: 116, refunds: 3440 },
  { month: 'Feb', revenue: 119200, orders: 169, customers: 123, refunds: 3290 },
  { month: 'Mar', revenue: 124500, orders: 176, customers: 129, refunds: 3010 },
];

export const ADMIN_CHANNEL_PERFORMANCE: AdminChannelPerformance[] = [
  { channel: 'Website', revenue: 61200, orders: 94 },
  { channel: 'Instagram', revenue: 23100, orders: 36 },
  { channel: 'Wholesale', revenue: 28200, orders: 28 },
  { channel: 'Showroom', revenue: 12000, orders: 18 },
];

export const ADMIN_WAREHOUSES: AdminWarehouse[] = [
  {
    id: 'blr-main',
    name: 'Bengaluru Main',
    city: 'Bengaluru',
    region: 'Karnataka',
    capacityUnits: 1800,
    usedUnits: 1330,
  },
  {
    id: 'mum-west',
    name: 'Mumbai West',
    city: 'Mumbai',
    region: 'Maharashtra',
    capacityUnits: 1200,
    usedUnits: 860,
  },
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR',
    city: 'Gurugram',
    region: 'Haryana',
    capacityUnits: 1400,
    usedUnits: 1015,
  },
];

export const ADMIN_WAREHOUSE_ITEMS: AdminWarehouseItem[] = [
  {
    sku: 'HW-WHL-22-FRG',
    name: 'Forged Alloy Wheel 22"',
    category: 'Wheels',
    reorderPoint: 18,
  },
  {
    sku: 'HW-EXT-ROOF-450',
    name: 'Aerodynamic Roof Cargo Box',
    category: 'Exterior',
    reorderPoint: 10,
  },
  {
    sku: 'HW-INT-SEAT-NP',
    name: 'Premium Leather Seat Covers',
    category: 'Interior',
    reorderPoint: 24,
  },
  {
    sku: 'HW-EXT-MIRROR-CF',
    name: 'Carbon Fiber Mirror Caps',
    category: 'Exterior',
    reorderPoint: 16,
  },
  {
    sku: 'HW-PRF-BRAKE-CVR',
    name: 'Performance Brake Caliper Covers',
    category: 'Performance',
    reorderPoint: 20,
  },
  {
    sku: 'HW-INT-LED-AMB',
    name: 'Ambient Interior LED Kit',
    category: 'Interior',
    reorderPoint: 30,
  },
  {
    sku: 'HW-EXT-SPOILER-CF',
    name: 'Carbon Fiber Rear Spoiler',
    category: 'Exterior',
    reorderPoint: 8,
  },
  {
    sku: 'HW-INT-MAT-AW',
    name: 'All-Weather Floor Mat Set',
    category: 'Interior',
    reorderPoint: 22,
  },
];

export const ADMIN_WAREHOUSE_STOCK_BY_WAREHOUSE: Record<string, Record<string, number>> = {
  'blr-main': {
    'HW-WHL-22-FRG': 24,
    'HW-EXT-ROOF-450': 12,
    'HW-INT-SEAT-NP': 36,
    'HW-EXT-MIRROR-CF': 20,
    'HW-PRF-BRAKE-CVR': 26,
    'HW-INT-LED-AMB': 48,
    'HW-EXT-SPOILER-CF': 10,
    'HW-INT-MAT-AW': 34,
  },
  'mum-west': {
    'HW-WHL-22-FRG': 16,
    'HW-EXT-ROOF-450': 6,
    'HW-INT-SEAT-NP': 18,
    'HW-EXT-MIRROR-CF': 12,
    'HW-PRF-BRAKE-CVR': 14,
    'HW-INT-LED-AMB': 24,
    'HW-EXT-SPOILER-CF': 7,
    'HW-INT-MAT-AW': 19,
  },
  'delhi-ncr': {
    'HW-WHL-22-FRG': 20,
    'HW-EXT-ROOF-450': 9,
    'HW-INT-SEAT-NP': 28,
    'HW-EXT-MIRROR-CF': 15,
    'HW-PRF-BRAKE-CVR': 18,
    'HW-INT-LED-AMB': 27,
    'HW-EXT-SPOILER-CF': 5,
    'HW-INT-MAT-AW': 22,
  },
};

export const ADMIN_ORDERS: AdminOrder[] = [
  {
    id: 'ORD-1057',
    orderedAt: '2026-03-29',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    customerPhone: '+91 98765 44011',
    city: 'Bengaluru',
    region: 'Karnataka',
    channel: 'Website',
    shipmentStatus: 'Ready to Pack',
    paymentStatus: 'Paid',
    courier: 'Delhivery',
    trackingId: 'DLV-8801457',
    estimatedDelivery: '2026-04-02',
    priority: 'High',
    warehouseId: 'blr-main',
    notes: 'Requested premium packaging and same-day dispatch.',
    subtotal: 1275,
    shippingFee: 60,
    tax: 230,
    total: 1565,
    items: [
      { sku: 'HW-WHL-22-FRG', name: 'Forged Alloy Wheel 22"', quantity: 1, unitPrice: 1200 },
      { sku: 'HW-WHL-LCK-SET', name: 'Premium Wheel Lock Set', quantity: 1, unitPrice: 75 },
    ],
  },
  {
    id: 'ORD-1056',
    orderedAt: '2026-03-28',
    customerName: 'Trackline Customs',
    customerEmail: 'ops@tracklinecustoms.in',
    customerPhone: '+91 90040 11220',
    city: 'Mumbai',
    region: 'Maharashtra',
    channel: 'Wholesale',
    shipmentStatus: 'Packed',
    paymentStatus: 'Paid',
    courier: 'Blue Dart',
    trackingId: 'BD-5519802',
    estimatedDelivery: '2026-04-01',
    priority: 'High',
    warehouseId: 'mum-west',
    notes: 'B2B order. Hold until pickup manifest is signed by courier.',
    subtotal: 2940,
    shippingFee: 120,
    tax: 550,
    total: 3610,
    items: [
      { sku: 'HW-EXT-SPOILER-CF', name: 'Carbon Fiber Rear Spoiler', quantity: 2, unitPrice: 640 },
      { sku: 'HW-PRF-BRAKE-CVR', name: 'Performance Brake Caliper Covers', quantity: 6, unitPrice: 180 },
      { sku: 'HW-EXT-MIRROR-CF', name: 'Carbon Fiber Mirror Caps', quantity: 2, unitPrice: 320 },
    ],
  },
  {
    id: 'ORD-1055',
    orderedAt: '2026-03-28',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.jenkins@example.com',
    customerPhone: '+91 99881 77241',
    city: 'Hyderabad',
    region: 'Telangana',
    channel: 'Instagram',
    shipmentStatus: 'Shipped',
    paymentStatus: 'Paid',
    courier: 'XpressBees',
    trackingId: 'XB-3099221',
    estimatedDelivery: '2026-03-31',
    priority: 'Normal',
    warehouseId: 'blr-main',
    notes: 'Customer asked for WhatsApp status updates.',
    subtotal: 640,
    shippingFee: 50,
    tax: 124,
    total: 814,
    items: [{ sku: 'HW-EXT-SPOILER-CF', name: 'Carbon Fiber Rear Spoiler', quantity: 1, unitPrice: 640 }],
  },
  {
    id: 'ORD-1054',
    orderedAt: '2026-03-27',
    customerName: 'Alex Mercer',
    customerEmail: 'alex.mercer@example.com',
    customerPhone: '+91 98220 90311',
    city: 'Pune',
    region: 'Maharashtra',
    channel: 'Website',
    shipmentStatus: 'Out for Delivery',
    paymentStatus: 'Paid',
    courier: 'Ecom Express',
    trackingId: 'ECO-7742014',
    estimatedDelivery: '2026-03-29',
    priority: 'Normal',
    warehouseId: 'mum-west',
    notes: 'Leave at front desk if recipient is unavailable.',
    subtotal: 520,
    shippingFee: 40,
    tax: 101,
    total: 661,
    items: [{ sku: 'HW-EXT-SPLIT-01', name: 'Aerodynamic Front Splitter', quantity: 1, unitPrice: 520 }],
  },
  {
    id: 'ORD-1053',
    orderedAt: '2026-03-26',
    customerName: 'Meera Joseph',
    customerEmail: 'meera.joseph@example.com',
    customerPhone: '+91 98710 11378',
    city: 'Chennai',
    region: 'Tamil Nadu',
    channel: 'Website',
    shipmentStatus: 'Delivered',
    paymentStatus: 'Paid',
    courier: 'DTDC',
    trackingId: 'DT-6625187',
    estimatedDelivery: '2026-03-29',
    priority: 'Low',
    warehouseId: 'blr-main',
    notes: 'Delivered to security desk at customer request.',
    subtotal: 610,
    shippingFee: 45,
    tax: 118,
    total: 773,
    items: [
      { sku: 'HW-INT-MAT-AW', name: 'All-Weather Floor Mat Set', quantity: 1, unitPrice: 160 },
      { sku: 'HW-INT-LED-AMB', name: 'Ambient Interior LED Kit', quantity: 1, unitPrice: 220 },
      { sku: 'HW-INT-SEAT-NP', name: 'Premium Leather Seat Covers', quantity: 1, unitPrice: 450 },
    ],
  },
  {
    id: 'ORD-1052',
    orderedAt: '2026-03-25',
    customerName: 'Nitro Garage LLP',
    customerEmail: 'buying@nitrogarage.in',
    customerPhone: '+91 98100 44152',
    city: 'Gurugram',
    region: 'Haryana',
    channel: 'Wholesale',
    shipmentStatus: 'Shipped',
    paymentStatus: 'Paid',
    courier: 'Blue Dart',
    trackingId: 'BD-5521041',
    estimatedDelivery: '2026-03-30',
    priority: 'High',
    warehouseId: 'delhi-ncr',
    notes: 'Distributor order with GST invoice attached.',
    subtotal: 3860,
    shippingFee: 160,
    tax: 724,
    total: 4744,
    items: [
      { sku: 'HW-WHL-20-TRK', name: 'Forged Alloy Wheel 20" (Track)', quantity: 2, unitPrice: 980 },
      { sku: 'HW-EXT-MIRROR-CF', name: 'Carbon Fiber Mirror Caps', quantity: 4, unitPrice: 320 },
      { sku: 'HW-WHL-SPACER', name: 'Wheel Spacer Set (Hubcentric)', quantity: 2, unitPrice: 210 },
    ],
  },
  {
    id: 'ORD-1051',
    orderedAt: '2026-03-24',
    customerName: 'Rohan Gupta',
    customerEmail: 'rohan.gupta@example.com',
    customerPhone: '+91 99111 22448',
    city: 'Noida',
    region: 'Uttar Pradesh',
    channel: 'Website',
    shipmentStatus: 'Ready to Pack',
    paymentStatus: 'Pending',
    courier: 'Delhivery',
    trackingId: 'DLV-8801339',
    estimatedDelivery: '2026-04-03',
    priority: 'Normal',
    warehouseId: 'delhi-ncr',
    notes: 'Payment verification pending before release.',
    subtotal: 340,
    shippingFee: 35,
    tax: 67,
    total: 442,
    items: [{ sku: 'HW-EXT-TINT-CER', name: 'Ceramic Window Tint (Premium)', quantity: 1, unitPrice: 340 }],
  },
  {
    id: 'ORD-1050',
    orderedAt: '2026-03-22',
    customerName: 'TechMotion Autos',
    customerEmail: 'projects@techmotionautos.com',
    customerPhone: '+91 98330 77410',
    city: 'Ahmedabad',
    region: 'Gujarat',
    channel: 'Showroom',
    shipmentStatus: 'Delivered',
    paymentStatus: 'Paid',
    courier: 'SafeExpress',
    trackingId: 'SAFE-2044102',
    estimatedDelivery: '2026-03-27',
    priority: 'Low',
    warehouseId: 'mum-west',
    notes: 'Installed at partner showroom. Proof of delivery filed.',
    subtotal: 2120,
    shippingFee: 90,
    tax: 398,
    total: 2608,
    items: [
      { sku: 'HW-EXT-ROOF-450', name: 'Aerodynamic Roof Cargo Box', quantity: 1, unitPrice: 850 },
      { sku: 'HW-EXT-ROOFRAIL', name: 'Roof Rail Crossbars (Low Profile)', quantity: 2, unitPrice: 260 },
      { sku: 'HW-INT-LED-AMB', name: 'Ambient Interior LED Kit', quantity: 2, unitPrice: 220 },
      { sku: 'HW-INT-FLOOR-MAT', name: 'All-Weather Floor Mat Set', quantity: 1, unitPrice: 160 },
    ],
  },
];

export const ADMIN_USERS: AdminUser[] = [
  {
    id: 'USR-201',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    role: 'Customer',
    city: 'Bengaluru',
    joinedAt: '2025-08-14',
    lastOrderAt: '2026-03-29',
    lifetimeOrders: 11,
    totalSpend: 8240,
    avgOrderValue: 749,
    status: 'VIP',
  },
  {
    id: 'USR-202',
    name: 'Trackline Customs',
    email: 'ops@tracklinecustoms.in',
    role: 'Distributor',
    city: 'Mumbai',
    joinedAt: '2024-11-08',
    lastOrderAt: '2026-03-28',
    lifetimeOrders: 23,
    totalSpend: 48200,
    avgOrderValue: 2096,
    status: 'Active',
  },
  {
    id: 'USR-203',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    role: 'Customer',
    city: 'Hyderabad',
    joinedAt: '2025-12-01',
    lastOrderAt: '2026-03-28',
    lifetimeOrders: 4,
    totalSpend: 2190,
    avgOrderValue: 548,
    status: 'Active',
  },
  {
    id: 'USR-204',
    name: 'Meera Joseph',
    email: 'meera.joseph@example.com',
    role: 'Customer',
    city: 'Chennai',
    joinedAt: '2026-02-12',
    lastOrderAt: '2026-03-26',
    lifetimeOrders: 2,
    totalSpend: 1040,
    avgOrderValue: 520,
    status: 'New',
  },
  {
    id: 'USR-205',
    name: 'Nitro Garage LLP',
    email: 'buying@nitrogarage.in',
    role: 'Distributor',
    city: 'Gurugram',
    joinedAt: '2025-03-05',
    lastOrderAt: '2026-03-25',
    lifetimeOrders: 17,
    totalSpend: 39600,
    avgOrderValue: 2329,
    status: 'VIP',
  },
  {
    id: 'USR-206',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@example.com',
    role: 'Customer',
    city: 'Noida',
    joinedAt: '2025-10-29',
    lastOrderAt: '2026-03-24',
    lifetimeOrders: 3,
    totalSpend: 780,
    avgOrderValue: 260,
    status: 'At Risk',
  },
  {
    id: 'USR-207',
    name: 'TechMotion Autos',
    email: 'projects@techmotionautos.com',
    role: 'Distributor',
    city: 'Ahmedabad',
    joinedAt: '2024-09-17',
    lastOrderAt: '2026-03-22',
    lifetimeOrders: 14,
    totalSpend: 27400,
    avgOrderValue: 1957,
    status: 'Active',
  },
  {
    id: 'USR-208',
    name: 'Admin Operations',
    email: 'admin@hustlewraps.com',
    role: 'Admin',
    city: 'Bengaluru',
    joinedAt: '2024-01-04',
    lastOrderAt: '2026-03-20',
    lifetimeOrders: 0,
    totalSpend: 0,
    avgOrderValue: 0,
    status: 'Active',
  },
];

export const ADMIN_FULFILLMENT_SERIES: AdminFulfillmentPoint[] = [
  { day: 'Mon', packed: 10, shipped: 8, delivered: 6 },
  { day: 'Tue', packed: 12, shipped: 10, delivered: 7 },
  { day: 'Wed', packed: 11, shipped: 9, delivered: 8 },
  { day: 'Thu', packed: 14, shipped: 12, delivered: 9 },
  { day: 'Fri', packed: 16, shipped: 13, delivered: 11 },
  { day: 'Sat', packed: 9, shipped: 8, delivered: 10 },
  { day: 'Sun', packed: 7, shipped: 6, delivered: 8 },
];

export const ADMIN_REGIONAL_PERFORMANCE: AdminRegionalPerformance[] = [
  { region: 'Bengaluru', revenue: 38500, orders: 54, repeatRate: 62, avgDeliveryDays: 1.8 },
  { region: 'Mumbai Metro', revenue: 31200, orders: 41, repeatRate: 55, avgDeliveryDays: 2.1 },
  { region: 'Delhi NCR', revenue: 28800, orders: 39, repeatRate: 49, avgDeliveryDays: 2.0 },
  { region: 'Hyderabad', revenue: 14100, orders: 19, repeatRate: 38, avgDeliveryDays: 2.4 },
];

export const ADMIN_TOP_PRODUCTS: AdminTopProductPerformance[] = [
  { product: 'Forged Alloy Wheel 22"', category: 'Wheels', unitsSold: 18, revenue: 21600, margin: 34 },
  { product: 'Aerodynamic Roof Cargo Box', category: 'Exterior', unitsSold: 11, revenue: 9350, margin: 29 },
  { product: 'Ambient Interior LED Kit', category: 'Interior', unitsSold: 27, revenue: 5940, margin: 31 },
  { product: 'Carbon Fiber Rear Spoiler', category: 'Exterior', unitsSold: 9, revenue: 5760, margin: 27 },
];

export const ADMIN_GOALS: AdminGoal[] = [
  { metric: 'Revenue', actual: 124500, target: 120000, format: 'currency' },
  { metric: 'Orders', actual: 176, target: 170, format: 'number' },
  { metric: 'Repeat Rate', actual: 52, target: 48, format: 'percent' },
  { metric: 'Delivery SLA', actual: 94, target: 92, format: 'percent' },
];
