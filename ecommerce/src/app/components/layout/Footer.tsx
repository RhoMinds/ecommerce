import React from 'react';
import { Link } from 'react-router';

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-16 px-6 md:px-12 mt-auto border-t border-[#333333]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link to="/" className="text-xl font-bold tracking-[0.2em] uppercase text-white">
            HUSTLE WRAPS
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
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
          <div className="flex">
            <input type="email" placeholder="Email Address" className="bg-[#111111] text-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9B303] w-full" />
            <button className="bg-[#F9B303] hover:bg-[#e0a103] text-black px-6 py-3 text-sm uppercase tracking-wider font-semibold">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#333333] flex flex-col md:flex-row justify-between items-center text-xs">
        <p>&copy; {new Date().getFullYear()} HUSTLE WRAPS. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};
