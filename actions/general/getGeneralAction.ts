import {connectToDB} from "@utils/database";
import {GeneralPostModel} from "@models/collections/generalPost";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {setDynamicDataToPost} from "@actions/actionHelper/helperFunctions";
import {toJson} from "@actions/actionHelper/utilFunction";
import {IPost} from "@models/union/union";


export default async function getGeneralAction(postId: string) {
  try {
    await connectToDB()
    const generalPost = await GeneralPostModel.findById(postId)
    if (!generalPost) return null

    const session = await getServerSession(authOptions)
    let post = generalPost.toObject() as IPost
    post = toJson(post)
    post = setDynamicDataToPost(session, post)

    return toJson(post)
  }
  catch (error) {
    console.log(error)
    return null
  }
}
