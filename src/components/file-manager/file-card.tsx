import Image from "next/image"
import { Plus } from "lucide-react"

interface FileCardProps {
  title: string
  metadata?: string
  thumbnail?: string
  isEmpty?: boolean
  onClick?: () => void
}

export function FileCard({ title, metadata, thumbnail, isEmpty, onClick }: FileCardProps) {
  if (isEmpty) {
    return (
      <button
        onClick={onClick}
        className="group relative flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white p-6 text-center hover:border-gray-300 hover:bg-gray-50"
      >
        <Plus className="h-8 w-8 text-gray-400 group-hover:text-gray-500" />
        <span className="mt-2 block text-sm font-medium text-gray-900">{title}</span>
      </button>
    )
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white">
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={thumbnail ?? "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        {metadata && <p className="text-sm text-gray-500">{metadata}</p>}
      </div>
    </div>
  )
} 