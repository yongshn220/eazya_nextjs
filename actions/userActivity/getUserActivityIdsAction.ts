"use server"

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {UserActivityModel} from "@models/collections/userActivity";
import {unstable_cache} from "@node_modules/next/dist/server/web/spec-extension/unstable-cache";
import {getActivityIdsGroupTag, getActivityIdsTag} from "@components/constants/tags";
import {DEFAULT_PAGE_LENGTH} from "@components/constants/values";
import {toJson} from "@actions/actionHelper/utilFunction";
import {ActivityToPostType, UserActivityMenu} from "@components/constants/enums";


const getUserActivityIdsAction = async (userActivityMenu: UserActivityMenu, page: number) => {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const action = unstable_cache(
    async () => {
      try {

        const filter = {userId: session.user.id}
        if (userActivityMenu !== UserActivityMenu.ALL) {
          filter["postType"] = ActivityToPostType[userActivityMenu]
        }

        let userActivities = await UserActivityModel
          .find(filter)
          .sort({createdAt: -1})
          .skip((page - 1) * DEFAULT_PAGE_LENGTH.USER_ACTIVITY)
          .limit(DEFAULT_PAGE_LENGTH.USER_ACTIVITY)

        const ids = userActivities.map(activity => activity._id)
        return toJson(ids)
      }
      catch (error) {
        console.log(error)
        return null
      }
    },
    [getActivityIdsTag(session.user.id, userActivityMenu, page)],
    { tags: [getActivityIdsTag(session.user.id, userActivityMenu, page), getActivityIdsGroupTag(session.user.id)]}
  )
  return await action()
}

export default getUserActivityIdsAction
