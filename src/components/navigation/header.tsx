"use client"

import { Menu } from "lucide-react"
import { useSidebar } from "~/context/sidebar-context"

export function Header() {
  const { isOpen, setIsOpen } = useSidebar()

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-4">
        {!isOpen && (
          <Menu 
            className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" 
            onClick={() => setIsOpen(true)} 
          />
        )}
        <h1 className="text-2xl font-bold">Flashcards</h1>
      </div>
    </header>
  )
} 