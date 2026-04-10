import { useState } from "react";
import { Settings, Info, Globe, Users, Trophy } from "lucide-react";
import BadgeCategory from "@/components/BadgeCategory";
import { type BadgeTier } from "@/components/BadgeCard";
import charNewbie from "@/assets/badges/char-newbie.png";
import charMaster from "@/assets/badges/char-master.png";
import charLegend from "@/assets/badges/char-legend.png";
import charElite from "@/assets/badges/char-elite.png";
import charMythic from "@/assets/badges/char-mythic.png";
import charGrandmaster from "@/assets/badges/char-grandmaster.png";
import charImmortal from "@/assets/badges/char-immortal.png";
import creator1 from "@/assets/creator1.jpg";

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
  immortal: "hsl(48 96% 70%)",
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
  immortal: "hsl(0 0% 88%)",
};

const statItems = [
  { icon: Trophy, label: "AURA", value: "1,340" },
  { icon: Globe, label: "WORLD RANK", value: "#1,438" },
  { icon: Users, label: "CHARACTERS", value: "#56" },
];

const badgeCategories = [
  {
    title: "Total Aura",
    subtitle: "Earn More Aura And Claim Free Tokens",
    progress: 45,
    imageSet: "characters" as const,
    badges: [
      { name: "Newbie", aura: 100, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 500, tier: "master" as const, unlocked: true },
      { name: "Legend", aura: 1000, tier: "legend" as const, unlocked: true },
      { name: "Elite", aura: 2500, tier: "elite" as const, unlocked: true },
      { name: "Mythic", aura: 5000, tier: "mythic" as const, unlocked: true },
      { name: "Grandmaster", aura: 10000, tier: "grandmaster" as const, unlocked: true },
      { name: "Immortal", aura: 25000, tier: "immortal" as const, unlocked: true },
    ],
  },
  {
    title: "Characters",
    subtitle: "Create & Collect Characters To Earn Aura",
    progress: 60,
    imageSet: "aura" as const,
    badges: [
      { name: "Newbie", aura: 100, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 500, tier: "master" as const, unlocked: true },
      { name: "Legend", aura: 1000, tier: "legend" as const, unlocked: true },
      { name: "Elite", aura: 2500, tier: "elite" as const, unlocked: true },
      { name: "Grandmaster", aura: 5000, tier: "grandmaster" as const, unlocked: true },
      { name: "Mythic", aura: 10000, tier: "mythic" as const, unlocked: true },
      { name: "Immortal", aura: 25000, tier: "immortal" as const, unlocked: true },
    ],
  },
  {
    title: "Social",
    subtitle: "Grow Your Network To Earn Aura",
    progress: 30,
    imageSet: "aura" as const,
    badges: [
      { name: "Newbie", aura: 100, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 500, tier: "master" as const, unlocked: false },
      { name: "Legend", aura: 1000, tier: "legend" as const, unlocked: false },
      { name: "Elite", aura: 2500, tier: "elite" as const, unlocked: false },
      { name: "Grandmaster", aura: 5000, tier: "grandmaster" as const, unlocked: false },
      { name: "Mythic", aura: 10000, tier: "mythic" as const, unlocked: false },
      { name: "Immortal", aura: 25000, tier: "immortal" as const, unlocked: false },
    ],
  },
  {
    title: "Messaging",
    subtitle: "Chat & Connect To Earn Aura",
    progress: 15,
    imageSet: "aura" as const,
    badges: [
      { name: "Newbie", aura: 100, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 500, tier: "master" as const, unlocked: false },
      { name: "Legend", aura: 1000, tier: "legend" as const, unlocked: false },
      { name: "Elite", aura: 2500, tier: "elite" as const, unlocked: false },
      { name: "Grandmaster", aura: 5000, tier: "grandmaster" as const, unlocked: false },
      { name: "Mythic", aura: 10000, tier: "mythic" as const, unlocked: false },
      { name: "Immortal", aura: 25000, tier: "immortal" as const, unlocked: false },
    ],
  },
  {
    title: "Content Creation",
    subtitle: "Create Images, Videos & Stories To Earn Aura",
    progress: 50,
    imageSet: "aura" as const,
    badges: [
      { name: "Newbie", aura: 100, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 500, tier: "master" as const, unlocked: true },
      { name: "Legend", aura: 1000, tier: "legend" as const, unlocked: false },
      { name: "Elite", aura: 2500, tier: "elite" as const, unlocked: false },
      { name: "Grandmaster", aura: 5000, tier: "grandmaster" as const, unlocked: false },
      { name: "Mythic", aura: 10000, tier: "mythic" as const, unlocked: false },
      { name: "Immortal", aura: 25000, tier: "immortal" as const, unlocked: false },
    ],
  },
];

const Profile = () => {
  const [previewTier, setPreviewTier] = useState<BadgeTier>("legend");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex items-center justify-center gap-1.5 mb-4 flex-wrap">
          {allTiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setPreviewTier(tier)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                previewTier === tier
                  ? "bg-primary text-primary-foreground scale-105"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border/30"
              }`}
            >
              {tierLabels[tier]}
            </button>
          ))}
        </div>

        <div className="relative flex flex-col items-center mb-6">
          <div className="relative mb-3 w-24 h-24 sm:w-32 sm:h-32">
            {/* Animated glow ring for high tiers */}
            {isHighTier(previewTier) && (
              <div
                className="absolute -inset-1 rounded-full blur-md opacity-60 motion-safe:animate-pulse"
                style={{ backgroundColor: tierBorderColors[previewTier] }}
              />
            )}
            {/* Rotating conic gradient ring for Immortal */}
            {previewTier === "immortal" && (
              <div className="absolute -inset-[3px] rounded-full immortal-ring" style={{
                background: 'conic-gradient(from 0deg, hsl(48 96% 70%), hsl(38 100% 50%), hsl(280 80% 60%), hsl(200 100% 70%), hsl(48 96% 70%))',
                padding: '3px',
              }}>
                <div className="w-full h-full rounded-full bg-background" />
              </div>
            )}
            {/* Border ring (non-immortal) */}
            {previewTier !== "immortal" && (
              <div
                className="absolute inset-0 rounded-full transition-all duration-500"
                style={{
                  border: `3px solid ${tierBorderColors[previewTier]}`,
                  boxShadow: isHighTier(previewTier)
                    ? `0 0 20px ${tierBorderColors[previewTier]}80, inset 0 0 12px ${tierBorderColors[previewTier]}30`
                    : 'none',
                }}
              />
            )}
            {/* Second inner ring for high tiers (non-immortal) */}
            {isHighTier(previewTier) && previewTier !== "immortal" && (
              <div
                className="absolute inset-[3px] rounded-full transition-all duration-500"
                style={{
                  border: `1px solid ${tierBorderColors[previewTier]}60`,
                }}
              />
            )}
            {/* Avatar */}
            <div className="absolute inset-[6px] rounded-full overflow-hidden">
              <img src={creator1} alt="Profile" className="w-full h-full object-cover" />
            </div>
            {/* Badge overlay */}
            <div className="absolute -bottom-1 -right-1 w-12 h-12 sm:w-16 sm:h-16">
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
            <span className="text-lg font-bold text-foreground">A5AP YODA</span>
          </div>

          <div className="absolute top-0 left-0">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Info className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-0 right-0">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
          {statItems.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-0.5 sm:gap-1 bg-card rounded-xl p-2.5 sm:p-4 border border-border/30"
            >
              <stat.icon className="w-5 h-5 text-muted-foreground mb-1" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                {stat.label}
              </span>
              <span className="text-foreground font-bold text-base sm:text-lg">{stat.value}</span>
            </div>
          ))}
        </div>

        <div>
          {badgeCategories.map((cat, i) => (
            <BadgeCategory key={i} {...cat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
