"use server"

import {connectToDB} from "@utils/database";
import {GeneralPostModel} from "@models/collections/generalPost";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {getCommunityPostModelByType, setDynamicDataToPost} from "@actions/actionHelper/helperFunctions";
import {toJson} from "@actions/actionHelper/utilFunction";
import {ICommunityPost, IPost} from "@models/union/union";
import {PostType} from "@components/constants/enums";
import {unstable_cache} from "@node_modules/next/dist/server/web/spec-extension/unstable-cache";
import {getPostTag} from "@components/constants/tags";


const getCommunityPostAction = async (postId: string, postType: PostType) => {
  const action = unstable_cache(
    async () => {
      try {
        await connectToDB()

        const CommunityPostModel = getCommunityPostModelByType(postType)
        if (!CommunityPostModel) return null

        const communityPost = await CommunityPostModel.findById(postId)
        if (!communityPost) return null

        const session = await getServerSession(authOptions)
        let post = communityPost.toObject() as IPost
        console.log("community post", post.title)
        post = toJson(post)
        post = setDynamicDataToPost(session, post)

        return toJson(post)
      }
      catch (error) {
        console.log(error)
        return null
      }
    },
    [getPostTag(postId, postType)],
    { tags: [getPostTag(postId, postType)]}
  )
  return await action()
}

export default getCommunityPostAction
