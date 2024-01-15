"use server"

import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {StatusCodes} from "@node_modules/http-status-codes";
import {EventPostModel} from "@models/collections/eventPost";
import {Storage} from "@node_modules/@google-cloud/storage";
import {revalidatePath} from "next/cache";
import {connectToDB} from "@utils/database";
import {redirect} from "@node_modules/next/navigation";

export default async function deleteEventPostAction(id: string) {
  try {
    await connectToDB()

    const session = await getServerSession(authOptions)
    if (!session) return {status: StatusCodes.UNAUTHORIZED}

    const eventPost = await EventPostModel.findById(id)

    if (!eventPost) return {status: StatusCodes.NOT_FOUND}

    if (session.user.id !== eventPost.authorId.toString()) return {status: StatusCodes.UNAUTHORIZED}

    const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_CLOUD_STORAGE_CREDENTIALS_BASE64, 'base64').toString('ascii'))
    const storage = new Storage({ credentials })
    const imageUrl = new URL(eventPost.image);
    const urlPathParts = imageUrl.pathname.split('/').filter(part => part);
    const bucketName = urlPathParts[0];
    const filePath = urlPathParts.slice(1).join('/');
    const file = storage.bucket(bucketName).file(filePath);

    await EventPostModel.findByIdAndDelete(id)
    await file.delete()

    return { status: StatusCodes.OK }
  }
  catch (error) {
    return null
  }
  finally {
    revalidatePath('/events')
    redirect('/events')
  }
}
