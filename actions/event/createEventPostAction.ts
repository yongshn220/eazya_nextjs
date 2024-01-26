"use server"

import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {connectToDB} from "@utils/database";
import {EventPostModel} from "@models/collections/eventPost";
import {EventFormRequest} from "@models/requests/EventFormRequest";
import {revalidateTag} from "next/cache";
import {redirect} from "next/navigation";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import {PostType, UserActivityType} from "@components/constants/enums";
import createUserActivityAction from "@actions/userActivity/createUserActivityAction";
import {addBase64ToStorage} from "@actions/actionHelper/googleStorageHelperFunctions";
import {getHomePath, getPostIdsGroupTag} from "@components/constants/tags";
import {StatusCodes} from "@node_modules/http-status-codes";

export default async function createEventPostAction(req: EventFormRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) {
      console.log("Session fail")
      return {status: StatusCodes.UNAUTHORIZED, res: null}
    }

    const {image, title, date, time, location, description } = req

    // const publicUrl = await addBase64ToStorage(PostType.EVENT, session, image)
    // if (!publicUrl) {
    //   console.log("Fail to add base64 to storage")
    //   return {status: StatusCodes.CONFLICT, res: null}
    // }

    const newEventPost = new EventPostModel({
      universityCode: session.user.universityCode,
      authorId: session.user.id,
      authorMajor: session.user.major,
      type: PostType.EVENT,
      image: "test",
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

    return {status: StatusCodes.OK, res: newEventPost}
  }
  catch (error) {
    console.log(error)
    return {status: StatusCodes.INTERNAL_SERVER_ERROR, res: null}
  }
  finally {
    revalidateTag(getPostIdsGroupTag(PostType.EVENT))
    redirect(getHomePath(PostType.EVENT))
  }
}
