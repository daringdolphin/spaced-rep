"use client"

import { useState } from "react"
import { CardGrid } from "./card-grid"
import { CreateCardModal } from "./create-card"
import type { Card as CardType } from "~/types/schema"

const MOCK_CARDS: CardType[] = [
  {
    id: 1,
    deckId: 1,
    question: "What is the Q4 Sales target?",
    answer: "The target is $1M.",
    lastReviewed: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    deckId: 1,
    question: "What products are included in the Q4 Sales Deck?",
    answer: "Product A, Product B, and Product C.",
    lastReviewed: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    deckId: 2,
    question: "What is the ROI Calculator?",
    answer: "A tool to calculate return on investment.",
    lastReviewed: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

interface CardManagerContainerProps {
  deckId: number
  initialCards?: CardType[]
}

export function CardManagerContainer({ 
  deckId, 
  initialCards = MOCK_CARDS 
}: CardManagerContainerProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [cards, setCards] = useState(initialCards)

  function handleOpenCreateModal() {
    setIsCreateModalOpen(true)
  }

  function handleCloseCreateModal() {
    setIsCreateModalOpen(false)
  }

  return (
    <div className="p-6">
      <CardGrid 
        cards={cards} 
        onCreateNew={handleOpenCreateModal} 
      />
      <CreateCardModal
        deckId={deckId}
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSuccess={(newCard: CardType) => setCards((prev) => [...prev, newCard])}
      />
    </div>
  )
} 