"use client";
import useGetAllSales from "@/hooks/useGetAllSales";
import Image from "next/image";
import Link from "next/link";

const TrendingTokensGrid = () => {
  const { data } = useGetAllSales();
  if (!data || data.length === 0) return <div className="text-center text-gray-400">No trending tokens found.</div>;
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

export default function ListingsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#0f3460] py-20">
      <TrendingTokensGrid />
    </div>
  );
}
