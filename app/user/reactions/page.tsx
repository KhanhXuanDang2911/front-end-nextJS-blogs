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
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Search,
  ThumbsDown,
  ThumbsUp,
  Heart,
  Laugh,
  Angry,
} from "lucide-react"

// Sample data
const reactions = [
  {
    id: 1,
    type: "Like",
    user: "John Doe",
    articleTitle: "New Technology Breakthrough",
    createdAt: "2023-06-18 14:30",
  },
  {
    id: 2,
    type: "Love",
    user: "Jane Smith",
    articleTitle: "Global Economic Summit Results",
    createdAt: "2023-06-22 09:15",
  },
  {
    id: 3,
    type: "Dislike",
    user: "Bob Johnson",
    articleTitle: "Sports Championship Finals",
    createdAt: "2023-06-25 18:45",
  },
  {
    id: 4,
    type: "Laugh",
    user: "Alice Brown",
    articleTitle: "New Entertainment Series Launch",
    createdAt: "2023-07-08 11:20",
  },
  {
    id: 5,
    type: "Angry",
    user: "Charlie Wilson",
    articleTitle: "Political Developments in Europe",
    createdAt: "2023-07-10 16:05",
  },
]

// Reaction types with icons
const reactionTypes = [
  { name: "Like", icon: ThumbsUp, color: "text-blue-500" },
  { name: "Love", icon: Heart, color: "text-red-500" },
  { name: "Dislike", icon: ThumbsDown, color: "text-gray-500" },
  { name: "Laugh", icon: Laugh, color: "text-yellow-500" },
  { name: "Angry", icon: Angry, color: "text-orange-500" },
]

export default function ReactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedReaction, setSelectedReaction] = useState<any>(null)

  const filteredReactions = reactions.filter(
    (reaction) =>
      reaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reaction.articleTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (reaction: any) => {
    setSelectedReaction(reaction)
    setIsDeleteDialogOpen(true)
  }

  const getReactionIcon = (type: string) => {
    const reaction = reactionTypes.find((r) => r.name === type)
    if (!reaction) return null

    const Icon = reaction.icon
    return <Icon className={`h-5 w-5 ${reaction.color}`} />
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reactions</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Reaction
        </Button>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reactions..."
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
              <TableHead>Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Article</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReactions.map((reaction) => (
              <TableRow key={reaction.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getReactionIcon(reaction.type)}
                    <span>{reaction.type}</span>
                  </div>
                </TableCell>
                <TableCell>{reaction.user}</TableCell>
                <TableCell className="max-w-xs truncate">{reaction.articleTitle}</TableCell>
                <TableCell>{reaction.createdAt}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleDelete(reaction)} className="text-red-600">
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

      {/* Create Reaction Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Reaction</DialogTitle>
            <DialogDescription>Create a new reaction for an article. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user" className="text-right">
                User
              </Label>
              <Input id="user" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="article" className="text-right">
                Article
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select article" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">New Technology Breakthrough</SelectItem>
                  <SelectItem value="economy">Global Economic Summit Results</SelectItem>
                  <SelectItem value="sports">Sports Championship Finals</SelectItem>
                  <SelectItem value="entertainment">New Entertainment Series Launch</SelectItem>
                  <SelectItem value="politics">Political Developments in Europe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select reaction type" />
                </SelectTrigger>
                <SelectContent>
                  {reactionTypes.map((type) => (
                    <SelectItem key={type.name} value={type.name.toLowerCase()}>
                      <div className="flex items-center gap-2">
                        <type.icon className={`h-4 w-4 ${type.color}`} />
                        <span>{type.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Reaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Reaction Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this reaction? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedReaction && (
            <div className="py-4">
              <p>
                <strong>User:</strong> {selectedReaction.user}
              </p>
              <p>
                <strong>Type:</strong> {selectedReaction.type}
              </p>
              <p>
                <strong>Article:</strong> {selectedReaction.articleTitle}
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

