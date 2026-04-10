import { useRef, useEffect, useCallback } from "react";
import type { BadgeTier } from "@/components/BadgeCard";

interface TierRingCanvasProps {
  tier: BadgeTier;
  size: number; // CSS size of the avatar container
}

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
  drift: number;
}

const DPR = typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1;

function createImmortalParticles(count: number, baseRadius: number): Particle[] {
  return Array.from({ length: count }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: baseRadius + (Math.random() - 0.5) * 8,
    speed: 0.3 + Math.random() * 0.6,
    size: 1 + Math.random() * 2.5,
    opacity: 0.4 + Math.random() * 0.6,
    hue: Math.random() * 360,
    life: Math.random() * 100,
    maxLife: 60 + Math.random() * 80,
    drift: (Math.random() - 0.5) * 0.3,
  }));
}

function drawImmortal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  baseRadius: number,
  time: number,
  particles: Particle[]
) {
  // Spinning rainbow ring
  const steps = 128;
  const ringWidth = 3 * DPR;
  for (let i = 0; i < steps; i++) {
    const a0 = (i / steps) * Math.PI * 2;
    const a1 = ((i + 1.5) / steps) * Math.PI * 2;
    const hue = ((i / steps) * 360 + time * 60) % 360;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius, a0, a1);
    ctx.strokeStyle = `hsla(${hue}, 100%, 65%, 0.9)`;
    ctx.lineWidth = ringWidth;
    ctx.stroke();
  }

  // Outer glow
  const glowHue = (time * 40) % 360;
  const gradient = ctx.createRadialGradient(cx, cy, baseRadius - 4, cx, cy, baseRadius + 18 * DPR);
  gradient.addColorStop(0, `hsla(${glowHue}, 100%, 70%, 0.15)`);
  gradient.addColorStop(0.5, `hsla(${(glowHue + 120) % 360}, 100%, 60%, 0.08)`);
  gradient.addColorStop(1, `hsla(${(glowHue + 240) % 360}, 80%, 50%, 0)`);
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius + 16 * DPR, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Sparkle particles
  for (const p of particles) {
    p.angle += p.speed * 0.015;
    p.life += 1;
    p.hue = (p.hue + 1.5) % 360;
    if (p.life > p.maxLife) {
      p.life = 0;
      p.opacity = 0.4 + Math.random() * 0.6;
    }
    const lifeFrac = p.life / p.maxLife;
    const fade = lifeFrac < 0.1 ? lifeFrac / 0.1 : lifeFrac > 0.8 ? (1 - lifeFrac) / 0.2 : 1;
    const px = cx + Math.cos(p.angle) * (p.radius + Math.sin(time * 2 + p.angle) * 3);
    const py = cy + Math.sin(p.angle) * (p.radius + Math.sin(time * 2 + p.angle) * 3);
    const s = p.size * DPR * (0.8 + Math.sin(time * 4 + p.angle * 3) * 0.3);

    ctx.beginPath();
    ctx.arc(px, py, s, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${p.opacity * fade})`;
    ctx.fill();

    // Tiny glow around particle
    ctx.beginPath();
    ctx.arc(px, py, s * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity * fade * 0.15})`;
    ctx.fill();
  }
}

const TierRingCanvas = ({ tier, size }: TierRingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const canvasSize = size + 40; // extra space for glow
  const baseRadius = (size / 2 + 2) * DPR;

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = (canvasSize * DPR) / 2;
    const cy = (canvasSize * DPR) / 2;
    const time = performance.now() / 1000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (tier === "immortal") {
      if (particlesRef.current.length === 0) {
        particlesRef.current = createImmortalParticles(40, baseRadius);
      }
      drawImmortal(ctx, cx, cy, baseRadius, time, particlesRef.current);
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [tier, canvasSize, baseRadius]);

  useEffect(() => {
    particlesRef.current = [];
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  // Only render for tiers that have canvas effects
  if (tier !== "immortal") return null;

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize * DPR}
      height={canvasSize * DPR}
      className="absolute pointer-events-none"
      style={{
        width: canvasSize,
        height: canvasSize,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 0,
      }}
    />
  );
};

export default TierRingCanvas;
