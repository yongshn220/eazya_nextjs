import {connectToDB} from "@utils/database";
import {StorePostModel} from "@models/collections/storePost";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {setDynamicDataToPost} from "@actions/actionHelper/helperFunctions";
import {toJson} from "@actions/actionHelper/utilFunction";
import {IPost} from "@models/union/union";


export default async function getStorePostAction(postId: string) {
  try {
    await connectToDB()
    const storePost = await StorePostModel.findById(postId)
    if (!storePost) return null

    const session = await getServerSession(authOptions)
    let post = storePost.toObject() as IPost
    post = toJson(post)
    post = setDynamicDataToPost(session, post)

    return toJson(post)
  }
  catch (error) {
    console.log(error)
    return null
  }
}
