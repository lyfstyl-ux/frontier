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
        {data.filter((item: TokenItem) => item.memeTokenAddress.toLowerCase() !== "0x0f1aa5058a58e56d99365fbab232bef578a0ad2d").map((item: TokenItem) => (
          <Link href={`/token/?address=${item.memeTokenAddress}`} key={item.memeTokenAddress}>
            <div className="bg-card rounded-xl border border-border p-4 flex flex-row items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer shadow-sm">
              {item.imageUri ? (
                <Image src={item.imageUri} alt={item.name} width={56} height={56} className="rounded-lg object-cover" />
              ) : (
                <div className="rounded-lg bg-muted flex items-center justify-center" style={{width:56, height:56}}>
                  <span className="text-xs text-muted-foreground">No Image</span>
                </div>
              )}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="text-lg font-bold text-foreground truncate">{item.symbol}</div>
                <div className="text-sm text-muted-foreground truncate">{item.name}</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.bio}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
type TokenItem = {
  memeTokenAddress: string;
  imageUri: string;
  name: string;
  symbol: string;
  bio: string;
};

export default function ListingsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#0f3460] py-20">
      <TrendingTokensGrid />
    </div>
  );
}
