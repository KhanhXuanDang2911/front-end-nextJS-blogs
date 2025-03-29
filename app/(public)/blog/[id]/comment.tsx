import { useState } from "react";
import CommentTree from "./cmt-tree";
import { addSubComment, getCommentsByParentId } from "@/service/subCommentService";
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { addComment } from "@/service/commentService";
import { deleteComment, updateComment } from "@/service/baseCommentService";
import { getUserFromToken } from "@/util/decode_jwt";

export default function CommentContent({ comments, idBl }:
    { comments: any[], idBl: any }) {
    const [commentText, setCommentText] = useState("")

    const handleReply = async (commentId: number, replyText: string) => {
        const userFromToken = getUserFromToken();
        if (replyText.trim()) {
            const newSubCmt = {
                user: userFromToken.user_id,
                content: replyText,
                parent_comment: commentId
            }
            const res = await addSubComment(newSubCmt)
            if (res.status === 201) {
                const parent = cmtsObj[commentId];
                const nextParent = {
                    ...parent,
                    childIds: [res.data.id, ...parent.childIds],
                    sub_comment_count: parent.sub_comment_count + 1,
                };
                let newCmtObj = { ...cmtsObj }
                let commentUpdateCountSub: any = commentId
                Object.keys(newCmtObj).reverse().forEach(key => {
                    console.log(key, newCmtObj[key].childIds)
                })
                Object.keys(newCmtObj).reverse().forEach(key => {
                    if (newCmtObj[key].childIds.indexOf(commentUpdateCountSub) != -1) {
                        newCmtObj = {
                            ...newCmtObj,
                            [key]: { ...newCmtObj[key], sub_comment_count: newCmtObj[key].sub_comment_count + 1 }
                        }
                        commentUpdateCountSub = Number(key)
                    }
                });

                setCmts({
                    ...newCmtObj,
                    [commentId]: nextParent,
                    [res.data.id]: { ...res.data, childIds: []}
                })
            }
            return
        }
    }

    const handleComment = async () => {
        const userFromToken = getUserFromToken();
        if (commentText.trim()) {
            const newSubCmt = {
                user: userFromToken.user_id,
                content: commentText,
                article: idBl
            }
            const res = await addComment(newSubCmt)
            if (res.status === 201) {
                const parent = cmtsObj[0];
                const nextParent = {
                    ...parent,
                    childIds: [res.data.id, ...parent.childIds],
                    isShowSubCmt: true
                };
                setCmts({
                    ...cmtsObj,
                    [0]: nextParent,
                    [res.data.id]: { ...res.data, childIds: [] }
                })
            }
            setCommentText("")
            return
        }
    }

    const cmtsObjInit = comments.reduce((obj, cmt) => {
        obj[cmt.id] = { ...cmt, childIds: [], isShowSubCmt: false};
        return obj;
    }, {});

    cmtsObjInit[0] = { childIds: comments.map(cmt => cmt.id), isShowSubCmt: true };
    const [cmtsObj, setCmts] = useState<any>(cmtsObjInit);
    const root = cmtsObj[0];
    const directChildIds: any[] = root.childIds;

    const handleSeemoreSubCmt = async (parentId: any) => {
        if (cmtsObj[parentId].isShowSubCmt) {
            setCmts({
                ...cmtsObj,
                [parentId]: { ...cmtsObj[parentId], isShowSubCmt: false }
            })
            return
        }
        const parent = cmtsObj[parentId];
        // if (parent && parent.childIds.length > 0) return;

        const subCmts: any[] = await getCommentsByParentId(parentId);
        const subCmtsObj = subCmts.reduce((obj, cmt) => {
            obj[cmt.id] = { ...cmt, childIds: [], isShowSubCmt: false};
            return obj;
        }, {});

        const nextParent = {
            ...parent,
            childIds: subCmts.length > 0 ? [...subCmts.map(cmt => cmt.id)] : [],
            isShowSubCmt: true
        };

        setCmts({
            ...cmtsObj,
            [parentId]: nextParent,
            ...subCmtsObj
        })
    };

    const handleDeleteCmt = async (id: any, parentId: any) => {
        try {
            const res = await deleteComment(id);
            
            if (res.status === 205) {
                const parent = cmtsObj[parentId];
                if (!parent) return;

                let newCmtObj = { ...cmtsObj }
                let commentUpdateCountSub: any = id
                Object.keys(newCmtObj).reverse().forEach(key => {
                    console.log(key, commentUpdateCountSub, newCmtObj[key].childIds)
                    if (newCmtObj[key].childIds.indexOf(commentUpdateCountSub) != -1) {
                        
                        newCmtObj = {
                            ...newCmtObj,
                            [key]: { ...newCmtObj[key],
                                sub_comment_count: newCmtObj[key].sub_comment_count - newCmtObj[id].sub_comment_count - 1}
                        }
                        commentUpdateCountSub = Number(key)
                    }
                });
                const nextParent = {
                    ...newCmtObj[parentId],
                    childIds: parent.childIds.filter((it: any) => it !== id),
                    // isShowSubCmt: true
                };
                
                const { [id]: _, ...newCmtObjFinal } = newCmtObj;
                setCmts({
                    ...newCmtObjFinal,
                    [parentId]: nextParent,
                });
            }
        } catch (error) {
            console.error("Lỗi khi xóa bình luận:", error);
        }
    };       

    const handleUpdateCmt = async(id: any, content: any) => {
        try {
            const cmtUpdate = {
                id: id,
                content: content
            }
            const res = await updateComment(cmtUpdate);
            if (res.status === 204) {
                
                const { [id]: _, ...newCmtsObj } = cmtsObj;

                setCmts({
                    ...newCmtsObj,
                    [id]: {...cmtsObj[id], content: content},
                });
                return true
            }
            return false
        } catch (error) {
            console.error("Lỗi khi edit bình luận:", error);
            return false
        }
    };

    const totalCmt = directChildIds.reduce((sum, id) => sum + (cmtsObj[id]?.sub_comment_count + 1 || 0), 0);
    ;

    return (
        <>
            <h3 className="text-2xl font-bold mb-6 gradient-text">Comments ({totalCmt})</h3>

            {/* Comment Form */}
            <Card className="mb-6 border-t-4 border-t-brand-blue">
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg" alt="Your Avatar" />
                            <AvatarFallback>YA</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <Textarea
                                placeholder="Write a comment..."
                                className="mb-4 resize-none border-brand-blue/20 focus-visible:ring-brand-blue"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <Button
                                    onClick={handleComment}
                                    className="bg-gradient-to-r from-brand-blue to-brand-purple text-white"
                                >
                                    Post Comment
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <ol className="flex flex-col gap-6">
                {directChildIds.map((id: any) => (
                    <CommentTree
                        key={id}
                        id={id}
                        parentId={0}
                        commentsById={cmtsObj}
                        handleSeemoreSubCmt={handleSeemoreSubCmt}
                        handleReply={handleReply}
                        handleDeleteCmt={handleDeleteCmt}
                        handleUpdateCmt={handleUpdateCmt}
                    />
                ))}
            </ol>
        </>
    );
}
