import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';

export const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-grow px-5 pb-20 pt-24 sm:px-6 md:px-12 md:pt-28">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-3xl font-light tracking-tighter sm:text-4xl md:text-5xl"
        >
          Contact <span className="font-bold">Us</span>
        </motion.h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          <div className="md:col-span-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStatus('sent');
              }}
              className="space-y-5 border border-gray-100 bg-gray-50 p-5 sm:p-8 md:p-10"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <input
                  required
                  type="text"
                  placeholder="Name"
                  className="border border-gray-300 bg-white p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9B303]"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 bg-white p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9B303]"
                />
              </div>

              <input
                type="text"
                placeholder="Subject (optional)"
                className="w-full border border-gray-300 bg-white p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9B303]"
              />

              <textarea
                required
                placeholder="Message"
                rows={6}
                className="w-full resize-none border border-gray-300 bg-white p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9B303]"
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">Demo form - no email is sent.</p>
                <Button type="submit" className="w-full sm:w-auto">
                  {status === 'sent' ? 'Message Sent' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="border border-gray-200 bg-white p-6 sm:p-8">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Support
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-gray-600">support@example.com</p>
                <div className="my-4 h-px bg-gray-100" />
                <p className="font-medium text-gray-900">Business Hours</p>
                <p className="text-gray-600">Mon-Fri, 10:00-18:00</p>
              </div>
            </div>

            <div className="bg-black p-6 text-white sm:p-8">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Partners
              </div>
              <p className="text-sm leading-relaxed text-gray-300">
                For distributor inquiries, visit the Distributor portal or request a callback via
                this form.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};
