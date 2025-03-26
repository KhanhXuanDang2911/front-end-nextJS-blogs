import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
        <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}

