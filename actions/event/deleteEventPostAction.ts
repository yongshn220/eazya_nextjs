"use server"

import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {StatusCodes} from "@node_modules/http-status-codes";
import {EventPostModel} from "@models/collections/eventPost";
import {Storage} from "@node_modules/@google-cloud/storage";
import {revalidatePath} from "next/cache";
import {connectToDB} from "@utils/database";
import {redirect} from "next/navigation";
import {getStorageFileFromStringUrl} from "@actions/actionHelper/googleStorageHelperFunctions";

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
    revalidatePath('/events')
    redirect('/events')
  }
}
