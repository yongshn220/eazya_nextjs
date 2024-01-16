"use server"


import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import {UserActivityModel} from "@models/collections/userActivity";

export default async function createUserActivity(req: CreateUserActivityRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const {userActivityType, postId, commentId, replyId} = req

    const newUserActivity = new UserActivityModel({
      userId: session.user.id,
      userActivityType,
      postId,
      commentId,
      replyId,
      createdAt: new Date(),
    })
    newUserActivity.save()
    return newUserActivity
  }
  catch (error) {
    console.log(error)
    return null
  }
}
