"use server"

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {StatusCodes} from "@node_modules/http-status-codes";
import {CreateReplyRequest} from "@models/requests/CreateReplyRequest";
import {ReplyBase} from "@models/base/replyBase";
import {revalidatePath} from "@node_modules/next/cache";
import {GetPostModelByType} from "@actions/actionHelper/helperFunctions";

export default async function createReplyAction(req: CreateReplyRequest) {
  try {
    await connectToDB()

    const session = await getServerSession(authOptions)
    if (!session) return {status: StatusCodes.UNAUTHORIZED}

    const PostModel = GetPostModelByType(req.postType)

    const post = await PostModel.findById(req.postId)
    if (!post) return {status: StatusCodes.NOT_FOUND}

    const newReply: ReplyBase = {
      postId: req.postId,
      commentId: req.commentId,
      authorId: session.user.id,
      authorName: post.authorId === session.user.id? "Author" : "Commentator",
      content: req.content,
      createdAt: new Date(),
      isSecret: req.isSecret,
      voteUser: { upvoted: [], downvoted: [] },
      votes: 0,
    }

    const comment = post.comments.id(req.commentId)
    if (!comment) return {status: StatusCodes.NOT_FOUND}

    comment.replies.push(newReply)
    await post.save()

    return newReply
  }
  catch (error) {
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
  finally {
    revalidatePath(`/events/${req.postId}`)
  }
}
