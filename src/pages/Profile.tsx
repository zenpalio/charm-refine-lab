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

const allTiers: BadgeTier[] = ["newbie", "master", "legend", "elite", "grandmaster", "mythic", "immortal"];

const tierBadgeImages: Record<BadgeTier, string> = {
  newbie: badgeNewbie, master: badgeMaster, legend: badgeLegend,
  elite: badgeElite, mythic: badgeMythic, grandmaster: badgeGrandmaster, immortal: badgeImmortal,
};

const tierRingColors: Record<BadgeTier, string> = {
  newbie: "ring-[hsl(0,0%,60%)]",
  master: "ring-[hsl(340,50%,65%)]",
  legend: "ring-[hsl(40,80%,55%)]",
  elite: "ring-[hsl(213,100%,50%)]",
  grandmaster: "ring-[hsl(300,60%,55%)]",
  mythic: "ring-[hsl(0,70%,50%)]",
  immortal: "ring-[hsl(0,0%,85%)]",
};

const tierLabels: Record<BadgeTier, string> = {
  newbie: "Newbie", master: "Master", legend: "Legend",
  elite: "Elite", grandmaster: "GM", mythic: "Mythic", immortal: "Immortal",
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
    imageSet: "aura" as const,
    badges: [
      { name: "Newbie", aura: 100, tier: "newbie" as const, unlocked: true },
      { name: "Master", aura: 500, tier: "master" as const, unlocked: true },
      { name: "Legend", aura: 1000, tier: "legend" as const, unlocked: true },
      { name: "Elite", aura: 2500, tier: "elite" as const, unlocked: false },
      { name: "Grandmaster", aura: 5000, tier: "grandmaster" as const, unlocked: false },
      { name: "Mythic", aura: 10000, tier: "mythic" as const, unlocked: false },
      { name: "Immortal", aura: 25000, tier: "immortal" as const, unlocked: false },
    ],
  },
  {
    title: "Characters",
    subtitle: "Create & Collect Characters To Earn Aura",
    progress: 60,
    imageSet: "characters" as const,
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
    imageSet: "social" as const,
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
    imageSet: "messaging" as const,
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
    imageSet: "content" as const,
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

        {/* Tier Switcher */}
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

        {/* Avatar + Name */}
        <div className="relative flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <div className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ${tierRingColors[previewTier]}`}>
              <img src={creator1} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12">
              <img
                src={tierBadgeImages[previewTier]}
                alt={`${previewTier} badge`}
                className="w-full h-full object-contain drop-shadow-lg"
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
