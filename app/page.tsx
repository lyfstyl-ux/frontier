"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import useGetAllSales from "@/hooks/useGetAllSales";
import { Toaster } from 'react-hot-toast';
import Image from "next/image";
import { ReelsSection } from "@/components/reels/ReelsSection";


import { Suspense } from "react";
import Link from "next/link";

// Static trending tokens grid component
const TrendingTokensGrid = () => {
  const { data } = useGetAllSales();
  if (!data || data.length === 0) return null;
  return (
    <div className="w-full max-w-7xl px-2 md:px-8 z-10 mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">Trending Tokens</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.filter(item => item.memeTokenAddress.toLowerCase() !== "0x0f1aa5058a58e56d99365fbab232bef578a0ad2d").map((item) => (
          <Link href={`/token/?address=${item.memeTokenAddress}`} key={item.name}>
            <div className="bg-zinc-900 rounded-2xl border border-slate-700 p-6 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
              <Image src={item.imageUri} alt={item.name} width={80} height={80} className="rounded-full mb-2" />
              <div className="text-lg font-bold text-white">{item.symbol}</div>
              <div className="text-sm text-gray-400">{item.name}</div>
              <div className="text-xs text-gray-500 mt-1 text-center line-clamp-2">{item.bio}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};



const placeholders = [
  "eg:$WOJAK",
  "eg:$COPIUM",
  "eg:$NGMI",
  "eg:$FOMO",
  "eg:$WAGMI",
];

const HomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative min-h-screen flex flex-col items-center bg-site-main overflow-x-hidden">
        <Toaster />
  {/* Hero Section removed as requested */}

        {/* Trending Tokens Section */}
        <TrendingTokensGrid />

        {/* Reels Section */}
        <ReelsSection />
      </div>
    </Suspense>
  );
};

export default HomePage;
