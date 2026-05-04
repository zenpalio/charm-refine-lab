import { ChevronRight, Shield } from "lucide-react";
import { type BadgeTier } from "@/components/BadgeCard";

const tierBorderColors: Record<BadgeTier, string> = {
  newbie: "hsl(25 45% 52%)",
  master: "hsl(213 100% 60%)",
  legend: "hsl(43 96% 58%)",
  elite: "hsl(213 100% 50%)",
  grandmaster: "hsl(0 82% 58%)",
  mythic: "hsl(281 85% 62%)",
  immortal: "hsl(48 96% 70%)",
};

const tierGlowHsl: Record<BadgeTier, string> = {
  newbie: "25 45% 52%",
  master: "213 100% 60%",
  legend: "43 96% 58%",
  elite: "213 100% 50%",
  grandmaster: "0 82% 58%",
  mythic: "281 85% 62%",
  immortal: "48 96% 70%",
};

const isHighTier = (tier: BadgeTier) =>
  ["elite", "grandmaster", "mythic", "immortal"].includes(tier);

export interface CreatorRankCardProps {
  rank: number;
  name: string;
  avatarUrl: string;
  tier: BadgeTier;
  verified?: boolean;
}

const CreatorRankCard = ({
  rank,
  name,
  avatarUrl,
  tier,
  verified,
}: CreatorRankCardProps) => {
  const borderColor = tierBorderColors[tier];
  const glow = tierGlowHsl[tier];
  const high = isHighTier(tier);

  return (
    <button
      className="group relative flex w-[300px] shrink-0 items-center gap-4 overflow-hidden rounded-2xl bg-grey-dark-1 px-4 py-3 text-left transition-all hover:bg-grey-dark-2"
      style={{
        boxShadow: high
          ? `inset 0 0 0 1px hsl(${glow} / 0.35), 0 0 24px hsl(${glow} / 0.15)`
          : `inset 0 0 0 1px hsl(${glow} / 0.2)`,
      }}
    >
      {/* Outlined ranking numeral behind avatar */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-1 bottom-[-14px] select-none text-[110px] font-black leading-none"
        style={{
          color: "transparent",
          WebkitTextStroke: `2px hsl(${glow} / 0.45)`,
          zIndex: 0,
        }}
      >
        {rank}
      </span>

      {/* Avatar */}
      <div
        className="relative z-10 shrink-0"
        style={{
          filter: high ? `drop-shadow(0 0 10px hsl(${glow} / 0.45))` : "none",
        }}
      >
        <div
          className="h-16 w-16 overflow-hidden rounded-full"
          style={{ border: `2px solid ${borderColor}` }}
        >
          <img
            src={avatarUrl}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        {verified && (
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Name + tier badge */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-bold text-white">{name}</span>
        <span
          className="mt-1 inline-flex w-fit items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: `hsl(${glow} / 0.18)`,
            color: `hsl(${glow})`,
          }}
        >
          {tier}
        </span>
      </div>

      <ChevronRight className="relative z-10 h-5 w-5 text-grey-light-3 transition-colors group-hover:text-white" />
    </button>
  );
};

export default CreatorRankCard;
