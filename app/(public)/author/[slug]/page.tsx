"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  MessageSquare,
  ThumbsUp,
  User,
  Mail,
  MapPin,
  Calendar,
  TagIcon,
  Loader2,
  ArrowRight,
} from "lucide-react"

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
]

// Sample author data
const authors = {
  "jane-smith": {
    name: "Dr. Jane Smith",
    bio: "Dr. Jane Smith is a healthcare technology researcher with over 15 years of experience in the field of medical informatics.",
    image: "/placeholder.svg",
    role: "Healthcare Technology Researcher",
    location: "Boston, MA",
    email: "jane.smith@example.com",
    joinedDate: "January 2021",
  },
  "michael-johnson": {
    name: "Michael Johnson",
    bio: "Michael Johnson is a senior economic analyst with expertise in global market trends and financial forecasting.",
    image: "/placeholder.svg",
    role: "Senior Economic Analyst",
    location: "New York, NY",
    email: "michael.johnson@example.com",
    joinedDate: "March 2020",
  },
  "sarah-williams": {
    name: "Sarah Williams",
    bio: "Sarah Williams is a sports journalist and commentator with a passion for bringing the excitement of live sports to readers.",
    image: "/placeholder.svg",
    role: "Sports Journalist",
    location: "Chicago, IL",
    email: "sarah.williams@example.com",
    joinedDate: "June 2019",
  },
  "robert-chen": {
    name: "Robert Chen",
    bio: "Robert Chen is a technology writer and blockchain specialist with a background in computer science and cryptography.",
    image: "/placeholder.svg",
    role: "Technology Writer",
    location: "San Francisco, CA",
    email: "robert.chen@example.com",
    joinedDate: "November 2018",
  },
}

export default function AuthorPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [author, setAuthor] = useState<any>(null)
  const [authorPosts, setAuthorPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visiblePosts, setVisiblePosts] = useState(3)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the author and their posts from your API
    const fetchAuthorData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        const authorData = authors[slug as keyof typeof authors]

        if (authorData) {
          setAuthor(authorData)

          // Filter posts by this author
          const posts = allPosts.filter((post) => post.authorId === slug)
          setAuthorPosts(posts)
        } else {
          // Handle author not found
          console.error("Author not found")
        }
      } catch (error) {
        console.error("Error fetching author data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAuthorData()
  }, [slug])

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    // Simulate loading delay
    setTimeout(() => {
      setVisiblePosts((prev) => prev + 3)
      setIsLoadingMore(false)
    }, 800)
  }

  const displayedPosts = authorPosts.slice(0, visiblePosts)
  const hasMorePosts = visiblePosts < authorPosts.length

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading author profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!author) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Author Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The author you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="md:w-1/3 flex flex-col items-center text-center md:text-left md:items-start">
                <Avatar className="h-32 w-32 mb-4 ring-4 ring-brand-blue/20">
                  <AvatarImage src={author.image} alt={author.name} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold mb-2 gradient-text">{author.name}</h1>
                <p className="text-lg text-brand-blue mb-4">{author.role}</p>
                <p className="text-muted-foreground mb-6">{author.bio}</p>
                <div className="space-y-2 w-full">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-brand-blue" />
                    <span>{author.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand-purple" />
                    <span>{author.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-brand-pink" />
                    <span>Joined {author.joinedDate}</span>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-brand-blue" />
                    <h2 className="text-xl font-bold">Author Stats</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-brand-blue/10 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-brand-blue">{authorPosts.length}</p>
                      <p className="text-sm text-muted-foreground">Articles</p>
                    </div>
                    <div className="bg-brand-purple/10 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-brand-purple">
                        {authorPosts.reduce((sum, post) => sum + post.views, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Views</p>
                    </div>
                    <div className="bg-brand-pink/10 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-brand-pink">
                        {authorPosts.reduce((sum, post) => sum + post.comments, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Comments</p>
                    </div>
                    <div className="bg-brand-green/10 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-brand-green">
                        {authorPosts.reduce((sum, post) => sum + post.reactions, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Reactions</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <p className="text-sm font-medium">Popular topics:</p>
                    {/* Get unique tags from author's posts and display top 5 */}
                    {Array.from(new Set(authorPosts.flatMap((post) => post.tags)))
                      .slice(0, 5)
                      .map((tag) => (
                        <Link href={`/tag/${tag.toLowerCase()}`} key={tag}>
                          <Badge variant="outline" className="hover:bg-secondary transition-colors">
                            <TagIcon className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold gradient-text">Articles by {author.name}</h2>
              <p className="text-muted-foreground">{authorPosts.length} articles</p>
            </div>

            {authorPosts.length > 0 ? (
              <>
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
                          <div className="flex flex-wrap gap-2 mt-2">
                            {post.tags.map((tag: string) => (
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
                      disabled={isLoadingMore}
                    >
                      {isLoadingMore ? (
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
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">This author hasn't published any articles yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

