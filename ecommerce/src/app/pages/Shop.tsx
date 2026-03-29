import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MOCK_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/shop/ProductCard';
import { motion } from 'motion/react';
import { Filter } from 'lucide-react';

export const Shop = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_desc' | 'price_asc'>('recommended');
  const categories = ['All', 'Wheels', 'Exterior', 'Interior'];

  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  const sortedProducts = (() => {
    const products = [...filteredProducts];
    if (sortBy === 'price_desc') return products.sort((a, b) => b.price - a.price);
    if (sortBy === 'price_asc') return products.sort((a, b) => a.price - b.price);
    return products;
  })();

  const displayedProducts = sortedProducts.slice(0, 10);

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 flex flex-col">
      <Navbar />

      {/* Shop Header */}
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-12 sm:px-6 md:px-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-3xl font-light tracking-tighter sm:text-4xl md:text-5xl"
          >
            Engineering <span className="font-bold">Catalog</span>
          </motion.h1>
          <p className="max-w-xl text-sm leading-relaxed text-gray-500">
            Browse our full collection of premium forged wheels, aerodynamic carbon fiber upgrades, and bespoke interior finishes.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col gap-10 px-5 py-10 sm:px-6 md:flex-row md:gap-12 md:px-12 md:py-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="md:sticky md:top-32">
            <div className="mb-5 flex items-center gap-2 border-b border-gray-100 pb-4 text-xs font-semibold uppercase tracking-widest">
              <Filter className="w-4 h-4" /> Filters
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h4 className="mb-4 font-medium text-gray-900">Category</h4>
                <div className="flex flex-wrap gap-2 md:block md:space-y-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-full border px-4 py-2 text-left transition-colors md:block md:w-full md:rounded-none md:border-0 md:px-0 md:py-0 ${
                        activeCategory === cat
                          ? 'border-[#F9B303] bg-[#FFF9E6] text-[#F9B303] font-semibold'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="mb-8 flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <span className="text-gray-500">
              Showing {displayedProducts.length} of {filteredProducts.length} Results
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full cursor-pointer rounded-full border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#F9B303] sm:w-auto"
              aria-label="Sort products"
            >
              <option value="recommended">Sort by: Recommended</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="price_asc">Price: Low to High</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
