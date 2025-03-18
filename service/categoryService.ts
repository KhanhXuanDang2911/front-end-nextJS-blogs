import { del, get, post, put } from "@/util/request";

const api: string = 'categories/'

export const getCategoryForAdminPage = async (): Promise<any[]> => {
    const path:string = `${api}`;
    const response:any = await get(path);
    return response.data;
    // const categories = [
    //     {
    //         id: 1,
    //         name: "Technology",
    //         slug: "technology",
    //         description: "Latest technology news and innovations",
    //         articleCount: 145,
    //         createdAt: "2023-01-10",
    //     },
    //     {
    //         id: 2,
    //         name: "Business",
    //         slug: "business",
    //         description: "Business news, market trends, and economic updates",
    //         articleCount: 98,
    //         createdAt: "2023-01-15",
    //     },
    //     {
    //         id: 3,
    //         name: "Sports",
    //         slug: "sports",
    //         description: "Sports news, results, and analysis",
    //         articleCount: 120,
    //         createdAt: "2023-01-20",
    //     },
    //     {
    //         id: 4,
    //         name: "Entertainment",
    //         slug: "entertainment",
    //         description: "Entertainment news, celebrity updates, and media coverage",
    //         articleCount: 87,
    //         createdAt: "2023-02-05",
    //     },
    //     {
    //         id: 5,
    //         name: "Politics",
    //         slug: "politics",
    //         description: "Political news, policy updates, and government affairs",
    //         articleCount: 110,
    //         createdAt: "2023-02-15",
    //     },
    // ]
    // return categories
}

export const searchCategoryByName = async(name:string):Promise<any[]> => {
    const path:string = `${api}?search=${name}`;
    const response:any = await get(path);
    return response.data;
}

export const getCategory = async():Promise<string[]> => {
    const categories = ["Technology", "Business", "Sports", "Entertainment", "Politics", "Health", "Science", "Education"]
    return categories
}

export const addCategery = async(category: string):Promise<any> => {
    const path:string = `${api}`
    const response:any = await post(path, category)
    return response
}

export const updateCategery = async(category: any):Promise<any> => {
    const path:string = `${api}${category.id}/`
    const response:any = await put(path, category)
    return response
}

export const deleteCategory = async(id: any):Promise<any> => {
    const path:string = `${api}${id}/`
    const response:any = await del(path)
    console.log("response", response)
    return response
}