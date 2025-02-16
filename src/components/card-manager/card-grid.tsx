import { Card } from "./card"
import type { Card as CardType } from "~/types/schema"

interface CardGridProps {
  cards: CardType[]
  onCreateNew?: () => void
}

export function CardGrid({ cards, onCreateNew }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card
        isCreateCard
        onClick={onCreateNew}
      />
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
        />
      ))}
    </div>
  )
} 