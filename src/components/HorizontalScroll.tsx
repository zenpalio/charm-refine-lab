import { ReactNode } from "react";

const HorizontalScroll = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
    {children}
  </div>
);

export default HorizontalScroll;
