"use server"

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {UserActivityModel} from "@models/collections/userActivity";
import {unstable_cache} from "@node_modules/next/dist/server/web/spec-extension/unstable-cache";
import {ActionTag} from "@components/constants/tags";


const getUserActivitiesAction = unstable_cache(
  async (session) => {
    if (!session) return null
    console.log("Get User Activity Action Occur")
    try {
      await connectToDB()

      let userActivities = await UserActivityModel.find({userId: session.user.id})
      userActivities = userActivities.map(activity => activity.toObject())

      return JSON.parse(JSON.stringify(userActivities))
    }
    catch (error) {
      console.log(error)
      return null
    }
  },
  ['UserActivities'],
  { tags: [ActionTag.USER_ACTIVITIES]}
)

export default getUserActivitiesAction
