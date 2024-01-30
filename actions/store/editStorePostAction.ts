"use server"


import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {StoreFormRequest} from "@models/requests/StoreFormRequest";
import {StorePostModel} from "@models/collections/storePost";
import {addBase64ToStorage, getStorageFileFromStringUrl} from "@actions/actionHelper/googleStorageHelperFunctions";
import {PostType} from "@components/constants/enums";
import {revalidateTag} from "next/cache";
import {getPostPath, getPostTag} from "@components/constants/tags";
import {redirect} from "next/navigation";
import {StatusCodes} from "@node_modules/http-status-codes";
import {del} from "@node_modules/@vercel/blob";

export default async function editStorePostAction(postId: string, req: StoreFormRequest) {
  await connectToDB()
  const session = await getServerSession(authOptions)
  if (!session) return null

  try {
    const post = await StorePostModel.findById(postId)
    if (!post) return {status: StatusCodes.UNAUTHORIZED}

    if (session.user.id !== post.authorId.toString()) return {status: StatusCodes.UNAUTHORIZED}

    let {images, title, price, description} = req

    await StorePostModel.findOneAndUpdate({_id: postId}, {
      images: images,
      title,
      price,
      description,
    })

    revalidateTag(getPostTag(session.user.id, postId, PostType.STORE))
    return {status: StatusCodes.OK}
  }
  catch (error) {
    console.log(error)
    revalidateTag(getPostTag(session.user.id, postId, PostType.STORE))
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
}
