'use client'

import { useState } from "react"
import CommentContent from "./comment"
import { addSubComment } from "@/service/subCommentService"

export default function CommentSection({ comments, idBl }: { comments: any[], idBl: any }) {

    return (
        <>
            {/* Comments Section */}
            <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                {/* Comments List */}
                <div className="space-y-6">
                    <CommentContent idBl={idBl} comments={comments} />
                </div>
            </div>
        </>
    )
}