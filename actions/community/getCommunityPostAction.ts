"use server"

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {getCommunityPostModelByType, setDynamicDataToPost} from "@actions/actionHelper/helperFunctions";
import {toJson} from "@actions/actionHelper/utilFunction";
import {IPost} from "@models/union/union";
import {PostType} from "@components/constants/enums";
import {unstable_cache} from "@node_modules/next/dist/server/web/spec-extension/unstable-cache";
import {getPostTag} from "@components/constants/tags";
import {REVALIDATE_TIME} from "@components/constants/values";


const getCommunityPostAction = async (postId: string, postType: PostType) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id ?? "GUEST"

  const action = unstable_cache(
    async () => {
      try {
        await connectToDB()

        const CommunityPostModel = getCommunityPostModelByType(postType)
        if (!CommunityPostModel) return null

        const communityPost = await CommunityPostModel.findById(postId)
        if (!communityPost) return null

        let post = communityPost.toObject() as IPost
        post = toJson(post)
        post = setDynamicDataToPost(session, post)

        return toJson(post)
      }
      catch (error) {
        console.log(error)
        return null
      }
    },
    [getPostTag(userId, postId, postType)],
    { tags: [getPostTag(userId, postId, postType)], revalidate: REVALIDATE_TIME.COMMUNITY}
  )
  return await action()
}

export default getCommunityPostAction
