import { useState } from "react";
import { Settings, Info, Globe, Users, Heart } from "lucide-react";
import AuraIcon from "@/components/AuraIcon";
import TierRingCanvas from "@/components/TierRingCanvas";
import BadgeCategory from "@/components/BadgeCategory";
import ActivityBadgeCard from "@/components/ActivityBadgeCard";
import ActivityBadgePopup from "@/components/ActivityBadgePopup";
import ShopBadgeCard from "@/components/ShopBadgeCard";
import ShopBadgePopup from "@/components/ShopBadgePopup";
import HorizontalScroll from "@/components/HorizontalScroll";
import { type BadgeTier } from "@/components/BadgeCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import actTrustpilot from "@/assets/badges/activity-trustpilot.png";
import actDiscord from "@/assets/badges/activity-discord.png";
import actFollowers from "@/assets/badges/activity-followers.png";
import actImages from "@/assets/badges/activity-images.png";
import actVideo from "@/assets/badges/activity-video.png";
import actStory from "@/assets/badges/activity-story.png";

import shopDiamond from "@/assets/badges/shop-diamond.png";
import shopCrown from "@/assets/badges/shop-crown.png";
import shopPhoenix from "@/assets/badges/shop-phoenix.png";
import shopCosmic from "@/assets/badges/shop-cosmic.png";
import shopDragon from "@/assets/badges/shop-dragon.png";
import shopThunder from "@/assets/badges/shop-thunder.png";
import charNewbie from "@/assets/badges/char-newbie.png";
import charMaster from "@/assets/badges/char-master.png";
import charLegend from "@/assets/badges/char-legend.png";
import charElite from "@/assets/badges/char-elite.png";
import charMythic from "@/assets/badges/char-mythic.png";
import charGrandmaster from "@/assets/badge-grandmaster.png";
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
  { icon: AuraIcon, label: "AURA", rank: "#892", count: "450", iconClass: "w-5 h-5 text-purple-500 mb-0.5" },
  { icon: Heart, label: "Likes", rank: "#2,105", count: "8.2K", iconClass: "w-4 h-4 text-red-500 fill-red-500 mb-0.5" },
];

const badgeCategories = [
  {
    title: "Total Aura",
    subtitle: "Earn More Aura And Claim Free Tokens",
    progress: 45,
    aura: 450,
    imageSet: "totalAura" as const,
    tooltip: "Create characters, post content, and engage with the community to earn more aura",
    badges: [
      { name: "Newbie", aura: 100, tokens: 10, tier: "newbie" as const, unlocked: true, claimed: true },
      { name: "Master", aura: 200, tokens: 20, tier: "master" as const, unlocked: true, claimed: true },
      { name: "Legend", aura: 400, tokens: 40, tier: "legend" as const, unlocked: true, claimed: true },
      { name: "Elite", aura: 800, tokens: 80, tier: "elite" as const, unlocked: false },
      { name: "Mythic", aura: 1500, tokens: 150, tier: "mythic" as const, unlocked: false },
      { name: "Grandmaster", aura: 3000, tokens: 300, tier: "grandmaster" as const, unlocked: false },
      { name: "Immortal", aura: 5000, tokens: 500, tier: "immortal" as const, unlocked: false },
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
      { name: "Legend", aura: 100, tokens: 10, tier: "legend" as const, unlocked: false },
      { name: "Elite", aura: 200, tokens: 20, tier: "elite" as const, unlocked: false },
      { name: "Mythic", aura: 500, tokens: 50, tier: "mythic" as const, unlocked: false },
      { name: "Grandmaster", aura: 300, tokens: 30, tier: "grandmaster" as const, unlocked: false },
      { name: "Immortal", aura: 1000, tokens: 100, tier: "immortal" as const, unlocked: false },
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
      { name: "Master", aura: 50, tokens: 5, tier: "master" as const, unlocked: false },
      { name: "Legend", aura: 100, tokens: 10, tier: "legend" as const, unlocked: false },
      { name: "Elite", aura: 200, tokens: 20, tier: "elite" as const, unlocked: false },
      { name: "Mythic", aura: 500, tokens: 50, tier: "mythic" as const, unlocked: false },
      { name: "Grandmaster", aura: 300, tokens: 30, tier: "grandmaster" as const, unlocked: false },
      { name: "Immortal", aura: 1000, tokens: 100, tier: "immortal" as const, unlocked: false },
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
      { name: "Master", aura: 50, tokens: 5, tier: "master" as const, unlocked: false },
      { name: "Legend", aura: 100, tokens: 10, tier: "legend" as const, unlocked: false },
      { name: "Elite", aura: 200, tokens: 20, tier: "elite" as const, unlocked: false },
      { name: "Mythic", aura: 500, tokens: 50, tier: "mythic" as const, unlocked: false },
      { name: "Grandmaster", aura: 300, tokens: 30, tier: "grandmaster" as const, unlocked: false },
      { name: "Immortal", aura: 1000, tokens: 100, tier: "immortal" as const, unlocked: false },
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
      { name: "Legend", aura: 100, tokens: 10, tier: "legend" as const, unlocked: false },
      { name: "Elite", aura: 200, tokens: 20, tier: "elite" as const, unlocked: false },
      { name: "Mythic", aura: 500, tokens: 50, tier: "mythic" as const, unlocked: false },
      { name: "Grandmaster", aura: 300, tokens: 30, tier: "grandmaster" as const, unlocked: false },
      { name: "Immortal", aura: 1000, tokens: 100, tier: "immortal" as const, unlocked: false },
    ],
  },
];

const activityBadges = [
  { name: "Trustpilot Review", description: "Leave us a review on Trustpilot", imageUrl: actTrustpilot, completed: false, actionLabel: "Review Now", actionUrl: "https://trustpilot.com" },
  { name: "Join Discord", description: "Join our Discord community", imageUrl: actDiscord, completed: false, actionLabel: "Join Discord", actionUrl: "https://discord.gg" },
  { name: "Follow 100 Users", description: "Follow 100 creators on the platform", imageUrl: actFollowers, completed: false, actionLabel: "Browse Creators" },
  { name: "Share Images", description: "Share 10 images with the community", imageUrl: actImages, completed: false, actionLabel: "Start Sharing" },
  { name: "Create Video", description: "Create and share your first video", imageUrl: actVideo, completed: false, actionLabel: "Create Video" },
  { name: "Write a Story", description: "Write and publish your first story", imageUrl: actStory, completed: true, actionLabel: "Write Story" },
];

const shopBadges = [
  { name: "Diamond VIP", description: "Exclusive diamond emblem for your profile", imageUrl: shopDiamond, price: 500, owned: false },
  { name: "Royal Crown", description: "Show your royal status to all", imageUrl: shopCrown, price: 1000, owned: false },
  { name: "Phoenix Rising", description: "Rise from the ashes with this fiery badge", imageUrl: shopPhoenix, price: 750, owned: false },
  { name: "Cosmic Star", description: "A badge from beyond the stars", imageUrl: shopCosmic, price: 1500, owned: false },
  { name: "Dragon Shield", description: "Wield the power of the ancient dragon", imageUrl: shopDragon, price: 2000, owned: false },
  { name: "Thunder Strike", description: "Channel the storm with this electric badge", imageUrl: shopThunder, price: 800, owned: false },
];

const Profile = () => {
  const [previewTier, setPreviewTier] = useState<BadgeTier>("legend");
  const [selectedActivity, setSelectedActivity] = useState<typeof activityBadges[0] | null>(null);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set(activityBadges.filter(b => b.completed).map(b => b.name)));
  const [selectedShop, setSelectedShop] = useState<typeof shopBadges[0] | null>(null);
  const [ownedShop, setOwnedShop] = useState<Set<string>>(new Set());

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
                className="flex flex-col items-center gap-1 rounded-xl p-3 sm:p-4 border border-border/30"
                style={{ backgroundColor: "hsl(var(--popover))", backgroundImage: "none" }}
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

        <Tabs defaultValue="aura" className="w-full">
          <TabsList className="w-full bg-transparent border-b border-border/30 rounded-none h-auto p-0 mb-6">
            <TabsTrigger
              value="aura"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-semibold uppercase tracking-wider py-3"
            >
              Aura Badges
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-semibold uppercase tracking-wider py-3"
            >
              Activity
            </TabsTrigger>
            <TabsTrigger
              value="shop"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-semibold uppercase tracking-wider py-3"
            >
              Shop
            </TabsTrigger>
          </TabsList>

          <TabsContent value="aura">
            {badgeCategories.map((cat, i) => (
              <BadgeCategory key={i} {...cat} activeTier={previewTier} onUseBadge={i === 0 ? (tier) => setPreviewTier(tier) : undefined} />
            ))}
          </TabsContent>

          <TabsContent value="activity">
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-1">Complete activities to earn exclusive badges</p>
              <p className="text-[10px] text-muted-foreground/60">{completedActivities.size}/{activityBadges.length} completed</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {activityBadges.map((badge) => (
                <ActivityBadgeCard key={badge.name} {...badge} completed={completedActivities.has(badge.name)} onClick={() => setSelectedActivity(badge)} />
              ))}
            </div>
            {selectedActivity && (
              <ActivityBadgePopup
                {...selectedActivity}
                completed={completedActivities.has(selectedActivity.name)}
                onClose={() => setSelectedActivity(null)}
                onComplete={() => {
                  setCompletedActivities(prev => new Set(prev).add(selectedActivity.name));
                  setSelectedActivity({ ...selectedActivity, completed: true });
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="shop">
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-1">Buy exclusive badges with your tokens</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {shopBadges.map((badge) => (
                <ShopBadgeCard key={badge.name} {...badge} owned={ownedShop.has(badge.name)} onClick={() => setSelectedShop(badge)} />
              ))}
            </div>
            {selectedShop && (
              <ShopBadgePopup
                {...selectedShop}
                owned={ownedShop.has(selectedShop.name)}
                onClose={() => setSelectedShop(null)}
                onBuy={() => {
                  setOwnedShop(prev => new Set(prev).add(selectedShop.name));
                  setSelectedShop({ ...selectedShop, owned: true });
                }}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
