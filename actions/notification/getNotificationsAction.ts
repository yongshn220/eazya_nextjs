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

    let notificationDocs = await NotificationModel.find({fromUserId: session.user.id})

    const notificationsPromises = notificationDocs.map(async (notification) => {
      let noti = notification.toObject() as INotification
      const PostModel = GetPostModelByType(noti.postType)
      const post = await PostModel.findById(noti.postId)
      noti.postTitle = post ? post.title : ''
      return noti
    });

    const notifications = await Promise.all(notificationsPromises);

    return JSON.parse(JSON.stringify(notifications))
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {

  }
}
