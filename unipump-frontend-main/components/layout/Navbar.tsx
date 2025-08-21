"use client";
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
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

const emojis = ["👽", "🦄", "🚀"]

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
          <span className="font-extrabold text-xl md:text-2xl text-white tracking-tight">Unipump</span>
        </Link>
        {/* Menu Links */}
        <ul className="hidden md:flex gap-6 text-base font-semibold text-white">
          <li><Link href="/" className="hover:text-[#ff6a00] transition-colors">Home</Link></li>
          <li><Link href="/createtoken" className="hover:text-[#fbc531] transition-colors">Create</Link></li>
          <li><Link href="/listings" className="hover:text-[#00c3ff] transition-colors">Listings</Link></li>
          <li><Link href="/leaderboard" className="hover:text-[#6f42c1] transition-colors">Leaderboard</Link></li>
          <li><Link href="/channels" className="hover:text-[#18ccfc] transition-colors">Channels</Link></li>
          <li><Link href="/faucet" className="hover:text-[#00ffae] transition-colors">Faucet</Link></li>
        </ul>
        {/* Wallet Connect */}
        <div className="flex items-center gap-2">
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
