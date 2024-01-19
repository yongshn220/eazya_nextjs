"use server"

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {StatusCodes} from "@node_modules/http-status-codes";
import {CreateReplyRequest} from "@models/requests/CreateReplyRequest";
import {ReplyBase} from "@models/base/replyBase";
import {revalidatePath} from "@node_modules/next/cache";
import {getCommentAuthorNameAndSave, GetPostModelByType} from "@actions/actionHelper/helperFunctions";
import {CreateNotificationRequest} from "@models/requests/CreateNotificationRequest";
import {NotificationType, PostType, UserActivityType} from "@components/constants/enums";
import createNotificationAction from "@actions/notification/createNotificationAction";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import createUserActivityAction from "@actions/userActivity/createUserActivityAction";

export default async function createReplyAction(req: CreateReplyRequest) {
  try {
    await connectToDB()

    const session = await getServerSession(authOptions)
    if (!session) return {status: StatusCodes.UNAUTHORIZED}

    const PostModel = GetPostModelByType(req.postType)
    if (!PostModel) return null

    const post = await PostModel.findById(req.postId)
    if (!post) return {status: StatusCodes.NOT_FOUND}

    const authorName = getCommentAuthorNameAndSave(post, session.user.id)

    const newReply: ReplyBase = {
      postId: req.postId,
      commentId: req.commentId,
      authorId: session.user.id,
      authorName,
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

    const notiReq: CreateNotificationRequest = {
      fromUserId: session.user.id,
      toUserId: post.authorId.toString(),
      notificationType: NotificationType.REPLY_ON_COMMENT,
      postType: req.postType,
      postId: req.postId,
      commentId: req.commentId,
      preview: comment.content,
    }
    await createNotificationAction(notiReq)

    // USER ACTIVITY
    const newReplyId = comment.replies[comment.replies.length - 1]._id
    const activityReq: CreateUserActivityRequest = {
      userActivityType: UserActivityType.CREATE_POST,
      postType: PostType.EVENT,
      postId: req.postId,
      commentId: req.commentId,
      replyId: newReplyId,
      preview: req.content,
    }
    await createUserActivityAction(activityReq)

    return newReply
  }
  catch (error) {
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
  finally {
    revalidatePath(`/events/${req.postId}`)
  }
}
