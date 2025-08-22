"'use client'"

import { Button } from "@/components/ui/button"
import useGetAllSales from "@/hooks/useGetAllSales"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { erc20Abi, formatUnits } from "viem"
import { useAccount, useReadContract } from "wagmi"

export function CryptoPortfolio({ heldOnly, createdOnly }: { heldOnly?: boolean, createdOnly?: boolean }) {
  const { data } = useGetAllSales();
  const { address } = useAccount();
  // Props to control filtering
  // heldOnly: show only tokens with nonzero balance
  // createdOnly: show only tokens created by the user
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {data && data.map(token => (
          <TokenComp token={token} key={token.memeTokenAddress} userAddress={address} heldOnly={!!(typeof heldOnly !== 'undefined' && heldOnly)} createdOnly={!!(typeof createdOnly !== 'undefined' && createdOnly)} />
        ))}
      </div>
    </div>
  )
}


const TokenComp = ({ token, userAddress, heldOnly, createdOnly }: { token: any, userAddress: string, heldOnly?: boolean, createdOnly?: boolean }) => {
  const { data } = useReadContract({
    abi: erc20Abi,
    address: token.memeTokenAddress,
    functionName: "balanceOf",
    args: [userAddress as `0x${string}`],
    query: {
      select(data) {
        return formatUnits(data, 18)
      },
    }
  });
  const router = useRouter();
  // Filtering logic
  if (heldOnly && (!data || parseFloat(data) === 0)) return null;
  if (createdOnly && token.createdBy?.toLowerCase() !== userAddress?.toLowerCase()) return null;
  return (
    <div key={token.memeTokenAddress} className="w-full mb-4">
      <div className="rounded-xl border border-stone-800 bg-stone-950 text-stone-50 shadow p-4 flex flex-col md:flex-row items-center gap-4">
        <Image
          src={token.imageUri}
          alt={`${token.name} icon`}
          width={64}
          height={64}
          className="rounded-full border border-stone-700"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold text-lg text-stone-50">{token.name}</span>
            <span className="text-xs bg-stone-800 px-2 py-1 rounded text-stone-300">{token.symbol}</span>
          </div>
          <div className="text-stone-400 text-xs mb-1 truncate">{token.bio}</div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 mb-1">
            <span>Creator:</span>
            <span className="bg-stone-800 px-2 py-1 rounded text-white">{token.createdBy?.slice(0, 6)}...{token.createdBy?.slice(-4)}</span>
          </div>
          <div className="flex gap-2 mb-1">
            {token.twitter && <a href={token.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Twitter</a>}
            {token.discord && <a href={token.discord} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Discord</a>}
          </div>
          <div className="text-emerald-400 font-medium text-xs">
            Balance: {data ? data : "0"} {token.symbol}
          </div>
        </div>
        <div className="flex flex-col gap-2 min-w-[120px]">
          <Button
            variant="default"
            size="sm"
            onClick={() => router.push(`/token/?address=${token.memeTokenAddress}&tab=buy`)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            BUY
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/token/?address=${token.memeTokenAddress}`)}
            className="text-zinc-400 hover:text-white"
          >
            View Coin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenComp;