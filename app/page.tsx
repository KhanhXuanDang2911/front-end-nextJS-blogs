"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, ThumbsUp, Search, TagIcon, ArrowRight, Sparkles } from "lucide-react"

// Sample blog data
const allPosts = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence in Healthcare",
    excerpt: "Exploring how AI is revolutionizing medical diagnostics, treatment plans, and patient care.",
    category: "Technology",
    author: "Dr. Jane Smith",
    publishedAt: "2023-07-15",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 24,
    reactions: 156,
    tags: ["AI", "Healthcare", "Technology", "Future"],
  },
  {
    id: 2,
    title: "Global Economic Trends to Watch in 2023",
    excerpt: "Analysis of emerging economic patterns and their potential impact on markets worldwide.",
    category: "Business",
    author: "Michael Johnson",
    publishedAt: "2023-07-12",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 18,
    reactions: 92,
    tags: ["Economics", "Business", "Global", "Trends"],
  },
  {
    id: 3,
    title: "Championship Finals: A Historic Showdown",
    excerpt: "Recap of the thrilling final match that kept fans on the edge of their seats.",
    category: "Sports",
    author: "Sarah Williams",
    publishedAt: "2023-07-10",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 32,
    reactions: 215,
    tags: ["Sports", "Championship", "Finals"],
  },
  {
    id: 4,
    title: "New Streaming Series Breaking All Records",
    excerpt: "How this surprise hit became the most-watched show in streaming history.",
    category: "Entertainment",
    author: "Robert Chen",
    publishedAt: "2023-07-08",
    readTime: "4 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 45,
    reactions: 278,
    tags: ["Entertainment", "Streaming", "TV", "Records"],
  },
  {
    id: 5,
    title: "10 Tech Gadgets That Will Define 2023",
    excerpt: "A comprehensive look at the most innovative tech gadgets that are shaping this year.",
    category: "Technology",
    author: "Michael Johnson",
    publishedAt: "2023-06-30",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 64,
    reactions: 342,
    tags: ["Technology", "Gadgets", "Innovation", "2023"],
  },
  {
    id: 6,
    title: "Understanding the Housing Market Shift",
    excerpt: "A detailed analysis of the current housing market trends and future predictions.",
    category: "Business",
    author: "Emily Rodriguez",
    publishedAt: "2023-06-28",
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 37,
    reactions: 185,
    tags: ["Housing", "Market", "Business", "Real Estate"],
  },
  {
    id: 7,
    title: "The Science Behind Sustainable Eating",
    excerpt: "Understanding the environmental and health benefits of sustainable food choices.",
    category: "Health",
    author: "Lisa Thompson",
    publishedAt: "2023-06-25",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 29,
    reactions: 203,
    tags: ["Health", "Sustainability", "Food", "Environment"],
  },
  {
    id: 8,
    title: "Political Reforms: What They Mean for Citizens",
    excerpt: "Breaking down the latest political reforms and their impact on everyday life.",
    category: "Politics",
    author: "David Wilson",
    publishedAt: "2023-06-22",
    readTime: "9 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 56,
    reactions: 271,
    tags: ["Politics", "Reforms", "Government", "Citizens"],
  },
  {
    id: 9,
    title: "Understanding Blockchain Beyond Cryptocurrency",
    excerpt: "How blockchain technology is being applied across industries beyond just digital currencies.",
    category: "Technology",
    author: "Robert Chen",
    publishedAt: "2023-06-15",
    readTime: "10 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 37,
    reactions: 215,
    tags: ["Blockchain", "Technology", "Cryptocurrency", "Innovation"],
  },
  {
    id: 10,
    title: "The Rise of Quantum Computing",
    excerpt: "Exploring the potential and challenges of quantum computing technology.",
    category: "Technology",
    author: "Sarah Williams",
    publishedAt: "2023-05-28",
    readTime: "12 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 42,
    reactions: 189,
    tags: ["Quantum", "Computing", "Technology", "Future"],
  },
  {
    id: 11,
    title: "Mental Health in the Digital Age",
    excerpt: "How technology is both helping and hurting our mental wellbeing.",
    category: "Health",
    author: "Dr. Emily Chen",
    publishedAt: "2023-05-20",
    readTime: "9 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 78,
    reactions: 324,
    tags: ["Mental Health", "Digital", "Wellbeing", "Technology"],
  },
  {
    id: 12,
    title: "The Future of Remote Work",
    excerpt: "Predictions for how remote work will evolve in the coming years.",
    category: "Business",
    author: "James Wilson",
    publishedAt: "2023-05-15",
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 53,
    reactions: 217,
    tags: ["Remote Work", "Business", "Future", "Workplace"],
  },
]

// Popular tags
const popularTags = [
  { name: "Technology", count: 42 },
  { name: "Business", count: 28 },
  { name: "Health", count: 24 },
  { name: "AI", count: 35 },
  { name: "Future", count: 29 },
]

export default function HomePage() {
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const filteredPosts = searchQuery
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : allPosts

  const displayedPosts = isSearching ? filteredPosts : filteredPosts.slice(0, visiblePosts)

  const handleLoadMore = () => {
    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      setVisiblePosts((prev) => prev + 3)
      setIsLoading(false)
    }, 800)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 animated-bg text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4 md:gap-8 max-w-3xl">
              <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-20 rounded-full mb-2 animate-bounce-in">
                <Sparkles className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Discover Amazing Content</span>
              </div>
              <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">
                Hello <span className="inline-block animate-wave">👋</span>, we are NewsVibe.
              </h1>
              <h2 className="text-5xl font-bold tracking-tight lg:text-7xl">See our thoughts, stories, and ideas.</h2>
              <p className="max-w-[700px] text-lg text-white/80 md:text-xl">
                Subscribe to our email newsletter and be the first to receive exciting updates, exclusive content, and
                special offers straight to your inbox.
              </p>
              <div className="flex w-full max-w-md items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30"
                />
                <Button type="submit" className="rounded-full bg-white text-brand-blue hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">Featured Articles</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our most popular and trending stories
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 my-8">
              {popularTags.map((tag, index) => (
                <Link
                  key={tag.name}
                  href={`/tag/${tag.name.toLowerCase()}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Badge
                    variant="outline"
                    className="px-3 py-1 text-sm hover:bg-accent transition-colors flex items-center gap-1 border-brand-blue/30"
                  >
                    <TagIcon className="h-3 w-3 text-brand-blue" />
                    {tag.name}
                    <span className="ml-1 text-xs text-muted-foreground">({tag.count})</span>
                  </Badge>
                </Link>
              ))}
            </div>

            <div className="flex justify-center my-8">
              <form onSubmit={handleSearch} className="w-full max-w-lg flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    className="pl-10 border-brand-blue/20 focus-visible:ring-brand-blue"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="bg-gradient-to-r from-brand-blue to-brand-purple text-white">
                  Search
                </Button>
                {isSearching && (
                  <Button variant="outline" onClick={clearSearch}>
                    Clear
                  </Button>
                )}
              </form>
            </div>

            {isSearching && (
              <div className="mb-8 text-center">
                <p className="text-muted-foreground">
                  {filteredPosts.length} results found for "{searchQuery}"
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {displayedPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="overflow-hidden card-hover-effect animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    />
                    <Badge className={`absolute top-2 left-2 category-badge-${post.category.toLowerCase()}`}>
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">
                        <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map((tag: string) => (
                          <Link href={`/tag/${tag.toLowerCase()}`} key={tag}>
                            <Badge variant="outline" className="hover:bg-secondary transition-colors">
                              #{tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {!isSearching && visiblePosts < filteredPosts.length && (
              <div className="flex justify-center mt-12">
                <Button
                  variant="outline"
                  className="rounded-full border-brand-blue text-brand-blue hover:bg-brand-blue/10 flex items-center gap-2 px-6"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-brand-blue border-t-transparent rounded-full mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {isSearching && filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any articles matching your search. Try different keywords.
                </p>
                <Button
                  variant="outline"
                  onClick={clearSearch}
                  className="border-brand-blue text-brand-blue hover:bg-brand-blue/10"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

