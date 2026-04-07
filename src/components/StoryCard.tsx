import { BookOpen, Layers } from "lucide-react";

interface StoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  episodes: number;
  scenes: number;
  tag?: string;
}

const StoryCard = ({ title, description, imageUrl, episodes, scenes, tag = "Story" }: StoryCardProps) => {
  return (
    <div className="flex-shrink-0 w-[320px] rounded-2xl overflow-hidden bg-card border border-border/30 cursor-pointer group hover:border-primary/20 transition-all">
      {/* Cover */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

        {/* Tag pill */}
        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-sm text-foreground border border-border/30">
            <BookOpen className="w-3.5 h-3.5" />
            {tag}
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-foreground leading-tight">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-2">
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">{description}</p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="flex items-center gap-1.5 text-xs">
            <BookOpen className="w-3.5 h-3.5" />
            {episodes} episode{episodes !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <Layers className="w-3.5 h-3.5" />
            {scenes} scenes
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
