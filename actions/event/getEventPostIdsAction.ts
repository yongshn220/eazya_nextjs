'use server'

import {EventPostModel} from "@models/collections/eventPost";
import {connectToDB} from "@utils/database";
import {toJson} from "@actions/actionHelper/utilFunction";
import {unstable_cache} from "@node_modules/next/dist/server/web/spec-extension/unstable-cache";
import {ActionTag, getPostIdsTag} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";
import {DEFAULT_PAGE_LENGTH} from "@components/constants/values";


const getEventPostIdsAction = async (page: number) => {
  const action = unstable_cache(
    async (page: number) => {
      try {
        console.log("Event ids", page)
        await connectToDB()
        const eventPosts = await EventPostModel.find({})
          .sort({createdAt: -1})
          .skip((page - 1) * DEFAULT_PAGE_LENGTH.EVENT)
          .limit(DEFAULT_PAGE_LENGTH.EVENT)

        const ids = eventPosts.map(post => post._id)
        return toJson(ids)
      }
      catch (error) {
        console.log(error)
        return null
      }
    },
    [getPostIdsTag(PostType.EVENT, page)],
    { tags: [getPostIdsTag(PostType.EVENT, page), ActionTag.EVENT_POST_IDS]}
  )
  return await action(page)
}

export default getEventPostIdsAction
