import { X, Coins, Sparkles } from "lucide-react";
import { type BadgeTier, type BadgeImageSet, imageSets } from "./BadgeCard";

interface BadgePopupProps {
  name: string;
  aura: number;
  tier: BadgeTier;
  unlocked: boolean;
  claimed?: boolean;
  imageSet?: BadgeImageSet;
  onClose: () => void;
  onClaim?: () => void;
}

const tierAuraRewards: Record<BadgeTier, number> = {
  newbie: 10,
  master: 40,
  legend: 100,
  elite: 250,
  grandmaster: 500,
  mythic: 1000,
  immortal: 2500,
};

const tierGlowColors: Record<BadgeTier, string> = {
  newbie: "168, 85%, 45%",
  master: "213, 100%, 60%",
  legend: "43, 96%, 58%",
  elite: "213, 100%, 50%",
  mythic: "281, 85%, 62%",
  grandmaster: "0, 82%, 58%",
  immortal: "48, 96%, 70%",
};

const tierAccentColors: Record<BadgeTier, string> = {
  newbie: "hsl(168 85% 45%)",
  master: "hsl(213 100% 60%)",
  legend: "hsl(43 96% 58%)",
  elite: "hsl(213 100% 50%)",
  mythic: "hsl(281 85% 62%)",
  grandmaster: "hsl(0 82% 58%)",
  immortal: "hsl(48 96% 70%)",
};

const BadgePopup = ({ name, aura, tier, unlocked, claimed = true, imageSet = "aura", onClose, onClaim }: BadgePopupProps) => {
  const tierImages = imageSets[imageSet];
  const glowHsl = tierGlowColors[tier];
  const accent = tierAccentColors[tier];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-[360px] sm:w-[420px] bg-card rounded-3xl border border-border/30 p-10 flex flex-col items-center text-center overflow-hidden animate-in zoom-in-95 fade-in duration-300"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: unlocked
            ? `0 0 60px hsl(${glowHsl} / 0.25), 0 0 120px hsl(${glowHsl} / 0.1), inset 0 0 40px hsl(${glowHsl} / 0.05)`
            : undefined,
        }}
      >
        {/* Ambient glow behind card */}
        {unlocked && (
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: accent }}
          />
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge image */}
        <div className={`relative w-40 h-40 mb-6 ${!unlocked ? "grayscale opacity-50" : ""}`}>
          {unlocked && (
            <div
              className="absolute inset-4 rounded-full blur-2xl opacity-40 animate-pulse"
              style={{ backgroundColor: accent }}
            />
          )}
          <img
            src={tierImages[tier]}
            alt={`${name} badge`}
            className="relative z-10 w-full h-full object-contain"
            style={unlocked ? { filter: `drop-shadow(0 0 24px ${accent})` } : undefined}
          />
        </div>

        {/* Sparkle decoration */}
        {unlocked && !claimed && (
          <div className="flex gap-1 mb-2">
            <Sparkles className="w-4 h-4 animate-pulse" style={{ color: accent }} />
            <Sparkles className="w-3 h-3 animate-pulse delay-150" style={{ color: accent }} />
            <Sparkles className="w-4 h-4 animate-pulse delay-300" style={{ color: accent }} />
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {unlocked && !claimed
            ? "Badge Ready to Claim!"
            : unlocked
              ? "Badge Claimed!"
              : "Badge Locked"}
        </h2>

        {/* Tier name */}
        <p className="text-base font-semibold mb-4" style={{ color: unlocked ? accent : undefined }}>
          {unlocked && !claimed
            ? `Claim your ${name} badge`
            : unlocked
              ? `You're now ${name}`
              : `Reach ${aura} aura to unlock`}
        </p>

        {/* Aura reward */}
        <div className="flex items-center gap-2 mb-5 px-4 py-2 rounded-xl bg-secondary/60">
          <Coins className="w-5 h-5" style={{ color: accent }} />
          <span className="text-foreground font-bold text-lg">+{tierAuraRewards[tier]}</span>
          <span className="text-muted-foreground text-sm">tokens</span>
        </div>

        {/* Action */}
        {unlocked && !claimed ? (
          <button
            onClick={onClaim}
            className="px-10 py-3 font-semibold text-sm rounded-full transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: accent,
              color: "hsl(0 0% 5%)",
              boxShadow: `0 0 20px hsl(${glowHsl} / 0.4)`,
            }}
          >
            🎉 Claim Tokens
          </button>
        ) : unlocked ? (
          <div className="px-6 py-2.5 bg-secondary rounded-full">
            <span className="text-muted-foreground text-sm font-medium flex items-center gap-1.5">
              ✅ Claimed
            </span>
          </div>
        ) : (
          <div className="px-6 py-2.5 bg-secondary rounded-full">
            <span className="text-muted-foreground text-sm font-medium">
              {aura - (tierAuraRewards[tier] || 0)} aura remaining
            </span>
          </div>
        )}

        {/* Date */}
        {unlocked && (
          <p className="text-xs text-muted-foreground mt-5">
            Obtained on {new Date().toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default BadgePopup;
