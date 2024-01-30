"use server"

import {EventFormRequest} from "@models/requests/EventFormRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {EventPostModel} from "@models/collections/eventPost";
import {addBase64ToStorage, getStorageFileFromStringUrl} from "@actions/actionHelper/googleStorageHelperFunctions";
import {PostType} from "@components/constants/enums";
import {revalidateTag} from "next/cache";
import {redirect} from "next/navigation";
import {getHomePath, getPostPath, getPostTag} from "@components/constants/tags";
import {StatusCodes} from "@node_modules/http-status-codes";


export default async function editEventPostAction(postId: string,  req: EventFormRequest) {
  await connectToDB()
  const session = await getServerSession(authOptions)
  if (!session) return {status: StatusCodes.UNAUTHORIZED}

  try {
    const post = await EventPostModel.findById(postId)
    if (!post) return {status: StatusCodes.NOT_FOUND}

    let {image, title, date, time, location, description } = req

    await EventPostModel.findOneAndUpdate({_id: postId}, {
      image,
      title,
      date,
      time,
      location,
      description
    })

    revalidateTag(getPostTag(session.user.id, postId, PostType.EVENT))
    return {status: StatusCodes.OK}
  }
  catch (error) {
    console.log(error)
    revalidateTag(getPostTag(session.user.id, postId, PostType.EVENT))
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
}
