"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Eye, MoreHorizontal, Plus, Trash2, FileText, MessageSquare, ThumbsUp, BarChart } from "lucide-react"

// Sample user data
const user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg",
  joinedDate: "January 2023",
  role: "Author",
}

// Sample blog posts data
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

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = userPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <Card>
            <CardHeader className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <Badge className="mt-2">{user.role}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Member since</p>
                  <p className="text-sm text-muted-foreground">{user.joinedDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Posts</p>
                  <p className="text-sm text-muted-foreground">{userPosts.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Published</p>
                  <p className="text-sm text-muted-foreground">
                    {userPosts.filter((post) => post.status === "Published").length}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/profile">Edit Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button asChild>
              <Link href="/dashboard/create-post">
                <Plus className="mr-2 h-4 w-4" /> Create New Post
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="posts">My Posts</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
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

              {/* Recent Posts */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userPosts.slice(0, 4).map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="relative h-40">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                        <div className="absolute top-2 right-2">
                          <Badge
                            variant={
                              post.status === "Published"
                                ? "default"
                                : post.status === "Draft"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {post.status}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <CardDescription>{post.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="text-sm text-muted-foreground">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Not published"}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/edit-post/${post.id}`}>
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/blog/${post.id}`}>
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Link>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">All Posts</h2>
                <div className="relative w-64">
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Title</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Category</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Date</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Views</th>
                      <th className="px-4 py-3.5 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredPosts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-4 py-4 text-sm">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-16 rounded overflow-hidden">
                              <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="font-medium">{post.title}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">{post.category}</td>
                        <td className="px-4 py-4 text-sm">
                          <Badge
                            variant={
                              post.status === "Published"
                                ? "default"
                                : post.status === "Draft"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {post.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "—"}
                        </td>
                        <td className="px-4 py-4 text-sm">{post.views}</td>
                        <td className="px-4 py-4 text-sm text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/blog/${post.id}`}>
                                  <Eye className="h-4 w-4 mr-2" /> View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/edit-post/${post.id}`}>
                                  <Edit className="h-4 w-4 mr-2" /> Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Post Performance</CardTitle>
                    <CardDescription>Views, comments, and reactions over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BarChart className="h-5 w-5" />
                      <span>Chart visualization would go here</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Posts</CardTitle>
                    <CardDescription>Your most viewed and engaged content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {userPosts
                        .sort((a, b) => b.views - a.views)
                        .slice(0, 3)
                        .map((post, index) => (
                          <div key={post.id} className="flex items-center gap-4">
                            <div className="font-bold text-lg text-muted-foreground">{index + 1}</div>
                            <div className="relative h-12 w-20 rounded overflow-hidden">
                              <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium line-clamp-1">{post.title}</h3>
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                <span>{post.views} views</span>
                                <span>{post.comments} comments</span>
                                <span>{post.reactions} reactions</span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

