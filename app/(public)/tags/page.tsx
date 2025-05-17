import { getCategoryForAdminPage } from "@/service/categoryService";
import { Suspense } from "react";
import TagsPage from "./page-content";
import { unstable_noStore } from "next/cache";

// Màu cố định cho trendingTags
const trendingColors = [
    "bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500"
];

// Danh sách màu cho sortedTags
const sortedColors = [
    "bg-brand-blue", "bg-brand-green", "bg-brand-orange", "bg-brand-purple",
    "bg-brand-red", "bg-brand-yellow", "bg-brand-pink", "bg-brand-gray"
];

// Hàm gán màu cố định cho trendingTags
function addColorToTrendingTags(tags: { name: string; count: number }[]) {
    return tags.map((tag, index) => ({
        ...tag,
        color: trendingColors[index % trendingColors.length], // Lặp lại nếu thiếu màu
    }));
}

// Hàm gán màu cho sortedTags
function addColorToSortedTags(tags: { name: string; count: number }[]) {
    return tags.map((tag, index) => ({
        ...tag,
        color: sortedColors[index % sortedColors.length], // Lặp lại nếu thiếu màu
    }));
}

export default async function TagPage() {
    unstable_noStore(); 
    let trendingTags = await getCategoryForAdminPage(5, '-news_count');
    let sortedTags = await getCategoryForAdminPage();

    trendingTags = addColorToTrendingTags(trendingTags);
    sortedTags = addColorToSortedTags(sortedTags);

    return (
        <Suspense fallback="">
            <TagsPage trendingTags={trendingTags} sortedTags={sortedTags} />
        </Suspense>
    );
}
