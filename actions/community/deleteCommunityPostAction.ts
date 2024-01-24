"use server"

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {CommunityType, PostType} from "@components/constants/enums";
import {getCommunityPostModelByType} from "@actions/actionHelper/helperFunctions";
import {getCommunityHomePath, getCommunityPostIdsGroupTag, getPostTag} from "@components/constants/tags";
import {revalidateTag} from "@node_modules/next/cache";


export default async function deleteCommunityPostAction(postId: string, postType: PostType, communityType: CommunityType) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const CommunityPostModel = getCommunityPostModelByType(postType)
    if (!CommunityPostModel) return null

    const post =  await CommunityPostModel.findById(postId)
    if (!post) return null

    if (session.user.id !== post.authorId.toString()) return null

    await CommunityPostModel.findByIdAndDelete(postId)

    return true
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {
    revalidateTag(getCommunityPostIdsGroupTag(postType, communityType))
    redirect(getCommunityHomePath(postType, communityType))
  }
}
