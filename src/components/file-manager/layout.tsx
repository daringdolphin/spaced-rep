"use client"


interface FileManagerLayoutProps {
  children: React.ReactNode
}

export function FileManagerLayout({ 
  children, 
}: FileManagerLayoutProps) {
  return (
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
    </main>
  )
} 