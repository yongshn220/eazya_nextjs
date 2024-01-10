import Comment from '@components/post/comment/Comment'

export default function CommentList({postId, postType, comments}) {
  return (
    <div className="mt-10">
      {
        comments.map(comment => (
          <Comment key={comment.id} postId={postId} postType={postType} comment={comment}/>
        ))
      }
    </div>
  )
}
