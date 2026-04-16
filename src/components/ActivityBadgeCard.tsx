import { useState } from "react";
import { Check, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface ActivityBadgeCardProps {
  name: string;
  description: string;
  imageUrl: string;
  completed: boolean;
  actionLabel: string;
  actionUrl?: string;
  onComplete?: () => void;
}

const ActivityBadgeCard = ({ name, description, imageUrl, completed, actionLabel, actionUrl, onComplete }: ActivityBadgeCardProps) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleAction = () => {
    if (actionUrl) {
      window.open(actionUrl, "_blank");
    }
    if (onComplete) {
      onComplete();
      setIsCompleted(true);
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-2 min-w-[145px] sm:min-w-[170px] ${isCompleted ? "" : ""}`}
    >
      <div
        className={`relative w-[140px] h-[140px] sm:w-[164px] sm:h-[164px] rounded-[1.25rem] sm:rounded-[1.75rem] border border-border/30 flex items-center justify-center transition-transform duration-300 ${
          isCompleted ? "hover:scale-[1.03]" : "hover:scale-[1.02]"
        }`}
        style={{ backgroundColor: "hsl(var(--popover))", backgroundImage: "none" }}
      >
        <img
          src={imageUrl}
          alt={name}
          className={`w-[100px] h-[100px] sm:w-[116px] sm:h-[116px] object-contain ${isCompleted ? "" : "grayscale opacity-50"}`}
          loading="lazy"
          width={512}
          height={512}
        />

        {isCompleted && (
          <div className="absolute -top-1.5 -right-1.5 z-20 text-[9px] font-bold px-2 py-0.5 rounded-full text-muted-foreground border border-border/30" style={{ backgroundColor: "hsl(var(--muted))" }}>
            <Check className="w-3 h-3" />
          </div>
        )}
      </div>

      <p className="text-xs font-semibold text-foreground text-center">{name}</p>
      <p className="text-[10px] text-muted-foreground text-center max-w-[140px]">{description}</p>

      {!isCompleted && (
        <Button
          size="sm"
          variant="outline"
          className="text-[10px] h-7 px-3 rounded-full gap-1"
          onClick={handleAction}
        >
          {actionUrl && <ExternalLink className="w-3 h-3" />}
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default ActivityBadgeCard;
