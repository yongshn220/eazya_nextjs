import {connectToDB} from "@utils/database";
import {EventPostModel, IEventPost} from "@models/collections/eventPost";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {VoteType} from "@components/constants/enums";
import {VoteUser} from "@models/base/voteUserBase";
import {ReplyBase} from "@models/base/replyBase";
import {CommentBase} from "@models/base/commentBase";


export default async function getEventAction(postId: string) {
  try {
    await connectToDB()
    const eventPost = await EventPostModel.findById(postId)
    if (!eventPost) return null

    let post = eventPost.toObject() as IEventPost
    post = JSON.parse(JSON.stringify(post))

    const session = await getServerSession(authOptions)
    if (!session) {
      post.myVoteType = VoteType.NONE
      return JSON.parse(JSON.stringify(makePostAnonymous(post)))
    }

    const userId = session.user.id

    post.myVoteType = getUserVoteType(userId, post.voteUser)
    post.isMine = (post.authorId === userId)

    post.comments.forEach(comment => {
      comment.myVoteType = getUserVoteType(userId, comment.voteUser)
      comment.isMine = (comment.authorId === userId)

      comment.replies.forEach(reply => {
        reply.myVoteType = getUserVoteType(userId, reply.voteUser)
        reply.isMine = (reply.authorId === userId)
      })
    })

    return JSON.parse(JSON.stringify(makePostAnonymous(post)))
  }
  catch (error) {
    return null
  }
}

function getUserVoteType(userId: string, voteUser: VoteUser) {
  const upvoteIds = voteUser.upvoted.map(id => id.toString())
  const downvoteIds = voteUser.downvoted.map(id => id.toString())
  if (upvoteIds.includes(userId)) return VoteType.UP
  if (downvoteIds.includes(userId)) return VoteType.DOWN
  else return VoteType.NONE
}

function makePostAnonymous(post: IEventPost) {
  post.voteUser = { upvoted: ["CONCEALED"], downvoted: ["CONCEALED"]}
  post.authorId = "CONCEALED"
  post.commentators = ["CONCEALED"]
  post.comments.forEach(comment => {
      comment.voteUser = { upvoted: ["CONCEALED"], downvoted: ["CONCEALED"]}
      comment.authorId = "CONCEALED"
      comment.replies.forEach(reply => {
        reply.voteUser = { upvoted: ["CONCEALED"], downvoted: ["CONCEALED"]}
        reply.authorId = "CONCEALED"
      })
    })
  return post
}
