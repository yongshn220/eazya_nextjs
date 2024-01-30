"use server"

import {connectToDB} from "@utils/database";
import {NotificationModel} from "@models/collections/notification";
import {StatusCodes} from "@node_modules/http-status-codes";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";


export default async function readNotificationAction(notificationId: string) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const doc = await NotificationModel.findOneAndUpdate({_id: notificationId}, {
      isRead: true
    })
    if (!doc) return {status: StatusCodes.NOT_FOUND}

    return {status: StatusCodes.OK}
  }
  catch (error) {
    console.log(error)
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
}
