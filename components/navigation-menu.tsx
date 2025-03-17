"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Home, LayoutDashboard, Settings, User, FileText, Search, LogIn } from "lucide-react"

export function NavigationMenu() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full w-12 h-12 shadow-lg">
            <ChevronDown className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuLabel>Public Pages</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/blog/1">
              <FileText className="mr-2 h-4 w-4" /> Blog Post Example
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/category/technology">
              <FileText className="mr-2 h-4 w-4" /> Technology Category
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/search?q=technology">
              <Search className="mr-2 h-4 w-4" /> Search Results
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>User Pages</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/register">
              <User className="mr-2 h-4 w-4" /> Register
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" /> User Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" /> User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/create-post">
              <FileText className="mr-2 h-4 w-4" /> Create Post
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Admin Pages</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <Settings className="mr-2 h-4 w-4" /> Admin Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

