'use server'

import {EventPostModel} from "@models/collections/eventPost";
import {connectToDB} from "@utils/database";
import {toJson} from "@actions/actionHelper/utilFunction";
import {unstable_cache} from "@node_modules/next/dist/server/web/spec-extension/unstable-cache";
import {getPostIdsGroupTag, getPostIdsTag} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";
import {DEFAULT_PAGE_LENGTH, REVALIDATE_TIME} from "@components/constants/values";


const getEventPostIdsAction = async (page: number) => {
  await connectToDB()

  const action = unstable_cache(
    async () => {
      try {
        console.log("Event ids", page)
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
    { tags: [getPostIdsTag(PostType.EVENT, page), getPostIdsGroupTag(PostType.EVENT)], revalidate: REVALIDATE_TIME.EVENT}
  )
  return await action()
}

export default getEventPostIdsAction
