import { del, get, patch, post } from "@/util/request";

const api: string = "news/";

export const getNewsForAdminPage = async (limit?:any, offset?: any, author_id?: any): Promise<any[]> => {
    let path: string = api;
    console.log("limit", limit)
    console.log("offset", offset)
    console.log("author_id", author_id)

    if (limit && author_id) {
        path = `${api}?limit=${limit}&offset=${offset}&author_id=${author_id}`;
    } else if (author_id) {
        console.log("author_id", author_id)
        path = `${api}?author_id=${author_id}`;
    }
    const response: any = await get(path);
    return limit || author_id ? response.data.results : response.data;
};

export const getNewsByCategoryId = async (categoryId: any) : Promise<any[]> => {
    const path: string = `${api}?category=${categoryId}`;
    const response: any = await get(path);
    return response.data;
};

export const searchNewsByTitle = async (title: string, author_id: any): Promise<any[]> => {
    const path: string = `${api}?search=${title}&author_id=${author_id}`;
    const response: any = await get(path);
    return response.data;
};

export const getNewsDetail = async (id: number): Promise<any> => {
    const path: string = `${api}${id}/`;
    const response: any = await get(path);
    return response;
};


export const addNews = async (news: any): Promise<any> => {
    const path: string = `${api}`;
    const response: any = await post(path, news);
    return response;
};

export const updateNews = async (news: any): Promise<any> => {
    const path: string = `${api}${news.id}/`;
    const response: any = await patch(path, news);
    return response;
};

export const deleteNews = async (id: any): Promise<any> => {
    const path: string = `${api}${id}/`;
    const response: any = await del(path);
    console.log("response", response);
    return response;
};