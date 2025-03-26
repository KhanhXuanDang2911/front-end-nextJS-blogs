import { getCategoryForAdminPage } from "@/service/categoryService"
import EditPostContentPage from "./pageContent"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const categories = await getCategoryForAdminPage()

  return <>
    <EditPostContentPage id={id} categories={categories} />
  </>
}