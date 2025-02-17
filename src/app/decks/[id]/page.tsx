import { CardManagerContainer } from "~/components/cards/card-manager-container"

interface PageParams {
  id: string
}

export default async function DeckPage({
  params,
}: {
  params: PageParams
}) {
  const deckId = params.id === "all" ? 0 : parseInt(params.id)

  // Validate deckId if not "all"
  if (params.id !== "all" && isNaN(deckId)) {
    return <div className="p-6">Invalid deck ID</div>
  }

  return <CardManagerContainer deckId={deckId} />
}
