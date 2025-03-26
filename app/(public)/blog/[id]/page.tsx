import { getNewsDetail } from "@/service/newsService";
import BlogPostPageContent from "./page-content";
const comments = [
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
]
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
    console.log('post', post)
    return <>
        <BlogPostPageContent post={post.data} comments={comments} relatedPosts={relatedPosts}/>
    </>
}