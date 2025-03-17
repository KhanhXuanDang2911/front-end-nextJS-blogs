import type React from "react"
import { UserNav } from "@/components/user-nav"
import { NavigationMenu } from "@/components/navigation-menu"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">NewsHub</span>
            </a>
          </div>
          <UserNav />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <NavigationMenu />
    </div>
  )
}

