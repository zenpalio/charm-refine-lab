import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import TokenIcon from "./TokenIcon";

interface ShopBadgeCardProps {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  owned: boolean;
  onBuy?: () => void;
}

const ShopBadgeCard = ({ name, description, imageUrl, price, owned: initialOwned, onBuy }: ShopBadgeCardProps) => {
  const [owned, setOwned] = useState(initialOwned);

  const handleBuy = () => {
    setOwned(true);
    onBuy?.();
  };

  return (
    <div className="flex flex-col items-center gap-2 min-w-[145px] sm:min-w-[170px]">
      <div
        className={`relative w-[140px] h-[140px] sm:w-[164px] sm:h-[164px] rounded-[1.25rem] sm:rounded-[1.75rem] border border-border/30 flex items-center justify-center transition-transform duration-300 hover:scale-[1.03]`}
        style={{ backgroundColor: "hsl(var(--popover))", backgroundImage: "none" }}
      >
        <img
          src={imageUrl}
          alt={name}
          className={`w-[100px] h-[100px] sm:w-[116px] sm:h-[116px] object-contain ${owned ? "" : ""}`}
          loading="lazy"
          width={512}
          height={512}
        />

        {owned && (
          <div className="absolute -top-1.5 -right-1.5 z-20 text-[9px] font-bold px-2 py-0.5 rounded-full text-muted-foreground border border-border/30" style={{ backgroundColor: "hsl(var(--muted))" }}>
            <Check className="w-3 h-3" />
          </div>
        )}
      </div>

      <p className="text-xs font-semibold text-foreground text-center">{name}</p>
      <p className="text-[10px] text-muted-foreground text-center max-w-[140px]">{description}</p>

      {!owned ? (
        <Button
          size="sm"
          className="text-[10px] h-7 px-3 rounded-full gap-1.5"
          onClick={handleBuy}
        >
          <TokenIcon className="w-3.5 h-3.5" />
          {price.toLocaleString()} Tokens
        </Button>
      ) : (
        <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
          <Check className="w-3 h-3" /> Owned
        </span>
      )}
    </div>
  );
};

export default ShopBadgeCard;
