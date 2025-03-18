"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function SignOutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear user data
    localStorage.removeItem("user")
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Signed Out</CardTitle>
            <CardDescription className="text-center">You have been successfully signed out</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <LogOut className="h-16 w-16 text-muted-foreground" />
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => router.push("/")}>
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

