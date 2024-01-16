import InfoHeader from "@components/headers/InfoHeader";
import {ReplyBase} from "@models/base/replyBase";
import {PostType, VoteType} from "@components/constants/enums";
import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import createVoteAction from "@actions/vote/createVoteAction";

interface Props {
  reply: ReplyBase;
  postType: PostType;
  postId: string;
  commentId: string;
}
export default function Reply({reply, postType, postId, commentId}: Props) {

  async function handleCreateVote(voteType: VoteType) {
    const req: CreateVoteRequest = {
      postType,
      postId,
      commentId,
      replyId: reply.id,
      voteType
    }
    if (!await createVoteAction(req)) {
      console.log("err: createVoteAction")
    }
  }

  return (
    <div className="flex flex-col py-5 gap-4">
      <InfoHeader
        author={reply.authorName}
        date={reply.createdAt}
        votes={reply.votes}
        createVoteHandler={handleCreateVote}
        myVoteType={reply.myVoteType}
        isMine={reply.isMine}
      />
      <p className="text-sm leading-6 text-gray-900">{reply.content}</p>
    </div>
  )
}
