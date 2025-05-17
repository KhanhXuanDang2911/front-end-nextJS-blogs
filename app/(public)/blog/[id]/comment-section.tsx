'use client'

import CommentContent from "./comment"

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