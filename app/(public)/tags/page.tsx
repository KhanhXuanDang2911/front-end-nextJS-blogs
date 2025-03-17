import Link from "next/link"

// Sample tags data
const tags = [
  { name: "Technology", count: 42 },
  { name: "Business", count: 28 },
  { name: "Sports", count: 19 },
  { name: "Entertainment", count: 31 },
  { name: "Politics", count: 15 },
  { name: "Health", count: 24 },
  { name: "Science", count: 18 },
  { name: "Education", count: 12 },
  { name: "Travel", count: 22 },
  { name: "Food", count: 17 },
  { name: "Fashion", count: 14 },
  { name: "Art", count: 9 },
  { name: "Music", count: 21 },
  { name: "Books", count: 16 },
  { name: "Movies", count: 25 },
  { name: "Gaming", count: 20 },
]

export default function TagsPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold">Browse by Tags</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">Explore our content by topics and categories</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tags.map((tag) => (
          <Link key={tag.name} href={`/tag/${tag.name.toLowerCase()}`} className="group">
            <div className="border rounded-lg p-4 text-center transition-colors hover:bg-primary hover:text-primary-foreground">
              <h3 className="font-medium">{tag.name}</h3>
              <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                {tag.count} articles
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

