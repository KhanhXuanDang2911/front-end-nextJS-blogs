"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, FileText, MessageSquare, ThumbsUp, Edit, Clock } from "lucide-react"

// Sample user posts data
const userPosts = [
  {
    id: 1,
    title: "10 Tips for Better Productivity",
    excerpt: "Learn how to maximize your productivity with these proven strategies.",
    category: "Lifestyle",
    status: "Published",
    publishedAt: "2023-07-15",
    views: 1245,
    comments: 24,
    reactions: 156,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Understanding Modern Web Development",
    excerpt: "A comprehensive guide to the latest web development technologies and practices.",
    category: "Technology",
    status: "Draft",
    publishedAt: null,
    views: 0,
    comments: 0,
    reactions: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "The Art of Mindful Living",
    excerpt: "Discover how mindfulness can transform your daily life and improve your well-being.",
    category: "Health",
    status: "Published",
    publishedAt: "2023-06-28",
    views: 876,
    comments: 15,
    reactions: 92,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Financial Planning for Beginners",
    excerpt: "Essential tips for managing your finances and planning for the future.",
    category: "Finance",
    status: "Under Review",
    publishedAt: null,
    views: 0,
    comments: 0,
    reactions: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function UserDashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    // Get user data
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userPosts.reduce((sum, post) => sum + post.views, 0)}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userPosts.length}</div>
              <p className="text-xs text-muted-foreground">+2 new this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userPosts.reduce((sum, post) => sum + post.comments, 0)}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reactions</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userPosts.reduce((sum, post) => sum + post.reactions, 0)}</div>
              <p className="text-xs text-muted-foreground">+24% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent">Recent Posts</TabsTrigger>
            <TabsTrigger value="popular">Popular Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPosts.slice(0, 3).map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={
                        post.status === "Published" ? "default" : post.status === "Draft" ? "outline" : "secondary"
                      }
                    >
                      {post.status}
                    </Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription>{post.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Not published"}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
                          <Link href={`/user/posts/${post.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
                          <Link href={`/blog/${post.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
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
          <TabsContent value="popular" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPosts
                .filter((post) => post.status === "Published")
                .sort((a, b) => b.views - a.views)
                .slice(0, 3)
                .map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute top-2 right-2">{post.views} views</Badge>
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <CardDescription>{post.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {post.comments}
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {post.reactions}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
                          <Link href={`/blog/${post.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
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

        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Your recent activity and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">You published a new post</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">You received 5 new comments</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <ThumbsUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Your post reached 1000 reactions</p>
                  <p className="text-xs text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

