"use server"

import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {StatusCodes} from "@node_modules/http-status-codes";
import {GetPostModelByType} from "@actions/actionHelper/helperFunctions";
import {VoteType} from "@components/constants/enums";
import {revalidatePath} from "next/cache";
import {ObjectId} from "mongodb";
import mongoose from "mongoose";

export default async function createVoteAction(req: CreateVoteRequest) {
  try {
    await connectToDB()

    const session = await getServerSession(authOptions)
    if (!session) return {status: StatusCodes.UNAUTHORIZED}

    const PostModel = GetPostModelByType(req.postType)

    const post = await PostModel.findById(req.postId)
    if (!post) return {status: StatusCodes.NOT_FOUND}
    if (!req.commentId) {
      handleVoting(session.user.id, req.voteType, post)
      post.save()
      return post.votes
    }

    const comment = post.comments.id(req.commentId);
    if (!comment) return {status: StatusCodes.NOT_FOUND}
    if (!req.replyId) {
      handleVoting(session.user.id, req.voteType, comment)
      post.save()
      return post.votes
    }

    const reply = comment.replies.id(req.replyId);
    if (!reply) return {status: StatusCodes.NOT_FOUND};
    handleVoting(session.user.id, req.voteType, reply)
    post.save()
    return post.votes

  }
  catch (error) {
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
  finally {
    revalidatePath(`/events/${req.postId}`)
  }
}

function handleVoting(userId: string, voteType: VoteType, target: any) {
  const id: ObjectId = new mongoose.Types.ObjectId(userId)

  if (voteType === VoteType.UP) {
    if (target.voteUser.upvoted.includes(userId)) {
      target.voteUser.upvoted = target.voteUser.upvoted.filter((oid: ObjectId) => !oid.equals(id))
    }
    else {
      target.voteUser.upvoted.push(id)
    }
  }
  else if (voteType === VoteType.DOWN) {
    if (target.voteUser.downvoted.includes(userId)) {
      target.voteUser.downvoted = target.voteUser.downvoted.filter((oid: ObjectId) => !oid.equals(id))
    }
    else {
      target.voteUser.downvoted.push(id)
    }
  }

  target.votes = target.voteUser.upvoted.length - target.voteUser.downvoted.length
}
