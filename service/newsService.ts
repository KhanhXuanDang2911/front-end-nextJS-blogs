import { del, get, patch, post } from "@/util/request";

const api: string = "news/";

export const getNewsForAdminPage = async (limit?:any, offset?: any): Promise<any[]> => {
    const path: string = limit ? `${api}?limit=${limit}&offset=${offset}` : `${api}`;
    const response: any = await get(path);
    return limit ? response.data.results : response.data;
};

export const getNewsByCategoryId = async (categoryId: any) : Promise<any[]> => {
    const path: string = `${api}?category=${categoryId}`;
    const response: any = await get(path);
    return response.data;
};

export const searchNewsByTitle = async (title: string): Promise<any[]> => {
    const path: string = `${api}?search=${title}`;
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