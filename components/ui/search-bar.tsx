"use client"

import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    // Add your search logic here
  }

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
      <Input
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="pl-8 bg-zinc-100 dark:bg-zinc-800 border-none"
      />
    </div>
  )
}
