"use server"

import {connectToDB} from "@utils/database";
import {EventPostModel} from "@models/collections/eventPost";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import { setDynamicDataToPost} from "@actions/actionHelper/helperFunctions";
import {toJson} from "@actions/actionHelper/utilFunction";
import {IPost} from "@models/union/union";
import {unstable_cache} from "@node_modules/next/dist/server/web/spec-extension/unstable-cache";
import {getPostTag} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";


const getEventPostAction = async (postId: string) => {
  const action = unstable_cache(
    async (postId: string) => {
      try {
        await connectToDB()
        const eventPost = await EventPostModel.findById(postId)
        if (!eventPost) return null

        const session = await getServerSession(authOptions)
        let post = eventPost.toObject() as IPost
        console.log("getEventPostAction", post.title)
        post = toJson(post)
        post = setDynamicDataToPost(session, post)

        return toJson(post)
      }
      catch (error) {
        console.log(error)
        return null
      }
    },
    [getPostTag(PostType.EVENT, postId)],
    { tags: [getPostTag(PostType.EVENT, postId)] }
  )
  return await action(postId)
}

export default getEventPostAction
