"use server"

import {CreateCommentRequest} from "@models/requests/CreateCommentRequest";
import {revalidateTag} from "@node_modules/next/cache";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {StatusCodes} from "@node_modules/http-status-codes";
import {CommentBase} from "@models/base/commentBase";
import {
  getCommentAuthorName,
  GetPostModelByType
} from "@actions/actionHelper/helperFunctions";
import {CreateNotificationRequest} from "@models/requests/CreateNotificationRequest";
import {NotificationType, PostType, UserActivityType} from "@components/constants/enums";
import createNotificationAction from "@actions/notification/createNotificationAction";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import createUserActivityAction from "@actions/userActivity/createUserActivityAction";
import {getPostTag} from "@components/constants/tags";

export default async function createCommentAction(req: CreateCommentRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const PostModel = GetPostModelByType(req.postType)
    if (!PostModel) return null

    const post = await PostModel.findById(req.postId)
    if (!post) return null

    const authorName = getCommentAuthorName(post, session.user.id)

    const newComment: CommentBase = {
      postId: req.postId,
      authorId: session.user.id,
      authorName,
      authorMajor: session.user.major,
      content: req.content,
      createdAt: new Date(),
      isSecret: req.isSecret,
      voteUser: { upvoted: [], downvoted: [] },
      votes: 0,
      replies: [],
    }
    post.comments.push(newComment)
    await post.save()

    // NOTIFICATION
    const notiReq: CreateNotificationRequest = {
      fromUserId: session.user.id,
      toUserId: post.authorId.toString(),
      notificationType: NotificationType.COMMENT_ON_POST,
      postType: req.postType,
      postId: req.postId,
      preview: post.title,
    }
    await createNotificationAction(notiReq)

    // USER ACTIVITY
    const newCommentId = post.comments[post.comments.length - 1]._id;
    const activityReq: CreateUserActivityRequest = {
      userActivityType: UserActivityType.CREATE_POST,
      postType: PostType.EVENT,
      postId: newComment.postId,
      commentId: newCommentId,
      preview: newComment.content,
    }
    await createUserActivityAction(activityReq)

    return newComment
  }
  catch (error) {
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
  finally {
    revalidateTag(getPostTag(req.postId, req.postType))
  }
}
