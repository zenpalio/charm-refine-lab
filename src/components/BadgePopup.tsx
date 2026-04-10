import { X, Coins, Sparkles, Star, Zap } from "lucide-react";
import { type BadgeTier, type BadgeImageSet, imageSets } from "./BadgeCard";
import AuraIcon from "./AuraIcon";

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

const tierEmojis: Record<BadgeTier, string> = {
  newbie: "🌱",
  master: "⚔️",
  legend: "👑",
  elite: "💎",
  mythic: "🔮",
  grandmaster: "🏆",
  immortal: "✨",
};

const BadgePopup = ({ name, aura, tier, unlocked, claimed = true, imageSet = "aura", onClose, onClaim }: BadgePopupProps) => {
  const tierImages = imageSets[imageSet];
  const glowHsl = tierGlowColors[tier];
  const accent = tierAccentColors[tier];
  const emoji = tierEmojis[tier];
  const isClaimable = unlocked && !claimed;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md" onClick={onClose}>
      <div
        className="relative w-[340px] sm:w-[400px] bg-card rounded-3xl border border-border/20 p-8 pt-6 flex flex-col items-center text-center overflow-hidden animate-in zoom-in-90 fade-in duration-500"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: unlocked
            ? `0 0 80px hsl(${glowHsl} / 0.3), 0 0 160px hsl(${glowHsl} / 0.12), inset 0 1px 0 hsl(${glowHsl} / 0.15)`
            : "0 25px 50px hsl(0 0% 0% / 0.3)",
        }}
      >
        {/* Animated radial burst background */}
        {unlocked && (
          <>
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[100px] pointer-events-none animate-pulse"
              style={{ backgroundColor: accent, opacity: 0.2 }}
            />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-[60px] pointer-events-none"
              style={{ backgroundColor: accent, opacity: 0.15, animationDuration: "3s" }}
            />
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full pointer-events-none animate-bounce"
                style={{
                  backgroundColor: accent,
                  opacity: 0.4 + (i * 0.1),
                  left: `${15 + (i * 13)}%`,
                  top: `${10 + ((i * 17) % 60)}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + (i * 0.4)}s`,
                }}
              />
            ))}
          </>
        )}

        {/* Decorative top accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-24 rounded-full"
          style={{
            background: unlocked
              ? `linear-gradient(90deg, transparent, ${accent}, transparent)`
              : "linear-gradient(90deg, transparent, hsl(var(--muted-foreground) / 0.3), transparent)",
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-muted-foreground hover:text-foreground transition-colors z-10 rounded-full hover:bg-secondary"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Status chips row */}
        <div className="flex items-center gap-2 mb-5 mt-1">
          {isClaimable && (
            <div
              className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider animate-pulse"
              style={{
                backgroundColor: `hsl(${glowHsl} / 0.15)`,
                color: accent,
                border: `1px solid hsl(${glowHsl} / 0.3)`,
              }}
            >
              <Zap className="w-3 h-3" />
              Ready to claim
            </div>
          )}
          {unlocked && claimed && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary text-muted-foreground">
              <Star className="w-3 h-3" />
              Collected
            </div>
          )}
          {!unlocked && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary/60 text-muted-foreground">
              🔒 Locked
            </div>
          )}
        </div>

        {/* Badge image with enhanced effects */}
        <div className={`relative w-36 h-36 mb-5 ${!unlocked ? "grayscale opacity-40" : ""}`}>
          {/* Rotating ring effect for claimable */}
          {isClaimable && (
            <div
              className="absolute -inset-3 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent, hsl(${glowHsl} / 0.4), transparent, hsl(${glowHsl} / 0.2), transparent)`,
                animation: "spin 4s linear infinite",
              }}
            />
          )}
          {/* Glow behind badge */}
          {unlocked && (
            <div
              className="absolute inset-2 rounded-full blur-2xl animate-pulse"
              style={{ backgroundColor: accent, opacity: isClaimable ? 0.5 : 0.25, animationDuration: "2s" }}
            />
          )}
          <img
            src={tierImages[tier]}
            alt={`${name} badge`}
            className="relative z-10 w-full h-full object-contain transition-transform duration-500"
            style={{
              filter: unlocked ? `drop-shadow(0 0 20px hsl(${glowHsl} / 0.5))` : undefined,
              animation: isClaimable ? "bounce 2s ease-in-out infinite" : undefined,
            }}
          />
          {/* Sparkle accents around badge */}
          {isClaimable && (
            <>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 animate-ping z-20" style={{ color: accent, animationDuration: "2s" }} />
              <Sparkles className="absolute -bottom-1 -left-1 w-3 h-3 animate-ping z-20" style={{ color: accent, animationDuration: "2.5s", animationDelay: "0.5s" }} />
              <Star className="absolute top-0 -left-2 w-3 h-3 animate-pulse z-20" style={{ color: accent, animationDelay: "1s" }} />
            </>
          )}
        </div>

        {/* Tier emoji + name */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{emoji}</span>
          <h2 className="text-xl font-black text-foreground uppercase tracking-wide">
            {name}
          </h2>
          <span className="text-2xl">{emoji}</span>
        </div>

        {/* Subtitle */}
        <p className="text-sm mb-4" style={{ color: unlocked ? accent : "hsl(var(--muted-foreground))" }}>
          {isClaimable
            ? "Your badge is ready! Claim your reward"
            : unlocked
              ? "You've earned this badge"
              : `Reach ${aura} tokens to unlock`}
        </p>

        {/* Token reward card */}
        <div
          className="flex items-center gap-3 mb-5 px-5 py-3 rounded-2xl border"
          style={{
            background: unlocked
              ? `linear-gradient(135deg, hsl(${glowHsl} / 0.1), hsl(${glowHsl} / 0.03))`
              : "hsl(var(--secondary) / 0.5)",
            borderColor: unlocked ? `hsl(${glowHsl} / 0.2)` : "hsl(var(--border) / 0.3)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: unlocked ? `hsl(${glowHsl} / 0.15)` : "hsl(var(--secondary))",
            }}
          >
            <AuraIcon className="w-5 h-5" style={{ color: unlocked ? accent : "hsl(var(--muted-foreground))" }} />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-foreground font-black text-lg leading-tight">+{aura}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Token Reward</span>
          </div>
        </div>

        {/* Action button */}
        {isClaimable ? (
          <button
            onClick={onClaim}
            className="w-full px-8 py-3.5 font-bold text-sm rounded-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${accent}, hsl(${glowHsl} / 0.8))`,
              color: "hsl(0 0% 5%)",
              boxShadow: `0 4px 20px hsl(${glowHsl} / 0.4), 0 0 40px hsl(${glowHsl} / 0.15)`,
            }}
          >
            <Sparkles className="w-4 h-4" />
            Claim Tokens
            <Sparkles className="w-4 h-4" />
          </button>
        ) : unlocked ? (
          <div className="w-full px-6 py-3 bg-secondary/60 rounded-2xl flex items-center justify-center gap-2">
            <span className="text-muted-foreground text-sm font-semibold flex items-center gap-1.5">
              ✅ Collected
            </span>
          </div>
        ) : (
          <div className="w-full px-6 py-3 bg-secondary/40 rounded-2xl flex flex-col items-center gap-1.5">
            <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: "30%",
                  background: `linear-gradient(90deg, ${accent}, hsl(${glowHsl} / 0.6))`,
                }}
              />
            </div>
            <span className="text-muted-foreground text-[11px] font-medium">
              {aura} more tokens needed
            </span>
          </div>
        )}

        {/* Footer info */}
        {unlocked && (
          <p className="text-[10px] text-muted-foreground/60 mt-4 uppercase tracking-widest">
            {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        )}
      </div>
    </div>
  );
};

export default BadgePopup;
