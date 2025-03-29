"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, ThumbsUp, ArrowRight, Loader2, TagIcon, Hash } from "lucide-react"

// Sample blog data

export default function ArticlesPage({ allPosts }: { allPosts: any[] }) {
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
      <section className="w-full py-12 md:py-16 lg:py-20 animated-bg text-white">
          <div className="container px-4 md:px-6 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-20 rounded-full mb-4 animate-bounce-in">
              <Hash className="h-6 w-6 mr-2" />
              <span className="text-lg font-medium">Browse Articles</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Articles Around the World</h1>
            <p className="max-w-[700px] mx-auto text-lg md:text-xl text-white/80">
              Read and explore articles from around the world on different subjects.
            </p>
          </div>
        </section>
        <div className="container py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-4xl font-bold gradient-text">All Articles</h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Browse through our complete collection of articles
            </p>
          </div>

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
                  <Badge className={`absolute top-2 left-2 category-badge-${post.category_name}`}>
                    {post.category_name}
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
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.created_at}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {post.comment_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {post.reaction_count}
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

