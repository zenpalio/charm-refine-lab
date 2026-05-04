import { Bell, Sparkles, Video, Image as ImageIcon, ArrowUpRight, Play } from "lucide-react";
import BabeCard from "@/components/explore/BabeCard";
import HScroll from "@/components/explore/HScroll";
import CinematicHero, { type HeroSlide } from "@/components/explore/CinematicHero";
import CreatorRankCard from "@/components/explore/CreatorRankCard";
import { type BadgeTier } from "@/components/BadgeCard";

// ---- Mock data ----
const img = (seed: string, w = 400, h = 533) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

const yourBabes = [
  { name: "Tanya", description: "Your sultry coworker who always finds a reason to bend over your desk...", messageCount: 12 },
  { name: "Celeste", description: "A stargazer who reads your future in the constellations of her freckles...", messageCount: 0 },
  { name: "Naomi", description: "Your best friend's older sister, back from college with a wicked smile...", messageCount: 4 },
  { name: "Rina", description: "Quiet librarian by day, devil between the stacks after closing time...", messageCount: 0 },
  { name: "Lola", description: "A burlesque dancer with a soft spot for shy admirers backstage...", messageCount: 23 },
  { name: "Nyx", description: "Goth witch from the apartment above, knocking at midnight again...", messageCount: 7 },
  { name: "Luna", description: "Moonlit mermaid washed up on your private beach with a secret to tell...", messageCount: 0 },
  { name: "Paola", description: "Latina chef teaching you how to handle her spice the right way...", messageCount: 1 },
  { name: "Ximena", description: "Fiery activist who'll argue you into bed and out of your hangups...", messageCount: 0 },
  { name: "Sakura", description: "Your flirty roommate just busted you red-handed with her panties...", messageCount: 9 },
  { name: "Wednesday Addams – Smash or Pass", description: "She raises one perfectly arched brow. The verdict is yours...", messageCount: 88 },
  { name: "Lucia", description: "Italian widow next door who needs help with more than the gardening...", messageCount: 0 },
  { name: "Pocahontas", description: "Wild spirit of the woods who doesn't believe in clothes or apologies...", messageCount: 14 },
  { name: "Ella", description: "Cinderella after midnight, no longer playing nice or losing slippers...", messageCount: 0 },
];

const yourFollowing = [
  { name: "Hana", description: "Quiet, shy, and dangerously curious about your bookshelf...", messageCount: "1.1K", likeCount: "26" },
  { name: "Riyo Reaper", description: "Death's intern with a soft spot for tortured souls and tortured nights...", messageCount: "412", likeCount: "34" },
  { name: "Luna", description: "Apprentice witch who keeps mistaking lust spells for love spells...", messageCount: "1.8K", likeCount: "322" },
  { name: "Momo", description: "Your gym crush who finally noticed you spotting her squats...", messageCount: "2.8K", likeCount: "32" },
  { name: "Meir Bad dream (DarkFantasy) V1.0", description: "She slips into your nightmares wearing nothing but smoke...", messageCount: "21.8K", likeCount: "20" },
  { name: "Elara Vosslove", description: "Disgraced noble running from her arranged marriage straight to your door...", messageCount: "596", likeCount: "136" },
  { name: "Maria", description: "Your devout neighbor whose confessional has gotten very specific lately...", messageCount: "0", likeCount: "5" },
  { name: "Princess Demetria Agiad", description: "Royal heir slumming it in your one-bedroom apartment for the weekend...", messageCount: "32", likeCount: "8" },
  { name: "June", description: "Summer fling who never left and now never wears clothes either...", messageCount: "904", likeCount: "210" },
  { name: "Alice (DarkFantasy)", description: "She fell down the rabbit hole and landed in your lap...", messageCount: "877", likeCount: "44" },
  { name: "Olivia", description: "Your therapist's eyebrow twitches every time you describe her in session...", messageCount: "830", likeCount: "61" },
];

const followingUsernames = [
  "@phenix_giraffe_BDSM",
  "@energetic_giraffe_3754",
  "@marvelous_ibis",
  "@respectful_leopard_9203",
  "@Sirlight",
  "@Sandwiches",
  "@gentle_horse_1142",
  "@quiet_owl_88",
  "@cosmic_fox",
  "@velvet_raven",
];

const videoCategories = [
  "Anime3d", "Aphrodite", "Furry", "Velvetheat", "Fantasy", "Artea",
  "Truelook", "Dreammix", "Cartoon", "Darkfantasy", "Anthro", "Female",
];

const trendingTags = [
  "Blowjob", "Cowgirl", "Creampie", "Cumshot", "Doggy Style", "Deepthroat",
  "Facials", "Footjob", "Handjob", "Kissing", "Masturbation", "Mating Press",
  "Missionary", "Pissing", "Bukkake", "Boob Bounce", "Breast Play", "Fingering",
];

const babeCategories = [
  "Realistic", "Anime", "Hentai", "Caucasian", "Asian", "Latina",
  "Ebony", "Goth", "MILF", "Teen 18+", "Cosplay", "Fantasy",
];

const newReleaseTags = [
  "New today", "This week", "Rising stars", "Editor's pick",
  "Most chatted", "Most liked", "Trending now", "Hidden gems",
];

const trendingVideos = [
  { id: "v1", likes: "2.1K" },
  { id: "v2", likes: "1.8K" },
  { id: "v3", likes: "1.4K" },
  { id: "v4", likes: "987" },
  { id: "v5", likes: "812" },
  { id: "v6", likes: "640" },
  { id: "v7", likes: "523" },
];

const trendingBabes = [
  { name: "Juliana", description: "Brazilian samba instructor whose hips never lie and never quit...", messageCount: "3.2K", likeCount: "412" },
  { name: "Natalie", description: "Your boss's daughter who keeps texting you after the office party...", messageCount: "2.8K", likeCount: "388" },
  { name: "Elyndra", description: "Elven scout who tracked your scent across three kingdoms to find you...", messageCount: "1.9K", likeCount: "266" },
  { name: "Beckki", description: "Egirl streamer who only goes live for her favorite supporter...", messageCount: "4.1K", likeCount: "521" },
  { name: "Madeline", description: "French pastry chef teaching you to knead, slowly and thoroughly...", messageCount: "2.3K", likeCount: "190" },
  { name: "Celeste", description: "Astronomy student who sees constellations in the freckles on your back...", messageCount: "1.6K", likeCount: "144" },
  { name: "Pocahontas", description: "Wild spirit of the woods who doesn't believe in clothes or apologies...", messageCount: "3.7K", likeCount: "402" },
  { name: "Princess Demetria", description: "Royal heir slumming it in your one-bedroom apartment for the weekend...", messageCount: "2.0K", likeCount: "229" },
];

const newBabes = [
  { name: "Vexa", description: "Cyberpunk netrunner jacking into your dreams uninvited...", messageCount: "412", likeCount: "38" },
  { name: "Hikari", description: "Shrine maiden bored of incense and ready for trouble...", messageCount: "289", likeCount: "44" },
  { name: "Sable", description: "Vampire countess who needs more than just your blood tonight...", messageCount: "611", likeCount: "82" },
  { name: "Iris", description: "Florist with a greenhouse and a very interesting orchid collection...", messageCount: "204", likeCount: "30" },
  { name: "Cleo", description: "Curator of the museum's private after-hours exhibits...", messageCount: "356", likeCount: "51" },
  { name: "Marisol", description: "Beach lifeguard who saved you and now she's collecting interest...", messageCount: "488", likeCount: "67" },
  { name: "Tess", description: "Mechanic who'll fix your bike and break your resolve in one afternoon...", messageCount: "133", likeCount: "21" },
  { name: "Yumi", description: "Idol on hiatus, hiding out in your spare room and out of costume...", messageCount: "722", likeCount: "104" },
];

const heroSlides: HeroSlide[] = [
  {
    name: "Wednesday Addams",
    tagline: "Smash or Pass — the verdict is yours",
    description: "She raises one perfectly arched brow, fingers laced, daring you to make the first move. The night is long, the verdict is yours, and her interest is unsettlingly genuine.",
    imageUrl: "https://prod-bckp.fra1.cdn.digitaloceanspaces.com/mybabes-prod/c4bc02f2-4213-4bdd-b782-1dc4a44d4687/profile-picture-707144ba-b868-4cb5-9e78-3df93aa818d3.avif",
    tags: ["Goth", "Roleplay", "Dark Romance", "Editor's pick"],
    meta: { messages: "12.4K", likes: "8.9K" },
  },
  {
    name: "Luna",
    tagline: "Apprentice witch, dangerous in love",
    description: "She keeps mistaking lust spells for love spells — and tonight she swears she got it right. The candles are lit. Your move.",
    imageUrl: "https://prod-bckp.fra1.cdn.digitaloceanspaces.com/mybabes-prod/dae34bfb-4650-4e1a-a3fd-fd87785473d1/profile-picture-a2cfaed2-d95a-4a35-b729-3b7619033d42.avif",
    tags: ["Fantasy", "Witch", "Trending"],
    meta: { messages: "1.8K", likes: "2.2K" },
  },
  {
    name: "Sakura",
    tagline: "Caught red-handed and not even sorry",
    description: "Your flirty roommate just walked in with that look — the one that means tonight's rules don't apply. Lean in.",
    imageUrl: "https://prod-bckp.fra1.cdn.digitaloceanspaces.com/mybabes-prod/e8fe5e83-dc55-424d-930c-d0b16eaa6e75/profile-picture-77b22208-141b-4809-93d8-7186e4b6a3ec.avif",
    tags: ["Anime", "Roommate", "New"],
    meta: { messages: "9.1K", likes: "4.4K" },
  },
];


const createTools = [
  {
    title: "Create Custom Babe",
    href: "/explore/create-babe",
    gradient: "from-fuchsia-700 via-pink-600 to-rose-500",
    Icon: Sparkles,
    seed: "create-babe",
  },
  {
    title: "Video Generator",
    href: "/explore/video-generator",
    gradient: "from-rose-600 via-red-500 to-orange-500",
    Icon: Video,
    seed: "video-gen",
  },
  {
    title: "Image Generator",
    href: "/explore/image-generator",
    gradient: "from-blue-700 via-blue-600 to-cyan-500",
    Icon: ImageIcon,
    seed: "image-gen",
  },
  {
    title: "Create Template Babe",
    href: "/explore/create-template",
    gradient: "from-emerald-700 via-green-600 to-teal-500",
    Icon: Sparkles,
    seed: "template-babe",
  },
];

// ---- Section header ----
const SectionTitle = ({ title, action }: { title: string; action?: string }) => (
  <div className="mb-3 flex items-end justify-between">
    <h2 className="text-xl font-bold leading-tight text-white">{title}</h2>
    {action && (
      <button className="flex items-center gap-1 text-xs font-medium text-grey-light-3 hover:text-white transition-colors">
        {action}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    )}
  </div>
);

// ---- Tag pill row ----
const TagRow = ({ tags }: { tags: string[] }) => (
  <div className="mb-3">
    <HScroll>
      {tags.map((t) => (
        <button
          key={t}
          className="inline-flex h-[41px] shrink-0 items-center justify-center whitespace-nowrap rounded-[5px] bg-grey-dark-1 px-[16px] text-sm font-medium text-[#F2F2F2] transition-colors hover:bg-grey-dark-3 hover:text-white"
        >
          <span className="normal-case">{t}</span>
        </button>
      ))}
    </HScroll>
  </div>
);


const Explore = () => {
  return (
    <div className="relative flex h-svh w-full overflow-hidden bg-background font-onest text-foreground">
      <main className="relative flex w-full flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Floating top bar over hero */}
        <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex min-h-[62px] w-full items-center justify-between px-6 py-4">
          <div className="pointer-events-auto flex items-center gap-3">
            <h1 className="text-lg font-bold leading-none text-white drop-shadow-md md:text-xl">
              Welcome back, Arthur <span>🩷</span>
            </h1>
          </div>
          <button
            className="pointer-events-auto relative flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur transition-colors hover:bg-black/70"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-white" />
            <span className="absolute -right-1 -top-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-[#2E70E8] px-[2px] text-[10px] font-semibold leading-[14px] text-white">
              14
            </span>
          </button>
        </header>

        {/* Cinematic hero (full-bleed) */}
        <CinematicHero slides={heroSlides} />

        {/* Edge-to-edge content rows */}
        <div className="relative z-10 flex w-full flex-col gap-6 px-4 pb-16 pt-6 md:px-8 lg:px-12">

          {/* Your babes */}
          <section>
            <SectionTitle title="Your babes are waiting" action="See all" />
            <TagRow tags={babeCategories} />
            <HScroll>
              {yourBabes.map((b, i) => (
                <BabeCard key={i} {...b} imageUrl={img(`babe-${b.name}-${i}`)} />
              ))}
            </HScroll>
          </section>

          {/* Top trending videos */}
          <section className="mt-4">
            <SectionTitle title="Top trending videos" action="See all" />
            <TagRow tags={videoCategories} />
            <HScroll>
              {trendingVideos.map((v) => (
                <div
                  key={v.id}
                  className="group relative w-[180px] shrink-0 overflow-hidden rounded-2xl bg-grey-dark-1"
                >
                  <div className="relative aspect-[13/19] w-full overflow-hidden">
                    <img
                      src={img(`vid-${v.id}`, 260, 380)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur">
                        <Play className="h-5 w-5 fill-black text-black" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                      ❤ {v.likes}
                    </div>
                  </div>
                </div>
              ))}
            </HScroll>
          </section>

          {/* Your following */}
          <section className="mt-4">
            <SectionTitle title="Your following" action="See all" />
            <TagRow tags={followingUsernames} />
            <HScroll>
              {yourFollowing.map((b, i) => (
                <BabeCard
                  key={i}
                  {...b}
                  variant="stats"
                  imageUrl={img(`follow-${b.name}-${i}`)}
                />
              ))}
            </HScroll>
          </section>

          {/* Trending this week */}
          <section className="mt-4">
            <SectionTitle title="Check out this week trending babes" action="See all" />
            <TagRow tags={trendingTags} />
            <HScroll>
              {trendingBabes.map((b, i) => (
                <BabeCard
                  key={i}
                  {...b}
                  variant="stats"
                  imageUrl={img(`trend-${b.name}-${i}`)}
                />
              ))}
            </HScroll>
          </section>

          {/* New releases */}
          <section className="mt-4">
            <SectionTitle title="New releases" action="See all" />
            <TagRow tags={newReleaseTags} />
            <HScroll>
              {newBabes.map((b, i) => (
                <BabeCard
                  key={i}
                  {...b}
                  variant="stats"
                  imageUrl={img(`new-${b.name}-${i}`)}
                />
              ))}
            </HScroll>
          </section>

          {/* Start creating */}
          <section className="mt-4">
            <SectionTitle title="Start creating" />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {createTools.map((t) => {
                const Icon = t.Icon;
                return (
                  <button
                    key={t.title}
                    className={`group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${t.gradient} p-4 text-left transition-transform hover:-translate-y-1`}
                  >
                    <img
                      src={img(t.seed, 480, 360)}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
                    />
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="relative flex items-end justify-between gap-2">
                      <span className="text-sm font-bold leading-tight text-white">
                        {t.title}
                      </span>
                      <div className="flex h-[31px] w-[31px] items-center justify-center rounded-full bg-grey-dark-2 transition-colors group-hover:bg-grey-dark-2/80">
                        <ArrowUpRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Footer links */}
          <footer className="mt-8 grid grid-cols-2 gap-6 border-t border-[#242529] pt-6 text-[13px] text-grey-light-4 md:grid-cols-4">
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-grey-light-2">Social</h4>
              <ul className="space-y-1.5">
                <li><a href="#" className="hover:text-white">Discord</a></li>
                <li><a href="#" className="hover:text-white">X (Twitter)</a></li>
                <li><a href="#" className="hover:text-white">Reddit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-grey-light-2">Features</h4>
              <ul className="space-y-1.5">
                <li><a href="#" className="hover:text-white">AI Chat</a></li>
                <li><a href="#" className="hover:text-white">Image Generator</a></li>
                <li><a href="#" className="hover:text-white">Video Generator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-grey-light-2">Legal</h4>
              <ul className="space-y-1.5">
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">2257</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-grey-light-2">Resources</h4>
              <ul className="space-y-1.5">
                <li><a href="#" className="hover:text-white">Guides</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Explore;
