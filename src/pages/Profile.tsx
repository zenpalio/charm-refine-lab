import { useState } from "react";
import { Settings, Info, Globe, Users, Trophy } from "lucide-react";
import BadgeCategory from "@/components/BadgeCategory";
import { type BadgeTier } from "@/components/BadgeCard";
import badgeNewbie from "@/assets/badge-newbie.png";
import badgeMaster from "@/assets/badge-master.png";
import badgeLegend from "@/assets/badge-legend.png";
import badgeElite from "@/assets/badge-elite.png";
import badgeMythic from "@/assets/badge-mythic.png";
import badgeGrandmaster from "@/assets/badge-grandmaster.png";
import badgeImmortal from "@/assets/badge-immortal.png";
import creator1 from "@/assets/creator1.jpg";

const tierBadgeImages: Record<BadgeTier, string> = {
  newbie: badgeNewbie,
  master: badgeMaster,
  legend: badgeLegend,
  elite: badgeElite,
  mythic: badgeMythic,
  grandmaster: badgeGrandmaster,
  immortal: badgeImmortal,
};

const tierRingColors: Record<BadgeTier, string> = {
  newbie: "ring-[hsl(0,0%,60%)]",
  master: "ring-[hsl(340,50%,65%)]",
  legend: "ring-[hsl(40,80%,55%)]",
  elite: "ring-[hsl(213,100%,50%)]",
  mythic: "ring-[hsl(300,60%,55%)]",
  grandmaster: "ring-[hsl(0,70%,50%)]",
  immortal: "ring-[hsl(0,0%,85%)]",
};

const statItems = [
  { icon: Trophy, label: "AURA", value: "1,340" },
  { icon: Globe, label: "WORLD RANK", value: "#1,438" },
  { icon: Users, label: "CHARACTERS", value: "#56" },
];

const tabs = ["Badges", "Characters", "Following"] as const;

const badgeCategories = [
  {
    title: "Total Aura",
    subtitle: "Earn More Aura And Claim Free Tokens",
    progress: 45,
    badges: [
      { name: "Newbie", aura: 100, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 500, tier: "master" as const, unlocked: true },
      { name: "Legend", aura: 1000, tier: "legend" as const, unlocked: true },
      { name: "Elite", aura: 2500, tier: "elite" as const, unlocked: false },
      { name: "Mythic", aura: 5000, tier: "mythic" as const, unlocked: false },
      { name: "Grandmaster", aura: 10000, tier: "grandmaster" as const, unlocked: false },
      { name: "Immortal", aura: 25000, tier: "immortal" as const, unlocked: false },
    ],
  },
  {
    title: "Characters",
    subtitle: "Earn More Aura And Claim Free Tokens",
    progress: 60,
    badges: [
      { name: "Newbie", aura: 100, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 500, tier: "master" as const, unlocked: true },
      { name: "Legend", aura: 1000, tier: "legend" as const, unlocked: false },
      { name: "Elite", aura: 2500, tier: "elite" as const, unlocked: false },
      { name: "Mythic", aura: 5000, tier: "mythic" as const, unlocked: false },
      { name: "Grandmaster", aura: 10000, tier: "grandmaster" as const, unlocked: false },
      { name: "Immortal", aura: 25000, tier: "immortal" as const, unlocked: false },
    ],
  },
  {
    title: "Social",
    subtitle: "Earn More Aura And Claim Free Tokens",
    progress: 30,
    badges: [
      { name: "Newbie", aura: 100, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 500, tier: "master" as const, unlocked: false },
      { name: "Legend", aura: 1000, tier: "legend" as const, unlocked: false },
      { name: "Elite", aura: 2500, tier: "elite" as const, unlocked: false },
      { name: "Mythic", aura: 5000, tier: "mythic" as const, unlocked: false },
      { name: "Grandmaster", aura: 10000, tier: "grandmaster" as const, unlocked: false },
      { name: "Immortal", aura: 25000, tier: "immortal" as const, unlocked: false },
    ],
  },
  {
    title: "Messaging",
    subtitle: "Earn More Aura And Claim Free Tokens",
    progress: 15,
    badges: [
      { name: "Newbie", aura: 100, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 500, tier: "master" as const, unlocked: false },
      { name: "Legend", aura: 1000, tier: "legend" as const, unlocked: false },
      { name: "Elite", aura: 2500, tier: "elite" as const, unlocked: false },
      { name: "Mythic", aura: 5000, tier: "mythic" as const, unlocked: false },
      { name: "Grandmaster", aura: 10000, tier: "grandmaster" as const, unlocked: false },
      { name: "Immortal", aura: 25000, tier: "immortal" as const, unlocked: false },
    ],
  },
  {
    title: "Content Creation",
    subtitle: "Create Images, Videos & Stories To Earn Aura",
    progress: 50,
    badges: [
      { name: "Newbie", aura: 100, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 500, tier: "master" as const, unlocked: true },
      { name: "Legend", aura: 1000, tier: "legend" as const, unlocked: false },
      { name: "Elite", aura: 2500, tier: "elite" as const, unlocked: false },
      { name: "Mythic", aura: 5000, tier: "mythic" as const, unlocked: false },
      { name: "Grandmaster", aura: 10000, tier: "grandmaster" as const, unlocked: false },
      { name: "Immortal", aura: 25000, tier: "immortal" as const, unlocked: false },
    ],
  },
];

const Profile = () => {

  // Derive highest unlocked tier from Total Aura category
  const totalAuraCategory = badgeCategories[0];
  const highestUnlocked = [...totalAuraCategory.badges]
    .reverse()
    .find((b) => b.unlocked);
  const currentTier: BadgeTier = highestUnlocked?.tier ?? "newbie";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

          {/* Avatar + Name */}
          <div className="relative flex flex-col items-center mb-6">
            <div className="relative mb-3">
              <div className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ${tierRingColors[currentTier]}`}>
                <img src={creator1} alt="Profile" className="w-full h-full object-cover" />
              </div>
              {/* Badge overlay */}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12">
                <img
                  src={tierBadgeImages[currentTier]}
                  alt={`${currentTier} badge`}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">A5AP YODA</span>
            </div>

            {/* Action buttons */}
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

          {/* Stats bar */}
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

          {/* Badge categories */}
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
