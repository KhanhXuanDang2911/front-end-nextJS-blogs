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
import { ChevronLeft, ChevronRight, Eye, MoreHorizontal, Search } from "lucide-react"

// Sample data
const comments = [
  {
    id: 1,
    content: "Great article, very informative!",
    author: "John Doe",
    articleTitle: "New Technology Breakthrough",
    status: "Approved",
    createdAt: "2023-06-18 14:30",
  },
  {
    id: 2,
    content: "I disagree with some points in this article.",
    author: "Jane Smith",
    articleTitle: "Global Economic Summit Results",
    status: "Approved",
    createdAt: "2023-06-22 09:15",
  },
  {
    id: 3,
    content: "This is spam content that should be removed.",
    author: "Unknown User",
    articleTitle: "Sports Championship Finals",
    status: "Spam",
    createdAt: "2023-06-25 18:45",
  },
  {
    id: 4,
    content: "Looking forward to more articles like this!",
    author: "Alice Brown",
    articleTitle: "New Entertainment Series Launch",
    status: "Pending",
    createdAt: "2023-07-08 11:20",
  },
  {
    id: 5,
    content: "Very balanced reporting on this topic.",
    author: "Charlie Wilson",
    articleTitle: "Political Developments in Europe",
    status: "Approved",
    createdAt: "2023-07-10 16:05",
  },
]

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState<any>(null)

  const filteredComments = comments.filter(
    (comment) =>
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.articleTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleView = (comment: any) => {
    setSelectedComment(comment)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (comment: any) => {
    setSelectedComment(comment)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (comment: any) => {
    setSelectedComment(comment)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Comments</h1>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search comments..."
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
              <TableHead>Content</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Article</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell className="font-medium max-w-xs truncate">{comment.content}</TableCell>
                <TableCell>{comment.author}</TableCell>
                <TableCell className="max-w-xs truncate">{comment.articleTitle}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      comment.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : comment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {comment.status}
                  </div>
                </TableCell>
                <TableCell>{comment.createdAt}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleView(comment)}>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(comment)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(comment)} className="text-red-600">
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
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* View Comment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>View Comment</DialogTitle>
          </DialogHeader>
          {selectedComment && (
            <div className="py-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Comment</h3>
                <p className="mt-1">{selectedComment.content}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Author</h3>
                  <p className="mt-1">{selectedComment.author}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div
                    className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedComment.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : selectedComment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedComment.status}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Article</h3>
                  <p className="mt-1">{selectedComment.articleTitle}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="mt-1">{selectedComment.createdAt}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Comment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>Make changes to the comment. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedComment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-content" className="text-right pt-2">
                  Content
                </Label>
                <Textarea id="edit-content" defaultValue={selectedComment.content} className="col-span-3" rows={4} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={selectedComment.status.toLowerCase()}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Comment Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedComment && (
            <div className="py-4">
              <p>
                <strong>Author:</strong> {selectedComment.author}
              </p>
              <p>
                <strong>Content:</strong> {selectedComment.content}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

