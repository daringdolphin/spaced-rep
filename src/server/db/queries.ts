import { db } from ".";
import { decks, cards } from "./schema";
import { eq, desc, and } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
// Schema Validation
const CreateDeckSchema = z.object({
  userId: z.string(),
  name: z.string().min(1).max(256),
  description: z.string().max(1000).optional(),
});

const CreateCardSchema = z.object({
  deckId: z.number(),
  question: z.string().min(1),
  answer: z.string().min(1),
});

const UpdateDeckSchema = z.object({
  deckId: z.number(),
  name: z.string().min(1).max(256),
  description: z.string().max(1000).optional(),
});

const UpdateCardSchema = z.object({
  cardId: z.number(),
  question: z.string().min(1),
  answer: z.string().min(1),
});

// Deck Queries
export async function getAllDecks() {
  try {
    const user = await auth();
    if (!user?.userId) {
      return { success: false, error: "User not found" };
    }

    const allDecks = await db.query.decks.findMany({
      where: eq(decks.userId, user.userId),
      orderBy: [desc(decks.updatedAt)],
      with: {
        cards: true,
      },
    });
    return { success: true, decks: allDecks };
  } catch (error) {
    console.error("Error fetching decks:", error);
    return { success: false, error: "Failed to fetch decks" };
  }
}

export async function getDeckWithCards(deckId: number) {
  try {
    const user = await auth();
    if (!user?.userId) {
      return { success: false, error: "User not found" };
    }

    const deckWithCards = await db.query.decks.findFirst({
      where: and(
        eq(decks.id, deckId),
        eq(decks.userId, user.userId)
      ),
      with: {
        cards: true,
      },
    });
    
    if (!deckWithCards) {
      return { success: false, error: "Deck not found" };
    }
    
    return { success: true, deck: deckWithCards };
  } catch (error) {
    console.error("Error fetching deck with cards:", error);
    return { success: false, error: "Failed to fetch deck" };
  }
}

export async function createDeck(input: z.infer<typeof CreateDeckSchema>) {
  try {
    const validated = CreateDeckSchema.parse(input);
    const user = await auth();
    if (!user?.userId) {
      return { success: false, error: "User not found" };
    }
    
    const newDeck = await db.insert(decks)
      .values({...validated, userId: user.userId})
      .returning();
      
    return { success: true, deck: newDeck[0] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error creating deck:", error.errors);
      return { success: false, error: "Invalid input" };
    }
    console.error("Error creating deck:", error);
    return { success: false, error: "Failed to create deck" };
  }
}

export async function updateDeck(input: z.infer<typeof UpdateDeckSchema>) {
  try {
    const user = await auth();
    if (!user?.userId) {
      return { success: false, error: "User not found" };
    }

    const validated = UpdateDeckSchema.parse(input);
    
    const updatedDeck = await db
      .update(decks)
      .set({ 
        name: validated.name, 
        description: validated.description, 
        updatedAt: new Date() 
      })
      .where(and(
        eq(decks.id, validated.deckId),
        eq(decks.userId, user.userId)
      ))
      .returning();
      
    if (!updatedDeck[0]) {
      return { success: false, error: "Deck not found" };
    }
    
    return { success: true, deck: updatedDeck[0] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error updating deck:", error.errors);
      return { success: false, error: "Invalid input" };
    }
    console.error("Error updating deck:", error);
    return { success: false, error: "Failed to update deck" };
  }
}

export async function deleteDeck(deckId: number) {
  try {
    const user = await auth();
    if (!user?.userId) {
      return { success: false, error: "User not found" };
    }

    const deleted = await db.delete(decks)
      .where(and(
        eq(decks.id, deckId),
        eq(decks.userId, user.userId)
      ))
      .returning();
      
    if (!deleted[0]) {
      return { success: false, error: "Deck not found" };
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting deck:", error);
    return { success: false, error: "Failed to delete deck" };
  }
}

// Card Queries

export async function getCardsInDeck(deckId: number) {
  try {
    const user = await auth();
    if (!user?.userId) {
      return { success: false, error: "User not found" };
    }

    // First verify deck belongs to user
    const deck = await db.query.decks.findFirst({
      where: and(
        eq(decks.id, deckId),
        eq(decks.userId, user.userId)
      ),
    });

    if (!deck) {
      return { success: false, error: "Deck not found" };
    }

    const cardsInDeck = await db.query.cards.findMany({
      where: eq(cards.deckId, deckId),
    });
    return { success: true, cards: cardsInDeck };
  } catch (error) {
    console.error("Error fetching cards in deck:", error);
    return { success: false, error: "Failed to fetch cards in deck" };
  }
}

export async function createCard(input: z.infer<typeof CreateCardSchema>) {
  try {
    const validated = CreateCardSchema.parse(input);
    const user = await auth()
    if (!user?.userId) {
      return { success: false, error: "User not found" };
    }
    // Verify deck exists
    const deck = await db.query.decks.findFirst({
      where: and(eq(decks.id, validated.deckId), eq(decks.userId, user.userId)),
    });
    
    if (!deck) {
      return { success: false, error: "Deck not found" };
    }
    
    const newCard = await db.insert(cards)
      .values({
        ...validated,
        lastReviewed: new Date(),
      })
      .returning();
      
    return { success: true, card: newCard[0] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error creating card:", error.errors);
      return { success: false, error: "Invalid input" };
    }
    console.error("Error creating card:", error);
    return { success: false, error: "Failed to create card" };
  }
}

export async function updateCard(input: z.infer<typeof UpdateCardSchema>) {
  try {
    const user = await auth();
    if (!user?.userId) {
      return { success: false, error: "User not found" };
    }

    const validated = UpdateCardSchema.parse(input);
    
    // Verify the card belongs to a deck owned by the user
    const card = await db.query.cards.findFirst({
      where: eq(cards.id, validated.cardId),
      with: {
        deck: true,
      },
    });

    if (!card || card.deck.userId !== user.userId) {
      return { success: false, error: "Card not found" };
    }
    
    const updatedCard = await db
      .update(cards)
      .set({ 
        question: validated.question, 
        answer: validated.answer,
        updatedAt: new Date() 
      })
      .where(eq(cards.id, validated.cardId))
      .returning();
      
    if (!updatedCard[0]) {
      return { success: false, error: "Card not found" };
    }
    
    return { success: true, card: updatedCard[0] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error updating card:", error.errors);
      return { success: false, error: "Invalid input" };
    }
    console.error("Error updating card:", error);
    return { success: false, error: "Failed to update card" };
  }
}

export async function deleteCard(cardId: number) {
  try {
    const user = await auth();
    if (!user?.userId) {
      return { success: false, error: "User not found" };
    }

    // Verify the card belongs to a deck owned by the user
    const card = await db.query.cards.findFirst({
      where: eq(cards.id, cardId),
      with: {
        deck: true,
      },
    });

    if (!card || card.deck.userId !== user.userId) {
      return { success: false, error: "Card not found" };
    }

    const deleted = await db.delete(cards)
      .where(eq(cards.id, cardId))
      .returning();
      
    if (!deleted[0]) {
      return { success: false, error: "Card not found" };
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting card:", error);
    return { success: false, error: "Failed to delete card" };
  }
}

export async function updateCardReviewDate(cardId: number) {
  try {
    const user = await auth();
    if (!user?.userId) {
      return { success: false, error: "User not found" };
    }

    // Verify the card belongs to a deck owned by the user
    const card = await db.query.cards.findFirst({
      where: eq(cards.id, cardId),
      with: {
        deck: true,
      },
    });

    if (!card || card.deck.userId !== user.userId) {
      return { success: false, error: "Card not found" };
    }

    const updatedCard = await db
      .update(cards)
      .set({ lastReviewed: new Date() })
      .where(eq(cards.id, cardId))
      .returning();
      
    if (!updatedCard[0]) {
      return { success: false, error: "Card not found" };
    }
    
    return { success: true, card: updatedCard[0] };
  } catch (error) {
    console.error("Error updating card review date:", error);
    return { success: false, error: "Failed to update review date" };
  }
}

// Add this query for getting all cards
export async function getAllCards(deckId?: number) {
  try {
    const user = await auth();
    if (!user?.userId) {
      return { success: false, error: "User not found" };
    }

    // Only fetch cards from decks owned by the user
    const allCards = await db.query.cards.findMany({
      orderBy: [desc(cards.updatedAt)],
      with: {
        deck: true,
      },
      where: deckId ? and(eq(cards.deckId, deckId), eq(decks.userId, user.userId)) : eq(decks.userId, user.userId),
    });
    return { success: true, cards: allCards };
  } catch (error) {
    console.error("Error fetching all cards:", error);
    return { success: false, error: "Failed to fetch cards" };
  }
}
