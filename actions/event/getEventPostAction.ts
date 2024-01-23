"use server"

import {connectToDB} from "@utils/database";
import {EventPostModel} from "@models/collections/eventPost";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {setDynamicDataToPost} from "@actions/actionHelper/helperFunctions";
import {toJson} from "@actions/actionHelper/utilFunction";
import {IPost} from "@models/union/union";
import {unstable_cache} from "@node_modules/next/dist/server/web/spec-extension/unstable-cache";
import {getPostTag} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";
import {toElapsed} from "@components/constants/helperFunctions";
import {REVALIDATE_TIME} from "@components/constants/values";


const getEventPostAction = async (postId: string) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id ?? "GUEST"

  const action = unstable_cache(
    async () => {
      try {
        await connectToDB()
        const eventPost = await EventPostModel.findById(postId)

        if (!eventPost) return null

        let post = eventPost.toObject() as IPost
        post = toJson(post)
        post = setDynamicDataToPost(session, post)

        return toJson(post)
      }
      catch (error) {
        console.log(error)
        return null
      }
    },
    [getPostTag(userId, postId, PostType.EVENT)],
    { tags: [getPostTag(userId, postId, PostType.EVENT)], revalidate: REVALIDATE_TIME.EVENT}
  )
  return await action()
}

export default getEventPostAction
