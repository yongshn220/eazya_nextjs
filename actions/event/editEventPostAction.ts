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


export default async function editEventPostAction(postId: string,  req: EventFormRequest) {
  await connectToDB()
  const session = await getServerSession(authOptions)
  if (!session) return null

  try {
    const post = await EventPostModel.findById(postId)
    if (!post) return null

    let {image, title, date, time, location, description } = req

    if (post.image !== image) {
      image = await addBase64ToStorage(PostType.EVENT, session, image)
      if (!image) return null

      const oldFile = getStorageFileFromStringUrl(post.image)
      await oldFile.delete()
    }

    await EventPostModel.findOneAndUpdate({_id: postId}, {
      image,
      title,
      date,
      time,
      location,
      description
    })

    return true
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {
    revalidateTag(getPostTag(session.user.id, postId, PostType.EVENT))
    redirect(getPostPath(postId, PostType.EVENT))
  }
}
