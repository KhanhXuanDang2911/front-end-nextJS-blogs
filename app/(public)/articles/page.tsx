import { getNewsForAdminPage } from "@/service/newsService";
import ArticlesPage from "./page-content";

export default async function Articles(){
    const allPost = await getNewsForAdminPage()
    return <>
        <ArticlesPage allPosts={allPost}/>   
    </>
}