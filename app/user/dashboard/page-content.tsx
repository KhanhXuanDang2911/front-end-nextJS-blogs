"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, FileText, MessageSquare, ThumbsUp, Edit, Clock } from "lucide-react"
import { getUsersDashboardAll } from "@/service/countService"
import { getUserId } from "@/utils/auth"
import { getNewsForAdminPage } from "@/service/newsService"

export default function UserDashboardContentPage() {
  const [count, setCount] = useState<any>({ news_count: 0, comment_count: 0, reaction_count: 0 })
  const [displayedPosts, setDisplayedPosts] = useState<any[]>([])

  useEffect(() => {
    const fetchCountAndNews = async () => {
      const userId = getUserId()
      if (userId) {
        const res = await getUsersDashboardAll(userId)
        const news = await getNewsForAdminPage(3, 0, userId)
        setCount(res)
        setDisplayedPosts(news)
      }
    }
    fetchCountAndNews()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/user/posts/new">Create New Post</Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count.news_count}</div>
              {/* <p className="text-xs text-muted-foreground">+2 new this month</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count.comment_count}</div>
              {/* <p className="text-xs text-muted-foreground">+18% from last month</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reactions</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count.reaction_count}</div>
              {/* <p className="text-xs text-muted-foreground">+24% from last month</p> */}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent">Recent Posts</TabsTrigger>
            {/* <TabsTrigger value="popular">Popular Posts</TabsTrigger> */}
          </TabsList>
          <TabsContent value="recent" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {displayedPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="overflow-hidden card-hover-effect animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-24 rounded-md overflow-hidden mb-2">
                    <img
                      src={post.image ?
                        (post.image.includes('http') ?
                          post.image.replace('image/upload/', '') :
                          "https://res.cloudinary.com/dbqoymyi8/" + post.image
                        )
                        : "/placeholder.svg"
                      }
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
                            {post.comment_count || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {post.reaction_count || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/user/posts">View All Posts</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}