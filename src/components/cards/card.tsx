"use client"

import { Plus } from "lucide-react"
import type { Card as CardType } from "~/types/schema"
import { cn } from "~/lib/utils"
import { useMemo } from "react"

interface CardProps {
  card?: CardType
  isCreateCard?: boolean
  onClick?: () => void
  className?: string
}

export function Card({ card, isCreateCard, onClick, className }: CardProps) {
  const daysSinceLastReview = useMemo(() => {
    if (!card?.lastReviewed) return 0
    return Math.floor((new Date().getTime() - new Date(card.lastReviewed).getTime()) / (1000 * 60 * 60 * 24))
  }, [card?.lastReviewed])

  if (isCreateCard) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "group relative flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white p-6 text-center hover:border-gray-300 hover:bg-gray-50",
          className
        )}
      >
        <Plus className="h-8 w-8 text-gray-400 group-hover:text-gray-500" />
        <span className="mt-2 block text-sm font-medium text-gray-900">New card</span>
      </button>
    )
  }

  if (!card) return null
  return (
    <div className={cn(
      "group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md",
      className
    )}>
      <div className="p-4 flex-grow">
        <h3 className="font-medium text-gray-900 line-clamp-2">{card.question}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-3 flex-grow">{card.answer}</p>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 border-t">
        Last reviewed: {daysSinceLastReview} days ago
      </div>
    </div>
  )
} 