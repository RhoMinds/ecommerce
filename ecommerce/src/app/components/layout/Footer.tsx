import React from 'react';
import { Link } from 'react-router';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[#333333] bg-black px-5 py-14 text-gray-400 sm:px-6 md:px-12 md:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4 md:gap-12">
        <div className="space-y-4">
          <Link to="/" className="text-lg font-bold uppercase tracking-[0.18em] text-white md:text-xl md:tracking-[0.2em]">
            HUSTLE WRAPS
          </Link>
          <p className="max-w-xs text-sm leading-relaxed">
            Premium automotive accessories and performance upgrades engineered for excellence.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">Shop</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/shop?category=wheels" className="hover:text-white transition">Alloy Wheels</Link></li>
            <li><Link to="/shop?category=exterior" className="hover:text-white transition">Exterior Upgrades</Link></li>
            <li><Link to="/shop?category=interior" className="hover:text-white transition">Interior Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">Support</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link to="/distributor" className="hover:text-white transition">Become a Distributor</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition">Shipping Policy</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe for updates on new engineering releases.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-[#111111] px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#F9B303]"
            />
            <button className="bg-[#F9B303] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-black transition hover:bg-[#e0a103] sm:flex-shrink-0">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-[#333333] pt-8 text-xs md:mt-16 md:flex-row md:items-center">
        <p>&copy; {new Date().getFullYear()} HUSTLE WRAPS. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 md:gap-6">
          <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};
