"use server"

import {CreateNotificationRequest} from "@models/requests/CreateNotificationRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {NotificationModel} from "@models/collections/notification";

export default async function createNotificationAction(req: CreateNotificationRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const {fromUserId, toUserId, notificationType, postType, postId, commentId, replyId, preview } = req

    const newNotification = new NotificationModel({
      fromUserId,
      toUserId,
      notificationType,
      postType,
      postId,
      commentId,
      replyId,
      preview,
      isRead: false,
      createdAt: new Date()
    })
    newNotification.save()

    return newNotification
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {
  }
}
