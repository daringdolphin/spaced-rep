"use client"

import Link from "next/link"
import { cn } from "~/lib/utils"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  active?: boolean
}

export function NavItem({ href, icon, children, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg", active && "bg-gray-100")}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}


export function NavItems() {
  return (
    <nav className="flex items-center gap-6">
      <div className="flex items-center gap-4">
        {/* Add your navigation items here */}
        <span>Files</span>
        <span>Recent</span>
        <span>Shared</span>
      </div>
    </nav>
  )
} 