import { getCategoryDetail } from "@/service/categoryService";
import ContentOfTagPage from "./content";
import { getNewsByCategoryId } from "@/service/newsService";

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>
}){
  const { slug } = await params
  const tag = await getCategoryDetail(slug)
  const taggedPosts = await getNewsByCategoryId(slug)
  return(
    <ContentOfTagPage tagName={tag.name} taggedPosts={taggedPosts}/>
  )
}