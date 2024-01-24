'use server'

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {INotification, NotificationModel} from "@models/collections/notification";
import {GetPostModelByType} from "@actions/actionHelper/helperFunctions";
import {toJson} from "@actions/actionHelper/utilFunction";
import {DEFAULT_PAGE_LENGTH} from "@components/constants/values";
import {toElapsed} from "@components/constants/helperFunctions";

export default async function getNotificationsAction(page: number = 1) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    let notifications = await NotificationModel.find({toUserId: session.user.id})
      .sort({createdAt: -1})
      .skip((page - 1) * DEFAULT_PAGE_LENGTH.NOTIFICATION)
      .limit(DEFAULT_PAGE_LENGTH.NOTIFICATION)

    notifications = notifications.map(notification => {
      const noti = notification.toObject()
      noti.createdAt = toElapsed(noti.createdAt)
      return noti
    })

    return toJson(notifications)
  }
  catch (error) {
    console.log(error)
    return null
  }
}
