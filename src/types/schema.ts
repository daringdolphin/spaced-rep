import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { type decks, type cards } from "~/server/db/schema";

// Deck types
export type Deck = InferSelectModel<typeof decks>;
export type NewDeck = InferInsertModel<typeof decks>;

// Flashcard types
export type Card = InferSelectModel<typeof cards>;
export type NewCard = InferInsertModel<typeof cards>;

// API response types
export interface DeckWithCards extends Deck {
  cards: Card[];
}

// Review types
export interface ReviewSession {
  deckId: number;
  currentCardIndex: number;
  cards: Card[];
}

// Validation schemas (using Zod)
import { z } from "zod";

export const deckSchema = z.object({
  name: z.string().min(1, "Deck name is required").max(256),
  description: z.string().optional(),
});

export const cardSchema = z.object({
  deckId: z.number().int().positive(),
  question: z.string().min(1, "Question is required").max(1000),
  answer: z.string().min(1, "Answer is required").max(1000),
});

// Form types
export type DeckFormData = z.infer<typeof deckSchema>;
export type CardFormData = z.infer<typeof cardSchema>; 