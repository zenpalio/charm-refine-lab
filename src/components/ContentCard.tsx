import { Heart, MoreHorizontal } from "lucide-react";

interface ContentCardProps {
  imageUrl: string;
  likeCount: number;
  rank?: number;
}

const ContentCard = ({ imageUrl, likeCount, rank }: ContentCardProps) => {
  return (
    <div className="relative flex-shrink-0 flex items-end">
      {rank !== undefined && (
        <span
          className="text-[120px] font-black leading-none select-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px hsl(var(--muted-foreground) / 0.3)",
            marginRight: "-24px",
            zIndex: 0,
          }}
        >
          {rank}
        </span>
      )}
      <div className="relative w-[140px] h-[200px] rounded-xl overflow-hidden cursor-pointer group z-10">
        <img src={imageUrl} alt="Content" className="w-full h-full object-cover" loading="lazy" />
        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-background/50 text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Heart className="w-3.5 h-3.5" />
            <span className="text-xs">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
