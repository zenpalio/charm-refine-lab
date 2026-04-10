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
    radius: baseRadius + (Math.random() - 0.5) * 6,
    speed: 0.15 + Math.random() * 0.35,
    size: 0.8 + Math.random() * 2,
    opacity: 0.3 + Math.random() * 0.5,
    hue: 40 + Math.random() * 20, // warm white-gold range
    life: Math.random() * 100,
    maxLife: 80 + Math.random() * 100,
    drift: (Math.random() - 0.5) * 0.2,
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
  // Soft divine light ring — warm white with subtle gold
  const ringWidth = 2.5 * DPR;
  const steps = 64;
  for (let i = 0; i < steps; i++) {
    const a0 = (i / steps) * Math.PI * 2;
    const a1 = ((i + 1.5) / steps) * Math.PI * 2;
    // Flowing brightness wave
    const wave = 0.5 + 0.5 * Math.sin(time * 1.2 + a0 * 2);
    const lightness = 82 + wave * 12; // 82-94% — very bright, ethereal
    const alpha = 0.5 + wave * 0.4;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius, a0, a1);
    ctx.strokeStyle = `hsla(45, 30%, ${lightness}%, ${alpha})`;
    ctx.lineWidth = ringWidth + wave * 1.5 * DPR;
    ctx.stroke();
  }

  // Ethereal outer glow — soft warm light breathing
  const breathe = 0.5 + 0.5 * Math.sin(time * 0.8);
  const glowRadius = baseRadius + (12 + breathe * 8) * DPR;
  const gradient = ctx.createRadialGradient(cx, cy, baseRadius - 2, cx, cy, glowRadius);
  gradient.addColorStop(0, `hsla(45, 40%, 90%, ${0.12 + breathe * 0.08})`);
  gradient.addColorStop(0.4, `hsla(40, 25%, 85%, ${0.06 + breathe * 0.04})`);
  gradient.addColorStop(1, `hsla(40, 20%, 80%, 0)`);
  ctx.beginPath();
  ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Floating light motes — gentle, divine energy
  for (const p of particles) {
    p.angle += p.speed * 0.008;
    p.life += 1;
    if (p.life > p.maxLife) {
      p.life = 0;
      p.opacity = 0.3 + Math.random() * 0.5;
      p.radius = baseRadius + (Math.random() - 0.5) * 6;
    }
    const lifeFrac = p.life / p.maxLife;
    const fade = lifeFrac < 0.15 ? lifeFrac / 0.15 : lifeFrac > 0.75 ? (1 - lifeFrac) / 0.25 : 1;
    const wobble = Math.sin(time * 1.5 + p.angle * 4) * 4;
    const px = cx + Math.cos(p.angle) * (p.radius + wobble);
    const py = cy + Math.sin(p.angle) * (p.radius + wobble);
    const pulse = 0.8 + Math.sin(time * 3 + p.angle * 5) * 0.2;
    const s = p.size * DPR * pulse;

    // Soft glow halo
    ctx.beginPath();
    ctx.arc(px, py, s * 3, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(45, 30%, 92%, ${p.opacity * fade * 0.1})`;
    ctx.fill();

    // Bright core
    ctx.beginPath();
    ctx.arc(px, py, s, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 20%, 94%, ${p.opacity * fade * 0.7})`;
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
