import { Lock } from "lucide-react";
import badgeNewbie from "@/assets/badge-newbie.png";
import badgeMaster from "@/assets/badge-master.png";
import badgeLegend from "@/assets/badge-legend.png";
import badgeElite from "@/assets/badge-elite.png";
import badgeMythic from "@/assets/badge-mythic.png";
import badgeGrandmaster from "@/assets/badge-grandmaster.png";
import badgeImmortal from "@/assets/badge-immortal.png";

// Characters
import charNewbie from "@/assets/badges/char-newbie.png";
import charMaster from "@/assets/badges/char-master.png";
import charLegend from "@/assets/badges/char-legend.png";
import charElite from "@/assets/badges/char-elite.png";
import charMythic from "@/assets/badges/char-mythic.png";
import charGrandmaster from "@/assets/badges/char-grandmaster.png";
import charImmortal from "@/assets/badges/char-immortal.png";

// Social
import socialNewbie from "@/assets/badges/social-newbie.png";
import socialMaster from "@/assets/badges/social-master.png";
import socialLegend from "@/assets/badges/social-legend.png";
import socialElite from "@/assets/badges/social-elite.png";
import socialMythic from "@/assets/badges/social-mythic.png";
import socialGrandmaster from "@/assets/badges/social-grandmaster.png";
import socialImmortal from "@/assets/badges/social-immortal.png";

// Messaging
import msgNewbie from "@/assets/badges/msg-newbie.png";
import msgMaster from "@/assets/badges/msg-master.png";
import msgLegend from "@/assets/badges/msg-legend.png";
import msgElite from "@/assets/badges/msg-elite.png";
import msgMythic from "@/assets/badges/msg-mythic.png";
import msgGrandmaster from "@/assets/badges/msg-grandmaster.png";
import msgImmortal from "@/assets/badges/msg-immortal.png";

// Content Creation
import contentNewbie from "@/assets/badges/content-newbie.png";
import contentMaster from "@/assets/badges/content-master.png";
import contentLegend from "@/assets/badges/content-legend.png";
import contentElite from "@/assets/badges/content-elite.png";
import contentMythic from "@/assets/badges/content-mythic.png";
import contentGrandmaster from "@/assets/badges/content-grandmaster.png";
import contentImmortal from "@/assets/badges/content-immortal.png";

export type BadgeTier = "newbie" | "master" | "legend" | "mythic" | "elite" | "grandmaster" | "immortal";
export type BadgeImageSet = "aura" | "characters" | "social" | "messaging" | "content";

interface BadgeCardProps {
  name: string;
  aura: number;
  tier: BadgeTier;
  unlocked: boolean;
  imageSet?: BadgeImageSet;
  onClick?: () => void;
}

const imageSets: Record<BadgeImageSet, Record<BadgeTier, string>> = {
  aura: {
    newbie: badgeNewbie, master: badgeMaster, legend: badgeLegend,
    elite: badgeElite, mythic: badgeMythic, grandmaster: badgeGrandmaster, immortal: badgeImmortal,
  },
  characters: {
    newbie: charNewbie, master: charMaster, legend: charLegend,
    elite: charElite, mythic: charMythic, grandmaster: charGrandmaster, immortal: charImmortal,
  },
  social: {
    newbie: socialNewbie, master: socialMaster, legend: socialLegend,
    elite: socialElite, mythic: socialMythic, grandmaster: socialGrandmaster, immortal: socialImmortal,
  },
  messaging: {
    newbie: msgNewbie, master: msgMaster, legend: msgLegend,
    elite: msgElite, mythic: msgMythic, grandmaster: msgGrandmaster, immortal: msgImmortal,
  },
  content: {
    newbie: contentNewbie, master: contentMaster, legend: contentLegend,
    elite: contentElite, mythic: contentMythic, grandmaster: contentGrandmaster, immortal: contentImmortal,
  },
};

export { imageSets };

const BadgeCard = ({ name, aura, tier, unlocked, imageSet = "aura", onClick }: BadgeCardProps) => {
  const images = imageSets[imageSet];
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
