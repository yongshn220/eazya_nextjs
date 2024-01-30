"use server"

import {StoreFormRequest} from "@models/requests/StoreFormRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {addBase64ToStorage} from "@actions/actionHelper/googleStorageHelperFunctions";
import {PostType, UserActivityType} from "@components/constants/enums";
import {StorePostModel} from "@models/collections/storePost";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import createUserActivityAction from "@actions/userActivity/createUserActivityAction";
import {revalidateTag} from "next/cache";
import {getPostIdsGroupTag} from "@components/constants/tags";
import {StatusCodes} from "@node_modules/http-status-codes";


export default async function createStorePostAction(req: StoreFormRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return {status: StatusCodes.UNAUTHORIZED}

    const {images, title, price, description} = req

    const newStorePost = new StorePostModel({
      universityCode: session.user.universityCode,
      authorId: session.user.id,
      authorMajor: session.user.major,
      type: PostType.STORE,
      images: images,
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

    revalidateTag(getPostIdsGroupTag(PostType.STORE))
    return {status: StatusCodes.OK}
  }
  catch (error) {
    console.log(error)
    revalidateTag(getPostIdsGroupTag(PostType.STORE))
    return null
  }
}
