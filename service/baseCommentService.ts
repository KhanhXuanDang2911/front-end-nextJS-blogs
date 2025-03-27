import { del } from "@/util/request";

const API_BASE = 'base-comments/'
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
