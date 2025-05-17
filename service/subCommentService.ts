import { get, post } from "@/util/request";

const API_BASE: string = "sub-comments/";

export const getCommentsByParentId = async (parentId:any): Promise<any[]> => {
    try {
        const response: any = await get(`${API_BASE}?search=${parentId}`);

        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bình luận:", error);
        return [];
    }
};

export const addSubComment = async (subComment: any): Promise<any> => {
    try {
        const response: any = await post(API_BASE, subComment);
        return response;
    } catch (error) {
        console.error("Lỗi khi thêm bình luận:", error);
        return null;
    }
};