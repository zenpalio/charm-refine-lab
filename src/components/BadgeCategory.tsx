import { useState } from "react";
import { Info } from "lucide-react";
import BadgeCard, { type BadgeTier, type BadgeImageSet } from "./BadgeCard";
import BadgePopup from "./BadgePopup";
import AuraIcon from "./AuraIcon";
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

  const badges = initialBadges.map((badge) => ({
    ...badge,
    claimed: badge.claimed || claimedTiers.has(badge.tier),
  }));

  const handleClaim = () => {
    if (!selectedBadge) return;

    setClaimedTiers((prev) => new Set(prev).add(selectedBadge.tier));
    setSelectedBadge({ ...selectedBadge, claimed: true });
  };

  return (
    <div className="mb-8">
      <div className="mb-1 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground transition-colors hover:text-foreground">
                  <Info className="h-4 w-4" />
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
              <AuraIcon className="h-3.5 w-3.5 text-purple-500" />
              <span className="text-[11px] font-bold text-foreground">{aura.toLocaleString()}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="h-2 w-20 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="min-w-[28px] text-[10px] font-medium text-muted-foreground">{progress}%</span>
          </div>
        </div>
      </div>

      <p className="mb-4 text-xs text-muted-foreground">{subtitle}</p>

      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-4 pt-2 scrollbar-hide md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-1">
        {badges.map((badge, index) => (
          <BadgeCard key={index} {...badge} imageSet={imageSet} onClick={() => setSelectedBadge(badge)} />
        ))}
      </div>

      {selectedBadge && (
        <BadgePopup
          {...selectedBadge}
          claimed={selectedBadge.claimed || claimedTiers.has(selectedBadge.tier)}
          imageSet={imageSet}
          currentAura={aura ?? 0}
          onClose={() => setSelectedBadge(null)}
          onClaim={handleClaim}
        />
      )}
    </div>
  );
};

export default BadgeCategory;
