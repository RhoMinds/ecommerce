import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Truck, DollarSign, PackageOpen, LayoutDashboard, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const Distributor = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen flex text-gray-900 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center h-24">
          <Link to="/" className="text-xl font-bold tracking-[0.2em] uppercase text-black hover:opacity-70 transition">
            HUSTLE WRAPS <span className="text-xs text-gray-500 font-normal tracking-normal block mt-1">Distributor Portal</span>
          </Link>
        </div>
        
        <div className="flex-grow p-4 space-y-2 mt-4 text-sm font-medium">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'wholesale', label: 'Wholesale Ordering', icon: PackageOpen },
            { id: 'shipments', label: 'Shipments', icon: Truck },
            { id: 'billing', label: 'Billing', icon: DollarSign },
          ].map(tab => (
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
            <p className="font-semibold text-gray-900">TechMotion Autos</p>
            <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"/> Tier 1 Partner
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow md:ml-64 p-8 md:p-12 pb-32 bg-gray-50">
        
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
            <h1 className="text-3xl font-light tracking-tight text-gray-900 capitalize">
              {activeTab === 'wholesale' ? 'Bulk Purchasing' : activeTab}
            </h1>
          </div>
          <Button variant="outline">Contact Account Manager</Button>
        </header>

        <motion.div 
          key={activeTab} 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="bg-black text-[#F9B303] rounded-xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h2 className="text-2xl font-light mb-2 text-white">Welcome back, TechMotion Autos!</h2>
                  <p className="text-gray-400 text-sm max-w-lg">Your current partner tier grants you a standard 30-45% margin on retail pricing based on volume.</p>
                </div>
                <Button variant="secondary" onClick={() => setActiveTab('wholesale')}>Start New Order</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'YTD Spend', value: '$84,200', desc: '12% increase' },
                  { label: 'Active Orders', value: '3', desc: 'Expected delivery: Mar 28' },
                  { label: 'Margin Avg.', value: '38%', desc: 'Tier 1 Target: 40%' },
                  { label: 'Credit Limit', value: '$150k', desc: 'Available: $65k' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                    <div className="text-xs text-gray-500 font-medium tracking-wide uppercase mb-2">{stat.label}</div>
                    <div className="text-3xl font-semibold mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wholesale' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="font-semibold text-lg">Wholesale Catalog</h3>
                  <p className="text-xs text-gray-500 mt-1">Minimum Order Quantities (MOQ) apply.</p>
                </div>
                <div className="flex gap-4">
                  <input type="text" placeholder="Search SKU..." className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#F9B303]" />
                </div>
              </div>

              <table className="w-full text-left text-sm">
                <thead className="bg-white text-gray-500 uppercase tracking-wider font-semibold text-xs border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Retail MSRP</th>
                    <th className="px-6 py-4">Your Price</th>
                    <th className="px-6 py-4">MOQ</th>
                    <th className="px-6 py-4 text-right">Order Qty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_PRODUCTS.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-sm object-cover" />
                        <div>
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-xs text-gray-500 uppercase">{product.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">${product.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-[#F9B303] font-bold text-base">${product.distributorPrice.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{product.minBulkQuantity} units</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <input type="number" defaultValue={0} min={0} step={product.minBulkQuantity} className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#F9B303] text-center font-medium" />
                          <button className="bg-[#F9B303] text-black px-4 py-2 rounded-md hover:bg-[#e0a103] transition">Add</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
                <Button>Review Wholesale Order</Button>
              </div>
            </div>
          )}

          {(activeTab === 'shipments' || activeTab === 'billing') && (
             <div className="bg-white p-12 border border-gray-200 rounded-xl shadow-sm flex items-center justify-center flex-col text-center">
                <div className="w-16 h-16 bg-[#FFF9E6] text-[#F9B303] rounded-full flex items-center justify-center mb-4">
                  {activeTab === 'shipments' ? <Truck className="w-8 h-8"/> : <DollarSign className="w-8 h-8"/>}
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2 capitalize">{activeTab} History</h3>
                <p className="text-gray-500 max-w-sm">Detailed logs and PDF invoices would be generated dynamically here based on order payload.</p>
             </div>
          )}

        </motion.div>
      </main>
    </div>
  );
};
