import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Dynamic, AR-style background: canvas particles + animated gradient orbs.
// Reacts to active tab and time of day with different palettes.
export default function BackgroundFX({ activeTab }) {
  const canvasRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const palette = useMemo(() => {
    const hour = new Date().getHours();
    const timeKey = hour < 6 ? "night" : hour < 12 ? "morning" : hour < 18 ? "day" : "evening";
    const byTab = {
      workout: {
        morning: ["#60a5fa", "#a78bfa", "#22d3ee"],
        day: ["#2563eb", "#7c3aed", "#06b6d4"],
        evening: ["#1d4ed8", "#4f46e5", "#0ea5e9"],
        night: ["#0ea5e9", "#312e81", "#22d3ee"],
      },
      meal: {
        morning: ["#f59e0b", "#84cc16", "#f97316"],
        day: ["#f59e0b", "#10b981", "#f43f5e"],
        evening: ["#ea580c", "#84cc16", "#f43f5e"],
        night: ["#f59e0b", "#065f46", "#ef4444"],
      },
      weight: {
        morning: ["#22c55e", "#06b6d4", "#38bdf8"],
        day: ["#16a34a", "#06b6d4", "#3b82f6"],
        evening: ["#15803d", "#0ea5e9", "#2563eb"],
        night: ["#22c55e", "#1e3a8a", "#06b6d4"],
      },
    };
    const key = ["workout", "meal", "weight"].includes(activeTab) ? activeTab : "workout";
    const colors = byTab[key][timeKey];
    return { timeKey, colors };
  }, [activeTab]);

  useEffect(() => {
    if (prefersReduced) return; // Respect reduced motion
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const PARTICLE_COUNT = Math.min(140, Math.floor((w * h) / 20000));
    const particles = Array.from({ length: PARTICLE_COUNT }, () => spawn(w, h));

    let rafId = 0;
    function loop() {
      rafId = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, w, h);

      // soft radial vignette backdrop
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 1.2);
      grad.addColorStop(0, window.matchMedia('(prefers-color-scheme: dark)').matches ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.08)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.005;
        if (p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50 || p.life <= 0) Object.assign(p, spawn(w, h));
        const alpha = Math.max(0, Math.min(1, p.life));
        const r = p.r * (1 + 0.5 * Math.sin(p.life * Math.PI));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, hexToRgba(p.color, 0.9 * alpha));
        g.addColorStop(1, hexToRgba(p.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    loop();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [palette, prefersReduced]);

  // Pick colors based on palette for orbs
  const [c1, c2, c3] = palette.colors;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Animated gradient orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(60% 60% at 50% 50%, ${c1} 0%, transparent 60%)` }}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.28, y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-[-10%] h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(60% 60% at 50% 50%, ${c2} 0%, transparent 60%)` }}
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.22, y: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] left-[10%] h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(60% 60% at 50% 50%, ${c3} 0%, transparent 60%)` }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.25),transparent_60%)]" />
    </div>
  );
}

function spawn(w, h) {
  const x = Math.random() * w;
  const y = Math.random() * h;
  const speed = 0.2 + Math.random() * 0.6;
  const angle = Math.random() * Math.PI * 2;
  const r = 18 + Math.random() * 40;
  const colors = ["#60a5fa", "#a78bfa", "#22d3ee", "#f59e0b", "#22c55e", "#ef4444", "#38bdf8"]; // pool
  return { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r, color: colors[(Math.random() * colors.length) | 0], life: 1 };
}

function hexToRgba(hex, alpha) {
  const v = hex.replace('#','');
  const bigint = parseInt(v.length === 3 ? v.split('').map(c=>c+c).join('') : v, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}
