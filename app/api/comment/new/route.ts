import {StatusCodes} from "http-status-codes";
import { getServerSession } from "next-auth/next"
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {connectToDB} from "@utils/database";
import {ObjectId} from "mongodb";
import {PostType} from "@components/constants/enums";
import EventPost from "@models/eventPost";
import {CreateCommentRequest} from "@models/requests/CreateCommentRequest";
import mongoose from "mongoose";


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Unauthorized", {status: StatusCodes.UNAUTHORIZED})

    await connectToDB()

    const commentReq: CreateCommentRequest = await req.json()

    let PostModel;
    if (commentReq.postType === PostType.EVENT) PostModel = EventPost
    else PostModel = "" // ToDo: handle all posts.

    const post = await PostModel.findById(commentReq.postId)
    if (!post) return new Response("Not found", {status: StatusCodes.NOT_FOUND})

    const newComment = {
      authorId: session.user.id,
      authorName: post.authorId === session.user.id? "Author" : "Commentator",
      content: commentReq.content,
      createdAt: new Date().toISOString(),
      isSecret: commentReq.isSecret,
      replies: []
    }

    post.comments.push(newComment)
    await post.save()

    return new Response(JSON.stringify(newComment), {status: StatusCodes.OK})
  }
  catch (error) {
    return new Response("Fail to create a comment", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  }
}
