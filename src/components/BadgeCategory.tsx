import { Info } from "lucide-react";
import BadgeCard from "./BadgeCard";
import HorizontalScroll from "./HorizontalScroll";

interface Badge {
  name: string;
  aura: number;
  tier: "newbie" | "master" | "legend" | "mythic";
  unlocked: boolean;
}

interface BadgeCategoryProps {
  title: string;
  subtitle: string;
  badges: Badge[];
  progress: number; // 0-100
}

const BadgeCategory = ({ title, subtitle, badges, progress }: BadgeCategoryProps) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2">
        <h3 className="text-foreground font-bold text-sm">{title}</h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Info className="w-4 h-4" />
        </button>
      </div>
      <div className="w-28 h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
    <p className="text-xs text-muted-foreground mb-4">{subtitle}</p>
    <HorizontalScroll>
      {badges.map((badge, i) => (
        <BadgeCard key={i} {...badge} />
      ))}
    </HorizontalScroll>
  </div>
);

export default BadgeCategory;
