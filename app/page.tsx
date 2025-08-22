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
type TrendingToken = {
  memeTokenAddress: string;
  imageUri: string;
  name: string;
  symbol: string;
  bio: string;
};

const TrendingTokensRow = ({ title = "Trending Tokens" }: { title?: string }) => {
  const { data } = useGetAllSales();
  if (!data || data.length === 0) return null;
  // Show only the first 4 trending tokens
  const trending: TrendingToken[] = data.filter((item: TrendingToken) => item.memeTokenAddress.toLowerCase() !== "0x0f1aa5058a58e56d99365fbab232bef578a0ad2d").slice(0, 4);
  return (
    <div className="w-full max-w-7xl px-2 md:px-8 z-10 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <Link href="/listings">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">See All</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trending.map((item: TrendingToken) => (
          <Link href={`/token/?address=${item.memeTokenAddress}`} key={item.memeTokenAddress}>
            <div className="bg-card rounded-xl border border-border p-4 flex flex-col items-center justify-between hover:scale-[1.02] transition-transform cursor-pointer shadow-sm w-full min-h-[180px] max-h-[220px] aspect-[4/3]">
              {item.imageUri ? (
                <Image src={item.imageUri} alt={item.name} width={56} height={56} className="rounded-lg object-cover mb-2" />
              ) : (
                <div className="rounded-lg bg-muted flex items-center justify-center mb-2" style={{width:56, height:56}}>
                  <span className="text-xs text-muted-foreground">No Image</span>
                </div>
              )}
              <div className="flex flex-col items-center w-full flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {/* Example icon for symbol, replace with real icon if available */}
                  <span className="inline-block w-4 h-4 bg-primary rounded-full" title="Token Symbol"></span>
                  <span className="text-lg font-bold text-foreground truncate">{item.symbol}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  {/* Example icon for name, replace with real icon if available */}
                  <span className="inline-block w-4 h-4 bg-secondary rounded-full" title="Token Name"></span>
                  <span className="text-sm text-muted-foreground truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 w-full">
                  {/* Example icon for bio, replace with real icon if available */}
                  <span className="inline-block w-4 h-4 bg-accent rounded-full" title="Token Bio"></span>
                  <span className="text-xs text-muted-foreground line-clamp-2 text-center">{item.bio}</span>
                </div>
              </div>
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

  {/* Trending Tokens Row */}
  <TrendingTokensRow />
  {/* Trending Channels Row (duplicate of Trending Tokens) */}
  <TrendingTokensRow title="Trending Channels" />

        {/* Reels Section */}
        <ReelsSection />
      </div>
    </Suspense>
  );
};

export default HomePage;
