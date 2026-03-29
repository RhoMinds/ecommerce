import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'customer'|'distributor'|'admin'>('customer');
  const navigate = useNavigate();

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin') navigate('/admin');
    else if (role === 'distributor') navigate('/distributor');
    else navigate('/shop');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex flex-grow items-center justify-center px-5 py-24 sm:px-6 md:px-12 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md border border-gray-100 bg-gray-50 p-6 sm:p-8 md:p-10"
        >
          <div className="text-center mb-10">
            <h1 className="mb-2 text-sm font-light uppercase tracking-[0.2em] tracking-tighter sm:text-base">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="text-gray-500 text-sm">Access your HUSTLE WRAPS portal</p>
          </div>

          <form onSubmit={handleDemoLogin} className="space-y-6">
            {!isLogin && (
              <input type="text" placeholder="Full Name" required className="w-full border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none text-sm" />
            )}
            <input type="email" placeholder="Email Address" required className="w-full border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none text-sm" />
            <input type="password" placeholder="Password" required className="w-full border border-gray-300 p-4 focus:ring-1 focus:ring-[#F9B303] focus:outline-none text-sm" />

            <div className="mb-4 flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
              <span className="text-gray-500">Demo Role:</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full cursor-pointer border border-gray-300 bg-white px-4 py-3 font-semibold focus:outline-none focus:ring-1 focus:ring-[#F9B303] sm:w-auto sm:border-0 sm:border-b sm:bg-transparent sm:px-0 sm:py-1"
              >
                <option value="customer">Customer</option>
                <option value="distributor">Distributor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <Button type="submit" className="w-full">
              {isLogin ? 'Sign In' : 'Register'}
            </Button>
          </form>

          <div className="mt-8 text-center border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={() => setIsLogin(!isLogin)} className="ml-2 font-semibold text-gray-900 hover:underline">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};
