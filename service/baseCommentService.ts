import { del, get, patch } from "@/util/request";

const API_BASE = 'base-comments/'

export const getAllComments = async (): Promise<any[]> => {
    try {
        const response: any = await get(API_BASE);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bình luận:", error);
        return [];
    }
};

export const deleteComment = async (id: number | string): Promise<any> => {
    try {
        const response: any = await del(`${API_BASE}${id}/`);
        console.log("Xóa bình luận thành công:", response);
        return response;
    } catch (error) {
        console.error(`Lỗi khi xóa bình luận ID ${id}:`, error);
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