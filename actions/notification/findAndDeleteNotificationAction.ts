"use server"

import {DeleteNotificationRequest} from "@models/requests/DeleteNotificationRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {NotificationModel} from "@models/collections/notification";


export default async function findAndDeleteNotificationAction(req: DeleteNotificationRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const {fromUserId, toUserId, notificationType, postType, postId, commentId, replyId } = req

    const query = {
      fromUserId,
      toUserId,
      notificationType,
      postType,
      postId,
      commentId,
      replyId,
    };
    Object.keys(query).forEach(key => query[key] == null && delete query[key]);
    await NotificationModel.deleteMany(query);
    return true
  }
  catch (error) {
    return null
  }
  finally {

  }
}
