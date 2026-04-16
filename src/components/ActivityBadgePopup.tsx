import { X, Check, ExternalLink, Trophy } from "lucide-react";
import { Button } from "./ui/button";

interface ActivityBadgePopupProps {
  name: string;
  description: string;
  imageUrl: string;
  completed: boolean;
  actionLabel: string;
  actionUrl?: string;
  onClose: () => void;
  onComplete?: () => void;
}

const ActivityBadgePopup = ({ name, description, imageUrl, completed, actionLabel, actionUrl, onClose, onComplete }: ActivityBadgePopupProps) => {
  const handleAction = () => {
    if (actionUrl) window.open(actionUrl, "_blank");
    onComplete?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md" onClick={onClose}>
      <div
        className="relative w-[320px] sm:w-[380px] rounded-2xl border border-border/20 p-6 flex flex-col items-center text-center overflow-hidden animate-in zoom-in-90 fade-in duration-500"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "hsl(var(--popover))",
          backgroundImage: "none",
          boxShadow: completed
            ? "0 0 60px hsl(142 76% 36% / 0.2), 0 0 120px hsl(142 76% 36% / 0.08)"
            : "0 25px 50px hsl(0 0% 0% / 0.3)",
        }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-20 rounded-full"
          style={{
            background: completed
              ? "linear-gradient(90deg, transparent, hsl(142 76% 36%), transparent)"
              : "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
          }}
        />

        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full">
          <X className="w-4 h-4" />
        </Button>

        {/* Status */}
        <div className="mb-4 mt-0.5">
          {completed ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: "hsl(142 76% 36% / 0.12)", color: "hsl(142 76% 36%)", border: "1px solid hsl(142 76% 36% / 0.25)" }}>
              <Trophy className="w-3 h-3" /> Completed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: "hsl(var(--primary) / 0.12)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.25)" }}>
              In Progress
            </span>
          )}
        </div>

        {/* Image */}
        <div className={`relative w-32 h-32 mb-4 ${completed ? "" : "grayscale-[50%] opacity-70"}`}>
          {completed && (
            <div className="absolute inset-2 rounded-full blur-2xl animate-pulse" style={{ backgroundColor: "hsl(142 76% 36%)", opacity: 0.2, animationDuration: "2.5s" }} />
          )}
          <img src={imageUrl} alt={name} className="relative z-10 w-full h-full object-contain" loading="lazy" width={512} height={512} />
        </div>

        <h2 className="text-lg font-bold text-foreground tracking-tight mb-0.5">{name}</h2>
        <p className="text-xs text-muted-foreground mb-5">{description}</p>

        {completed ? (
          <Button variant="ghost" size="lg" className="w-full rounded-xl border border-border/30" disabled style={{ backgroundColor: "hsl(var(--muted))" }}>
            <Check className="w-4 h-4" /> Completed
          </Button>
        ) : (
          <Button size="lg" className="w-full rounded-xl font-bold gap-2 hover:scale-[1.02] active:scale-95 transition-transform" onClick={handleAction}>
            {actionUrl && <ExternalLink className="w-4 h-4" />}
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActivityBadgePopup;
