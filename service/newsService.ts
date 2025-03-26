import { del, get, patch, post } from "@/util/request";

const api: string = "news/";

// Lấy danh sách tin tức cho trang admin
export const getNewsForAdminPage = async (): Promise<any[]> => {
    const path: string = `${api}`;
    const response: any = await get(path);
    return response.data;
};

// Tìm kiếm tin tức theo tiêu đề
export const searchNewsByTitle = async (title: string): Promise<any[]> => {
    const path: string = `${api}?search=${title}`;
    const response: any = await get(path);
    return response.data;
};

// Thêm tin tức mới
export const addNews = async (news: any): Promise<any> => {
    const path: string = `${api}`;
    const response: any = await post(path, news);
    return response;
};

// Cập nhật tin tức
export const updateNews = async (news: any): Promise<any> => {
    const path: string = `${api}${news.id}/`;
    const response: any = await patch(path, news);
    return response;
};

// Xóa tin tức
export const deleteNews = async (id: any): Promise<any> => {
    const path: string = `${api}${id}/`;
    const response: any = await del(path);
    console.log("response", response);
    return response;
};
