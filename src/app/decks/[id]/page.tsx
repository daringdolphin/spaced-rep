import { CardManagerContainer } from "~/components/cards/card-manager-container"

// Type for dynamic route params
interface DeckPageProps {
  params: Promise<{
    id: string
  }>
}

// Page component with typed params
export default async function DeckPage({ params }: DeckPageProps) {
  // Convert id to number, default to 0 if invalid
  const { id } = await params
  const deckId = id ? parseInt(id, 10) || 0 : 0

  return (
    <main className="min-h-screen">
      <CardManagerContainer deckId={deckId} />
    </main>
  )
}
