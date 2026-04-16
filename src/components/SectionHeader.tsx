import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-foreground font-bold text-sm uppercase tracking-wider">{title}</h2>
    <button className="p-1.5 rounded-full bg-muted hover:bg-accent transition-colors">
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  </div>
);

export default SectionHeader;
