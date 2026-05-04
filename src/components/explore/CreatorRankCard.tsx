import { ChevronRight, Shield } from "lucide-react";
import { imageSets, type BadgeTier } from "@/components/BadgeCard";

const tierBorderColors: Record<BadgeTier, string> = {
  newbie: "hsl(25 45% 52%)",
  master: "hsl(213 100% 60%)",
  legend: "hsl(43 96% 58%)",
  elite: "hsl(213 100% 50%)",
  grandmaster: "hsl(0 82% 58%)",
  mythic: "hsl(281 85% 62%)",
  immortal: "hsl(48 96% 70%)",
};

const isHighTier = (tier: BadgeTier) =>
  ["elite", "grandmaster", "mythic", "immortal"].includes(tier);

const resolveSrc = (image: string | { src: string }) =>
  typeof image === "string" ? image : image.src;

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
  const high = isHighTier(tier);
  const badgeSrc = resolveSrc(imageSets.aura[tier]);

  return (
    <button className="group relative flex w-[300px] shrink-0 items-center gap-4 overflow-hidden rounded-2xl bg-grey-dark-1 px-4 py-3 text-left transition-colors hover:bg-grey-dark-2">
      {/* Outlined ranking numeral behind avatar — neutral */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-1 bottom-[-14px] select-none text-[110px] font-black leading-none"
        style={{
          color: "transparent",
          WebkitTextStroke: "2px hsl(var(--muted-foreground) / 0.3)",
          zIndex: 0,
        }}
      >
        {rank}
      </span>

      {/* Avatar — only colored element */}
      <div
        className="relative z-10 shrink-0"
        style={{
          filter: high ? `drop-shadow(0 0 8px ${borderColor})` : "none",
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

      {/* Name + real badge image */}
      <div className="relative z-10 flex min-w-0 flex-1 items-center gap-2">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-bold text-white">{name}</span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-grey-light-3">
            {tier}
          </span>
        </div>
        <img
          src={badgeSrc}
          alt={`${tier} badge`}
          loading="lazy"
          className="h-9 w-9 shrink-0 object-contain"
        />
      </div>

      <ChevronRight className="relative z-10 h-5 w-5 text-grey-light-3 transition-colors group-hover:text-white" />
    </button>
  );
};

export default CreatorRankCard;
