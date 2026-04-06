import { Home, Compass, Image, Heart, Film, Sparkles, ChevronLeft, MessageSquare, DollarSign, Bot } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Compass, label: "Explore" },
];

const categoryItems = [
  { icon: Image, label: "Gallery" },
  { icon: Heart, label: "My Babes" },
  { icon: Film, label: "Reels" },
];

const conversations = [
  { name: "Catalina", avatar: "C" },
  { name: "Fernanda", avatar: "F" },
  { name: "Carmen", avatar: "C" },
  { name: "Lumi", avatar: "L" },
  { name: "Ana", avatar: "A" },
  { name: "Ava", avatar: "A" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-sidebar z-50 flex flex-col transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-[240px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">M</span>
          </div>
          {!collapsed && <span className="text-foreground font-bold text-lg">mybabes</span>}
        </div>
        <button onClick={onToggle} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 mt-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              item.active
                ? "bg-sidebar-active text-sidebar-active-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-foreground"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </button>
        ))}

        {!collapsed && (
          <div className="flex gap-2 px-3 py-2">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Realistic</button>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Anime</button>
          </div>
        )}

        {categoryItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-hover hover:text-foreground transition-colors"
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </button>
        ))}

        {/* Create button */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-full border border-border text-foreground hover:bg-sidebar-hover transition-colors mt-4">
          <Sparkles className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Create</span>}
        </button>

        {/* Conversations */}
        {!collapsed && (
          <div className="mt-6">
            <p className="px-3 text-xs text-muted-foreground uppercase tracking-wider mb-2">Latest conversations</p>
            <div className="space-y-0.5">
              {conversations.map((c) => (
                <button
                  key={c.name}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-hover transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs text-muted-foreground flex-shrink-0">
                    {c.avatar}
                  </div>
                  <span className="text-sm truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* User */}
      <div className="px-2 pb-3 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-sm text-foreground flex-shrink-0">
            A
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Arthur</p>
              <p className="text-xs text-muted-foreground truncate">@honest_zebra_6757</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="flex items-center justify-between px-2">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <DollarSign className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bot className="w-5 h-5" />
            </button>
            <div className="text-sm text-muted-foreground">🇺🇸</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
