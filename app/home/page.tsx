"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomeRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/")
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to home page...</p>
    </div>
  )
}

