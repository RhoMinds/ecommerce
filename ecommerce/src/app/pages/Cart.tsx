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
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl flex-grow px-5 pb-16 pt-24 sm:px-6 md:px-12 md:pt-28">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-3xl font-light tracking-tighter sm:text-4xl md:mb-12 md:text-5xl"
        >
          Your <span className="font-bold">Cart</span>
        </motion.h1>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="mb-6 hidden justify-between border-b border-gray-200 pb-4 text-xs font-semibold uppercase tracking-widest text-gray-400 md:flex">
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
                  key={item.id}
                  className="flex flex-col gap-5 border-b border-gray-100 pb-8 md:flex-row md:items-center md:gap-6"
                >
                  <Link
                    to={`/product/${item.id}`}
                    className="block h-40 w-full flex-shrink-0 cursor-pointer overflow-hidden bg-gray-50 sm:h-44 md:h-32 md:w-24"
                  >
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  </Link>

                  <div className="flex-grow">
                    <Link to={`/product/${item.id}`} className="text-lg font-medium transition hover:text-[#F9B303]">
                      {item.name}
                    </Link>
                    <p className="text-gray-500 text-sm mt-1 mb-4">${item.price.toLocaleString()}</p>
                    <button className="flex items-center gap-1 text-xs uppercase tracking-widest text-red-600 transition hover:text-red-800">
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:gap-8">
                    <div className="flex items-center border border-gray-300">
                      <button className="px-3 py-2 hover:bg-gray-50">-</button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button className="px-3 py-2 hover:bg-gray-50">+</button>
                    </div>
                    <span className="text-left text-lg font-medium md:w-24 md:text-right">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="rounded-sm bg-gray-50 p-6 sm:p-8 lg:sticky lg:top-32">
              <h2 className="mb-6 text-sm font-light uppercase tracking-widest tracking-tight">Order Summary</h2>

              <div className="mb-8 space-y-4 border-b border-gray-200 pb-8 text-sm text-gray-600">
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

              <Link
                to="/checkout"
                className="mb-4 inline-flex h-14 w-full items-center justify-center gap-2 bg-[#F9B303] px-6 text-sm font-medium uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#e0a103] focus:outline-none focus:ring-2 focus:ring-[#F9B303] focus:ring-offset-2 sm:text-base"
              >
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
