import RootLayout from "~/app/layout"
import { CardManagerContainer } from "~/components/cards/card-manager-container"

export default function HomePage() {
  return (
    <RootLayout>
      <CardManagerContainer deckId={0} />
    </RootLayout>
  )
}
