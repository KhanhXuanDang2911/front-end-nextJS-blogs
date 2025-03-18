"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Clock, MessageSquare, Search, ThumbsUp } from "lucide-react"
import { useState, useEffect } from "react"

// Sample blog data for search
const allPosts = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence in Healthcare",
    excerpt: "Exploring how AI is revolutionizing medical diagnostics, treatment plans, and patient care.",
    category: "Technology",
    author: "Dr. Jane Smith",
    authorImage: "/placeholder.svg",
    publishedAt: "2023-07-15",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 24,
    reactions: 156,
  },
  {
    id: 2,
    title: "Global Economic Trends to Watch in 2023",
    excerpt: "Analysis of emerging economic patterns and their potential impact on markets worldwide.",
    category: "Business",
    author: "Michael Johnson",
    authorImage: "/placeholder.svg",
    publishedAt: "2023-07-12",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 18,
    reactions: 92,
  },
  {
    id: 3,
    title: "Championship Finals: A Historic Showdown",
    excerpt: "Recap of the thrilling final match that kept fans on the edge of their seats.",
    category: "Sports",
    author: "Sarah Williams",
    authorImage: "/placeholder.svg",
    publishedAt: "2023-07-10",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 32,
    reactions: 215,
  },
  {
    id: 4,
    title: "New Streaming Series Breaking All Records",
    excerpt: "How this surprise hit became the most-watched show in streaming history.",
    category: "Entertainment",
    author: "Robert Chen",
    authorImage: "/placeholder.svg",
    publishedAt: "2023-07-08",
    readTime: "4 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 45,
    reactions: 278,
  },
  {
    id: 5,
    title: "10 Tech Gadgets That Will Define 2023",
    excerpt: "A comprehensive look at the most innovative tech gadgets that are shaping this year.",
    category: "Technology",
    author: "Michael Johnson",
    authorImage: "/placeholder.svg",
    publishedAt: "2023-06-30",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 64,
    reactions: 342,
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [results, setResults] = useState<typeof allPosts>([])

  useEffect(() => {
    // Simulate search functionality
    if (initialQuery) {
      const filteredPosts = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(initialQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(initialQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(initialQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(initialQuery.toLowerCase()),
      )
      setResults(filteredPosts)
    }
  }, [initialQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search query
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url)

    // Filter posts based on search query
    const filteredPosts = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setResults(filteredPosts)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search for articles, topics, or authors..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Button type="submit" className="absolute right-0 top-0 h-full rounded-l-none">
              Search
            </Button>
          </div>
        </form>
      </div>

      {initialQuery && (
        <div className="mb-8">
          <p className="text-muted-foreground">
            {results.length} results for "{initialQuery}"
          </p>
        </div>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <div className="relative h-48">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <Badge className="absolute top-2 left-2">{post.category}</Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Image
                    src={post.authorImage || "/placeholder.svg"}
                    alt={post.author}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-sm">{post.author}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {post.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {post.reactions}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          {initialQuery ? (
            <>
              <h2 className="text-2xl font-bold mb-4">No results found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find any posts matching "{initialQuery}". Please try a different search term.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Start searching</h2>
              <p className="text-muted-foreground mb-6">Enter a search term above to find relevant articles.</p>
            </>
          )}
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

