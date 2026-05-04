import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquare, Play, Plus } from "lucide-react";

export interface HeroSlide {
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  tags?: string[];
  meta?: { messages?: string; likes?: string };
}

interface Props {
  slides: HeroSlide[];
  intervalMs?: number;
}

const CinematicHero = ({ slides, intervalMs = 7000 }: Props) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const startRef = useRef<number>(performance.now());
  const [progress, setProgress] = useState(0);

  // Auto-rotate with progress
  useEffect(() => {
    if (paused) return;
    startRef.current = performance.now();
    setProgress(0);
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - startRef.current) / intervalMs);
      setProgress(p);
      if (p >= 1) {
        setActive((a) => (a + 1) % slides.length);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, intervalMs, slides.length]);

  const go = (i: number) => setActive((i + slides.length) % slides.length);
  const slide = slides[active];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(520px, 78vh, 760px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Layered backdrops — crossfade */}
      {slides.map((s, i) => (
        <div
          key={s.name + i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== active}
        >
          {/* Blurred full-bleed extension of the portrait */}
          <img
            src={s.imageUrl}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl saturate-125 opacity-70"
          />
          <div className="absolute inset-0 bg-background/40" />

          {/* Sharp 13:19 portrait, anchored right, full hero height */}
          <div className="absolute inset-y-0 right-0 hidden md:block">
            <div className="relative h-full" style={{ aspectRatio: "13 / 19" }}>
              <img
                src={s.imageUrl}
                alt={s.name}
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              {/* Soft left edge fade so portrait blends into backdrop */}
              <div
                className="absolute inset-y-0 left-0 w-1/3"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--background)) 0%, transparent 100%)",
                }}
              />
              {/* Bottom fade into next sections */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, hsl(var(--background)) 100%)",
                }}
              />
            </div>
          </div>

          {/* Mobile: portrait centered & faded */}
          <div className="absolute inset-0 md:hidden">
            <img
              src={s.imageUrl}
              alt={s.name}
              className="h-full w-full object-cover object-center opacity-90"
            />
          </div>

          {/* Cinematic left-to-right + bottom-up gradient over everything */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.85) 35%, hsl(var(--background) / 0.2) 70%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, hsl(var(--background)) 100%)",
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-end px-6 pb-20 md:items-center md:pb-0">
        <div key={slide.name} className="max-w-xl animate-fade-in space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Featured today
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] text-white drop-shadow-lg md:text-6xl">
            {slide.name}
          </h1>
          <p className="text-base font-medium text-white/80 md:text-lg">
            {slide.tagline}
          </p>
          <p className="line-clamp-3 max-w-lg text-sm text-grey-light-3 md:text-base">
            {slide.description}
          </p>

          {slide.tags && slide.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {slide.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-[5px] bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {slide.meta && (
            <div className="flex items-center gap-4 text-xs text-white/70">
              {slide.meta.messages && (
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {slide.meta.messages} chats
                </span>
              )}
              {slide.meta.likes && <span>♥ {slide.meta.likes}</span>}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-black transition-transform hover:scale-[1.03]">
              <Play className="h-4 w-4 fill-black" />
              Chat now
            </button>
            <button className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
              <Plus className="h-4 w-4" />
              More info
            </button>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(active - 1)}
        aria-label="Previous"
        className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/70 md:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(active + 1)}
        aria-label="Next"
        className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/70 md:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Progress indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="group h-1 w-10 overflow-hidden rounded-full bg-white/20"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className="block h-full bg-white transition-[width] duration-150 ease-linear"
              style={{
                width:
                  i < active
                    ? "100%"
                    : i === active
                    ? `${progress * 100}%`
                    : "0%",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default CinematicHero;
