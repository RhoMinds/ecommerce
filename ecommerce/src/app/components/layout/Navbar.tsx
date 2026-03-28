import React from 'react';
import { Link, useLocation } from 'react-router';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isDarkBackground = location.pathname === '/'; // Assuming home hero is dark initially

  const navLinks = [
    { name: 'Experience', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Distributor', path: '/distributor' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300 px-6 py-5 md:px-12 flex items-center justify-between",
        isDarkBackground ? "bg-transparent text-white" : "bg-white text-gray-900 border-b border-gray-100"
      )}>
        <Link to="/" className="text-base md:text-xl font-bold tracking-[0.12em] md:tracking-[0.2em] uppercase z-50 relative">
          HUSTLE WRAPS
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10 text-sm tracking-widest uppercase font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="hover:opacity-70 transition-opacity">
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/login" className="hover:opacity-70 transition-opacity">
            <User className="w-5 h-5" />
          </Link>
          <Link to="/cart" className="hover:opacity-70 transition-opacity relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-[#F9B303] text-black font-bold text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden z-50 relative" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white text-gray-900 pt-24 px-6 flex flex-col space-y-8"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-light tracking-widest uppercase border-b border-gray-100 pb-4"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex space-x-8 pt-4">
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 text-lg">
                <User /> <span>Account</span>
              </Link>
              <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 text-lg">
                <ShoppingCart /> <span>Cart (2)</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
