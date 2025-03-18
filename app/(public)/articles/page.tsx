"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, ThumbsUp, ArrowRight, Loader2, TagIcon } from "lucide-react"

// Sample blog data
const allPosts = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence in Healthcare",
    excerpt: "Exploring how AI is revolutionizing medical diagnostics, treatment plans, and patient care.",
    category: "Technology",
    author: "Dr. Jane Smith",
    authorId: "jane-smith",
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
    authorId: "michael-johnson",
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
    authorId: "sarah-williams",
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
    authorId: "robert-chen",
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
    authorId: "michael-johnson",
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
    authorId: "emily-rodriguez",
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
    authorId: "lisa-thompson",
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
    authorId: "david-wilson",
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
    authorId: "robert-chen",
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
    authorId: "sarah-williams",
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
    authorId: "emily-chen",
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
    authorId: "james-wilson",
    publishedAt: "2023-05-15",
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=600",
    comments: 53,
    reactions: 217,
    tags: ["Remote Work", "Business", "Future", "Workplace"],
  },
]

export default function ArticlesPage() {
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadMore = () => {
    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      setVisiblePosts((prev) => prev + 3)
      setIsLoading(false)
    }, 800)
  }

  const displayedPosts = allPosts.slice(0, visiblePosts)
  const hasMorePosts = visiblePosts < allPosts.length

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-4xl font-bold gradient-text">All Articles</h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Browse through our complete collection of articles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post, index) => (
              <Card
                key={post.id}
                className="overflow-hidden card-hover-effect animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
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
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-muted-foreground">By</span>
                      <Link href={`/author/${post.authorId}`} className="text-sm font-medium hover:text-primary">
                        {post.author}
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map((tag) => (
                        <Link href={`/tag/${tag.toLowerCase()}`} key={tag}>
                          <Badge variant="outline" className="hover:bg-secondary transition-colors">
                            <TagIcon className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
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

          {hasMorePosts && (
            <div className="flex justify-center mt-12">
              <Button
                variant="outline"
                className="rounded-full border-brand-blue text-brand-blue hover:bg-brand-blue/10 flex items-center gap-2 px-6"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
        </div>
      </main>
      <Footer />
    </div>
  )
}

