"use client"

import { FolderItem } from "~/components/navigation/nav-items"

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">Showpad</h1>
      </div>
      <nav className="space-y-1 px-2">
        <div className="py-3">
          <div className="px-3 text-xs font-medium uppercase text-gray-500">All Decks</div>
          <div className="mt-2">
            <FolderItem href="#">All Decks</FolderItem>
            <FolderItem href="#">Case Studies</FolderItem>
            <FolderItem href="#">Sales Collateral</FolderItem>
            <FolderItem href="#">Training Materials</FolderItem>
          </div>
        </div>
      </nav>
    </div>
  )
} 