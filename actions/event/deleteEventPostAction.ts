"use server"

import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {EventPostModel} from "@models/collections/eventPost";
import {connectToDB} from "@utils/database";
import {redirect} from "next/navigation";
import {getStorageFileFromStringUrl} from "@actions/actionHelper/googleStorageHelperFunctions";
import {revalidateTag} from "@node_modules/next/cache";
import {getHomePath, getPostIdsGroupTag} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";

export default async function deleteEventPostAction(postId: string) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const post = await EventPostModel.findById(postId)
    if (!post) return null

    if (session.user.id !== post.authorId.toString()) return null

    const file = getStorageFileFromStringUrl(post.image)

    await EventPostModel.findByIdAndDelete(postId)
    await file.delete()

    return true
  }
  catch (error) {
    return null
  }
  finally {
    revalidateTag(getPostIdsGroupTag(PostType.EVENT))
    redirect(getHomePath(PostType.EVENT))
  }
}
