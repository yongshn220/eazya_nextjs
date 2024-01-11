import Reply from '@components/post/comment/Reply'

export default function ReplyList({replies}) {
  return (
    <div className="ml-3 pl-3 mt-3 border-l-2 divide-y divide-dashed divide-gray-300">
      {
        replies.map(reply => (
          <Reply key={reply.id} reply={reply}/>
        ))
      }
    </div>
  )
}
