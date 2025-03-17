"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash2, MoreHorizontal, Search, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  {
    id: 5,
    title: "The Future of Remote Work",
    excerpt: "How remote work is changing the workplace landscape and what to expect in the future.",
    category: "Business",
    status: "Published",
    publishedAt: "2023-05-20",
    views: 1532,
    comments: 42,
    reactions: 187,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Beginner's Guide to Photography",
    excerpt: "Essential tips and techniques for those starting their photography journey.",
    category: "Arts",
    status: "Draft",
    publishedAt: null,
    views: 0,
    comments: 0,
    reactions: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function UserPostsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)

  const filteredPosts = userPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (post: any) => {
    setSelectedPost(post)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would delete the post from your backend
    console.log("Deleting post:", selectedPost)
    setIsDeleteDialogOpen(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Button asChild>
          <Link href="/user/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-16 rounded overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="line-clamp-1">{post.title}</span>
                  </div>
                </TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      post.status === "Published" ? "default" : post.status === "Draft" ? "outline" : "secondary"
                    }
                  >
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "—"}
                </TableCell>
                <TableCell>{post.views}</TableCell>
                <TableCell className="text-right">
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
                          <Eye className="mr-2 h-4 w-4" /> View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/user/posts/${post.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(post)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredPosts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No posts found. Try a different search term or{" "}
                  <Link href="/user/posts/new" className="text-primary hover:underline">
                    create a new post
                  </Link>
                  .
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="py-4">
              <p className="font-medium">{selectedPost.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{selectedPost.excerpt}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

