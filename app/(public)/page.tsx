import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, ThumbsUp } from "lucide-react"

// Sample blog data
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
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4 md:gap-8 max-w-3xl">
              <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">
                Hello <span className="inline-block animate-wave">👋</span>, we are NewsVibe.
              </h1>
              <h2 className="text-5xl font-bold tracking-tight lg:text-7xl">See our thoughts, stories, and ideas.</h2>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                Subscribe to our email newsletter and be the first to receive exciting updates, exclusive content, and
                special offers straight to your inbox.
              </p>
              <div className="flex w-full max-w-md items-center space-x-2">
                <Input type="email" placeholder="Email Address" className="rounded-full" />
                <Button type="submit" className="rounded-full">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Articles</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our most popular and trending stories
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
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
                View All Articles
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

