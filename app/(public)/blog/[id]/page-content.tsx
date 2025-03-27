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
import CommentContent from "./comment"
import CommentSection from "./comment-section"

export default function BlogPostPageContent({ id, post, comments, relatedPosts }: { post: any, comments: any, relatedPosts: any, id: any }) {
  const [activeReaction, setActiveReaction] = useState<string | null>(null)

  const handleReaction = (type: string) => {
    setActiveReaction(activeReaction === type ? null : type)
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
            <CommentSection idBl={id} comments={comments} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

