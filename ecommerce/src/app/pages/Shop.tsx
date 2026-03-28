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
    <div className="bg-white min-h-screen flex flex-col pt-24">
      <Navbar />
      
      {/* Shop Header */}
      <div className="bg-gray-50 py-16 px-6 md:px-12 border-b border-gray-100">
        <div className="w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-5xl font-light tracking-tighter mb-4"
          >
            Engineering <span className="font-bold">Catalog</span>
          </motion.h1>
          <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
            Browse our full collection of premium forged wheels, aerodynamic carbon fiber upgrades, and bespoke interior finishes.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow w-full px-6 md:px-12 py-12 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-32">
            <div className="flex items-center gap-2 mb-6 text-xs uppercase tracking-widest font-semibold border-b border-gray-100 pb-4">
              <Filter className="w-4 h-4" /> Filters
            </div>
            
            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Category</h4>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`block w-full text-left transition-colors ${activeCategory === cat ? 'text-[#F9B303] font-semibold' : 'text-gray-500 hover:text-black'}`}
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
          <div className="flex justify-between items-center mb-8 text-sm">
            <span className="text-gray-500">
              Showing {displayedProducts.length} of {filteredProducts.length} Results
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border-none bg-transparent text-gray-900 font-medium focus:ring-0 cursor-pointer"
              aria-label="Sort products"
            >
              <option value="recommended">Sort by: Recommended</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="price_asc">Price: Low to High</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 xl:gap-10">
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
