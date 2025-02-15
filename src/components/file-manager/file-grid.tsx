import { FileCard } from "./file-card"

interface FileData {
  title: string
  metadata: string
  thumbnail: string
}

interface FileGridProps {
  files: FileData[]
  onCreateNew?: () => void
}

export function FileGrid({ files, onCreateNew }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FileCard
        title="New File"
        isEmpty
        onClick={onCreateNew}
      />
      {files.map((file) => (
        <FileCard
          key={file.title}
          title={file.title}
          metadata={file.metadata}
          thumbnail={file.thumbnail}
        />
      ))}
    </div>
  )
} 