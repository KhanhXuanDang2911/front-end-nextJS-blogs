"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Featured",
      href: "/featured",
    },
    {
      label: "Tags",
      href: "/tags",
    },
    {
      label: "Articles",
      href: "/articles",
    },
    {
      label: "Admin",
      href: "/admin",
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold italic">NewsVibe</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === route.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            className="text-muted-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button className="rounded-full bg-primary text-primary-foreground" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

