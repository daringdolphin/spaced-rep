"use client"

import { Header } from "~/components/navigation/header"
import { Sidebar } from "~/components/sidebar/sidebar"

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 