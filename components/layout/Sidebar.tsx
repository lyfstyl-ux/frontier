"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Plus, 
  BarChart2, 
  Trophy, 
  Film, 
  Droplet,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const primaryMenuItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Create", icon: Plus, href: "/createtoken" },
  { name: "Listings", icon: BarChart2, href: "/listings" },
];

const secondaryMenuItems = [
  { name: "Leaderboard", icon: Trophy, href: "/leaderboard" },
  { name: "Reels", icon: Film, href: "/reels" },
  { name: "Faucet", icon: Droplet, href: "/faucet" },
];

interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  href: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderMenuItem = (item: MenuItem) => (
    <Link 
      key={item.href} 
      href={item.href}
      className={cn(
        "flex items-center px-3 py-2 mx-2 gap-3 rounded-lg transition-colors",
        pathname === item.href 
          ? "bg-white/10 text-white" 
          : "text-zinc-400 hover:text-white hover:bg-white/5"
      )}
    >
      <item.icon className="w-5 h-5 flex-shrink-0" />
      {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
    </Link>
  );

  return (
    <div className={cn(
      "hidden lg:flex flex-col fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-black/70 backdrop-blur-md transition-all duration-300 z-40",
  isCollapsed ? "w-16" : "w-48"
    )}>
      <div className="flex flex-col flex-1 py-4">
        <div className="pb-4 mb-4 border-b border-zinc-800">
          {primaryMenuItems.map(renderMenuItem)}
        </div>
        <div className="pb-4">
          {secondaryMenuItems.map(renderMenuItem)}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 w-8 h-8 rounded-full border border-zinc-800 bg-zinc-950"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
