"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample categories
const categories = ["Technology", "Business", "Sports", "Entertainment", "Politics", "Health", "Science", "Education"]

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock authentication state - in a real app, this would come from your auth system
  const isLoggedIn = false
  const user = { name: "John Doe", image: "/placeholder.svg" }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to search results page with query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">NewsHub</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium ${pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium">
                Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {categories.map((category) => (
                <DropdownMenuItem key={category} asChild>
                  <Link href={`/category/${category.toLowerCase()}`}>{category}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/about"
            className={`text-sm font-medium ${pathname === "/about" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium ${pathname === "/contact" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            Contact
          </Link>
          <Link
            href="/admin"
            className={`text-sm font-medium ${pathname === "/admin" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className={`text-sm font-medium ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                Categories
              </summary>
              <div className="mt-2 space-y-2 pl-4">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category.toLowerCase()}`}
                    className="block text-sm text-muted-foreground hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </details>
            <Link
              href="/about"
              className={`text-sm font-medium ${pathname === "/about" ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium ${pathname === "/contact" ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className={`text-sm font-medium ${pathname === "/admin" ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>

            <form onSubmit={handleSearch} className="relative mt-2">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>

            {!isLoggedIn && (
              <div className="flex gap-2 pt-2">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

