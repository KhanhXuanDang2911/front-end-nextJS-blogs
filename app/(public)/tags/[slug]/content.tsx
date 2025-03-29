"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, ThumbsUp, TagIcon } from "lucide-react"

export default function ContentOfTagPage({ tagName, taggedPosts }: { tagName: any, taggedPosts: any }) {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <section className="w-full py-12 md:py-16 lg:py-20 animated-bg text-white">
                    <div className="container px-4 md:px-6 text-center">
                        <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-20 rounded-full mb-4 animate-bounce-in">
                            <TagIcon className="h-6 w-6 mr-2" />
                            <span className="text-lg font-medium">Tag</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{tagName}</h1>
                        <p className="max-w-[700px] mx-auto text-lg md:text-xl text-white/80">
                            Explore all articles tagged with {tagName}
                        </p>
                    </div>
                </section>

                <section className="w-full py-12 md:py-16">
                    <div className="container px-4 md:px-6">
                        {taggedPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {taggedPosts.map((post: any, index: any) => (
                                    <Card
                                        key={post.id}
                                        className="overflow-hidden card-hover-effect animate-scale-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="aspect-video relative">
                                            <img
                                                src={post.image || "/placeholder.svg"}
                                                alt={post.title}
                                                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                                            />
                                            <Badge className={`absolute top-2 left-2 category-badge-${post.category_name}`}>
                                                {post.category_name}
                                            </Badge>
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold">
                                                    <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                                                        {post.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                                                {/* <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map((tag: string) => (
                          <Link href={`/tag/${tag.toLowerCase()}`} key={tag}>
                            <Badge variant="outline" className="hover:bg-secondary transition-colors">
                              #{tag}
                            </Badge>
                          </Link>
                        ))}
                      </div> */}
                                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {post.created_at}
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="flex items-center gap-1">
                                                            <MessageSquare className="h-4 w-4" />
                                                            {post.comment_count}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <ThumbsUp className="h-4 w-4" />
                                                            {post.reaction_count}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <h2 className="text-2xl font-bold mb-4">No posts found</h2>
                                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                    We couldn't find any articles tagged with "{tagName}". Try exploring other tags.
                                </p>
                                <Button asChild>
                                    <Link href="/tags">Browse All Tags</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

