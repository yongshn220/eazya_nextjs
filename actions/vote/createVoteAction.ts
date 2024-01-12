"use server"

import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {StatusCodes} from "@node_modules/http-status-codes";
import {GetPostModelByType} from "@actions/actionHelper/helperFunctions";
import {VoteType} from "@components/constants/enums";
import {revalidatePath} from "next/cache";

export default async function createVoteAction(req: CreateVoteRequest) {
  try {
    await connectToDB()

    const session = await getServerSession(authOptions)
    if (!session) return {status: StatusCodes.UNAUTHORIZED}

    const PostModel = GetPostModelByType(req.postType)

    const post = await PostModel.findById(req.postId)
    if (!post) return {status: StatusCodes.NOT_FOUND}
    if (!req.commentId) {
      (req.voteType === VoteType.UP) ? post.voteUser.upvoted.push(session.user.id) : post.voteUser.downvoted.push(session.user.id)
      post.votes = post.voteUser.upvoted.length - post.voteUser.downvoted.length
      post.save()
      return post.votes
    }

    const comment = post.comments.id(req.commentId);
    if (!comment) return {status: StatusCodes.NOT_FOUND}
    if (!req.replyId) {
      (req.voteType === VoteType.UP) ? comment.voteUser.upvoted.push(session.user.id) : comment.voteUser.downvoted.push(session.user.id)
      comment.votes = comment.voteUser.upvoted.length - comment.voteUser.downvoted.length
      post.save()
      return post.votes
    }

    const reply = comment.replies.id(req.replyId);
    if (!reply) return {status: StatusCodes.NOT_FOUND};
    (req.voteType === VoteType.UP) ? reply.voteUser.upvoted.push(session.user.id) : reply.voteUser.downvoted.push(session.user.id)
    reply.votes = reply.voteUser.upvoted.length - reply.voteUser.downvoted.length
    post.save()
    return post.votes

    //TODO: test
  }
  catch (error) {
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
  finally {
    revalidatePath(`/events/${req.postId}`)
  }
}
