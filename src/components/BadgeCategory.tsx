import { useState } from "react";
import { Info } from "lucide-react";
import BadgeCard, { type BadgeTier, type BadgeImageSet } from "./BadgeCard";
import BadgePopup from "./BadgePopup";
import HorizontalScroll from "./HorizontalScroll";

interface Badge {
  name: string;
  aura: number;
  tier: BadgeTier;
  unlocked: boolean;
  claimed?: boolean;
}

interface BadgeCategoryProps {
  title: string;
  subtitle: string;
  badges: Badge[];
  progress: number;
  imageSet?: BadgeImageSet;
}

const BadgeCategory = ({ title, subtitle, badges, progress, imageSet = "aura" }: BadgeCategoryProps) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <h3 className="text-foreground font-bold text-sm">{title}</h3>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Info className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-28 h-2.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground font-medium min-w-[28px]">{progress}%</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-4">{subtitle}</p>
      <HorizontalScroll>
        {badges.map((badge, i) => (
          <BadgeCard key={i} {...badge} imageSet={imageSet} onClick={() => setSelectedBadge(badge)} />
        ))}
      </HorizontalScroll>

      {selectedBadge && (
        <BadgePopup {...selectedBadge} imageSet={imageSet} onClose={() => setSelectedBadge(null)} />
      )}
    </div>
  );
};

export default BadgeCategory;
