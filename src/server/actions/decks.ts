"use server"

import { z } from "zod"
import { 
  getAllDecks,
  getDeckWithCards,
  createDeck,
  updateDeck,
  deleteDeck,
  CreateDeckSchema,
  UpdateDeckSchema
} from "~/server/db/queries/decks"

// Server Actions
export async function getDecks() {
  try {
    return await getAllDecks()
  } catch (error: unknown) {
    console.error("Error in getDecks:", error)
    return {
      success: false,
      error: "Failed to fetch decks"
    }
  }
}

export async function getDeck(deckId: number) {
  try {
    return await getDeckWithCards(deckId)
  } catch (error: unknown) {
    console.error("Error in getDeck:", error)
    return {
      success: false,
      error: "Failed to fetch deck"
    }
  }
}

export async function addDeck(data: z.infer<typeof CreateDeckSchema>) {
  try {
    const validated = CreateDeckSchema.parse(data)
    return await createDeck(validated)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid deck data"
      }
    }
    return {
      success: false,
      error: "Failed to create deck"
    }
  }
}

export async function editDeck(input: z.infer<typeof UpdateDeckSchema>) {
  try {
    const validated = UpdateDeckSchema.parse(input)
    return await updateDeck(validated)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input"
      }
    }
    return {
      success: false,
      error: "Failed to update deck"
    }
  }
}

export async function removeDeck(deckId: number) {
  try {
    return await deleteDeck(deckId)
  } catch (error: unknown) {
    console.error("Error in removeDeck:", error)
    return {
      success: false,
      error: "Failed to delete deck"
    }
  }
}
