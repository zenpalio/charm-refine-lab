import { Check, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface ActivityBadgeCardProps {
  name: string;
  description: string;
  imageUrl: string;
  completed: boolean;
  actionLabel: string;
  actionUrl?: string;
  onClick?: () => void;
}

const ActivityBadgeCard = ({ name, description, imageUrl, completed, actionLabel, actionUrl, onClick }: ActivityBadgeCardProps) => {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={onClick}>
      <div
        className="relative w-full aspect-square max-w-[164px] rounded-[1.25rem] sm:rounded-[1.75rem] border border-border/30 flex items-center justify-center transition-transform duration-300 hover:scale-[1.03]"
        style={{ backgroundColor: "hsl(var(--popover))", backgroundImage: "none" }}
      >
        <img
          src={imageUrl}
          alt={name}
          className={`w-[100px] h-[100px] sm:w-[116px] sm:h-[116px] object-contain ${completed ? "" : "grayscale opacity-50"}`}
          loading="lazy"
          width={512}
          height={512}
        />
        {completed && (
          <div className="absolute -top-1.5 -right-1.5 z-20 text-[9px] font-bold px-2 py-0.5 rounded-full text-muted-foreground border border-border/30" style={{ backgroundColor: "hsl(var(--muted))" }}>
            <Check className="w-3 h-3" />
          </div>
        )}
      </div>
      <p className="text-xs font-semibold text-foreground text-center">{name}</p>
      <p className="text-[10px] text-muted-foreground text-center max-w-[140px]">{description}</p>
    </div>
  );
};

export default ActivityBadgeCard;
