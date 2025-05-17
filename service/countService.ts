import { getUserFromToken } from "@/util/decode_jwt"
import { get } from "@/util/request"

export const getAdminDashboardAll = async () : Promise<any>=> {
    const res:any = await get(`count/admin-dashboard`)
    return res     
}

export const getAdminDashboardNews = async () : Promise<any[]>=> {
    const res:any = await get(`count/news-by-month`)
    return res     
}

export const getUsersDashboardAll = async (id:any) : Promise<any[]>=> {
    const res:any = await get(`count/users-dashboard?user_id=${id}`)
    return res     
}