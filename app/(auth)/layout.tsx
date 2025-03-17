import type React from "react"
import { NavigationMenu } from "@/components/navigation-menu"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
      <NavigationMenu />
    </div>
  )
}

