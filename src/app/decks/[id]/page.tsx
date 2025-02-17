import { CardManagerContainer } from "~/components/cards/card-manager-container";

// Use the correct Next.js types for page props
type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function DeckPage({ params }: Props) {
  const deckId = params.id === "all" ? 0 : parseInt(params.id);

  // Validate deckId if not "all"
  if (params.id !== "all" && isNaN(deckId)) {
    return <div className="p-6">Invalid deck ID</div>;
  }

  return <CardManagerContainer deckId={deckId} />;
}
