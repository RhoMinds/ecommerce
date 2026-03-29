import React from 'react';
import { motion, useTransform } from 'motion/react';
import { ChevronRight, Paintbrush, ShieldCheck, SunMedium } from 'lucide-react';
import { Link } from 'react-router';
import { ScrollFrameCanvas } from '../experience/ScrollFrameCanvas';
import { useIsMobile } from '../ui/use-mobile';

const services = [
  {
    icon: Paintbrush,
    title: 'Premium Wraps',
    desc: 'Satin, gloss, stealth, and custom color-change finishes with tighter panel flow.',
  },
  {
    icon: SunMedium,
    title: 'Ceramic Tints',
    desc: 'Heat control, privacy, and cleaner glass with a refined finish in motion.',
  },
  {
    icon: ShieldCheck,
    title: 'PPF Protection',
    desc: 'Self-healing coverage that keeps the bodywork protected without losing presence.',
  },
];

export const PremiumExperienceOverlay = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const isMobile = useIsMobile();

  const introOpacity = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.42], [0, 1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.26, 0.42], [26, 0, -24]);
  const introScale = useTransform(scrollYProgress, [0, 0.28, 0.42], [0.992, 1, 0.994]);
  const introRailOpacity = useTransform(scrollYProgress, [0.06, 0.16, 0.34, 0.48], [0, 1, 1, 0]);
  const introRailY = useTransform(scrollYProgress, [0.06, 0.18, 0.48], [18, 0, -18]);

  const craftOpacity = useTransform(scrollYProgress, [0.26, 0.4, 0.66, 0.8], [0, 1, 1, 0]);
  const craftY = useTransform(scrollYProgress, [0.26, 0.5, 0.8], [28, 0, -24]);
  const craftScale = useTransform(scrollYProgress, [0.26, 0.6, 0.8], [0.992, 1, 0.995]);
  const craftCardsOpacity = useTransform(scrollYProgress, [0.3, 0.44, 0.74], [0, 1, 0.94]);
  const craftCardsY = useTransform(scrollYProgress, [0.3, 0.44], [18, 0]);

  const finishOpacity = useTransform(scrollYProgress, [0.7, 0.84, 1], [0, 1, 1]);
  const finishY = useTransform(scrollYProgress, [0.7, 0.84], [24, 0]);
  const finishScale = useTransform(scrollYProgress, [0.7, 0.84], [0.992, 1]);

  return (
    <div className="sticky top-0 h-[100svh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <ScrollFrameCanvas
          scrollYProgress={scrollYProgress}
          totalFrames={300}
          getFrameSrc={(frameIndex) => {
            const base = `/experience/frames/ezgif-frame-${String(frameIndex + 1).padStart(3, '0')}`;
            return [`${base}.webp`, `${base}.png`];
          }}
          className="absolute inset-0 h-full w-full"
          prefetchWindow={isMobile ? 5 : 7}
          maxCacheSize={isMobile ? 26 : 40}
          smoothing={isMobile ? 0.42 : 0.34}
          background="rgba(0,0,0,0)"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(249,179,3,0.14),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.07),transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.56),rgba(0,0,0,0.18)_20%,rgba(0,0,0,0.16)_56%,rgba(0,0,0,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72),rgba(0,0,0,0.08)_48%,rgba(0,0,0,0.78))]" />
      <div className="absolute left-[10%] top-[16%] h-44 w-44 rounded-full bg-[#F9B303]/8 blur-3xl" />
      <div className="absolute right-[12%] top-[18%] h-56 w-56 rounded-full bg-white/[0.04] blur-3xl" />

      <div className="relative mx-auto h-full max-w-7xl px-5 pb-8 pt-24 sm:px-6 md:px-12 md:pb-10">
        <div className="relative h-full">
          <motion.div
            style={{ opacity: introOpacity, y: introY, scale: introScale }}
            className="absolute inset-x-0 bottom-10 z-10 grid items-end gap-8 md:bottom-16 xl:grid-cols-[1fr_320px] xl:gap-10"
          >
            <div className="max-w-3xl">
              <div className="text-[10px] uppercase tracking-[0.42em] text-[#F9B303] md:text-xs">
                Premium Vehicle Surface Studio
              </div>
              <h1 className="mt-5 text-[2.85rem] font-semibold leading-[0.9] tracking-[-0.08em] text-white sm:text-6xl md:text-7xl xl:text-[7rem]">
                Built for
                <br />
                cleaner finishes
                <br />
                and stronger presence.
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/72 md:text-base">
                The landing page is now more restrained, more cinematic, and easier to read while
                the frame sequence does the real storytelling.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.28em] text-white/88">
                {['Luxury builds', 'Surface-first detail', 'Modern finish'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 backdrop-blur-xl"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full bg-[#F9B303] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black shadow-[0_0_36px_rgba(249,179,3,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Book Consultation <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full border border-white/16 bg-black/34 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#F9B303] hover:text-[#F9B303]"
                >
                  Browse Products <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <motion.div
              style={{ opacity: introRailOpacity, y: introRailY }}
              className="hidden rounded-[32px] border border-white/10 bg-black/34 p-5 shadow-[0_26px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl xl:block"
            >
              <div className="text-[10px] uppercase tracking-[0.34em] text-[#F9B303]">
                Signature Finish
              </div>
              <div className="mt-4 text-2xl font-medium leading-tight text-white">
                The details feel
                <br />
                expensive before
                <br />
                the copy does.
              </div>
              <div className="mt-6 space-y-3">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F9B303] text-black">
                        <service.icon className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-semibold text-white">{service.title}</div>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-white/66">{service.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ opacity: craftOpacity, y: craftY, scale: craftScale }}
            className="absolute inset-x-0 bottom-10 z-10 md:bottom-16"
          >
            <div className="grid gap-6 rounded-[34px] border border-white/10 bg-black/38 p-5 shadow-[0_30px_96px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-6 md:gap-8 md:rounded-[40px] md:p-10 xl:grid-cols-[0.84fr_1.16fr] xl:items-end">
              <div className="max-w-xl">
                <div className="text-[10px] uppercase tracking-[0.34em] text-[#F9B303]">
                  Surface Story
                </div>
                <h2 className="mt-5 text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">
                  Every transition
                  <br />
                  now breathes.
                </h2>
                <p className="mt-5 text-sm leading-7 text-white/72 md:text-base">
                  Panels, labels, and service blocks now move with longer overlaps and shorter
                  travel, so the landing story feels tied to the scroll instead of jumping ahead.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    'Less motion noise and no grid layer competing with the frame sequence.',
                    'Softer panel movement so the story glides instead of snapping.',
                    'A cleaner hierarchy that keeps the eye on the car first.',
                  ].map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/82"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                style={{ opacity: craftCardsOpacity, y: craftCardsY }}
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
              >
                {services.map((service, index) => (
                  <div
                    key={service.title}
                    className="rounded-[28px] border border-white/12 bg-white/[0.05] p-5 md:rounded-[30px] md:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F9B303] text-black">
                        <service.icon className="h-5 w-5" />
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                        0{index + 1}
                      </div>
                    </div>
                    <div className="mt-6 text-lg font-semibold text-white">{service.title}</div>
                    <p className="mt-3 text-sm leading-6 text-white/68">{service.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: finishOpacity, y: finishY, scale: finishScale }}
            className="absolute inset-x-0 bottom-10 z-10 mx-auto max-w-4xl md:bottom-16"
          >
            <div className="rounded-[34px] border border-[#F9B303]/22 bg-black/52 p-6 text-center shadow-[0_34px_110px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-8 md:rounded-[42px] md:p-12">
              <div className="text-[10px] uppercase tracking-[0.34em] text-[#F9B303]">
                Ready To Start
              </div>
              <h2 className="mt-4 text-[2.45rem] font-semibold leading-[0.97] tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">
                A smoother story.
                <br />
                The same premium finish.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
                Whether it&apos;s a full wrap, ceramic tint, or complete PPF package, the landing
                flow now ends with a cleaner invitation into the real work.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white">
                {['Wrap Consultation', 'Ceramic Tint', 'Full PPF'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="pointer-events-auto mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full bg-[#F9B303] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black shadow-[0_0_36px_rgba(249,179,3,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
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
        </div>
      </div>
    </div>
  );
};
