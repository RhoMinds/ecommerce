import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Cart = () => {
  const cartItems = MOCK_PRODUCTS.slice(0, 2).map(p => ({ ...p, quantity: 1 }));
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-light tracking-tighter mb-12"
        >
          Your <span className="font-bold">Cart</span>
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="border-b border-gray-200 pb-4 flex justify-between text-xs tracking-widest uppercase text-gray-400 font-semibold mb-6">
              <span>Product</span>
              <div className="flex gap-16">
                <span>Quantity</span>
                <span>Total</span>
              </div>
            </div>

            <div className="space-y-8">
              {cartItems.map((item) => (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  key={item.id} className="flex gap-6 items-center border-b border-gray-100 pb-8"
                >
                  <Link to={`/product/${item.id}`} className="w-24 h-32 bg-gray-50 flex-shrink-0 cursor-pointer block overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                  </Link>
                  
                  <div className="flex-grow">
                    <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-[#F9B303] transition">{item.name}</Link>
                    <p className="text-gray-500 text-sm mt-1 mb-4">${item.price.toLocaleString()}</p>
                    <button className="text-xs uppercase tracking-widest text-red-600 flex items-center gap-1 hover:text-red-800 transition">
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>

                  <div className="flex gap-12 items-center">
                    <div className="border border-gray-300 flex items-center">
                      <button className="px-3 py-2 hover:bg-gray-50">-</button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button className="px-3 py-2 hover:bg-gray-50">+</button>
                    </div>
                    <span className="text-lg font-medium w-24 text-right">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-8 rounded-sm sticky top-32">
              <h2 className="text-xl font-light tracking-tight mb-6 uppercase tracking-widest text-sm">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-gray-600 mb-8 border-b border-gray-200 pb-8">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-gray-900 font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-medium mb-8">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="w-full mb-4 inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#F9B303] focus:ring-offset-2 bg-[#F9B303] text-black hover:bg-[#e0a103] h-14 px-10 text-base tracking-widest uppercase gap-2">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-2">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};
