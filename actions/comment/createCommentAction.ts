"use server"

import {CreateCommentRequest} from "@models/requests/CreateCommentRequest";
import {createCommentApi} from "@services/comment";
import {revalidatePath} from "@node_modules/next/cache";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {StatusCodes} from "@node_modules/http-status-codes";
import {PostType} from "@components/constants/enums";
import {EventPostModel} from "@models/collections/eventPost";
import {CommentBase} from "@models/base/commentBase";

export default async function createCommentAction(req: CreateCommentRequest) {
  try {
    await connectToDB()

    const session = await getServerSession(authOptions)
    if (!session) return {status: StatusCodes.UNAUTHORIZED}

    let PostModel;
    if (req.postType === PostType.EVENT) PostModel = EventPostModel
    else PostModel = "" // TODO: handle all posts.

    const post = await PostModel.findById(req.postId)
    if (!post) return {status: StatusCodes.NOT_FOUND}

    const newComment: CommentBase = {
      postId: req.postId,
      authorId: session.user.id,
      authorName: post.authorId === session.user.id? "Author" : "Commentator",
      content: req.content,
      createdAt: new Date(),
      isSecret: req.isSecret,
      voteUser: { upvoted: [], downvoted: [] },
      replies: [],
    }

    post.comments.push(newComment)
    await post.save()

    return newComment
  }
  catch (error) {
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
  finally {
    revalidatePath(`/events/${req.postId}`)
  }
}
