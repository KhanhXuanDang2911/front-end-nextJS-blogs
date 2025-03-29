import { getCategoryForAdminPage } from "@/service/categoryService";
import NewPostContentPage from "./page-content";

export default async function NewPostPage() {
    const categories = await getCategoryForAdminPage()
    return(
        <>
            <NewPostContentPage categories={categories} />
        </>
    )
}