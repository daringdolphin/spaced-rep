import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import '~/styles/globals.css'

import { Sidebar } from "~/components/sidebar/sidebar"
import { UserNav } from '~/components/auth/user-nav'
import { SidebarProvider } from '~/context/sidebar-context'

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <SidebarProvider>
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <header className="border-b px-4 py-2">
                  <UserNav />
                </header>
                <main className="flex-1 overflow-y-auto">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ClerkProvider>
      </body>
    </html>
  )
} 