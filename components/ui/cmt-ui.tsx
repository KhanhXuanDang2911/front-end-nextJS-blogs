import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Facebook,
    Twitter,
    Linkedin,
    Share2,
    Clock,
    Calendar,
    MessageSquare,
    MoreVertical,
    ThumbsUp,
    Heart,
    Smile,
    Frown,
    Zap,
    Loader2,
    TagIcon,
} from "lucide-react"
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import CommentTree from "@/app/(public)/blog/[id]/cmt-tree"
import { useState } from "react"

export default function CMT_UI({ id, childIds, comment, 
    parentId, handleSeemoreSubCmt, 
    commentsById, handleReply, handleDeleteCmt
}:
    {
        childIds: any[], comment: any, parentId: any, 
        handleSeemoreSubCmt: (parentId: any) => Promise<void>
        ,id: any, commentsById: any, handleReply: (commentId: number, replyText: string) => void, 
        handleDeleteCmt: (id: any, parentId: any) => void
    }) {
    const [replyText, setReplyText] = useState('')
    const [showRely, setShowRely] = useState(false)
    return (
        <>
            {commentsById[parentId].isShowSubCmt &&
                <div
                    key={comment.id}
                >
                    <div className={`${parentId == 0 ? 'p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow animate-scale-in' :
                        'mt-6 rounded-lg pt-4 border-l-2 pl-4 border-brand-blue/30 animate-fade-in'}`}>
                        <div className="flex justify-between items-start mb-4 ">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={comment.author_avatar} alt={comment.author_name} />
                                    <AvatarFallback>{comment.author_name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{comment.author_name}</div>
                                    <div className="text-sm text-muted-foreground">{comment.created_at}</div>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">More</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Report</DropdownMenuItem>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCmt(id, parentId)}>
                                        Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <p className="mb-4">{comment.content}</p>
                        <div className="flex items-center gap-4 mb-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-green-400 hover:bg-brand-blue/10"
                            >
                                <ThumbsUp className="h-4 w-4 mr-2" />
                                {/* {comment.likes} */}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-brand-purple hover:bg-brand-purple/10"
                                onClick={() => setShowRely(!showRely)}
                            >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Reply
                            </Button>
                            {comment.sub_comment_count > 0 && <Button
                                variant="ghost"
                                size="sm"
                                className={` text-muted-foreground hover:text-blue-500 hover:bg-brand-purple/10`}
                                onClick={() => handleSeemoreSubCmt(comment.id)}
                            >
                                <div className={`${commentsById[id].isShowSubCmt ? 'text-blue-600' : ''} flex flex-row gap-2`}>
                                    {commentsById[id].isShowSubCmt ? <UpOutlined /> : <DownOutlined />}
                                    See more {comment.sub_comment_count} replies
                                </div>

                            </Button>}
                        </div>
                        {/* Reply Form */}
                        {showRely && (
                            <div className="flex gap-3 mb-4 pl-10 animate-slide-in">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg" alt="Your Avatar" />
                                    <AvatarFallback>YA</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <Textarea
                                        placeholder={`Reply to ${comment.author_name}...`}
                                        className="mb-2 resize-none text-sm border-brand-purple/20 focus-visible:ring-brand-purple"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button size="sm" variant="outline" onClick={() => setShowRely(false)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                handleReply(comment.id, replyText)
                                                setReplyText('')
                                                setShowRely(false)
                                            }}
                                            className="bg-brand-purple text-white hover:bg-brand-purple/90"
                                        >
                                            Reply
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {childIds.length > 0 && (
                            <ol>
                                {childIds.map(childId => (
                                    <CommentTree key={childId}
                                        id={childId}
                                        parentId={id}
                                        commentsById={commentsById}
                                        handleSeemoreSubCmt={handleSeemoreSubCmt}
                                        handleReply={handleReply}
                                        handleDeleteCmt={handleDeleteCmt}
                                    />
                                ))}
                            </ol>
                        )}
                    </div>
                </div>
            }
        </>
    )
}