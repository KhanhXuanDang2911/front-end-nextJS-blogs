'use client'
import CMT_UI from "@/components/ui/cmt-ui";

export default function CommentTree({ id, parentId, commentsById,
    handleSeemoreSubCmt, handleReply, handleDeleteCmt, handleUpdateCmt
}: {
    id: any, parentId: any, commentsById: any, handleSeemoreSubCmt: (parentId: any) => Promise<void>,
    handleReply: (commentId: number, replyText: string) => void, handleDeleteCmt: (id: any, parentId: any) => void,
    handleUpdateCmt: (id: any, content: any) => void
}) {

    const comment = commentsById[id]; // get info of cmt
    const childIds: any[] = comment.childIds // get list id of sub cmt
    return (
        <li>
            <CMT_UI
                id={id}
                commentsById={commentsById}
                childIds={childIds}
                handleSeemoreSubCmt={handleSeemoreSubCmt}
                comment={comment}
                parentId={parentId}
                handleReply={handleReply}
                handleDeleteCmt={handleDeleteCmt}
                handleUpdateCmt={handleUpdateCmt}
            />
        </li>
    )
}