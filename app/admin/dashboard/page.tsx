import { getAdminDashboardAll, getAdminDashboardNews } from "@/service/countService";
import DashboardContent from "./page-content";
import { getCategoryForAdminPage } from "@/service/categoryService";

export default async function Dashboard() {
    const countData = await getAdminDashboardAll()
    const viewsData: any[] = await getAdminDashboardNews()
    const categories: any[] = await getCategoryForAdminPage()
    const formattedData = Object.entries(viewsData).map(([name, counts]) => ({
        name,
        counts
    }));
    
    const mergedCategory = categories
        .filter(c => c.news_count === 0)
        .reduce((acc, cur) => {
            acc.name += (acc.name ? "\n" : "") + cur.name; 
            return acc;
        }, { name: "", news_count: 0 });

    const filteredCategories = categories.filter(c => c.news_count !== 0);

    if (mergedCategory.name) {
        filteredCategories.push(mergedCategory);
    }

    const predefinedColors: string[] = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFF5", "#F5FF33", "#FF8C33", "#8C33FF", "#33FF8C"
    ];

    const colors: string[] = Array.from(
        { length: filteredCategories.length },
        (_, index) => predefinedColors[index % predefinedColors.length]
    );

    return (
        <>
            <DashboardContent colors={colors} countData={countData} newsData={formattedData.reverse()} categories={filteredCategories} />
        </>
    )
}