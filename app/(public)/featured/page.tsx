import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, ThumbsUp } from "lucide-react"

// Sample featured blog data
const featuredPosts = [
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
  },
]

export default function FeaturedPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold">Featured Articles</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Discover our most popular and trending stories from across the platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full" />
              <Badge className="absolute top-2 left-2">{post.category}</Badge>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  <Link href={`/blog/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
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
    </div>
  )
}

