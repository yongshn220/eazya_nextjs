"use server"


import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {StoreFormRequest} from "@models/requests/StoreFormRequest";
import {StorePostModel} from "@models/collections/storePost";
import {addBase64ToStorage, getStorageFileFromStringUrl} from "@actions/actionHelper/googleStorageHelperFunctions";
import {PostType} from "@components/constants/enums";
import {revalidatePath} from "next/cache";
import {getHomePath} from "@components/constants/tags";
import {redirect} from "next/navigation";

export default async function editStorePostAction(postId: string, req: StoreFormRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const post = await StorePostModel.findById(postId)
    if (!post) return null

    if (session.user.id !== post.authorId.toString()) return null

    let {images, title, price, description} = req

    const imagesToAdd = images.filter(image => !post.images.includes(image));
    const imagesToDelete = post.images.filter(image => !images.includes(image));
    const imagesToKeep = post.images.filter(image => images.includes(image))

    const newUrls = []
    for (const image of imagesToAdd) {
      const url = await addBase64ToStorage(PostType.STORE, session, image)
      if (!url) continue
      newUrls.push(url)
    }

    await StorePostModel.findOneAndUpdate({_id: postId}, {
      images: [...imagesToKeep, ...newUrls],
      title,
      price,
      description,
    })

    const oldFiles = imagesToDelete.map((image) => getStorageFileFromStringUrl(image))
    for (const file of oldFiles) {
      await file.delete()
    }

    return true
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
