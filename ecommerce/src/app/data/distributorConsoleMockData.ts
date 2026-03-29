export type DistributorPartnerProfile = {
  companyName: string;
  tier: string;
  marginRange: string;
  creditLimit: number;
  availableCredit: number;
  accountManager: string;
  managerEmail: string;
  managerPhone: string;
  fulfillmentHub: string;
  nextTierTarget: number;
  currentQuarterSpend: number;
};

export type DistributorPerformancePoint = {
  month: string;
  spend: number;
  orders: number;
  margin: number;
  fillRate: number;
};

export type DistributorShipmentStatus =
  | 'Ready at Warehouse'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered';

export type DistributorShipmentItem = {
  sku: string;
  name: string;
  quantity: number;
};

export type DistributorShipment = {
  id: string;
  poNumber: string;
  destination: string;
  status: DistributorShipmentStatus;
  courier: string;
  trackingId: string;
  eta: string;
  warehouse: string;
  cartons: number;
  units: number;
  orderValue: number;
  lastUpdate: string;
  items: DistributorShipmentItem[];
};

export type DistributorInvoiceStatus = 'Paid' | 'Due Soon' | 'Overdue' | 'Draft';

export type DistributorInvoice = {
  id: string;
  orderRef: string;
  issuedOn: string;
  dueOn: string;
  amount: number;
  status: DistributorInvoiceStatus;
  paymentMethod: string;
  notes: string;
};

export type DistributorReorderSuggestion = {
  sku: string;
  product: string;
  category: string;
  stockCoverDays: number;
  suggestedQty: number;
  monthlyVelocity: number;
};

export type DistributorAccountNote = {
  title: string;
  detail: string;
  tone: 'neutral' | 'positive' | 'attention';
};

export const DISTRIBUTOR_PARTNER_PROFILE: DistributorPartnerProfile = {
  companyName: 'TechMotion Autos',
  tier: 'Tier 1 Partner',
  marginRange: '30% - 45%',
  creditLimit: 150000,
  availableCredit: 65000,
  accountManager: 'Nadia Rahman',
  managerEmail: 'nadia@hustlewraps.com',
  managerPhone: '+971 55 840 1182',
  fulfillmentHub: 'Dubai Design District Hub',
  nextTierTarget: 95000,
  currentQuarterSpend: 84200,
};

export const DISTRIBUTOR_PERFORMANCE_SERIES: DistributorPerformancePoint[] = [
  { month: 'Apr', spend: 32200, orders: 4, margin: 34, fillRate: 91 },
  { month: 'May', spend: 34800, orders: 5, margin: 35, fillRate: 92 },
  { month: 'Jun', spend: 36200, orders: 5, margin: 35, fillRate: 93 },
  { month: 'Jul', spend: 39100, orders: 6, margin: 36, fillRate: 94 },
  { month: 'Aug', spend: 40500, orders: 6, margin: 36, fillRate: 94 },
  { month: 'Sep', spend: 41800, orders: 6, margin: 37, fillRate: 95 },
  { month: 'Oct', spend: 43200, orders: 7, margin: 37, fillRate: 95 },
  { month: 'Nov', spend: 46600, orders: 7, margin: 38, fillRate: 96 },
  { month: 'Dec', spend: 50800, orders: 8, margin: 39, fillRate: 96 },
  { month: 'Jan', spend: 45200, orders: 6, margin: 37, fillRate: 94 },
  { month: 'Feb', spend: 47800, orders: 7, margin: 38, fillRate: 95 },
  { month: 'Mar', spend: 51200, orders: 8, margin: 39, fillRate: 97 },
];

export const DISTRIBUTOR_SHIPMENTS: DistributorShipment[] = [
  {
    id: 'SHP-8804',
    poNumber: 'PO-2026-118',
    destination: 'Dubai, UAE',
    status: 'Ready at Warehouse',
    courier: 'Aramex Freight',
    trackingId: 'ARX-9901804',
    eta: '2026-04-02',
    warehouse: 'Dubai Design District Hub',
    cartons: 6,
    units: 42,
    orderValue: 14880,
    lastUpdate: 'Packed and awaiting pickup slot confirmation.',
    items: [
      { sku: 'HW-WHL-22-FRG', name: 'Forged Alloy Wheel 22"', quantity: 8 },
      { sku: 'HW-EXT-SPOILER-CF', name: 'Carbon Fiber Rear Spoiler', quantity: 6 },
      { sku: 'HW-INT-LED-AMB', name: 'Ambient Interior LED Kit', quantity: 28 },
    ],
  },
  {
    id: 'SHP-8803',
    poNumber: 'PO-2026-114',
    destination: 'Abu Dhabi, UAE',
    status: 'In Transit',
    courier: 'DHL Supply Chain',
    trackingId: 'DHL-5411703',
    eta: '2026-03-31',
    warehouse: 'Dubai Design District Hub',
    cartons: 4,
    units: 25,
    orderValue: 9620,
    lastUpdate: 'Line-haul departed sorting facility at 08:10.',
    items: [
      { sku: 'HW-EXT-ROOF-450', name: 'Aerodynamic Roof Cargo Box', quantity: 5 },
      { sku: 'HW-WHL-20-TRK', name: 'Forged Alloy Wheel 20" (Track)', quantity: 4 },
      { sku: 'HW-INT-MAT-AW', name: 'All-Weather Floor Mat Set', quantity: 16 },
    ],
  },
  {
    id: 'SHP-8802',
    poNumber: 'PO-2026-109',
    destination: 'Sharjah, UAE',
    status: 'Out for Delivery',
    courier: 'Emirates Logistics',
    trackingId: 'EML-4010202',
    eta: '2026-03-29',
    warehouse: 'Dubai Design District Hub',
    cartons: 3,
    units: 18,
    orderValue: 6840,
    lastUpdate: 'Courier checked in at final-mile depot.',
    items: [
      { sku: 'HW-EXT-MIRROR-CF', name: 'Carbon Fiber Mirror Caps', quantity: 10 },
      { sku: 'HW-WHL-SPACER', name: 'Wheel Spacer Set (Hubcentric)', quantity: 8 },
    ],
  },
  {
    id: 'SHP-8801',
    poNumber: 'PO-2026-102',
    destination: 'Doha, Qatar',
    status: 'Delivered',
    courier: 'Q-Express',
    trackingId: 'QEX-1801001',
    eta: '2026-03-26',
    warehouse: 'Dubai Design District Hub',
    cartons: 5,
    units: 30,
    orderValue: 11240,
    lastUpdate: 'Delivered and signed by receiving manager.',
    items: [
      { sku: 'HW-INT-SEAT-NP', name: 'Premium Leather Seat Covers', quantity: 10 },
      { sku: 'HW-EXT-TINT-CER', name: 'Ceramic Window Tint (Premium)', quantity: 20 },
    ],
  },
];

export const DISTRIBUTOR_INVOICES: DistributorInvoice[] = [
  {
    id: 'INV-2026-318',
    orderRef: 'PO-2026-118',
    issuedOn: '2026-03-29',
    dueOn: '2026-04-12',
    amount: 14880,
    status: 'Due Soon',
    paymentMethod: 'Net 14 - Bank Transfer',
    notes: 'Pending release with shipment pickup.',
  },
  {
    id: 'INV-2026-304',
    orderRef: 'PO-2026-114',
    issuedOn: '2026-03-24',
    dueOn: '2026-04-07',
    amount: 9620,
    status: 'Due Soon',
    paymentMethod: 'Net 14 - Bank Transfer',
    notes: 'Shared with finance team for approval.',
  },
  {
    id: 'INV-2026-291',
    orderRef: 'PO-2026-109',
    issuedOn: '2026-03-18',
    dueOn: '2026-03-28',
    amount: 6840,
    status: 'Overdue',
    paymentMethod: 'Net 10 - Bank Transfer',
    notes: 'One business day overdue, reminder already sent.',
  },
  {
    id: 'INV-2026-280',
    orderRef: 'PO-2026-102',
    issuedOn: '2026-03-11',
    dueOn: '2026-03-21',
    amount: 11240,
    status: 'Paid',
    paymentMethod: 'Wire Transfer',
    notes: 'Paid and reconciled.',
  },
  {
    id: 'INV-2026-264',
    orderRef: 'PO-2026-096',
    issuedOn: '2026-03-02',
    dueOn: '2026-03-16',
    amount: 13820,
    status: 'Paid',
    paymentMethod: 'Wire Transfer',
    notes: 'Paid ahead of due date.',
  },
  {
    id: 'INV-2026-259',
    orderRef: 'PO-2026-091',
    issuedOn: '2026-02-27',
    dueOn: '2026-03-05',
    amount: 7410,
    status: 'Draft',
    paymentMethod: 'To be assigned',
    notes: 'Draft statement for split-shipment adjustment.',
  },
];

export const DISTRIBUTOR_REORDER_SUGGESTIONS: DistributorReorderSuggestion[] = [
  {
    sku: 'HW-INT-LED-AMB',
    product: 'Ambient Interior LED Kit',
    category: 'Interior',
    stockCoverDays: 11,
    suggestedQty: 24,
    monthlyVelocity: 18,
  },
  {
    sku: 'HW-EXT-SPOILER-CF',
    product: 'Carbon Fiber Rear Spoiler',
    category: 'Exterior',
    stockCoverDays: 9,
    suggestedQty: 10,
    monthlyVelocity: 7,
  },
  {
    sku: 'HW-WHL-20-TRK',
    product: 'Forged Alloy Wheel 20" (Track)',
    category: 'Wheels',
    stockCoverDays: 14,
    suggestedQty: 12,
    monthlyVelocity: 8,
  },
  {
    sku: 'HW-EXT-TINT-CER',
    product: 'Ceramic Window Tint (Premium)',
    category: 'Exterior',
    stockCoverDays: 12,
    suggestedQty: 30,
    monthlyVelocity: 22,
  },
];

export const DISTRIBUTOR_ACCOUNT_NOTES: DistributorAccountNote[] = [
  {
    title: 'Quarter pacing well',
    detail: 'Current quarter spend is close to the next partner threshold and margin is trending upward.',
    tone: 'positive',
  },
  {
    title: 'One invoice needs attention',
    detail: 'Finance has one overdue invoice that should be cleared to keep dispatches smooth.',
    tone: 'attention',
  },
  {
    title: 'Reorder window open',
    detail: 'Lighting kits and spoilers are moving fastest, so replenishment timing matters this week.',
    tone: 'neutral',
  },
];
