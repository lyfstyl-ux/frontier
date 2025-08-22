"use client"

import Link from "next/link"
import { Play } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for reels - replace with actual data later
const mockReels = [
  {
    id: 1,
    thumbnail: "/images/reel-1.jpg",
    title: "Why $PEPE is pumping! 🚀",
    views: "12.5K",
    duration: "0:45"
  },
  {
    id: 2,
    thumbnail: "/images/reel-2.jpg",
    title: "Latest Base memecoin trends 📈",
    views: "8.2K",
    duration: "1:20"
  },
  {
    id: 3,
    thumbnail: "/images/reel-3.jpg",
    title: "Technical Analysis: $WOJAK",
    views: "15.1K",
    duration: "2:10"
  },
  {
    id: 4,
    thumbnail: "/images/reel-4.jpg",
    title: "Next 100x Gem? 💎",
    views: "20.3K",
    duration: "1:45"
  }
]

export function ReelsSection() {
  return (
    <div className="w-full max-w-7xl px-2 md:px-8 z-10 mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Popular Reels</h2>
        <Link 
          href="/reels" 
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockReels.map((reel) => (
          <Link href={`/reels/${reel.id}`} key={reel.id}>
            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Placeholder gradient background */}
              <div className="relative aspect-[9/16] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <Play className="w-12 h-12 text-white" />
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white">
                  {reel.duration}
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-white font-medium line-clamp-2">{reel.title}</h3>
                <p className="text-zinc-400 text-sm mt-1">{reel.views} views</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}
