"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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

export default function BlogPostPageContent({ post, comments, relatedPosts }: { post: any, comments: any, relatedPosts: any }) {
  const [activeReaction, setActiveReaction] = useState<string | null>(null)
  const [commentText, setCommentText] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const handleReaction = (type: string) => {
    setActiveReaction(activeReaction === type ? null : type)
  }

  const handleComment = () => {
    if (commentText.trim()) {
      // In a real app, you would send this to your API
      console.log("New comment:", commentText)
      setCommentText("")
    }
  }

  const handleReply = (commentId: number) => {
    if (replyText.trim()) {
      // In a real app, you would send this to your API
      console.log("New reply to comment", commentId, ":", replyText)
      setReplyText("")
      setReplyingTo(null)
    }
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/articles" className="hover:text-primary">
                Articles
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/tags/${post.category}`} className="hover:text-primary">
                {post.category_name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{post.title}</span>
            </div>

            {/* Post Header */}
            <div className="mb-8 animate-fade-in">
              <Badge className={`mb-4 category-badge-${post.category}`}>{post.category_name}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-brand-blue" />
                  <span>{post.publishedAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-purple" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-brand-pink" />
                  <span>{post.comment_count} comments</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 ring-2 ring-brand-blue/20">
                  <AvatarImage src={post.author_avatar} alt='img' />
                  <AvatarFallback>{post.author_name}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author_name}</div>
                  <div className="text-sm text-muted-foreground">Author</div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden shadow-xl animate-scale-in">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>


            {/* Post Content */}
            <div
              className="prose prose-lg max-w-none mb-8 animate-fade-in"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share & Reactions */}
            <div
              className="flex flex-wrap justify-between items-center mb-8 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90 border-none"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90 border-none"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90 border-none"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button
                  variant={activeReaction === "like" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleReaction("like")}
                  className={activeReaction === "like" ? "bg-brand-blue text-white" : ""}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like
                </Button>
                <Button
                  variant={activeReaction === "love" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleReaction("love")}
                  className={activeReaction === "love" ? "bg-brand-red text-white" : ""}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Love
                </Button>
                <Button
                  variant={activeReaction === "wow" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleReaction("wow")}
                  className={activeReaction === "wow" ? "bg-brand-yellow text-white" : ""}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Wow
                </Button>
                <Button
                  variant={activeReaction === "happy" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleReaction("happy")}
                  className={activeReaction === "happy" ? "bg-brand-green text-white" : ""}
                >
                  <Smile className="h-4 w-4 mr-2" />
                  Happy
                </Button>
                <Button
                  variant={activeReaction === "sad" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleReaction("sad")}
                  className={activeReaction === "sad" ? "bg-brand-purple text-white" : ""}
                >
                  <Frown className="h-4 w-4 mr-2" />
                  Sad
                </Button>
              </div>
            </div>
            {/* Comments Section */}
            <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-2xl font-bold mb-6 gradient-text">Comments ({comments.length})</h3>

              {/* Comment Form */}
              <Card className="mb-6 border-t-4 border-t-brand-blue">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="Your Avatar" />
                      <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Write a comment..."
                        className="mb-4 resize-none border-brand-blue/20 focus-visible:ring-brand-blue"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={handleComment}
                          className="bg-gradient-to-r from-brand-blue to-brand-purple text-white"
                        >
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow animate-scale-in"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={comment.user.image} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{comment.user.name}</div>
                          <div className="text-sm text-muted-foreground">{comment.date}</div>
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
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="mb-4">{comment.content}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-brand-blue hover:bg-brand-blue/10"
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {comment.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-brand-purple hover:bg-brand-purple/10"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <div className="flex gap-3 mb-4 pl-10 animate-slide-in">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt="Your Avatar" />
                          <AvatarFallback>YA</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder={`Reply to ${comment.user.name}...`}
                            className="mb-2 resize-none text-sm border-brand-purple/20 focus-visible:ring-brand-purple"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleReply(comment.id)}
                              className="bg-brand-purple text-white hover:bg-brand-purple/90"
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="pl-10 space-y-4 mt-4">
                        {comment.replies.map((reply: any) => (
                          <div key={reply.id} className="border-l-2 pl-4 border-brand-blue/30 animate-fade-in">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={reply.user.image} alt={reply.user.name} />
                                  <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{reply.user.name}</div>
                                  <div className="text-xs text-muted-foreground">{reply.date}</div>
                                </div>
                              </div>
                            </div>
                            <p className="mb-2 text-sm">{reply.content}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground text-xs hover:text-brand-blue hover:bg-brand-blue/10"
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {reply.likes}
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

