import { getNewsForAdminPage } from "@/service/newsService";
import ArticlesPage from "./page-content";
import { unstable_noStore } from "next/cache";

  
export default async function Articles(){
    unstable_noStore();
    const allPost = await getNewsForAdminPage()
    return <>
        <ArticlesPage allPosts={allPost}/>   
    </>
}