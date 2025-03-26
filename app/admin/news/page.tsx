"use client"
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, Search } from "lucide-react"
import { message, Spin } from "antd";
import { deleteNews, getNewsForAdminPage, searchNewsByTitle } from "@/service/newsService"
import Link from 'next/link';

export default function NewsManagementPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    const news = await searchNewsByTitle(searchTerm)
    setNewsList(news)
  }
  const handleDelete = (news: any) => {
    setSelectedNews(news)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await deleteNews(selectedNews.id)
      if (res.status === 205) {
        messageApi.open({
          type: 'success',
          content: `Delete news ${selectedNews.id} successful`,
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

  const fetchNews = async () => {
    const res = searchTerm !== "" ? await searchNewsByTitle(searchTerm) : await getNewsForAdminPage()
    setNewsList(res)
  }

  useEffect(() => {
    setIsLoading(true);
    fetchNews()
    setIsLoading(false);
  }, []);

  return (
    <div className="p-8">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News Management</h1>
        <Link href={'/user/posts/new'}>
          <Button className='flex items-center gap-1'>
            <Plus className="mr-2 h-4 w-4" /> <span>Add News</span>
          </Button>
        </Link>

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
              <TableHead>Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Published At</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? <Spin indicator={<LoadingOutlined spin />} size="large" /> :
              newsList.map((news) => (
                <TableRow key={news.id}>
                  <TableCell className="font-medium">{news.id}</TableCell>
                  <TableCell className="font-medium">{news.title}</TableCell>
                  <TableCell className="font-normal">  {news.content.length > 100 ? news.content.slice(0, 100) + '...' : news.content}</TableCell>
                  <TableCell className="font-normal">{news.author_id}</TableCell> {/* Hiển thị ID của tác giả */}
                  <TableCell className="font-normal">{news.status}</TableCell>
                  <TableCell className="font-normal">{news.image ? <img src={news.image} alt="News Image" className="w-16 h-16 object-cover" /> : 'No Image'}</TableCell> {/* Hiển thị hình ảnh nếu có */}
                  <TableCell className="font-normal">{news.published_at ? new Date(news.published_at).toLocaleString() : 'Not Published'}</TableCell> {/* Hiển thị thời gian công bố */}
                  <TableCell className="font-normal">{news.category}</TableCell> {/* Hiển thị category */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <Link href={`/user/posts/${news.id}/edit`} target='_blank'>
                          <DropdownMenuItem>
                            Edit
                          </DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(news)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>


      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <Button variant="outline" size="sm">
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Delete News Dialog */}
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
            <Button variant="destructive" onClick={handleDeleteSubmit}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
