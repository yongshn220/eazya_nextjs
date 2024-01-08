import {StatusCodes} from "http-status-codes";
import { getServerSession } from "next-auth/next"
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {connectToDB} from "@utils/database";
import {ObjectId} from "mongodb";
import {PostType} from "@components/constants/enums";
import EventPost from "@models/eventPost";


export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Unauthorized", {status: StatusCodes.UNAUTHORIZED})

    await connectToDB()

    const {type, postId, authorId, content, isSecret} = await req.json()

    let PostModel;
    if (type === PostType.EVENT) PostModel = EventPost
    else PostModel = ""

    const post = PostModel.findById(postId)
    if (!post) return new Response("Not found", {status: StatusCodes.NOT_FOUND})

    const newComment = {
      _id: ObjectId,
      authorId,
      authorName: "",
      content,
      createdAt: new Date().toISOString(),
      isSecret,
      replies: []
    }

    post.comments.push(newComment)
    await post.save()

    return new Response(JSON.stringify(newComment), {status: StatusCodes})
  }
  catch (error) {
    return new Response("Fail to create a comment", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  }
}
