import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const Checkout = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-16 px-6 md:px-12 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-8">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 ${step >= s ? 'text-[#F9B303]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? 'bg-[#F9B303] text-black' : 'bg-gray-100'}`}>
                  {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                <span className="text-sm font-semibold uppercase tracking-widest">{['Shipping', 'Payment', 'Review'][s-1]}</span>
              </div>
              {s < 3 && <div className="w-16 h-px bg-gray-200" />}
            </React.Fragment>
          ))}
        </div>

        <motion.div 
          key={step} 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} 
          className="bg-gray-50 p-8 md:p-12"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light tracking-tight mb-8">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
                <input type="text" placeholder="Last Name" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
                <input type="text" placeholder="Address" className="col-span-2 border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
                <input type="text" placeholder="City" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
                <input type="text" placeholder="Postal Code" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
              </div>
              <Button onClick={() => setStep(2)} className="mt-8">Continue to Payment</Button>
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
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" placeholder="MM/YY" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
                  <input type="text" placeholder="CVC" className="border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none" />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Review Order</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center py-16">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-light tracking-tight mb-4">Order Complete</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">Your order #ORD-1043 has been successfully placed. You will receive a confirmation email shortly.</p>
              <Button onClick={() => window.location.href = '/'}>Return to Home</Button>
            </div>
          )}

        </motion.div>
      </div>

      <Footer />
    </div>
  );
};
