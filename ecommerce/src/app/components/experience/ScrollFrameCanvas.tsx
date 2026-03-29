import React from 'react';
import { useMotionValueEvent } from 'motion/react';

type ScrollFrameCanvasProps = {
  scrollYProgress: any;
  totalFrames: number;
  getFrameSrc: (frameIndex: number) => string | string[];
  className?: string;
  prefetchWindow?: number;
  maxCacheSize?: number;
  background?: string;
  smoothing?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const drawCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) => {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  const ratio = Math.max(w / iw, h / ih);
  const dw = iw * ratio;
  const dh = ih * ratio;
  const dx = (w - dw) / 2;
  const dy = (h - dh) / 2;

  ctx.drawImage(img, dx, dy, dw, dh);
};

export const ScrollFrameCanvas: React.FC<ScrollFrameCanvasProps> = ({
  scrollYProgress,
  totalFrames,
  getFrameSrc,
  className,
  prefetchWindow = 10,
  maxCacheSize = 72,
  background = '#000000',
  smoothing = 0,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const imagesRef = React.useRef<Map<number, HTMLImageElement>>(new Map());
  const missingFramesRef = React.useRef<Set<number>>(new Set());
  const contextRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const activeFrameRef = React.useRef<number>(0);
  const lastDrawnFrameRef = React.useRef<number>(0);
  const targetFrameRef = React.useRef<number>(0);
  const displayedFrameRef = React.useRef<number>(0);
  const animRafRef = React.useRef<number | null>(null);
  const lastAnimTsRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const [framesAvailable, setFramesAvailable] = React.useState<boolean>(true);
  const smoothingClamped = clamp(Number.isFinite(smoothing) ? smoothing : 0, 0, 0.98);

  const requestDraw = React.useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx =
        contextRef.current ||
        canvas.getContext('2d', {
          alpha: false,
        });
      if (!ctx) return;
      contextRef.current = ctx;

      const cssW = canvas.clientWidth || window.innerWidth;
      const cssH = canvas.clientHeight || window.innerHeight;
      const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
      const dprCap = isMobileViewport ? 1.35 : 2;
      const dpr = Math.max(1, Math.min(dprCap, window.devicePixelRatio || 1));

      const nextW = Math.floor(cssW * dpr);
      const nextH = Math.floor(cssH * dpr);
      if (canvas.width !== nextW || canvas.height !== nextH) {
        canvas.width = nextW;
        canvas.height = nextH;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, cssW, cssH);

      if (!framesAvailable) {
        ctx.fillStyle = 'rgba(255,255,255,0.72)';
        ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
        ctx.fillText('Frames not found. Add images to /public/experience/frames', 18, 28);
        return;
      }

      const targetFrameIndex = activeFrameRef.current;
      let drawnFrameIndex = targetFrameIndex;
      let img = imagesRef.current.get(drawnFrameIndex);

      if (!img || !img.complete || img.naturalWidth <= 0) {
        // When users scroll faster than decode, prefer the nearest already-loaded frame to avoid flicker.
        const maxSearch = Math.max(6, prefetchWindow);
        for (let delta = 1; delta <= maxSearch; delta += 1) {
          const left = targetFrameIndex - delta;
          const right = targetFrameIndex + delta;

          const leftImg = left >= 0 ? imagesRef.current.get(left) : undefined;
          if (leftImg && leftImg.complete && leftImg.naturalWidth > 0) {
            drawnFrameIndex = left;
            img = leftImg;
            break;
          }

          const rightImg = right < totalFrames ? imagesRef.current.get(right) : undefined;
          if (rightImg && rightImg.complete && rightImg.naturalWidth > 0) {
            drawnFrameIndex = right;
            img = rightImg;
            break;
          }
        }
      }

      if ((!img || !img.complete || img.naturalWidth <= 0) && lastDrawnFrameRef.current !== targetFrameIndex) {
        const lastImg = imagesRef.current.get(lastDrawnFrameRef.current);
        if (lastImg && lastImg.complete && lastImg.naturalWidth > 0) {
          drawnFrameIndex = lastDrawnFrameRef.current;
          img = lastImg;
        }
      }

      if (img && img.complete && img.naturalWidth > 0) {
        ctx.imageSmoothingEnabled = true;
        drawCover(ctx, img, cssW, cssH);
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(0, 0, cssW, cssH);
        lastDrawnFrameRef.current = drawnFrameIndex;
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
        ctx.fillText('Loading frames...', 18, 28);
      }
    });
  }, [background, framesAvailable, prefetchWindow, totalFrames]);

  const ensureImage = React.useCallback(
    (frameIndex: number) => {
      if (!framesAvailable) return null;
      if (frameIndex < 0 || frameIndex >= totalFrames) return null;
      if (missingFramesRef.current.has(frameIndex)) return null;

      const cached = imagesRef.current.get(frameIndex);
      if (cached) return cached;

      const img = new window.Image();
      img.decoding = 'async';

      const srcList = (() => {
        const src = getFrameSrc(frameIndex);
        return Array.isArray(src) ? src : [src];
      })();

      let srcIndex = 0;
      const tryNextSrc = () => {
        if (srcIndex >= srcList.length) {
          missingFramesRef.current.add(frameIndex);
          if (frameIndex === 0) setFramesAvailable(false);
          requestDraw();
          return;
        }
        img.src = srcList[srcIndex];
        srcIndex += 1;
      };

      img.onload = () => requestDraw();
      img.onerror = () => tryNextSrc();
      tryNextSrc();

      imagesRef.current.set(frameIndex, img);
      return img;
    },
    [framesAvailable, getFrameSrc, requestDraw, totalFrames]
  );

  const prefetchAround = React.useCallback(
    (frameIndex: number) => {
      if (!framesAvailable) return;
      const start = clamp(frameIndex - prefetchWindow, 0, totalFrames - 1);
      const end = clamp(frameIndex + prefetchWindow, 0, totalFrames - 1);
      for (let i = start; i <= end; i += 1) ensureImage(i);

      const cache = imagesRef.current;
      if (cache.size <= maxCacheSize) return;

      for (const key of Array.from(cache.keys())) {
        if (cache.size <= maxCacheSize) break;
        if (Math.abs(key - frameIndex) > prefetchWindow * 3) cache.delete(key);
      }
    },
    [ensureImage, framesAvailable, maxCacheSize, prefetchWindow, totalFrames]
  );

  React.useEffect(() => {
    const initialProgress =
      typeof scrollYProgress?.get === 'function' ? Number(scrollYProgress.get()) : 0;
    const initialFrameFloat = clamp(initialProgress, 0, 1) * (totalFrames - 1);
    const initialFrame = clamp(Math.floor(initialFrameFloat), 0, totalFrames - 1);

    activeFrameRef.current = initialFrame;
    lastDrawnFrameRef.current = initialFrame;
    targetFrameRef.current = initialFrameFloat;
    displayedFrameRef.current = initialFrameFloat;

    // Probe the initial frame. If it fails to load, we render a clear fallback message.
    ensureImage(initialFrame);
    prefetchAround(initialFrame);
    requestDraw();
    const onResize = () => requestDraw();
    window.addEventListener('resize', onResize);
    return () => {
      contextRef.current = null;
      window.removeEventListener('resize', onResize);
    };
  }, [ensureImage, prefetchAround, requestDraw, scrollYProgress, totalFrames]);

  const stopAnim = React.useCallback(() => {
    if (animRafRef.current != null) {
      window.cancelAnimationFrame(animRafRef.current);
      animRafRef.current = null;
    }
    lastAnimTsRef.current = null;
  }, []);

  const tick = React.useCallback(
    (ts: number) => {
      animRafRef.current = null;
      const lastTs = lastAnimTsRef.current;
      lastAnimTsRef.current = ts;

      const dtMs = lastTs == null ? 16.67 : Math.min(50, Math.max(1, ts - lastTs));
      const normalized = dtMs / (1000 / 60);
      const k = smoothingClamped <= 0 ? 1 : 1 - Math.pow(1 - smoothingClamped, normalized);

      const target = targetFrameRef.current;
      let displayed = displayedFrameRef.current;
      displayed = displayed + (target - displayed) * k;
      if (Math.abs(target - displayed) < 0.001) displayed = target;
      displayedFrameRef.current = displayed;

      const nextIndex = clamp(Math.round(displayed), 0, totalFrames - 1);
      if (nextIndex !== activeFrameRef.current) {
        activeFrameRef.current = nextIndex;
        ensureImage(nextIndex);
        prefetchAround(nextIndex);
        requestDraw();
      }

      if (displayed !== target) {
        animRafRef.current = window.requestAnimationFrame(tick);
      } else {
        stopAnim();
      }
    },
    [ensureImage, prefetchAround, requestDraw, smoothingClamped, stopAnim, totalFrames]
  );

  const startAnim = React.useCallback(() => {
    if (animRafRef.current != null) return;
    animRafRef.current = window.requestAnimationFrame(tick);
  }, [tick]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const progress = Number(latest);
    if (!Number.isFinite(progress)) return;

    const nextTarget = clamp(progress, 0, 1) * (totalFrames - 1);
    targetFrameRef.current = nextTarget;

    const targetIndex = clamp(Math.round(nextTarget), 0, totalFrames - 1);
    ensureImage(targetIndex);
    prefetchAround(targetIndex);

    if (smoothingClamped <= 0) {
      displayedFrameRef.current = nextTarget;
      if (targetIndex !== activeFrameRef.current) {
        activeFrameRef.current = targetIndex;
      }
      requestDraw();
      return;
    }

    startAnim();
  });

  React.useEffect(() => stopAnim, [stopAnim]);

  return <canvas ref={canvasRef} className={className} />;
};
