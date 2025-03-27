import { del, get, post, patch } from "@/util/request";

const API_BASE: string = "comments/";

export const getAllComments = async (): Promise<any[]> => {
    try {
        const response: any = await get(API_BASE);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bình luận:", error);
        return [];
    }
};

export const getCommentsByNewsId = async (newsId:any): Promise<any[]> => {
    try {
        const response: any = await get(`${API_BASE}?search=${newsId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bình luận:", error);
        return [];
    }
};

export const searchComments = async (content: string): Promise<any[]> => {
    try {
        const response: any = await get(`${API_BASE}?search=${content}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi tìm kiếm bình luận với nội dung "${content}":`, error);
        return [];
    }
};

export const addComment = async (comment: any): Promise<any> => {
    try {
        const response: any = await post(API_BASE, comment);
        return response;
    } catch (error) {
        console.error("Lỗi khi thêm bình luận:", error);
        return null;
    }
};

export const updateComment = async (comment: any): Promise<any> => {
    try {
        const response: any = await patch(`${API_BASE}${comment.id}/`, comment);
        return response;
    } catch (error) {
        console.error(`Lỗi khi cập nhật bình luận ID ${comment.id}:`, error);
        return null;
    }
};