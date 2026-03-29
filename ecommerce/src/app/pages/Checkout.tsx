import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const Checkout = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="mx-auto w-full max-w-4xl flex-grow px-5 pb-16 pt-24 sm:px-6 md:px-12 md:pt-28">
        <div className="mb-10 flex flex-wrap items-center gap-3 border-b border-gray-100 pb-6 sm:gap-4 md:mb-12 md:pb-8">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 ${step >= s ? 'text-[#F9B303]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? 'bg-[#F9B303] text-black' : 'bg-gray-100'}`}>
                  {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-sm sm:tracking-widest">
                  {['Shipping', 'Payment', 'Review'][s - 1]}
                </span>
              </div>
              {s < 3 && <div className="hidden h-px w-10 bg-gray-200 sm:block md:w-16" />}
            </React.Fragment>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="bg-gray-50 p-5 sm:p-8 md:p-12"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light tracking-tight mb-8">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <input type="text" placeholder="First Name" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
                <input type="text" placeholder="Last Name" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
                <input type="text" placeholder="Address" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none sm:col-span-2" />
                <input type="text" placeholder="City" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
                <input type="text" placeholder="Postal Code" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
              </div>
              <Button onClick={() => setStep(2)} className="mt-8 w-full sm:w-auto">
                Continue to Payment
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light tracking-tight mb-8">Payment Details</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="border border-gray-300 p-4 focus-within:ring-1 focus-within:ring-[#F9B303] flex items-center gap-4 bg-white">
                  <ShieldCheck className="text-green-600" />
                  <input type="text" placeholder="Card Number" className="w-full focus:outline-none bg-transparent" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  <input type="text" placeholder="MM/YY" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
                  <input type="text" placeholder="CVC" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="w-full sm:w-auto">
                  Review Order
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 py-12 text-center sm:py-16">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 sm:h-24 sm:w-24">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h2 className="mb-4 text-3xl font-light tracking-tight sm:text-4xl">Order Complete</h2>
              <p className="mx-auto mb-8 max-w-md text-gray-500">
                Your order #ORD-1043 has been successfully placed. You will receive a confirmation email shortly.
              </p>
              <Button onClick={() => window.location.href = '/'} className="w-full sm:w-auto">
                Return to Home
              </Button>
            </div>
          )}

        </motion.div>
      </div>

      <Footer />
    </div>
  );
};
