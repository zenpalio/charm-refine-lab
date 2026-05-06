import { ArrowUpRight, type LucideIcon } from "lucide-react";

type PromoBannerProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  cta?: string;
  href?: string;
  accent?: string; // hsl color string
};

const PromoBanner = ({
  icon: Icon,
  title,
  description,
  cta = "Learn more",
  href = "#",
  accent = "hsl(213 100% 50%)",
}: PromoBannerProps) => {
  return (
    <a
      href={href}
      className="group flex w-full items-center gap-4 rounded-2xl border border-white/[0.06] bg-grey-dark-1/60 px-5 py-4 transition-colors hover:border-white/10 hover:bg-grey-dark-1 md:gap-5 md:px-6 md:py-5"
    >
      {/* Icon */}
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] md:h-12 md:w-12"
        style={{ color: accent }}
      >
        <Icon className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-white md:text-base">
          {title}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-grey-light-3 md:text-[13px]">
          {description}
        </p>
      </div>

      {/* CTA */}
      <div className="hidden shrink-0 items-center gap-1 text-xs font-medium text-grey-light-3 transition-colors group-hover:text-white sm:flex">
        <span>{cta}</span>
        <ArrowUpRight className="h-3.5 w-3.5" />
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-grey-light-3 transition-colors group-hover:text-white sm:hidden" />
    </a>
  );
};

export default PromoBanner;
