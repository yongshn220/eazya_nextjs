'use server'

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {INotification, NotificationModel} from "@models/collections/notification";


const DEFAULT_NOTIFICATION_NUMBER = 10

export default async function getNotificationsAction() {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const notifications: Array<INotification> = await NotificationModel.find({_id: session.user.id}).limit(DEFAULT_NOTIFICATION_NUMBER)

    return JSON.parse(JSON.stringify(notifications))
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {

  }
}
