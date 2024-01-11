import Image from 'next/image'
import InfoHeader from "@components/headers/InfoHeader";
import ReplyList from "@components/post/comment/ReplyList";
import {useState} from "react";
import CreateComment from "@components/post/comment/CreateComment";
import CreateReply from "@components/post/comment/CreateReply";

export default function Comment({postType, postId, comment}) {
  const [isReplyOn, setIsReplyOn] = useState(false)
  return (
    <div className="flex flex-col py-5 gap-4 border-b border-gray-300">
      <InfoHeader author={comment.authorName} date={comment.createdAt}/>
      <p className="text-sm leading-6 text-gray-900">{comment.content}</p>
      <p className="text-xs leading-5 text-gray-500 cursor-pointer" onClick={() => setIsReplyOn(prev => !prev)}>Reply</p>
      {isReplyOn && <CreateReply postType={postType} postId={postId} commentId={comment.id} />}
      <ReplyList replies={comment.replies}/>
      {
        comment.replies.length > 0 &&
        <p className="text-xs leading-5 text-gray-500 cursor-pointer">Reply</p>
      }
    </div>
  )
}
