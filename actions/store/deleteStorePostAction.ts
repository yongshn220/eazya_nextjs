"use server"

import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {StorePostModel} from "@models/collections/storePost";
import {PostType} from "@components/constants/enums";
import {getPostIdsGroupTag} from "@components/constants/tags";
import {revalidateTag} from "@node_modules/next/cache";
import {StatusCodes} from "@node_modules/http-status-codes";


export default async function deleteStorePostAction(postId: string) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return {status: StatusCodes.UNAUTHORIZED}

    const post = await StorePostModel.findById(postId)
    if (!post) return {status: StatusCodes.NOT_FOUND}

    if (session.user.id !== post.authorId.toString()) return null

    await StorePostModel.findByIdAndDelete(postId)

    revalidateTag(getPostIdsGroupTag(PostType.STORE))
    return {status: StatusCodes.OK}
  }
  catch (error) {
    console.log(error)
    revalidateTag(getPostIdsGroupTag(PostType.STORE))
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
}
