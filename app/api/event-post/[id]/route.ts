import { connectToDB } from '@utils/database'
import {IEventPost, EventPostModel} from '@models/collections/eventPost'
import { StatusCodes } from 'http-status-codes'
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth/next";
import {Storage} from "@node_modules/@google-cloud/storage";

export async function GET(req: Request, { params }) {
  try {
    await connectToDB()
    const eventPost = await EventPostModel.findById(params.id)
    if (!eventPost) new Response("Post not found", {status: StatusCodes.NOT_FOUND})

    const obj: IEventPost = eventPost.toObject()

    return new Response(JSON.stringify(obj), {status: StatusCodes.OK})
  }
  catch (error) {
    return new Response("Failed to fetch all event posts", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  }
}
