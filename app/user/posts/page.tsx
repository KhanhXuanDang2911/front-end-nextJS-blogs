"use client"
import { LoadingOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react"
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
import { deleteNews, getNewsForAdminPage, searchNewsByTitle } from "@/service/newsService"
import { message, Spin } from "antd"
import { getUserFromToken } from "@/util/decode_jwt";

export default function UserPostsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newsList, setNewsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedNews, setSelectedNews] = useState<any>(null)
  const userId = getUserFromToken().user_id

  const handleDelete = (news: any) => {
    setSelectedNews(news)
    setIsDeleteDialogOpen(true)
  }

  const fetchNews = async () => {
    setIsLoading(true);
    const res = searchTerm !== "" ? await searchNewsByTitle(searchTerm, userId) : await getNewsForAdminPage(10000, 0, userId)
    console.log(userId)
    console.log(res)
    setNewsList(res)
    setIsLoading(false);
  }

  const handleSearch = async () => {
    const news = await searchNewsByTitle(searchTerm, userId)
    setNewsList(news)
  }

  useEffect(() => {
    fetchNews()
  }, []);

  const handleDeleteSubmit = async (id: any) => {
    setIsLoading(true);
    try {
      const res = await deleteNews(id)
      if (res.status === 205) {
        messageApi.open({
          type: 'success',
          content: `Delete news ${id} successful`,
        });
        setIsDeleteDialogOpen(false)
        fetchNews()
      } else if (res.status == 500) {
        messageApi.open({
          type: 'error',
          content: res.message,
        })
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error + "",
      })
    }
    setIsLoading(false);
  }

  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Button asChild>
          <Link href="/user/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      <div className="flex items-center py-4 gap-5">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              {/* <TableHead>Views</TableHead> */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? <></> :
              <>{newsList.map((post) => (
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
                        post.status === "published" ? "default" : post.status === "draft" ? "outline" : "secondary"
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {post.published_at ? post.published_at : "—"}
                  </TableCell>
                  {/* <TableCell>{post.views}</TableCell> */}
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
                {newsList.length === 0 && isLoading === false && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No posts found. Try a different search term or{" "}
                      <Link href="/user/posts/new" className="text-primary hover:underline">
                        create a new post
                      </Link>
                      .
                    </TableCell>
                  </TableRow>
                )}</>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
          </DialogHeader>
          {selectedNews && (
            <div className="py-4">
              <p className="italic">
                Are you sure you want to delete the news titled "{selectedNews.title}"?
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDeleteSubmit(selectedNews.id)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

