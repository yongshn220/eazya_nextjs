'use server'

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {INotification, NotificationModel} from "@models/collections/notification";
import {GetPostModelByType} from "@actions/actionHelper/helperFunctions";


const DEFAULT_NOTIFICATION_NUMBER = 10

export default async function getNotificationsAction() {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    let notifications = await NotificationModel.find({fromUserId: session.user.id})
    notifications = notifications.map(notification => notification.toObject())

    return JSON.parse(JSON.stringify(notifications))
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {

  }
}
