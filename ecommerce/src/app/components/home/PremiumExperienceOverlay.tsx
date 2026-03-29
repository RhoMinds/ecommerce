import React from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useTransform } from 'motion/react';
import {
  ChevronRight,
  MapPin,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  SunMedium,
} from 'lucide-react';
import { Link } from 'react-router';

const services = [
  {
    icon: Paintbrush,
    title: 'Premium Wraps',
    desc: 'Color-change, satin, gloss, stealth, and bespoke finishes for standout builds.',
  },
  {
    icon: SunMedium,
    title: 'Ceramic Tints',
    desc: 'Heat rejection, clarity, privacy, and a cleaner premium glass finish.',
  },
  {
    icon: ShieldCheck,
    title: 'PPF Protection',
    desc: 'Self-healing coverage that protects paintwork without changing the look.',
  },
];

type Stage = 'hero' | 'craft' | 'cta';

const stageEase = [0.22, 1, 0.36, 1] as const;

const getStage = (progress: number): Stage => {
  if (progress < 0.34) return 'hero';
  if (progress < 0.72) return 'craft';
  return 'cta';
};

const stageMotion = {
  initial: { opacity: 0, y: 28, filter: 'blur(12px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -24, filter: 'blur(12px)' },
  transition: { duration: 0.6, ease: stageEase },
};

const cardMotion = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.55, ease: stageEase },
};

export const PremiumExperienceOverlay = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.35, 0.7, 0.45]);

  const initialProgress =
    typeof scrollYProgress?.get === 'function' ? Number(scrollYProgress.get()) : 0;
  const [stage, setStage] = React.useState<Stage>(getStage(initialProgress));

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextStage = getStage(Number(latest));
    setStage((current) => (current === nextStage ? current : nextStage));
  });

  return (
    <div className="sticky top-0 h-screen overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80')",
          scale: backgroundScale,
          y: backgroundY,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:72px_72px]"
        animate={{ backgroundPosition: ['0px 0px', '72px 72px'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,179,3,0.18),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.88))]" />

      <motion.div
        className="absolute left-[12%] top-[18%] h-44 w-44 rounded-full border border-[#F9B303]/25"
        animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[12%] top-[18%] h-44 w-44 rounded-full border border-white/10"
        animate={{ scale: [1.18, 1.35, 1.18], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      <motion.div
        className="absolute right-[10%] top-[20%] h-72 w-72 rounded-full bg-[#F9B303]/12 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.22, 0.36, 0.22] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-[16%] h-px w-[min(72vw,980px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#F9B303]/75 to-transparent"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 pt-24 md:px-12">
        <motion.div
          style={{ opacity: frameOpacity }}
          className="absolute inset-x-6 top-24 bottom-10 rounded-[36px] border border-white/10 md:inset-x-12"
        />

        <AnimatePresence mode="wait">
          {stage === 'hero' && (
            <motion.div
              key="hero"
              {...stageMotion}
              className="relative z-10 grid w-full items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16"
            >
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: stageEase, delay: 0.08 }}
                className="relative max-w-3xl"
              >
                <div className="pointer-events-none absolute -left-4 top-16 text-[clamp(5rem,14vw,12rem)] font-semibold leading-none tracking-[-0.08em] text-white/[0.06]">
                  01
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-white backdrop-blur-xl">
                  <MapPin className="h-4 w-4 text-[#F9B303]" />
                  UAE / India
                </div>

                <p className="mt-6 text-[10px] uppercase tracking-[0.42em] text-[#F9B303] md:text-xs">
                  Premium Vehicle Surface Studio
                </p>

                <h1 className="mt-4 text-5xl font-semibold leading-[0.88] tracking-[-0.08em] text-white sm:text-6xl md:text-7xl xl:text-[7.2rem]">
                  Premium
                  <br />
                  wraps, tints
                  <br />
                  and <span className="text-[#F9B303]">PPF.</span>
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-white/72 md:text-base">
                  Hustle Wraps blends premium styling, surface protection, and sharp detailing into
                  one luxury-first experience with a modern, high-precision finish.
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.28em] text-white/90">
                  {['Luxury cars', 'Daily builds', 'Custom finishes'].map((item) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: stageEase }}
                      className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 backdrop-blur-xl"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full bg-[#F9B303] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black shadow-[0_0_36px_rgba(249,179,3,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFFFFF]"
                  >
                    Book Consultation <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/shop"
                    className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full border border-white/16 bg-black/45 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#F9B303] hover:text-[#F9B303]"
                  >
                    Browse Products <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3 lg:hidden">
                  {services.map((service) => (
                    <div
                      key={service.title}
                      className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F9B303] text-black">
                        <service.icon className="h-5 w-5" />
                      </div>
                      <div className="mt-4 text-sm font-semibold text-white">{service.title}</div>
                      <p className="mt-2 text-xs leading-5 text-white/68">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: stageEase, delay: 0.16 }}
                className="relative hidden rounded-[36px] border border-white/12 bg-black/48 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl lg:block lg:p-7"
              >
                <motion.div
                  className="absolute inset-0 rounded-[36px] border border-[#F9B303]/12"
                  animate={{ opacity: [0.35, 0.8, 0.35] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-[0.34em] text-[#F9B303]">
                    Signature Studio
                  </div>
                  <Sparkles className="h-4 w-4 text-white" />
                </div>

                <div className="relative mt-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-2xl font-medium leading-tight text-white md:text-3xl">
                    Premium finishing that feels precise, restrained, and expensive.
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/68">
                    Every project is designed to look cleaner in motion, in sunlight, and up close.
                  </p>
                </div>

                <div className="relative mt-4 space-y-3">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.title}
                      {...cardMotion}
                      transition={{ ...cardMotion.transition, delay: 0.16 + index * 0.08 }}
                      className="flex items-start gap-4 rounded-[22px] border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F9B303] text-black">
                        <service.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{service.title}</div>
                        <p className="mt-1 text-xs leading-5 text-white/68">{service.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {stage === 'craft' && (
            <motion.div
              key="craft"
              {...stageMotion}
              className="relative z-10 w-full rounded-[40px] border border-white/12 bg-black/50 p-6 backdrop-blur-2xl md:p-10"
            >
              <div className="pointer-events-none absolute -left-4 top-6 text-[clamp(5rem,14vw,12rem)] font-semibold leading-none tracking-[-0.08em] text-white/[0.05]">
                02
              </div>

              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.58, ease: stageEase, delay: 0.08 }}
                >
                  <div className="inline-flex items-center rounded-full border border-[#F9B303]/22 bg-[#F9B303]/10 px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-[#F9B303]">
                    Craft In Motion
                  </div>
                  <h2 className="mt-5 text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white md:text-6xl">
                    Smooth transitions.
                    <br />
                    Sharper storytelling.
                  </h2>
                  <p className="mt-5 max-w-md text-sm leading-7 text-white/72 md:text-base">
                    The experience now feels more futuristic with cleaner glass layers, stronger
                    depth, and a calmer stage-to-stage transition.
                  </p>

                  <div className="mt-8 space-y-3">
                    {[
                      'Sharper presence',
                      'Cleaner material story',
                      'Luxury-first presentation',
                    ].map((point, index) => (
                      <motion.div
                        key={point}
                        {...cardMotion}
                        transition={{ ...cardMotion.transition, delay: 0.12 + index * 0.08 }}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[11px] uppercase tracking-[0.28em] text-white"
                      >
                        {point}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.title}
                      {...cardMotion}
                      transition={{ ...cardMotion.transition, delay: 0.14 + index * 0.1 }}
                      className="rounded-[30px] border border-white/12 bg-white/[0.05] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.28)]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F9B303] text-black">
                          <service.icon className="h-5 w-5" />
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/54">
                          0{index + 1}
                        </div>
                      </div>
                      <div className="mt-6 text-lg font-semibold text-white">{service.title}</div>
                      <p className="mt-3 text-sm leading-6 text-white/68">{service.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'cta' && (
            <motion.div
              key="cta"
              {...stageMotion}
              className="relative z-10 mx-auto w-full max-w-4xl"
            >
              <motion.div
                className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F9B303]/20"
                animate={{ scale: [0.94, 1.08, 0.94], opacity: [0.22, 0.5, 0.22] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                animate={{ scale: [1.02, 1.16, 1.02], opacity: [0.08, 0.16, 0.08] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              />

              <div className="relative rounded-[40px] border border-[#F9B303]/28 bg-black/58 p-8 text-center backdrop-blur-2xl md:p-12">
                <div className="text-[10px] uppercase tracking-[0.34em] text-[#F9B303]">
                  Ready To Start
                </div>
                <h2 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-6xl">
                  Built to stand out.
                  <br />
                  Finished to last.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
                  Whether it&apos;s a complete wrap, ceramic tint, or full-body PPF, we help you
                  choose the right premium finish for the way your car should feel.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white">
                  {['Wrap Consultation', 'Tint Upgrade', 'Full PPF'].map((item) => (
                    <motion.span
                      key={item}
                      {...cardMotion}
                      className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                <div className="pointer-events-auto mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full bg-[#F9B303] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black shadow-[0_0_36px_rgba(249,179,3,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFFFFF]"
                  >
                    Book Consultation <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/shop"
                    className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full border border-white/16 bg-white/[0.05] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-0.5 hover:border-[#F9B303] hover:text-[#F9B303]"
                  >
                    Browse Products <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
