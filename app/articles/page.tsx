import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, ThumbsUp } from "lucide-react"

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
  },
]

export default function ArticlesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-4xl font-bold">All Articles</h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Browse through our complete collection of articles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post) => (
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

          <div className="flex justify-center mt-8">
            <Button variant="outline" className="rounded-full">
              Load More
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

