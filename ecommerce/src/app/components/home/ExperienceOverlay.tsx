import React from 'react';
import { useTransform, motion } from 'motion/react';
import { ChevronRight, Settings, Zap, Paintbrush, ShieldCheck, SunMedium, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { MOCK_PRODUCTS } from '../../data/mockData';

export const ExperienceOverlay = ({ scrollYProgress }: { scrollYProgress: any }) => {
  // Hero (0-20%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

  // Vehicle Highlights (20-40%)
  const vehicleOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  
  // Accessories & Engineering (45-75%)
  const engOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);

  // Final CTA (80-100%)
  const ctaOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);

  const topBarOpacity = useTransform(scrollYProgress, [0, 0.03, 0.92, 1], [0, 1, 1, 0]);

  const featured = React.useMemo(() => MOCK_PRODUCTS.slice(0, 3), []);

  return (
    <div className="absolute top-0 left-0 w-full h-[700vh] pointer-events-none">

      {/* Glass Quick Actions */}
      <motion.div className="fixed top-6 right-6 z-[60] pointer-events-auto" style={{ opacity: topBarOpacity }}>
        <div className="rounded-full border border-white/12 bg-white/8 backdrop-blur-xl shadow-[0_12px_50px_rgba(0,0,0,0.45)] px-4 py-3 flex items-center gap-4 text-white">
          <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-gray-200">
            <MapPin className="w-4 h-4 text-[#F9B303]" />
            UAE • India
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/15" />
          <Link
            to="/contact"
            className="text-[10px] tracking-[0.28em] uppercase hover:text-[#F9B303] transition"
          >
            Book Consultation
          </Link>
          <Link
            to="/shop"
            className="text-[10px] tracking-[0.28em] uppercase hover:text-[#F9B303] transition"
          >
            Shop
          </Link>
        </div>
      </motion.div>
      
      {/* 0-20% Hero */}
      <motion.div 
        className="fixed inset-0 flex flex-col items-center justify-center text-white z-10"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[#F9B303]/10 blur-3xl" />
          <div className="absolute -bottom-32 right-0 w-[900px] h-[900px] rounded-full bg-white/5 blur-3xl" />
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-[#F9B303] tracking-[0.4em] text-sm uppercase mb-5 relative"
        >
          Premium Auto Studio
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-5xl md:text-8xl font-light tracking-tighter mb-7 text-center relative"
        >
          HUSTLE WRAPS <br/><span className="font-bold">Automotive</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="text-gray-200 text-sm md:text-base max-w-2xl text-center leading-relaxed px-6 relative"
        >
          Premium <span className="text-white font-semibold">wraps</span>, <span className="text-white font-semibold">tints</span>, and <span className="text-white font-semibold">PPF</span> —
          delivered with clean fitment and a futuristic finish across <span className="text-white font-semibold">UAE</span> and <span className="text-white font-semibold">India</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 w-full max-w-4xl relative"
        >
          {[
            { icon: Paintbrush, title: 'Premium Wraps', desc: 'Gloss, satin, matte, and full color-change builds.' },
            { icon: SunMedium, title: 'Ceramic Tints', desc: 'Heat rejection, clarity, and a refined look.' },
            { icon: ShieldCheck, title: 'PPF Protection', desc: 'Self-healing films that keep paint flawless.' },
          ].map((s) => (
            <div
              key={s.title}
              className="bg-white/8 border border-white/12 backdrop-blur-xl rounded-xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
            >
              <div className="h-10 w-10 rounded-lg bg-white/10 border border-white/12 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-[#F9B303]" />
              </div>
              <div className="text-sm font-semibold tracking-wide">{s.title}</div>
              <div className="text-xs text-gray-200/80 leading-relaxed mt-2">{s.desc}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-9 flex flex-col sm:flex-row gap-4 pointer-events-auto relative"
        >
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium hover:bg-gray-200 transition rounded-full"
          >
            Enter Shop <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-3 border border-white/18 bg-white/6 text-white px-10 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium hover:bg-white/10 transition rounded-full backdrop-blur-xl"
          >
            Our Story <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-4 relative"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-gray-400">Scroll to Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
        </motion.div>
      </motion.div>

      {/* 20-40% Vehicle Features */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-between px-12 md:px-32 text-white z-10"
        style={{ opacity: vehicleOpacity }}
      >
        <div className="max-w-sm text-left">
          <h2 className="text-3xl font-light mb-4 tracking-wide">Crafted<br/><span className="font-bold">Presence</span></h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            From precision finishes to bold stance upgrades — every detail is tuned to elevate the build without overdoing it.
          </p>
          <div className="flex items-center gap-4 text-xs tracking-widest uppercase">
            <span className="flex items-center gap-2"><Settings className="w-4 h-4 text-[#F9B303]"/> Fitment</span>
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#F9B303]"/> Finish</span>
          </div>
        </div>
      </motion.div>

      {/* 45-75% Engineering & Accessories */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-end px-12 md:px-32 text-white z-10"
        style={{ opacity: engOpacity }}
      >
        <div className="max-w-xl bg-white/8 backdrop-blur-xl p-8 border border-white/12 rounded-2xl shadow-[0_18px_70px_rgba(0,0,0,0.45)]">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="text-sm text-[#F9B303] tracking-widest uppercase mb-2">Featured Drops</h3>
              <h2 className="text-2xl mb-3">Build Your Signature</h2>
              <p className="text-gray-400 text-sm mb-6">
                Handpicked upgrades trending this week — high-impact parts with clean, premium fitment.
              </p>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2 border border-white/15 bg-white/6 hover:bg-white/10 transition pointer-events-auto h-fit rounded-full backdrop-blur-xl"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pointer-events-auto">
            {featured.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group block bg-black/20 border border-white/12 rounded-xl overflow-hidden hover:border-white/22 transition"
              >
                <div className="aspect-square bg-black/25 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-4">
                  <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">{p.category}</div>
                  <div className="text-sm text-white font-medium leading-snug overflow-hidden text-ellipsis whitespace-nowrap">
                    {p.name}
                  </div>
                  <div className="mt-2 text-sm text-[#F9B303] font-semibold">${p.price.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="text-xs uppercase tracking-widest text-gray-300">
              Wraps · Tints · PPF · Premium fitment
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white hover:text-gray-200 transition pointer-events-auto"
            >
              Start Shopping <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* 80-100% Transition to Shop */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-10"
        style={{ opacity: ctaOpacity }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">Ready to Upgrade?</h2>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-10 px-6">
            Explore the catalog, add parts to your build, and make it yours — clean, premium, and engineered to last.
          </p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 text-sm uppercase tracking-[0.2em] font-medium hover:bg-gray-200 transition pointer-events-auto"
          >
            Enter Shop <ChevronRight className="w-4 h-4" />
          </Link>
          <div className="mt-6">
            <Link
              to="/distributor"
              className="text-xs uppercase tracking-widest text-gray-300 hover:text-white transition pointer-events-auto"
            >
              Become a Distributor
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  );
};
