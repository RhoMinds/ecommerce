import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { motion } from 'motion/react';

export const About = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-light tracking-tighter mb-6"
        >
          About <span className="font-bold">HUSTLE WRAPS</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <p className="text-gray-600 leading-relaxed mb-6">
              We design premium automotive accessories with a focus on fit, finish, and performance.
              Every product is engineered to look factory-perfect while elevating the driving experience.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This project is a UI demo showcasing a modern e-commerce experience, including a cinematic
              homepage, product catalog, checkout flow, and portal-style dashboards.
            </p>
          </div>

          <aside className="bg-gray-50 border border-gray-100 p-8">
            <div className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-4">Focus</div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#F9B303] mt-2" />
                Precision materials & finishes
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#F9B303] mt-2" />
                Clean, minimal interaction design
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#F9B303] mt-2" />
                Fast, responsive layouts
              </li>
            </ul>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};
