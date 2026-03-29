import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  AlertCircle,
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  PackageCheck,
  PackageOpen,
  PhoneCall,
  Receipt,
  Search,
  Sparkles,
  Truck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../components/ui/chart';
import { MOCK_PRODUCTS } from '../data/mockData';
import {
  DISTRIBUTOR_ACCOUNT_NOTES,
  DISTRIBUTOR_INVOICES,
  DISTRIBUTOR_PARTNER_PROFILE,
  DISTRIBUTOR_PERFORMANCE_SERIES,
  DISTRIBUTOR_REORDER_SUGGESTIONS,
  DISTRIBUTOR_SHIPMENTS,
  type DistributorInvoiceStatus,
  type DistributorShipmentStatus,
} from '../data/distributorConsoleMockData';

const distributorTabs = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'wholesale', label: 'Wholesale', icon: PackageOpen },
  { id: 'shipments', label: 'Shipments', icon: Truck },
  { id: 'billing', label: 'Billing', icon: DollarSign },
] as const;

const tabDescriptions: Record<(typeof distributorTabs)[number]['id'], string> = {
  dashboard: 'A premium partner overview for spend, margin, fulfilment, and account health.',
  wholesale: 'Build bulk orders with partner pricing, MOQ guidance, and reorder suggestions.',
  shipments: 'Track distributor shipments across warehouse release, transit, and delivery.',
  billing: 'Review statement health, invoice status, and available trade credit.',
};

const shipmentStages: DistributorShipmentStatus[] = [
  'Ready at Warehouse',
  'In Transit',
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
} as const;

type DistributorTabId = (typeof distributorTabs)[number]['id'];
type MetricCardTone = keyof typeof toneStyles;

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
const formatNumber = (value: number) => value.toLocaleString();
const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
const percentChange = (next: number, base: number) =>
  base === 0 ? 0 : Math.round(((next - base) / base) * 100);

const getShipmentStatusClassName = (status: DistributorShipmentStatus) => {
  switch (status) {
    case 'Ready at Warehouse':
      return 'bg-amber-100 text-amber-800';
    case 'In Transit':
      return 'bg-sky-100 text-sky-800';
    case 'Out for Delivery':
      return 'bg-violet-100 text-violet-800';
    case 'Delivered':
      return 'bg-emerald-100 text-emerald-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getInvoiceStatusClassName = (status: DistributorInvoiceStatus) => {
  switch (status) {
    case 'Paid':
      return 'bg-emerald-100 text-emerald-800';
    case 'Due Soon':
      return 'bg-amber-100 text-amber-800';
    case 'Overdue':
      return 'bg-rose-100 text-rose-800';
    case 'Draft':
      return 'bg-slate-100 text-slate-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getShipmentProgress = (status: DistributorShipmentStatus) => {
  const index = shipmentStages.indexOf(status);
  return index === -1 ? 0 : ((index + 1) / shipmentStages.length) * 100;
};

const SectionPanel = ({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className={panelClassName}>
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
  direction,
  bars,
}: {
  label: string;
  value: string;
  delta: string;
  description: string;
  icon: LucideIcon;
  tone: MetricCardTone;
  direction: 'up' | 'down';
  bars: number[];
}) => {
  const style = toneStyles[tone];
  const DeltaIcon = direction === 'up' ? ArrowUpRight : ArrowDownRight;

  return (
    <div className={`relative overflow-hidden rounded-[28px] border p-5 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.4)] ${style.shell}`}>
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
        <div className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${direction === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          <DeltaIcon className="h-3.5 w-3.5" />
          {delta}
        </div>
        <div className="flex items-end gap-1">
          {bars.map((bar, index) => (
            <span key={`${label}-${index}`} className={`w-2 rounded-full ${style.bar}`} style={{ height: `${14 + bar * 3}px`, opacity: 0.45 + index / (bars.length * 1.8) }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Distributor = () => {
  const [activeTab, setActiveTab] = useState<DistributorTabId>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [draftQuantities, setDraftQuantities] = useState<Record<string, number>>({});
  const [selectedShipmentId, setSelectedShipmentId] = useState(DISTRIBUTOR_SHIPMENTS[0]?.id ?? '');
  const navigate = useNavigate();

  const latest = DISTRIBUTOR_PERFORMANCE_SERIES[DISTRIBUTOR_PERFORMANCE_SERIES.length - 1];
  const previous = DISTRIBUTOR_PERFORMANCE_SERIES[DISTRIBUTOR_PERFORMANCE_SERIES.length - 2];
  const spendChange = percentChange(latest.spend, previous.spend);
  const orderChange = percentChange(latest.orders, previous.orders);
  const marginChange = latest.margin - previous.margin;
  const fillRateChange = latest.fillRate - previous.fillRate;
  const nextTierGap = Math.max(0, DISTRIBUTOR_PARTNER_PROFILE.nextTierTarget - DISTRIBUTOR_PARTNER_PROFILE.currentQuarterSpend);
  const inTransitShipments = DISTRIBUTOR_SHIPMENTS.filter((shipment) => shipment.status !== 'Delivered');
  const shipmentUnits = inTransitShipments.reduce((sum, shipment) => sum + shipment.units, 0);
  const paidInvoicesTotal = DISTRIBUTOR_INVOICES.filter((invoice) => invoice.status === 'Paid').reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueInvoices = DISTRIBUTOR_INVOICES.filter((invoice) => invoice.status === 'Overdue');
  const dueSoonInvoices = DISTRIBUTOR_INVOICES.filter((invoice) => invoice.status === 'Due Soon');
  const categories = ['All', ...new Set(MOCK_PRODUCTS.map((product) => product.category))];
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });
  const draftLines = MOCK_PRODUCTS.filter((product) => (draftQuantities[product.id] ?? 0) > 0);
  const draftUnits = draftLines.reduce((sum, product) => sum + (draftQuantities[product.id] ?? 0), 0);
  const retailTotal = draftLines.reduce((sum, product) => sum + product.price * (draftQuantities[product.id] ?? 0), 0);
  const wholesaleTotal = draftLines.reduce((sum, product) => sum + product.distributorPrice * (draftQuantities[product.id] ?? 0), 0);
  const savingsTotal = retailTotal - wholesaleTotal;
  const selectedShipment = DISTRIBUTOR_SHIPMENTS.find((shipment) => shipment.id === selectedShipmentId) ?? DISTRIBUTOR_SHIPMENTS[0];

  const setDraftQuantity = (productId: string, quantity: number) => {
    setDraftQuantities((current) => ({ ...current, [productId]: Math.max(0, quantity) }));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(249,179,3,0.14),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#fffef7_40%,#f8fafc_100%)] font-sans text-gray-900">
      <aside className="fixed left-0 top-0 hidden min-h-screen w-72 flex-col border-r border-black/5 bg-white/80 backdrop-blur md:flex">
        <div className="border-b border-black/5 p-7">
          <Link to="/" className="text-xl font-bold uppercase tracking-[0.22em] text-black">
            HUSTLE WRAPS
            <span className="mt-2 block text-xs font-semibold tracking-[0.3em] text-amber-500">Distributor Portal</span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-gray-500">Partner pricing, shipment visibility, and trade billing in one premium workspace.</p>
        </div>
        <div className="space-y-2 p-5">
          <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-400">Navigation</div>
          {distributorTabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${activeTab === tab.id ? 'bg-[linear-gradient(135deg,rgba(255,248,220,1),rgba(255,255,255,1))] text-black shadow-[0_18px_36px_-30px_rgba(15,23,42,0.45)]' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-amber-500' : 'text-gray-400'}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="px-4 pb-20 pt-6 sm:px-6 md:ml-72 md:px-10 md:pt-8 xl:px-14">
        <div className="mb-6 md:hidden">
          <Link to="/" className="text-sm font-bold uppercase tracking-[0.18em] text-black">HUSTLE WRAPS</Link>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-500">Distributor Portal</p>
        </div>
        <div className="mb-8 overflow-x-auto md:hidden">
          <div className="flex min-w-max gap-2 pb-1">
            {distributorTabs.map((tab) => (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${activeTab === tab.id ? 'border-amber-300 bg-amber-50 text-amber-700' : 'border-gray-200 bg-white text-gray-600'}`}>
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <header className="mb-8 flex flex-col gap-4 md:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4">
            <button type="button" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white text-gray-700 transition hover:bg-gray-50" aria-label="Go back">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Partner Workspace</div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-950 sm:text-[2.25rem]">{distributorTabs.find((tab) => tab.id === activeTab)?.label}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">{tabDescriptions[activeTab]}</p>
            </div>
          </div>
          <Button variant="outline" className="rounded-2xl border-black/10 px-5 tracking-[0.16em]">Contact Account Manager</Button>
        </header>
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <section className="grid gap-6 xl:grid-cols-[1.5fr,0.95fr]">
                <div className={`${panelClassName} relative overflow-hidden p-6 md:p-8`}>
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(249,179,3,0.18),transparent_55%)]" />
                  <div className="relative max-w-2xl">
                    <StatusPill className="bg-amber-100 text-amber-700">Partner Snapshot</StatusPill>
                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gray-950 md:text-[2.35rem]">
                      Premium wholesale ordering with tighter shipment and billing visibility.
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500">
                      {DISTRIBUTOR_PARTNER_PROFILE.companyName} is pacing toward the next partner tier, with March spend and fulfilment performance both stronger than the previous cycle.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button type="button" onClick={() => setActiveTab('wholesale')} className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
                        Build Wholesale Order
                      </button>
                      <button type="button" onClick={() => setActiveTab('shipments')} className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                        Track Shipments
                      </button>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-black/5 bg-white/80 p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Quarter Spend</div>
                        <div className="mt-2 text-2xl font-semibold text-gray-950">{formatCurrency(DISTRIBUTOR_PARTNER_PROFILE.currentQuarterSpend)}</div>
                        <div className="mt-1 text-sm text-gray-500">{formatCurrency(nextTierGap)} to next tier</div>
                      </div>
                      <div className="rounded-2xl border border-black/5 bg-white/80 p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Credit</div>
                        <div className="mt-2 text-2xl font-semibold text-gray-950">{formatCurrency(DISTRIBUTOR_PARTNER_PROFILE.availableCredit)}</div>
                        <div className="mt-1 text-sm text-gray-500">Available to deploy now</div>
                      </div>
                      <div className="rounded-2xl border border-black/5 bg-white/80 p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Manager</div>
                        <div className="mt-2 text-xl font-semibold text-gray-950">{DISTRIBUTOR_PARTNER_PROFILE.accountManager}</div>
                        <div className="mt-1 text-sm text-gray-500">Direct partner support</div>
                      </div>
                    </div>
                  </div>
                </div>

                <SectionPanel title="Account Desk" description="Your account manager and current trade notes.">
                  <div className="space-y-4 p-6">
                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-gray-950">{DISTRIBUTOR_PARTNER_PROFILE.accountManager}</div>
                          <div className="mt-1 text-sm text-gray-500">{DISTRIBUTOR_PARTNER_PROFILE.managerEmail}</div>
                        </div>
                        <PhoneCall className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="mt-3 text-sm text-gray-600">{DISTRIBUTOR_PARTNER_PROFILE.managerPhone}</div>
                    </div>
                    {DISTRIBUTOR_ACCOUNT_NOTES.map((note) => (
                      <div key={note.title} className={`rounded-2xl border p-4 ${note.tone === 'positive' ? 'border-emerald-100 bg-emerald-50/80' : note.tone === 'attention' ? 'border-rose-100 bg-rose-50/80' : 'border-black/5 bg-slate-50'}`}>
                        <div className="font-medium text-gray-950">{note.title}</div>
                        <div className="mt-2 text-sm leading-6 text-gray-600">{note.detail}</div>
                      </div>
                    ))}
                  </div>
                </SectionPanel>
              </section>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Monthly Spend" value={formatCurrency(latest.spend)} delta={`${spendChange > 0 ? '+' : ''}${spendChange}%`} description="Partner spend for the current reporting month." icon={DollarSign} tone="amber" direction={spendChange >= 0 ? 'up' : 'down'} bars={[6, 8, 9, 11, 12, 14]} />
                <MetricCard label="Orders" value={formatNumber(latest.orders)} delta={`${orderChange > 0 ? '+' : ''}${orderChange}%`} description="Distributor purchase orders shipped this month." icon={PackageOpen} tone="sky" direction={orderChange >= 0 ? 'up' : 'down'} bars={[3, 5, 6, 7, 8, 9]} />
                <MetricCard label="Margin" value={`${latest.margin}%`} delta={`${marginChange >= 0 ? '+' : ''}${marginChange} pts`} description="Average realized partner margin on shipped orders." icon={Sparkles} tone="emerald" direction={marginChange >= 0 ? 'up' : 'down'} bars={[4, 5, 6, 6, 7, 8]} />
                <MetricCard label="Fill Rate" value={`${latest.fillRate}%`} delta={`${fillRateChange >= 0 ? '+' : ''}${fillRateChange} pts`} description="Order completeness measured at dispatch." icon={PackageCheck} tone="slate" direction={fillRateChange >= 0 ? 'up' : 'down'} bars={[7, 8, 8, 9, 9, 10]} />
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.45fr,0.95fr]">
                <SectionPanel title="Spend and Orders" description="Monthly partner spend with order count overlay.">
                  <div className="p-4 sm:p-6">
                    <ChartContainer className="h-[320px] w-full" config={{ spend: { label: 'Spend', color: '#F9B303' }, orders: { label: 'Orders', color: '#111827' } }}>
                      <ComposedChart data={DISTRIBUTOR_PERFORMANCE_SERIES} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis yAxisId="spend" tickLine={false} axisLine={false} width={44} tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`} />
                        <YAxis yAxisId="orders" orientation="right" tickLine={false} axisLine={false} width={32} />
                        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar yAxisId="orders" dataKey="orders" fill="var(--color-orders)" opacity={0.2} radius={[6, 6, 0, 0]} />
                        <Line yAxisId="spend" type="monotone" dataKey="spend" stroke="var(--color-spend)" strokeWidth={2.8} dot={false} />
                      </ComposedChart>
                    </ChartContainer>
                  </div>
                </SectionPanel>

                <SectionPanel title="Watchlist" description="Immediate wholesale and finance priorities.">
                  <div className="space-y-4 p-6">
                    {DISTRIBUTOR_REORDER_SUGGESTIONS.slice(0, 3).map((item) => (
                      <div key={item.sku} className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                        <div className="font-medium text-gray-950">{item.product}</div>
                        <div className="mt-1 text-sm text-gray-500">{item.stockCoverDays} days cover left</div>
                        <div className="mt-3 text-sm text-gray-600">Suggested reorder: {item.suggestedQty} units</div>
                      </div>
                    ))}
                    <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-4 text-sm text-gray-700">
                      {overdueInvoices.length} invoice needs finance attention before the next dispatch cycle gets busy.
                    </div>
                  </div>
                </SectionPanel>
              </div>
            </div>
          )}

          {activeTab === 'wholesale' && (
            <div className="grid gap-6 xl:grid-cols-[1.45fr,0.95fr]">
              <SectionPanel
                title="Wholesale Catalog"
                description="Build a bulk order with partner pricing and MOQ control."
                action={
                  <div className="relative w-full sm:w-72">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search product or category"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-10 py-2.5 text-sm focus:border-amber-300 focus:outline-none"
                    />
                  </div>
                }
              >
                <div className="border-b border-black/5 px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setCategoryFilter(category)}
                        className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
                          categoryFilter === category
                            ? 'border-amber-300 bg-amber-50 text-amber-700'
                            : 'border-black/10 bg-white text-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-[860px] w-full text-left text-sm">
                    <thead className="border-b border-black/5 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Retail</th>
                        <th className="px-6 py-4">Partner</th>
                        <th className="px-6 py-4">MOQ</th>
                        <th className="px-6 py-4">Stock</th>
                        <th className="px-6 py-4 text-right">Order Qty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {filteredProducts.map((product) => {
                        const quantity = draftQuantities[product.id] ?? 0;
                        const margin = Math.round(((product.price - product.distributorPrice) / product.price) * 100);

                        return (
                          <tr key={product.id} className="transition hover:bg-slate-50/80">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <img src={product.image} alt={product.name} className="h-12 w-12 rounded-2xl object-cover" />
                                <div>
                                  <div className="font-medium text-gray-950">{product.name}</div>
                                  <div className="mt-1 text-xs text-gray-500">{product.category}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-500">{formatCurrency(product.price)}</td>
                            <td className="px-6 py-4">
                              <div className="font-semibold text-amber-600">{formatCurrency(product.distributorPrice)}</div>
                              <div className="mt-1 text-xs text-gray-500">{margin}% partner margin</div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{product.minBulkQuantity} units</td>
                            <td className="px-6 py-4 text-gray-600">{product.stock} ready</td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <input
                                  type="number"
                                  min={0}
                                  step={product.minBulkQuantity}
                                  value={quantity}
                                  onChange={(event) => setDraftQuantity(product.id, Number(event.target.value))}
                                  className="w-24 rounded-xl border border-gray-200 px-3 py-2 text-center font-medium focus:border-amber-300 focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => setDraftQuantity(product.id, Math.max(product.minBulkQuantity, quantity || product.minBulkQuantity))}
                                  className="rounded-xl bg-[#F9B303] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#e0a103]"
                                >
                                  Add
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

              <div className="space-y-6">
                <SectionPanel title="Draft Order" description="Live summary of your wholesale build.">
                  <div className="space-y-4 p-6">
                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">Order Summary</div>
                      <div className="mt-3 space-y-2 text-sm text-gray-600">
                        <div className="flex items-center justify-between"><span>Units</span><strong className="text-gray-950">{draftUnits}</strong></div>
                        <div className="flex items-center justify-between"><span>Retail value</span><strong className="text-gray-950">{formatCurrency(retailTotal)}</strong></div>
                        <div className="flex items-center justify-between"><span>Partner total</span><strong className="text-gray-950">{formatCurrency(wholesaleTotal)}</strong></div>
                        <div className="flex items-center justify-between border-t border-black/5 pt-3"><span>Gross savings</span><strong className="text-emerald-600">{formatCurrency(savingsTotal)}</strong></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {draftLines.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-black/10 bg-white p-4 text-sm text-gray-500">
                          Add product quantities to start building the wholesale order.
                        </div>
                      ) : (
                        draftLines.map((product) => (
                          <div key={product.id} className="rounded-2xl border border-black/5 bg-white p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div className="font-medium text-gray-950">{product.name}</div>
                                <div className="mt-1 text-xs text-gray-500">{draftQuantities[product.id]} units</div>
                              </div>
                              <div className="font-semibold text-gray-950">
                                {formatCurrency(product.distributorPrice * (draftQuantities[product.id] ?? 0))}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <Button className="w-full rounded-2xl tracking-[0.18em]">Review Purchase Order</Button>
                  </div>
                </SectionPanel>

                <SectionPanel title="Reorder Suggestions" description="Fast movers worth replenishing this week.">
                  <div className="space-y-4 p-6">
                    {DISTRIBUTOR_REORDER_SUGGESTIONS.map((item) => (
                      <div key={item.sku} className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                        <div className="font-medium text-gray-950">{item.product}</div>
                        <div className="mt-1 text-sm text-gray-500">{item.category}</div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="text-gray-500">{item.stockCoverDays} days cover</span>
                          <span className="font-semibold text-gray-950">{item.suggestedQty} units</span>
                        </div>
                        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
                          {item.monthlyVelocity} units/month velocity
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionPanel>
              </div>
            </div>
          )}

          {activeTab === 'shipments' && selectedShipment && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Moving Now" value={formatNumber(inTransitShipments.length)} delta="Active lanes" description="Shipments not yet completed." icon={Truck} tone="sky" direction="up" bars={[4, 5, 6, 6, 7, 8]} />
                <MetricCard label="Units In Transit" value={formatNumber(shipmentUnits)} delta="Across all open loads" description="Total partner units currently moving." icon={PackageOpen} tone="amber" direction="up" bars={[5, 6, 8, 8, 9, 10]} />
                <MetricCard label="Delivered" value={formatNumber(DISTRIBUTOR_SHIPMENTS.filter((shipment) => shipment.status === 'Delivered').length)} delta="Recent completion" description="Loads already received and signed." icon={PackageCheck} tone="emerald" direction="up" bars={[2, 3, 4, 5, 6, 7]} />
                <MetricCard label="On-Time Lane" value="97%" delta="+2 pts" description="Current dispatch-to-delivery reliability." icon={Sparkles} tone="slate" direction="up" bars={[6, 7, 8, 8, 9, 10]} />
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.42fr,0.98fr]">
                <SectionPanel title="Shipment Queue" description="Open and completed distributor shipments.">
                  <div className="overflow-x-auto">
                    <table className="min-w-[860px] w-full text-left text-sm">
                      <thead className="border-b border-black/5 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                        <tr>
                          <th className="px-6 py-4">Shipment</th>
                          <th className="px-6 py-4">Destination</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Units</th>
                          <th className="px-6 py-4">Value</th>
                          <th className="px-6 py-4 text-right">Open</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {DISTRIBUTOR_SHIPMENTS.map((shipment) => (
                          <tr key={shipment.id} onClick={() => setSelectedShipmentId(shipment.id)} className={`cursor-pointer transition ${selectedShipment.id === shipment.id ? 'bg-amber-50/70' : 'hover:bg-slate-50/80'}`}>
                            <td className="px-6 py-4">
                              <div className="font-semibold text-gray-950">{shipment.id}</div>
                              <div className="mt-1 text-xs text-gray-500">{shipment.poNumber}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{shipment.destination}</td>
                            <td className="px-6 py-4"><StatusPill className={getShipmentStatusClassName(shipment.status)}>{shipment.status}</StatusPill></td>
                            <td className="px-6 py-4 font-semibold text-gray-950">{shipment.units}</td>
                            <td className="px-6 py-4 font-semibold text-gray-950">{formatCurrency(shipment.orderValue)}</td>
                            <td className="px-6 py-4 text-right"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">View</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionPanel>

                <SectionPanel title="Shipment Detail" description={`${selectedShipment.destination} - ${selectedShipment.courier}`} action={<StatusPill className={getShipmentStatusClassName(selectedShipment.status)}>{selectedShipment.status}</StatusPill>}>
                  <div className="space-y-5 p-6">
                    <div className="rounded-[24px] border border-black/5 bg-[linear-gradient(145deg,rgba(255,248,220,0.9),rgba(255,255,255,1))] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Tracking</div>
                          <div className="mt-2 text-2xl font-semibold text-gray-950">{selectedShipment.trackingId}</div>
                          <div className="mt-1 text-sm text-gray-500">ETA {formatDate(selectedShipment.eta)}</div>
                        </div>
                        <Building2 className="h-6 w-6 text-amber-500" />
                      </div>
                      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/80">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400" style={{ width: `${getShipmentProgress(selectedShipment.status)}%` }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl border border-black/5 bg-slate-50 p-4"><div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Warehouse</div><div className="mt-2 font-medium text-gray-950">{selectedShipment.warehouse}</div></div>
                      <div className="rounded-2xl border border-black/5 bg-slate-50 p-4"><div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">Cartons</div><div className="mt-2 font-medium text-gray-950">{selectedShipment.cartons}</div></div>
                    </div>
                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4 text-sm text-gray-600">{selectedShipment.lastUpdate}</div>
                    <div className="space-y-3">
                      {selectedShipment.items.map((item) => (
                        <div key={`${selectedShipment.id}-${item.sku}`} className="rounded-2xl border border-black/5 bg-white p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="font-medium text-gray-950">{item.name}</div>
                              <div className="mt-1 text-xs text-gray-500">{item.sku}</div>
                            </div>
                            <div className="font-semibold text-gray-950">{item.quantity} units</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionPanel>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Available Credit" value={formatCurrency(DISTRIBUTOR_PARTNER_PROFILE.availableCredit)} delta="Healthy headroom" description="Current trade credit available for fresh orders." icon={CreditCard} tone="sky" direction="up" bars={[5, 6, 7, 8, 9, 10]} />
                <MetricCard label="Paid This Cycle" value={formatCurrency(paidInvoicesTotal)} delta="Finance reconciled" description="Invoices already settled in the current cycle." icon={Receipt} tone="emerald" direction="up" bars={[4, 5, 6, 7, 8, 9]} />
                <MetricCard label="Due Soon" value={formatNumber(dueSoonInvoices.length)} delta="Plan cash flow" description="Statements nearing due date." icon={DollarSign} tone="amber" direction="down" bars={[8, 7, 7, 6, 5, 4]} />
                <MetricCard label="Overdue" value={formatNumber(overdueInvoices.length)} delta="Needs action" description="Invoices that need immediate finance follow-up." icon={AlertCircle} tone="slate" direction="down" bars={[7, 6, 6, 5, 4, 4]} />
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.3fr,1.1fr]">
                <SectionPanel title="Spend vs Fill Rate" description="Billing rhythm compared with fulfilment quality.">
                  <div className="p-4 sm:p-6">
                    <ChartContainer className="h-[320px] w-full" config={{ spend: { label: 'Spend', color: '#F9B303' }, fillRate: { label: 'Fill Rate', color: '#111827' } }}>
                      <ComposedChart data={DISTRIBUTOR_PERFORMANCE_SERIES} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis yAxisId="spend" tickLine={false} axisLine={false} width={44} tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`} />
                        <YAxis yAxisId="fillRate" orientation="right" tickLine={false} axisLine={false} width={36} domain={[85, 100]} />
                        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar yAxisId="spend" dataKey="spend" fill="var(--color-spend)" radius={[8, 8, 0, 0]} opacity={0.85} />
                        <Line yAxisId="fillRate" type="monotone" dataKey="fillRate" stroke="var(--color-fillRate)" strokeWidth={2.8} dot={false} />
                      </ComposedChart>
                    </ChartContainer>
                  </div>
                </SectionPanel>

                <SectionPanel title="Invoice Desk" description="Detailed invoice status for the current partner account.">
                  <div className="overflow-x-auto">
                    <table className="min-w-[620px] w-full text-left text-sm">
                      <thead className="border-b border-black/5 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                        <tr>
                          <th className="px-6 py-4">Invoice</th>
                          <th className="px-6 py-4">Due</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {DISTRIBUTOR_INVOICES.map((invoice) => (
                          <tr key={invoice.id} className="transition hover:bg-slate-50/80">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-950">{invoice.id}</div>
                              <div className="mt-1 text-xs text-gray-500">{invoice.orderRef}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{formatDate(invoice.dueOn)}</td>
                            <td className="px-6 py-4 font-semibold text-gray-950">{formatCurrency(invoice.amount)}</td>
                            <td className="px-6 py-4"><StatusPill className={getInvoiceStatusClassName(invoice.status)}>{invoice.status}</StatusPill></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionPanel>
              </div>

              <SectionPanel title="Finance Notes" description="Recent payment context and statement handling.">
                <div className="grid gap-4 p-6 md:grid-cols-3">
                  {DISTRIBUTOR_INVOICES.slice(0, 3).map((invoice) => (
                    <div key={invoice.id} className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                      <div className="font-medium text-gray-950">{invoice.id}</div>
                      <div className="mt-1 text-sm text-gray-500">{invoice.paymentMethod}</div>
                      <div className="mt-3 text-sm leading-6 text-gray-600">{invoice.notes}</div>
                    </div>
                  ))}
                </div>
              </SectionPanel>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};
