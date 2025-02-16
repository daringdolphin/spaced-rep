"use client"

import { UserIcon, ChevronsLeft, Menu, Plus } from "lucide-react"
import { usePathname } from "next/navigation"
import { Deck } from "~/components/navigation/decks"
import { cn } from "~/lib/utils"
import { useSidebar } from "~/context/sidebar-context"

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
  const { isOpen, setIsOpen } = useSidebar()
  
  // TODO: Replace with API call using React Query or SWR
  const decks: Deck[] = [
    {
      id: "all",
      name: "All Cards",
      href: "/decks",
    },
  ]

  // Add default hidden state for initial render to prevent hydration mismatch
  return (
    <div 
      className={cn(
        "border-r bg-background transition-all duration-300",
        isOpen ? "w-64" : "w-16", // Always show at least icon width
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        <UserIcon className="h-4 w-4" />
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="hover:text-primary transition-colors"
        >
          {isOpen ? (
            <ChevronsLeft className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>
      <nav className={cn(
        "flex flex-col gap-1 px-2",
        !isOpen && "hidden" // Hide content when closed
      )}>
        <div className="flex flex-col gap-1">
          <div className="px-3 py-2 text-xs font-medium uppercase text-muted-foreground">
            All Decks
          </div>
          <div className="flex flex-col gap-1">
            {decks.map((deck) => (
              <Deck
                key={deck.id}
                href={deck.href}
                isActive={pathname === deck.href}
              >
                {deck.name}
              </Deck>
            ))}
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted">
              <Plus className="h-4 w-4" />
              <span className="font-medium">New Deck</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
} 