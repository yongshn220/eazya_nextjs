"use server"

import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {EventPostModel} from "@models/collections/eventPost";
import {connectToDB} from "@utils/database";
import {revalidateTag} from "@node_modules/next/cache";
import {getPostIdsGroupTag} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";
import {StatusCodes} from "@node_modules/http-status-codes";


export default async function deleteEventPostAction(postId: string) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return {status: StatusCodes.UNAUTHORIZED}

    const post = await EventPostModel.findById(postId)
    if (!post) return {status: StatusCodes.NOT_FOUND}

    if (session.user.id !== post.authorId.toString()) return null

    await EventPostModel.findByIdAndDelete(postId)

    revalidateTag(getPostIdsGroupTag(PostType.EVENT))
    return {status: StatusCodes.OK}
  }
  catch (error) {
    console.log(error)
    revalidateTag(getPostIdsGroupTag(PostType.EVENT))
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
}
