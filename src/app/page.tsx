import { RootLayout } from "~/components/layout"
import { CardManagerContainer } from "~/components/card-manager/card-manager-container"

export default function HomePage() {
  return (
    <RootLayout>
      <CardManagerContainer deckId={1} />
    </RootLayout>
  )
}
