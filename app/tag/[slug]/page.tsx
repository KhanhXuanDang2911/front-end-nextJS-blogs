"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, ThumbsUp, TagIcon } from "lucide-react"

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
]

export default function TagPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [tagName, setTagName] = useState("")
  const [taggedPosts, setTaggedPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Decode the slug and capitalize first letter
    const decodedTag = decodeURIComponent(slug)
    setTagName(decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1))

    // Filter posts by tag (case insensitive)
    const filteredPosts = allPosts.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase() === decodedTag.toLowerCase()),
    )

    setTaggedPosts(filteredPosts)
    setIsLoading(false)
  }, [slug])

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 animated-bg text-white">
          <div className="container px-4 md:px-6 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-20 rounded-full mb-4 animate-bounce-in">
              <TagIcon className="h-6 w-6 mr-2" />
              <span className="text-lg font-medium">Tag</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tagName}</h1>
            <p className="max-w-[700px] mx-auto text-lg md:text-xl text-white/80">
              Explore all articles tagged with {tagName}
            </p>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : taggedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {taggedPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden card-hover-effect animate-scale-in">
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
                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
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
            ) : (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">No posts found</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We couldn't find any articles tagged with "{tagName}". Try exploring other tags.
                </p>
                <Button asChild>
                  <Link href="/tags">Browse All Tags</Link>
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

