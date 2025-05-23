import { getCategoryForAdminPage } from "@/service/categoryService";
import NewPostContentPage from "./page-content";
import { unstable_noStore } from "next/cache";

export default async function NewPostPage() {
    unstable_noStore();

    const categories = await getCategoryForAdminPage()
    return (
        <>
            <NewPostContentPage categories={categories} />
        </>
    )
}