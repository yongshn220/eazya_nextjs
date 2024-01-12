import {connectToDB} from '@utils/database'
import {EventPostModel, IEventPost} from '@models/collections/eventPost'
import {StatusCodes} from 'http-status-codes'
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth/next";
import {VoteType} from "@components/constants/enums";
import {VoteUser} from "@models/base/voteUserBase";

export async function GET(req: Request, { params }) {
  try {
    await connectToDB()
    const eventPost = await EventPostModel.findById(params.id)
    if (!eventPost) new Response("Post not found", {status: StatusCodes.NOT_FOUND})

    const post = eventPost.toObject() as IEventPost

    const session = await getServerSession(authOptions)
    if (!session) {
      post.voteUser = {upvoted: [], downvoted: []} // Conceal user info
      post.myVoteType = VoteType.NONE
      return new Response(JSON.stringify(post), {status: StatusCodes.OK})
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

    return new Response(JSON.stringify(post), {status: StatusCodes.OK})
  }
  catch (error) {
    return new Response("Failed to fetch all event posts", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  }
}

function getUserVoteType(userId: string, voteUser: VoteUser) {
  const upvoteIds = voteUser.upvoted.map(id => id.toString())
  const downvoteIds = voteUser.downvoted.map(id => id.toString())
  if (upvoteIds.includes(userId)) return VoteType.UP
  if (downvoteIds.includes(userId)) return VoteType.DOWN
  else return VoteType.NONE
}
