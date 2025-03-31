import { getAllComments } from "@/service/baseCommentService";
import CommentsPageContent from "./page-content";

export default async function CommentsPage(){
    const comments = await getAllComments()
    return(
        <CommentsPageContent comments={comments}/>
    )
}