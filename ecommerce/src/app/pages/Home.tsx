import React, { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { Link } from 'react-router';
import { ArrowUpRight, ChevronRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PremiumExperienceOverlay } from '../components/home/PremiumExperienceOverlay';
import { useIsMobile } from '../components/ui/use-mobile';
import { MOCK_PRODUCTS } from '../data/mockData';

const standards = [
  {
    icon: Compass,
    title: 'Tailored Direction',
    desc: 'We guide the wrap, tint, or PPF choice around the car, climate, and finish you want.',
  },
  {
    icon: Sparkles,
    title: 'Precision Finish',
    desc: 'Every seam, edge, and visible surface is treated like part of the final presentation.',
  },
  {
    icon: ShieldCheck,
    title: 'Protection First',
    desc: 'From visual impact to long-term defense, the finish is built to hold up beautifully.',
  },
];

export const Home = () => {
  const storyRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });

  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);
  const mobileHeroImage =
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&h=1400&q=80';

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {isMobile ? (
        <section className="relative min-h-[112svh] overflow-hidden bg-black px-5 pb-16 pt-28 text-white sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 1.06, y: 18 }}
            animate={{ opacity: 0.96, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-[-24%] top-0 w-[104%]"
          >
            <motion.img
              src={mobileHeroImage}
              alt="Black sports car"
              className="h-full w-full object-cover object-[68%_center]"
              animate={{ scale: [1, 1.04, 1], y: [0, -12, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r from-black via-black/88 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,179,3,0.2),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.68)_38%,rgba(0,0,0,0.92)_72%,#000_100%),linear-gradient(90deg,#000_0%,rgba(0,0,0,0.88)_26%,rgba(0,0,0,0.34)_62%,rgba(0,0,0,0.86)_100%)]" />
          <div className="absolute right-[-18%] top-16 h-56 w-56 rounded-full bg-[#F9B303]/16 blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent" />

          <div className="relative mx-auto flex min-h-[calc(112svh-7rem)] max-w-6xl flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative max-w-[20rem] pt-4"
            >
              <div className="pointer-events-none absolute -left-1 top-6 text-[5.4rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.05]">
                01
              </div>
              <div className="inline-flex items-center rounded-full border border-white/12 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-[#F9B303] backdrop-blur">
                Premium Vehicle Surface Studio
              </div>
              <h1 className="mt-5 text-[3.05rem] font-semibold leading-[0.9] tracking-[-0.075em] text-white">
                Premium wraps,
                <br />
                tints, and PPF
                <br />
                for standout builds.
              </h1>
              <p className="mt-5 max-w-[18rem] text-sm leading-7 text-white/72">
                A sharper mobile landing experience with the black sports car living in the background, not boxed off from the story.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#F9B303] px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Book Consultation <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/16 bg-black/32 px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-[#F9B303] hover:text-[#F9B303]"
                >
                  Browse Products <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="relative z-10 grid grid-cols-1 gap-4"
            >
              {standards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-white/10 bg-black/34 p-5 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.34)]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F9B303] text-black">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-base font-semibold text-white">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-white/68">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      ) : (
        <div ref={storyRef} className="relative h-[330vh] bg-black md:h-[390vh]">
          <PremiumExperienceOverlay scrollYProgress={scrollYProgress} />
        </div>
      )}

      <section className="relative z-20 overflow-hidden bg-black px-5 py-16 text-white sm:px-6 md:px-12 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,179,3,0.08),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="rounded-[30px] border border-white/12 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6 md:rounded-[34px] md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="text-[10px] uppercase tracking-[0.34em] text-[#F9B303]">
                  Consultation First
                </div>
                <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-3xl md:text-4xl">
                  Premium advice before premium installation.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  The scrollytelling now feels smoother and more futuristic, while the next section
                  keeps the path simple: consultation, service choice, and product exploration.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#F9B303] px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:-translate-y-0.5 hover:bg-[#FFFFFF] sm:w-auto sm:min-w-[220px]"
                >
                  Book Consultation <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/16 bg-white/[0.05] px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:border-[#F9B303] hover:text-[#F9B303] sm:w-auto sm:min-w-[220px]"
                >
                  Browse Products <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {standards.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/12 bg-white/[0.04] p-8 backdrop-blur-xl"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F9B303] text-black">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="text-lg font-semibold text-white">{item.title}</div>
                <p className="mt-3 text-sm leading-6 text-white/68">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-20 bg-black px-6 py-24 text-white md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="text-sm uppercase tracking-[0.24em] text-[#F9B303]">
                Featured Catalog
              </div>
              <h3 className="mt-5 text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-4xl md:text-6xl">
                Curated upgrades to pair with your build.
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/68 md:text-base">
                The homepage keeps the palette strict and the presentation premium while still
                giving users a clear way into the catalog.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 self-start border-b border-[#F9B303] pb-1 text-sm uppercase tracking-[0.22em] text-[#F9B303] transition-opacity hover:opacity-70"
            >
              View Full Shop <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.04] backdrop-blur-xl transition hover:border-[#F9B303]/40"
              >
                <div className="aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[#F9B303]">
                    {product.category}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">{product.name}</div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm font-semibold text-[#F9B303]">
                      ${product.price.toLocaleString()}
                    </div>
                    <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-white/68">
                      View <ArrowUpRight className="h-3.5 w-3.5 text-[#F9B303]" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
