"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ImageIcon, LinkIcon, Save, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Sample categories
const categories = [
  "Technology",
  "Business",
  "Sports",
  "Entertainment",
  "Politics",
  "Health",
  "Science",
  "Education",
  "Lifestyle",
  "Arts",
  "Finance",
]

// Sample posts data
const posts = [
  {
    id: "1",
    title: "10 Tips for Better Productivity",
    excerpt: "Learn how to maximize your productivity with these proven strategies.",
    content:
      "# 10 Tips for Better Productivity\n\nProductivity is essential in today's fast-paced world. Here are 10 tips to help you maximize your efficiency and get more done in less time.\n\n## 1. Prioritize Your Tasks\nNot all tasks are created equal. Identify the most important tasks and tackle them first.\n\n## 2. Use the Pomodoro Technique\nWork in focused 25-minute intervals, followed by 5-minute breaks.\n\n## 3. Eliminate Distractions\nTurn off notifications and create a dedicated workspace.\n\n## 4. Set Clear Goals\nKnow exactly what you want to accomplish each day.\n\n## 5. Take Regular Breaks\nRegular breaks help maintain focus and prevent burnout.\n\n## 6. Use Task Management Tools\nTools like Trello, Asana, or Todoist can help you stay organized.\n\n## 7. Learn to Say No\nDon't overcommit yourself. It's okay to decline requests that don't align with your priorities.\n\n## 8. Batch Similar Tasks\nGroup similar tasks together to minimize context switching.\n\n## 9. Optimize Your Environment\nEnsure your workspace is comfortable and conducive to productivity.\n\n## 10. Reflect and Adjust\nRegularly review your productivity system and make adjustments as needed.",
    category: "Lifestyle",
    tags: "productivity, time management, efficiency, work, focus",
    status: "Published",
    publishedAt: "2023-07-15",
    featuredImage: "/placeholder.svg?height=400&width=600",
    metaTitle: "10 Proven Tips to Boost Your Productivity",
    metaDescription:
      "Discover 10 effective strategies to enhance your productivity, manage time better, and achieve more in your personal and professional life.",
  },
  {
    id: "2",
    title: "Understanding Modern Web Development",
    excerpt: "A comprehensive guide to the latest web development technologies and practices.",
    content:
      "# Understanding Modern Web Development\n\nWeb development has evolved significantly over the past decade. This article explores the current landscape of modern web development.\n\n## Frontend Frameworks\nFrameworks like React, Vue, and Angular have revolutionized how we build user interfaces.\n\n## Backend Technologies\nNode.js, Django, Ruby on Rails, and other backend technologies provide robust solutions for server-side development.\n\n## Full-Stack Development\nThe line between frontend and backend is increasingly blurred, with many developers now working across the entire stack.\n\n## DevOps and Deployment\nContinuous integration, continuous deployment, and containerization have transformed how we deploy and manage web applications.\n\n## Performance Optimization\nTechniques like code splitting, lazy loading, and server-side rendering help create faster, more responsive web applications.\n\n## Accessibility\nEnsuring web applications are accessible to all users is now a fundamental aspect of web development.\n\n## Security\nProtecting user data and preventing vulnerabilities is more important than ever in modern web development.",
    category: "Technology",
    tags: "web development, programming, technology, coding, frontend, backend",
    status: "Draft",
    publishedAt: null,
    featuredImage: "/placeholder.svg?height=400&width=600",
    metaTitle: "Modern Web Development: A Comprehensive Guide",
    metaDescription:
      "Explore the latest technologies, frameworks, and best practices in modern web development for building robust and scalable applications.",
  },
]

export default function EditPostContentPage({
  id,
}: {
  id: string
}) {
  const router = useRouter()

  const [post, setPost] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [currentImage, setCurrentImage] = useState("")
  const [status, setStatus] = useState("draft")
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the post from your API
    const fetchPost = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        const foundPost = posts.find((p) => p.id == id)

        if (foundPost) {
          setPost(foundPost)
          setTitle(foundPost.title)
          setContent(foundPost.content)
          setExcerpt(foundPost.excerpt)
          setCategory(foundPost.category.toLowerCase())
          setTags(foundPost.tags)
          setCurrentImage(foundPost.featuredImage)
          setStatus(foundPost.status.toLowerCase())
          setMetaTitle(foundPost.metaTitle)
          setMetaDescription(foundPost.metaDescription)
        } else {
          // Post not found
          toast({
            title: "Post not found",
            description: "The post you're trying to edit doesn't exist.",
            variant: "destructive",
          })
          router.push("/user/posts")
        }
      } catch (error) {
        console.error("Error fetching post:", error)
        toast({
          title: "Error",
          description: "Failed to load post data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // In a real app, you would update the post via API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      toast({
        title: "Post updated",
        description: "Your post has been updated successfully.",
      })

      // Redirect to posts page
      router.push("/user/posts")
    } catch (error) {
      console.error("Error updating post:", error)
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading post data...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Toaster />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/user/posts">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold gradient-text">Edit Post</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setStatus("draft")}
            disabled={isSaving}
            className="border-brand-blue text-brand-blue hover:bg-brand-blue/10"
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => setStatus("published")}
            disabled={isSaving}
            className="bg-gradient-to-r from-brand-blue to-brand-purple text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Publish"
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-t-4 border-t-brand-blue shadow-lg animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-brand-blue/10 to-transparent">
              <CardTitle>Post Content</CardTitle>
              <CardDescription>Edit your post content here</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-brand-blue font-medium">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border-brand-blue/20 focus-visible:ring-brand-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-brand-purple font-medium">
                    Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief summary of your post"
                    rows={3}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="border-brand-purple/20 focus-visible:ring-brand-purple"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-brand-pink font-medium">
                    Content
                  </Label>
                  <Tabs defaultValue="write">
                    <TabsList className="mb-2 bg-muted/50">
                      <TabsTrigger
                        value="write"
                        className="data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                      >
                        Write
                      </TabsTrigger>
                      <TabsTrigger
                        value="preview"
                        className="data-[state=active]:bg-brand-green data-[state=active]:text-white"
                      >
                        Preview
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="write">
                      <div className="border rounded-md">
                        <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-brand-blue hover:text-brand-blue hover:bg-brand-blue/10"
                          >
                            <ImageIcon className="h-4 w-4" />
                            <span className="sr-only">Add image</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-brand-purple hover:text-brand-purple hover:bg-brand-purple/10"
                          >
                            <LinkIcon className="h-4 w-4" />
                            <span className="sr-only">Add link</span>
                          </Button>
                        </div>
                        <Textarea
                          id="content"
                          placeholder="Write your post content here..."
                          className="min-h-[300px] border-0 focus-visible:ring-0"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="preview">
                      <div className="border rounded-md p-4 min-h-[300px] prose max-w-none">
                        {content ? (
                          <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }} />
                        ) : (
                          <p className="text-muted-foreground">Nothing to preview</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card
            className="mb-6 border-t-4 border-t-brand-purple shadow-lg animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="bg-gradient-to-r from-brand-purple/10 to-transparent">
              <CardTitle>Post Settings</CardTitle>
              <CardDescription>Configure your post settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-brand-purple font-medium">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-brand-purple/20 focus:ring-brand-purple">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-brand-pink font-medium">
                  Tags
                </Label>
                <Input
                  id="tags"
                  placeholder="Enter tags separated by commas"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="border-brand-pink/20 focus-visible:ring-brand-pink"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured-image" className="text-brand-blue font-medium">
                  Featured Image
                </Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center border-brand-blue/30 hover:border-brand-blue/50 transition-colors">
                  {currentImage && (
                    <div className="mb-4">
                      <img
                        src={currentImage || "/placeholder.svg"}
                        alt="Current featured image"
                        className="mx-auto h-40 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <ImageIcon className="h-8 w-8 mx-auto text-brand-blue/50" />
                  <p className="mt-2 text-sm text-muted-foreground">Drag and drop an image, or click to browse</p>
                  <Input
                    id="featured-image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFeaturedImage(e.target.files[0])
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    className="mt-4 border-brand-blue text-brand-blue hover:bg-brand-blue/10"
                    onClick={() => document.getElementById("featured-image")?.click()}
                  >
                    {currentImage ? "Change Image" : "Select Image"}
                  </Button>
                  {featuredImage && <p className="mt-2 text-sm">Selected: {featuredImage.name}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-brand-green font-medium">
                  Status
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="border-brand-green/20 focus:ring-brand-green">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-brand-purple to-brand-pink text-white"
                onClick={handleSubmit}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

        </div>
      </div>
    </div>
  )
}

