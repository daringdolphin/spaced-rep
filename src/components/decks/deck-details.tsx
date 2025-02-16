interface DeckDetailsProps {
  name: string;
  description: string | null | undefined;
}

export function DeckDetails({ name, description }: DeckDetailsProps) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold">{name}</h2>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
} 