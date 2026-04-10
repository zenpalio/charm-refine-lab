import { Lock } from "lucide-react";

interface BadgeCardProps {
  name: string;
  aura: number;
  tier: "newbie" | "master" | "legend" | "mythic";
  unlocked: boolean;
}

const tierStyles: Record<string, { bg: string; ring: string; icon: string }> = {
  newbie: {
    bg: "from-[hsl(0,0%,30%)] to-[hsl(0,0%,20%)]",
    ring: "ring-[hsl(0,0%,40%)]",
    icon: "text-[hsl(0,0%,70%)]",
  },
  master: {
    bg: "from-[hsl(30,50%,45%)] to-[hsl(25,40%,30%)]",
    ring: "ring-[hsl(30,50%,50%)]",
    icon: "text-[hsl(30,60%,70%)]",
  },
  legend: {
    bg: "from-[hsl(35,70%,50%)] to-[hsl(30,60%,35%)]",
    ring: "ring-[hsl(35,70%,55%)]",
    icon: "text-[hsl(35,80%,75%)]",
  },
  mythic: {
    bg: "from-[hsl(220,70%,50%)] to-[hsl(260,60%,40%)]",
    ring: "ring-[hsl(240,70%,60%)]",
    icon: "text-[hsl(220,80%,80%)]",
  },
};

const tierIcons: Record<string, string> = {
  newbie: "🛡️",
  master: "⚔️",
  legend: "👑",
  mythic: "💎",
};

const BadgeCard = ({ name, aura, tier, unlocked }: BadgeCardProps) => {
  const styles = tierStyles[tier];

  return (
    <div className="flex flex-col items-center gap-2 min-w-[100px]">
      <div
        className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${styles.bg} ring-2 ${styles.ring} flex items-center justify-center transition-transform hover:scale-105 ${
          !unlocked ? "opacity-40 grayscale" : ""
        }`}
      >
        <span className="text-3xl">{tierIcons[tier]}</span>
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 rounded-2xl">
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
