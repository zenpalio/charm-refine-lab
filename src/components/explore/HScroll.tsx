import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";

interface HScrollProps {
  children: ReactNode;
}

const HScroll = ({ children }: HScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <div className="group/scroll relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/80 group-hover/scroll:opacity-100 md:flex"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/80 group-hover/scroll:opacity-100 md:flex"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <div ref={ref} className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth pb-1">
        {children}
      </div>
    </div>
  );
};

export default HScroll;
