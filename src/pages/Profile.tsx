import { useState } from "react";
import { Settings, Info, Globe, Users, Heart } from "lucide-react";
import AuraIcon from "@/components/AuraIcon";
import TierRingCanvas from "@/components/TierRingCanvas";
import BadgeCategory from "@/components/BadgeCategory";
import { type BadgeTier } from "@/components/BadgeCard";
import charNewbie from "@/assets/badges/char-newbie.png";
import charMaster from "@/assets/badges/char-master.png";
import charLegend from "@/assets/badges/char-legend.png";
import charElite from "@/assets/badges/char-elite.png";
import charMythic from "@/assets/badges/char-mythic.png";
import charGrandmaster from "@/assets/badges/char-grandmaster.png";
import charImmortal from "@/assets/badges/char-immortal.png";
import profileAvatar from "@/assets/profile-avatar.svg";

const allTiers: BadgeTier[] = ["newbie", "master", "legend", "elite", "grandmaster", "mythic", "immortal"];

const tierBadgeImages: Record<BadgeTier, string> = {
  newbie: charNewbie,
  master: charMaster,
  legend: charLegend,
  elite: charElite,
  grandmaster: charGrandmaster,
  mythic: charMythic,
  immortal: charImmortal,
};

const tierBorderColors: Record<BadgeTier, string> = {
  newbie: "hsl(25 45% 52%)",
  master: "hsl(213 100% 60%)",
  legend: "hsl(43 96% 58%)",
  elite: "hsl(213 100% 50%)",
  grandmaster: "hsl(0 82% 58%)",
  mythic: "hsl(281 85% 62%)",
  immortal: "hsl(43 96% 58%)",
};

const isHighTier = (tier: BadgeTier) => ["elite", "grandmaster", "mythic", "immortal"].includes(tier);

const tierLabels: Record<BadgeTier, string> = {
  newbie: "Newbie",
  master: "Master",
  legend: "Legend",
  elite: "Elite",
  grandmaster: "GM",
  mythic: "Mythic",
  immortal: "Immortal",
};

const tierBadgeGlowColors: Record<BadgeTier, string> = {
  newbie: "hsl(25 45% 52%)",
  master: "hsl(213 100% 60%)",
  legend: "hsl(43 96% 58%)",
  elite: "hsl(213 100% 50%)",
  grandmaster: "hsl(0 82% 58%)",
  mythic: "hsl(281 85% 62%)",
  immortal: "hsl(43 90% 60%)",
};

const statItems = [
  { icon: Users, label: "FOLLOWERS", rank: "#1,438", count: "12.4K", iconClass: "w-4 h-4 text-primary mb-0.5" },
  { icon: AuraIcon, label: "AURA", rank: "#892", count: "1,340", iconClass: "w-5 h-5 text-purple-500 mb-0.5" },
  { icon: Heart, label: "Likes", rank: "#2,105", count: "8.2K", iconClass: "w-4 h-4 text-red-500 fill-red-500 mb-0.5" },
];

const badgeCategories = [
  {
    title: "Total Aura",
    subtitle: "Earn More Aura And Claim Free Tokens",
    progress: 45,
    aura: 1340,
    imageSet: "characters" as const,
    tooltip: "Create characters, post content, and engage with the community to earn more aura",
    badges: [
      { name: "Newbie", aura: 100, tokens: 10, tier: "newbie" as const, unlocked: true, claimed: true },
      { name: "Master", aura: 200, tokens: 20, tier: "master" as const, unlocked: true, claimed: true },
      { name: "Legend", aura: 400, tokens: 40, tier: "legend" as const, unlocked: true, claimed: true },
      { name: "Elite", aura: 800, tokens: 80, tier: "elite" as const, unlocked: true, claimed: false },
      { name: "Mythic", aura: 1500, tokens: 150, tier: "mythic" as const, unlocked: true, claimed: true },
      { name: "Grandmaster", aura: 3000, tokens: 300, tier: "grandmaster" as const, unlocked: true, claimed: true },
      { name: "Immortal", aura: 5000, tokens: 500, tier: "immortal" as const, unlocked: true, claimed: true },
    ],
  },
  {
    title: "Characters",
    subtitle: "Create & Collect Characters To Earn Aura",
    progress: 60,
    aura: 820,
    imageSet: "characters2" as const,
    tooltip: "Create new characters, customize them, and get likes from other users",
    badges: [
      { name: "Newbie", aura: 10, tokens: 1, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 50, tokens: 5, tier: "master" as const, unlocked: true },
      { name: "Legend", aura: 100, tokens: 10, tier: "legend" as const, unlocked: true },
      { name: "Elite", aura: 200, tokens: 20, tier: "elite" as const, unlocked: true },
      { name: "Mythic", aura: 500, tokens: 50, tier: "mythic" as const, unlocked: true },
      { name: "Grandmaster", aura: 300, tokens: 30, tier: "grandmaster" as const, unlocked: true },
      { name: "Immortal", aura: 1000, tokens: 100, tier: "immortal" as const, unlocked: true },
    ],
  },
  {
    title: "Social",
    subtitle: "Grow Your Network To Earn Aura",
    progress: 30,
    aura: 210,
    imageSet: "social" as const,
    tooltip: "Follow creators, get followers, and share content to grow your social presence",
    badges: [
      { name: "Newbie", aura: 10, tokens: 1, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 50, tokens: 5, tier: "master" as const, unlocked: true },
      { name: "Legend", aura: 100, tokens: 10, tier: "legend" as const, unlocked: true },
      { name: "Elite", aura: 200, tokens: 20, tier: "elite" as const, unlocked: true },
      { name: "Mythic", aura: 500, tokens: 50, tier: "mythic" as const, unlocked: true },
      { name: "Grandmaster", aura: 300, tokens: 30, tier: "grandmaster" as const, unlocked: true },
      { name: "Immortal", aura: 1000, tokens: 100, tier: "immortal" as const, unlocked: true },
    ],
  },
  {
    title: "Messaging",
    subtitle: "Chat & Connect To Earn Aura",
    progress: 15,
    aura: 95,
    imageSet: "messaging" as const,
    tooltip: "Send messages, start conversations, and connect with other creators daily",
    badges: [
      { name: "Newbie", aura: 10, tokens: 1, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 50, tokens: 5, tier: "master" as const, unlocked: true },
      { name: "Legend", aura: 100, tokens: 10, tier: "legend" as const, unlocked: true },
      { name: "Elite", aura: 200, tokens: 20, tier: "elite" as const, unlocked: true },
      { name: "Mythic", aura: 500, tokens: 50, tier: "mythic" as const, unlocked: true },
      { name: "Grandmaster", aura: 300, tokens: 30, tier: "grandmaster" as const, unlocked: true },
      { name: "Immortal", aura: 1000, tokens: 100, tier: "immortal" as const, unlocked: true },
    ],
  },
  {
    title: "Content Creation",
    subtitle: "Create Images, Videos & Stories To Earn Aura",
    progress: 50,
    aura: 540,
    imageSet: "content" as const,
    tooltip: "Generate images, create videos, and write stories to boost your content aura",
    badges: [
      { name: "Newbie", aura: 10, tokens: 1, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 50, tokens: 5, tier: "master" as const, unlocked: true, isNew: true },
      { name: "Legend", aura: 100, tokens: 10, tier: "legend" as const, unlocked: true },
      { name: "Elite", aura: 200, tokens: 20, tier: "elite" as const, unlocked: true },
      { name: "Mythic", aura: 500, tokens: 50, tier: "mythic" as const, unlocked: true },
      { name: "Grandmaster", aura: 300, tokens: 30, tier: "grandmaster" as const, unlocked: true },
      { name: "Immortal", aura: 1000, tokens: 100, tier: "immortal" as const, unlocked: true },
    ],
  },
];

const Profile = () => {
  const [previewTier, setPreviewTier] = useState<BadgeTier>("legend");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-8 sm:pt-12 pb-4 sm:pb-6">

        <div className="relative flex flex-col items-center mb-6">
          <div className="relative mb-3 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40" style={{ overflow: 'visible', margin: '12px auto' }}>
            {/* Canvas-based ring effects for all tiers */}
            <TierRingCanvas tier={previewTier} />
            {/* Avatar */}
            <div className="absolute inset-[4px] rounded-full overflow-hidden z-[1]">
              <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            {/* Badge overlay */}
            <div className="absolute -bottom-1 -right-1 w-12 h-12 sm:w-16 sm:h-16 z-[2]">
              {isHighTier(previewTier) && (
                <div
                  className="absolute inset-[14%] rounded-full blur-md opacity-80 motion-safe:animate-pulse"
                  style={{ backgroundColor: tierBadgeGlowColors[previewTier] }}
                />
              )}
              <img
                src={tierBadgeImages[previewTier]}
                alt={`${previewTier} badge`}
                className="relative z-10 w-full h-full object-contain"
                style={isHighTier(previewTier) ? { filter: `drop-shadow(0 0 14px ${tierBadgeGlowColors[previewTier]})` } : undefined}
              />
            </div>
          </div>
        <div className="flex items-center gap-2">
            <span className="text-lg font-bold uppercase tracking-wide" style={{ color: tierBorderColors[previewTier] }}>
              {tierLabels[previewTier]}
            </span>
          </div>

        </div>

        <div className="mb-6">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-2 px-1">Ranking</p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {statItems.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 bg-card rounded-xl p-3 sm:p-4 border border-border/30"
              >
                <stat.icon className={stat.iconClass} />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
                <span className="text-foreground font-bold text-lg sm:text-xl leading-tight">{stat.count}</span>
                <span className="text-[10px] text-muted-foreground/60 font-medium">Rank {stat.rank}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {badgeCategories.map((cat, i) => (
            <BadgeCategory key={i} {...cat} activeTier={previewTier} onUseBadge={(tier) => setPreviewTier(tier)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
