export const getnewsForAdminPage = async (): Promise<any[]> => {
    const news = [
        {
          id: 1,
          title: "New Technology Breakthrough",
          category: "Technology",
          author: "John Doe",
          status: "Published",
          publishedAt: "2023-06-15",
          views: 1245,
        },
        {
          id: 2,
          title: "Global Economic Summit Results",
          category: "Business",
          author: "Jane Smith",
          status: "Published",
          publishedAt: "2023-06-20",
          views: 980,
        },
        {
          id: 3,
          title: "Sports Championship Finals",
          category: "Sports",
          author: "Bob Johnson",
          status: "Draft",
          publishedAt: null,
          views: 0,
        },
        {
          id: 4,
          title: "New Entertainment Series Launch",
          category: "Entertainment",
          author: "Alice Brown",
          status: "Published",
          publishedAt: "2023-07-05",
          views: 2340,
        },
        {
          id: 5,
          title: "Political Developments in Europe",
          category: "Politics",
          author: "Charlie Wilson",
          status: "Under Review",
          publishedAt: null,
          views: 0,
        },
      ]
      return news
}
