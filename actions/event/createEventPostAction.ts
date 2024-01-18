"use server"

import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {connectToDB} from "@utils/database";
import {EventPostModel} from "@models/collections/eventPost";
import {CreateEventPostRequest} from "@models/requests/CreateEventPostRequest";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import {PostType, UserActivityType} from "@components/constants/enums";
import createUserActivityAction from "@actions/userActivity/createUserActivityAction";
import {addFileToStorage} from "@actions/actionHelper/googleStorageHelperFunctions";

export default async function createEventPostAction(req: CreateEventPostRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const {image, title, date, time, location, description } = req

    const publicUrl = await addFileToStorage(PostType.EVENT, session, image)

    const newEventPost = new EventPostModel({
      authorId: session.user.id,
      universityId: session.user.universityId,
      type: PostType.EVENT,
      image: publicUrl,
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

    return newEventPost
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {
    revalidatePath('/events')
    redirect('/events')
  }
}
