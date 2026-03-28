import React, { useEffect, useRef } from 'react';
import { useTransform, motion } from 'motion/react';

interface GwagonScrollCanvasProps {
  scrollYProgress: any;
}

export const GwagonScrollCanvas: React.FC<GwagonScrollCanvasProps> = ({ scrollYProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1, 1.2, 1.5, 2]);
  const yPos = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ['0%', '5%', '10%', '20%']);
  const opacity = useTransform(scrollYProgress, [0.8, 0.95, 1], [1, 0.5, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;

    const img = new window.Image();
    img.src = 'https://images.unsplash.com/photo-1568723331958-ce8c291349e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGx1eHVyeSUyMHN1diUyMGctd2Fnb258ZW58MXx8fHwxNzc0Njk4OTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080';

    const draw = () => {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      currentCanvas.width = window.innerWidth;
      currentCanvas.height = window.innerHeight;

      // Fill background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, currentCanvas.width, currentCanvas.height);
      
      if (img.complete && img.naturalHeight !== 0) {
        const hRatio = currentCanvas.width / img.width;
        const vRatio = currentCanvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (currentCanvas.width - img.width * ratio) / 2;
        const centerShift_y = (currentCanvas.height - img.height * ratio) / 2;  

        ctx.drawImage(img, 0, 0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, currentCanvas.width, currentCanvas.height);
      }
    };

    img.onload = draw;
    window.addEventListener('resize', draw);

    return () => {
      window.removeEventListener('resize', draw);
    };
  }, []);

  return (
    <motion.div 
      className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center pointer-events-none"
      style={{ scale, y: yPos, opacity }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
    </motion.div>
  );
};
