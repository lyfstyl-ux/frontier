"use client";

import { Button } from "@/components/ui/button";
import { Search, Menu, Bell, Video, Mic } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NotificationBell } from "@/components/NotificationBell";
import ProfileModal from "@/components/profile/ProfileModal";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border flex items-center px-4 gap-4 z-50">
      <div className="flex items-center gap-4 min-w-[200px]">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-6 h-6" />
        </Button>
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image 
              src="/logo.svg"
              alt="UniPump"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-semibold hidden sm:inline-block">PumpIT</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 mx-4 max-w-[600px] flex-1">
        <div className="flex items-center w-full max-w-[600px]">
          <input
            type="text"
            placeholder="Search tokens..."
            className="w-full px-4 py-2 bg-muted border rounded-l-full focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button className="px-6 rounded-r-full border border-l-0" variant="secondary">
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
          <Mic className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
          <Video className="w-4 h-4" />
        </Button>
        <NotificationBell />
        <div className="h-8">
          <ConnectButton />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex" onClick={() => setProfileOpen(true)}>
          <Image src="/public/nfts/1.jpeg" alt="Profile" width={32} height={32} className="rounded-full object-cover" />
        </Button>
        <ProfileModal open={profileOpen} setOpen={setProfileOpen} />
      </div>
    </header>
  );
}
