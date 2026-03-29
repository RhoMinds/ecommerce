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

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const showLightNav = isOpen || !isDarkBackground;
  const navClassName = cn(
    'fixed top-0 w-full z-50 flex items-center justify-between px-4 py-4 transition-all duration-300 sm:px-6 md:px-12 md:py-5',
    showLightNav
      ? 'bg-white/95 text-gray-900 border-b border-gray-100 shadow-sm backdrop-blur-xl'
      : 'bg-transparent text-white'
  );

  return (
    <>
      <nav className={navClassName}>
        <Link
          to="/"
          className="relative z-50 max-w-[10rem] text-sm font-bold uppercase tracking-[0.14em] sm:max-w-none sm:text-base md:text-xl md:tracking-[0.2em]"
        >
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

        <div className="relative z-50 flex items-center gap-3 md:hidden">
          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/10 bg-black/5"
            aria-label="View cart"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F9B303] text-[10px] font-bold text-black">
              2
            </span>
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/10 bg-black/5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white px-5 pb-8 pt-24 text-gray-900 sm:px-6"
          >
            <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
              <div className="rounded-[28px] border border-gray-100 bg-gray-50/90 p-4 sm:p-5">
                <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Navigate</div>
                <div className="mt-4 flex flex-col">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between border-b border-gray-200 py-4 text-lg font-medium uppercase tracking-[0.18em] last:border-b-0"
                    >
                      <span>{link.name}</span>
                      <span className="text-xs text-gray-400">Open</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-gray-200 px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition hover:border-black"
                >
                  <User className="h-4 w-4" /> Account
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#F9B303] px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#e0a103]"
                >
                  <ShoppingCart className="h-4 w-4" /> Cart (2)
                </Link>
              </div>

              <div className="rounded-[28px] border border-gray-100 p-5">
                <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Quick Help</div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Browse premium upgrades, manage your account, or jump into the admin and distributor portals from one menu.
                </p>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 inline-flex text-sm font-semibold uppercase tracking-[0.2em] text-black underline underline-offset-4"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
