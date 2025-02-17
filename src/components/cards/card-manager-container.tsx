/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import { useState, useEffect } from "react"
import { CardGrid } from "./card-grid"
import { CreateCardModal } from "./create-card"
import type { Card as CardType } from "~/types/schema"
import { toast } from "~/hooks/use-toast"
import { getCards, addCard } from "~/server/actions/cards"

interface CardManagerContainerProps {
  deckId?: number
}

//TODO:
//if deckid is 0, fetch all cards
//if deckid is not 0, fetch cards in deck

export function CardManagerContainer({ deckId = 0 }: CardManagerContainerProps) {
  const [cards, setCards] = useState<CardType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Load cards
  useEffect(() => {
    let isMounted = true

    async function loadCards() {
      try {
        const result = await getCards(deckId)
        if (!isMounted) return

        if (result.success && result.cards) {
          setCards(result.cards)
        } else {
          toast({
            title: "Error",
            description: result.error ?? "Failed to load cards",
            variant: "destructive",
          })
        }
      } catch (error: unknown) {
        console.error("Error in loadCards:", error);
        if (!isMounted) return
        toast({
          title: "Error",
          description: "Failed to load cards",
          variant: "destructive",
        })
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadCards()
    return () => {
      isMounted = false
    }
  }, [deckId])

  const handleCardCreated = async (data: { question: string; answer: string }) => {
    try {
      const result = await addCard({
        deckId,
        ...data,
      })

      if (result.success && result.card) {
        setCards((prev) => [...prev, result.card as CardType])
        setIsCreateModalOpen(false)
        toast({
          title: "Success",
          description: "Card created successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error ?? "Failed to create card",
          variant: "destructive",
        })
      }
    } catch (error: unknown) {
      console.error("Error in handleCardCreated:", error);
      toast({
        title: "Error",
        description: "Failed to create card",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="p-6">Loading cards...</div>
  }

  return (
    <div>
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">
            {deckId === 0 ? "All Flashcards" : "Deck Flashcards"}
          </h1>
        </div>
      </header>
      <div className="p-6">
        <CardGrid 
          cards={cards} 
          onCreateNew={() => setIsCreateModalOpen(true)} 
        />
        <CreateCardModal 
          deckId={deckId}
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCardCreated}
        />
      </div>
    </div>
  )
} 