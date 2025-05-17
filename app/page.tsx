"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, ThumbsUp, Search, TagIcon, ArrowRight, Sparkles } from "lucide-react"
import { getNewsForAdminPage } from "@/service/newsService"
import { getCategoryForAdminPage } from "@/service/categoryService"
import './style.css'
import Image from "next/image"
import { format } from "date-fns"

export default function HomePage() {
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [allPosts, setAllPosts] = useState<any[]>([])
  const [popularTags, setPopularTags] = useState<any[]>([])

  const filteredPosts = searchQuery
    ? allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
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

  const fetchNews = async () => {
    setIsLoading(true);
    const res = await getNewsForAdminPage()
    setAllPosts(res)
    setIsLoading(false);
  }

  const fetchCategoryPopu = async () => {
    setIsLoading(true);
    const res = await getCategoryForAdminPage(5, '-news_count')
    setPopularTags(res)
    setIsLoading(false);
  }

  useEffect(() => {
    fetchNews()
    fetchCategoryPopu()
  }, []);

  return (

    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* <section className="w-full py-12 md:py-24 lg:py-32 animated-bg text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4 md:gap-8 max-w-3xl">
              
            </div>
          </div>
        </section> */}
        {/* <img src="jenda.jpg" /> */}
        <div className="relative w-full h-[90vh] bg-cover bg-top flex items-center justify-center text-center text-white" style={{ backgroundImage: `url("jenda.jpg")` }}>
          <div className="absolute inset-0 bg-[#081828] opacity-80">

          </div>
          <div className="relative z-10 px-6">
            <span className="inline-block bg-blue-500 text-[#fff] px-4 py-2 rounded-full text-sm font-semibold mb-[15px]">
              Stay Updated Daily
            </span>

            <h1 className="text-[32px] font-bold leading-10 text-[#fff] mb-5">Latest News & Insights From <br /> Around The World</h1>

            <p className="text-[#fff] text-[14px] max-w-[550px] mx-auto">
              Stay informed with the latest updates, breaking news, and in-depth analysis on a wide range of topics,
              from global events to tech innovations, lifestyle trends, and more – all in one place.
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <Link href={'/tags'} className="button btn">
                View Tags
              </Link>
              <Link href={'/artcles'} className="button btn-1">
                Read Articles
              </Link>
            </div>
          </div>
        </div>

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
                  href={`/tags/${tag.id}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Badge
                    variant="outline"
                    className="px-3 py-1 text-sm hover:bg-accent transition-colors flex items-center gap-1 border-brand-blue/30"
                  >
                    <TagIcon className="h-3 w-3 text-brand-blue" />
                    {tag.name}
                    <span className="ml-1 text-xs text-muted-foreground">({tag.news_count})</span>
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
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={post.image ?
                        (post.image.includes('http') ?
                          post.image.replace('image/upload/', '') :
                          "https://res.cloudinary.com/dbqoymyi8/" + post.image
                        )
                        : "/placeholder.svg"
                      }
                      alt={post.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">
                        <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      {/* <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map((tag: string) => (
                          <Link href={`/tag/${tag.toLowerCase()}`} key={tag}>
                            <Badge variant="outline" className="hover:bg-secondary transition-colors">
                              #{tag}
                            </Badge>
                          </Link>
                        ))}
                      </div> */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.created_at ? format(new Date(post.created_at), "MMM d, yyyy") : ''}
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

