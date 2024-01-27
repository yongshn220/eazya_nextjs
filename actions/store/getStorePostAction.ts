"use server"

import {connectToDB} from "@utils/database";
import {StorePostModel} from "@models/collections/storePost";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {setDynamicDataToPost} from "@actions/actionHelper/helperFunctions";
import {toJson} from "@actions/actionHelper/utilFunction";
import {IPost} from "@models/union/union";
import {unstable_cache} from "@node_modules/next/dist/server/web/spec-extension/unstable-cache";
import {getPostTag} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";
import {toElapsed} from "@components/constants/helperFunctions";
import {REVALIDATE_TIME} from "@components/constants/values";


const getStorePostAction = async (postId: string) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id ?? "GUEST"
  await connectToDB()

  const action = unstable_cache(
    async () => {
      try {
        const storePost = await StorePostModel.findById(postId)
        if (!storePost) return null

        let post = storePost.toObject() as IPost
        post = toJson(post)
        post = setDynamicDataToPost(session, post)

        return toJson(post)
      }
      catch (error) {
        console.log(error)
        return null
      }
    },
    [getPostTag(userId, postId, PostType.STORE)],
    { tags: [getPostTag(userId, postId, PostType.STORE)], revalidate: 10}
  )
  return await action()
}

export default getStorePostAction
