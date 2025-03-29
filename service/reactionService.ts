import { del, get, patch, post, put } from "@/util/request";

const api: string = "reactions/";

export const getReactionsOfUserInNews = async (news_id :any, user_id:any): Promise<any> => {
    const path: string = `${api}?news_id=${news_id}&user_id=${user_id}`;
    const response: any = await get(path);
    return response.data.length > 0 ? response.data[0] : null;
};


export const addReaction = async (reaction: any): Promise<any> => {
    const path: string = `${api}`;
    const response: any = await post(path, reaction);
    return response;
};

export const updateReaction = async (reaction: any): Promise<any> => {
    const path: string = `${api}${reaction.id}/`;
    const response: any = await patch(path, reaction);
    return response;
};

export const deleteReaction = async (id: any): Promise<any> => {
    const path: string = `${api}${id}/`;
    const response: any = await del(path);
    console.log("response", response);
    return response;
};
