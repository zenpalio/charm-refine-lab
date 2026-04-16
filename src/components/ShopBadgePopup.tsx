import { X, Check, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import TokenIcon from "./TokenIcon";

interface ShopBadgePopupProps {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  owned: boolean;
  onClose: () => void;
  onBuy?: () => void;
}

const ShopBadgePopup = ({ name, description, imageUrl, price, owned, onClose, onBuy }: ShopBadgePopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md" onClick={onClose}>
      <div
        className="relative w-[320px] sm:w-[380px] rounded-2xl border border-border/20 p-6 flex flex-col items-center text-center overflow-hidden animate-in zoom-in-90 fade-in duration-500"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "hsl(var(--popover))",
          backgroundImage: "none",
          boxShadow: owned
            ? "0 0 60px hsl(43 96% 58% / 0.2), 0 0 120px hsl(43 96% 58% / 0.08)"
            : "0 25px 50px hsl(0 0% 0% / 0.3)",
        }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-20 rounded-full"
          style={{
            background: owned
              ? "linear-gradient(90deg, transparent, hsl(43 96% 58%), transparent)"
              : "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
          }}
        />

        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full">
          <X className="w-4 h-4" />
        </Button>

        {/* Status */}
        <div className="mb-4 mt-0.5">
          {owned ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: "hsl(43 96% 58% / 0.12)", color: "hsl(43 96% 58%)", border: "1px solid hsl(43 96% 58% / 0.25)" }}>
              <Check className="w-3 h-3" /> Owned
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: "hsl(var(--primary) / 0.12)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.25)" }}>
              <ShoppingCart className="w-3 h-3" /> Available
            </span>
          )}
        </div>

        {/* Image */}
        <div className="relative w-32 h-32 mb-4">
          {owned && (
            <div className="absolute inset-2 rounded-full blur-2xl animate-pulse" style={{ backgroundColor: "hsl(43 96% 58%)", opacity: 0.2, animationDuration: "2.5s" }} />
          )}
          <img src={imageUrl} alt={name} className="relative z-10 w-full h-full object-contain" loading="lazy" width={512} height={512} />
        </div>

        <h2 className="text-lg font-bold text-foreground tracking-tight mb-0.5">{name}</h2>
        <p className="text-xs text-muted-foreground mb-5">{description}</p>

        {/* Price card */}
        <div
          className="relative mb-5 px-5 py-4 rounded-2xl w-full overflow-hidden backdrop-blur-xl"
          style={{
            background: "hsl(0 0% 100% / 0.03)",
            border: `1px solid ${owned ? "hsl(43 96% 58% / 0.45)" : "hsl(0 0% 100% / 0.25)"}`,
          }}
        >
          <div className="relative flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
              style={{ background: "hsl(0 0% 100% / 0.05)", border: "1px solid hsl(0 0% 100% / 0.08)" }}
            >
              <TokenIcon className="w-6 h-6" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-foreground font-extrabold text-xl leading-tight tracking-tight">{price.toLocaleString()}</span>
              <span className="text-[10px] text-muted-foreground/70 uppercase tracking-widest font-medium">tokens</span>
            </div>
          </div>
        </div>

        {owned ? (
          <Button variant="ghost" size="lg" className="w-full rounded-xl border border-border/30" disabled style={{ backgroundColor: "hsl(var(--muted))" }}>
            <Check className="w-4 h-4" /> Owned
          </Button>
        ) : (
          <Button size="lg" className="w-full rounded-xl font-bold gap-2 hover:scale-[1.02] active:scale-95 transition-transform" onClick={onBuy}>
            <ShoppingCart className="w-4 h-4" />
            Buy for {price.toLocaleString()} Tokens
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShopBadgePopup;
