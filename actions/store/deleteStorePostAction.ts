import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {StorePostModel} from "@models/collections/storePost";
import {getStorageFileFromStringUrl} from "@actions/actionHelper/googleStorageHelperFunctions";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";


export default async function deleteStorePostAction(postId: string) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const post = await StorePostModel.findById(postId)
    if (!post) return null

    if (session.user.id !== post.authorId.toString()) return null

    const files = post.images.map((image) => getStorageFileFromStringUrl(image))

    await StorePostModel.findByIdAndDelete(postId)
    for (const file of files) {
      await file.delete()
    }

    return true
  }
  catch (error) {
    return null
  }
  finally {
    revalidatePath('/store')
    redirect('/store')
  }
}
