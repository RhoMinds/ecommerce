import React from 'react';
import { useMotionValueEvent } from 'motion/react';

type ScrollScrubVideoProps = {
  scrollYProgress: any;
  src: string;
  className?: string;
  smoothing?: number;
  preload?: 'auto' | 'metadata' | 'none';
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const ScrollScrubVideo: React.FC<ScrollScrubVideoProps> = ({
  scrollYProgress,
  src,
  className,
  smoothing = 0.18,
  preload = 'metadata',
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const durationRef = React.useRef<number>(0);
  const targetTimeRef = React.useRef<number>(0);
  const displayedTimeRef = React.useRef<number>(0);
  const rafRef = React.useRef<number | null>(null);
  const lastTsRef = React.useRef<number | null>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const smoothingClamped = clamp(Number.isFinite(smoothing) ? smoothing : 0, 0, 0.98);

  const stopAnim = React.useCallback(() => {
    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastTsRef.current = null;
  }, []);

  const seekVideo = React.useCallback((time: number) => {
    const video = videoRef.current;
    if (!video || !durationRef.current) return;

    const maxTime = Math.max(0, durationRef.current - 0.001);
    const clampedTime = clamp(time, 0, maxTime);
    if (Math.abs(video.currentTime - clampedTime) < 1 / 60) return;

    try {
      video.currentTime = clampedTime;
    } catch {
      // Some browsers can throw while metadata is settling; the next tick will retry.
    }
  }, []);

  const tick = React.useCallback(
    (ts: number) => {
      rafRef.current = null;
      if (!durationRef.current) return;

      const lastTs = lastTsRef.current;
      lastTsRef.current = ts;
      const dtMs = lastTs == null ? 16.67 : Math.min(50, Math.max(1, ts - lastTs));
      const normalized = dtMs / (1000 / 60);
      const k = smoothingClamped <= 0 ? 1 : 1 - Math.pow(1 - smoothingClamped, normalized);

      const target = targetTimeRef.current;
      let displayed = displayedTimeRef.current;
      displayed = displayed + (target - displayed) * k;
      if (Math.abs(target - displayed) < 0.001) displayed = target;
      displayedTimeRef.current = displayed;

      seekVideo(displayed);

      if (displayed !== target) {
        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        stopAnim();
      }
    },
    [seekVideo, smoothingClamped, stopAnim]
  );

  const startAnim = React.useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(tick);
  }, [tick]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncToScroll = () => {
      const progress =
        typeof scrollYProgress?.get === 'function' ? Number(scrollYProgress.get()) : 0;
      const duration = durationRef.current;
      const nextTime = clamp(progress, 0, 1) * duration;
      targetTimeRef.current = nextTime;
      displayedTimeRef.current = nextTime;
      seekVideo(nextTime);
    };

    const onLoadedMetadata = () => {
      durationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
      syncToScroll();
    };

    const onLoadedData = () => {
      setIsReady(true);
      syncToScroll();
    };

    const onError = () => {
      setHasError(true);
    };

    setIsReady(false);
    setHasError(false);
    durationRef.current = 0;

    video.pause();
    video.muted = true;
    video.playsInline = true;
    video.preload = preload;
    video.load();

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('error', onError);

    return () => {
      stopAnim();
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('error', onError);
    };
  }, [preload, scrollYProgress, seekVideo, src, stopAnim]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!durationRef.current) return;

    const progress = Number(latest);
    if (!Number.isFinite(progress)) return;

    const nextTarget = clamp(progress, 0, 1) * durationRef.current;
    targetTimeRef.current = nextTarget;

    if (smoothingClamped <= 0) {
      displayedTimeRef.current = nextTarget;
      seekVideo(nextTarget);
      return;
    }

    startAnim();
  });

  React.useEffect(() => stopAnim, [stopAnim]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload={preload}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        className={className}
        aria-hidden="true"
      />
      {!isReady && !hasError ? <div className="absolute inset-0 bg-black" /> : null}
    </>
  );
};

