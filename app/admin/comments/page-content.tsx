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
import { ChevronLeft, ChevronRight, Eye, MoreHorizontal, Search } from "lucide-react"
import { message } from "antd"
import { deleteComment, getAllComments } from "@/service/baseCommentService"

export default function CommentsPageContent({ comments }: { comments: any }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState<any>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const [cmts, setCmts] = useState<any[]>(comments);

  const handleDelete = (comment: any) => {
    setSelectedComment(comment)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteSubmit = async () => {
    try {
      const res = await deleteComment(selectedComment.id)
      if (res.status === 205) {
        messageApi.open({
          type: 'success',
          content: `Delete category ${res.id} successful`,
        });
        setIsDeleteDialogOpen(false)
        fetchCmts()
      }
      else if (res.status == 500) {
        messageApi.open({
          type: 'error',
          content: res.message,
        })
      }
    } catch (error) {
      console.log("Validation failed:", error);

      messageApi.open({
        type: 'error',
        content: error + "",
      })
    }
  }

  const fetchCmts = async () => {
    const res = await getAllComments()
    setCmts(res)
  }

  return (
    <div className="p-8">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Comments</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cmts.map((comment: any) => (
              <TableRow key={comment.id}>
                <TableCell className="font-medium max-w-xs truncate">{comment.content}</TableCell>
                <TableCell>{comment.user_name}</TableCell>

                <TableCell>{comment.created_at}</TableCell>
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

      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div> */}

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
                    className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedComment.status === "Approved"
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

      {/* Delete Comment Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            {/* <DialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
            </DialogDescription> */}
          </DialogHeader>
          {selectedComment && (
            // <div className="py-4">
            //   <p>
            //     <strong>Author:</strong> {selectedComment.author}
            //   </p>
            //   <p>
            //     <strong>Content:</strong> {selectedComment.content}
            //   </p>
            // </div>
            <h3 className="italic">Are you sure you want to delete this comment? This action cannot be undone.</h3>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDeleteSubmit()}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}