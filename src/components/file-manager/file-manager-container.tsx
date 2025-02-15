"use client"

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { FileGrid } from "./file-grid"
import { FileManagerLayout } from "./layout"

const MOCK_FILES = [
  {
    title: "Q4 Sales Deck",
    metadata: "Shared folder • 8 presentations",
    thumbnail: "/placeholder.svg"
  },
  {
    title: "Product Videos",
    metadata: "Shared folder • 5 videos",
    thumbnail: "/placeholder.svg"
  },
  {
    title: "ROI Calculator",
    metadata: "Shared file • 1 Excel",
    thumbnail: "/placeholder.svg"
  }
]

export function FileManagerContainer() {
  function handleCreateNew() {
    console.log("Create new file")
  }

  return (
    <FileManagerLayout>
      <div className="mb-6">
        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <FileGrid files={MOCK_FILES} onCreateNew={handleCreateNew} />
    </FileManagerLayout>
  )
} 