"use server"


import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import {UserActivityModel} from "@models/collections/userActivity";
import {revalidateTag} from "@node_modules/next/dist/server/web/spec-extension/revalidate-tag";
import {ActionTag} from "@components/constants/tags";

export default async function createUserActivityAction(req: CreateUserActivityRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const {userActivityType, postType, postId, commentId, replyId, preview} = req

    const newUserActivity = new UserActivityModel({
      userId: session.user.id,
      userActivityType,
      postType,
      postId,
      commentId,
      replyId,
      preview,
      createdAt: new Date(),
    })
    newUserActivity.save()
    return newUserActivity
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {
    revalidateTag(ActionTag.USER_ACTIVITIES)
  }
}
