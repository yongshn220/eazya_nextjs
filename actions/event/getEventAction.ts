import {connectToDB} from "@utils/database";
import {EventPostModel, IEventPost} from "@models/collections/eventPost";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {VoteType} from "@components/constants/enums";
import {VoteUser} from "@models/base/voteUserBase";


export default async function GetEventAction(postId: string) {
  console.log("GET EVENT ACTION OCCURS")
  try {
    await connectToDB()
    const eventPost = await EventPostModel.findById(postId)
    if (!eventPost) return null

    const post = eventPost.toObject() as IEventPost

    const session = await getServerSession(authOptions)
    if (!session) {
      post.voteUser = {upvoted: [], downvoted: []} // Conceal user info
      post.myVoteType = VoteType.NONE
      return JSON.parse(JSON.stringify(post))
    }

    const userId = session.user.id

    post.myVoteType = getUserVoteType(userId, post.voteUser)
    post.voteUser = { upvoted: [], downvoted: []}

    post.comments.forEach(comment => {
      comment.myVoteType = getUserVoteType(userId, comment.voteUser)
      comment.voteUser = { upvoted: [], downvoted: []}
      comment.replies.forEach(reply => {
        reply.myVoteType = getUserVoteType(userId, reply.voteUser)
        reply.voteUser = { upvoted: [], downvoted: []}
      })
    })

    return JSON.parse(JSON.stringify(post))
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

