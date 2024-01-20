"use server"

import {connectToDB} from "@utils/database";
import {GeneralPostModel} from "@models/collections/generalPost";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {getCommunityPostModelByType, setDynamicDataToPost} from "@actions/actionHelper/helperFunctions";
import {toJson} from "@actions/actionHelper/utilFunction";
import {ICommunityPost, IPost} from "@models/union/union";
import {PostType} from "@components/constants/enums";


export default async function getCommunityPostAction(postType: PostType, postId: string) {
  try {
    await connectToDB()

    const CommunityPostModel = getCommunityPostModelByType(postType)
    if (!CommunityPostModel) return null

    const communityPost = await CommunityPostModel.findById(postId)
    if (!communityPost) return null

    const session = await getServerSession(authOptions)
    let post = communityPost.toObject() as IPost
    post = toJson(post)
    post = setDynamicDataToPost(session, post)

    return toJson(post)
  }
  catch (error) {
    console.log(error)
    return null
  }
}
