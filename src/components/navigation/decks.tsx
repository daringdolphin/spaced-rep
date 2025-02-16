"use client"

import * as React from "react"
import { Folder } from "lucide-react"
import Link from "next/link"
import { cn } from "~/lib/utils"

interface DeckProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
}

export function Deck({ href, children, isActive }: DeckProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50",
        isActive && "bg-gray-50 font-medium"
      )}
    >
      <Folder className="h-4 w-4 text-gray-400" />
      <span>{children}</span>
    </Link>
  )
} 