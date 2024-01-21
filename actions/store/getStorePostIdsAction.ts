"use server"

import {connectToDB} from "@utils/database";
import {StorePostModel} from "@models/collections/storePost";
import {toJson} from "@actions/actionHelper/utilFunction";
import {unstable_cache} from "@node_modules/next/dist/server/web/spec-extension/unstable-cache";
import {PostType} from "@components/constants/enums";
import {getPostIdsGroupTag, getPostIdsTag} from "@components/constants/tags";
import {DEFAULT_PAGE_LENGTH} from "@components/constants/values";


const getStorePostIdsAction = async (page: number) => {
  const action = unstable_cache(
    async () => {
      try {
        await connectToDB()
        const storePosts = await StorePostModel.find({})
          .sort({createdAt: -1})
          .skip((page - 1) * DEFAULT_PAGE_LENGTH.STORE)
          .limit(DEFAULT_PAGE_LENGTH.STORE)

        const ids = storePosts.map(post => post._id)
        return toJson(ids)
      }
      catch (error) {
        console.log(error)
        return null
      }
    },
    [getPostIdsTag(PostType.STORE, page)],
    { tags: [getPostIdsTag(PostType.STORE, page), getPostIdsGroupTag(PostType.STORE)]}
  )
  return await action()
}

export default getStorePostIdsAction
