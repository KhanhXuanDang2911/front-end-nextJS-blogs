import EditPostContentPage from "./pageContent"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return<>
    <EditPostContentPage id={id}/>
  </>
}