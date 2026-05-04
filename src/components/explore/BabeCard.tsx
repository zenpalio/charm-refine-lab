import { MessageSquare } from "lucide-react";

interface BabeCardProps {
  name: string;
  description: string;
  imageUrl: string;
  messageCount?: number | string;
}

const BabeCard = ({ name, description, imageUrl, messageCount = 0 }: BabeCardProps) => {
  return (
    <div className="group relative w-[180px] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-grey-dark-1 transition-transform hover:-translate-y-1">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        {messageCount !== 0 && messageCount !== "0" && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
            <MessageSquare className="h-3 w-3" />
            {messageCount}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-bold text-white leading-tight">{name}</h3>
          <p className="mt-1 line-clamp-2 text-[11px] text-grey-light-3 leading-snug">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BabeCard;
