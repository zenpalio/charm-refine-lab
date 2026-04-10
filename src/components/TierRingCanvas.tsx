import { useRef, useEffect, useCallback } from "react";
import type { BadgeTier } from "@/components/BadgeCard";

interface TierRingCanvasProps {
  tier: BadgeTier;
  size: number;
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

function createParticles(count: number, baseRadius: number, hue = 0, sizeMin = 1, sizeMax = 2, speedMin = 0.15, speedMax = 0.35): Particle[] {
  return Array.from({ length: count }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: baseRadius + (Math.random() - 0.5) * 6,
    speed: speedMin + Math.random() * (speedMax - speedMin),
    size: sizeMin + Math.random() * (sizeMax - sizeMin),
    opacity: 0.4 + Math.random() * 0.5,
    hue,
    life: Math.random() * 80,
    maxLife: 60 + Math.random() * 80,
    drift: (Math.random() - 0.5) * 0.3,
  }));
}

// ─── NEWBIE: Gentle bronze pulse (breathing glow) ───
function drawNewbie(ctx: CanvasRenderingContext2D, cx: number, cy: number, baseRadius: number, time: number) {
  const breathe = 0.5 + 0.5 * Math.sin(time * 1.5);
  // Bronze ring with breathing opacity
  const ringWidth = 2 * DPR;
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
  ctx.strokeStyle = `hsla(25, 50%, 52%, ${0.4 + breathe * 0.4})`;
  ctx.lineWidth = ringWidth + breathe * 1 * DPR;
  ctx.stroke();

  // Soft bronze glow
  const glowR = baseRadius + (6 + breathe * 6) * DPR;
  const grad = ctx.createRadialGradient(cx, cy, baseRadius - 2, cx, cy, glowR);
  grad.addColorStop(0, `hsla(25, 50%, 55%, ${0.08 + breathe * 0.06})`);
  grad.addColorStop(1, `hsla(25, 40%, 45%, 0)`);
  ctx.beginPath();
  ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
}

// ─── MASTER: Rotating silver sparkle dots orbiting ───
function drawMaster(ctx: CanvasRenderingContext2D, cx: number, cy: number, baseRadius: number, time: number, particles: Particle[]) {
  // Silver ring
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
  ctx.strokeStyle = `hsla(210, 15%, 70%, 0.5)`;
  ctx.lineWidth = 2 * DPR;
  ctx.stroke();

  // Orbiting sparkle dots
  const sparkleCount = 8;
  for (let i = 0; i < sparkleCount; i++) {
    const baseAngle = (i / sparkleCount) * Math.PI * 2 + time * 0.8;
    const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * 3 + i * 1.7));
    const px = cx + Math.cos(baseAngle) * baseRadius;
    const py = cy + Math.sin(baseAngle) * baseRadius;
    const s = (1.5 + twinkle * 1.5) * DPR;

    // Glow
    ctx.beginPath();
    ctx.arc(px, py, s * 3, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(210, 20%, 85%, ${twinkle * 0.15})`;
    ctx.fill();

    // Core sparkle
    ctx.beginPath();
    ctx.arc(px, py, s, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(210, 25%, 90%, ${twinkle * 0.9})`;
    ctx.fill();
  }

  // Subtle floating silver motes
  for (const p of particles) {
    p.angle += p.speed * 0.006;
    p.life += 1;
    if (p.life > p.maxLife) { p.life = 0; p.opacity = 0.3 + Math.random() * 0.4; }
    const lifeFrac = p.life / p.maxLife;
    const fade = lifeFrac < 0.2 ? lifeFrac / 0.2 : lifeFrac > 0.8 ? (1 - lifeFrac) / 0.2 : 1;
    const px = cx + Math.cos(p.angle) * p.radius;
    const py = cy + Math.sin(p.angle) * p.radius;
    ctx.beginPath();
    ctx.arc(px, py, p.size * DPR * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(210, 15%, 88%, ${p.opacity * fade * 0.5})`;
    ctx.fill();
  }
}

// ─── LEGEND: Golden shimmer wave sweeping around ───
function drawLegend(ctx: CanvasRenderingContext2D, cx: number, cy: number, baseRadius: number, time: number) {
  const steps = 80;
  const ringWidth = 2.5 * DPR;

  for (let i = 0; i < steps; i++) {
    const a0 = (i / steps) * Math.PI * 2;
    const a1 = ((i + 1.5) / steps) * Math.PI * 2;
    // Shimmer wave — a bright band sweeps around
    const wavePos = (time * 0.6) % 1; // 0-1 position of the wave
    const segPos = i / steps;
    const dist = Math.abs(segPos - wavePos);
    const wrapDist = Math.min(dist, 1 - dist);
    const shimmer = Math.max(0, 1 - wrapDist * 6); // narrow bright band
    const baseAlpha = 0.35;
    const alpha = baseAlpha + shimmer * 0.6;
    const lightness = 55 + shimmer * 30;

    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius, a0, a1);
    ctx.strokeStyle = `hsla(43, 85%, ${lightness}%, ${alpha})`;
    ctx.lineWidth = ringWidth + shimmer * 2 * DPR;
    ctx.stroke();
  }

  // Warm golden glow at the wave point
  const waveAngle = (time * 0.6 % 1) * Math.PI * 2;
  const glowX = cx + Math.cos(waveAngle) * baseRadius;
  const glowY = cy + Math.sin(waveAngle) * baseRadius;
  const spotGrad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 20 * DPR);
  spotGrad.addColorStop(0, `hsla(43, 90%, 65%, 0.25)`);
  spotGrad.addColorStop(1, `hsla(43, 80%, 55%, 0)`);
  ctx.beginPath();
  ctx.arc(glowX, glowY, 20 * DPR, 0, Math.PI * 2);
  ctx.fillStyle = spotGrad;
  ctx.fill();
}

// ─── ELITE: Blue electric arc / lightning crackle ───
function drawElite(ctx: CanvasRenderingContext2D, cx: number, cy: number, baseRadius: number, time: number) {
  // Base blue ring
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
  ctx.strokeStyle = `hsla(213, 100%, 55%, 0.45)`;
  ctx.lineWidth = 2 * DPR;
  ctx.stroke();

  // Electric glow
  const pulse = 0.5 + 0.5 * Math.sin(time * 3);
  const glowR = baseRadius + (8 + pulse * 5) * DPR;
  const grad = ctx.createRadialGradient(cx, cy, baseRadius - 2, cx, cy, glowR);
  grad.addColorStop(0, `hsla(213, 100%, 60%, ${0.08 + pulse * 0.05})`);
  grad.addColorStop(1, `hsla(213, 80%, 50%, 0)`);
  ctx.beginPath();
  ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Lightning arcs — 3 arcs that flicker and jump
  const arcCount = 3;
  const seed = Math.floor(time * 8); // changes 8x per second for crackle
  for (let a = 0; a < arcCount; a++) {
    const arcStart = ((seed * 0.37 + a * 2.1) % 1) * Math.PI * 2;
    const arcLen = 0.3 + ((seed * 0.13 + a) % 1) * 0.5; // radians
    const segments = 8;
    const intensity = 0.5 + 0.5 * Math.sin(time * 12 + a * 4);

    ctx.beginPath();
    for (let s = 0; s <= segments; s++) {
      const t = s / segments;
      const angle = arcStart + t * arcLen;
      // Jagged offset for lightning look
      const jag = s === 0 || s === segments ? 0 : ((Math.sin(seed * 7 + s * 13 + a * 5) * 0.5 + 0.5) * 6 - 3) * DPR;
      const r = baseRadius + jag;
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r;
      if (s === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = `hsla(200, 100%, 80%, ${intensity * 0.8})`;
    ctx.lineWidth = (1 + intensity) * DPR;
    ctx.stroke();

    // Bright core line
    ctx.strokeStyle = `hsla(210, 100%, 95%, ${intensity * 0.5})`;
    ctx.lineWidth = 0.5 * DPR;
    ctx.stroke();
  }

  // Occasional bright flash spots
  const flashSeed = Math.floor(time * 5);
  for (let f = 0; f < 2; f++) {
    const fAngle = ((flashSeed * 0.7 + f * 3.3) % 1) * Math.PI * 2;
    const flash = Math.max(0, Math.sin(time * 15 + f * 7));
    if (flash > 0.7) {
      const fx = cx + Math.cos(fAngle) * baseRadius;
      const fy = cy + Math.sin(fAngle) * baseRadius;
      const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 8 * DPR);
      fg.addColorStop(0, `hsla(200, 100%, 90%, ${(flash - 0.7) * 2})`);
      fg.addColorStop(1, `hsla(213, 100%, 60%, 0)`);
      ctx.beginPath();
      ctx.arc(fx, fy, 8 * DPR, 0, Math.PI * 2);
      ctx.fillStyle = fg;
      ctx.fill();
    }
  }
}

// ─── MYTHIC: Purple swirling magical mist ───
function drawMythic(ctx: CanvasRenderingContext2D, cx: number, cy: number, baseRadius: number, time: number, particles: Particle[]) {
  // Purple ring
  const steps = 64;
  for (let i = 0; i < steps; i++) {
    const a0 = (i / steps) * Math.PI * 2;
    const a1 = ((i + 1.5) / steps) * Math.PI * 2;
    const swirl = 0.5 + 0.5 * Math.sin(time * 1.5 + a0 * 3);
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius, a0, a1);
    ctx.strokeStyle = `hsla(${275 + swirl * 15}, 70%, ${50 + swirl * 15}%, ${0.35 + swirl * 0.35})`;
    ctx.lineWidth = (2 + swirl * 1.5) * DPR;
    ctx.stroke();
  }

  // Swirling mist glow
  const breathe = 0.5 + 0.5 * Math.sin(time * 0.9);
  const glowR = baseRadius + (10 + breathe * 8) * DPR;
  const grad = ctx.createRadialGradient(cx, cy, baseRadius - 4, cx, cy, glowR);
  grad.addColorStop(0, `hsla(280, 70%, 55%, ${0.08 + breathe * 0.06})`);
  grad.addColorStop(0.5, `hsla(270, 60%, 45%, ${0.04 + breathe * 0.03})`);
  grad.addColorStop(1, `hsla(285, 50%, 40%, 0)`);
  ctx.beginPath();
  ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Mist particles — slow, wispy, rotating
  for (const p of particles) {
    p.angle += p.speed * 0.007;
    p.life += 1;
    if (p.life > p.maxLife) {
      p.life = 0;
      p.opacity = 0.3 + Math.random() * 0.4;
      p.radius = baseRadius + (Math.random() - 0.5) * 10;
    }
    const lifeFrac = p.life / p.maxLife;
    const fade = lifeFrac < 0.2 ? lifeFrac / 0.2 : lifeFrac > 0.7 ? (1 - lifeFrac) / 0.3 : 1;
    const wobble = Math.sin(time * 0.8 + p.angle * 2) * 6;
    const px = cx + Math.cos(p.angle) * (p.radius + wobble);
    const py = cy + Math.sin(p.angle) * (p.radius + wobble);
    const s = p.size * DPR * (1 + Math.sin(time + p.angle) * 0.3);

    // Misty halo — large, soft
    ctx.beginPath();
    ctx.arc(px, py, s * 4, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(280, 60%, 60%, ${p.opacity * fade * 0.06})`;
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(px, py, s, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${275 + Math.sin(p.angle) * 10}, 65%, 70%, ${p.opacity * fade * 0.5})`;
    ctx.fill();
  }
}

// ─── IMMORTAL: Divine goddess light ───
function drawImmortal(ctx: CanvasRenderingContext2D, cx: number, cy: number, baseRadius: number, time: number, particles: Particle[]) {
  const ringWidth = 2.5 * DPR;
  const steps = 64;
  for (let i = 0; i < steps; i++) {
    const a0 = (i / steps) * Math.PI * 2;
    const a1 = ((i + 1.5) / steps) * Math.PI * 2;
    const wave = 0.5 + 0.5 * Math.sin(time * 1.2 + a0 * 2);
    const lightness = 82 + wave * 12;
    const alpha = 0.5 + wave * 0.4;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius, a0, a1);
    ctx.strokeStyle = `hsla(45, 30%, ${lightness}%, ${alpha})`;
    ctx.lineWidth = ringWidth + wave * 1.5 * DPR;
    ctx.stroke();
  }

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

    ctx.beginPath();
    ctx.arc(px, py, s * 3, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(45, 30%, 92%, ${p.opacity * fade * 0.1})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(px, py, s, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 20%, 94%, ${p.opacity * fade * 0.7})`;
    ctx.fill();
  }
}

// ─── GRANDMASTER: Fire flames ───
function drawGrandmaster(ctx: CanvasRenderingContext2D, cx: number, cy: number, baseRadius: number, time: number, particles: Particle[]) {
  const steps = 80;
  const ringWidth = 2.5 * DPR;
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const a1 = ((i + 1.5) / steps) * Math.PI * 2;
    const flicker = Math.sin(time * 8 + i * 0.7) * 0.3 + Math.sin(time * 13 + i * 1.3) * 0.2;
    const hue = 5 + flicker * 20;
    const lightness = 50 + flicker * 15;
    const alpha = 0.6 + flicker * 0.3;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius, a, a1);
    ctx.strokeStyle = `hsla(${hue}, 100%, ${lightness}%, ${alpha})`;
    ctx.lineWidth = ringWidth + Math.max(0, flicker) * 2 * DPR;
    ctx.stroke();
  }

  const pulse = 0.5 + 0.5 * Math.sin(time * 2.5);
  const glowGrad = ctx.createRadialGradient(cx, cy, baseRadius - 4, cx, cy, baseRadius + (10 + pulse * 6) * DPR);
  glowGrad.addColorStop(0, `hsla(10, 100%, 55%, ${0.1 + pulse * 0.06})`);
  glowGrad.addColorStop(0.5, `hsla(20, 100%, 45%, ${0.05 + pulse * 0.03})`);
  glowGrad.addColorStop(1, `hsla(0, 80%, 40%, 0)`);
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius + 16 * DPR, 0, Math.PI * 2);
  ctx.fillStyle = glowGrad;
  ctx.fill();

  for (const p of particles) {
    p.angle += p.speed * 0.012;
    p.life += 1;
    if (p.life > p.maxLife) {
      p.life = 0;
      p.opacity = 0.5 + Math.random() * 0.5;
      p.radius = baseRadius + (Math.random() - 0.5) * 4;
      p.hue = -5 + Math.random() * 35;
      p.size = 1.5 + Math.random() * 3;
    }
    const lifeFrac = p.life / p.maxLife;
    const fade = lifeFrac < 0.1 ? lifeFrac / 0.1 : lifeFrac > 0.6 ? (1 - lifeFrac) / 0.4 : 1;
    const riseOffset = lifeFrac * 10 * DPR;
    const flameWobble = Math.sin(time * 6 + p.angle * 8) * 3;
    const px = cx + Math.cos(p.angle) * (p.radius + riseOffset + flameWobble);
    const py = cy + Math.sin(p.angle) * (p.radius + riseOffset + flameWobble);
    const ageHue = p.hue - lifeFrac * 15;
    const ageLightness = 65 - lifeFrac * 20;
    const s = p.size * DPR * (1 - lifeFrac * 0.4);

    ctx.beginPath();
    ctx.arc(px, py, s * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${ageHue}, 100%, ${ageLightness}%, ${p.opacity * fade * 0.12})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(px, py, s, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${ageHue}, 100%, ${ageLightness}%, ${p.opacity * fade * 0.8})`;
    ctx.fill();
  }
}

// ─── Main Component ───
const TierRingCanvas = ({ tier, size }: TierRingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const canvasSize = size + 40;
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

    switch (tier) {
      case "newbie":
        drawNewbie(ctx, cx, cy, baseRadius, time);
        break;
      case "master":
        if (particlesRef.current.length === 0) particlesRef.current = createParticles(20, baseRadius, { hue: 210, size: 0.8 + Math.random() * 1.5, speed: 0.1 + Math.random() * 0.2 });
        drawMaster(ctx, cx, cy, baseRadius, time, particlesRef.current);
        break;
      case "legend":
        drawLegend(ctx, cx, cy, baseRadius, time);
        break;
      case "elite":
        drawElite(ctx, cx, cy, baseRadius, time);
        break;
      case "mythic":
        if (particlesRef.current.length === 0) particlesRef.current = createParticles(35, baseRadius, { hue: 280, size: 1.5 + Math.random() * 2.5, speed: 0.08 + Math.random() * 0.2 });
        drawMythic(ctx, cx, cy, baseRadius, time, particlesRef.current);
        break;
      case "grandmaster":
        if (particlesRef.current.length === 0) particlesRef.current = createParticles(50, baseRadius, { hue: 10, size: 1.5 + Math.random() * 3, speed: 0.2 + Math.random() * 0.4 });
        drawGrandmaster(ctx, cx, cy, baseRadius, time, particlesRef.current);
        break;
      case "immortal":
        if (particlesRef.current.length === 0) particlesRef.current = createParticles(40, baseRadius, { hue: 40 + Math.random() * 20, size: 0.8 + Math.random() * 2, speed: 0.15 + Math.random() * 0.35 });
        drawImmortal(ctx, cx, cy, baseRadius, time, particlesRef.current);
        break;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [tier, canvasSize, baseRadius]);

  useEffect(() => {
    particlesRef.current = [];
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

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
