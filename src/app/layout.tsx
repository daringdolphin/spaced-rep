import { Inter } from "next/font/google"
import "~/styles/globals.css"
import { SidebarProvider } from "~/context/sidebar-context"
import { Toaster } from "~/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Card Manager",
  description: "Manage your card decks",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          {children}
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  )
}
