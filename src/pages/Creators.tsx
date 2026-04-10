import { useState, useMemo } from "react";
import { Search, ArrowLeft, Crown, ChevronDown, Zap, Image, Video, BookOpen, Users, Heart } from "lucide-react";
import AuraIcon from "@/components/AuraIcon";
import { useNavigate } from "react-router-dom";
import { type BadgeTier } from "@/components/BadgeCard";
import creator1 from "@/assets/creator1_new.jpg";
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

type CreationType = "all" | "characters" | "images" | "videos" | "stories";
type SortBy = "aura" | "likes" | "followers";
type FilterBy = "all" | "year" | "month" | "week" | "today";

const creationTypeLabels: Record<CreationType, string> = {
  all: "All Creations",
  characters: "Characters",
  images: "Images",
  videos: "Videos",
  stories: "Stories",
};

const creationTypeIcons: Record<CreationType, React.ReactNode> = {
  all: <Users className="w-4 h-4" />,
  characters: <Users className="w-4 h-4" />,
  images: <Image className="w-4 h-4" />,
  videos: <Video className="w-4 h-4" />,
  stories: <BookOpen className="w-4 h-4" />,
};

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
    likes: Math.floor(80000 / (i + 1)) + Math.floor(Math.random() * 2000),
    aura: Math.floor(100000 / (i + 1)) + Math.floor(Math.random() * 1000),
    trending: i < 10,
    joinedDaysAgo: Math.floor(Math.random() * 365) + 1,
    topCreationType: (["characters", "images", "videos", "stories"] as const)[i % 4],
    creations: {
      characters: Math.floor(Math.random() * 50) + 1,
      images: Math.floor(Math.random() * 200) + 5,
      videos: Math.floor(Math.random() * 30),
      stories: Math.floor(Math.random() * 40) + 2,
    },
  };
});

const Creators = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("aura");
  const [sortOpen, setSortOpen] = useState(false);
  const [creationOpen, setCreationOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterBy>("all");
  const [creationType, setCreationType] = useState<CreationType>("all");

  const sortLabels: Record<SortBy, string> = { aura: "Most Aura", likes: "Most Liked", followers: "Most Followers" };
  const filterLabels: Record<FilterBy, string> = { all: "All time", year: "Year", month: "Month", week: "Week", today: "Today" };
  const filterOptions: FilterBy[] = ["all", "year", "month", "week", "today"];
  const creationOptions: CreationType[] = ["all", "characters", "images", "videos", "stories"];

  const showExtraFilters = sortBy === "likes";

  const filtered = useMemo(() => {
    let list = [...mockCreators];
    if (search) list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    if (showExtraFilters && creationType !== "all") list = list.filter(c => c.creations[creationType] > 0);
    // Time filter is mock — in real app would filter by date range
    // For now just keeps the state for UI purposes
    if (sortBy === "likes") list.sort((a, b) => b.likes - a.likes);
    else if (sortBy === "followers") list.sort((a, b) => b.followers - a.followers);
    else list.sort((a, b) => b.aura - a.aura);
    return list;
  }, [search, sortBy, filterBy, creationType, showExtraFilters]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Decorative luxury background */}
      <div className="absolute top-0 left-0 right-0 h-[500px] overflow-hidden pointer-events-none">
        {/* Primary deep blue glow — centered, dramatic */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 90% 60% at 50% -10%, hsl(213 100% 50% / 0.14) 0%, transparent 70%)",
          }}
        />
        {/* Gold accent — top right, luxury feel */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 40% 50% at 80% -5%, hsl(40 80% 55% / 0.08) 0%, transparent 60%)",
          }}
        />
        {/* Subtle warm accent — left side */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 35% 45% at 15% 5%, hsl(30 60% 50% / 0.05) 0%, transparent 55%)",
          }}
        />
        {/* Noise/grain texture for depth */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Horizontal gold line accent */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[200px] h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(40 80% 55% / 0.3), transparent)",
          }}
        />
        {/* Bottom fade to background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to top, hsl(var(--background)), transparent)",
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <Crown className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Creators</h1>
          </div>
        </div>

        {/* Search bar — always visible when active */}
        {searchActive && (
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 flex-1">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                autoFocus
                value={search}
                onChange={e => { setSearch(e.target.value); if (!e.target.value) setSearchActive(false); }}
                onKeyDown={e => { if (e.key === "Enter" && search.trim()) setSearchActive(true); }}
                placeholder="Search..."
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none flex-1"
              />
              <button
                onClick={() => { setSearch(""); setSearchActive(false); setSearchOpen(false); }}
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Filters — hidden during active search */}
        {!searchActive && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {/* Sort dropdown with popover */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors"
              >
                {sortLabels[sortBy]}
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                  <div className="absolute top-full left-0 mt-2 z-50 bg-card border border-border rounded-xl overflow-hidden shadow-lg min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-150">
                    {(["likes", "followers", "aura"] as SortBy[]).map((option) => (
                      <button
                        key={option}
                        onClick={() => { setSortBy(option); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                          sortBy === option
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-accent/50"
                        }`}
                      >
                        {sortLabels[option]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Creation type dropdown — only when "Most Liked" */}
            {showExtraFilters && (
              <div className="relative">
                <button
                  onClick={() => setCreationOpen(!creationOpen)}
                  className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors animate-in fade-in slide-in-from-left-2 duration-200"
                >
                  {creationTypeIcons[creationType]}
                  {creationTypeLabels[creationType]}
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${creationOpen ? "rotate-180" : ""}`} />
                </button>
                {creationOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setCreationOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 z-50 bg-card border border-border rounded-xl overflow-hidden shadow-lg min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-150">
                      {creationOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => { setCreationType(option); setCreationOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            creationType === option
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-accent/50"
                          }`}
                        >
                          {creationTypeIcons[option]}
                          {creationTypeLabels[option]}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Time filter — only when "Most Liked" */}
            {showExtraFilters && (
              <div className="relative">
                <button
                  onClick={() => setTimeOpen(!timeOpen)}
                  className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors animate-in fade-in slide-in-from-left-2 duration-200"
                >
                  {filterLabels[filterBy]}
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${timeOpen ? "rotate-180" : ""}`} />
                </button>
                {timeOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setTimeOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 z-50 bg-card border border-border rounded-xl overflow-hidden shadow-lg min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-150">
                      {filterOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => { setFilterBy(option); setTimeOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                            filterBy === option
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-accent/50"
                          }`}
                        >
                          {filterLabels[option]}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="flex-1" />
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 animate-in slide-in-from-right-4 duration-200">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  autoFocus
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && search.trim()) setSearchActive(true); }}
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
        )}

        {/* Top 3 Podium - Enhanced */}
        {!searchActive && !search && filtered.length >= 3 && (
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

                    {/* Stat pill — synced with sort */}
                    <div
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                      style={{
                        background: sortBy === "likes"
                          ? "hsl(0 70% 50% / 0.15)"
                          : `linear-gradient(135deg, hsl(${glowHsl} / 0.2), hsl(${glowHsl} / 0.05))`,
                        boxShadow: sortBy === "likes"
                          ? "0 0 12px hsl(0 70% 50% / 0.1)"
                          : `0 0 12px hsl(${glowHsl} / 0.15)`,
                      }}
                    >
                      {sortBy === "likes" ? (
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                      ) : sortBy === "followers" ? (
                        <Users className="w-3.5 h-3.5" style={{ color: `hsl(${glowHsl})` }} />
                      ) : (
                        <AuraIcon className="w-3.5 h-3.5" style={{ color: `hsl(${glowHsl})` }} />
                      )}
                      <span className="text-[11px] font-black text-foreground">
                        {sortBy === "likes"
                          ? creator.likes.toLocaleString()
                          : sortBy === "followers"
                          ? creator.followers.toLocaleString()
                          : creator.aura.toLocaleString()}
                      </span>
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


        {/* Creator List */}
        <div className="space-y-2">
          {searchActive && search && (
            <p className="text-xs text-muted-foreground mb-3">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
            </p>
          )}
          {searchActive || search ? (
            filtered.map((creator) => (
              <SearchResultCard key={creator.id} creator={creator} />
            ))
          ) : (
            filtered.slice(3).map((creator, idx) => (
              <CreatorRow
                key={creator.id}
                creator={creator}
                rank={idx + 4}
                creationType={creationType}
                sortBy={sortBy}
              />
            ))
          )}
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
  creationType: CreationType;
  sortBy: SortBy;
}

const CreatorRow = ({ creator, rank, creationType, sortBy }: CreatorRowProps) => {
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
          {creationType !== "all" && (
            <span className="text-muted-foreground ml-1">· {creator.creations[creationType]} {creationType}</span>
          )}
        </p>
      </div>

      {/* Stat pill */}
      <div
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
        style={{
          background: sortBy === "likes"
            ? "hsl(0 70% 50% / 0.1)"
            : highTier
            ? `linear-gradient(135deg, hsl(${glowHsl} / 0.12), hsl(${glowHsl} / 0.05))`
            : "hsl(var(--secondary) / 0.6)",
        }}
      >
        {sortBy === "likes" ? (
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
        ) : sortBy === "followers" ? (
          <Users className="w-3.5 h-3.5 text-primary" />
        ) : (
          <AuraIcon className="w-3.5 h-3.5 text-primary" />
        )}
        <span className="text-xs font-bold text-foreground">
          {sortBy === "likes"
            ? creator.likes.toLocaleString()
            : sortBy === "followers"
            ? creator.followers.toLocaleString()
            : creator.aura.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const SearchResultCard = ({ creator }: { creator: typeof mockCreators[0] }) => {
  const borderColor = tierBorderColors[creator.tier];

  return (
    <div className="flex items-center gap-4 bg-card rounded-xl border border-border/50 px-5 py-4 hover:bg-accent/50 transition-all duration-200 cursor-pointer group hover:border-border">
      {/* Avatar — larger for search */}
      <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0" style={{ border: `1.5px solid ${borderColor}80` }}>
        <img src={creator.avatarUrl} alt={creator.name} className="w-full h-full object-cover" loading="lazy" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{creator.name}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {creator.followers.toLocaleString()} followers · {creator.aura.toLocaleString()} aura
        </p>
      </div>

      {/* Likes */}
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Heart className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">{creator.likes.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Creators;
