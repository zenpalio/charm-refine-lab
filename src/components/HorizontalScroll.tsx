import { ReactNode } from "react";

const HorizontalScroll = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 pt-2 px-1 -mx-1">
    {children}
  </div>
);

export default HorizontalScroll;
