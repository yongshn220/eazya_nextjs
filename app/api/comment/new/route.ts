import {StatusCodes} from "http-status-codes";
import { getServerSession } from "next-auth/next"
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {connectToDB} from "@utils/database";
import {PostType} from "@components/constants/enums";
import {EventPostModel} from "@models/collections/eventPost";
import {CreateCommentRequest} from "@models/requests/CreateCommentRequest";
import {CommentBase} from "@models/base/commentBase";


export async function POST(req: Request) {
  // try {
  //   await connectToDB()
  //
  //   const session = await getServerSession(authOptions)
  //   if (!session) return new Response("Unauthorized", {status: StatusCodes.UNAUTHORIZED})
  //
  //   const commentReq: CreateCommentRequest = await req.json()
  //
  //   let PostModel;
  //   if (commentReq.postType === PostType.EVENT) PostModel = EventPostModel
  //   else PostModel = "" // TODO: handle all posts.
  //
  //   const post = await PostModel.findById(commentReq.postId)
  //   if (!post) return new Response("Not found", {status: StatusCodes.NOT_FOUND})
  //
  //   const newComment: CommentBase = {
  //     postId: commentReq.postId,
  //     authorId: session.user.id,
  //     authorName: post.authorId === session.user.id? "Author" : "Commentator",
  //     content: commentReq.content,
  //     createdAt: new Date(),
  //     isSecret: commentReq.isSecret,
  //     voteUser: { upvoted: [], downvoted: [] },
  //     replies: [],
  //   }
  //
  //   post.comments.push(newComment)
  //   await post.save()
  //
  //   return new Response(JSON.stringify(newComment), {status: StatusCodes.OK})
  // }
  // catch (error) {
  //   return new Response("Fail to create a comment", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  // }
}
