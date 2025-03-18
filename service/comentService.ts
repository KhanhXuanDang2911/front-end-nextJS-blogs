export const getCommentForAdminPage = async (): Promise<any[]> => {

    // Sample data
    const comments = [
        {
            id: 1,
            content: "hello , very informative!",
            author: "John Doe",
            articleTitle: "New Technology Breakthrough",
            status: "Approved",
            createdAt: "2023-06-18 14:30",
        },
        {
            id: 2,
            content: "I disagree with some points in this article.",
            author: "Jane Smith",
            articleTitle: "Global Economic Summit Results",
            status: "Approved",
            createdAt: "2023-06-22 09:15",
        },
        {
            id: 3,
            content: "This is spam content that should be removed.",
            author: "Unknown User",
            articleTitle: "Sports Championship Finals",
            status: "Spam",
            createdAt: "2023-06-25 18:45",
        },
        {
            id: 4,
            content: "Looking forward to more articles like this!",
            author: "Alice Brown",
            articleTitle: "New Entertainment Series Launch",
            status: "Pending",
            createdAt: "2023-07-08 11:20",
        },
        {
            id: 5,
            content: "Very balanced reporting on this topic.",
            author: "Charlie Wilson",
            articleTitle: "Political Developments in Europe",
            status: "Approved",
            createdAt: "2023-07-10 16:05",
        },
    ]
    return comments

}