'use server'

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {INotification, NotificationModel} from "@models/collections/notification";
import {GetPostModelByType} from "@actions/actionHelper/helperFunctions";
import {toJson} from "@actions/actionHelper/utilFunction";


const DEFAULT_LENGTH = 3

export default async function getNotificationsAction(page: number = 1) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    let notifications = await NotificationModel.find({fromUserId: session.user.id})
      .skip((page - 1) * DEFAULT_LENGTH)
      .limit(DEFAULT_LENGTH)
      .sort({createdAt: -1})

    notifications = notifications.map(notification => notification.toObject())

    return toJson(notifications)
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {

  }
}
