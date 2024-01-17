"use server"

import {CreateGeneralPostRequest} from "@models/requests/CreateGeneralPostRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {GeneralPostModel} from "@models/collections/generalPost";
import {PostType, UserActivityType} from "@components/constants/enums";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import createUserActivityAction from "@actions/userActivity/createUserActivityAction";

export default async function createGeneralAction(req: CreateGeneralPostRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const {title, description} = req

    const newGeneralPost = new GeneralPostModel({
      authorId: session.user.id,
      universityId: session.user.universityId,
      type: PostType.GENERAL,
      title,
      description,
      createdAt: new Date(),
      outOfService: false,
      voteUser: {upvoted: [], downvoted: []},
      commentators: [],
      comments: [],
    })
    await newGeneralPost.save()

    const activityReq: CreateUserActivityRequest = {
      userActivityType: UserActivityType.CREATE_POST,
      postType: PostType.GENERAL,
      postId: newGeneralPost._id,
      preview: newGeneralPost.title,
    }
    await createUserActivityAction(activityReq)

    return newGeneralPost
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {

  }
}
