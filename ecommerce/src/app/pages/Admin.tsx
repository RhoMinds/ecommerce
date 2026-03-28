import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '../data/mockData';
import { BarChart as BarChartIcon, Package, Users, ShoppingCart, TrendingUp, ArrowLeft, FileText, Tags, Warehouse as WarehouseIcon } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../components/ui/chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ADMIN_CATEGORIES,
  ADMIN_CATEGORY_SPLIT,
  ADMIN_CHANNEL_PERFORMANCE,
  ADMIN_REPORT_SERIES,
  ADMIN_WAREHOUSE_ITEMS,
  ADMIN_WAREHOUSE_STOCK_BY_WAREHOUSE,
  ADMIN_WAREHOUSES,
} from '../data/adminConsoleMockData';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const [categories, setCategories] = useState(ADMIN_CATEGORIES);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [newCategoryStatus, setNewCategoryStatus] = useState<'Active' | 'Hidden'>('Active');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(ADMIN_WAREHOUSES[0]?.id ?? '');

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChartIcon },
    { id: 'categories', label: 'Category', icon: Tags },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'warehouse', label: 'Warehouse', icon: WarehouseIcon },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center h-24">
          <Link to="/" className="text-xl font-bold tracking-[0.2em] uppercase text-black hover:opacity-70 transition">
            HUSTLE WRAPS <span className="text-xs text-gray-500 font-normal tracking-normal block mt-1">Admin Console</span>
          </Link>
        </div>
        
        <div className="flex-grow p-4 space-y-2 mt-4 text-sm font-medium">
          <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6 px-4">Console</div>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-[#FFF9E6] text-[#F9B303]' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#F9B303]' : 'text-gray-400'}`} />
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-100 mt-auto">
          <div className="px-4 py-3 text-sm text-gray-600">
            <p className="font-semibold text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F9B303] inline-block" /> System Operator
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow md:ml-64 p-8 md:p-12 pb-32">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
              className="h-10 w-10 inline-flex items-center justify-center rounded-md bg-transparent hover:bg-gray-100 transition"
              aria-label="Go back"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </button>
            <h1 className="text-3xl font-light tracking-tight text-gray-900">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Last updated: Just now</span>
          </div>
        </header>

        <motion.div 
          key={activeTab} 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Revenue', value: '$124,500', trend: '+14%', color: 'text-green-600' },
                  { label: 'Active Orders', value: '42', trend: '+5%', color: 'text-green-600' },
                  { label: 'Pending Approvals', value: '7', trend: '-2%', color: 'text-red-600' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="text-sm text-gray-500 font-medium tracking-wide uppercase mb-2">{stat.label}</div>
                    <div className="flex items-end gap-3">
                      <div className="text-3xl font-semibold">{stat.value}</div>
                      <div className={`text-sm font-medium flex items-center gap-1 mb-1 ${stat.color}`}>
                        <TrendingUp className="w-4 h-4" /> {stat.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mt-8">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Recent Orders</h3>
                  <button className="text-black text-sm font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold text-xs border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {MOCK_ORDERS.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 text-gray-600">{order.customerName}</td>
                          <td className="px-6 py-4 text-gray-500">{order.date}</td>
                          <td className="px-6 py-4">
                            <Badge variant={order.status === 'Delivered' ? 'success' : order.status === 'Pending' ? 'warning' : 'default'}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right font-medium">${order.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (() => {
            const latest = ADMIN_REPORT_SERIES[ADMIN_REPORT_SERIES.length - 1];
            const prev = ADMIN_REPORT_SERIES[ADMIN_REPORT_SERIES.length - 2];
            const pct = (next: number, base: number) =>
              base === 0 ? 0 : Math.round(((next - base) / base) * 100);

            const revenueChange = pct(latest.revenue, prev.revenue);
            const ordersChange = pct(latest.orders, prev.orders);
            const customersChange = pct(latest.customers, prev.customers);
            const refundsChange = pct(latest.refunds, prev.refunds);

            const trendColor = (v: number) => (v >= 0 ? 'text-green-600' : 'text-red-600');

            return (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Revenue (Monthly)', value: `$${latest.revenue.toLocaleString()}`, change: revenueChange },
                    { label: 'Orders (Monthly)', value: latest.orders.toLocaleString(), change: ordersChange },
                    { label: 'Customers (Monthly)', value: latest.customers.toLocaleString(), change: customersChange },
                    { label: 'Refunds (Monthly)', value: `$${latest.refunds.toLocaleString()}`, change: refundsChange },
                  ].map((kpi) => (
                    <div key={kpi.label} className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                      <div className="text-xs text-gray-500 font-medium tracking-wide uppercase mb-2">{kpi.label}</div>
                      <div className="flex items-end justify-between gap-3">
                        <div className="text-3xl font-semibold">{kpi.value}</div>
                        <div className={`text-sm font-medium flex items-center gap-1 mb-1 ${trendColor(kpi.change)}`}>
                          <TrendingUp className="w-4 h-4" />
                          {kpi.change >= 0 ? '+' : ''}{kpi.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">Revenue & Orders</h3>
                        <p className="text-xs text-gray-500 mt-1">Last 12 months performance snapshot.</p>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest">Monthly</div>
                    </div>
                    <div className="p-6">
                      <ChartContainer
                        className="h-[340px] w-full"
                        config={{
                          revenue: { label: 'Revenue', color: '#F9B303' },
                          orders: { label: 'Orders', color: '#111827' },
                        }}
                      >
                        <ComposedChart data={ADMIN_REPORT_SERIES} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                          <CartesianGrid vertical={false} strokeDasharray="3 3" />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} width={40} />
                          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Bar dataKey="orders" fill="var(--color-orders)" opacity={0.2} radius={[6, 6, 0, 0]} />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="var(--color-revenue)"
                            strokeWidth={2.5}
                            dot={false}
                          />
                        </ComposedChart>
                      </ChartContainer>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="font-semibold text-lg">Category Split</h3>
                      <p className="text-xs text-gray-500 mt-1">Share of revenue by category.</p>
                    </div>
                    <div className="p-6">
                      <ChartContainer
                        className="h-[340px] w-full"
                        config={{
                          Wheels: { label: 'Wheels', color: '#F9B303' },
                          Exterior: { label: 'Exterior', color: '#111827' },
                          Interior: { label: 'Interior', color: '#6B7280' },
                        }}
                      >
                        <PieChart>
                          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                          <Pie
                            data={ADMIN_CATEGORY_SPLIT}
                            dataKey="share"
                            nameKey="category"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={3}
                          >
                            {ADMIN_CATEGORY_SPLIT.map((entry) => {
                              const key = entry.category as 'Wheels' | 'Exterior' | 'Interior';
                              const color =
                                key === 'Wheels'
                                  ? 'var(--color-Wheels)'
                                  : key === 'Exterior'
                                    ? 'var(--color-Exterior)'
                                    : 'var(--color-Interior)';
                              return <Cell key={entry.category} fill={color} />;
                            })}
                          </Pie>
                        </PieChart>
                      </ChartContainer>
                      <div className="mt-4 space-y-2 text-sm">
                        {ADMIN_CATEGORY_SPLIT.map((c) => (
                          <div key={c.category} className="flex items-center justify-between text-gray-700">
                            <span className="font-medium">{c.category}</span>
                            <span className="text-gray-500">{c.share}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Channel Performance</h3>
                      <p className="text-xs text-gray-500 mt-1">Revenue and orders by channel.</p>
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest">YTD</div>
                  </div>
                  <div className="p-6">
                    <ChartContainer
                      className="h-[320px] w-full"
                      config={{
                        revenue: { label: 'Revenue', color: '#F9B303' },
                        orders: { label: 'Orders', color: '#111827' },
                      }}
                    >
                      <BarChart data={ADMIN_CHANNEL_PERFORMANCE} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="channel" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} width={48} />
                        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="orders" fill="var(--color-orders)" opacity={0.25} radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </div>
              </div>
            );
          })()}

          {activeTab === 'inventory' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-lg">Product Inventory</h3>
                <button className="bg-[#F9B303] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e0a103]">Add Product</button>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold text-xs border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                      {MOCK_PRODUCTS.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 text-gray-500">${product.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${product.stock < 15 ? 'text-red-600' : 'text-green-600'}`}>{product.stock} units</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-black font-medium hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-fit">
                <div className="mb-6">
                  <h3 className="font-semibold text-lg">Add Category</h3>
                  <p className="text-xs text-gray-500 mt-1">Create a new catalog grouping for products.</p>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const name = newCategoryName.trim();
                    if (!name) return;
                    const slug = slugify(name);
                    setCategories((prev) => [
                      {
                        id: `cat-${Date.now()}`,
                        name,
                        slug,
                        description: newCategoryDescription.trim() || '—',
                        status: newCategoryStatus,
                        productCount: 0,
                        updatedAt: new Date().toISOString().slice(0, 10),
                      },
                      ...prev,
                    ]);
                    setNewCategoryName('');
                    setNewCategoryDescription('');
                    setNewCategoryStatus('Active');
                  }}
                >
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Name</label>
                    <input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9B303]"
                      placeholder="e.g., Wheels"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Description</label>
                    <textarea
                      value={newCategoryDescription}
                      onChange={(e) => setNewCategoryDescription(e.target.value)}
                      className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9B303] resize-none"
                      rows={4}
                      placeholder="Short description for the storefront."
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Status</label>
                    <select
                      value={newCategoryStatus}
                      onChange={(e) => setNewCategoryStatus(e.target.value as any)}
                      className="w-full border border-gray-300 p-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#F9B303]"
                    >
                      <option value="Active">Active</option>
                      <option value="Hidden">Hidden</option>
                    </select>
                  </div>

                  <Button type="submit" className="w-full">Create Category</Button>
                </form>
              </div>

              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Categories</h3>
                    <p className="text-xs text-gray-500 mt-1">Manage storefront groupings and visibility.</p>
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">{categories.length} total</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold text-xs border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Slug</th>
                        <th className="px-6 py-4">Products</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Updated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {categories.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{c.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{c.description}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-mono text-xs">/{c.slug}</td>
                          <td className="px-6 py-4 text-gray-600">{c.productCount}</td>
                          <td className="px-6 py-4">
                            <Badge variant={c.status === 'Active' ? 'success' : 'warning'}>
                              {c.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right text-gray-500">{c.updatedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'warehouse' && (() => {
            const selectedStock = ADMIN_WAREHOUSE_STOCK_BY_WAREHOUSE[selectedWarehouseId] ?? {};
            const selectedWarehouse = ADMIN_WAREHOUSES.find((w) => w.id === selectedWarehouseId) ?? ADMIN_WAREHOUSES[0];

            const stockRows = ADMIN_WAREHOUSE_ITEMS.map((item) => {
              const onHand = selectedStock[item.sku] ?? 0;
              const isLow = onHand < item.reorderPoint;
              return { ...item, onHand, isLow };
            }).sort((a, b) => (a.isLow === b.isLow ? b.onHand - a.onHand : a.isLow ? -1 : 1));

            return (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ADMIN_WAREHOUSES.map((w) => {
                    const pctUsed = Math.round((w.usedUnits / w.capacityUnits) * 100);
                    const isSelected = w.id === selectedWarehouseId;
                    return (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setSelectedWarehouseId(w.id)}
                        className={`text-left bg-white border rounded-xl shadow-sm p-6 transition ${isSelected ? 'border-black' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">Warehouse</div>
                            <div className="text-lg font-semibold text-gray-900">{w.name}</div>
                            <div className="text-sm text-gray-500">{w.city}, {w.region}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-400 uppercase tracking-widest">Used</div>
                            <div className="text-lg font-semibold">{pctUsed}%</div>
                          </div>
                        </div>

                        <div className="mt-5">
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#F9B303]" style={{ width: `${pctUsed}%` }} />
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                            <span>{w.usedUnits.toLocaleString()} / {w.capacityUnits.toLocaleString()} units</span>
                            <span>Manager: {w.manager}</span>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                            <span>Inbound today: <span className="font-semibold text-gray-900">{w.inboundToday}</span></span>
                            <span>Outbound today: <span className="font-semibold text-gray-900">{w.outboundToday}</span></span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Warehouse Stock</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedWarehouse ? `${selectedWarehouse.name} · ${selectedWarehouse.city}, ${selectedWarehouse.region}` : 'Select a warehouse'}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest">{stockRows.length} SKUs</div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold text-xs border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4">SKU</th>
                          <th className="px-6 py-4">Item</th>
                          <th className="px-6 py-4">Category</th>
                          <th className="px-6 py-4 text-right">On Hand</th>
                          <th className="px-6 py-4 text-right">Reorder</th>
                          <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {stockRows.map((row) => (
                          <tr key={row.sku} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-mono text-xs text-gray-600">{row.sku}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                            <td className="px-6 py-4 text-gray-600">{row.category}</td>
                            <td className="px-6 py-4 text-right font-semibold">{row.onHand}</td>
                            <td className="px-6 py-4 text-right text-gray-600">{row.reorderPoint}</td>
                            <td className="px-6 py-4 text-right">
                              <Badge variant={row.isLow ? 'warning' : 'success'}>
                                {row.isLow ? 'Low' : 'OK'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })()}
          
          {(activeTab === 'orders' || activeTab === 'users') && (
             <div className="bg-white p-12 border border-gray-200 rounded-xl shadow-sm flex items-center justify-center flex-col text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  {activeTab === 'orders' ? <ShoppingCart className="w-8 h-8"/> : <Users className="w-8 h-8"/>}
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2 capitalize">{activeTab} Management</h3>
                <p className="text-gray-500 max-w-sm">This module allows you to fully view, edit, and control {activeTab}. Full data table mock hidden for brevity.</p>
             </div>
          )}

        </motion.div>
      </main>
    </div>
  );
};
