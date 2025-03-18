import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Tag, Hash, TrendingUp } from "lucide-react"

// Sample tags data with more information
const tags = [
  { name: "Technology", count: 42, trending: true, color: "bg-brand-blue" },
  { name: "Business", count: 28, trending: false, color: "bg-brand-green" },
  { name: "Sports", count: 19, trending: false, color: "bg-brand-orange" },
  { name: "Entertainment", count: 31, trending: true, color: "bg-brand-purple" },
  { name: "Politics", count: 15, trending: false, color: "bg-brand-red" },
  { name: "Health", count: 24, trending: true, color: "bg-brand-green" },
  { name: "Science", count: 18, trending: false, color: "bg-brand-blue" },
  { name: "Education", count: 12, trending: false, color: "bg-brand-yellow" },
  { name: "Travel", count: 22, trending: false, color: "bg-brand-purple" },
  { name: "Food", count: 17, trending: false, color: "bg-brand-orange" },
  { name: "Fashion", count: 14, trending: false, color: "bg-brand-pink" },
  { name: "Art", count: 9, trending: false, color: "bg-brand-blue" },
  { name: "Music", count: 21, trending: true, color: "bg-brand-purple" },
  { name: "Books", count: 16, trending: false, color: "bg-brand-green" },
  { name: "Movies", count: 25, trending: true, color: "bg-brand-red" },
  { name: "Gaming", count: 20, trending: false, color: "bg-brand-blue" },
  { name: "AI", count: 35, trending: true, color: "bg-brand-blue" },
  { name: "Blockchain", count: 18, trending: true, color: "bg-brand-purple" },
  { name: "Sustainability", count: 22, trending: true, color: "bg-brand-green" },
  { name: "Finance", count: 19, trending: false, color: "bg-brand-green" },
  { name: "Productivity", count: 15, trending: false, color: "bg-brand-blue" },
  { name: "Design", count: 24, trending: false, color: "bg-brand-pink" },
  { name: "Marketing", count: 17, trending: false, color: "bg-brand-orange" },
  { name: "Startups", count: 21, trending: true, color: "bg-brand-blue" },
]

export default function TagsPage() {
  // Sort tags by count (most popular first)
  const sortedTags = [...tags].sort((a, b) => b.count - a.count)

  // Get trending tags
  const trendingTags = tags.filter((tag) => tag.trending)

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 animated-bg text-white">
          <div className="container px-4 md:px-6 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-20 rounded-full mb-4 animate-bounce-in">
              <Hash className="h-6 w-6 mr-2" />
              <span className="text-lg font-medium">Browse by Tags</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Content by Topic</h1>
            <p className="max-w-[700px] mx-auto text-lg md:text-xl text-white/80">
              Explore our articles organized by topics and categories
            </p>
          </div>
        </section>

        {/* Trending Tags Section */}
        <section className="w-full py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-brand-red" />
              <h2 className="text-2xl font-bold">Trending Tags</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {trendingTags.map((tag) => (
                <Link key={tag.name} href={`/tag/${tag.name.toLowerCase()}`} className="animate-scale-in">
                  <div
                    className={`${tag.color} text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow`}
                  >
                    <Hash className="h-4 w-4" />
                    <span className="font-medium">{tag.name}</span>
                    <span className="bg-white bg-opacity-20 text-xs px-2 py-0.5 rounded-full">{tag.count}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Tags Section */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-6">
              <Tag className="h-6 w-6 text-brand-blue" />
              <h2 className="text-2xl font-bold">All Tags</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {sortedTags.map((tag, index) => (
                <Link
                  key={tag.name}
                  href={`/tag/${tag.name.toLowerCase()}`}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="border rounded-lg p-4 text-center transition-all hover:border-transparent hover:shadow-lg group-hover:scale-105 relative overflow-hidden">
                    <div
                      className={`absolute inset-0 ${tag.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                    ></div>
                    <h3 className="font-medium text-lg mb-1">{tag.name}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {tag.count} articles
                    </p>
                    {tag.trending && (
                      <div className="absolute top-2 right-2">
                        <TrendingUp className="h-4 w-4 text-brand-red" />
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}