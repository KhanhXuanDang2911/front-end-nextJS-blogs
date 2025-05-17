"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutDashboard, FileText, Settings, LogOut, User, PlusCircle, ThumbsUp, MessageSquare } from "lucide-react"
import { getUsersDetail } from "@/service/userService"
import { getUserId, logout } from "@/utils/auth"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userImg, setUserImg] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/signin")
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch (error) {
      console.error("Failed to parse user data:", error)
      router.push("/signin")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  // if (isLoading) {
  //   return (
  //     <div className="flex flex-col min-h-screen">
  //       <SiteHeader />
  //       <main className="flex-1 flex items-center justify-center">
  //         <div className="animate-pulse">Loading...</div>
  //       </main>
  //       <Footer />
  //     </div>
  //   )
  // }

  useEffect(() => {
    const fetchUser = async () => {
      const userId = getUserId()
      if (userId) {
        try {
          const response = await getUsersDetail(userId)
          setUserImg(response.avatar)
        } catch (error) {
          console.error("Failed to fetch user details:", error)
        }
      }
    };

    fetchUser();
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold italic">NewsVibe</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/user/posts/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
            <Link href={'/user/profile'} className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://res.cloudinary.com/dbqoymyi8/${userImg}`} alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-24 z-30 -ml-2 hidden h-[calc(100vh-6rem)] w-full shrink-0 md:sticky md:block">
          <nav className="flex flex-col space-y-2">
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/user/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/user/posts">
                <FileText className="mr-2 h-4 w-4" />
                My Posts
              </Link>
            </Button>
            {/* <Button variant="ghost" className="justify-start" asChild>
              <Link href="/user/comments">
                <MessageSquare className="mr-2 h-4 w-4" />
                Comments
              </Link>
            </Button>

            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/user/reactions">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Reactions
              </Link>
            </Button> */}
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/user/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50" asChild>
              <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </a>
            </Button>
          </nav>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

