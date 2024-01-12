import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth/next";
import {StatusCodes} from "@node_modules/http-status-codes";
import {connectToDB} from "@utils/database";
import {CreateReplyRequest} from "@models/requests/CreateReplyRequest";
import {PostType} from "@components/constants/enums";
import {EventPostModel} from "@models/collections/eventPost";
import {ReplyBase} from "@models/base/replyBase";
import {Types} from "mongoose";


export async function POST(req: Request) {
  console.log("In")
  // try {
  //   await connectToDB()
  //
  //   const session = await getServerSession(authOptions)
  //   if (!session) return new Response("Unauthorized", {status: StatusCodes.UNAUTHORIZED})
  //
  //   const replyReq: CreateReplyRequest = await req.json()
  //
  //   let PostModel;
  //   if (replyReq.postType === PostType.EVENT) PostModel = EventPostModel
  //   else PostModel = "" // TODO: handle all posts.
  //
  //   const post = await PostModel.findById(replyReq.postId)
  //   if (!post) return new Response("Not found", {status: StatusCodes.NOT_FOUND})
  //
  //   const newReply: ReplyBase = {
  //     postId: replyReq.postId,
  //     commentId: replyReq.commentId,
  //     authorId: session.user.id,
  //     authorName: post.authorId === session.user.id? "Author" : "Commentator",
  //     content: replyReq.content,
  //     createdAt: new Date(),
  //     isSecret: replyReq.isSecret,
  //     voteUser: { upvoted: [], downvoted: [] },
  //   }
  //
  //   const comment = post.comments.id(replyReq.commentId)
  //   if (!comment) return new Response("Comment not found", {status: StatusCodes.NOT_FOUND})
  //
  //   comment.replies.push(newReply)
  //   await post.save()
  //
  //   return new Response(JSON.stringify(newReply), {status: StatusCodes.OK})
  // }
  // catch (error) {
  //   return new Response("Fail to create a comment", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  // }
}
