'use client';

import { useEffect, useRef } from 'react';
import { StripeGradient as GradientEngine } from '@/lib/gradient';

const GRADIENT_COLORS = ['#f9954d', '#ec8032', '#f9ae4d', '#f9864d', '#f96f4d', '#f9bd4d'];

export function StripeGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<GradientEngine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      gradientRef.current = new GradientEngine({
        canvas,
        colors: GRADIENT_COLORS,
        density: [0.06, 0.16],
        angle: 0,
        amplitude: 320,
      });
    } catch (err) {
      console.error('WebGL gradient init failed:', err);
    }

    return () => {
      gradientRef.current?.disconnect();
      gradientRef.current = null;
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
