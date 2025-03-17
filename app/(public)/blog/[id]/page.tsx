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

// Sample blog post data
const posts = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence in Healthcare",
    content: `
      <p>Artificial intelligence (AI) is revolutionizing healthcare in ways we could only imagine a decade ago. From improving diagnostic accuracy to personalizing treatment plans, AI technologies are transforming how medical professionals deliver care and how patients experience it.</p>
      
      <p>One of the most promising applications of AI in healthcare is in medical imaging. AI algorithms can now analyze radiological images with remarkable precision, often detecting subtle abnormalities that might be missed by the human eye. This capability is particularly valuable in early cancer detection, where timely diagnosis can significantly improve patient outcomes.</p>
      
      <p>Beyond diagnostics, AI is also making strides in treatment planning. By analyzing vast amounts of patient data, AI systems can help physicians develop personalized treatment strategies that consider a patient's unique genetic makeup, medical history, and lifestyle factors. This approach, often referred to as precision medicine, represents a shift away from the traditional one-size-fits-all model of healthcare.</p>
      
      <p>In the realm of patient care, AI-powered chatbots and virtual assistants are improving access to medical information and support. These tools can answer basic health questions, remind patients to take medications, and even monitor chronic conditions through regular check-ins. For patients in remote or underserved areas, such technologies can provide crucial support between doctor visits.</p>
      
      <p>Despite these advancements, the integration of AI into healthcare is not without challenges. Issues related to data privacy, algorithmic bias, and the need for regulatory frameworks remain significant concerns. Additionally, there's the question of how AI will affect the doctor-patient relationship, which has traditionally been at the heart of medical care.</p>
      
      <p>As we look to the future, it's clear that AI will continue to play an increasingly important role in healthcare. The key will be finding the right balance—leveraging AI's capabilities while preserving the human elements of care that are essential to healing. With thoughtful implementation, AI has the potential to make healthcare more accurate, accessible, and personalized than ever before.</p>
    `,
    category: "Technology",
    tags: ["AI", "Healthcare", "Technology", "Medicine", "Future"],
    author: {
      name: "Dr. Jane Smith",
      image: "/placeholder.svg",
      bio: "Dr. Jane Smith is a healthcare technology researcher with over 15 years of experience in the field of medical informatics.",
      authorId: "jane-smith",
    },
    publishedAt: "July 15, 2023",
    readTime: "8 min read",
    image: "/placeholder.svg?height=600&width=1200",
    comments: [
      {
        id: 1,
        user: {
          name: "Michael Johnson",
          image: "/placeholder.svg",
        },
        content:
          "This is a fascinating article! I'm curious about how AI might address healthcare disparities in underserved communities.",
        date: "July 16, 2023",
        likes: 12,
        replies: [
          {
            id: 101,
            user: {
              name: "Dr. Jane Smith",
              image: "/placeholder.svg",
            },
            content:
              "Great question, Michael! AI has the potential to improve access to quality healthcare in underserved areas through telemedicine and remote monitoring tools.",
            date: "July 16, 2023",
            likes: 8,
          },
        ],
      },
      {
        id: 2,
        user: {
          name: "Sarah Williams",
          image: "/placeholder.svg",
        },
        content:
          "As someone working in healthcare, I've seen firsthand how AI tools are changing our workflow. There's definitely a learning curve, but the benefits for patient care are substantial.",
        date: "July 17, 2023",
        likes: 15,
        replies: [],
      },
      {
        id: 3,
        user: {
          name: "Robert Chen",
          image: "/placeholder.svg",
        },
        content:
          "I wonder about the ethical implications of AI in healthcare decision-making. Who's responsible if an AI system makes a mistake in diagnosis?",
        date: "July 18, 2023",
        likes: 7,
        replies: [],
      },
    ],
    relatedPosts: [
      {
        id: 2,
        title: "Ethical Considerations in Medical AI",
        category: "Technology",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        title: "How Telemedicine is Changing Patient Care",
        category: "Healthcare",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 4,
        title: "The Role of Big Data in Modern Medicine",
        category: "Technology",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    id: 2,
    title: "Global Economic Trends to Watch in 2023",
    content: `
      <p>The global economy is constantly evolving, shaped by a complex interplay of factors including technological innovation, geopolitical developments, and changing consumer behaviors. As we navigate through 2023, several key economic trends are emerging that will likely define the financial landscape for years to come.</p>
      
      <p>First and foremost, the ongoing digital transformation continues to reshape industries across the board. Companies that have successfully adapted to the digital age are thriving, while those that have resisted change are increasingly finding themselves at a competitive disadvantage. This digital divide is expected to widen further in 2023, creating both challenges and opportunities for businesses and investors alike.</p>
      
      <p>Another significant trend is the growing emphasis on sustainable and responsible investing. Environmental, Social, and Governance (ESG) factors are no longer considered niche concerns but are increasingly mainstream considerations in investment decisions. This shift reflects a broader societal recognition of the urgent need to address climate change and social inequalities.</p>
      
      <p>The global supply chain, which faced unprecedented disruptions during the COVID-19 pandemic, continues to undergo significant restructuring. Many companies are moving away from the just-in-time inventory model that dominated in recent decades, instead prioritizing resilience and redundancy in their supply chains. This shift may lead to higher costs in the short term but promises greater stability in the face of future disruptions.</p>
      
      <p>Inflation remains a concern in many economies, driven by a combination of supply chain issues, labor shortages, and expansionary monetary policies implemented during the pandemic. Central banks around the world are navigating the delicate balance of controlling inflation without stifling economic growth, a challenge that will likely persist throughout 2023.</p>
      
      <p>The labor market continues to evolve, with remote and hybrid work arrangements becoming permanent fixtures in many industries. This shift has far-reaching implications for commercial real estate, urban planning, and workforce management strategies. Companies that can effectively adapt to these new work paradigms will have a significant advantage in attracting and retaining talent.</p>
      
      <p>Finally, geopolitical tensions and regulatory changes are creating a more complex and fragmented global economic landscape. Businesses must navigate an increasingly intricate web of regulations and trade policies, requiring greater agility and local market knowledge.</p>
      
      <p>As we move further into 2023, these trends will continue to shape the global economy, creating both challenges and opportunities. Successful navigation of this landscape will require careful analysis, strategic foresight, and the flexibility to adapt to rapidly changing circumstances.</p>
    `,
    category: "Business",
    tags: ["Economics", "Global", "Finance", "Markets", "Trends"],
    author: {
      name: "Michael Johnson",
      image: "/placeholder.svg",
      bio: "Michael Johnson is a senior economic analyst with expertise in global market trends and financial forecasting.",
      authorId: "michael-johnson",
    },
    publishedAt: "July 12, 2023",
    readTime: "6 min read",
    image: "/placeholder.svg?height=600&width=1200",
    comments: [
      {
        id: 1,
        user: {
          name: "Emily Rodriguez",
          image: "/placeholder.svg",
        },
        content:
          "This analysis is spot on. I'm particularly concerned about the inflation trends and how they might affect emerging markets.",
        date: "July 13, 2023",
        likes: 9,
        replies: [],
      },
      {
        id: 2,
        user: {
          name: "David Wilson",
          image: "/placeholder.svg",
        },
        content:
          "Great overview of the current economic landscape. I'd be interested in hearing more about how small businesses can adapt to these trends.",
        date: "July 14, 2023",
        likes: 11,
        replies: [],
      },
    ],
    relatedPosts: [
      {
        id: 5,
        title: "Understanding the Housing Market Shift",
        category: "Business",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 6,
        title: "The Impact of Rising Interest Rates",
        category: "Finance",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 7,
        title: "Global Supply Chain Challenges",
        category: "Business",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null)
  const [activeReaction, setActiveReaction] = useState<string | null>(null)
  const [commentText, setCommentText] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the post from your API
    const fetchPost = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        const postId = Number.parseInt(params.id)
        const foundPost = posts.find((p) => p.id === postId)

        if (foundPost) {
          setPost(foundPost)
        } else {
          // Handle post not found
          console.error("Post not found")
        }
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

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

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
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
              <Link href="/blog" className="hover:text-primary">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/category/${post.category.toLowerCase()}`} className="hover:text-primary">
                {post.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{post.title}</span>
            </div>

            {/* Post Header */}
            <div className="mb-8 animate-fade-in">
              <Badge className={`mb-4 category-badge-${post.category.toLowerCase()}`}>{post.category}</Badge>
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
                  <span>{post.comments.length} comments</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 ring-2 ring-brand-blue/20">
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">Author</div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden shadow-xl animate-scale-in">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8 animate-slide-in">
              {post.tags.map((tag: string) => (
                <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
                  <Badge
                    variant="outline"
                    className="hover:bg-accent transition-colors flex items-center gap-1 border-brand-blue/30"
                  >
                    <TagIcon className="h-3 w-3 text-brand-blue" />
                    {tag}
                  </Badge>
                </Link>
              ))}
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

            <Separator className="my-8" />

            {/* Author Bio */}
            <div
              className="bg-gradient-to-r from-muted/50 to-background p-6 rounded-lg mb-8 shadow-md animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 ring-4 ring-brand-blue/20">
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-brand-blue">About {post.author.name}</h3>
                  <p className="text-muted-foreground mb-4">{post.author.bio}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-brand-blue text-brand-blue hover:bg-brand-blue/10"
                    asChild
                  >
                    <Link href={`/author/${post.author.authorId}`}>View All Posts</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-2xl font-bold mb-6 gradient-text">Comments ({post.comments.length})</h3>

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
                {post.comments.map((comment: any) => (
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

            {/* Related Posts */}
            <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <h3 className="text-2xl font-bold mb-6 gradient-text">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {post.relatedPosts.map((relatedPost: any) => (
                  <Card key={relatedPost.id} className="overflow-hidden card-hover-effect">
                    <div className="relative h-40">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <Badge className={`absolute top-2 left-2 category-badge-${relatedPost.category.toLowerCase()}`}>
                        {relatedPost.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
                        <Link href={`/blog/${relatedPost.id}`}>{relatedPost.title}</Link>
                      </h4>
                    </CardContent>
                  </Card>
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

