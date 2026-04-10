import { useState } from "react";
import { Info } from "lucide-react";
import BadgeCard, { type BadgeTier, type BadgeImageSet } from "./BadgeCard";
import BadgePopup from "./BadgePopup";
import AuraIcon from "./AuraIcon";
import HorizontalScroll from "./HorizontalScroll";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface Badge {
  name: string;
  aura: number;
  tokens?: number;
  tier: BadgeTier;
  unlocked: boolean;
  claimed?: boolean;
  isNew?: boolean;
}

interface BadgeCategoryProps {
  title: string;
  subtitle: string;
  badges: Badge[];
  progress: number;
  imageSet?: BadgeImageSet;
  tooltip?: string;
  aura?: number;
}

const BadgeCategory = ({ title, subtitle, badges: initialBadges, progress, imageSet = "aura", tooltip, aura }: BadgeCategoryProps) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [claimedTiers, setClaimedTiers] = useState<Set<BadgeTier>>(new Set());

  const badges = initialBadges.map((b) => ({
    ...b,
    claimed: b.claimed || claimedTiers.has(b.tier),
  }));

  const handleClaim = () => {
    if (selectedBadge) {
      setClaimedTiers((prev) => new Set(prev).add(selectedBadge.tier));
      setSelectedBadge({ ...selectedBadge, claimed: true });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <h3 className="text-foreground font-bold text-sm">{title}</h3>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-[200px] text-xs">
                {tooltip || subtitle}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-3">
          {aura !== undefined && (
            <div className="flex items-center gap-1">
              <AuraIcon className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-[11px] font-bold text-foreground">{aura.toLocaleString()}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium min-w-[28px]">{progress}%</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-4">{subtitle}</p>
      <HorizontalScroll>
        {badges.map((badge, i) => (
          <BadgeCard key={i} {...badge} imageSet={imageSet} onClick={() => setSelectedBadge(badge)} />
        ))}
      </HorizontalScroll>

      {selectedBadge && (
        <BadgePopup
          {...selectedBadge}
          claimed={selectedBadge.claimed || claimedTiers.has(selectedBadge.tier)}
          imageSet={imageSet}
          currentAura={aura ?? 0}
          onClose={() => setSelectedBadge(null)}
          onClaim={handleClaim}
        />
        />
      )}
    </div>
  );
};

export default BadgeCategory;
