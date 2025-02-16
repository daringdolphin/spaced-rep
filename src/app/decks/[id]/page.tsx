import { type Metadata } from "next";
import { getDeckWithCards } from "~/server/db/queries";
import { DeckDetails } from "~/components/decks/deck-details";
import { CardGrid } from "~/components/cards/card-grid";
import { Suspense } from "react";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const deckId = parseInt(id, 10);
  
  if (!isNaN(deckId)) {
    const result = await getDeckWithCards(deckId);
    if (result.success) {
      return {
        title: `${result.deck?.name} - Flashcards`,
      };
    }
  }
  
  return {
    title: "Deck Not Found - Flashcards",
  };
}

async function DeckIdPageContent({ params }: Props) {
  const { id } = params;
  const deckId = parseInt(id, 10);

  if (isNaN(deckId)) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold text-red-600">Invalid Deck ID</h1>
        <p className="text-gray-600">The provided deck ID is not valid.</p>
      </div>
    );
  }

  const result = await getDeckWithCards(deckId);

  if (!result.success) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold text-red-600">Deck Not Found</h1>
        <p className="text-gray-600">{result.error}</p>
      </div>
    );
  }

  const { deck } = result;

  return (
    <div className="p-4">
      {deck?.name && deck?.description ? (
        <DeckDetails name={deck.name} description={deck.description} />
      ) : (
        <div className="text-red-600">Deck details are missing.</div>
      )}
      {deck?.cards ? (
        <CardGrid cards={deck.cards} />
      ) : (
        <div className="text-red-600">No cards available.</div>
      )}
    </div>
  );
}

export default function DeckIdPage({ params }: Props) {
  return (
    <Suspense fallback={
      <div className="p-4">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded bg-gray-200" />
          ))}
        </div>
      </div>
    }>
      <DeckIdPageContent params={params} />
    </Suspense>
  );
}
