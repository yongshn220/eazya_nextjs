"use server"

import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {connectToDB} from "@utils/database";
import {EventPostModel} from "@models/collections/eventPost";
import {EventFormRequest} from "@models/requests/EventFormRequest";
import {revalidateTag} from "next/cache";
import {redirect} from "next/navigation";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import {PostType, UserActivityType} from "@components/constants/enums";
import createUserActivityAction from "@actions/userActivity/createUserActivityAction";
import {addBase64ToStorage} from "@actions/actionHelper/googleStorageHelperFunctions";
import {ActionTag} from "@components/constants/tags";

export default async function createEventPostAction(req: EventFormRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const {image, title, date, time, location, description } = req

    const publicUrl = await addBase64ToStorage(PostType.EVENT, session, image)
    if (!publicUrl) return null

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
    revalidateTag(ActionTag.EVENT_POST_IDS)
    redirect('/events')
  }
}
