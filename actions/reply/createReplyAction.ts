"use server"

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {StatusCodes} from "@node_modules/http-status-codes";
import {CreateReplyRequest} from "@models/requests/CreateReplyRequest";
import {ReplyBase} from "@models/base/replyBase";
import {revalidateTag} from "@node_modules/next/cache";
import {getCommentAuthorName, GetPostModelByType} from "@actions/actionHelper/helperFunctions";
import {CreateNotificationRequest} from "@models/requests/CreateNotificationRequest";
import {NotificationType, PostType, UserActivityType} from "@components/constants/enums";
import createNotificationAction from "@actions/notification/createNotificationAction";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import createUserActivityAction from "@actions/userActivity/createUserActivityAction";
import {getPostTag} from "@components/constants/tags";

export default async function createReplyAction(req: CreateReplyRequest) {
  await connectToDB()
  const session = await getServerSession(authOptions)
  if (!session) return {status: StatusCodes.UNAUTHORIZED}

  try {
    const PostModel = GetPostModelByType(req.postType)
    if (!PostModel) return null

    const post = await PostModel.findById(req.postId)
    if (!post) return {status: StatusCodes.NOT_FOUND}

    const authorName = getCommentAuthorName(post, session.user.id)

    const newReply: ReplyBase = {
      postId: req.postId,
      commentId: req.commentId,
      authorId: session.user.id,
      authorName,
      authorMajor: session.user.major,
      content: req.content,
      createdAt: new Date().toString(),
      isSecret: req.isSecret,
      voteUser: { upvoted: [], downvoted: [] },
      votes: 0,
    }

    const comment = post.comments.id(req.commentId)
    if (!comment) return {status: StatusCodes.NOT_FOUND}

    comment.replies.push(newReply)
    await post.save()

    // NOTIFICATION
    if (session.user.id !== post.authorId.toString()) {
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
    }

    // USER ACTIVITY
    const newReplyId = comment.replies[comment.replies.length - 1]._id
    const activityReq: CreateUserActivityRequest = {
      userActivityType: UserActivityType.CREATE_REPLY,
      postType: req.postType,
      communityType: post.communityType ?? null,
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
    revalidateTag(getPostTag(session.user.id, req.postId, req.postType))
  }
}
