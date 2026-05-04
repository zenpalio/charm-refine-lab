import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquare, Play, Plus } from "lucide-react";

export type HeroMedia =
  | { type: "image"; url: string }
  | { type: "video"; url: string; poster?: string };

export interface HeroSlide {
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  /** Optional gallery of additional images/videos cycled within the slide */
  media?: HeroMedia[];
  tags?: string[];
  meta?: { messages?: string; likes?: string };
}

interface Props {
  slides: HeroSlide[];
  intervalMs?: number;
  /** How long each media item within a slide stays before crossfading */
  mediaIntervalMs?: number;
}

const CinematicHero = ({ slides, intervalMs = 7000, mediaIntervalMs = 3500 }: Props) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const startRef = useRef<number>(performance.now());
  const [progress, setProgress] = useState(0);

  // Build a normalized media list per slide (always at least the imageUrl)
  const slideMedia = useMemo<HeroMedia[][]>(
    () =>
      slides.map((s) =>
        s.media && s.media.length > 0
          ? s.media
          : [{ type: "image", url: s.imageUrl }],
      ),
    [slides],
  );

  // Sub-index for cycling media within the active slide
  const [mediaIdx, setMediaIdx] = useState(0);

  // Reset media index when slide changes
  useEffect(() => {
    setMediaIdx(0);
  }, [active]);

  // Auto-cycle media within the active slide
  useEffect(() => {
    const list = slideMedia[active];
    if (!list || list.length <= 1 || paused) return;
    const id = window.setInterval(() => {
      setMediaIdx((i) => (i + 1) % list.length);
    }, mediaIntervalMs);
    return () => window.clearInterval(id);
  }, [active, paused, slideMedia, mediaIntervalMs]);

  // Auto-rotate slides with progress
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
      className="relative w-full shrink-0 overflow-hidden"
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
          {(() => {
            const list = slideMedia[i];
            // Main portrait always uses the FIRST media item — stable hero anchor.
            const m = list[0];
            return (
              <div className="absolute inset-0">
                {/* Blurred full-bleed backdrop */}
                <img
                  src={m.type === "image" ? m.url : (m.poster ?? s.imageUrl)}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full scale-125 object-cover blur-3xl saturate-150"
                />

                {/* Sharp portrait panel(s), anchored right (desktop). When the slide
                    has 2+ media, render two 13:19 panels side-by-side that each
                    crossfade through their own subset of the gallery. */}
                <div className="absolute inset-y-0 right-0 hidden h-full md:flex">
                  {(() => {
                    const list = slideMedia[i];
                    if (list.length < 2) {
                      return (
                        <HeroPanel
                          media={[m]}
                          name={s.name}
                          eager={i === 0}
                          paused={paused}
                          slotIndex={0}
                        />
                      );
                    }
                    // Split: panel 0 cycles odd indices starting at 0, panel 1 starts at 1
                    const panelA = list.filter((_, idx) => idx % 2 === 0);
                    const panelB = list.filter((_, idx) => idx % 2 === 1);
                    return (
                      <>
                        <HeroPanel
                          media={panelA}
                          name={s.name}
                          eager={i === 0}
                          paused={paused}
                          slotIndex={0}
                          withLeftFade
                        />
                        <HeroPanel
                          media={panelB}
                          name={s.name}
                          eager={false}
                          paused={paused}
                          slotIndex={1}
                        />
                      </>
                    );
                  })()}
                </div>

                {/* Mobile centered */}
                <div className="absolute inset-0 md:hidden">
                  {m.type === "image" ? (
                    <img
                      src={m.url}
                      alt={s.name}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <video
                      src={m.url}
                      poster={m.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover object-center"
                    />
                  )}
                </div>
              </div>
            );
          })()}

          {/* Readability gradient — darkens text side only, lets backdrop breathe */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.7) 25%, hsl(var(--background) / 0.25) 55%, transparent 75%)",
            }}
          />
          {/* Bottom-up vignette into rows */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, hsl(var(--background)) 100%)",
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

      {/* Filmstrip — only when the active slide has 2+ media items */}
      {(() => {
        const list = slideMedia[active];
        if (!list || list.length < 2) return null;
        const slotCount = Math.min(3, list.length - 1);
        return (
          <div
            key={`strip-${active}`}
            className="pointer-events-none absolute bottom-20 right-6 z-20 hidden items-end gap-3 md:flex"
          >
            {Array.from({ length: slotCount }).map((_, slotI) => (
              <FilmstripCard
                key={slotI}
                media={list}
                slotIndex={slotI}
                paused={paused}
              />
            ))}
          </div>
        );
      })()}

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

/**
 * Small card on the right side of the hero that crossfades through the
 * character's media gallery on its own staggered timer. Each slot starts at a
 * different media index so cards never show the same image at once.
 */
const FilmstripCard = ({
  media,
  slotIndex,
  paused,
}: {
  media: HeroMedia[];
  slotIndex: number;
  paused: boolean;
}) => {
  // Skip the first item (it's already the main hero portrait) and offset by slot
  const pool = media.length > 1 ? media.slice(1) : media;
  const [idx, setIdx] = useState(slotIndex % pool.length);

  useEffect(() => {
    if (paused || pool.length <= 1) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % pool.length);
    }, 4200 + slotIndex * 600);
    return () => window.clearInterval(id);
  }, [paused, pool.length, slotIndex]);

  return (
    <div
      className="pointer-events-auto relative overflow-hidden rounded-xl border border-white/10 shadow-2xl ring-1 ring-black/20 transition-transform hover:scale-[1.04]"
      style={{ width: "120px", aspectRatio: "13 / 19" }}
    >
      {pool.map((m, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          {m.type === "image" ? (
            <img src={m.url} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <video
              src={m.url}
              poster={m.poster}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          )}
        </div>
      ))}
      {/* Soft top sheen */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 0% / 0.25) 0%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default CinematicHero;
