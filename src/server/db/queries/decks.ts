import { db } from "..";
import { decks } from "../schema";
import { eq, desc, and } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";

// Schema Validation
export const CreateDeckSchema = z.object({
  userId: z.string(),
  name: z.string().min(1).max(256),
  description: z.string().max(1000).optional(),
});

export const UpdateDeckSchema = z.object({
  deckId: z.number(),
  name: z.string().min(1).max(256),
  description: z.string().max(1000).optional(),
});

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