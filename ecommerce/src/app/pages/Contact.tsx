import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';

export const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-light tracking-tighter mb-6"
        >
          Contact <span className="font-bold">Us</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStatus('sent');
              }}
              className="bg-gray-50 border border-gray-100 p-8 md:p-10 space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  required
                  type="text"
                  placeholder="Name"
                  className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none text-sm bg-white"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none text-sm bg-white"
                />
              </div>
              <input
                type="text"
                placeholder="Subject (optional)"
                className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none text-sm bg-white w-full"
              />
              <textarea
                required
                placeholder="Message"
                rows={6}
                className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none text-sm bg-white w-full resize-none"
              />

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-gray-500">
                  Demo form — no email is sent.
                </p>
                <Button type="submit">
                  {status === 'sent' ? 'Message Sent' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="bg-white border border-gray-200 p-8">
              <div className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-4">Support</div>
              <div className="text-sm text-gray-700 space-y-2">
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-gray-600">support@example.com</p>
                <div className="h-px bg-gray-100 my-4" />
                <p className="font-medium text-gray-900">Business Hours</p>
                <p className="text-gray-600">Mon–Fri, 10:00–18:00</p>
              </div>
            </div>

            <div className="bg-black text-white p-8">
              <div className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-4">Partners</div>
              <p className="text-sm text-gray-300 leading-relaxed">
                For distributor inquiries, visit the Distributor portal or request a callback via this form.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

