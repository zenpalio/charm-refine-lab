import { useState, useMemo } from "react";
import { Search, ArrowLeft, Crown, ChevronDown, Zap } from "lucide-react";
import AuraIcon from "@/components/AuraIcon";
import { useNavigate } from "react-router-dom";
import { type BadgeTier } from "@/components/BadgeCard";
import creator1 from "@/assets/creator1.jpg";
import creator2 from "@/assets/creators/creator2.jpg";
import creator3 from "@/assets/creators/creator3.jpg";
import creator4 from "@/assets/creators/creator4.jpg";
import creator5 from "@/assets/creators/creator5.jpg";
import creator6 from "@/assets/creators/creator6.jpg";
import creator7 from "@/assets/creators/creator7.jpg";
import creator8 from "@/assets/creators/creator8.jpg";
import creator9 from "@/assets/creators/creator9.jpg";
import creator10 from "@/assets/creators/creator10.jpg";
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

const tierGlowColors: Record<BadgeTier, string> = {
  newbie: "25 45% 52%",
  master: "213 100% 60%",
  legend: "43 96% 58%",
  elite: "213 100% 50%",
  grandmaster: "0 82% 58%",
  mythic: "281 85% 62%",
  immortal: "48 96% 70%",
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
  const avatars = [creator1, creator2, creator3, creator4, creator5, creator6, creator7, creator8, creator9, creator10];
  return {
    id: i + 1,
    name: names[i],
    avatarUrl: avatars[i % avatars.length],
    tier,
    followers: Math.floor(50000 / (i + 1)) + Math.floor(Math.random() * 500),
    aura: Math.floor(100000 / (i + 1)) + Math.floor(Math.random() * 1000),
    trending: i < 10,
    joinedDaysAgo: Math.floor(Math.random() * 365) + 1,
    streak: Math.floor(Math.random() * 30) + 1,
  };
});

const Creators = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("aura");
  const [filterBy, setFilterBy] = useState<FilterBy>("all");

  const filtered = useMemo(() => {
    let list = [...mockCreators];
    if (search) list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
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
          <div className="flex items-center gap-2 flex-1">
            <Crown className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Top Creators</h1>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setSortBy(sortBy === "aura" ? "followers" : "aura")}
            className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors"
          >
            {sortBy === "aura" ? "Most Aura" : "Most Liked"}
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => setFilterBy(filterBy === "all" ? "trending" : filterBy === "trending" ? "newest" : "all")}
            className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors"
          >
            {filterBy === "all" ? "All time" : filterBy === "trending" ? "Trending" : "Newest"}
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1" />
          {searchOpen ? (
            <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 animate-in slide-in-from-right-4 duration-200">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                onBlur={() => { if (!search) setSearchOpen(false); }}
                placeholder="Search..."
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-32"
              />
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Top 3 Podium - Enhanced */}
        {filtered.length >= 3 && (
          <div className="relative mb-8 pt-2">
            {/* Ambient glow behind podium */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full bg-primary/10 blur-[80px]" />
            </div>

            <div className="flex items-end justify-center gap-2 relative z-10">
              {[filtered[1], filtered[0], filtered[2]].map((creator, i) => {
                const podiumRank = [2, 1, 3][i];
                const isFirst = podiumRank === 1;
                const avatarPx = isFirst ? 104 : 76;
                const borderColor = tierBorderColors[creator.tier];
                const glowHsl = tierGlowColors[creator.tier];
                const highTier = isHighTier(creator.tier);
                const isImmortalTier = creator.tier === "immortal";

                return (
                  <div
                    key={creator.id}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    style={{ marginTop: isFirst ? 0 : "28px" }}
                  >
                    {/* Crown for #1 */}
                    {isFirst && (
                      <div className="relative">
                        <Crown className="w-8 h-8 text-yellow-400 animate-bounce" style={{ animationDuration: "2s" }} />
                      </div>
                    )}

                    {/* Avatar with glow */}
                    <div
                      className="relative group-hover:scale-110 transition-transform duration-300"
                      style={{
                        filter: highTier ? `drop-shadow(0 0 ${isFirst ? 12 : 8}px hsl(${glowHsl} / 0.4))` : "none",
                      }}
                    >
                      <div
                          className="rounded-full overflow-hidden"
                          style={{ width: avatarPx, height: avatarPx, border: `1.5px solid ${borderColor}` }}
                        >
                          <img src={creator.avatarUrl} alt={creator.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      
                    </div>

                    {/* Name */}
                    <p className={`font-bold text-foreground truncate max-w-[110px] ${isFirst ? "text-base" : "text-sm"}`}>
                      {creator.name}
                    </p>

                    {/* Aura score with glow */}
                    <div
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, hsl(${glowHsl} / 0.2), hsl(${glowHsl} / 0.05))`,
                        boxShadow: `0 0 12px hsl(${glowHsl} / 0.15)`,
                      }}
                    >
                      <AuraIcon className={`w-3.5 h-3.5`} style={{ color: `hsl(${glowHsl})` }} />
                      <span className="text-[11px] font-black text-foreground">{creator.aura.toLocaleString()}</span>
                    </div>

                    {/* Podium block - gradient */}
                    <div
                      className="rounded-t-2xl flex flex-col items-center justify-center gap-1 border border-border/30"
                      style={{
                        width: isFirst ? 106 : 86,
                        height: isFirst ? 110 : podiumRank === 2 ? 76 : 58,
                        background: podiumRank === 1
                          ? "linear-gradient(180deg, hsl(43 96% 58% / 0.15) 0%, hsl(var(--card)) 100%)"
                          : podiumRank === 2
                          ? "linear-gradient(180deg, hsl(0 0% 70% / 0.1) 0%, hsl(var(--card)) 100%)"
                          : "linear-gradient(180deg, hsl(25 70% 45% / 0.1) 0%, hsl(var(--card)) 100%)",
                      }}
                    >
                      <span className={`text-3xl font-black ${
                        podiumRank === 1 ? "text-yellow-400" : podiumRank === 2 ? "text-gray-300" : "text-amber-600"
                      }`}>
                        {podiumRank}
                      </span>
                      {isFirst && (
                        <div className="flex items-center gap-0.5">
                          <Zap className="w-3 h-3 text-yellow-400" />
                          <span className="text-[9px] font-bold text-yellow-400/80">HOT</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}


        {/* Remaining Creators List */}
        <div className="space-y-2">
          {filtered.slice(3).map((creator, idx) => (
            <CreatorRow key={creator.id} creator={creator} rank={idx + 4} />
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
  const glowHsl = tierGlowColors[creator.tier];
  const highTier = isHighTier(creator.tier);
  const isImmortal = creator.tier === "immortal";
  

  const rankColor = rank <= 10 ? "text-foreground" : "text-muted-foreground";

  return (
    <div
      className="flex items-center gap-3 bg-card rounded-xl border border-border/50 px-4 py-3 hover:bg-accent/50 transition-all duration-200 cursor-pointer group hover:scale-[1.01] hover:border-border"
      style={{
        boxShadow: highTier ? `inset 0 0 30px hsl(${glowHsl} / 0.03)` : "none",
      }}
    >
      {/* Rank */}
      <span className={`text-lg font-black w-8 text-center ${rankColor}`}>
        {rank}
      </span>

      {/* Avatar */}
      <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-full overflow-hidden" style={{ border: `1.5px solid ${borderColor}80` }}>
            <img src={creator.avatarUrl} alt={creator.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
        
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-foreground truncate">{creator.name}</p>
          
        </div>
        <p className="text-[11px] text-muted-foreground">
          {creator.followers.toLocaleString()} followers
          
        </p>
      </div>

      {/* Aura pill */}
      <div
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
        style={{
          background: highTier
            ? `linear-gradient(135deg, hsl(${glowHsl} / 0.12), hsl(${glowHsl} / 0.05))`
            : "hsl(var(--secondary) / 0.6)",
        }}
      >
        <AuraIcon className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-bold text-foreground">{creator.aura.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Creators;
