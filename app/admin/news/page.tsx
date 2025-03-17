"use client"

import { useState } from "react"
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Eye, MoreHorizontal, Plus, Search, Loader2 } from "lucide-react"

// Sample categories
const categories = ["Technology", "Business", "Sports", "Entertainment", "Politics", "Health", "Science", "Education"]

// Sample data
const news = [
  {
    id: 1,
    title: "New Technology Breakthrough",
    category: "Technology",
    author: "John Doe",
    status: "Published",
    publishedAt: "2023-06-15",
    views: 1245,
  },
  {
    id: 2,
    title: "Global Economic Summit Results",
    category: "Business",
    author: "Jane Smith",
    status: "Published",
    publishedAt: "2023-06-20",
    views: 980,
  },
  {
    id: 3,
    title: "Sports Championship Finals",
    category: "Sports",
    author: "Bob Johnson",
    status: "Draft",
    publishedAt: null,
    views: 0,
  },
  {
    id: 4,
    title: "New Entertainment Series Launch",
    category: "Entertainment",
    author: "Alice Brown",
    status: "Published",
    publishedAt: "2023-07-05",
    views: 2340,
  },
  {
    id: 5,
    title: "Political Developments in Europe",
    category: "Politics",
    author: "Charlie Wilson",
    status: "Under Review",
    publishedAt: null,
    views: 0,
  },
]

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form states for create/edit
  const [formData, setFormData] = useState({
    title: "",
    category: "technology",
    author: "",
    content: "",
    status: "draft",
  })

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (item: any) => {
    setSelectedNews(item)
    setFormData({
      title: item.title,
      category: item.category.toLowerCase(),
      author: item.author,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      status: item.status.toLowerCase().replace(" ", "-"),
    })
    setIsEditDialogOpen(true)
  }

  const handleDelete = (item: any) => {
    setSelectedNews(item)
    setIsDeleteDialogOpen(true)
  }

  const handleCreateArticle = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Creating article:", formData)
      setIsSubmitting(false)
      setIsCreateDialogOpen(false)
      // Reset form
      setFormData({
        title: "",
        category: "technology",
        author: "",
        content: "",
        status: "draft",
      })
    }, 1000)
  }

  const handleUpdateArticle = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Updating article:", { id: selectedNews.id, ...formData })
      setIsSubmitting(false)
      setIsEditDialogOpen(false)
    }, 1000)
  }

  const handleDeleteArticle = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Deleting article:", selectedNews)
      setIsSubmitting(false)
      setIsDeleteDialogOpen(false)
    }, 1000)
  }

  const openCreateDialog = () => {
    setFormData({
      title: "",
      category: "technology",
      author: "",
      content: "",
      status: "draft",
    })
    setIsCreateDialogOpen(true)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold gradient-text">News Articles</h1>
        <Button onClick={openCreateDialog} className="bg-gradient-to-r from-brand-blue to-brand-purple text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Article
        </Button>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 border-brand-blue/20 focus-visible:ring-brand-blue"
          />
        </div>
      </div>

      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNews.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Draft"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status}
                  </div>
                </TableCell>
                <TableCell>{item.publishedAt || "—"}</TableCell>
                <TableCell>{item.views}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(item)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(item)} className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredNews.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No articles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Create News Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Article</DialogTitle>
            <DialogDescription>
              Create a new news article. Fill in the details below and click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right font-medium">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter article title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right font-medium">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right font-medium">
                Author
              </Label>
              <Input
                id="author"
                className="col-span-3"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Enter author name"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2 font-medium">
                Content
              </Label>
              <Textarea
                id="content"
                className="col-span-3"
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter article content"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right font-medium">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleCreateArticle}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-brand-blue to-brand-purple text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Save Article"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit News Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Article</DialogTitle>
            <DialogDescription>Make changes to the news article. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedNews && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right font-medium">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right font-medium">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-author" className="text-right font-medium">
                  Author
                </Label>
                <Input
                  id="edit-author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-content" className="text-right pt-2 font-medium">
                  Content
                </Label>
                <Textarea
                  id="edit-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="col-span-3"
                  rows={8}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right font-medium">
                  Status
                </Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleUpdateArticle}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-brand-blue to-brand-purple text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete News Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-red-600">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedNews && (
            <div className="py-4 space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Title:</span>
                <span>{selectedNews.title}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Category:</span>
                <span>{selectedNews.category}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Author:</span>
                <span>{selectedNews.author}</span>
              </div>
            </div>
          )}
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteArticle} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

