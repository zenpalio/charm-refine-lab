import { useState, useMemo } from "react";
import { Search, ArrowLeft, TrendingUp, Calendar, Users, Sparkles, Crown, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type BadgeTier } from "@/components/BadgeCard";
import creator1 from "@/assets/creator1.jpg";
import charNewbie from "@/assets/badges/char-newbie.png";
import charMaster from "@/assets/badges/char-master.png";
import charLegend from "@/assets/badges/char-legend.png";
import charElite from "@/assets/badges/char-elite.png";
import charMythic from "@/assets/badges/char-mythic.png";
import charGrandmaster from "@/assets/badges/char-grandmaster.png";
import charImmortal from "@/assets/badges/char-immortal.png";

const tierBadgeImages: Record<BadgeTier, string> = {
  newbie: charNewbie, master: charMaster, legend: charLegend,
  elite: charElite, grandmaster: charGrandmaster, mythic: charMythic, immortal: charImmortal,
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

type SortBy = "followers" | "aura";
type FilterBy = "trending" | "newest" | "all";

const mockCreators = Array.from({ length: 30 }, (_, i) => {
  const tiers: BadgeTier[] = ["immortal", "mythic", "grandmaster", "elite", "legend", "master", "newbie"];
  const tier = tiers[Math.min(Math.floor(i / 4), tiers.length - 1)];
  const names = [
    "Big Daddy", "Luna Eclipse", "Nyx Shadow", "Zara Nova", "Kai Storm",
    "Mira Blaze", "Rex Vortex", "Ivy Frost", "Axel Drift", "Suki Dream",
    "Jett Phoenix", "Aria Moon", "Blaze King", "Nova Star", "Raven Dark",
    "Sage Ember", "Titan Fury", "Cleo Mystic", "Drake Wolf", "Faye Spark",
    "Orion Blaze", "Pearl Dusk", "Quinn Fire", "Roxy Night", "Storm Vale",
    "Uma Glow", "Vera Light", "Wren Sky", "Xena Rise", "Yuki Dawn",
  ];
  return {
    id: i + 1,
    name: names[i],
    avatarUrl: creator1,
    tier,
    followers: Math.floor(50000 / (i + 1)) + Math.floor(Math.random() * 500),
    aura: Math.floor(100000 / (i + 1)) + Math.floor(Math.random() * 1000),
    trending: i < 10,
    joinedDaysAgo: Math.floor(Math.random() * 365) + 1,
  };
});

const Creators = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("aura");
  const [filterBy, setFilterBy] = useState<FilterBy>("all");

  const filtered = useMemo(() => {
    let list = [...mockCreators];
    if (search) {
      list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (filterBy === "trending") list = list.filter(c => c.trending);
    if (filterBy === "newest") list = list.sort((a, b) => a.joinedDaysAgo - b.joinedDaysAgo);
    if (sortBy === "followers") list.sort((a, b) => b.followers - a.followers);
    else list.sort((a, b) => b.aura - a.aura);
    return list;
  }, [search, sortBy, filterBy]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Top Creators</h1>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search creators..."
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortBy(sortBy === "aura" ? "followers" : "aura")}
              className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors"
            >
              {sortBy === "aura" ? "Most Aura" : "Most Liked"}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Time filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterBy(filterBy === "all" ? "trending" : filterBy === "trending" ? "newest" : "all")}
              className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors"
            >
              {filterBy === "all" ? "All time" : filterBy === "trending" ? "Trending" : "Newest"}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1" />

          {/* Filters button */}
          <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Filters
          </button>
        </div>

        {/* Creators List */}
        <div className="space-y-2">
          {filtered.map((creator, idx) => (
            <CreatorRow key={creator.id} creator={creator} rank={idx + 1} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12 text-sm">No creators found</p>
          )}
        </div>
      </div>
    </div>
  );
};

interface CreatorRowProps {
  creator: typeof mockCreators[0];
  rank: number;
}

const CreatorRow = ({ creator, rank }: CreatorRowProps) => {
  const borderColor = tierBorderColors[creator.tier];
  const highTier = isHighTier(creator.tier);
  const isImmortal = creator.tier === "immortal";

  const rankColor = rank <= 3
    ? rank === 1 ? "text-yellow-400" : rank === 2 ? "text-gray-300" : "text-amber-600"
    : "text-muted-foreground";

  return (
    <div className="flex items-center gap-3 bg-card rounded-xl border border-border/50 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer group">
      {/* Rank */}
      <span className={`text-lg font-black w-8 text-center ${rankColor}`}>
        {rank}
      </span>

      {/* Avatar with tier border */}
      <div className="relative flex-shrink-0">
        {isImmortal ? (
          <div className="relative w-12 h-12">
            <div
              className="absolute inset-[-3px] rounded-full immortal-ring"
              style={{
                background: "conic-gradient(hsl(48 96% 70%), hsl(36 100% 55%), hsl(280 80% 60%), hsl(200 100% 60%), hsl(48 96% 70%))",
              }}
            />
            <div className="absolute inset-0 rounded-full bg-card" style={{ margin: "2px" }} />
            <img
              src={creator.avatarUrl}
              alt={creator.name}
              className="absolute inset-0 w-full h-full rounded-full object-cover"
              style={{ margin: "3px", width: "calc(100% - 6px)", height: "calc(100% - 6px)" }}
              loading="lazy"
            />
          </div>
        ) : (
          <div
            className="w-12 h-12 rounded-full overflow-hidden"
            style={{
              boxShadow: highTier ? `0 0 8px ${borderColor}40` : "none",
              border: `2.5px solid ${borderColor}`,
            }}
          >
            <img src={creator.avatarUrl} alt={creator.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}

        {/* Badge icon */}
        <img
          src={tierBadgeImages[creator.tier]}
          alt={creator.tier}
          className="absolute -bottom-1 -right-1 w-5 h-5 object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{creator.name}</p>
        <p className="text-[11px] text-muted-foreground">
          {creator.followers.toLocaleString()} followers
        </p>
      </div>

      {/* Aura */}
      <div className="flex items-center gap-1.5 bg-secondary/60 rounded-lg px-3 py-1.5">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-bold text-foreground">{creator.aura.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Creators;
