import Comment from '@components/post/comment/Comment'

export default function CommentList({comments}) {
  return (
    <div className="mt-10">
      {
        comments.map(comment => (
          <Comment comment={comment}/>
        ))
      }
    </div>
  )
}
