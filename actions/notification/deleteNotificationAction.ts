"use server"

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {NotificationModel} from "@models/collections/notification";

export default async function deleteNotificationAction(id: string) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    await NotificationModel.findByIdAndDelete(id)
    return true
  }
  catch (error) {
    return null
  }
  finally {

  }
}
