"use server"

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {IUserActivity, UserActivityModel} from "@models/collections/userActivity";
import {GetPostModelByType} from "@actions/actionHelper/helperFunctions";

export default async function getUserActivity() {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    let userActivityDocs = await UserActivityModel.find({userId: session.user.id})

    const userActivityPromises = userActivityDocs.map(async (activity) => {
      let act = activity.toObject() as IUserActivity
      const PostModel = GetPostModelByType(act.postType)

    })


    const userActivities = await Promise.all(userActivityPromises)

    return JSON.parse(JSON.stringify(userActivities))
  }
  catch (error) {
    console.log(error)
    return null
  }
}
