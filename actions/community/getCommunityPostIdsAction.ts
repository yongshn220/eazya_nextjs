"use server"

import {CommunityType, PostType} from "@components/constants/enums";
import {connectToDB} from "@utils/database";
import {toJson} from "@actions/actionHelper/utilFunction";
import {getCommunityPostModelByType} from "@actions/actionHelper/helperFunctions";
import {unstable_cache} from "@node_modules/next/dist/server/web/spec-extension/unstable-cache";
import {getCommunityPostIdsGroupTag, getCommunityPostIdsTag,} from "@components/constants/tags";
import {DEFAULT_PAGE_LENGTH} from "@components/constants/values";


const getCommunityPostIdsAction = async (postType: PostType, communityType: CommunityType, page: number) => {
  await connectToDB()

  const action = unstable_cache(
    async () => {
      try {
        const CommunityPostModel = getCommunityPostModelByType(postType)
        if (!CommunityPostModel) return null

        const posts = await CommunityPostModel.find({communityType: communityType})
          .sort({createdAt: -1})
          .skip((page - 1) * DEFAULT_PAGE_LENGTH.COMMUNITY)
          .limit(DEFAULT_PAGE_LENGTH.COMMUNITY)

        const ids = posts.map(post => post._id)

        return toJson(ids)
      }
      catch (error) {
        console.log(error)
        return null
      }
    },
    [getCommunityPostIdsTag(postType, communityType, page)],
    { tags: [getCommunityPostIdsTag(postType, communityType, page), getCommunityPostIdsGroupTag(postType, communityType)] }
  )
  return await action()
}

export default getCommunityPostIdsAction
