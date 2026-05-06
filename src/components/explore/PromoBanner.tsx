import { ArrowUpRight } from "lucide-react";

type PromoBannerProps = {
  eyebrow?: string;
  title: string;
  description: string;
  cta: string;
  imageUrl: string;
  accent?: string; // hsl color string
  href?: string;
};

const PromoBanner = ({
  eyebrow,
  title,
  description,
  cta,
  imageUrl,
  accent = "hsl(213 100% 50%)",
  href = "#",
}: PromoBannerProps) => {
  return (
    <a
      href={href}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/5 bg-grey-dark-1"
    >
      <div className="relative h-[140px] w-full sm:h-[160px] md:h-[180px]">
        {/* Background image */}
        <img
          src={imageUrl}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, hsl(0 0% 0% / 0.85) 0%, hsl(0 0% 0% / 0.55) 50%, hsl(0 0% 0% / 0.15) 100%)",
          }}
        />

        {/* Accent glow */}
        <div
          className="pointer-events-none absolute -left-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: accent }}
        />

        {/* Content */}
        <div className="relative flex h-full items-center justify-between gap-4 px-5 md:px-7">
          <div className="min-w-0 max-w-[75%]">
            {eyebrow && (
              <span
                className="mb-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
                style={{ background: accent }}
              >
                {eyebrow}
              </span>
            )}
            <h3 className="text-base font-bold leading-tight text-white md:text-lg">
              {title}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-snug text-grey-light-3 md:text-sm">
              {description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-black transition-transform group-hover:translate-x-0.5 md:text-sm">
            <span className="hidden sm:inline">{cta}</span>
            <ArrowUpRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default PromoBanner;
