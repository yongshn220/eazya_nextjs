import InfoHeader from "@components/headers/InfoHeader";
import ReplyList from "@components/post/comment/ReplyList";
import CreateReply from "@components/post/comment/CreateReply";
import createVoteAction from "@actions/vote/createVoteAction";
import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import {VoteType} from "@components/constants/enums";
import React from "react";
import {LockIcon, LockOpenIcon} from "@components/icon/icons";

export default function Comment({postType, postId, comment, isReplyOn, onToggleReply }) {

  async function handleCreateVote(voteType: VoteType) {
    const req: CreateVoteRequest = {
      postType,
      postId,
      commentId: comment.id,
      voteType
    }
    if (!await createVoteAction(req)) {
      console.log("err: createVoteAction")
    }
  }

  return (
    <div className="flex flex-col py-5 gap-4 border-b border-gray-300">
      <InfoHeader
        author={comment.authorName}
        authorMajor={comment.authorMajor}
        date={comment.createdAt}
        votes={comment.votes}
        myVoteType={comment.myVoteType}
        isMine={comment.isMine}
        createVoteHandler={handleCreateVote}
      />
      <div>
        {
          comment.isSecret
            ? comment.hasAuthorityToRead
              ? <p className="flex items-center gap-1 text-sm leading-6 text-gray-900"><LockOpenIcon/>{comment.content}</p>
              : <LockIcon/>
            : <p className="text-sm leading-6 text-gray-900">{comment.content}</p>
        }
      </div>
      {
        comment.hasAuthorityToRead &&
        <p className="text-xs leading-5 text-gray-500 cursor-pointer" onClick={onToggleReply}>Reply</p>
      }
      { isReplyOn && <CreateReply postType={postType} postId={postId} commentId={comment.id}/> }
      <ReplyList replies={comment.replies} postType={postType} postId={postId} commentId={comment.id}/>
    </div>
  )
}
