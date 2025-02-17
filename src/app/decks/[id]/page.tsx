import { CardManagerContainer } from "~/components/cards/card-manager-container";


export default async function DeckPage(props : {
  params: Promise<{id: string}>
}) {
  const {id} = await props.params;
  const deckId = id === "all" ? 0 : parseInt(id);

  // Validate deckId if not "all"
  if (id !== "all" && isNaN(deckId)) {
    return <div className="p-6">Invalid deck ID</div>;
  }

  return <CardManagerContainer deckId={deckId} />;
}
