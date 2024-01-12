import InfoHeader from "@components/headers/InfoHeader";
import {ReplyBase} from "@models/base/replyBase";

interface Props {
  reply: ReplyBase
}
export default function Reply({reply}: Props) {
  return (
    <div className="flex flex-col py-5 gap-4">
      <InfoHeader
        author={reply.authorName}
        date={reply.createdAt}
        votes={reply.votes}
        myVoteType={reply.myVoteType}
        createVoteHandler={() => {}}
      />
      <p className="text-sm leading-6 text-gray-900">{reply.content}</p>
    </div>
  )
}
