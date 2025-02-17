import { db } from "..";
import { cards, decks } from "../schema";
import { eq, desc, and } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";

// Schema Validation
export const CreateCardSchema = z.object({
  deckId: z.number(),
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const UpdateCardSchema = z.object({
  cardId: z.number(),
  question: z.string().min(1),
  answer: z.string().min(1),
});

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