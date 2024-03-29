"use server"

import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {connectToDB} from "@utils/database";
import {EventPostModel} from "@models/collections/eventPost";
import {EventFormRequest} from "@models/requests/EventFormRequest";
import {revalidateTag} from "next/cache";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import {PostType, UserActivityType} from "@components/constants/enums";
import createUserActivityAction from "@actions/userActivity/createUserActivityAction";
import {getPostIdsGroupTag} from "@components/constants/tags";
import {StatusCodes} from "@node_modules/http-status-codes";

export default async function createEventPostAction(req: EventFormRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) {
      console.log("Session fail")
      return {status: StatusCodes.UNAUTHORIZED}
    }

    const {image, title, date, time, location, description } = req

    const newEventPost = new EventPostModel({
      universityCode: session.user.universityCode,
      authorId: session.user.id,
      authorMajor: session.user.major,
      type: PostType.EVENT,
      image: image,
      title,
      date,
      time,
      location,
      description,
      createdAt: new Date(),
      outOfService: false,
      voteUser: {upvoted: [], downvoted: []},
      commentators: [],
      comments: [],
    })
    await newEventPost.save()

    const activityReq: CreateUserActivityRequest = {
      userActivityType: UserActivityType.CREATE_POST,
      postType: PostType.EVENT,
      postId: newEventPost._id,
      preview: newEventPost.title,
    }
    await createUserActivityAction(activityReq)

    revalidateTag(getPostIdsGroupTag(PostType.EVENT))
    return {status: StatusCodes.OK}
  }
  catch (error) {
    console.log(error)
    revalidateTag(getPostIdsGroupTag(PostType.EVENT))
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
}
