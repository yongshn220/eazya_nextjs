"use client"

import Comment from '@components/post/comment/Comment'
import {useState} from "react";

export default function CommentList({postId, postType, comments}) {
  const [activeReplyCommentId, setActiveReplyCommentId] = useState(null);

  function toggleReply(commentId) {
    setActiveReplyCommentId(prevId => prevId === commentId ? null : commentId);
  }

  return (
    <div className="mt-10">
      {
        comments.map(comment => (
          <Comment
            key={comment.id}
            postId={postId}
            postType={postType}
            comment={comment}
            isReplyOn={comment.id === activeReplyCommentId}
            onToggleReply={() => toggleReply(comment.id)}
          />
        ))
      }
    </div>
  )
}
