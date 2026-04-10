import { X, Coins } from "lucide-react";
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

const BadgePopup = ({ name, aura, tier, unlocked, claimed = true, imageSet = "aura", onClose, onClaim }: BadgePopupProps) => {
  const tierImages = imageSets[imageSet];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-[320px] sm:w-[360px] bg-card rounded-3xl border border-border/30 p-8 flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge image */}
        <div className={`w-32 h-32 mb-6 ${!unlocked ? "grayscale opacity-50" : ""}`}>
          <img
            src={tierImages[tier]}
            alt={`${name} badge`}
            className="w-full h-full object-contain drop-shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-foreground mb-1">
          {unlocked && !claimed
            ? "Badge Ready to Claim!"
            : unlocked
              ? "Badge Claimed!"
              : "Badge Locked"}
        </h2>

        {/* Tier name */}
        <p className={`text-base font-semibold mb-3 ${unlocked ? "text-primary" : "text-muted-foreground"}`}>
          {unlocked && !claimed
            ? `Claim your ${name} badge`
            : unlocked
              ? `You're now ${name}`
              : `Reach ${aura} aura to unlock`}
        </p>

        {/* Aura reward */}
        <div className="flex items-center gap-1.5 mb-4">
          <Coins className="w-5 h-5 text-[hsl(40,80%,55%)]" />
          <span className="text-foreground font-bold text-lg">{tierAuraRewards[tier]}</span>
        </div>

        {/* Action */}
        {unlocked && !claimed ? (
          <button
            onClick={onClaim}
            className="px-8 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-full hover:bg-primary/90 transition-colors animate-pulse"
          >
            🎉 Claim Tokens
          </button>
        ) : unlocked ? (
          <div className="px-6 py-2 bg-secondary rounded-full">
            <span className="text-muted-foreground text-sm font-medium flex items-center gap-1.5">
              ✅ Claimed
            </span>
          </div>
        ) : (
          <div className="px-6 py-2 bg-secondary rounded-full">
            <span className="text-muted-foreground text-sm font-medium">
              {aura - (tierAuraRewards[tier] || 0)} aura remaining
            </span>
          </div>
        )}

        {/* Date */}
        {unlocked && (
          <p className="text-xs text-muted-foreground mt-4">
            Obtained on {new Date().toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default BadgePopup;
