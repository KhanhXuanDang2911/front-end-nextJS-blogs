import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Button as ButtonAntd } from "antd";

import {
    Facebook,
    Twitter,
    Linkedin,
    Share2,
    Clock,
    Calendar,
    MessageSquare,
    MoreVertical,
    ThumbsUp,
    Heart,
    Smile,
    Frown,
    Zap,
    Loader2,
    TagIcon,
} from "lucide-react"
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import CommentTree from "@/app/(public)/blog/[id]/cmt-tree"
import { useState } from "react"
import { Form, Input, Modal } from "antd"
import ContentOfComment from "@/app/(public)/blog/[id]/content-of-comment"

export default function CMT_UI({ id, childIds, comment,
    parentId, handleSeemoreSubCmt,
    commentsById, handleReply, handleDeleteCmt, handleUpdateCmt,
}:
    {
        childIds: any[], comment: any, parentId: any,
        handleSeemoreSubCmt: (parentId: any) => Promise<void>
        , id: any, commentsById: any,
        handleReply: (commentId: number, replyText: string) => Promise<void>,
        handleDeleteCmt: (id: any, parentId: any) => Promise<void>,
        handleUpdateCmt: (id: any, content: any) => Promise<boolean>,
    }) {
    const [replyText, setReplyText] = useState('')
    const [showRely, setShowRely] = useState(false)
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [formEdit] = Form.useForm();
    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };

    const handleEdit = () => {
        setIsEditing(true)
    }
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {commentsById[parentId].isShowSubCmt &&
                <div
                    key={comment.id}
                >  
                    <div className={''}>
                        <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3 flex-1">
                                <Avatar className={`${parentId == 0 ? 'h-10 w-10' : 'h-7 w-7'}`}>
                                    <AvatarImage src={`https://res.cloudinary.com/dbqoymyi8/${comment.author_avatar}`} alt={comment.author_name} />
                                    <AvatarFallback>{comment.author_name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col flex-1 gap-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-medium text-md">{comment.author_name}</span>
                                        <span className="text-xs">{comment.created_at}</span>
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        <ContentOfComment handleUpdateComment={handleUpdateCmt}
                                            isEditing={isEditing} initialText={comment.content}
                                            id={id} setIsEditing={setIsEditing} />
                                        <div className="flex items-center gap-4">
                                            {/* <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-muted-foreground hover:text-green-400 hover:bg-brand-blue/10"
                                        > */}
                                            <div className="text-muted-foreground hover:text-green-400"
                                            >
                                                <ThumbsUp className="h-4 w-4 mr-2" />

                                            </div>

                                            {/* {comment.likes} */}
                                            {/* </Button> */}
                                            {/* <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-muted-foreground hover:text-brand-purple hover:bg-brand-purple/10"
                                                onClick={() => setShowRely(!showRely)}
                                            > */}
                                            <div className="text-muted-foreground hover:text-green-400 flex items-center cursor-pointer whitespace-nowrap text-sm font-medium" onClick={() => setShowRely(!showRely)}>
                                                <MessageSquare className="h-4 w-4 mr-2" onClick={() => setShowRely(!showRely)} />
                                                Reply
                                            </div>
                                            {/* </Button> */}
                                            {comment.sub_comment_count > 0 &&
                                                <div className={`text-muted-foreground hover:text-green-400 ${commentsById[id].isShowSubCmt ? ' text-green-500' : ''} flex flex-row gap-2 cursor-pointer whitespace-nowrap text-sm font-medium`}
                                                    onClick={() => handleSeemoreSubCmt(comment.id)} >
                                                    {commentsById[id].isShowSubCmt ? <UpOutlined /> : <DownOutlined />}
                                                    See more {comment.sub_comment_count} replies
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger >
                                    <Button variant="ghost" size="icon" className="" style={{
                                        all: "unset",
                                        outline: "none",
                                        boxShadow: "none",
                                        background: "transparent",
                                    }}>
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">More</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Report</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCmt(id, parentId)}>
                                        Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {/* <Modal title="Update Comment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <Form
                                    form={formEdit}
                                    style={{ maxWidth: 600, marginTop: 30 }}
                                >
                                    <Form.Item
                                        label="Id"
                                        name="id"
                                        hidden
                                    >
                                        <Input readOnly />
                                    </Form.Item>
                                    <Form.Item name={"content"}
                                        rules={[{ required: true, message: "Please enter content!" }]}

                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                </Form>
                            </Modal> */}
                        </div>
                        {/* <p className="mb-4">{comment.content}</p> */}


                        {/* Reply Form */}
                        {showRely && (
                            <div className="mt-4 flex gap-3 mb-4 pl-10 animate-slide-in">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg" alt="Your Avatar" />
                                    <AvatarFallback>YA</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <Textarea
                                        placeholder={`Reply to ${comment.author_name}...`}
                                        className="mb-2"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                    />
                                    <div className="mt-2 flex justify-end gap-2">
                                        <ButtonAntd size="small" onClick={() => setShowRely(false)}>
                                            Cancel
                                        </ButtonAntd>
                                        <ButtonAntd
                                            size="small"
                                            type="primary"
                                            onClick={() => {
                                                handleReply(comment.id, replyText)
                                                setReplyText('')
                                                setShowRely(false)
                                            }}
                                        >
                                            Reply
                                        </ButtonAntd>
                                    </div>
                                </div>
                            </div>
                        )}
                        {childIds.length > 0 && (
                            <ol className="ml-8">
                                {childIds.map(childId => (
                                    <CommentTree key={childId}
                                        id={childId}
                                        parentId={id}
                                        commentsById={commentsById}
                                        handleSeemoreSubCmt={handleSeemoreSubCmt}
                                        handleReply={handleReply}
                                        handleDeleteCmt={handleDeleteCmt}
                                        handleUpdateCmt={handleUpdateCmt}
                                    />
                                ))}
                            </ol>
                        )}
                    </div>
                </div>
            }
        </>
    )
}