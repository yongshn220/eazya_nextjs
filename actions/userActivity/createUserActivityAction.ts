"use server"


import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import {UserActivityModel} from "@models/collections/userActivity";
import {revalidateTag} from "@node_modules/next/dist/server/web/spec-extension/revalidate-tag";
import {ActionTag, getActivityIdsGroupTag, getPostIdsGroupTag} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";

export default async function createUserActivityAction(req: CreateUserActivityRequest) {
  await connectToDB()
  const session = await getServerSession(authOptions)
  if (!session) return null

  try {
    const {userActivityType, postType, communityType, postId, commentId, replyId, preview} = req

    const newUserActivity = new UserActivityModel({
      userId: session.user.id,
      userActivityType,
      postType,
      communityType,
      postId,
      commentId,
      replyId,
      preview,
      createdAt: new Date(),
    })
    newUserActivity.save()
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {
    revalidateTag(getActivityIdsGroupTag(session.user.id))
  }
}
