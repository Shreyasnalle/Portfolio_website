"use client";

import { useEffect, useRef } from "react";

interface WindStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  baseSpeed: number;
  amplitude: number;
  frequency: number;
  phase: number;
  lineWidth: number;
  opacity: number;
  tailSegments: number;
}

interface WindWisp {
  x: number;
  y: number;
  radius: number;
  speed: number;
  baseSpeed: number;
  alpha: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  phase: number;
}

export function BannerWind() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId: number;
    let isUnmounted = false;

    // Gust cycle variables - much calmer and subtle
    let gustFactor = 1;
    let gustTarget = 1;
    let lastGustTime = Date.now();
    let nextGustDelay = 6000 + Math.random() * 5000;

    // Subtler counts to prevent feeling overwhelming
    const streakCount = 9;
    const wispCount = 15;

    let streaks: WindStreak[] = [];
    let wisps: WindWisp[] = [];

    const createStreak = (initOnScreen = false): WindStreak => {
      const length = 40 + Math.random() * 70;
      // Much slower, gentle breeze speed
      const baseSpeed = 0.55 + Math.random() * 0.85;
      return {
        x: initOnScreen ? Math.random() * width : -length - Math.random() * 60,
        y: Math.random() * height,
        length,
        speed: baseSpeed,
        baseSpeed,
        amplitude: 1.5 + Math.random() * 2.5,
        frequency: 0.01 + Math.random() * 0.015,
        phase: Math.random() * Math.PI * 2,
        lineWidth: 0.6 + Math.random() * 0.6,
        opacity: 0.09 + Math.random() * 0.13, // Soft, non-distracting opacity
        tailSegments: 12,
      };
    };

    const createWisp = (initOnScreen = false): WindWisp => {
      // Gentle floating mist specks
      const baseSpeed = 0.35 + Math.random() * 0.6;
      return {
        x: initOnScreen ? Math.random() * width : -10 - Math.random() * 30,
        y: Math.random() * height,
        radius: 0.7 + Math.random() * 1.1,
        speed: baseSpeed,
        baseSpeed,
        alpha: 0.08 + Math.random() * 0.14,
        wobbleSpeed: 0.01 + Math.random() * 0.015,
        wobbleAmp: 0.4 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };

    const init = () => {
      streaks = [];
      wisps = [];

      for (let i = 0; i < streakCount; i++) {
        streaks.push(createStreak(true));
      }
      for (let i = 0; i < wispCount; i++) {
        wisps.push(createWisp(true));
      }
    };

    let tick = 0;

    const render = () => {
      if (isUnmounted) return;

      tick++;

      // Natural gentle gust dynamics
      const now = Date.now();
      if (now - lastGustTime > nextGustDelay) {
        lastGustTime = now;
        gustTarget = 1.15 + Math.random() * 0.2; // Very gentle breeze swell
        nextGustDelay = 6000 + Math.random() * 6000;
      } else if (gustFactor > 1.02 && Math.random() < 0.03) {
        gustTarget = 1.0; // Decay back to steady breeze
      }

      gustFactor += (gustTarget - gustFactor) * 0.02;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw and update Wind Streaks (breeze lines)
      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        s.speed = s.baseSpeed * gustFactor;
        s.x += s.speed;

        // Draw gentle curved streamline
        const headX = s.x;
        const tailX = s.x - s.length;

        // Create gradient so streak feathers out at both tip and tail
        const grad = ctx.createLinearGradient(tailX, s.y, headX, s.y);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(0.35, `rgba(240, 248, 255, ${s.opacity * 0.85})`);
        grad.addColorStop(0.8, `rgba(255, 255, 255, ${s.opacity})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.lineWidth;

        const segStep = s.length / s.tailSegments;
        for (let seg = 0; seg <= s.tailSegments; seg++) {
          const px = headX - seg * segStep;
          const py =
            s.y +
            Math.sin(px * s.frequency + s.phase + tick * 0.012) *
              s.amplitude *
              (1 - (seg / s.tailSegments) * 0.3);

          if (seg === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();

        // Reset when completely off screen right
        if (tailX > width + 40) {
          streaks[i] = createStreak(false);
        }
      }

      // 2. Draw and update Atmospheric Wisps (cloud mist specks drifting along)
      for (let i = 0; i < wisps.length; i++) {
        const w = wisps[i];
        w.speed = w.baseSpeed * gustFactor;
        w.x += w.speed;
        w.phase += w.wobbleSpeed;

        const py = w.y + Math.sin(w.phase) * w.wobbleAmp;

        // Soft glowing mist puff
        const mistGrad = ctx.createRadialGradient(
          w.x,
          py,
          0,
          w.x,
          py,
          w.radius * 2
        );
        mistGrad.addColorStop(0, `rgba(255, 255, 255, ${w.alpha})`);
        mistGrad.addColorStop(0.6, `rgba(230, 245, 255, ${w.alpha * 0.4})`);
        mistGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.fillStyle = mistGrad;
        ctx.arc(w.x, py, w.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Reset when off screen right
        if (w.x - w.radius * 2 > width + 20) {
          wisps[i] = createWisp(false);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    init();
    render();

    window.addEventListener("resize", resize);

    return () => {
      isUnmounted = true;
      window.removeEventListener("resize", resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[6]"
      aria-hidden="true"
    />
  );
}
