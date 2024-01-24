"use server"

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {toJson} from "@actions/actionHelper/utilFunction";
import {unstable_cache} from "@node_modules/next/dist/server/web/spec-extension/unstable-cache";
import {getActivityTag} from "@components/constants/tags";
import {IUserActivity, UserActivityModel} from "@models/collections/userActivity";
import {toElapsed} from "@components/constants/helperFunctions";


const getUserActivityAction = async (id: string) => {
  const action = unstable_cache(
    async () => {
      try {
        await connectToDB()
        const session = await getServerSession(authOptions)
        if (!session) return null

        let activityDoc = await UserActivityModel.findById(id)
        if (!activityDoc) return null

        const activity = activityDoc.toObject() as IUserActivity

        activity.createdAt = toElapsed(activity.createdAt.toString())

        return toJson(activity)
      }
      catch (error) {
        console.log(error)
        return null
      }
    },
    [getActivityTag(id)],
    { tags: [getActivityTag(id)] }
  )
  return await action()
}

export default getUserActivityAction
