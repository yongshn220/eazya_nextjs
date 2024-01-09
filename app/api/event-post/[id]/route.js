import { connectToDB } from '@utils/database'
import EventPost from '@models/eventPost'
import { StatusCodes } from 'http-status-codes'
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth/next";
import {Storage} from "@node_modules/@google-cloud/storage";

export async function GET(req, { params }) {
  try {
    await connectToDB()
    const eventPost = await EventPost.findById(params.id)
    return new Response(JSON.stringify(eventPost), {status: StatusCodes.OK})

  }
  catch (error) {
    return new Response("Failed to fetch all event posts", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  }
}

export async function DELETE(req, {params}) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Unauthorized", {status: StatusCodes.UNAUTHORIZED})
    const eventPost = await EventPost.findById(params.id)

    if (!eventPost) return new Response("Not found", {status: StatusCodes.NOT_FOUND})

    if (session.user.id !== eventPost.authorId.toString()) return new Response("Unauthorized", {status: StatusCodes.UNAUTHORIZED})

    const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_CLOUD_STORAGE_CREDENTIALS_BASE64, 'base64').toString('ascii'))
    const storage = new Storage({ credentials })
    const imageUrl = new URL(eventPost.image);
    const urlPathParts = imageUrl.pathname.split('/').filter(part => part);
    const bucketName = urlPathParts[0];
    const filePath = urlPathParts.slice(1).join('/');
    const file = storage.bucket(bucketName).file(filePath);

    try { await EventPost.findByIdAndDelete(params.id) }
    catch (error) {
      console.log(error)
      return new Response("Fail to delete image from db", {status: StatusCodes.INTERNAL_SERVER_ERROR})
    }

    try { await file.delete() }
    catch (error) {
      console.log(error)
      return new Response("Fail to delete image from storage", {status: StatusCodes.INTERNAL_SERVER_ERROR})
    }

    return new Response("Event post deleted successfully", { status: StatusCodes.OK });
  }
  catch (error) {
    console.log(error)
    return new Response("Internal server error", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  }
}
