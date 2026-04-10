import { useEffect, useRef } from "react";
import type { BadgeTier } from "@/components/BadgeCard";

interface TierRingCanvasProps {
  tier: BadgeTier;
  size: number;
}

interface RingParticle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  alpha: number;
  wobble: number;
}

const DPR = typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1;
const TWO_PI = Math.PI * 2;

const TIER_STYLES: Record<BadgeTier, {
  hue: number;
  saturation: number;
  lightness: number;
  speed: number;
  particleCount: number;
  glowAlpha: number;
}> = {
  newbie: { hue: 25, saturation: 65, lightness: 54, speed: 0.9, particleCount: 0, glowAlpha: 0.16 },
  master: { hue: 210, saturation: 18, lightness: 82, speed: 0.8, particleCount: 8, glowAlpha: 0.16 },
  legend: { hue: 44, saturation: 92, lightness: 60, speed: 0.7, particleCount: 2, glowAlpha: 0.18 },
  elite: { hue: 213, saturation: 100, lightness: 62, speed: 1.1, particleCount: 4, glowAlpha: 0.18 },
  grandmaster: { hue: 12, saturation: 92, lightness: 56, speed: 1.15, particleCount: 6, glowAlpha: 0.22 },
  mythic: { hue: 280, saturation: 80, lightness: 64, speed: 0.85, particleCount: 10, glowAlpha: 0.2 },
  immortal: { hue: 46, saturation: 48, lightness: 82, speed: 0.65, particleCount: 6, glowAlpha: 0.24 },
};

function createParticles(count: number, baseRadius: number): RingParticle[] {
  return Array.from({ length: count }, (_, index) => ({
    angle: (index / Math.max(count, 1)) * TWO_PI,
    radius: baseRadius + (Math.random() - 0.5) * 8 * DPR,
    speed: 0.18 + Math.random() * 0.35,
    size: 0.9 + Math.random() * 1.3,
    alpha: 0.25 + Math.random() * 0.4,
    wobble: 0.8 + Math.random() * 1.8,
  }));
}

function drawGlow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  hue: number,
  saturation: number,
  lightness: number,
  alpha: number,
) {
  const gradient = ctx.createRadialGradient(cx, cy, radius * 0.72, cx, cy, radius + 12 * DPR);
  gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.22})`);
  gradient.addColorStop(0.55, `hsla(${hue}, ${saturation}%, ${Math.max(lightness - 8, 20)}%, ${alpha * 0.1})`);
  gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${Math.max(lightness - 16, 16)}%, 0)`);

  ctx.beginPath();
  ctx.arc(cx, cy, radius + 12 * DPR, 0, TWO_PI);
  ctx.fillStyle = gradient;
  ctx.fill();
}

function drawRing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  time: number,
  style: (typeof TIER_STYLES)[BadgeTier],
  highlightStrength = 0.7,
) {
  const segments = 40;
  const sweep = (time * style.speed * 0.16) % 1;

  for (let i = 0; i < segments; i++) {
    const start = (i / segments) * TWO_PI;
    const end = ((i + 1.2) / segments) * TWO_PI;
    const segmentPosition = i / segments;
    const distance = Math.min(Math.abs(segmentPosition - sweep), 1 - Math.abs(segmentPosition - sweep));
    const highlight = Math.max(0, 1 - distance * 8) * highlightStrength;
    const pulse = 0.5 + 0.5 * Math.sin(time * style.speed + start * 2.4);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, start, end);
    ctx.strokeStyle = `hsla(${style.hue}, ${style.saturation}%, ${style.lightness + highlight * 18}%, ${0.18 + pulse * 0.12 + highlight * 0.58})`;
    ctx.lineWidth = (1.5 + highlight * 1.35) * DPR;
    ctx.stroke();
  }
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  hue: number,
  saturation: number,
  lightness: number,
  time: number,
  particles: RingParticle[],
) {
  particles.forEach((particle, index) => {
    const angle = particle.angle + time * particle.speed;
    const orbitRadius = particle.radius + Math.sin(time * particle.wobble + index) * 2.5 * DPR;
    const x = cx + Math.cos(angle) * orbitRadius;
    const y = cy + Math.sin(angle) * orbitRadius;
    const dotSize = particle.size * DPR;
    const shimmer = 0.55 + 0.45 * Math.sin(time * 2 + index * 1.7);

    ctx.beginPath();
    ctx.arc(x, y, dotSize * 2.3, 0, TWO_PI);
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${Math.min(lightness + 14, 96)}%, ${particle.alpha * shimmer * 0.12})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, dotSize, 0, TWO_PI);
    ctx.fillStyle = `hsla(${hue}, ${Math.max(saturation - 12, 12)}%, ${Math.min(lightness + 18, 98)}%, ${particle.alpha * shimmer})`;
    ctx.fill();
  });
}

function drawOrbitDots(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  time: number,
  hue: number,
  saturation: number,
  lightness: number,
  count: number,
  speed: number,
) {
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * TWO_PI + time * speed;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;

    ctx.beginPath();
    ctx.arc(x, y, 4 * DPR, 0, TWO_PI);
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.12)`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 1.4 * DPR, 0, TWO_PI);
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${Math.min(lightness + 12, 96)}%, 0.9)`;
    ctx.fill();
  }
}

function drawSweepDot(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  time: number,
  hue: number,
  saturation: number,
  lightness: number,
  speed: number,
) {
  const angle = time * speed;
  const x = cx + Math.cos(angle) * radius;
  const y = cy + Math.sin(angle) * radius;
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10 * DPR);
  gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${Math.min(lightness + 18, 98)}%, 0.35)`);
  gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`);

  ctx.beginPath();
  ctx.arc(x, y, 10 * DPR, 0, TWO_PI);
  ctx.fillStyle = gradient;
  ctx.fill();
}

function drawElectricArcs(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, time: number) {
  for (let index = 0; index < 3; index++) {
    const start = time * (0.55 + index * 0.08) + index * 1.9;
    const length = 0.34 + Math.sin(time * 1.3 + index) * 0.06;

    ctx.beginPath();
    ctx.arc(cx, cy, radius + 1.5 * DPR, start, start + length);
    ctx.strokeStyle = `hsla(205, 100%, 84%, ${0.35 + index * 0.1})`;
    ctx.lineWidth = (1.6 - index * 0.2) * DPR;
    ctx.stroke();
  }
}

function drawFlames(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, time: number) {
  const flameCount = 8;

  for (let index = 0; index < flameCount; index++) {
    const angle = (index / flameCount) * TWO_PI;
    const lift = (7 + (0.5 + 0.5 * Math.sin(time * 3 + index * 1.2)) * 8) * DPR;
    const spread = 0.12;
    const tipX = cx + Math.cos(angle) * (radius + lift);
    const tipY = cy + Math.sin(angle) * (radius + lift);
    const leftX = cx + Math.cos(angle - spread) * radius;
    const leftY = cy + Math.sin(angle - spread) * radius;
    const rightX = cx + Math.cos(angle + spread) * radius;
    const rightY = cy + Math.sin(angle + spread) * radius;

    const flameGradient = ctx.createLinearGradient(cx, cy, tipX, tipY);
    flameGradient.addColorStop(0, "hsla(45, 100%, 68%, 0.18)");
    flameGradient.addColorStop(0.55, "hsla(20, 100%, 56%, 0.22)");
    flameGradient.addColorStop(1, "hsla(6, 100%, 48%, 0)");

    ctx.beginPath();
    ctx.moveTo(leftX, leftY);
    ctx.quadraticCurveTo(tipX, tipY, rightX, rightY);
    ctx.fillStyle = flameGradient;
    ctx.fill();
  }
}

function drawRunes(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, time: number) {
  const runeCount = 4;

  for (let index = 0; index < runeCount; index++) {
    const angle = (index / runeCount) * TWO_PI + time * 0.4;
    const x = cx + Math.cos(angle) * (radius + 5 * DPR);
    const y = cy + Math.sin(angle) * (radius + 5 * DPR);
    const runeSize = 3 * DPR;

    ctx.beginPath();
    ctx.arc(x, y, runeSize * 2.2, 0, TWO_PI);
    ctx.fillStyle = "hsla(280, 85%, 72%, 0.08)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, runeSize, 0, TWO_PI);
    ctx.strokeStyle = "hsla(282, 80%, 80%, 0.55)";
    ctx.lineWidth = 0.9 * DPR;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x - runeSize * 0.6, y);
    ctx.lineTo(x + runeSize * 0.6, y);
    ctx.moveTo(x, y - runeSize * 0.6);
    ctx.lineTo(x, y + runeSize * 0.6);
    ctx.strokeStyle = "hsla(286, 85%, 84%, 0.45)";
    ctx.lineWidth = 0.7 * DPR;
    ctx.stroke();
  }
}

function drawImmortalOrbit(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, time: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(time * 0.2);
  ctx.scale(1, 0.42);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 9 * DPR, 0, TWO_PI);
  ctx.strokeStyle = "hsla(46, 34%, 88%, 0.24)";
  ctx.lineWidth = 1.1 * DPR;
  ctx.stroke();
  ctx.restore();

  drawSweepDot(ctx, cx, cy, radius + 9 * DPR, time, 46, 34, 90, 0.2);
}

const TierRingCanvas = ({ tier, size }: TierRingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<RingParticle[]>([]);
  const rafRef = useRef<number>(0);

  const style = TIER_STYLES[tier];
  const canvasSize = size;
  const baseRadius = size * 0.44 * DPR;

  useEffect(() => {
    particlesRef.current = createParticles(style.particleCount, baseRadius);
  }, [tier, style.particleCount, baseRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const drawFrame = (frameTime: number) => {
      const time = reduceMotion ? 0 : frameTime / 1000;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const pulse = 0.5 + 0.5 * Math.sin(time * style.speed * 1.2);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = "round";

      drawGlow(ctx, cx, cy, baseRadius, style.hue, style.saturation, style.lightness, style.glowAlpha + pulse * 0.04);
      drawRing(ctx, cx, cy, baseRadius, time, style, tier === "newbie" ? 0.45 : 0.72);

      switch (tier) {
        case "master":
          drawOrbitDots(ctx, cx, cy, baseRadius, time, 210, 22, 88, 6, 0.35);
          drawParticles(ctx, cx, cy, 210, 18, 86, time, particlesRef.current);
          break;
        case "legend":
          drawSweepDot(ctx, cx, cy, baseRadius, time, 44, 90, 72, 0.8);
          break;
        case "elite":
          drawElectricArcs(ctx, cx, cy, baseRadius, time);
          drawParticles(ctx, cx, cy, 210, 92, 74, time, particlesRef.current);
          break;
        case "grandmaster":
          drawFlames(ctx, cx, cy, baseRadius, time);
          drawParticles(ctx, cx, cy, 12, 90, 70, time, particlesRef.current);
          break;
        case "mythic":
          drawRunes(ctx, cx, cy, baseRadius, time);
          drawParticles(ctx, cx, cy, 280, 76, 72, time, particlesRef.current);
          break;
        case "immortal":
          drawImmortalOrbit(ctx, cx, cy, baseRadius, time);
          drawParticles(ctx, cx, cy, 46, 28, 92, time, particlesRef.current);
          break;
        case "newbie":
        default:
          break;
      }
    };

    if (reduceMotion) {
      drawFrame(0);
      return;
    }

    const animate = (frameTime: number) => {
      drawFrame(frameTime);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [tier, size, baseRadius, style]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize * DPR}
      height={canvasSize * DPR}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default TierRingCanvas;
