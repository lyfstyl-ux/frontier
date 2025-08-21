"use client";
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
import { SearchBar } from "@/components/ui/search-bar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  ConnectWallet,
  ConnectWalletText,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import { AnimatePresence, motion } from "framer-motion";
import { PersonStanding } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccountEffect } from "wagmi";
import ProfileModal from "../profile/ProfileModal";
import { NotificationBell } from "../NotificationBell";

const emojis = ["🚀"]

const Navbar = () => {
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0)
  const [open, setOpen] = useState(false)
  useAccountEffect({
    onConnect: () => {
      console.log("connected")
      setOpen(true)
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % emojis.length)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="w-full sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-zinc-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEmojiIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-3xl md:text-4xl"
            >
              {emojis[currentEmojiIndex]}
            </motion.div>
          </AnimatePresence>
          <span className="font-extrabold text-xl md:text-2xl text-white tracking-tight">CreatePump</span>
        </Link>
        {/* Search and Actions */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <ThemeToggle />
          <NotificationBell />
          <Wallet className="relative z-50">
            <ConnectWallet withWalletAggregator className="bg-white hover:bg-white">
              <ConnectWalletText className="text-black">
                Connect Wallet
              </ConnectWalletText>
              <Avatar className="h-6 w-6 bg-black" />
              <Name className="text-black" />
            </ConnectWallet>
            <WalletDropdown className="border">
              <Identity className="px-4 pt-3 pb-2 text-black" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownLink
                className=""
                icon="wallet"
                href="https://keys.coinbase.com"
              >
                Wallet
              </WalletDropdownLink>
              <Link
                className="p-4 flex items-center gap-"
                href="/profile"
              >
                <PersonStanding />
                Profile
              </Link>
              <WalletDropdownDisconnect className="" />
            </WalletDropdown>
          </Wallet>
        </div>
      </div>
      {/* Mobile menu (optional, can be added for responsiveness) */}
    </nav>
  );
};

export default Navbar;
