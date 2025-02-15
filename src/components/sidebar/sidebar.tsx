"use client"

import { usePathname } from "next/navigation"
import { FolderItem } from "~/components/navigation/folder-item"
import { cn } from "~/lib/utils"

interface SidebarProps {
  className?: string
}

// This will be replaced with API data later
interface Deck {
  id: string
  name: string
  href: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  
  // TODO: Replace with API call using React Query or SWR
  const decks: Deck[] = [
    {
      id: "all",
      name: "All Decks",
      href: "/decks",
    },
  ]

  return (
    <div className={cn("w-64 border-r bg-white", className)}>
      <div className="p-4">
        <h1 className="text-xl font-bold">Showpad</h1>
      </div>
      <nav className="space-y-1 px-2">
        <div className="py-3">
          <div className="px-3 text-xs font-medium uppercase text-gray-500">
            All Decks
          </div>
          <div className="mt-2 space-y-1">
            {decks.map((deck) => (
              <FolderItem
                key={deck.id}
                href={deck.href}
                isActive={pathname === deck.href}
              >
                {deck.name}
              </FolderItem>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
} 