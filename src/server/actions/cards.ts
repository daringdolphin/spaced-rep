"use server"

import { z } from "zod"
import { 
  createCard, 
  getAllCards, 
  getCardsInDeck, 
  updateCard, 
  deleteCard 
} from "~/server/db/queries"

// Input validation schemas
const CreateCardInput = z.object({
  deckId: z.number(),
  question: z.string().min(1),
  answer: z.string().min(1),
})

const UpdateCardInput = z.object({
  cardId: z.number(),
  question: z.string().min(1),
  answer: z.string().min(1),
})

// Server Actions
export async function getCards(deckId?: number) {
  try {
    if (deckId && deckId !== 0) {
      return await getCardsInDeck(deckId)
    }
    return await getAllCards()
  } catch (error: unknown) {
    return {
      success: false,
      error: "Failed to fetch cards"
    }
  }
}

export async function addCard(data: z.infer<typeof CreateCardInput>) {
  try {
    const validated = CreateCardInput.parse(data)
    return await createCard(validated)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid card data"
      }
    }
    return {
      success: false,
      error: "Failed to create card"
    }
  }
}

export async function editCard(input: z.infer<typeof UpdateCardInput>) {
  const validated = UpdateCardInput.safeParse(input)
  if (!validated.success) {
    return { success: false, error: "Invalid input" }
  }
  return updateCard(validated.data)
}

export async function removeCard(cardId: number) {
  return deleteCard(cardId)
} 