"use client";

import { cn } from "@/lib/utils";
import { 
  Home, 
  Plus, 
  BarChart2, 
  Trophy, 
  Film, 
  Droplet
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Home", icon: Home, href: "/", color: "#ff6a00" },
  { name: "Create", icon: Plus, href: "/createtoken", color: "#fbc531" },
  { name: "Listings", icon: BarChart2, href: "/listings", color: "#00c3ff" },
  { name: "Leaderboard", icon: Trophy, href: "/leaderboard", color: "#6f42c1" },
  { name: "Reels", icon: Film, href: "/reels", color: "#18ccfc" },
  { name: "Faucet", icon: Droplet, href: "/faucet", color: "#00ffae" },
];

export function MobileFooter() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md border-t border-zinc-800 z-50">
      <nav className="flex items-center justify-around py-2">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={cn(
              "flex flex-col items-center p-2 rounded-lg transition-colors",
              pathname === item.href 
                ? "text-white" 
                : "text-zinc-400 hover:text-white"
            )}
            style={{
              "--hover-color": item.color
            } as React.CSSProperties}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
