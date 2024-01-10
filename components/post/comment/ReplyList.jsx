import Reply from '@components/post/comment/Reply'

export default function ReplyList({replies}) {
  return (
    <div className="ml-3 pl-3 border-l border-gray-300 divide-y divide-gray-300">
      {
        replies.map(reply => (
          <Reply key={reply.id} reply={reply}/>
        ))
      }
    </div>
  )
}
