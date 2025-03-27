import { getNewsDetail } from "@/service/newsService";
import BlogPostPageContent from "./page-content";
import { getCommentsByNewsId } from "@/service/commentService";
const relatedPosts = [
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
]
export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const post = await getNewsDetail(Number(id))
    const comments = await getCommentsByNewsId(Number(id))
    return <>
        <BlogPostPageContent id={id} post={post.data} comments={comments} relatedPosts={relatedPosts}/>
    </>
}