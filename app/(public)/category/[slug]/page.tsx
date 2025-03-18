import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MessageSquare, ThumbsUp } from "lucide-react"

// Sample blog data by category
const categoryPosts = {
  technology: [
    {
      id: 1,
      title: "The Future of Artificial Intelligence in Healthcare",
      excerpt: "Exploring how AI is revolutionizing medical diagnostics, treatment plans, and patient care.",
      author: "Dr. Jane Smith",
      authorImage: "/placeholder.svg",
      publishedAt: "2023-07-15",
      readTime: "8 min read",
      image: "/placeholder.svg?height=400&width=600",
      comments: 24,
      reactions: 156,
    },
    {
      id: 5,
      title: "10 Tech Gadgets That Will Define 2023",
      excerpt: "A comprehensive look at the most innovative tech gadgets that are shaping this year.",
      author: "Michael Johnson",
      authorImage: "/placeholder.svg",
      publishedAt: "2023-06-30",
      readTime: "6 min read",
      image: "/placeholder.svg?height=400&width=600",
      comments: 64,
      reactions: 342,
    },
    {
      id: 9,
      title: "Understanding Blockchain Beyond Cryptocurrency",
      excerpt: "How blockchain technology is being applied across industries beyond just digital currencies.",
      author: "Robert Chen",
      authorImage: "/placeholder.svg",
      publishedAt: "2023-06-15",
      readTime: "10 min read",
      image: "/placeholder.svg?height=400&width=600",
      comments: 37,
      reactions: 215,
    },
    {
      id: 13,
      title: "The Rise of Quantum Computing",
      excerpt: "Exploring the potential and challenges of quantum computing technology.",
      author: "Sarah Williams",
      authorImage: "/placeholder.svg",
      publishedAt: "2023-05-28",
      readTime: "12 min read",
      image: "/placeholder.svg?height=400&width=600",
      comments: 42,
      reactions: 189,
    },
  ],
  business: [
    {
      id: 2,
      title: "Global Economic Trends to Watch in 2023",
      excerpt: "Analysis of emerging economic patterns and their potential impact on markets worldwide.",
      author: "Michael Johnson",
      authorImage: "/placeholder.svg",
      publishedAt: "2023-07-12",
      readTime: "6 min read",
      image: "/placeholder.svg?height=400&width=600",
      comments: 18,
      reactions: 92,
    },
    {
      id: 6,
      title: "Understanding the Housing Market Shift",
      excerpt: "A detailed analysis of the current housing market trends and future predictions.",
      author: "Emily Rodriguez",
      authorImage: "/placeholder.svg",
      publishedAt: "2023-06-28",
      readTime: "7 min read",
      image: "/placeholder.svg?height=400&width=600",
      comments: 37,
      reactions: 185,
    },
  ],
  sports: [
    {
      id: 3,
      title: "Championship Finals: A Historic Showdown",
      excerpt: "Recap of the thrilling final match that kept fans on the edge of their seats.",
      author: "Sarah Williams",
      authorImage: "/placeholder.svg",
      publishedAt: "2023-07-10",
      readTime: "5 min read",
      image: "/placeholder.svg?height=400&width=600",
      comments: 32,
      reactions: 215,
    },
  ],
  entertainment: [
    {
      id: 4,
      title: "New Streaming Series Breaking All Records",
      excerpt: "How this surprise hit became the most-watched show in streaming history.",
      author: "Robert Chen",
      authorImage: "/placeholder.svg",
      publishedAt: "2023-07-08",
      readTime: "4 min read",
      image: "/placeholder.svg?height=400&width=600",
      comments: 45,
      reactions: 278,
    },
  ],
  politics: [
    {
      id: 8,
      title: "Political Reforms: What They Mean for Citizens",
      excerpt: "Breaking down the latest political reforms and their impact on everyday life.",
      author: "David Wilson",
      authorImage: "/placeholder.svg",
      publishedAt: "2023-06-22",
      readTime: "9 min read",
      image: "/placeholder.svg?height=400&width=600",
      comments: 56,
      reactions: 271,
    },
  ],
  health: [
    {
      id: 7,
      title: "The Science Behind Sustainable Eating",
      excerpt: "Understanding the environmental and health benefits of sustainable food choices.",
      author: "Lisa Thompson",
      authorImage: "/placeholder.svg",
      publishedAt: "2023-06-25",
      readTime: "8 min read",
      image: "/placeholder.svg?height=400&width=600",
      comments: 29,
      reactions: 203,
    },
  ],
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const categoryName = capitalizeFirstLetter(slug)

  // Get posts for this category, or empty array if category doesn't exist
  const posts = categoryPosts[slug as keyof typeof categoryPosts] || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
        <p className="text-muted-foreground max-w-2xl">
          Explore our latest articles and insights in the {categoryName.toLowerCase()} category.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <div className="relative h-48">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
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
          <h2 className="text-2xl font-bold mb-4">No posts found</h2>
          <p className="text-muted-foreground mb-6">
            There are currently no posts in the {categoryName.toLowerCase()} category.
          </p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

