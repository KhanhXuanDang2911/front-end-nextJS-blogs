import { getNewsForAdminPage } from "@/service/newsService";
import UserDashboardContentPage from "./page-content";
import { getAdminDashboardAll, getUsersDashboardAll } from "@/service/countService";

export default async function UserDashboardPage(){
    const recentNews = await getNewsForAdminPage(3, 0)
    const count = await getUsersDashboardAll()
    return (
        <UserDashboardContentPage displayedPosts={recentNews} count={count}/>
    )
}