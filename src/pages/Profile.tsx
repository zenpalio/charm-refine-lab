import { useState } from "react";
import { Settings, Info, Globe, Users, Trophy } from "lucide-react";
import BadgeCategory from "@/components/BadgeCategory";
import creator1 from "@/assets/creator1.jpg";

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
      { name: "Mythic", aura: 5000, tier: "mythic" as const, unlocked: false },
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
      { name: "Mythic", aura: 5000, tier: "mythic" as const, unlocked: false },
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
      { name: "Mythic", aura: 5000, tier: "mythic" as const, unlocked: false },
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
      { name: "Mythic", aura: 5000, tier: "mythic" as const, unlocked: false },
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
      { name: "Mythic", aura: 5000, tier: "mythic" as const, unlocked: false },
    ],
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Badges");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6">

          {/* Avatar + Name */}
          <div className="relative flex flex-col items-center mb-6">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/30 mb-3">
              <img src={creator1} alt="Profile" className="w-full h-full object-cover" />
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
          <div className="grid grid-cols-3 gap-3 mb-6">
            {statItems.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 bg-card rounded-xl p-4 border border-border/30"
              >
                <stat.icon className="w-5 h-5 text-muted-foreground mb-1" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
                <span className="text-foreground font-bold text-lg">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-border mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold transition-colors relative ${
                  activeTab === tab
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "Badges" && (
            <div>
              {badgeCategories.map((cat, i) => (
                <BadgeCategory key={i} {...cat} />
              ))}
            </div>
          )}

          {activeTab === "Characters" && (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-sm">Your characters will appear here</p>
            </div>
          )}

          {activeTab === "Following" && (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-sm">Creators you follow will appear here</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
