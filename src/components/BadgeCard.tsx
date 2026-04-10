import { Lock } from "lucide-react";
import badgeNewbie from "@/assets/badge-newbie.png";
import badgeMaster from "@/assets/badge-master.png";
import badgeLegend from "@/assets/badge-legend.png";
import badgeElite from "@/assets/badge-elite.png";
import badgeMythic from "@/assets/badge-mythic.png";
import badgeGrandmaster from "@/assets/badge-grandmaster.png";
import badgeImmortal from "@/assets/badge-immortal.png";
import badgeSimpleNewbie from "@/assets/badge-simple-newbie.png";
import badgeSimpleMaster from "@/assets/badge-simple-master.png";
import badgeSimpleLegend from "@/assets/badge-simple-legend.png";
import badgeSimpleElite from "@/assets/badge-simple-elite.png";
import badgeSimpleMythic from "@/assets/badge-simple-mythic.png";
import badgeSimpleGrandmaster from "@/assets/badge-simple-grandmaster.png";
import badgeSimpleImmortal from "@/assets/badge-simple-immortal.png";

export type BadgeTier = "newbie" | "master" | "legend" | "mythic" | "elite" | "grandmaster" | "immortal";
export type BadgeImageSet = "cool" | "simple";

interface BadgeCardProps {
  name: string;
  aura: number;
  tier: BadgeTier;
  unlocked: boolean;
  imageSet?: BadgeImageSet;
  onClick?: () => void;
}

const coolImages: Record<BadgeTier, string> = {
  newbie: badgeNewbie,
  master: badgeMaster,
  legend: badgeLegend,
  elite: badgeElite,
  mythic: badgeMythic,
  grandmaster: badgeGrandmaster,
  immortal: badgeImmortal,
};

const simpleImages: Record<BadgeTier, string> = {
  newbie: badgeSimpleNewbie,
  master: badgeSimpleMaster,
  legend: badgeSimpleLegend,
  elite: badgeSimpleElite,
  mythic: badgeSimpleMythic,
  grandmaster: badgeSimpleGrandmaster,
  immortal: badgeSimpleImmortal,
};

export const tierImageSets = { cool: coolImages, simple: simpleImages };

const BadgeCard = ({ name, aura, tier, unlocked, imageSet = "cool", onClick }: BadgeCardProps) => {
  const images = imageSet === "simple" ? simpleImages : coolImages;
  return (
    <div className="flex flex-col items-center gap-2 min-w-[100px] cursor-pointer" onClick={onClick}>
      <div
        className={`relative w-20 h-20 rounded-2xl bg-card flex items-center justify-center transition-transform hover:scale-110 border border-border/30 ${
          !unlocked ? "opacity-40 grayscale" : ""
        }`}
      >
        <img
          src={images[tier]}
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
