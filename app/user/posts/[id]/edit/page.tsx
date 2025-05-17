import { getCategoryForAdminPage } from "@/service/categoryService"
import EditPostContentPage from "./pageContent"
import { unstable_noStore } from "next/cache";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  unstable_noStore();

  const { id } = await params
  const categories = await getCategoryForAdminPage()

  return <>
    <EditPostContentPage id={id} categories={categories} />
  </>
}