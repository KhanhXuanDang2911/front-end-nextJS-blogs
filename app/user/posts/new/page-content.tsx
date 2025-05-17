"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Footer } from "@/components/footer"
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
import { addNews } from "@/service/newsService"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function NewPostContentPage({ categories }: { categories: any }) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [status, setStatus] = useState("draft")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Creating post:", {
        title,
        content,
        excerpt,
        category,
        featuredImage,
        status
      })

      // Lấy user data từ localStorage
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData.id;

      if (!userId) {
        toast({
          title: "Error",
          description: "User not found. Please login again.",
          variant: "destructive",
        });
        router.push("/signin");
        return;
      }

      const post: any = {
        title: title,
        content: content,
        excerpt: excerpt,
        category: category,
        author_id: userId,
        status: status,
        image: featuredImage
      };
      const formData = new FormData();
      Object.keys(post).forEach((key) => {
        formData.append(key, post[key]);
      });

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const res = await addNews(formData)
      if (res.status === 201) {
        toast({
          title: "Post created",
          description: "Your post has been created successfully.",
        })
        router.push("/user/posts")
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating post:", error)
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background">
        <div className="container py-8">
          <Toaster />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/user/posts">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="text-3xl font-bold gradient-text">Create New Post</h1>
            </div>
            <div className="flex gap-2">
              {/* <Button
                variant="outline"
                onClick={() => setStatus("draft")}
                disabled={isSubmitting}
                className="border-brand-blue text-brand-blue hover:bg-brand-blue/10"
              >
                Save as Draft
              </Button>
              <Button
                onClick={() => setStatus("published")}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-brand-blue to-brand-purple text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish"
                )}
              </Button> */}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-t-4 border-t-brand-blue shadow-lg animate-fade-in">
                <CardHeader className="bg-gradient-to-r from-brand-blue/10 to-transparent">
                  <CardTitle>Post Content</CardTitle>
                  <CardDescription>Write your post content here</CardDescription>
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
                            <CKEditor
                              editor={ClassicEditor}
                              data={content}
                              onChange={(event: any, editor: any) => {
                                const data = editor.getData();
                                setContent(data);
                              }}
                              config={{
                                toolbar: [
                                  'heading',
                                  '|',
                                  'bold',
                                  'italic',
                                  'link',
                                  'bulletedList',
                                  'numberedList',
                                  '|',
                                  'outdent',
                                  'indent',
                                  '|',
                                  'imageUpload',
                                  'blockQuote',
                                  'insertTable',
                                  'mediaEmbed',
                                  'undo',
                                  'redo'
                                ]
                              }}
                              onReady={(editor: any) => {
                                // Add custom styles to the editor container
                                const editorElement = editor.ui.getEditableElement();
                                const editorContainer = editorElement.parentElement;

                                editorContainer.style.minHeight = '300px';
                                editorContainer.style.border = 'none';
                                editorContainer.style.padding = '1rem';
                                editorContainer.style.backgroundColor = 'transparent';

                                // Style the toolbar
                                const toolbar = editor.ui.view.toolbar.element;
                                toolbar.style.border = 'none';
                                toolbar.style.backgroundColor = 'transparent';
                              }}
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
                        {categories.map((cat: any) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>



                  <div className="space-y-2">
                    <Label htmlFor="featured-image" className="text-brand-blue font-medium">
                      Featured Image
                    </Label>
                    <div className="border-2 border-dashed rounded-md p-6 text-center border-brand-blue/30 hover:border-brand-blue/50 transition-colors">
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
                        Select Image
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
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-pink text-white"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Post
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}