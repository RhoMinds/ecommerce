import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { MOCK_PRODUCTS } from '../data/mockData';
import {
  AlertCircle,
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  BarChart as BarChartIcon,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileText,
  MapPin,
  Package,
  PackageCheck,
  Printer,
  Receipt,
  ShieldCheck,
  ShoppingCart,
  Store,
  Tags,
  Truck,
  User,
  Users,
  Warehouse as WarehouseIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Bar, BarChart, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../components/ui/chart';
import {
  ADMIN_CATEGORIES,
  ADMIN_CHANNEL_PERFORMANCE,
  ADMIN_FULFILLMENT_SERIES,
  ADMIN_GOALS,
  ADMIN_ORDERS,
  ADMIN_REGIONAL_PERFORMANCE,
  ADMIN_REPORT_SERIES,
  ADMIN_TOP_PRODUCTS,
  ADMIN_USERS,
  ADMIN_WAREHOUSE_ITEMS,
  ADMIN_WAREHOUSE_STOCK_BY_WAREHOUSE,
  ADMIN_WAREHOUSES,
  type AdminGoal,
  type AdminOrder,
  type AdminShipmentStatus,
} from '../data/adminConsoleMockData';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChartIcon },
  { id: 'categories', label: 'Categories', icon: Tags },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'warehouse', label: 'Warehouse', icon: WarehouseIcon },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
] as const;

const tabDescriptions: Record<(typeof tabs)[number]['id'], string> = {
  dashboard: 'A cleaner operations overview across revenue, fulfilment, inventory, and customers.',
  categories: 'Organize product catalog structure and control storefront visibility.',
  inventory: 'Track product stock, pricing, and quick merchandising actions.',
  warehouse: 'Monitor capacity usage and SKU-level stock across warehouses.',
  orders: 'Run the shipment desk, track fulfilment progress, and print invoices.',
  users: 'Review account health, value, and engagement across customer segments.',
  reports: 'See trend lines, regional performance, and fulfilment efficiency at a glance.',
};

const shipmentStages: AdminShipmentStatus[] = [
  'Ready to Pack',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

const panelClassName =
  'overflow-hidden rounded-[28px] border border-black/5 bg-white/90 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.45)] backdrop-blur';

const toneStyles = {
  amber: {
    shell: 'border-amber-200/70 bg-[linear-gradient(145deg,rgba(255,248,220,0.95),rgba(255,255,255,0.97),rgba(255,251,235,0.92))]',
    icon: 'bg-amber-500 text-white shadow-[0_18px_36px_-24px_rgba(217,119,6,0.9)]',
    bar: 'bg-amber-400/80',
  },
  emerald: {
    shell: 'border-emerald-200/70 bg-[linear-gradient(145deg,rgba(236,253,245,0.95),rgba(255,255,255,0.97),rgba(240,253,250,0.92))]',
    icon: 'bg-emerald-500 text-white shadow-[0_18px_36px_-24px_rgba(5,150,105,0.9)]',
    bar: 'bg-emerald-400/80',
  },
  slate: {
    shell: 'border-slate-200/80 bg-[linear-gradient(145deg,rgba(241,245,249,0.95),rgba(255,255,255,0.98),rgba(248,250,252,0.92))]',
    icon: 'bg-slate-900 text-white shadow-[0_18px_36px_-24px_rgba(15,23,42,0.9)]',
    bar: 'bg-slate-500/80',
  },
  sky: {
    shell: 'border-sky-200/80 bg-[linear-gradient(145deg,rgba(240,249,255,0.95),rgba(255,255,255,0.98),rgba(239,246,255,0.92))]',
    icon: 'bg-sky-500 text-white shadow-[0_18px_36px_-24px_rgba(14,165,233,0.9)]',
    bar: 'bg-sky-400/80',
  },
  rose: {
    shell: 'border-rose-200/80 bg-[linear-gradient(145deg,rgba(255,241,242,0.95),rgba(255,255,255,0.98),rgba(255,245,245,0.92))]',
    icon: 'bg-rose-500 text-white shadow-[0_18px_36px_-24px_rgba(244,63,94,0.9)]',
    bar: 'bg-rose-400/80',
  },
} as const;

type AdminTabId = (typeof tabs)[number]['id'];
type OrderFilter = 'All' | AdminShipmentStatus;
type MetricCardTone = keyof typeof toneStyles;

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
const formatNumber = (value: number) => value.toLocaleString();

const formatDate = (value: string, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(new Date(value));

const percentChange = (next: number, base: number) =>
  base === 0 ? 0 : Math.round(((next - base) / base) * 100);

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const getShipmentStatusClassName = (status: AdminShipmentStatus) => {
  switch (status) {
    case 'Ready to Pack':
      return 'bg-amber-100 text-amber-800';
    case 'Packed':
      return 'bg-sky-100 text-sky-800';
    case 'Shipped':
      return 'bg-indigo-100 text-indigo-800';
    case 'Out for Delivery':
      return 'bg-violet-100 text-violet-800';
    case 'Delivered':
      return 'bg-emerald-100 text-emerald-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getPaymentStatusClassName = (status: AdminOrder['paymentStatus']) => {
  switch (status) {
    case 'Paid':
      return 'bg-emerald-100 text-emerald-800';
    case 'Pending':
      return 'bg-amber-100 text-amber-800';
    case 'Refunded':
      return 'bg-rose-100 text-rose-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getUserStatusClassName = (status: (typeof ADMIN_USERS)[number]['status']) => {
  switch (status) {
    case 'VIP':
      return 'bg-amber-100 text-amber-800';
    case 'New':
      return 'bg-sky-100 text-sky-800';
    case 'At Risk':
      return 'bg-rose-100 text-rose-800';
    case 'Active':
      return 'bg-emerald-100 text-emerald-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getPriorityClassName = (priority: AdminOrder['priority']) => {
  switch (priority) {
    case 'High':
      return 'bg-rose-100 text-rose-800';
    case 'Normal':
      return 'bg-slate-100 text-slate-700';
    case 'Low':
      return 'bg-emerald-100 text-emerald-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getShipmentProgress = (status: AdminShipmentStatus) => {
  const index = shipmentStages.indexOf(status);
  return index === -1 ? 0 : ((index + 1) / shipmentStages.length) * 100;
};

const getOrderActionLabel = (status: AdminShipmentStatus) => {
  switch (status) {
    case 'Ready to Pack':
      return 'Mark Packed';
    case 'Packed':
      return 'Mark Shipped';
    case 'Shipped':
      return 'Mark Out for Delivery';
    case 'Out for Delivery':
      return 'Mark Delivered';
    case 'Delivered':
      return 'Delivered';
    default:
      return 'Update';
  }
};

const formatGoalValue = (goal: AdminGoal, value: number) => {
  switch (goal.format) {
    case 'currency':
      return formatCurrency(value);
    case 'percent':
      return `${value}%`;
    case 'number':
    default:
      return formatNumber(value);
  }
};

const buildInvoiceMarkup = (order: AdminOrder) => {
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.name)}<div style="font-size:12px;color:#6b7280;margin-top:4px;">${escapeHtml(item.sku)}</div></td>
          <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
          <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;text-align:right;">${formatCurrency(item.unitPrice)}</td>
          <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;text-align:right;">${formatCurrency(item.quantity * item.unitPrice)}</td>
        </tr>`,
    )
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Invoice ${escapeHtml(order.id)}</title>
    <style>
      body { font-family: Arial, Helvetica, sans-serif; color: #111827; margin: 0; padding: 40px; background: #f8fafc; }
      .invoice { max-width: 880px; margin: 0 auto; background: white; border-radius: 24px; padding: 40px; box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08); }
      .eyebrow { font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: #6b7280; }
      .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 28px; }
      .meta { background: #f8fafc; border-radius: 18px; padding: 18px 20px; }
      table { width: 100%; border-collapse: collapse; margin-top: 28px; }
      th { text-align: left; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #6b7280; padding-bottom: 12px; }
      .totals { margin-left: auto; width: 280px; margin-top: 20px; }
      .totals-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
      .totals-row.total { font-size: 18px; font-weight: 700; border-bottom: none; padding-top: 16px; }
      .footer { margin-top: 36px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
      @media print {
        body { background: white; padding: 0; }
        .invoice { box-shadow: none; border-radius: 0; max-width: none; }
      }
    </style>
  </head>
  <body>
    <div class="invoice">
      <div class="eyebrow">Hustle Wraps Invoice</div>
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:24px;margin-top:12px;">
        <div>
          <h1 style="margin:0;font-size:34px;line-height:1;">${escapeHtml(order.id)}</h1>
          <p style="margin:12px 0 0;color:#4b5563;font-size:15px;">Prepared from the admin shipment desk.</p>
        </div>
        <div style="text-align:right;">
          <div style="font-size:13px;color:#6b7280;">Issue Date</div>
          <div style="margin-top:4px;font-weight:600;">${formatDate(order.orderedAt)}</div>
          <div style="margin-top:16px;font-size:13px;color:#6b7280;">Tracking</div>
          <div style="margin-top:4px;font-weight:600;">${escapeHtml(order.trackingId)}</div>
        </div>
      </div>
      <div class="grid">
        <div class="meta">
          <div class="eyebrow">Bill To</div>
          <div style="margin-top:12px;font-size:18px;font-weight:700;">${escapeHtml(order.customerName)}</div>
          <div style="margin-top:8px;color:#4b5563;">${escapeHtml(order.customerEmail)}</div>
          <div style="margin-top:4px;color:#4b5563;">${escapeHtml(order.customerPhone)}</div>
          <div style="margin-top:14px;color:#111827;">${escapeHtml(order.city)}, ${escapeHtml(order.region)}</div>
        </div>
        <div class="meta">
          <div class="eyebrow">Shipment</div>
          <div style="margin-top:12px;font-size:18px;font-weight:700;">${escapeHtml(order.shipmentStatus)}</div>
          <div style="margin-top:8px;color:#4b5563;">Courier: ${escapeHtml(order.courier)}</div>
          <div style="margin-top:4px;color:#4b5563;">ETA: ${formatDate(order.estimatedDelivery)}</div>
          <div style="margin-top:14px;color:#111827;">Channel: ${escapeHtml(order.channel)}</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th style="text-align:center;">Qty</th>
            <th style="text-align:right;">Rate</th>
            <th style="text-align:right;">Amount</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="totals">
        <div class="totals-row"><span>Subtotal</span><strong>${formatCurrency(order.subtotal)}</strong></div>
        <div class="totals-row"><span>Shipping</span><strong>${formatCurrency(order.shippingFee)}</strong></div>
        <div class="totals-row"><span>Tax</span><strong>${formatCurrency(order.tax)}</strong></div>
        <div class="totals-row total"><span>Total</span><span>${formatCurrency(order.total)}</span></div>
      </div>
      <div class="footer">
        ${escapeHtml(order.notes)}<br />
        Courier reference: ${escapeHtml(order.trackingId)}. Payment status: ${escapeHtml(order.paymentStatus)}.
      </div>
    </div>
  </body>
</html>`;
};

const SectionPanel = ({
  title,
  description,
  action,
  className = '',
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) => (
  <section className={`${panelClassName} ${className}`}>
    <div className="flex flex-col gap-4 border-b border-black/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-gray-950">{title}</h3>
        {description ? <p className="mt-1 text-sm text-gray-500">{description}</p> : null}
      </div>
      {action}
    </div>
    {children}
  </section>
);

const StatusPill = ({ className, children }: { className: string; children: React.ReactNode }) => (
  <Badge variant="default" className={`rounded-full border-0 px-3 py-1 text-xs font-semibold ${className}`}>
    {children}
  </Badge>
);

const MetricCard = ({
  label,
  value,
  delta,
  description,
  icon: Icon,
  tone,
  deltaDirection,
  bars,
}: {
  label: string;
  value: string;
  delta: string;
  description: string;
  icon: LucideIcon;
  tone: MetricCardTone;
  deltaDirection: 'up' | 'down';
  bars: number[];
}) => {
  const style = toneStyles[tone];
  const DeltaIcon = deltaDirection === 'up' ? ArrowUpRight : ArrowDownRight;

  return (
    <div className={`relative overflow-hidden rounded-[28px] border p-5 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.4)] ${style.shell}`}>
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-500">{label}</div>
          <div className="text-3xl font-semibold tracking-tight text-gray-950">{value}</div>
          <p className="max-w-[18rem] text-sm text-gray-500">{description}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.icon}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-6 flex items-end justify-between gap-4">
        <div
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            deltaDirection === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
          }`}
        >
          <DeltaIcon className="h-3.5 w-3.5" />
          {delta}
        </div>
        <div className="flex items-end gap-1">
          {bars.map((bar, index) => (
            <span
              key={`${label}-${index}`}
              className={`w-2 rounded-full ${style.bar}`}
              style={{ height: `${14 + bar * 3}px`, opacity: 0.45 + index / (bars.length * 1.8) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<AdminTabId>('dashboard');
  const [categories, setCategories] = useState(ADMIN_CATEGORIES);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [newCategoryStatus, setNewCategoryStatus] = useState<'Active' | 'Hidden'>('Active');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(ADMIN_WAREHOUSES[0]?.id ?? '');
  const [orders, setOrders] = useState(ADMIN_ORDERS);
  const [orderFilter, setOrderFilter] = useState<OrderFilter>('All');
  const [selectedOrderId, setSelectedOrderId] = useState(ADMIN_ORDERS[0]?.id ?? '');
  const navigate = useNavigate();

  const latest = ADMIN_REPORT_SERIES[ADMIN_REPORT_SERIES.length - 1];
  const previous = ADMIN_REPORT_SERIES[ADMIN_REPORT_SERIES.length - 2];
  const reportRevenueChange = percentChange(latest.revenue, previous.revenue);
  const reportOrderChange = percentChange(latest.orders, previous.orders);
  const reportCustomerChange = percentChange(latest.customers, previous.customers);
  const reportRefundChange = percentChange(latest.refunds, previous.refunds);

  const slugify = (value: string) =>
    value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const selectedWarehouse =
    ADMIN_WAREHOUSES.find((warehouse) => warehouse.id === selectedWarehouseId) ?? ADMIN_WAREHOUSES[0];
  const selectedStock = ADMIN_WAREHOUSE_STOCK_BY_WAREHOUSE[selectedWarehouseId] ?? {};

  const averageWarehouseUsage = Math.round(
    (ADMIN_WAREHOUSES.reduce((sum, warehouse) => sum + warehouse.usedUnits / warehouse.capacityUnits, 0) /
      ADMIN_WAREHOUSES.length) *
      100,
  );
  const openShipmentCount = orders.filter((order) => order.shipmentStatus !== 'Delivered').length;
  const packedToday = ADMIN_FULFILLMENT_SERIES[ADMIN_FULFILLMENT_SERIES.length - 1]?.packed ?? 0;
  const todayDelivered = ADMIN_FULFILLMENT_SERIES[ADMIN_FULFILLMENT_SERIES.length - 1]?.delivered ?? 0;
  const vipUsers = ADMIN_USERS.filter((user) => user.status === 'VIP').length;
  const atRiskUsers = ADMIN_USERS.filter((user) => user.status === 'At Risk');
  const readyToPackCount = orders.filter((order) => order.shipmentStatus === 'Ready to Pack').length;
  const inTransitCount = orders.filter((order) =>
    ['Packed', 'Shipped', 'Out for Delivery'].includes(order.shipmentStatus),
  ).length;
  const invoiceReadyCount = orders.filter((order) => order.paymentStatus === 'Paid').length;
  const averageOrderValue = Math.round(orders.reduce((sum, order) => sum + order.total, 0) / orders.length);
  const activeUsers = ADMIN_USERS.filter((user) => user.status !== 'At Risk').length;
  const distributorCount = ADMIN_USERS.filter((user) => user.role === 'Distributor').length;
  const filteredOrders = orderFilter === 'All' ? orders : orders.filter((order) => order.shipmentStatus === orderFilter);
  const resolvedSelectedOrderId =
    filteredOrders.find((order) => order.id === selectedOrderId)?.id ?? filteredOrders[0]?.id ?? orders[0]?.id ?? '';
  const selectedOrder = orders.find((order) => order.id === resolvedSelectedOrderId) ?? orders[0];
  const selectedOrderWarehouse = ADMIN_WAREHOUSES.find((warehouse) => warehouse.id === selectedOrder?.warehouseId);

  const stockAlerts = ADMIN_WAREHOUSE_ITEMS.flatMap((item) =>
    ADMIN_WAREHOUSES.flatMap((warehouse) => {
      const onHand = ADMIN_WAREHOUSE_STOCK_BY_WAREHOUSE[warehouse.id]?.[item.sku] ?? 0;
      return onHand < item.reorderPoint
        ? [
            {
              id: `${warehouse.id}-${item.sku}`,
              warehouse: warehouse.name,
              item: item.name,
              onHand,
              reorderPoint: item.reorderPoint,
            },
          ]
        : [];
    }),
  );

  const roleMix = [
    { label: 'Customers', count: ADMIN_USERS.filter((user) => user.role === 'Customer').length, color: 'bg-sky-500' },
    { label: 'Distributors', count: distributorCount, color: 'bg-amber-500' },
    { label: 'Admins', count: ADMIN_USERS.filter((user) => user.role === 'Admin').length, color: 'bg-slate-800' },
  ];

  const printInvoice = (order: AdminOrder) => {
    const printWindow = window.open('', '_blank', 'width=980,height=720');

    if (!printWindow) return;

    printWindow.document.open();
    printWindow.document.write(buildInvoiceMarkup(order));
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  const advanceShipmentStatus = (orderId: string) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) => {
        if (order.id !== orderId) return order;
        const currentIndex = shipmentStages.indexOf(order.shipmentStatus);
        if (currentIndex === -1 || currentIndex === shipmentStages.length - 1) return order;
        return {
          ...order,
          shipmentStatus: shipmentStages[currentIndex + 1],
        };
      }),
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(249,179,3,0.14),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#fffef7_40%,#f8fafc_100%)] font-sans text-gray-900">
      <aside className="fixed left-0 top-0 hidden min-h-screen w-72 flex-col border-r border-black/5 bg-white/80 backdrop-blur md:flex">
        <div className="border-b border-black/5 p-7">
          <Link to="/" className="text-xl font-bold uppercase tracking-[0.22em] text-black">
            HUSTLE WRAPS
            <span className="mt-2 block text-xs font-semibold tracking-[0.3em] text-amber-500">Admin Console</span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-gray-500">
            A cleaner command center for fulfilment, customers, reporting, and stock control.
          </p>
        </div>
        <div className="space-y-2 p-5">
          <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-400">Navigation</div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-[linear-gradient(135deg,rgba(255,248,220,1),rgba(255,255,255,1))] text-black shadow-[0_18px_36px_-30px_rgba(15,23,42,0.45)]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }`}
            >
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-amber-500' : 'text-gray-400'}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="px-4 pb-20 pt-6 sm:px-6 md:ml-72 md:px-10 md:pt-8 xl:px-14">
        <div className="mb-6 md:hidden">
          <Link to="/" className="text-sm font-bold uppercase tracking-[0.18em] text-black">
            HUSTLE WRAPS
          </Link>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-500">Admin Console</p>
        </div>
        <div className="mb-8 overflow-x-auto md:hidden">
          <div className="flex min-w-max gap-2 pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                  activeTab === tab.id
                    ? 'border-amber-300 bg-amber-50 text-amber-700'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <header className="mb-8 flex flex-col gap-4 md:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white text-gray-700 transition hover:bg-gray-50"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Admin Workspace</div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-950 sm:text-[2.25rem]">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">{tabDescriptions[activeTab]}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill className="bg-slate-100 text-slate-700">Live mock data</StatusPill>
            <StatusPill className="bg-emerald-100 text-emerald-700">
              Last updated {formatDate(new Date().toISOString())}
            </StatusPill>
          </div>
        </header>
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <section className="grid gap-6 xl:grid-cols-[1.55fr,0.95fr]">
                <div className={`${panelClassName} relative overflow-hidden p-6 md:p-8`}>
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(249,179,3,0.18),transparent_55%)]" />
                  <div className="relative max-w-2xl">
                    <StatusPill className="bg-amber-100 text-amber-700">Operations Snapshot</StatusPill>
                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gray-950 md:text-[2.4rem]">
                      Orders, stock, invoices, and customer health in one place.
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500">
                      March revenue is ahead of target, the shipment queue is active, and the invoice flow now lives directly inside the orders desk.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab('orders')}
                        className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                      >
                        Open Orders Desk
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('reports')}
                        className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        Review Reports
                      </button>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-black/5 bg-white/80 p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Revenue</div>
                        <div className="mt-2 text-2xl font-semibold text-gray-950">{formatCurrency(latest.revenue)}</div>
                        <div className="mt-1 text-sm text-emerald-600">+{reportRevenueChange}% vs last month</div>
                      </div>
                      <div className="rounded-2xl border border-black/5 bg-white/80 p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Orders in Flight</div>
                        <div className="mt-2 text-2xl font-semibold text-gray-950">{formatNumber(openShipmentCount)}</div>
                        <div className="mt-1 text-sm text-gray-500">{invoiceReadyCount} invoices ready to print</div>
                      </div>
                      <div className="rounded-2xl border border-black/5 bg-white/80 p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Delivery Pace</div>
                        <div className="mt-2 text-2xl font-semibold text-gray-950">{todayDelivered}</div>
                        <div className="mt-1 text-sm text-gray-500">Delivered on the latest daily snapshot</div>
                      </div>
                    </div>
                  </div>
                </div>

                <SectionPanel
                  title="Fulfilment Snapshot"
                  description="Shipment stages live inside the orders desk now."
                >
                  <div className="space-y-5 p-6">
                    {shipmentStages.map((status) => {
                      const count = orders.filter((order) => order.shipmentStatus === status).length;
                      const progress = count === 0 ? 0 : Math.min(100, count * 22);

                      return (
                        <div key={status}>
                          <div className="mb-2 flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-700">{status}</div>
                            <div className="text-sm font-semibold text-gray-950">{count}</div>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      );
                    })}
                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2 font-semibold text-gray-900">
                        <Truck className="h-4 w-4 text-amber-500" />
                        Shipment desk is active
                      </div>
                      <p className="mt-2 leading-6">
                        {readyToPackCount} orders are waiting for pack confirmation and {inTransitCount} are moving through courier lanes.
                      </p>
                    </div>
                  </div>
                </SectionPanel>
              </section>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  label="Monthly Revenue"
                  value={formatCurrency(latest.revenue)}
                  delta={`${reportRevenueChange > 0 ? '+' : ''}${reportRevenueChange}%`}
                  description="Revenue is pacing ahead with stronger premium-item mix."
                  icon={DollarSign}
                  tone="amber"
                  deltaDirection={reportRevenueChange >= 0 ? 'up' : 'down'}
                  bars={[8, 10, 11, 13, 14, 16]}
                />
                <MetricCard
                  label="Open Shipments"
                  value={formatNumber(openShipmentCount)}
                  delta="+3 live"
                  description="Orders currently moving from packing to delivery."
                  icon={Truck}
                  tone="sky"
                  deltaDirection="up"
                  bars={[4, 6, 7, 8, 9, 11]}
                />
                <MetricCard
                  label="Warehouse Usage"
                  value={`${averageWarehouseUsage}%`}
                  delta="+4 pts"
                  description="Average space used across all stocking locations."
                  icon={WarehouseIcon}
                  tone="slate"
                  deltaDirection="up"
                  bars={[5, 7, 8, 8, 10, 12]}
                />
                <MetricCard
                  label="VIP Users"
                  value={formatNumber(vipUsers)}
                  delta={`${atRiskUsers.length} need care`}
                  description="High-value buyers plus a watchlist for churn risk."
                  icon={User}
                  tone="emerald"
                  deltaDirection="down"
                  bars={[6, 6, 8, 9, 11, 10]}
                />
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.45fr,0.95fr]">
                <SectionPanel
                  title="Recent Orders"
                  description="Latest shipment queue with invoice access."
                  action={
                    <button
                      type="button"
                      onClick={() => setActiveTab('orders')}
                      className="text-sm font-semibold text-gray-700 transition hover:text-black"
                    >
                      View all orders
                    </button>
                  }
                >
                  <div className="overflow-x-auto">
                    <table className="min-w-[760px] w-full text-left text-sm">
                      <thead className="border-b border-black/5 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                        <tr>
                          <th className="px-6 py-4">Order</th>
                          <th className="px-6 py-4">Customer</th>
                          <th className="px-6 py-4">Shipment</th>
                          <th className="px-6 py-4">Total</th>
                          <th className="px-6 py-4 text-right">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="transition hover:bg-slate-50/80">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-gray-950">{order.id}</div>
                              <div className="mt-1 text-xs text-gray-500">{formatDate(order.orderedAt)}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{order.customerName}</div>
                              <div className="mt-1 text-xs text-gray-500">{order.channel}</div>
                            </td>
                            <td className="px-6 py-4">
                              <StatusPill className={getShipmentStatusClassName(order.shipmentStatus)}>
                                {order.shipmentStatus}
                              </StatusPill>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-950">{formatCurrency(order.total)}</td>
                            <td className="px-6 py-4 text-right">
                              <button
                                type="button"
                                onClick={() => printInvoice(order)}
                                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-700 transition hover:bg-gray-50"
                              >
                                <Printer className="h-3.5 w-3.5" />
                                Print
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionPanel>

                <div className="space-y-6">
                  <SectionPanel title="Stock Alerts" description="Low stock signals across warehouse bins.">
                    <div className="space-y-4 p-6">
                      {stockAlerts.slice(0, 4).map((alert) => (
                        <div key={alert.id} className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-medium text-gray-950">{alert.item}</div>
                              <div className="mt-1 text-sm text-gray-500">{alert.warehouse}</div>
                            </div>
                            <StatusPill className="bg-rose-100 text-rose-700">
                              {alert.onHand}/{alert.reorderPoint}
                            </StatusPill>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionPanel>

                  <SectionPanel title="Customer Pulse" description="A quick view of account health and fulfilment velocity.">
                    <div className="space-y-4 p-6 text-sm text-gray-600">
                      <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="flex items-center gap-2">
                          <PackageCheck className="h-4 w-4 text-emerald-500" />
                          Packed today
                        </span>
                        <strong className="text-gray-950">{packedToday}</strong>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-sky-500" />
                          Active accounts
                        </span>
                        <strong className="text-gray-950">{activeUsers}</strong>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="flex items-center gap-2">
                          <Clock3 className="h-4 w-4 text-amber-500" />
                          Average order value
                        </span>
                        <strong className="text-gray-950">{formatCurrency(averageOrderValue)}</strong>
                      </div>
                    </div>
                  </SectionPanel>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  label="Revenue"
                  value={formatCurrency(latest.revenue)}
                  delta={`${reportRevenueChange > 0 ? '+' : ''}${reportRevenueChange}%`}
                  description="Monthly revenue compared to the previous report period."
                  icon={DollarSign}
                  tone="amber"
                  deltaDirection={reportRevenueChange >= 0 ? 'up' : 'down'}
                  bars={[8, 10, 11, 12, 14, 16]}
                />
                <MetricCard
                  label="Orders"
                  value={formatNumber(latest.orders)}
                  delta={`${reportOrderChange > 0 ? '+' : ''}${reportOrderChange}%`}
                  description="Order throughput grew with strong showroom and online mix."
                  icon={ShoppingCart}
                  tone="sky"
                  deltaDirection={reportOrderChange >= 0 ? 'up' : 'down'}
                  bars={[5, 7, 9, 10, 10, 12]}
                />
                <MetricCard
                  label="Customers"
                  value={formatNumber(latest.customers)}
                  delta={`${reportCustomerChange > 0 ? '+' : ''}${reportCustomerChange}%`}
                  description="Returning customers are still the main growth engine."
                  icon={Users}
                  tone="emerald"
                  deltaDirection={reportCustomerChange >= 0 ? 'up' : 'down'}
                  bars={[4, 6, 7, 9, 9, 11]}
                />
                <MetricCard
                  label="Refunds"
                  value={formatCurrency(latest.refunds)}
                  delta={`${reportRefundChange > 0 ? '+' : ''}${reportRefundChange}%`}
                  description="Refund values are lower month-over-month, which is healthy."
                  icon={Receipt}
                  tone="rose"
                  deltaDirection={reportRefundChange <= 0 ? 'up' : 'down'}
                  bars={[7, 7, 6, 5, 5, 4]}
                />
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <SectionPanel title="Revenue and Orders" description="Monthly trend with separate revenue and order scales.">
                  <div className="p-4 sm:p-6">
                    <ChartContainer
                      className="h-[320px] w-full"
                      config={{
                        revenue: { label: 'Revenue', color: '#F9B303' },
                        orders: { label: 'Orders', color: '#111827' },
                      }}
                    >
                      <ComposedChart data={ADMIN_REPORT_SERIES} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis
                          yAxisId="revenue"
                          tickLine={false}
                          axisLine={false}
                          width={48}
                          tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`}
                        />
                        <YAxis yAxisId="orders" orientation="right" tickLine={false} axisLine={false} width={36} />
                        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar yAxisId="orders" dataKey="orders" fill="var(--color-orders)" opacity={0.2} radius={[6, 6, 0, 0]} />
                        <Line yAxisId="revenue" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2.8} dot={false} />
                      </ComposedChart>
                    </ChartContainer>
                  </div>
                </SectionPanel>

                <SectionPanel title="Channel Performance" description="Revenue volume against order count by selling channel.">
                  <div className="p-4 sm:p-6">
                    <ChartContainer
                      className="h-[320px] w-full"
                      config={{
                        revenue: { label: 'Revenue', color: '#F9B303' },
                        orders: { label: 'Orders', color: '#111827' },
                      }}
                    >
                      <ComposedChart data={ADMIN_CHANNEL_PERFORMANCE} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="channel" tickLine={false} axisLine={false} />
                        <YAxis
                          yAxisId="revenue"
                          tickLine={false}
                          axisLine={false}
                          width={48}
                          tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`}
                        />
                        <YAxis yAxisId="orders" orientation="right" tickLine={false} axisLine={false} width={36} />
                        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar yAxisId="revenue" dataKey="revenue" fill="var(--color-revenue)" radius={[8, 8, 0, 0]} />
                        <Line yAxisId="orders" type="monotone" dataKey="orders" stroke="var(--color-orders)" strokeWidth={2.8} dot={false} />
                      </ComposedChart>
                    </ChartContainer>
                  </div>
                </SectionPanel>
              </div>

              <SectionPanel title="Fulfilment Throughput" description="Packed, shipped, and delivered counts for the latest week.">
                <div className="p-4 sm:p-6">
                  <ChartContainer
                    className="h-[300px] w-full"
                    config={{
                      packed: { label: 'Packed', color: '#0f172a' },
                      shipped: { label: 'Shipped', color: '#38bdf8' },
                      delivered: { label: 'Delivered', color: '#10b981' },
                    }}
                  >
                    <BarChart data={ADMIN_FULFILLMENT_SERIES} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="day" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} width={36} />
                      <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="packed" fill="var(--color-packed)" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="shipped" fill="var(--color-shipped)" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="delivered" fill="var(--color-delivered)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </SectionPanel>

              <div className="grid gap-6 xl:grid-cols-3">
                <SectionPanel title="Regional Revenue" description="Revenue, repeat rate, and delivery speed by region.">
                  <div className="space-y-4 p-6">
                    {ADMIN_REGIONAL_PERFORMANCE.map((region) => (
                      <div key={region.region} className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-medium text-gray-950">{region.region}</div>
                            <div className="mt-1 text-sm text-gray-500">{region.orders} orders</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-950">{formatCurrency(region.revenue)}</div>
                            <div className="mt-1 text-xs text-gray-500">{region.avgDeliveryDays.toFixed(1)} day avg delivery</div>
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-emerald-600">{region.repeatRate}% repeat rate</div>
                      </div>
                    ))}
                  </div>
                </SectionPanel>

                <SectionPanel title="Top Products" description="Best revenue contributors for the current report cycle.">
                  <div className="space-y-4 p-6">
                    {ADMIN_TOP_PRODUCTS.map((product) => (
                      <div key={product.product} className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                        <div className="font-medium text-gray-950">{product.product}</div>
                        <div className="mt-1 text-sm text-gray-500">{product.category}</div>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span className="text-gray-500">{product.unitsSold} units</span>
                          <span className="font-semibold text-gray-950">{formatCurrency(product.revenue)}</span>
                        </div>
                        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                          {product.margin}% margin
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionPanel>

                <SectionPanel title="Goals Tracker" description="How the month compares to internal targets.">
                  <div className="space-y-5 p-6">
                    {ADMIN_GOALS.map((goal) => {
                      const progress = Math.min(100, Math.round((goal.actual / goal.target) * 100));
                      const ahead = goal.actual >= goal.target;

                      return (
                        <div key={goal.metric}>
                          <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                            <span className="font-medium text-gray-700">{goal.metric}</span>
                            <span className="font-semibold text-gray-950">
                              {formatGoalValue(goal, goal.actual)} / {formatGoalValue(goal, goal.target)}
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className={`h-full rounded-full ${ahead ? 'bg-emerald-500' : 'bg-amber-400'}`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className={`mt-2 text-xs font-semibold uppercase tracking-[0.18em] ${ahead ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {ahead ? 'Ahead of target' : 'Close to target'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </SectionPanel>
              </div>
            </div>
          )}

          {activeTab === 'orders' && selectedOrder && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  label="Ready To Pack"
                  value={formatNumber(readyToPackCount)}
                  delta="+2 since morning"
                  description="Orders that still need pack confirmation."
                  icon={Package}
                  tone="amber"
                  deltaDirection="up"
                  bars={[3, 4, 5, 7, 8, 8]}
                />
                <MetricCard
                  label="In Transit"
                  value={formatNumber(inTransitCount)}
                  delta="+1 courier run"
                  description="Packed, shipped, or out-for-delivery orders."
                  icon={Truck}
                  tone="sky"
                  deltaDirection="up"
                  bars={[4, 5, 6, 7, 8, 10]}
                />
                <MetricCard
                  label="Delivered"
                  value={formatNumber(orders.filter((order) => order.shipmentStatus === 'Delivered').length)}
                  delta="+2 completed"
                  description="Orders that have reached customers successfully."
                  icon={PackageCheck}
                  tone="emerald"
                  deltaDirection="up"
                  bars={[2, 4, 5, 6, 8, 9]}
                />
                <MetricCard
                  label="Invoices Ready"
                  value={formatNumber(invoiceReadyCount)}
                  delta="Print from any row"
                  description="Paid orders with invoice printing enabled."
                  icon={Printer}
                  tone="slate"
                  deltaDirection="up"
                  bars={[6, 7, 7, 8, 9, 10]}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {(['All', ...shipmentStages] as OrderFilter[]).map((filter) => {
                  const count =
                    filter === 'All'
                      ? orders.length
                      : orders.filter((order) => order.shipmentStatus === filter).length;

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setOrderFilter(filter)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                        orderFilter === filter
                          ? 'border-amber-300 bg-amber-50 text-amber-700'
                          : 'border-black/10 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {filter}
                      <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] tracking-normal text-gray-600">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.45fr,0.95fr]">
                <SectionPanel title="Shipment Queue" description="Select an order to manage shipment details and print the invoice.">
                  <div className="overflow-x-auto">
                    <table className="min-w-[940px] w-full text-left text-sm">
                      <thead className="border-b border-black/5 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                        <tr>
                          <th className="px-6 py-4">Order</th>
                          <th className="px-6 py-4">Customer</th>
                          <th className="px-6 py-4">Shipment</th>
                          <th className="px-6 py-4">Payment</th>
                          <th className="px-6 py-4">Total</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {filteredOrders.map((order) => {
                          const isSelected = order.id === resolvedSelectedOrderId;

                          return (
                            <tr
                              key={order.id}
                              onClick={() => setSelectedOrderId(order.id)}
                              className={`cursor-pointer transition ${isSelected ? 'bg-amber-50/70' : 'hover:bg-slate-50/80'}`}
                            >
                              <td className="px-6 py-4">
                                <div className="font-semibold text-gray-950">{order.id}</div>
                                <div className="mt-1 text-xs text-gray-500">{formatDate(order.orderedAt)}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{order.customerName}</div>
                                <div className="mt-1 text-xs text-gray-500">{order.city}, {order.region}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-2">
                                  <StatusPill className={getShipmentStatusClassName(order.shipmentStatus)}>
                                    {order.shipmentStatus}
                                  </StatusPill>
                                  <div className="text-xs text-gray-500">{order.courier} · {order.trackingId}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-2">
                                  <StatusPill className={getPaymentStatusClassName(order.paymentStatus)}>
                                    {order.paymentStatus}
                                  </StatusPill>
                                  <StatusPill className={getPriorityClassName(order.priority)}>
                                    {order.priority} priority
                                  </StatusPill>
                                </div>
                              </td>
                              <td className="px-6 py-4 font-semibold text-gray-950">{formatCurrency(order.total)}</td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      setSelectedOrderId(order.id);
                                    }}
                                    className="rounded-full border border-black/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-700 transition hover:bg-gray-50"
                                  >
                                    Open
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      printInvoice(order);
                                    }}
                                    className="inline-flex items-center gap-1 rounded-full border border-black/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-700 transition hover:bg-gray-50"
                                  >
                                    <Printer className="h-3.5 w-3.5" />
                                    Print
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </SectionPanel>

                <SectionPanel
                  title="Shipment Detail"
                  description={`${selectedOrder.customerName} · ${selectedOrder.city}, ${selectedOrder.region}`}
                  action={
                    <StatusPill className={getShipmentStatusClassName(selectedOrder.shipmentStatus)}>
                      {selectedOrder.shipmentStatus}
                    </StatusPill>
                  }
                >
                  <div className="space-y-6 p-6">
                    <div className="rounded-[24px] border border-black/5 bg-[linear-gradient(145deg,rgba(255,248,220,0.9),rgba(255,255,255,1))] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Shipment Progress</div>
                          <div className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">{selectedOrder.id}</div>
                          <div className="mt-1 text-sm text-gray-500">
                            ETA {formatDate(selectedOrder.estimatedDelivery)} · {selectedOrder.courier}
                          </div>
                        </div>
                        <StatusPill className={getPaymentStatusClassName(selectedOrder.paymentStatus)}>
                          {selectedOrder.paymentStatus}
                        </StatusPill>
                      </div>
                      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/80">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400"
                          style={{ width: `${getShipmentProgress(selectedOrder.shipmentStatus)}%` }}
                        />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="rounded-2xl bg-white/80 p-3">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Warehouse</div>
                          <div className="mt-1 font-medium text-gray-950">{selectedOrderWarehouse?.name ?? 'Assigned'}</div>
                        </div>
                        <div className="rounded-2xl bg-white/80 p-3">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Tracking</div>
                          <div className="mt-1 font-medium text-gray-950">{selectedOrder.trackingId}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {shipmentStages.map((stage, index) => {
                        const activeIndex = shipmentStages.indexOf(selectedOrder.shipmentStatus);
                        const completed = index <= activeIndex;

                        return (
                          <div key={stage} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-slate-50 px-4 py-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${completed ? 'bg-emerald-500 text-white' : 'bg-white text-gray-400'}`}>
                              {completed ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                            </div>
                            <div className="font-medium text-gray-800">{stage}</div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-950">
                        <MapPin className="h-4 w-4 text-amber-500" />
                        Shipping details
                      </div>
                      <div className="mt-3 text-sm leading-6 text-gray-600">
                        {selectedOrder.customerName}
                        <br />
                        {selectedOrder.city}, {selectedOrder.region}
                        <br />
                        {selectedOrder.customerEmail}
                        <br />
                        {selectedOrder.customerPhone}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-950">
                        <Receipt className="h-4 w-4 text-slate-700" />
                        Invoice items
                      </div>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item) => (
                          <div key={`${selectedOrder.id}-${item.sku}`} className="rounded-2xl border border-black/5 bg-white p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-medium text-gray-950">{item.name}</div>
                                <div className="mt-1 text-xs text-gray-500">{item.sku}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-gray-950">{formatCurrency(item.quantity * item.unitPrice)}</div>
                                <div className="mt-1 text-xs text-gray-500">
                                  {item.quantity} x {formatCurrency(item.unitPrice)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center justify-between">
                          <span>Subtotal</span>
                          <strong className="text-gray-950">{formatCurrency(selectedOrder.subtotal)}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Shipping</span>
                          <strong className="text-gray-950">{formatCurrency(selectedOrder.shippingFee)}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Tax</span>
                          <strong className="text-gray-950">{formatCurrency(selectedOrder.tax)}</strong>
                        </div>
                        <div className="flex items-center justify-between border-t border-black/5 pt-3 text-base">
                          <span className="font-semibold text-gray-950">Total</span>
                          <strong className="text-gray-950">{formatCurrency(selectedOrder.total)}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2 font-semibold text-gray-950">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        Shipment note
                      </div>
                      <p className="mt-2 leading-6">{selectedOrder.notes}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        type="button"
                        onClick={() => advanceShipmentStatus(selectedOrder.id)}
                        disabled={selectedOrder.shipmentStatus === 'Delivered'}
                        className="rounded-2xl px-5 tracking-[0.18em]"
                      >
                        {getOrderActionLabel(selectedOrder.shipmentStatus)}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => printInvoice(selectedOrder)}
                        className="rounded-2xl border-black/10 px-5 tracking-[0.18em]"
                      >
                        Print Invoice
                      </Button>
                    </div>
                  </div>
                </SectionPanel>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  label="Total Accounts"
                  value={formatNumber(ADMIN_USERS.length)}
                  delta="+3 this month"
                  description="Customers, distributors, and admin users in one list."
                  icon={Users}
                  tone="slate"
                  deltaDirection="up"
                  bars={[4, 5, 6, 7, 8, 9]}
                />
                <MetricCard
                  label="Active Users"
                  value={formatNumber(activeUsers)}
                  delta="Steady engagement"
                  description="Accounts still ordering or interacting in the latest cycle."
                  icon={ShieldCheck}
                  tone="emerald"
                  deltaDirection="up"
                  bars={[5, 6, 7, 8, 8, 10]}
                />
                <MetricCard
                  label="Distributors"
                  value={formatNumber(distributorCount)}
                  delta="B2B core accounts"
                  description="Wholesale buyers with repeat operational activity."
                  icon={Store}
                  tone="amber"
                  deltaDirection="up"
                  bars={[3, 4, 5, 6, 7, 8]}
                />
                <MetricCard
                  label="At Risk"
                  value={formatNumber(atRiskUsers.length)}
                  delta="Needs follow-up"
                  description="Users showing lower recent order activity."
                  icon={AlertCircle}
                  tone="rose"
                  deltaDirection="down"
                  bars={[8, 7, 7, 6, 5, 4]}
                />
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.45fr,0.95fr]">
                <SectionPanel title="Users Directory" description="Track role, spend, order count, and account health.">
                  <div className="overflow-x-auto">
                    <table className="min-w-[860px] w-full text-left text-sm">
                      <thead className="border-b border-black/5 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                        <tr>
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Role</th>
                          <th className="px-6 py-4">Orders</th>
                          <th className="px-6 py-4">Lifetime Spend</th>
                          <th className="px-6 py-4">Last Order</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {ADMIN_USERS.map((user) => (
                          <tr key={user.id} className="transition hover:bg-slate-50/80">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-950">{user.name}</div>
                              <div className="mt-1 text-xs text-gray-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-800">{user.role}</div>
                              <div className="mt-1 text-xs text-gray-500">{user.city}</div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-950">{formatNumber(user.lifetimeOrders)}</td>
                            <td className="px-6 py-4 font-semibold text-gray-950">{formatCurrency(user.totalSpend)}</td>
                            <td className="px-6 py-4 text-gray-600">{user.lifetimeOrders === 0 ? 'Internal' : formatDate(user.lastOrderAt)}</td>
                            <td className="px-6 py-4">
                              <StatusPill className={getUserStatusClassName(user.status)}>{user.status}</StatusPill>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionPanel>

                <div className="space-y-6">
                  <SectionPanel title="Role Mix" description="How the account base is distributed.">
                    <div className="space-y-5 p-6">
                      {roleMix.map((role) => {
                        const percent = Math.round((role.count / ADMIN_USERS.length) * 100);
                        return (
                          <div key={role.label}>
                            <div className="mb-2 flex items-center justify-between text-sm">
                              <span className="font-medium text-gray-700">{role.label}</span>
                              <span className="font-semibold text-gray-950">{role.count}</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                              <div className={`h-full rounded-full ${role.color}`} style={{ width: `${percent}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </SectionPanel>

                  <SectionPanel title="Win-Back Queue" description="Accounts to check in with this week.">
                    <div className="space-y-4 p-6">
                      {atRiskUsers.map((user) => (
                        <div key={user.id} className="rounded-2xl border border-rose-100 bg-rose-50/80 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-medium text-gray-950">{user.name}</div>
                              <div className="mt-1 text-sm text-gray-500">{user.email}</div>
                            </div>
                            <StatusPill className="bg-rose-100 text-rose-700">{user.status}</StatusPill>
                          </div>
                          <div className="mt-4 text-sm text-gray-600">
                            Last order {formatDate(user.lastOrderAt)} · Lifetime spend {formatCurrency(user.totalSpend)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionPanel>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <SectionPanel
              title="Product Inventory"
              description="Merchandising and stock overview for all active products."
              action={
                <button className="rounded-2xl bg-[#F9B303] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#e0a103]">
                  Add Product
                </button>
              }
            >
              <div className="overflow-x-auto">
                <table className="min-w-[760px] w-full text-left text-sm">
                  <thead className="border-b border-black/5 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {MOCK_PRODUCTS.map((product) => (
                      <tr key={product.id} className="transition hover:bg-slate-50/80">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4 font-medium text-gray-900">
                            <img src={product.image} alt={product.name} className="h-11 w-11 rounded-2xl object-cover" />
                            <div>
                              <div>{product.name}</div>
                              <div className="mt-1 text-xs text-gray-500">{product.description.slice(0, 58)}...</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{product.category}</td>
                        <td className="px-6 py-4 text-gray-500">{formatCurrency(product.price)}</td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${product.stock < 15 ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {product.stock} units
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="font-semibold text-gray-700 transition hover:text-black">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionPanel>
          )}

          {activeTab === 'categories' && (
            <div className="grid gap-6 xl:grid-cols-[0.9fr,1.35fr]">
              <SectionPanel title="Add Category" description="Create a new catalog grouping for products.">
                <form
                  className="space-y-4 p-6"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const name = newCategoryName.trim();

                    if (!name) return;

                    setCategories((currentCategories) => [
                      {
                        id: `cat-${Date.now()}`,
                        name,
                        slug: slugify(name),
                        description: newCategoryDescription.trim() || '-',
                        status: newCategoryStatus,
                        productCount: 0,
                        updatedAt: new Date().toISOString().slice(0, 10),
                      },
                      ...currentCategories,
                    ]);
                    setNewCategoryName('');
                    setNewCategoryDescription('');
                    setNewCategoryStatus('Active');
                  }}
                >
                  <input
                    value={newCategoryName}
                    onChange={(event) => setNewCategoryName(event.target.value)}
                    placeholder="Category name"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-amber-300 focus:outline-none"
                    required
                  />
                  <textarea
                    value={newCategoryDescription}
                    onChange={(event) => setNewCategoryDescription(event.target.value)}
                    placeholder="Short description"
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-amber-300 focus:outline-none"
                  />
                  <select
                    value={newCategoryStatus}
                    onChange={(event) => setNewCategoryStatus(event.target.value as 'Active' | 'Hidden')}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-amber-300 focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                  <Button type="submit" className="w-full rounded-2xl tracking-[0.18em]">
                    Create Category
                  </Button>
                </form>
              </SectionPanel>

              <SectionPanel
                title="Categories"
                description="Manage storefront groupings and visibility."
                action={<div className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">{categories.length} total</div>}
              >
                <div className="overflow-x-auto">
                  <table className="min-w-[760px] w-full text-left text-sm">
                    <thead className="border-b border-black/5 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Slug</th>
                        <th className="px-6 py-4">Products</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Updated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {categories.map((category) => (
                        <tr key={category.id} className="transition hover:bg-slate-50/80">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{category.name}</div>
                            <div className="mt-1 text-xs text-gray-500">{category.description}</div>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs text-gray-600">/{category.slug}</td>
                          <td className="px-6 py-4 text-gray-600">{category.productCount}</td>
                          <td className="px-6 py-4">
                            <StatusPill className={category.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}>
                              {category.status}
                            </StatusPill>
                          </td>
                          <td className="px-6 py-4 text-right text-gray-500">{category.updatedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionPanel>
            </div>
          )}

          {activeTab === 'warehouse' && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                {ADMIN_WAREHOUSES.map((warehouse) => {
                  const percentUsed = Math.round((warehouse.usedUnits / warehouse.capacityUnits) * 100);
                  const isSelected = warehouse.id === selectedWarehouseId;

                  return (
                    <button
                      key={warehouse.id}
                      type="button"
                      onClick={() => setSelectedWarehouseId(warehouse.id)}
                      className={`${panelClassName} p-5 text-left transition ${
                        isSelected ? 'border-black ring-1 ring-black/5' : 'hover:border-black/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">Warehouse</div>
                          <div className="mt-2 text-lg font-semibold text-gray-950">{warehouse.name}</div>
                          <div className="mt-1 text-sm text-gray-500">{warehouse.city}, {warehouse.region}</div>
                        </div>
                        <StatusPill className="bg-slate-100 text-slate-700">{percentUsed}% used</StatusPill>
                      </div>
                      <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300" style={{ width: `${percentUsed}%` }} />
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        {formatNumber(warehouse.usedUnits)} / {formatNumber(warehouse.capacityUnits)} units occupied
                      </div>
                    </button>
                  );
                })}
              </div>

              <SectionPanel
                title="Warehouse Stock"
                description={`${selectedWarehouse.name} · ${selectedWarehouse.city}, ${selectedWarehouse.region}`}
              >
                <div className="overflow-x-auto">
                  <table className="min-w-[760px] w-full text-left text-sm">
                    <thead className="border-b border-black/5 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                      <tr>
                        <th className="px-6 py-4">SKU</th>
                        <th className="px-6 py-4">Item</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4 text-right">On Hand</th>
                        <th className="px-6 py-4 text-right">Reorder</th>
                        <th className="px-6 py-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {ADMIN_WAREHOUSE_ITEMS.map((item) => {
                        const onHand = selectedStock[item.sku] ?? 0;
                        const isLow = onHand < item.reorderPoint;

                        return (
                          <tr key={item.sku} className="transition hover:bg-slate-50/80">
                            <td className="px-6 py-4 font-mono text-xs text-gray-600">{item.sku}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 text-gray-600">{item.category}</td>
                            <td className="px-6 py-4 text-right font-semibold text-gray-950">{onHand}</td>
                            <td className="px-6 py-4 text-right text-gray-600">{item.reorderPoint}</td>
                            <td className="px-6 py-4 text-right">
                              <StatusPill className={isLow ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'}>
                                {isLow ? 'Low' : 'OK'}
                              </StatusPill>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </SectionPanel>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};
