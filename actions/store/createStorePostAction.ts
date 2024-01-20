"use server"

import {StoreFormRequest} from "@models/requests/StoreFormRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {addBase64ToStorage} from "@actions/actionHelper/googleStorageHelperFunctions";
import {PostType, UserActivityType} from "@components/constants/enums";
import {StorePostModel} from "@models/collections/storePost";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import createUserActivityAction from "@actions/userActivity/createUserActivityAction";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {getHomePath} from "@components/constants/tags";


export default async function createStorePostAction(req: StoreFormRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const {images, title, price, description} = req

    const publicUrls = []
    for (const image of images) {
      const url = await addBase64ToStorage(PostType.STORE, session, image)
      if (!url) continue
      publicUrls.push(url)
    }

    const newStorePost = new StorePostModel({
      authorId: session.user.id,
      universityId: session.user.universityId,
      type: PostType.STORE,
      images: publicUrls,
      title,
      price,
      description,
      createdAt: new Date(),
      outOfService: false,
      voteUser: {upvoted: [], downvoted: []},
      commentators: [],
      comments: [],
    })
    await newStorePost.save()

    const activityReq: CreateUserActivityRequest = {
      userActivityType: UserActivityType.CREATE_POST,
      postType: PostType.STORE,
      postId: newStorePost._id,
      preview: newStorePost.title,
    }
    await createUserActivityAction(activityReq)

    return newStorePost
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {
    revalidatePath(getHomePath(PostType.STORE))
    redirect(getHomePath(PostType.STORE))
  }
}
