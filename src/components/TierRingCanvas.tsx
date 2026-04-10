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
    const baseAngle = (i / sparkleCount) * Math.PI * 2 + time * 0.3;
    const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * 1.2 + i * 1.7));
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
    p.angle += p.speed * 0.003;
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
    const wavePos = (time * 0.25) % 1; // slower sweep
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
  const waveAngle = (time * 0.25 % 1) * Math.PI * 2;
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
  const pulse = 0.5 + 0.5 * Math.sin(time * 1.5);
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
  const seed = Math.floor(time * 3); // changes 3x per second
  for (let a = 0; a < arcCount; a++) {
    const arcStart = ((seed * 0.37 + a * 2.1) % 1) * Math.PI * 2;
    const arcLen = 0.3 + ((seed * 0.13 + a) % 1) * 0.5; // radians
    const segments = 8;
    const intensity = 0.5 + 0.5 * Math.sin(time * 5 + a * 4);

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
  const flashSeed = Math.floor(time * 2);
  for (let f = 0; f < 2; f++) {
    const fAngle = ((flashSeed * 0.7 + f * 3.3) % 1) * Math.PI * 2;
    const flash = Math.max(0, Math.sin(time * 6 + f * 7));
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

// ─── MYTHIC: Purple swirling magical mist + spell effects ───
function drawMythic(ctx: CanvasRenderingContext2D, cx: number, cy: number, baseRadius: number, time: number, particles: Particle[]) {
  // Purple ring with swirl
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
  const glowR = baseRadius + (12 + breathe * 10) * DPR;
  const grad = ctx.createRadialGradient(cx, cy, baseRadius - 4, cx, cy, glowR);
  grad.addColorStop(0, `hsla(280, 70%, 55%, ${0.1 + breathe * 0.07})`);
  grad.addColorStop(0.5, `hsla(270, 60%, 45%, ${0.05 + breathe * 0.03})`);
  grad.addColorStop(1, `hsla(285, 50%, 40%, 0)`);
  ctx.beginPath();
  ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Spell runes — rotating arcane symbols (circles with crosses/lines)
  const runeCount = 6;
  const runeOrbitR = baseRadius + 6 * DPR;
  for (let r = 0; r < runeCount; r++) {
    const runeAngle = (r / runeCount) * Math.PI * 2 + time * 0.3;
    const runeFlicker = 0.3 + 0.7 * Math.abs(Math.sin(time * 1.5 + r * 2.1));
    const rx = cx + Math.cos(runeAngle) * runeOrbitR;
    const ry = cy + Math.sin(runeAngle) * runeOrbitR;
    const runeSize = (2.5 + Math.sin(time * 2 + r) * 0.8) * DPR;

    // Rune glow
    ctx.beginPath();
    ctx.arc(rx, ry, runeSize * 3, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(275, 70%, 65%, ${runeFlicker * 0.08})`;
    ctx.fill();

    // Rune circle
    ctx.beginPath();
    ctx.arc(rx, ry, runeSize, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(280, 80%, 75%, ${runeFlicker * 0.6})`;
    ctx.lineWidth = 0.8 * DPR;
    ctx.stroke();

    // Inner cross/star mark
    const rot = time * 0.8 + r * 1.05;
    for (let l = 0; l < 3; l++) {
      const la = rot + (l / 3) * Math.PI;
      ctx.beginPath();
      ctx.moveTo(rx + Math.cos(la) * runeSize * 0.7, ry + Math.sin(la) * runeSize * 0.7);
      ctx.lineTo(rx - Math.cos(la) * runeSize * 0.7, ry - Math.sin(la) * runeSize * 0.7);
      ctx.strokeStyle = `hsla(285, 70%, 80%, ${runeFlicker * 0.45})`;
      ctx.lineWidth = 0.5 * DPR;
      ctx.stroke();
    }
  }

  // Spell arcs — curved energy trails orbiting at different speeds
  for (let arc = 0; arc < 3; arc++) {
    const arcSpeed = 0.4 + arc * 0.2;
    const arcOffset = arc * 2.1;
    const arcR = baseRadius + (2 + arc * 2) * DPR;
    const arcStart = time * arcSpeed + arcOffset;
    const arcLen = 0.6 + Math.sin(time * 0.7 + arc) * 0.3;
    const arcAlpha = 0.15 + 0.15 * Math.sin(time * 1.2 + arc * 1.5);

    ctx.beginPath();
    ctx.arc(cx, cy, arcR, arcStart, arcStart + arcLen);
    ctx.strokeStyle = `hsla(${270 + arc * 10}, 80%, 70%, ${arcAlpha})`;
    ctx.lineWidth = (1.5 + Math.sin(time * 2 + arc) * 0.5) * DPR;
    ctx.stroke();

    // Bright leading edge
    const leadAngle = arcStart + arcLen;
    const leadX = cx + Math.cos(leadAngle) * arcR;
    const leadY = cy + Math.sin(leadAngle) * arcR;
    ctx.beginPath();
    ctx.arc(leadX, leadY, 2 * DPR, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(280, 80%, 85%, ${arcAlpha * 2})`;
    ctx.fill();
  }

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

    // Misty halo
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

  // Occasional spell burst — purple energy flash
  for (let b = 0; b < 2; b++) {
    const burstPhase = time * 0.35 + b * 1.8;
    const burstActive = Math.sin(burstPhase) > 0.9;
    if (burstActive) {
      const burstAngle = (burstPhase * 0.6 + b) % (Math.PI * 2);
      const bx = cx + Math.cos(burstAngle) * baseRadius;
      const by = cy + Math.sin(burstAngle) * baseRadius;
      const burstIntensity = (Math.sin(burstPhase) - 0.9) / 0.1;
      const bg = ctx.createRadialGradient(bx, by, 0, bx, by, 10 * DPR);
      bg.addColorStop(0, `hsla(280, 80%, 85%, ${burstIntensity * 0.5})`);
      bg.addColorStop(0.5, `hsla(275, 70%, 65%, ${burstIntensity * 0.2})`);
      bg.addColorStop(1, `hsla(285, 60%, 50%, 0)`);
      ctx.beginPath();
      ctx.arc(bx, by, 10 * DPR, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.fill();
    }
  }
}

// ─── IMMORTAL: Transcendent divine radiance ───
function drawImmortal(ctx: CanvasRenderingContext2D, cx: number, cy: number, baseRadius: number, time: number, particles: Particle[]) {
  // === Layer 1: Deep outer aura — large, breathing divine presence ===
  const breathe = 0.5 + 0.5 * Math.sin(time * 0.6);
  const deepGlowR = baseRadius + (28 + breathe * 14) * DPR;
  const deepGrad = ctx.createRadialGradient(cx, cy, baseRadius * 0.7, cx, cy, deepGlowR);
  deepGrad.addColorStop(0, `hsla(42, 50%, 88%, ${0.06 + breathe * 0.04})`);
  deepGrad.addColorStop(0.3, `hsla(38, 35%, 80%, ${0.04 + breathe * 0.03})`);
  deepGrad.addColorStop(0.6, `hsla(45, 25%, 75%, ${0.02 + breathe * 0.015})`);
  deepGrad.addColorStop(1, `hsla(40, 20%, 70%, 0)`);
  ctx.beginPath();
  ctx.arc(cx, cy, deepGlowR, 0, Math.PI * 2);
  ctx.fillStyle = deepGrad;
  ctx.fill();

  // === Layer 2: Rotating light rays emanating outward ===
  const rayCount = 12;
  for (let r = 0; r < rayCount; r++) {
    const rayAngle = (r / rayCount) * Math.PI * 2 + time * 0.15;
    const rayIntensity = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.7 + r * 1.1));
    const rayLen = (16 + rayIntensity * 10) * DPR;
    const innerR = baseRadius - 2 * DPR;
    const outerR = baseRadius + rayLen;

    const spread = 0.04 + rayIntensity * 0.02;
    const x1 = cx + Math.cos(rayAngle - spread) * innerR;
    const y1 = cy + Math.sin(rayAngle - spread) * innerR;
    const x2 = cx + Math.cos(rayAngle + spread) * innerR;
    const y2 = cy + Math.sin(rayAngle + spread) * innerR;
    const x3 = cx + Math.cos(rayAngle) * outerR;
    const y3 = cy + Math.sin(rayAngle) * outerR;

    const rayGrad = ctx.createLinearGradient(
      cx + Math.cos(rayAngle) * innerR, cy + Math.sin(rayAngle) * innerR,
      x3, y3
    );
    rayGrad.addColorStop(0, `hsla(45, 40%, 92%, ${rayIntensity * 0.2})`);
    rayGrad.addColorStop(1, `hsla(42, 30%, 85%, 0)`);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.fillStyle = rayGrad;
    ctx.fill();
  }

  // === Layer 3: Primary ring — flowing brightness with double wave ===
  const steps = 96;
  const ringWidth = 3 * DPR;
  for (let i = 0; i < steps; i++) {
    const a0 = (i / steps) * Math.PI * 2;
    const a1 = ((i + 1.5) / steps) * Math.PI * 2;
    const wave1 = 0.5 + 0.5 * Math.sin(time * 1.4 + a0 * 2);
    const wave2 = 0.5 + 0.5 * Math.sin(time * 0.9 - a0 * 3 + 1.5);
    const combined = wave1 * 0.6 + wave2 * 0.4;
    const lightness = 80 + combined * 16;
    const alpha = 0.5 + combined * 0.45;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius, a0, a1);
    ctx.strokeStyle = `hsla(45, 35%, ${lightness}%, ${alpha})`;
    ctx.lineWidth = ringWidth + combined * 2 * DPR;
    ctx.stroke();
  }

  // === Layer 4: Inner shimmer ring (second thinner ring inside) ===
  const innerRing = baseRadius - 4 * DPR;
  for (let i = 0; i < 48; i++) {
    const a0 = (i / 48) * Math.PI * 2;
    const a1 = ((i + 1.5) / 48) * Math.PI * 2;
    const shimmer = 0.5 + 0.5 * Math.sin(time * 2 + a0 * 4);
    ctx.beginPath();
    ctx.arc(cx, cy, innerRing, a0, a1);
    ctx.strokeStyle = `hsla(48, 25%, 90%, ${shimmer * 0.2})`;
    ctx.lineWidth = 1 * DPR;
    ctx.stroke();
  }

  // === Layer 5: Bright glow halo ===
  const glowRadius = baseRadius + (14 + breathe * 8) * DPR;
  const gradient = ctx.createRadialGradient(cx, cy, baseRadius - 3, cx, cy, glowRadius);
  gradient.addColorStop(0, `hsla(45, 50%, 92%, ${0.15 + breathe * 0.1})`);
  gradient.addColorStop(0.35, `hsla(42, 35%, 88%, ${0.08 + breathe * 0.05})`);
  gradient.addColorStop(1, `hsla(40, 25%, 82%, 0)`);
  ctx.beginPath();
  ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  // === Layer 5b: Jupiter-style orbital ring ===
  ctx.save();
  ctx.translate(cx, cy);
  const orbitTilt = 0.28; // flattening factor for perspective
  const orbitRadius = baseRadius + 14 * DPR;
  const orbitRotation = time * 0.2; // slow rotation
  ctx.rotate(orbitRotation);
  ctx.scale(1, orbitTilt);
  
  // Ring segments with varying brightness
  const orbitSteps = 120;
  for (let i = 0; i < orbitSteps; i++) {
    const oa0 = (i / orbitSteps) * Math.PI * 2;
    const oa1 = ((i + 1.5) / orbitSteps) * Math.PI * 2;
    const shimmer = 0.5 + 0.5 * Math.sin(time * 1.0 + oa0 * 3);
    const alpha = 0.15 + shimmer * 0.25;
    const lightness = 78 + shimmer * 14;
    ctx.beginPath();
    ctx.arc(0, 0, orbitRadius, oa0, oa1);
    ctx.strokeStyle = `hsla(42, 30%, ${lightness}%, ${alpha})`;
    ctx.lineWidth = (1.5 + shimmer * 1) * DPR;
    ctx.stroke();
  }
  
  // Second thinner outer orbit
  const orbit2R = orbitRadius + 4 * DPR;
  for (let i = 0; i < 60; i++) {
    const oa0 = (i / 60) * Math.PI * 2;
    const oa1 = ((i + 1.5) / 60) * Math.PI * 2;
    const shimmer = 0.5 + 0.5 * Math.sin(time * 0.8 - oa0 * 2);
    ctx.beginPath();
    ctx.arc(0, 0, orbit2R, oa0, oa1);
    ctx.strokeStyle = `hsla(45, 25%, 85%, ${shimmer * 0.12})`;
    ctx.lineWidth = 0.8 * DPR;
    ctx.stroke();
  }
  ctx.restore();

  for (const p of particles) {
    p.angle += p.speed * 0.009;
    p.life += 1;
    if (p.life > p.maxLife) {
      p.life = 0;
      p.opacity = 0.4 + Math.random() * 0.5;
      p.radius = baseRadius + (Math.random() - 0.5) * 10;
    }
    const lifeFrac = p.life / p.maxLife;
    const fade = lifeFrac < 0.15 ? lifeFrac / 0.15 : lifeFrac > 0.7 ? (1 - lifeFrac) / 0.3 : 1;
    const wobble = Math.sin(time * 1.2 + p.angle * 3) * 5;
    const vertDrift = Math.cos(time * 0.8 + p.angle * 2) * 3;
    const px = cx + Math.cos(p.angle) * (p.radius + wobble);
    const py = cy + Math.sin(p.angle) * (p.radius + wobble + vertDrift);
    const pulse = 0.7 + Math.sin(time * 3.5 + p.angle * 6) * 0.3;
    const s = p.size * DPR * pulse;

    // Large soft halo
    ctx.beginPath();
    ctx.arc(px, py, s * 4, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(45, 35%, 92%, ${p.opacity * fade * 0.08})`;
    ctx.fill();

    // Medium glow
    ctx.beginPath();
    ctx.arc(px, py, s * 2, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(43, 30%, 94%, ${p.opacity * fade * 0.15})`;
    ctx.fill();

    // Bright white-gold core
    ctx.beginPath();
    ctx.arc(px, py, s, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(48, 20%, 97%, ${p.opacity * fade * 0.85})`;
    ctx.fill();
  }

  // === Layer 7: Occasional bright flare bursts at random points ===
  for (let f = 0; f < 3; f++) {
    const flarePhase = time * 0.4 + f * 2.1;
    const flareActive = Math.sin(flarePhase) > 0.85;
    if (flareActive) {
      const flareAngle = (flarePhase * 0.7 + f) % (Math.PI * 2);
      const fx = cx + Math.cos(flareAngle) * baseRadius;
      const fy = cy + Math.sin(flareAngle) * baseRadius;
      const flareIntensity = (Math.sin(flarePhase) - 0.85) / 0.15;
      const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 12 * DPR);
      fg.addColorStop(0, `hsla(45, 40%, 98%, ${flareIntensity * 0.6})`);
      fg.addColorStop(0.4, `hsla(42, 35%, 90%, ${flareIntensity * 0.2})`);
      fg.addColorStop(1, `hsla(40, 25%, 85%, 0)`);
      ctx.beginPath();
      ctx.arc(fx, fy, 12 * DPR, 0, Math.PI * 2);
      ctx.fillStyle = fg;
      ctx.fill();
    }
  }

  // === Layer 8: Lightning strikes — divine energy bolts ===
  const boltCount = 4;
  for (let b = 0; b < boltCount; b++) {
    // Each bolt has its own timing cycle — visible briefly then fades
    const boltCycle = time * 0.6 + b * 1.7;
    const boltPhase = boltCycle % 3; // 3-second cycle per bolt
    const isActive = boltPhase < 0.15; // visible for 0.15s (~flash)
    if (!isActive) continue;

    const boltAlpha = 1 - boltPhase / 0.15; // fade out during the flash
    const boltAngle = ((Math.floor(boltCycle / 3) * 2.39 + b * 1.57) % 1) * Math.PI * 2;

    // Start from ring, strike outward
    const startR = baseRadius;
    const strikeLen = (18 + Math.sin(boltCycle * 7) * 8) * DPR;
    const segments = 6;

    ctx.beginPath();
    let prevX = cx + Math.cos(boltAngle) * startR;
    let prevY = cy + Math.sin(boltAngle) * startR;
    ctx.moveTo(prevX, prevY);

    for (let s = 1; s <= segments; s++) {
      const t = s / segments;
      const r = startR + t * strikeLen;
      // Jagged lateral offset for lightning look
      const jag = (Math.sin(Math.floor(boltCycle * 30) * 13 + s * 7 + b * 11) * 0.5 + 0.5 - 0.5) * 8 * DPR;
      const perpAngle = boltAngle + Math.PI / 2;
      const px = cx + Math.cos(boltAngle) * r + Math.cos(perpAngle) * jag;
      const py = cy + Math.sin(boltAngle) * r + Math.sin(perpAngle) * jag;
      ctx.lineTo(px, py);
      prevX = px;
      prevY = py;
    }

    // Bright white-gold bolt
    ctx.strokeStyle = `hsla(45, 30%, 95%, ${boltAlpha * 0.9})`;
    ctx.lineWidth = 2 * DPR;
    ctx.stroke();

    // Softer glow stroke
    ctx.strokeStyle = `hsla(42, 40%, 85%, ${boltAlpha * 0.35})`;
    ctx.lineWidth = 5 * DPR;
    ctx.stroke();

    // Flash at strike origin
    const originGlow = ctx.createRadialGradient(
      cx + Math.cos(boltAngle) * startR, cy + Math.sin(boltAngle) * startR, 0,
      cx + Math.cos(boltAngle) * startR, cy + Math.sin(boltAngle) * startR, 10 * DPR
    );
    originGlow.addColorStop(0, `hsla(45, 50%, 98%, ${boltAlpha * 0.7})`);
    originGlow.addColorStop(1, `hsla(42, 30%, 90%, 0)`);
    ctx.beginPath();
    ctx.arc(cx + Math.cos(boltAngle) * startR, cy + Math.sin(boltAngle) * startR, 10 * DPR, 0, Math.PI * 2);
    ctx.fillStyle = originGlow;
    ctx.fill();
  }
}

// ─── GRANDMASTER: Fire flames ───
function drawGrandmaster(ctx: CanvasRenderingContext2D, cx: number, cy: number, baseRadius: number, time: number, particles: Particle[]) {
  // Flickering fire ring
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

  // Outer ember glow — only outside the ring, not filling center
  const pulse = 0.5 + 0.5 * Math.sin(time * 2.5);
  const glowGrad = ctx.createRadialGradient(cx, cy, baseRadius, cx, cy, baseRadius + (20 + pulse * 10) * DPR);
  glowGrad.addColorStop(0, `hsla(10, 100%, 55%, ${0.15 + pulse * 0.1})`);
  glowGrad.addColorStop(0.5, `hsla(20, 100%, 45%, ${0.06 + pulse * 0.04})`);
  glowGrad.addColorStop(1, `hsla(0, 80%, 40%, 0)`);
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius + 30 * DPR, 0, Math.PI * 2);
  ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2, true); // cut out the center
  ctx.fillStyle = glowGrad;
  ctx.fill();

  // Flame tongues — taller, more dramatic, more of them
  const flameCount = 22;
  for (let f = 0; f < flameCount; f++) {
    const baseAngle = (f / flameCount) * Math.PI * 2;
    const flameSpeed = Math.sin(time * 6 + f * 2.3) * 0.5 + Math.sin(time * 10 + f * 3.7) * 0.3;
    const flameHeight = (14 + flameSpeed * 16 + Math.abs(Math.sin(time * 4 + f * 1.1)) * 12) * DPR;
    const flameWidth = 0.07 + Math.abs(flameSpeed) * 0.04;
    const flameAlpha = 0.35 + Math.abs(flameSpeed) * 0.55;

    const tipX = cx + Math.cos(baseAngle) * (baseRadius + flameHeight);
    const tipY = cy + Math.sin(baseAngle) * (baseRadius + flameHeight);
    const lx = cx + Math.cos(baseAngle - flameWidth) * baseRadius;
    const ly = cy + Math.sin(baseAngle - flameWidth) * baseRadius;
    const rx = cx + Math.cos(baseAngle + flameWidth) * baseRadius;
    const ry = cy + Math.sin(baseAngle + flameWidth) * baseRadius;

    const flameGrad = ctx.createLinearGradient(
      cx + Math.cos(baseAngle) * baseRadius, cy + Math.sin(baseAngle) * baseRadius,
      tipX, tipY
    );
    flameGrad.addColorStop(0, `hsla(50, 100%, 70%, ${flameAlpha * 0.8})`);
    flameGrad.addColorStop(0.3, `hsla(30, 100%, 55%, ${flameAlpha * 0.6})`);
    flameGrad.addColorStop(0.7, `hsla(10, 100%, 45%, ${flameAlpha * 0.3})`);
    flameGrad.addColorStop(1, `hsla(0, 90%, 35%, ${flameAlpha * 0.05})`);

    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.quadraticCurveTo(tipX, tipY, rx, ry);
    ctx.fillStyle = flameGrad;
    ctx.fill();
  }

  // Secondary smaller inner flames for density
  for (let f = 0; f < 14; f++) {
    const baseAngle = (f / 14) * Math.PI * 2 + 0.15;
    const flicker = Math.sin(time * 12 + f * 4.1) * 0.5 + 0.5;
    const h = (6 + flicker * 8) * DPR;
    const w = 0.04;
    const tipX = cx + Math.cos(baseAngle) * (baseRadius + h);
    const tipY = cy + Math.sin(baseAngle) * (baseRadius + h);
    const lx = cx + Math.cos(baseAngle - w) * baseRadius;
    const ly = cy + Math.sin(baseAngle - w) * baseRadius;
    const rx = cx + Math.cos(baseAngle + w) * baseRadius;
    const ry = cy + Math.sin(baseAngle + w) * baseRadius;
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.quadraticCurveTo(tipX, tipY, rx, ry);
    ctx.fillStyle = `hsla(40, 100%, 65%, ${flicker * 0.4})`;
    ctx.fill();
  }

  // Fire ember particles — rising outward
  for (const p of particles) {
    p.angle += p.speed * 0.012;
    p.life += 1;
    if (p.life > p.maxLife) {
      p.life = 0;
      p.opacity = 0.5 + Math.random() * 0.5;
      p.radius = baseRadius + 2 + Math.random() * 6;
      p.hue = -5 + Math.random() * 35;
      p.size = 1.5 + Math.random() * 3;
    }
    const lifeFrac = p.life / p.maxLife;
    const fade = lifeFrac < 0.1 ? lifeFrac / 0.1 : lifeFrac > 0.5 ? (1 - lifeFrac) / 0.5 : 1;
    const riseOffset = lifeFrac * 18 * DPR;
    const flameWobble = Math.sin(time * 7 + p.angle * 8) * 4;
    const px = cx + Math.cos(p.angle) * (p.radius + riseOffset + flameWobble);
    const py = cy + Math.sin(p.angle) * (p.radius + riseOffset + flameWobble);
    const ageHue = p.hue - lifeFrac * 15;
    const ageLightness = 65 - lifeFrac * 20;
    const s = p.size * DPR * (1 - lifeFrac * 0.4);

    ctx.beginPath();
    ctx.arc(px, py, s * 3, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${ageHue}, 100%, ${ageLightness}%, ${p.opacity * fade * 0.1})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(px, py, s, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${ageHue}, 100%, ${ageLightness}%, ${p.opacity * fade * 0.8})`;
    ctx.fill();
  }
}

// ─── Main Component ───
const TierRingCanvas = ({ tier }: { tier: BadgeTier }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const parentW = parentRect.width;
    const parentH = parentRect.height;
    const canvasRect = canvas.getBoundingClientRect();
    const canvasW = canvasRect.width;
    const canvasH = canvasRect.height;

    // Resize canvas buffer if changed
    if (sizeRef.current.w !== canvasW || sizeRef.current.h !== canvasH) {
      sizeRef.current = { w: canvasW, h: canvasH };
      canvas.width = canvasW * DPR;
      canvas.height = canvasH * DPR;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Center of canvas
    const cx = (canvasW * DPR) / 2;
    const cy = (canvasH * DPR) / 2;
    // Base radius matches the PARENT size (the avatar), not the expanded canvas
    const baseRadius = (Math.min(parentW, parentH) / 2 - 2) * DPR;
    const time = performance.now() / 1000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (tier) {
      case "newbie":
        drawNewbie(ctx, cx, cy, baseRadius, time);
        break;
      case "master":
        if (particlesRef.current.length === 0) particlesRef.current = createParticles(20, baseRadius, 210, 0.8, 2.3, 0.1, 0.3);
        drawMaster(ctx, cx, cy, baseRadius, time, particlesRef.current);
        break;
      case "legend":
        drawLegend(ctx, cx, cy, baseRadius, time);
        break;
      case "elite":
        drawElite(ctx, cx, cy, baseRadius, time);
        break;
      case "mythic":
        if (particlesRef.current.length === 0) particlesRef.current = createParticles(35, baseRadius, 280, 1.5, 4, 0.08, 0.28);
        drawMythic(ctx, cx, cy, baseRadius, time, particlesRef.current);
        break;
      case "grandmaster":
        if (particlesRef.current.length === 0) particlesRef.current = createParticles(50, baseRadius, 10, 1.5, 4.5, 0.2, 0.6);
        drawGrandmaster(ctx, cx, cy, baseRadius, time, particlesRef.current);
        break;
      case "immortal":
        if (particlesRef.current.length === 0) particlesRef.current = createParticles(40, baseRadius, 45, 0.8, 2.8, 0.15, 0.5);
        drawImmortal(ctx, cx, cy, baseRadius, time, particlesRef.current);
        break;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [tier]);

  useEffect(() => {
    particlesRef.current = [];
    sizeRef.current = { w: 0, h: 0 };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none"
      style={{ zIndex: 2, inset: '-20%', width: '140%', height: '140%' }}
    />
  );
};

export default TierRingCanvas;
