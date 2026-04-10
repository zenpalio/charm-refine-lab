import { Lock } from "lucide-react";
import badgeNewbie from "@/assets/badge-newbie.png";
import badgeMaster from "@/assets/badge-master.png";
import badgeLegend from "@/assets/badge-legend.png";
import badgeMythic from "@/assets/badge-mythic.png";

interface BadgeCardProps {
  name: string;
  aura: number;
  tier: "newbie" | "master" | "legend" | "mythic";
  unlocked: boolean;
}

const tierImages: Record<string, string> = {
  newbie: badgeNewbie,
  master: badgeMaster,
  legend: badgeLegend,
  mythic: badgeMythic,
};

const tierGlow: Record<string, string> = {
  newbie: "shadow-[0_0_20px_hsl(0,0%,60%,0.2)]",
  master: "shadow-[0_0_20px_hsl(340,60%,55%,0.3)]",
  legend: "shadow-[0_0_20px_hsl(40,80%,50%,0.4)]",
  mythic: "shadow-[0_0_25px_hsl(300,70%,55%,0.5)]",
};

const BadgeCard = ({ name, aura, tier, unlocked }: BadgeCardProps) => {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[100px]">
      <div
        className={`relative w-20 h-20 rounded-2xl bg-secondary/50 flex items-center justify-center transition-transform hover:scale-110 ${
          unlocked ? tierGlow[tier] : "opacity-40 grayscale"
        }`}
      >
        <img
          src={tierImages[tier]}
          alt={`${name} badge`}
          className="w-16 h-16 object-contain"
          loading="lazy"
        />
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-2xl">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
      </div>
      <p className="text-xs font-semibold text-foreground capitalize">{name}</p>
      <p className="text-[10px] text-muted-foreground">{aura} aura</p>
    </div>
  );
};

export default BadgeCard;
