import { Heart, MoreHorizontal } from "lucide-react";

interface ContentCardProps {
  imageUrl: string;
  likeCount: number;
}

const ContentCard = ({ imageUrl, likeCount }: ContentCardProps) => {
  return (
    <div className="relative flex-shrink-0 w-[200px] h-[260px] rounded-xl overflow-hidden cursor-pointer group">
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
  );
};

export default ContentCard;
